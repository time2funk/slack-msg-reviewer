const path = require('path');
const url = require('url');

const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

const _config = require('./config');
const _module = require('./module');
const { SlackMethods, Polly } = _module;

const methods = new SlackMethods(_config.slack);
const polly = new Polly(_config.polly);

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


ipcMain.on('msg-sources', (event, args) => {
    console.log('app-front is ready');

    if(showData){
	    console.log('slack-message sources:', args);

	    // args = ['channel', 'mpim', 'im', 'group'];
	    methods.setSources(args) ;
	    methods.getMsgs().then(msgs => {
	    	console.log(msgs);

	    	// collect msgs in to the string
	    	let text = "";
	    	msgs.forEach(i => {
	    		text += `${i.from}! ${i.text}...`;
	    	});
	    	polly.getVoice(text).then(voice => {
	    		// send data to the Front
	    		event.sender.send('msgs:receive', {
	    			msgs: msgs,
	    			voice: voice
	    		});
	    	});
	    }).then(() => {
	    	showData = false;
	    }).catch(e => console.log(e));
    }
});



