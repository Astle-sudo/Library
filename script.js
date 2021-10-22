//Declare Variables//
let read = true;
let indexNumber = 0;
let library = [];

//Get the DOM elements//
const newBook = document.getElementById("newbook");
const tag = document.getElementById("bookmark")
const mainForm = document.getElementById("form");
const submitButton = document.getElementById("submit");
const container = document.getElementById("container");

//Create a Book Object//
function Book (author,genre,title,mark,index) {
  this.author = author;
  this.title = title;
  this.genre = genre;
  this.mark = mark;
  this.index = index
  this.createBook = function () {

    //Create an array for book elements to be put inside the input fields//
    let array = [this.author,this.genre,this.title];

    //Create the elements of the book//
    const newBook = document.createElement('div');
    const span = document.createElement('span');
    const status = document.createElement('h4');
    const remove = document.createElement('div');

    //Append the elements to their respective parents//
    newBook.appendChild(span);
    newBook.appendChild(remove);
    span.appendChild(status);

    ////STYLIZE THEM////

    //h4 in span styles//
    this.mark = read;
    if (read) {
      status.innerHTML = "Read";
      status.style.fontSize = "0.8em";
      status.style.top = "-2.5em";
    }
    else {
      status.innerHTML = "Not Read";
      status.style.fontSize = "0.6em";
      status.style.top = "-3.5em";
    }
    status.style.position = "absolute";
    status.style.left = "-1.1em";
    status.style.color = "white";

    //Span styles//
    span.style.position = "absolute";
    span.style.height = "0";
    span.style.width = "0";
    span.style.top = "0";
    span.style.left = "0.5em";
    span.style.borderTop = "20.5px solid #0096c7";
    span.style.borderLeft = "15.5px solid #0096c7";
    span.style.borderRight = "15.5px solid #0096c7";
    span.style.borderBottom = "15.5px solid transparent";
    span.classList.add("pointer-class");
    span.addEventListener("click", () => {
      if (this.mark) {
        status.innerHTML = "Not Read";
        status.style.fontSize = "0.6em";
        status.style.top = "-3.5em";
        this.mark = false;
      }
      else {
        status.innerHTML = "Read";
        status.style.fontSize = "0.8em";
        status.style.top = "-2.5em";
        this.mark = true;
      }
    });

    //Book styles//
    newBook.style.position = "relative"
    newBook.style.height = "200px";
    newBook.style.width = "125px";
    newBook.style.margin = "2em";
    newBook.style.backgroundColor = "#03045e";
    newBook.style.display = "flex";
    newBook.style.flexDirection = "column";
    newBook.style.justifyContent = "center";
    newBook.style.textAlign = "center";
    newBook.style.top = "1em";
    newBook.style.marginLeft = "2em";
    newBook.style.boxShadow = "5px 5px 12px 2px grey";

    //Delete button styles//
    remove.innerHTML = "Remove";
    remove.style.textAlign = "center"
    remove.style.verticalAlign = "middle";
    remove.style.position = "absolute";
    remove.style.fontSize = "12px";
    remove.style.lineHeight = "23px";
    remove.style.fontWeight = "bolder";
    remove.style.alignItems = "space-between";
    remove.style.top = "19em";
    remove.style.left = "3em"
    remove.style.height = "25px";
    remove.style.width = "50px";
    remove.style.borderRadius = "10px";
    remove.classList.add("remove-class");
    remove.addEventListener("click",() => {
      indexNumber -= 1;
      removeBook(this.index);
    })

    //Add the names//
    for (let i=0; i < 3; i++) {
      let names = document.createElement('h3');
      newBook.appendChild(names);
      names.innerHTML = array[i];
      names.style.margin = "18% 0% 8% 0%";
      names.style.color = "white";
      names.style.fontSize = "1.4em";
      names.style.fontWeight = "bolder";
      names.style.fontFamily = "'Rampart One', cursive";
    }

    return newBook;
  }
}

//Function to call the form//
function callForm() {
  document.getElementById("cover").style.display = "block";
  mainForm.style.display = "flex";
}

//Funciton for removing a book object//
function removeBook (number) {

  //Loop over all the container nodes and remove the selected book//
  for (let i=0; i < container.childNodes.length; i += 1) {
    if (number == i) {
      container.removeChild(container.childNodes[i]);
    }
  }

  //Reset the index numbers of book objects after deleting a book//
  for (let i=0; i < library.length; i += 1) {
    if (library[i].index > number) {
      library[i].index -= 1;
    }
  }
}

//Function for status change//
function statusChange () {
  if (!read) {
    document.getElementById("status").innerHTML = "Read";
    document.getElementById("status").style.transform = "";
    document.getElementById("status").style.fontSize = null;
    read = true;
  }
  else {
    document.getElementById("status").innerHTML = "Not Read";
    document.getElementById("status").style.transform = "translate(-18px,-52px)";
    document.getElementById("status").style.fontSize = "1em";
    read = false;
  }
}

//Function for submitting the form//
function submit () {
  document.getElementById("cover").style.display = "none";

  //Create variables for book information and increase index number//
  let authorName = document.getElementById('author').value;
  let bookTitle = document.getElementById('name').value;
  let genre = document.getElementById('genre').value;
  let entry = new Book(authorName,bookTitle,genre,read,indexNumber);
  indexNumber += 1;

  //Reset the form inputs//
  mainForm.style.display = "none";
  document.getElementById('author').value = null;
  document.getElementById('name').value = null;
  document.getElementById('genre').value = null;

  //Append the book to the main array and container//
  library.push(entry);
  container.appendChild(entry.createBook());
}

//Adding the event listeners//
newBook.addEventListener("click",callForm);
tag.addEventListener("click",statusChange);
submitButton.addEventListener("click",submit);

