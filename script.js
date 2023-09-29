let noteTitles = ["Spaghetti Rezept", "Training"];
let noteTexts = [
  "250g Spaghetti, 1 Glas Barilla-Tomatensauce",
  "20min Cardio, 45min Kraft",
];
let trashbinNoteTitles = ["test1"];
let trashbinNoteTexts = ["testtext bla bla"];
load();

function newStyle() {
  document.getElementById("searchbarBtn").classList.add("newStyle");
  document.getElementById("searchbar").classList.add("newStyle");
  console.log("added");
}

function oldStyle() {
  document.getElementById("searchbarBtn").classList.remove("newStyle");
  document.getElementById("searchbar").classList.remove("newStyle");
  console.log("removed");
}

function trashbinContent() {
  let logoTitle = document.getElementById("logo-title");
  let content = document.getElementById("content");

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
  let messageBox = document.getElementById("messageBox1");

  messageTitle.classList.remove("d-none");
  messageBtn.classList.remove("d-none");
  messageBox.classList.add("margin10");
}

// function removeContentFromMessageBox() {
//   let messageBox2 = document.getElementById("messageContent");

//   messageBox2.innerHTML = "";
//   messageBox2.innerHTML += /*html*/ `
//     <div class="messageBox1" id="messageBox1" onclick="messageBox2()">
//         <input placeholder="Notiz" id="noteText">
//     </div>`
// }

function addCardHover() {}

function deleteCardHover() {}

function renderNote() {
  let content = document.getElementById("content");
  let messageContent = document.getElementById("messageContent");

  content.innerHTML = "";
  messageContent.innerHTML = "";
  messageContent.innerHTML += /*html*/ `
      <div
        class="messageBox1"
        id="messageBox1"
        onclick="addContentToMessageBox()"
        onmouseleave="renderNote()"
      >
        <div class="messageTitle d-none" id="addTitle">
          <textarea placeholder="Titel" id="noteTitle"></textarea>
        </div>
        <textarea
          type="text"
          cols="40"
          rows="2"
          placeholder="Notiz schreiben..."
          id="noteText"
        ></textarea>
        <div class="messageBtn d-none" id="addBtn">
          <button class="messageBtn" onclick="addNote()">Speichern</button>
        </div>
      </div>`;

  for (let i = 0; i < noteTitles.length; i++) {
    const noteTitle = noteTitles[i];
    const noteText = noteTexts[i];

    content.innerHTML += /*html*/ `
        <div class="card" onmouseover="addCardHover()" onmouseout="deleteCardHover()"> <!-- //dran denken für hover effekt!! -->
            <div class="cardTitleNote" id="cardTitleNote">
              <b>${noteTitle}</b> <br>
              ${noteText} <br>
            </div>
            <div class="cardBtn" id="cardBtn">
              <button onclick="deleteNote(${i})"><img src="./img/delete.svg" alt=""></button> <!--//funktion fürs löschen und zu trashbin zufügen ändern!! -->
            </div>
        </div>`;
  }
  noteContent();
}

function renderTrashbin() {
  let content = document.getElementById("content");
  let messageContent = document.getElementById("messageContent");

  content.innerHTML = "";
  messageContent.innerHTML = "";
  messageContent.innerHTML += /*html*/ `
    <div class="clearTrashbin">
      <span>Notizen im Papierkorb werden nach sieben Tagen gelöscht.</span>
      <button id="clearTrashbin" onclick="deleteTrashbin()">Papierkorb leeren</button>
    </div>`;

  for (let i = 0; i < trashbinNoteTitles.length; i++) {
    const trashbinNoteTitle = trashbinNoteTitles[i];
    const trashbinNoteText = trashbinNoteTexts[i];

    content.innerHTML += /*html*/ `
        <div class="card" onmouseover="addCardHover()" onmouseout="deleteCardHover()"> <!-- //dran denken für hover effekt!! -->
            <div class="cardTitleNote" id="cardTitleNote">
              <b>${trashbinNoteTitle}</b> <br>
              ${trashbinNoteText} <br>
            </div>
            <div class="cardBtn" id="cardBtn">
              <button onclick="restoreNote(${i})"><img src="./img/shift.svg" alt=""></button> <!--//funktion fürs löschen und zu trashbin zufügen ändern!! -->
            </div>
        </div>`;
  }  
  trashbinContent();
}

function addNote() {
  let noteTitle = document.getElementById("noteTitle");
  let noteText = document.getElementById("noteText");

  noteTitles.push(noteTitle.value);
  noteTexts.push(noteText.value);

  trashbinNoteTitles.splice()
  trashbinNoteTexts.splice()

  renderNote(); //if statment für renderNote oder renderTrashbin
  save();
}

function deleteNote(i) {
  trashbinNoteTitles.push(noteTitles[i]);
  trashbinNoteTexts.push(noteTexts[i]);

  noteTitles.splice(i, 1);
  noteTexts.splice(i, 1);
  

  renderNote(); //if statment für renderNote oder renderTrashbin
  save();
}

function restoreNote(i) {
  noteTitles.push(trashbinNoteTitles[i]);
  noteTexts.push(trashbinNoteTexts[i]);

  trashbinNoteTitles.splice(i, 1);
  trashbinNoteTexts.splice(i, 1);

  renderTrashbin();
  save();
}

function deleteTrashbin() {
  let content = document.getElementById("content");

  content.innerHTML = "";
  return trashbinNoteTitles = [],
         trashbinNoteTexts = []
}


function save() {
  let noteTitlesAsText = JSON.stringify(noteTitles);
  let noteTextsAsText = JSON.stringify(noteTexts);

  localStorage.setItem("noteTitles", noteTitlesAsText);
  localStorage.setItem("noteTexts", noteTextsAsText);
}

function load() {
  let noteTitlesAsText = localStorage.getItem("noteTitles");
  let noteTextsAsText = localStorage.getItem("noteTexts");

  if (noteTitlesAsText && noteTextsAsText) {
    noteTitles = JSON.parse(noteTitlesAsText);
    noteTexts = JSON.parse(noteTextsAsText);
  }
}
