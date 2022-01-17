const library = document.getElementById("display");
const newBookBtn = document.getElementById("newBookBtn");
const newBookForm = document.getElementById("newBookForm");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const pagesInput = document.getElementById("pagesInput");
const readStatusInput = document.getElementById("readStatusInput");
const addBookBtn = document.getElementById("addBookBtn");
let books = [];
let myLibrary = [];

class Book {
	constructor(title = String, author = String, pages = Number, read = Boolean) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
}
Book.prototype.toggleRead = function () {
	if (this.read == true) {
		this.read = false;
	} else if (this.read == false) {
		this.read = true;
	}
};
window.addEventListener("load", () => {
	newBookForm.style.transform = "scale(0)";
});
newBookBtn.addEventListener("click", () => toggleForm());

addBookBtn.addEventListener("click", () => {
	let newBook = createNewBook();
	let isValid = verifyInput();
	if (isValid) {
		addBookToLibrary(newBook);
	} else {
		alert("enter valid values");
	}

	clearInputs();
	toggleForm();
});

function toggleForm() {
	if (newBookForm.style.transform == "scale(1)") {
		newBookForm.style.transform = "scale(0)";
	} else if (newBookForm.style.transform == "scale(0)") {
		newBookForm.style.transform = "scale(1)";
	}
}
function createNewBook() {
	let newBook = new Book();

	newBook.title = titleInput.value;
	newBook.author = authorInput.value;
	newBook.pages = pagesInput.value;

	switch (true) {
		case readStatusInput.value == "yes":
			newBook.read = true;
			break;
		case readStatusInput.value == "no":
			newBook.read = false;
			break;
	}
	return newBook;
}

function verifyInput() {
	if (titleInput.value == "") {
		return false;
	}
	if (authorInput.value == "") {
		return false;
	}
	if (isNaN(parseInt(pagesInput.value))) {
		return false;
	}
	return true;
}
function clearInputs() {
	titleInput.value = "";
	authorInput.value = "";
	pagesInput.value = "";
}

function addBookToLibrary(book) {
	myLibrary.push(book);
	displayBooks(book);
}

function removeBook(book) {
	let index = myLibrary.findIndex((element) => {
		element.title == book.title;
	});
	myLibrary.splice(index, 1);
}

let book1 = new Book("The Hobbit", "JRR Tolkien", 300, true);

let book2 = new Book("Game of Thrones", "George RR Martin", 500, false);
addBookToLibrary(book1);
addBookToLibrary(book2);

function displayBooks(newBook) {
	const libraryBook = document.createElement("div");
	const title = document.createElement("p");
	const author = document.createElement("p");
	const pages = document.createElement("p");
	const read = document.createElement("button");
	const closeBtn = document.createElement("button");
	const breakline = document.createElement("br");
	libraryBook.classList = "book";

	libraryBook.id = myLibrary.findIndex(
		(element) => element.title == newBook.title
	);
	title.textContent = newBook.title;
	author.textContent = newBook.author;
	pages.textContent = `${newBook.pages} pages`;
	closeBtn.textContent = "Remove Book";
	closeBtn.style.cssText = "border-radius:10px";
	closeBtn.addEventListener("click", () => {
		removeBookFromDisplay(newBook);
	});
	read.addEventListener("click", () => {
		newBook.toggleRead();
		if (newBook.read == true) {
			read.textContent = "Read";
			libraryBook.classList.add("read");
			libraryBook.classList.remove("not-read");
		} else if (newBook.read == false) {
			read.textContent = "Not Read";
			libraryBook.classList.add("not-read");
			libraryBook.classList.remove("read");
		}
	});
	if (newBook.read == true) {
		read.textContent = "Read";
		libraryBook.classList.add("read");
		libraryBook.classList.remove("not-read");
	} else if (newBook.read == false) {
		read.textContent = "Not Read";
		libraryBook.classList.add("not-read");
		libraryBook.classList.remove("read");
	}
	closeBtn.classList = "close-btn";
	read.classList = "read-toggle";
	libraryBook.appendChild(title);
	libraryBook.appendChild(author);
	libraryBook.appendChild(pages);
	libraryBook.appendChild(read);
	libraryBook.appendChild(breakline);
	libraryBook.appendChild(closeBtn);
	library.appendChild(libraryBook);
	books = Array.from(document.querySelectorAll(".book"));
}

function removeBookFromDisplay(book) {
	books.forEach((bookInLibrary) => {
		index = myLibrary.findIndex((element) => element.title == book.title);

		if (bookInLibrary.id == index) {
			library.removeChild(bookInLibrary);
		}
	});
	books = Array.from(document.querySelectorAll(".book"));
}
