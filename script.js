let noteTitle = ["Spaghetti Rezept", "Training"];
let noteText = [
  "250g Spaghetti, 1 Glas Barilla-Tomatensauce",
  "20min Cardio, 45min Kraft",
];
load();

function newStyle() {
  document.getElementById("searchbarBtn").classList.add("newStyle");
  document.getElementById("searchbar").classList.add("newStyle");
  console.log('added');
}

function oldStyle() {
  document.getElementById("searchbarBtn").classList.remove("newStyle");
  document.getElementById("searchbar").classList.remove("newStyle");
  console.log('removed');
}

function trashbinContent() {
  let logoTitle = document.getElementById("logo-title");

  document.getElementById("trashbin").classList.add("sideBarStyle");
  document.getElementById("trashbin").classList.remove("trashbin");
  document.getElementById("note").classList.remove("sideBarStyle");
  document.getElementById("note").classList.add("note");

  logoTitle.innerHTML = "";
  logoTitle.innerHTML += /*html*/ `
        <img src="./img/delete.svg" class="header-logo" alt="Logo" />
        <h1>Papierkorb</h1>`;
}

function noteContent() {
  let logoTitle = document.getElementById("logo-title");

  document.getElementById("note").classList.add("sideBarStyle");
  document.getElementById("note").classList.remove("note");
  document.getElementById("trashbin").classList.remove("sideBarStyle");
  document.getElementById("trashbin").classList.add("trashbin");

  logoTitle.innerHTML = "";
  logoTitle.innerHTML += /*html*/ `
        <img src="./img/logo.PNG" class="header-logo" alt="Logo" />
        <h1>Notizen</h1>`;
}


function addContentToMessageBox() {
  let messageTitle = document.getElementById("addTitle");
  let messageBtn = document.getElementById("addBtn");

  messageTitle.innerHTML = "";
  messageTitle.innerHTML += /*html*/ `
    <input placeholder="Titel" id="name">`

  messageBtn.innerHTML = "";
  messageBtn.innerHTML += /*html*/`
    <button onclick="addContact()">Speichern</button>`
}


function messageBox1() {
  let messageBox2 = document.getElementById("messageContent");

  messageBox2.innerHTML = "";
  messageBox2.innerHTML += /*html*/ `
    <div class="messageBox1" id="messageBox1" onclick="messageBox2()">
        <input placeholder="Notiz" id="phone">   
    </div>`
}


function renderNote() {
  let content = document.getElementById("content");
  let messageContent = document.getElementById("messageContent");

  content.innerHTML = "";
  messageContent.innerHTML = "";
  messageContent.innerHTML += /*html*/ `
    <div class="messageBox1" id="messageBox1">
        <div class="messageTitle" id="addTitle"><!-- <input placeholder="Titel" id="name"> --></div>
        <input placeholder="Notiz" id="phone" onclick="addContentToMessageBox()">
        <div class="messageBtn" id="addBtn"><!-- <button onclick="addContact()">Hinzufügen</button> --></div>
    </div>`;

  for (let i = 0; i < noteTitle.length; i++) {
    const name = noteTitle[i];
    const phoneNumber = noteText[i];

    content.innerHTML += /*html*/ `
        <div class="card">
            <b>${name}</b> <br>
            ${phoneNumber} <br>
            <button onclick="deleteContact(${i})">Löschen</button>
        </div>`;
  }
  noteContent();
}

function renderTrashbin() {
  let messageContent = document.getElementById("messageContent");

  messageContent.innerHTML = "";
  messageContent.innerHTML += /*html*/`
    <div class="clearTrashbin">
      <span>Notizen im Papierkorb werden nach sieben Tagen gelöscht.</span>
      <button id="clearTrashbin">Papierkorb leeren</button>
    </div>`;

  
  trashbinContent();
}

function addContact() {
  let name = document.getElementById("name");
  let phone = document.getElementById("phone");

  noteTitle.push(name.value);
  noteText.push(phone.value);

  renderNote();
  save();
}

function deleteContact(i) {
  noteTitle.splice(i, 1);
  noteText.splice(i, 1);

  renderNote();
  save();
}

function save() {
  let noteTitleAsText = JSON.stringify(noteTitle);
  let noteTextAsText = JSON.stringify(noteText);

  localStorage.setItem("noteTitle", noteTitleAsText);
  localStorage.setItem("noteText", noteTextAsText);
}

function load() {
  let noteTitleAsText = localStorage.getItem("noteTitle");
  let noteTextAsText = localStorage.getItem("noteText");

  if (noteTitleAsText && noteTextAsText) {
    noteTitle = JSON.parse(noteTitleAsText);
    noteText = JSON.parse(noteTextAsText);
  }
}
