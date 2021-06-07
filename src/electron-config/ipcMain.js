const {ipcMain, BrowserWindow, dialog} = require('electron')
const win = BrowserWindow.getFocusedWindow()
ipcMain.on('window-min', () => {
    win.minimize()
})

ipcMain.on('window-max', () => {
    if (win.isMaximized()) {
        win.restore()
    } else {
        win.maximize()
    }
})
ipcMain.on('window-close', () => {
    win.close()
})

ipcMain.on('open-directory-dialog', function (event, p) {
    dialog.showOpenDialog(win, {
        properties: [p]
    }).then(res => {
        event.sender.send('selectedItem', res.filePaths[0])
    }).catch(err => {
        event.sender.send('openDialogError', err)
        console.log(err)
    })
});