// The main electron Modules

const {app, ipcMain} = require('electron')
const path = require('path')

const Window = require('./Window.js')
const DataStore = require('./DataStore.js')

require('electron-reload');

// create the Store for my tasks
const taskData =new DataStore({name: 'Task List'})

function main () {
    // Task list window
    let mainWindow = new Window({
        file: path.join('renderer', 'mainWindow'.html)
    })

    // Add taskWindow
    let addTaskWindow

    //Initialize Task datastore
    mainWindow.once('show', () =>  {
        mainWindow.webContents.send('tasks', taskList.tasks)
    })
}


let addTaskWindow;
// Listen for application to be ready
app.on('ready', function(){
    // Create the main window
    mainWindow = new BrowserWindow(
        {
            webPreferences: {nodeIntegration: true}
        }
    )




    // Load HTML file into window
    mainWindow.loadURL(url.format({
        pathname: path.join('renderer', mainWindow.html'),
        protocol: 'file',
        slashes: true,
    })
)

    // Close all when closing main Window
    mainWindow.on('closed', function(){
        app.quit();
    });
    //Build menu from Template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Handle create addTaskWindow
function createAddTaskWindow(){
    // Create the add task window
    addTaskWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add your new task',
        webPreferences: {nodeIntegration: true}
    });
};


// Menu Template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label: 'Add task',
                accelerator: 'CmdOrCtrl + Shift + A',
                click(){
                    createAddTaskWindow();
                },
                label: 'Remove Task',
                click(){

                }
            }]

}]

/// Menu contains Add Task

/// Menu contains showResults
