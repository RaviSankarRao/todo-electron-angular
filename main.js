const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const hostServer = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

// Parsers
hostServer.use(bodyParser.urlencoded({extended: false}));
hostServer.use(bodyParser.json());
hostServer.use(allowCrossDomain);

// Angular DIST output folder
hostServer.use(express.static(path.join(__dirname, 'dist')));

// API location
hostServer.use('/api', require('./server/notesdata'));
// hostServer.use('/api', require('./server/routes/booksApi'));
// hostServer.use('/api', require('./server/routes/loginApi'));

// Send all other requests to the Angular hostServer
hostServer.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/anytime-library/index.html'));
});

// Set port
const port = process.env.PORT || 3000;
hostServer.set('port', port);

// const server = http.createServer(hostServer);
// server.listen(port, () => console.log(`Running on localhost: ${port}`));

const electron = require('electron');
const url = require('url');


const { app, BrowserWindow } = electron;

let mainWindow;

function createWindow () {

    const server = http.createServer(hostServer);
    server.listen(port, () => console.log(`Running on localhost: ${port}`));

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