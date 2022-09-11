let myLibrary = [];

function Book(title, author, pages, isRead, isFavorite){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.isFavorite = isFavorite;
}

function AddBookToLibrary(title, author, pages, isRead, isFavorite){
    myLibrary.push(new Book(title, author, pages, isRead, isFavorite));
}

function DeleteBook(index) {
    // myLibrary = myLibrary.filter(book => book.title !== title);
    myLibrary.splice(index, 1);

}

function ToggleFavoriteBook(index) {
    // book = myLibrary.filter(book=>book.title ===title);
    const book = myLibrary[index];
    book.isFavorite = !book.isFavorite;

}

function ToggleReadBook(index) {
    myLibrary[index].isFavorite = !myLibrary[index].isFavorite;
    UpdateLibraryDisplay();
}

function Reset(){
    myLibrary = [];

}


/* Testing
console.table(myLibrary);
AddBookToLibrary('1984','George Orwell', 328, true, true);
AddBookToLibrary('A brief history of time','Stephen Hawking', 212, false, false);
AddBookToLibrary('The lord of the rings', 'J.R.R Tolkein', 512, false, false);
AddBookToLibrary('The way of kings', 'Brandon Sanderson', 988, true, true);

console.table(myLibrary);
DeleteBook(0);

console.table(myLibrary);
ToggleFavoriteBook(0);
console.table(myLibrary);
*/


const newBookBtn = document.querySelector("#new");
const resetBookBtn = document.querySelector('#reset');

let readButtons = document.querySelectorAll('#read');
let favButtons = document.querySelectorAll('#favorite');
let delButtons = document.querySelectorAll('#delete');

const books = document.querySelector("#books");

function UpdateLibraryDisplay(){
    for (let i= 0; i<myLibrary.length;i++){
        DisplayBook(myLibrary[i], i);
    }
    UpdateButtons();
}

function UpdateButtons() {
    readButtons = document.querySelectorAll('#read');
    favButtons = document.querySelectorAll('#favorite');
    delButtons = document.querySelectorAll('#delete');

    readButtons.forEach((button)=>{
        const id = button.parentElement.parentElement.getAttribute('data-id');
        button.addEventListener('click', ()=>{
            ToggleReadBook(id)});
    });
}

function DisplayBook(book, id){
    const newBook = document.createElement('div');
    const bookTitle = document.createElement('h2');
    const bookInfo = document.createElement('div');
    const controls = document.createElement('div');

    newBook.setAttribute('data-id', id );
    bookTitle.innerText = book.title;


    const author = document.createElement('h3');
    const pages = document.createElement('p');

    author.innerText = book.author;
    pages.innerText = book.pages + ' pages';

    bookInfo.classList.add("book-info");
    bookInfo.appendChild(author);
    bookInfo.appendChild(pages);


    const readBtn = document.createElement('button');
    const favBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    
    readBtn.classList.add('control');
    readBtn.id = "read";
    readBtn.innerText = "read";
    favBtn.classList.add('control');
    favBtn.id = "favorite";
    favBtn.innerText = 'favorite';
    delBtn.classList.add('control');
    delBtn.id = "delete"
    delBtn.innerText = 'delete';

    if (book.isRead) {readBtn.classList.add("active");}
    if (book.isFavorite) {favBtn.classList.add("active");}



    controls.classList.add("controls");

    controls.appendChild(readBtn);
    controls.appendChild(favBtn);
    controls.appendChild(delBtn);


    newBook.classList.add("book");
    //add data index
    newBook.appendChild(bookTitle);
    newBook.appendChild(bookInfo);
    newBook.appendChild(controls);


    books.appendChild(newBook);
}


AddBookToLibrary('1984','George Orwell', 328, false, true);
AddBookToLibrary('The way of kings', 'Brandon Sanderson', 988, true, true);
UpdateLibraryDisplay();


