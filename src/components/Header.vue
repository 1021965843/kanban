<template>
    <div id="myHeader" class="teal d-flex align-center justify-space-between">
        <span class="white--text px-2"> <slot></slot></span>

        <div class="titlebtn">
            <v-icon
                    class="px-2"
                    @click="min"
                    color="white darken-2"
            >
                mdi-window-minimize
            </v-icon>
            <v-icon
                    class="px-2"
                    @click="max"
                    color="white darken-2"
            >
                mdi-window-maximize
            </v-icon>
            <v-icon
                    @click="close"
                    class="px-2"
                    color="white darken-2"
            >
                mdi-window-close
            </v-icon>
        </div>
    </div>
</template>

<script>
    import {ipcRenderer, remote} from "electron"

    let win = remote.getCurrentWindow() || remote.getCurrentWindow()[0]
    export default {
        data() {
            return {};
        },
        methods: {
            min() {
                // ipcRenderer.send("window-min");
                win.minimize()
            },
            max() {
                // ipcRenderer.send("window-max");
                if (win.isMaximized()) {
                    win.restore()
                } else {
                    win.maximize()
                }
            },
            close() {
                // ipcRenderer.send("window-close");
                win.close()
                /*if (!win.isFocused()) {
                    win = null;
                } else {
                    e.preventDefault(); /!*阻止应用退出*!/
                    win.hide(); /!*隐藏当前窗口*!/
                }*/
            },
        },
    };
</script>

<style lang="scss" scoped>
    #myHeader {
        width: 100%;
        height: 40px;
        line-height: 40px;
        /*-webkit-app-region: drag;*/
        // 会导致自定义最大化、最小化、关闭按钮点击没反应，假死状态
    }

    .v-icon.v-icon::after {
        border-radius: unset;
        background-color: unset
    }
</style>
