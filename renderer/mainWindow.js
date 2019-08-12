'use strict';

const { ipcRenderer } = require('electron');

const deleteTask = (e) => {
    ipcRenderer.send('deletetask')
};

const createTask = (e) => {
    ipcRenderer.
}
