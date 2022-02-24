// Data
var data = require("../assets/tasks.json");

//#region GET
// Summary: return the tasks to be shown on the table
export const getTasks = (filters) => {
  // Get data stored on the browser
  let filteredData = localStorage.getItem("tasks");

  // Initialize the data
  if (filteredData === null) {
    localStorage.setItem("tasks", JSON.stringify(data));
    filteredData = data;
  } else {
    filteredData = JSON.parse(filteredData);
  }

  // Making the filters by title and / or status
  if (filters) {
    if (filters.title) {
      filteredData = filteredData.filter(
        (data) => data.title && data.title.includes(filters.title)
      );
    }
    if (filters.status && filters.status !== "All") {
      filteredData = filteredData.filter(
        (data) => data.status && data.status.includes(filters.status)
      );
    }
  }

  return filteredData;
};

// Summary: return the task by id to be shown on the edition modal
export const getTask = (id) => {
  let tasks = localStorage.getItem("tasks");
  tasks = tasks ? JSON.parse(tasks) : data;

  return tasks.find((task) => task.id === id);
};
//#endregion
//#region POST
// Summary: save the new task into the storage of the browser
export const createTask = (task) => {
  let tasks = localStorage.getItem("tasks");
  tasks = tasks ? JSON.parse(tasks) : data;
  // Get the lastest id from the tasks and add +1
  const lastId = Math.max.apply(
    Math,
    tasks.map((task) => task.id)
  );
  task.id = lastId + 1;
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
//#endregion
//#region PUT
// Summary: update a task into the storage of the browser
export const updateTask = (task) => {
  console.log(task);
  let tasks = localStorage.getItem("tasks");
  tasks = tasks ? JSON.parse(tasks) : data;
  const index = tasks.findIndex((item) => item.id === task.id);
  tasks[index] = task;
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
//#endregion
//#region DELETE
// Summary: logical deletion of a task
export const deleteTask = (id) => {
  let tasks = localStorage.getItem("tasks");
  tasks = tasks ? JSON.parse(tasks) : data;
  const index = tasks.findIndex((item) => item.id === id);
  tasks[index].status = "Deleted";
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
//#endregion
