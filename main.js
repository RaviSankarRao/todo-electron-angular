const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow } = electron;

let mainWindow;

function createWindow () {

    //Create the browser window
    mainWindow = new BrowserWindow({});


    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

    mainWindow.webContents.openDevTools();

    mainWindow.on('close', function() {
        mainWindow = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', function() {

    if (process.platform !== 'darwin') {
        app.quit();
    }
});