const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const all_isbns = Object.keys(books); // Get [ "1", "2", "3", ... ]
    let booksByAuthor = [];
  
    all_isbns.forEach(isbn => {
      if (books[isbn].author === author) {
        booksByAuthor.push({
          isbn: isbn,
          title: books[isbn].title,
          reviews: books[isbn].reviews
        });
      }
    });
  
    if (booksByAuthor.length > 0) {
      return res.status(200).json(booksByAuthor);
    } else {
      return res.status(404).json({ message: "No books found by this author" });
    }
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title =  req.params.title.toLowerCase();
  const all_isbns = Object.keys(books);
  
  // Find the book that matches the title
  const book = all_isbns.find(isbn => books[isbn].title.toLowerCase() === title);

  if (book) {
    return res.status(200).json({isbn: book, ...books[book]});
  } else {
    return res.status(404).json({ message: "No book found with this title" });
  }
});
//   let bookByTitle = [];

//   all_isbns.forEach(isbn => {
//     if (books[isbn].title === title) {
//       bookByTitle.push({
//         isbn: isbn,
//         title: books[isbn].title,
//         reviews: books[isbn].reviews
//       });
//     }
//   });

//   if (bookByTitle.length > 0) {
//     return res.status(200).json(bookByTitle);
//   } else {
//     return res.status(404).json({ message: "No books found by this author" });
//   }
  
  //return res.status(300).json({message: "Yet to be implemented"});
//});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
