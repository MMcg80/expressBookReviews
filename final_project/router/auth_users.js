const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(400).json({message: "Error logging in: Missing credentials"});
  }

  // Check if user exists and password matches
  const validUser = users.find(u => u.username === username && u.password === password);

  if (validUser) {
    // Generate a token that lasts for 1 hour
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    // Store the token in the session
    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const reviewContent = req.query.review; // Taking review from request query
    const username = req.session.authorization['username']; // Retrieved from session
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found." });
    }
  
    if (!reviewContent) {
      return res.status(400).json({ message: "Review content is required in query." });
    }
  
    // Key logic: use the username as the key inside the reviews object
    // If reviews["john_doe"] exists, it overwrites it. 
    // If not, it creates a new entry for "john_doe".
    books[isbn].reviews[username] = reviewContent;
  
    return res.status(200).json({ 
      message: `Review for ISBN ${isbn} by user ${username} has been added/updated.` 
    });
  });

  // Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization['username']; // Get user from session
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    // Check if the user has a review for this book
    if (books[isbn].reviews[username]) {
      // Delete only the review belonging to this user
      delete books[isbn].reviews[username];
      
      return res.status(200).json({ 
        message: `Review for ISBN ${isbn} by user ${username} deleted.` 
      });
    } else {
      return res.status(404).json({ 
        message: "No review found for this user on this ISBN." 
      });
    }
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
