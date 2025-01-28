const API_URL = "http://localhost:8080/api/tasks"; // Ajusta la URL según tu backend

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
let editTaskId = null;

// Obtener tareas
const fetchTasks = async () => {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  renderTasks(tasks);
};

// Renderizar tareas
const renderTasks = (tasks) => {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerHTML = `
      <div>
        <h5>${task.title}</h5>
        <p>${task.description}</p>
      </div>
      <div>
        <button class="btn btn-warning btn-sm me-2" onclick="editTask(${task.id}, '${task.title}', '${task.description}')">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Eliminar</button>
      </div>
    `;
    taskList.appendChild(listItem);
  });
};

// Crear o actualizar tarea
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  if (editTaskId) {
    // Actualizar tarea
    await fetch(`${API_URL}/${editTaskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    editTaskId = null;
  } else {
    // Crear nueva tarea
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
  }

  taskForm.reset();
  fetchTasks();
});

// Editar tarea
const editTask = (id, title, description) => {
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  editTaskId = id;
};

// Eliminar tarea
const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTasks();
};

// Inicializar
fetchTasks();
