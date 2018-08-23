const path = require('path');
const url = require('url');

const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

const _config = require('./config');
const _module = require('./module');
const { SlackMethods } = _module;

const methods = new SlackMethods(_config.slack.token, _config.slack.user);

electron.crashReporter.start({
  productName: '',
  companyName: '',
  submitURL: '',
  uploadToServer: false
});

let showData = true;
let mainWindow;

app.on('ready', ()=>{
	mainWindow = new BrowserWindow({width:800, height: 600});

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, './view/index.html'),
			protocol: "file:",
			slashes: true
		})
	);

	// mainWindow.webContents.openDevTools();

	mainWindow.on('closed', () => {
		app.quit();
		mainWindow = null;
	});

});

app.on('window-all-closed', ()=>{
	if (process.platform != 'darwin')
		app.quit();
});


ipcMain.on('msg-sources', (event, arg) => {
    console.log('app-front is ready');

    if(showData){
	    // methods.setSources(['channel', 'mpim', 'im', 'group']);
	    console.log('slack-message sources:',arg);
	    methods.setSources(arg);
	    methods.getMsgs().then(data => {
	    	event.sender.send('msgs:receive', data);
	    }).then(() => {
	    	showData = false;
	    }).catch(e => console.log(e));
    }
});



