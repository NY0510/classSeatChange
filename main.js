const { Menu, MenuItem, ipcMain, BrowserWindow, app } = require("electron");
const path = require("path");
const url = require("url");
const updater = require("./updater");

let win;

const createWindow = () => {
	console.log("update start");
	updater();

	win = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		show: false,
		backgroundColor: "#272727",
		width: 900,
		height: 850,
		minWidth: 900,
		minHeight: 850,
		icon: path.join(__dirname, "assets", "icon.ico"),
	});

	win.once("ready-to-show", () => win.show());

	const version = app.getVersion();
	win.setTitle(`자리자리자리 v${version}`);

	win.loadURL(
		url.format({
			pathname: path.join(__dirname, "index.html"),
			protocol: "file:",
			slashes: true,
		})
	);

	win.webContents.openDevTools();
};

const menu = new Menu();
menu.append(
	new MenuItem({
		label: "Edit",
		submenu: [
			{
				role: "zoomIn",
				accelerator: "CommandOrControl+=",
			},
			{
				role: "zoomOut",
			},
			{
				role: "resetZoom",
			},
			{
				role: "reload",
			},
			{
				type: "separator",
			},
			{
				id: "print",
				label: "PDF로 내보내기",
				accelerator: "CommandOrControl+P",
				click: e => {
					win.webContents.send("print", e.checked);
				},
			},
		],
	})
);

Menu.setApplicationMenu(menu);

const quit = () => {
	if (process.platform !== "darwin") app.quit();
};

app.on("ready", createWindow);
app.on("window-all-closed", quit);
