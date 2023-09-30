let noteTitles = ["Spaghetti Rezept", "Training"];
let noteTexts = [
  "250g Spaghetti, 1 Glas Barilla-Tomatensauce",
  "20min Cardio, 45min Kraft",
];
let trashbinNoteTitles = ["test1"];
let trashbinNoteTexts = ["testtext bla bla"];
load();

function newStyle(event) {
  let searchbar = document.getElementById("searchbar")
  let searchbarBtn = document.getElementById("searchbarBtn")

      if(event.target == searchbar || event.target == searchbarBtn) {
        searchbar.classList.add("newStyle");
        searchbarBtn.classList.add("newStyle");
      } else {
        searchbar.classList.remove("newStyle");
        searchbarBtn.classList.remove("newStyle");
      }
}

function trashbinContent() {
  let logoTitle = document.getElementById("logo-title");
  let content = document.getElementById("content");

  document.getElementById("trashbin").classList.add("sideBarStyle");
  document.getElementById("trashbin").classList.remove("trashbin");
  document.getElementById("note").classList.remove("sideBarStyle");
  document.getElementById("note").classList.add("note");

  logoTitle.innerHTML = /*html*/ `
        <img src="./img/delete.svg" class="header-logo" alt="Logo" />
        <h1>Papierkorb</h1>`;
}

function noteContent() {
  let logoTitle = document.getElementById("logo-title");

  document.getElementById("note").classList.add("sideBarStyle");
  document.getElementById("note").classList.remove("note");
  document.getElementById("trashbin").classList.remove("sideBarStyle");
  document.getElementById("trashbin").classList.add("trashbin");

  logoTitle.innerHTML = /*html*/ `
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


function closeMessageBox(event) {
  let addTitle = document.getElementById("addTitle");
  let addBtn = document.getElementById("addBtn");
  let messageBox = document.getElementById("messageBox1");
  let messageText = document.getElementById("noteText");
  let messageTitle = document.getElementById("noteTitle")

      if(event.target !== messageText && event.target !== messageTitle) {
        addTitle.classList.add("d-none");
        addBtn.classList.add("d-none");
        messageBox.classList.remove("margin10");
      }
}

function addBtn(i) {
  let Btn = document.getElementById(`Btn${i}`)

  Btn.classList.remove("d-none")
}

function removeBtn(i) {
  let Btn = document.getElementById(`Btn${i}`)

  Btn.classList.add("d-none")
}


function renderNote() {
  let content = document.getElementById("content");
  let messageContent = document.getElementById("messageContent");

  content.innerHTML = "";
  messageContent.innerHTML = /*html*/ `
      <div
        class="messageBox1"
        id="messageBox1"
        onclick="addContentToMessageBox()"
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
        <div class="card" onmouseover="addBtn(${i})" onmouseout="removeBtn(${i})"> <!-- //dran denken für hover effekt!! -->
            <div class="cardTitle" id="cardTitleNote">
              <span>${noteTitle}</span>
            </div>
            <div class="cardNote">
              <span>${noteText}</span>
            </div>
            <div class="cardBtn">
              <button onclick="deleteNote(${i})" class="d-none" id="Btn${i}"><img src="./img/delete.svg" alt=""></button> <!--//funktion fürs löschen und zu trashbin zufügen ändern!! -->
            </div>
        </div>`;
  }
  noteContent();
}

function renderTrashbin() {
  let content = document.getElementById("content");
  let messageContent = document.getElementById("messageContent");

  content.innerHTML = "";
  messageContent.innerHTML = /*html*/ `
    <div class="clearTrashbin">
      <span>Notizen im Papierkorb werden nach sieben Tagen gelöscht.</span>
      <button id="clearTrashbin" onclick="deleteTrashbin()">Papierkorb leeren</button>
    </div>`;

  for (let i = 0; i < trashbinNoteTitles.length; i++) {
    const trashbinNoteTitle = trashbinNoteTitles[i];
    const trashbinNoteText = trashbinNoteTexts[i];

    content.innerHTML += /*html*/ `
        <div class="card" onmouseover="addBtn(${i})" onmouseout="removeBtn(${i})"> <!-- //dran denken für hover effekt!! -->
            <div class="cardTitle" id="cardTitleNote">
              <span>${trashbinNoteTitle}</span>
            </div>
            <div class="cardNote">
              <span>${trashbinNoteText}</span>
            </div>
            <div class="cardBtn">
              <button onclick="restoreNote(${i})" class="d-none" id="Btn${i}"><img src="./img/shift.svg" alt=""></button> <!--//funktion fürs löschen und zu trashbin zufügen ändern!! -->
            </div>
        </div>`;
  }  
  trashbinContent();
}

function addNote() {
  let noteTitle = document.getElementById("noteTitle");
  let noteText = document.getElementById("noteText");

  if (noteTitle.value !== "" || noteText.value !== "") {
    noteTitles.push(noteTitle.value);
    noteTexts.push(noteText.value);
  } else {
    alert("Bitte Titel und/oder Notiz eingeben.")
  }

  renderNote(); 
  save();
}

function deleteNote(i) {
  trashbinNoteTitles.push(noteTitles[i]);
  trashbinNoteTexts.push(noteTexts[i]);

  noteTitles.splice(i, 1);
  noteTexts.splice(i, 1);
  

  renderNote(); 
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
    trashbinNoteTitles = [],
    trashbinNoteTexts = []
    
  save()
}


function save() {
  let noteTitlesAsText = JSON.stringify(noteTitles);
  let noteTextsAsText = JSON.stringify(noteTexts);
  let trashbinNoteTitlesAsText = JSON.stringify(trashbinNoteTitles);
  let trashbinNoteTextsAsText = JSON.stringify(trashbinNoteTexts);

  localStorage.setItem("noteTitles", noteTitlesAsText);
  localStorage.setItem("noteTexts", noteTextsAsText);
  localStorage.setItem("trashbinNoteTitles", trashbinNoteTitlesAsText);
  localStorage.setItem("trashbinNoteTexts", trashbinNoteTextsAsText);
}

function load() {
  let noteTitlesAsText = localStorage.getItem("noteTitles");
  let noteTextsAsText = localStorage.getItem("noteTexts");
  let trashbinNoteTitlesAsText = localStorage.getItem("trashbinNoteTitles");
  let trashbinNoteTextsAsText = localStorage.getItem("trashbinNoteTexts");

  if (noteTitlesAsText && noteTextsAsText) {
    noteTitles = JSON.parse(noteTitlesAsText);
    noteTexts = JSON.parse(noteTextsAsText);
  }

  if (trashbinNoteTitlesAsText && trashbinNoteTextsAsText) {
    trashbinNoteTitles = JSON.parse(trashbinNoteTitlesAsText);
    trashbinNoteTexts = JSON.parse(trashbinNoteTextsAsText);
  }
}
