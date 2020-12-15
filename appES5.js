// BOOK CONSTRUCTOR
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI CONSTRUCTOR
function UI(){}
// LOCAL STORAGW CONSRTUCTOR
function Store(){}
// LOCAL STORAGE PROTOTYPES
Store.prototype.getBooks = function(){
    let books;
    if(localStorage.getItem('books') ===null){
        books = [];
    } else{
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}
Store.prototype.displayBooks = function(){
    const books = Store.getBooks();
    books.forEach(function(book){
        const ui = new UI;
        //ADD BOOK TO UI
        ui.addBookToList(book);
    })
}
Store.prototype.addBook = function(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}
Store.prototype.removeBook = function(isbn){
    const books = Store.getBooks();

    books.forEach(function(book, index){
        if(book.isbn === isbn){
            books.splice(index, 1);
        }
    })
    localStorage.setItem('books', JSON.stringify(books));
}
//DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', Store.displayBooks);
// ADD BOOK TO LIST
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list')
    //CREATE TR ELEMENT
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);

    
}
//show alert
UI.prototype.showAlert = function(message,className){
    //create div
    const div = document.createElement('div');
    //ADD CLASSES
    div.className = `alert ${className}`
    //add a textnode
    div.appendChild(document.createTextNode(message));
    //GET PARENT
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);

    //TIMEOUT AFTER 3scs
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000)
}

//delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}
//clear fields
UI.prototype.clearFields = function (){
    document.getElementById('title').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('author').value = '';
};



//EVENT LISTENERS for add book
document.getElementById('book-form').addEventListener('submit', bookie);
function bookie(e){
    //GET FORM VALUES
   const title = document.getElementById('title').value,
         author = document.getElementById('author').value,
         isbn = document.getElementById('isbn').value;

         console.log(title,author,isbn);

//INSTANTIATE BOOK
  const book = new Book(title,author,isbn);

//INSTANTIATE UI
const ui = new UI();
// Validate
if (title === '' || author === '' || isbn === '' ){
    //ERROR ALERT
    ui.showAlert('Please fill in all fields', 'error');
}else{
     //ADD BOOK TO LIST
    ui.addBookToList(book);
    //ADD TO LOCAL STORAGE
    Store.addBook(book);
    //show success
    ui.showAlert('Book Added!', 'success');
    //clear fields
    ui.clearFields();
    
}

    e.preventDefault();
}

// EVENT LISYTENER OF DELETE
    document.getElementById('book-list').addEventListener('click', remove);
    function remove(e){
//INSTANTIATE UI
const ui = new UI();

    ui.deleteBook(e.target);
    //REMOVE FROM LOCAL STORAGE
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //show message once deleted
    ui.showAlert('Book Removed!', 'success');

        e.preventDefault();
    }







