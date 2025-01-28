const API_URL = "http://localhost:8080/api/tasks";

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Obtener tareas
const fetchTasks = async () => {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerHTML = `
      <div>
        <h5>${task.title}</h5>
        <p>${task.description}</p>
      </div>
      <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Eliminar</button>
    `;
    taskList.appendChild(listItem);
  });
};

// Crear tarea
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });

  taskForm.reset();
  fetchTasks();
});

// Eliminar tarea
const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTasks();
};

// Inicializar
fetchTasks();
