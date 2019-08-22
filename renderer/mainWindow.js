'use strict';

const { ipcRenderer } = require('electron');

//Delete a task from existing list
const deleteTask = (e) => {
    ipcRenderer.send('delete-task', e.target.textContent)
};

//Handle the updating the stored tasks
ipcRenderer.on('tasks', (event, tasks) => {
    //get the list from storage
    const taskList = document.getElementById('taskList')

    //make it an HTML string
    const taskItems = tasks.reduce((html, task) =>
          {
        html += `<li class="task-item">${task}</li>`
              console.log(task);
        return html
          }, '')

    // Set the list 'html' to the tasklist
    taskList.innerHTML = taskItems

    // Add handlers to erase clicked tasks
    taskList.querySelectorAll('.task-item').forEach(item => {
        item.addEventListener('click', deleteTask)
    })
})


//Create the actions of the button on the page
document.getElementById('createTaskBtn').addEventListener('click', (e) =>{
    ipcRenderer.send('add-task-window');
});
