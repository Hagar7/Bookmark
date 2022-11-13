var bookName = document.getElementById('bookName');
var bookUrl = document.getElementById('bookUrl');
var myBtn = document.getElementById('myBtn');
var allInputs = document.getElementsByClassName('form-control');
var searchInput = document.getElementById('searchInput');
var nameAlert = document.getElementById('nameAlert');
var urlAlert = document.getElementById('urlAlert');
var books = [];
var index =0;

if(JSON.parse(localStorage.getItem('bookslist')) != null){
    books = JSON.parse(localStorage.getItem('bookslist'))
    displayBook();
}


myBtn.addEventListener('click', function() {

    if(myBtn.innerHTML == "Submit") {
        addBook();  
    } else{
        updateBook()
    }
    displayBook();
    clearBook ()
})

function addBook () {
  var book = 
  {
    name:bookName.value,
    url: bookUrl.value
  }
  books.push(book);
  localStorage.setItem('bookslist',JSON.stringify(books));
  
}

function displayBook () {
    var cartona = "";
    for(var i=0;i<books.length;i++) {
        cartona+= `<tr>
        <td>${books[i].name}</td>
        <td>${books[i].url}</td>
        <td><a href="${books[i].url}" class="btn btn-info">Visit</td>
        <td><button onclick = "getBookInfo(${i})" class=" btn btn-danger" >Update</button>
        <td><button onclick = "deleteBook(${i})" class=" btn btn-primary">Delete</button>
        </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartona;

}

function clearBook () {
    for(var i=0;i <allInputs.length;i++) {
        allInputs[i].value = "";
    }
}

function deleteBook (index) {
    books.splice(index,1);
    displayBook ();
    localStorage.setItem('bookslist',JSON.stringify(books));
}

function getBookInfo(index) {
currentIndex =index;
var currentBook = books[index];
bookName.value = currentBook.name;
bookUrl.value = currentBook.url;
myBtn.innerHTML = "Update"
}
function updateBook() {
    var book = 
    {
      name:bookName.value,
      url: bookUrl.value
    }
    books[currentIndex] = book;
    localStorage.setItem('bookslist',JSON.stringify(books));
    myBtn.innerHTML = "Submit"
}

searchInput.addEventListener('keyup', function() {
var cartona = "";
for(var i=0;i<books.length;i++){
    if(books[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) 
   
    {
        cartona+= `<tr>
        <td>${books[i].name}</td>
        <td>${books[i].url}</td>
        <td><a href="${books[i].url}" class="btn btn-info">Visit</td>
        <td><button onclick = "getBookInfo(${i})" class=" btn btn-danger" >Update</button>
        <td><button onclick = "deleteBook(${i})" class=" btn btn-primary">Delete</button>
        </tr>` 
    }
      
    }
    document.getElementById('tableBody').innerHTML = cartona;
})


bookName.addEventListener('keyup',function() {
    var nameRegex = /(^[A-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
    if(nameRegex.test(bookName.value)){
        myBtn.removeAttribute('disabled');
        bookName.classList.add('is-valid');
        bookName.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
    }else{
        myBtn.disabled ='true';
        bookName.classList.add('is-invalid');
        bookName.classList.remove('is-valid');
        nameAlert.classList.remove('d-none')
    }
})

bookUrl.addEventListener('keyup',function(){
    var urlRegex =  /^(ftp|http|https):\/\/[^ "]+$/;
    if(urlRegex.test(bookUrl.value)) {
        myBtn.removeAttribute('disabled');
        bookUrl.classList.add('is-valid');
        bookUrl.classList.remove('is-invalid');
        urlAlert.classList.add('d-none');
    }
    else{
        myBtn.disabled ='true';
        bookUrl.classList.add('is-invalid');
        bookUrl.classList.remove('is-valid');
        urlAlert.classList.remove('d-none')
    }

})


