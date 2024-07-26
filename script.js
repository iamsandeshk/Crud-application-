document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const bookList = document.getElementById('book-list');
    const createBtn = document.getElementById('create-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    let books = JSON.parse(localStorage.getItem('books')) || [];

    const renderBooks = () => {
        bookList.innerHTML = '';
        books.forEach((book, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.status}</td>
                <td>${book.date}<button class="delete" onclick="deleteBook(${index})"><i class="fas fa-trash-can"></i></button><button class="edit" onclick="viewBook(${index})"><i class="fas fa-edit"></i></button></td>
            `;
            bookList.appendChild(tr);
        });
    };

    const saveBook = (event) => {
        event.preventDefault();
        const id = document.getElementById('book-id').value;
        const name = document.getElementById('book-name').value;
        const author = document.getElementById('book-author').value;
        const status = document.getElementById('book-status').value;
        const date = document.getElementById('checkout-date').value;

        const book = { name, author, status, date };

        if (id) {
            books[id] = book;
        } else {
            books.push(book);
        }

        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
        bookForm.reset();
        bookForm.classList.add('hidden');
        document.querySelector('.container').classList.remove('hidden');
    };

    const viewBook = (index) => {
        const book = books[index];
        document.getElementById('book-id').value = index;
        document.getElementById('book-name').value = book.name;
        document.getElementById('book-author').value = book.author;
        document.getElementById('book-status').value = book.status;
        document.getElementById('checkout-date').value = book.date;

        bookForm.querySelector('h2').textContent = 'Edit Book';
        bookForm.classList.remove('hidden');
        document.querySelector('.container').classList.add('hidden');
    };

    const deleteBook = (index) => {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
    };
    
    window.deleteBook = deleteBook;
    window.viewBook = viewBook;

    createBtn.addEventListener('click', () => {
        bookForm.reset();
        document.getElementById('book-id').value = '';
        bookForm.querySelector('h2').textContent = 'New Book';
        bookForm.classList.remove('hidden');
        document.querySelector('.container').classList.add('hidden');
    });

    cancelBtn.addEventListener('click', () => {
        bookForm.classList.add('hidden');
        document.querySelector('.container').classList.remove('hidden');
    });

    bookForm.addEventListener('submit', saveBook);
    renderBooks();
});

function searchBooks() {
    const filter = document.getElementById('search').value.toUpperCase();
    const rows = document.getElementById('book-list').getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const titleCell = rows[i].getElementsByTagName('td')[0];
        if (titleCell) {
            const title = titleCell.textContent || titleCell.innerText;
            rows[i].style.display = title.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
        }
    }
}
