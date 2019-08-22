// The main electron Modules

const path = require('path');
const {app, ipcMain} = require('electron');

const Window = require('./Window.js');
const DataStore = require('./DataStore.js');


require('electron-reload')(__dirname);

// create the Store for my tasks
const taskData = new DataStore({name: 'Task List'});

function main () {
    // Create Task list window in memory
    let mainWindow = new Window({
        file: path.join('renderer', 'mainWindow.html')
    });

    // Add task Window in memory
    let addTaskWindow

    //Initialize mainWindow with Task datastore
    //'show' means what it says about the window
    mainWindow.once('show', () =>  {
        mainWindow.webContents.send('tasks', taskData.tasks);
    });

    //Event Handlers
    //Create add Task Window
    ipcMain.on('add-task-window', () => {
        // Create the new window when users click 'Add Task'
        if(!addTaskWindow){
            //create new Add Task Window
            addTaskWindow = new Window({
                file: path.join('renderer', 'addTaskWindow.html'),
                width: 400,
                height: 400,
                // make addTaskWindow a child to the mainWindow
                parent: mainWindow
            });

            //Cleanup Add Task Window
            addTaskWindow.on('closed', () => {
                addTaskWindow = null;
            })
        }
    });

    //New task incoming event

    ipcMain.on('add-task', (event, task) => {
        const updatedTasks = taskData.addTask(task).tasks

        //Update the window
        mainWindow.send('tasks', updatedTasks)
    })

    //Delete Task Event
    ipcMain.on('delete-task', (event, task) => {
        const updatedTasks = taskData.deleteTask(task).tasks

        mainWindow.send('tasks', updatedTasks)
    })

}
// End of function main

// Listen for application to be ready
app.on('ready', main);

app.on('window-all-closed', function() {
    app.quit()
})
