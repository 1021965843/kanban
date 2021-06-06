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
    console.log(p)
    /* dialog.showOpenDialog({
         properties: [p]
     }, function (files) {
         if (files) {// 如果有选中
             // 发送选择的对象给子进程
             console.log(files[0])

             event.sender.send('selectedItem', files[0])
         }
     })*/
    dialog.showOpenDialog(win, {
        properties: [p]
    }).then(res => {
        event.sender.send('selectedItem', res.filePaths[0])
    })
});