'use strict'

//Require the basics for a window
const { ipcRenderer } = require('electron')

//Get the form from the HTML document
document.getElementById('taskForm').addEventListener('submit', (evt) => {
    //Prevent default refresh functionality for forms
    evt.preventDefault()

    // Grab Input from the form
    const input = evt.target[0]

    //Send the task to the main process
    ipcRenderer.send('add-task', input.value)

    //reset Input values
    input.value = '';
})
