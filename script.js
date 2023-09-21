let noteTitle = ["Spaghetti Rezept", "Training"];
let noteText = [
  "250g Spaghetti, 1 Glas Barilla-Tomatensauce",
  "20min Cardio, 45min Kraft",
];
load();

function newStyle() {
  document.getElementById("searchbarBtn").classList.add("newStyle");
  document.getElementById("searchbar").classList.add("newStyle");
}

function oldStyle() {
  document.getElementById("searchbarBtn").classList.remove("newStyle");
  document.getElementById("searchbar").classList.remove("newStyle");
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

function renderNote() {
  let content = document.getElementById("content");

  content.innerHTML = "";
  content.innerHTML += /*html*/ `
    <div class="messageBox">
        <!-- <input placeholder="Titel" id="name"> -->
        <input placeholder="Notiz" id="phone">
        <!-- <button onclick="addContact()">Hinzufügen</button> -->
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
  let content = document.getElementById("content");

  content.innerHTML = "";
  content.innerHTML += /*html*/`
  <div class="clearTrashbin">
  <span>Notizen im Papierkorb werden nach sieben Tagen gelöscht.</span>
  <button id="clearTrashbin">Papierkorb leeren</button>
  </div>`;

  content.innerHTML += /*html*/ `
    <div>
        <input placeholder="Titel" id="name">
        <input placeholder="Notiz" id="phone">
        <button onclick="addContact()">Hinzufügen</button>
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
  trashbinContent();
}

function addContact() {
  let name = document.getElementById("name");
  let phone = document.getElementById("phone");

  noteTitle.push(name.value);
  noteText.push(phone.value);

  renderNote();
  renderTrashbin();
  save();
}

function deleteContact(i) {
  noteTitle.splice(i, 1);
  noteText.splice(i, 1);

  renderNote();
  renderTrashbin();
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
