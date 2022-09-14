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
    UpdateLibraryDisplay();

}

function ToggleFavoriteBook(index) {
    // book = myLibrary.filter(book=>book.title ===title);
    const book = myLibrary[index];
    book.isFavorite = !book.isFavorite;
    UpdateLibraryDisplay();

}

function ToggleReadBook(index) {
    myLibrary[index].isRead = !myLibrary[index].isRead;
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


const newBookModalBtn = document.querySelector("#new");

const newBookBtn = document.querySelector('#addbookbtn');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const isReadInput = document.querySelector('#isRead');
const isFavInput = document.querySelector('#favorite');


const resetBookBtn = document.querySelector('#reset');
const addBookPanel = document.querySelector('#info');
const addBookmodal = document.getElementById('add-book-modal');
const wrapper = document.querySelector('#wrapper');

let readButtons = document.querySelectorAll('#read');
let favButtons = document.querySelectorAll('#favorite');
let delButtons = document.querySelectorAll('#delete');

const books = document.querySelector("#books");

const resetPanel = document.querySelector('#reset-panel');
const proceedBtn = document.querySelector('#proceed');
const cancelBtn = document.querySelector('#cancel');

function UpdateLibraryDisplay(){
    books.innerHTML ='';
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
        button.addEventListener('click', (e)=>{  
            ToggleReadBook(e.target.parentElement.parentElement.getAttribute('data-id'));
        });
    });

    favButtons.forEach((button)=>{
        button.addEventListener('click',(e)=>{
            ToggleFavoriteBook(e.target.parentElement.parentElement.getAttribute('data-id'));
        });
    });

    delButtons.forEach((button)=>{
        button.addEventListener('click',(e)=>{
            DeleteBook(e.target.parentElement.parentElement.getAttribute('data-id'));
        });
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
    newBook.appendChild(bookTitle);
    newBook.appendChild(bookInfo);
    newBook.appendChild(controls);


    books.appendChild(newBook);
}

AddBookToLibrary('1984','George Orwell', 328, false, true);
AddBookToLibrary('The way of kings', 'Brandon Sanderson', 988, true, true);
UpdateLibraryDisplay();


newBookModalBtn.addEventListener('click', ()=>{
    addBookPanel.classList.add('active-modal');
});

window.addEventListener(('click'), (e)=>{
    if (e.target == addBookPanel) {
        addBookPanel.classList.remove("active-modal");
    }
})

newBookBtn.addEventListener(('click'),()=>{
    
    if (titleInput.checkValidity() && authorInput.checkValidity() && pagesInput.checkValidity()){
        const title = titleInput.value;
        const author = authorInput.value;
        const pages = pagesInput.value;
        const read = isReadInput.checked;
        const favorite = isFavInput.checked;

        AddBookToLibrary(title, author, pages, read, favorite);
        addBookPanel.classList.remove('active-modal');

        UpdateLibraryDisplay();
    }else {
    if (!titleInput.checkValidity()){
        document.querySelector('#title-error').style.opacity = 1;
    }

    if (!authorInput.checkValidity()){
        document.querySelector('#author-error').style.opacity = 1;
    }

    if (!pagesInput.checkValidity()){
        document.querySelector('#pages-error').style.opacity = 1;
    }

    }
});

titleInput.addEventListener('input', ()=>{
    if (!titleInput.checkValidity()){
    document.querySelector('#title-error').style.opacity = 1;
    }else {
        document.querySelector('#title-error').style.opacity = 0;
    }
});

authorInput.addEventListener('input', ()=>{
    if (!authorInput.checkValidity()){
    document.querySelector('#author-error').style.opacity = 1;
    }else {
        document.querySelector('#author-error').style.opacity = 0;
    }
});

pagesInput.addEventListener('input', ()=>{
    if (!pagesInput.checkValidity()){
    document.querySelector('#pages-error').style.opacity = 1;
    }else {
        document.querySelector('#pages-error').style.opacity = 0;
    }
});



resetBookBtn.addEventListener(('click'), ()=>{
    resetPanel.classList.add('active-modal');
});

proceedBtn.addEventListener(('click'), ()=>{
    myLibrary = [];
    UpdateLibraryDisplay();

    resetPanel.classList.remove('active-modal');
});

cancelBtn.addEventListener(('click'), ()=>{
    resetPanel.classList.remove('active-modal');
});



