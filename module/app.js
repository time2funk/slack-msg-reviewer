const path = require('path');
const url = require('url');

const electron = require('electron');
const { app, BrowserWindow } = electron;
// const { app, BrowserWindow, ipcMain } = electron;


electron.crashReporter.start({
  productName: '',
  companyName: '',
  submitURL: '',
  uploadToServer: true
});

let mainWindow;

app.on('ready', ()=>{
	mainWindow = new BrowserWindow({width:800, height: 600});

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, '../view/index.html'),
			protocol: "file:",
			slashes: true
		})
	);
	// mainWindow.loadURL('file://'+__dirname+'/view/index.html');

	mainWindow.webContents.openDevTools();

	mainWindow.on('closed', () => {
		app.quit();
		mainWindow = null;
	});
});

app.on('window-all-closed', ()=>{
	if (process.platform != 'darwin')
		app.quit();
})


function sendDataToApp(data){
	mainWindow.webContents.send('msgs:receive', data);
}

// module.exports = { app, mainWindow };
module.exports = { app, sendDataToApp };