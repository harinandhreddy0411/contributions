const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("searchInput");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function showNotes(filteredNotes = notes) {
  notesContainer.innerHTML = "";

  filteredNotes.forEach((note) => {
    const div = document.createElement("div");

    div.classList.add("note");

    div.innerHTML = `
      <p>${note.text}</p>

      <button class="editBtn">Edit</button>

      <button class="deleteBtn">Delete</button>
    `;

    const editBtn = div.querySelector(".editBtn");
    const deleteBtn = div.querySelector(".deleteBtn");

    editBtn.addEventListener("click", () => {
      const updatedText = prompt("Edit your note:", note.text);

      if (updatedText !== null && updatedText.trim() !== "") {
        note.text = updatedText.trim();

        saveNotes();

        showNotes();
      }
    });

    deleteBtn.addEventListener("click", () => {
      notes = notes.filter(n => n.text !== note.text);

      saveNotes();

      showNotes();
    });

    notesContainer.appendChild(div);
  });
}
addBtn.addEventListener("click", () => {
  const text = noteInput.value.trim();

  if (text === "") return;

  notes.push({
    text: text
  });

  saveNotes();

  showNotes();

  noteInput.value = "";
});

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchText)
  );

  showNotes(filteredNotes);
});

showNotes();