(function () {
    const {Menu, ipcMain, BrowserWindow} = require('electron')
    // 右键菜单
    var win = BrowserWindow.getFocusedWindow();
    const contextMenutemplate = [
        {
            label: "复制",
            role: 'copy'
        },
        {
            label: "粘贴",
            role: 'paste'
        },
        {
            type: 'separator'// 分割线
        },
        {
            label: "控制台",
            click: () => {
                win.webContents.openDevTools()
            }
        },
    ]
    const contextMenu = Menu.buildFromTemplate(contextMenutemplate)
    ipcMain.on('contextmenu', function () {
        contextMenu.popup(BrowserWindow.getFocusedWindow())
    })


})()