const path = require('path');
const url = require('url');

const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

const _config = require('./config');
const _module = require('./module');
const { SlackMethods } = _module;

const methods = new SlackMethods(_config.slack.token, _config.slack.user);
let showData = true;

electron.crashReporter.start({
  productName: 'slack-msg-viewer',
  companyName: '',
  submitURL: '',
  uploadToServer: false
});

let mainWindow;

app.on('ready', ()=>{
	mainWindow = new BrowserWindow({width:800, height: 600});

	// mainWindow.loadURL('file://'+__dirname+'/view/index.html');
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, './view/index.html'),
			protocol: "file:",
			slashes: true
		})
	);

	mainWindow.webContents.openDevTools();

	mainWindow.on('closed', () => {
		app.quit();
		mainWindow = null;
	});

});

ipcMain.on('app-ready', (event, arg) => {
    console.log('app front ready');
    console.log(arg);

    // const data = [
    // 	{text:"hjk"},
    // 	{text:"hjk2"}
    // ];
    // event.sender.send('msgs:receive', data);
    if(showData){
	    methods.setSources(['channel']);
	    console.log(0);
	    methods.getMsgs().then(data => {
	    	console.log(1);
	    	event.sender.send('msgs:receive', data);
	    }).then(() => {
	    	showData = false;
	    }).catch(e => console.log(e));
    }

  })
// 	mainWindow.webContents.send('msgs:receive', [{text:"hjk"},{text:"hjk2"}]);


app.on('window-all-closed', ()=>{
	if (process.platform != 'darwin')
		app.quit();
})

