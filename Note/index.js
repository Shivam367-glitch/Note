console.log("Hello");
//note added  
displayNote();
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function(e) {

    let addtxt = document.getElementById("addtxt");
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addtitle.value,
        text: addtxt.value
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    addtitle.value = "";
    console.log(notesObj);
    displayNote();
});
// function display notes from local Stroage
function displayNote() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);

    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html +=
            `<div class=" noteClass card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button onclick="deleteNote(this.id)" class="btn btn-primary"  id="${index}">Delete</button>
        </div> 
            </div>`

    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to display`;
    }

}


//function to delete notes 
function deleteNote(index) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    displayNote();
}
//search Note 

let search = document.getElementById("searchNote");
search.addEventListener("input", function() {
    let searchval = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteClass");
    Array.from(noteCards).forEach(function(element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerHTML;
        console.log(cardTxt);
        if (cardTxt.includes(searchval)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});