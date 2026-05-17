const noteInput = document.getElementById("noteInput");
const categoryInput = document.getElementById("categoryInput");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const notesContainer = document.getElementById("notesContainer");
const noteCount = document.getElementById("noteCount");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function showNotes(filteredNotes = notes) {
  notesContainer.innerHTML = "";

  noteCount.innerText = `Total Notes: ${filteredNotes.length}`;

  if (filteredNotes.length === 0) {
    notesContainer.innerHTML = "<p>No notes found</p>";
    return;
  }

  filteredNotes.forEach((note) => {
    const div = document.createElement("div");

    div.classList.add("note");

    div.innerHTML = `
      <p><strong>Note:</strong> ${note.text}</p>
      <p><strong>Category:</strong> ${note.category}</p>
      <p><strong>Date:</strong> ${note.date}</p>

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
      notes = notes.filter(n => n.date !== note.date);

      saveNotes();

      showNotes();
    });

    notesContainer.appendChild(div);
  });
}

addBtn.addEventListener("click", () => {
  const text = noteInput.value.trim();
  const category = categoryInput.value.trim();

  if (text === "" || category === "") return;

  notes.push({
    text: text,
    category: category,
    date: new Date().toLocaleString()
  });

  saveNotes();

  showNotes();

  noteInput.value = "";
  categoryInput.value = "";
});

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchText)
  );

  showNotes(filteredNotes);
});

noteInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

showNotes();