const API_URL = window.API_BASE_URL + "/games";
let editingId = null;

function getAuthHeaders() {
  const creds = JSON.parse(sessionStorage.getItem("credentials"));
  if (!creds) return {};
  const encoded = btoa(`${creds.username}:${creds.password}`);
  return { Authorization: `Basic ${encoded}`, "Content-Type": "application/json" };
}

function logout() {
  sessionStorage.clear();
  location.href = "login.html";
}

function cancelEdit() {
  editingId = null;
  document.getElementById("submitBtn").textContent = "Add Game";
  document.getElementById("cancelBtn").classList.add("d-none");
  clearForm();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("studio").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("price").value = "";
}

async function fetchGames() {
  const res = await fetch(API_URL, { headers: getAuthHeaders() });
  const data = await res.json();
  const container = document.getElementById("games");
  container.innerHTML = "";

  data.forEach(game => {
    const div = document.createElement("div");
    div.className = "col-md-4 mb-3";
    div.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${game.title}</h5>
          <p class="card-text"><strong>Studio:</strong> ${game.studio}</p>
          <p class="card-text"><strong>Genre:</strong> ${game.genre}</p>
          <p class="card-text"><strong>Price:</strong> $${game.price}</p>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <button class="btn btn-sm btn-primary" onclick="editGame('${game._id}', '${game.title}', '${game.studio}', '${game.genre}', ${game.price})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteGame('${game._id}')">Delete</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

function editGame(id, title, studio, genre, price) {
  editingId = id;
  document.getElementById("title").value = title;
  document.getElementById("studio").value = studio;
  document.getElementById("genre").value = genre;
  document.getElementById("price").value = price;
  document.getElementById("submitBtn").textContent = "Update Game";
  document.getElementById("cancelBtn").classList.remove("d-none");
}

async function deleteGame(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  fetchGames();
}

document.getElementById("gameForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const game = {
    title: document.getElementById("title").value,
    studio: document.getElementById("studio").value,
    genre: document.getElementById("genre").value,
    price: parseFloat(document.getElementById("price").value),
  };

  const method = editingId ? "PUT" : "POST";
  const url = editingId ? `${API_URL}/${editingId}` : API_URL;

  await fetch(url, {
    method,
    headers: getAuthHeaders(),
    body: JSON.stringify(game)
  });

  cancelEdit();
  fetchGames();
});

document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("credentials")) {
    location.href = "login.html";
  } else {
    fetchGames();
  }
});
