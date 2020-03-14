# Documentation of MyReads Project
**Gerard T. Lum**

This is documentation of my required project in the Udacity React Nanodegree Program, titled **MyReads: A Book Tracking App.**

A starting template for the project, provided by Udacity, is in the following repository:
https://github.com/udacity/reactnd-project-myreads-starter

The project specification, or rubric, resides here:
https://review.udacity.com/#!/rubrics/918/view

The task for the student is to take the starting template and produce a fully functioning MyReads app meeting specifications.  I used Create React App for development.

The finished project resides in this repository:
https://github.com/GerardTL/reactnd-project-myreads-starter

To run the project, fork and clone the repository, then issue the following commands:
```
npm install
npm start
```

This documentation, occupying the front portion of this README.md file, supplements the [original, unchanged README.md](#myreads-project) file, which occupies the trailing portion.

## Features of MyReads App
- on the main page, displays three book shelves (different areas of the screen): Currently Reading, Want to Read, and Read
- for each shelf, displays any number of books assigned to that shelf
- displays each book with a thumbnail image of the book cover, title, author(s), and a select control with choices to move the book to another shelf, along with 'None' to remove the book entirely
- on request, loads a search page which accepts a query from the user, then goes to a backend server to retrieve books found by that query
- displays the retrieved books in a search results area; the user can move any retrieved book to a shelf using the select control
- records each move of a book to the backend server
- when restarting, restores the same shelves-books setup as before the restart

## React Components
In the src directory, the original App.js provided in the template was revised, and five additional components were created: BooksOnShelf, BookOnShelf, Search, BooksFromQuery, and BookFromQuery.
```
BooksApp (App.js)
- BooksOnShelf (BooksOnShelf.js)
  - BookOnShelf (BookOnShelf.js)
-Search (Search.js)
  - BooksFromQuery (BooksFromQuery.js)
    - BookFromQuery (BookFromQuery.js)
```
##### BooksApp
- gets saved setup of shelves and books from the backend server by calling `getAll()`
- creates an array of book objects, by destructuring the large object returned by the server
- for each shelf, displays the books on that shelf by calling **BooksOnShelf**
- on request (by clicking a button in the lower right), loads a search page by calling **Search**

##### BooksOnShelf
- for the specified shelf, calls **BookOnShelf** repeatedly to display each book

##### BookOnshelf
- displays each book with a thumbnail image of the book cover, title, author(s), and a select control to move the book to another shelf, along with 'None' to remove the book entirely
- any movement of a book triggers a call to `update(book, shelf)`

##### Search
- accepts search query from user
- retrieves book data from database by calling `search(query)`, destructures the large returned object into an array of book objects, then calls **BooksFromQuery** to display found books in the search results area

##### BooksFromQuery
- for each book retrieved, calls BookFromQuery to display book
- if no books retrieved, prints "No search results found"

##### BookFromQuery
- displays each book with a thumbnail image of the book cover, title, author(s), and a select control to move the book to another shelf, along with 'None' to remove the book entirely
- any movement of a book triggers a call to `update(book, shelf)`

## Backend Server

The provided file [`BooksAPI.js`](src/BooksAPI.js) defines methods to communicate with the backend server.  Documentation from original README: [Backend Server](#backend-server-1).

### Responses to a call to search(query)
If a call to `search(query)` yields any results, it returns a large object; each key has a corresponding value which is an **object** containing information on one book.  If the query yields no results, the call returns a smaller object; each key has a corresponding value which is a **string**.

The original, unchanged [README.md](#myreads-project) file begins below.
***

# MyReads Project

This is the starter template for the final assessment project for Udacity's React Fundamentals course. The goal of this template is to save you time by providing a static example of the CSS and HTML markup that may be used, but without any of the React code that is needed to complete the project. If you choose to start with this template, your job will be to add interactivity to the app by refactoring the static code in this template.

Of course, you are free to start this project from scratch if you wish! Just be sure to use [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap the project.

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
+-- CONTRIBUTING.md
+-- README.md - This file.
+-- SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
+-- package.json # npm package manager file. It's unlikely that you'll need to modify this.
+-- public
¦   +-- favicon.ico # React Icon, You may change if you wish.
¦   +-- index.html # DO NOT MODIFY
+-- src
    +-- App.css # Styles for your app. Feel free to customize this as you desire.
    +-- App.js # This is the root of your app. Contains static HTML right now.
    +-- App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    +-- BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    +-- icons # Helpful images for your app. Use at your discretion.
    ¦   +-- add.svg
    ¦   +-- arrow-back.svg
    ¦   +-- arrow-drop-down.svg
    +-- index.css # Global styles. You probably won't need to change anything here.
    +-- index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
