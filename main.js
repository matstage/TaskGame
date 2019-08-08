const {app, BrowserWindow, ipcMain, Menu, ipcMain, ipcRenderer} = require('electron');
const url = require('url');
const path = require('path');

const Window = require('./Window.js');
const DataStore = require('./DataStore.js');

let mainWindow;
let addTaskWindow;
let showResultsWindow;

// Listen for application to be ready
app.on('ready', function(){
    // Create the main window
    mainWindow = new BrowserWindow(
        {
            webPreferences: {nodeIntegration: true}
        }
    );
    // Load HTML file into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true,
    }));

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

// Handle showResultsWindow
function createShowResultsWindow(){
    showResultsWindow = new Browser({
        width: 400,
        height: 200,
        title: 'Your task success rate',
        webPreferences: {nodeIntegration: true}
    });
}


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
