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
    import {ipcRenderer} from "electron"

    export default {
        data() {
            return {};
        },
        methods: {
            min() {
                ipcRenderer.send("window-min");
            },
            max() {
                ipcRenderer.send("window-max");
            },
            close() {
                ipcRenderer.send("window-close");
            },
        },
    };
</script>

<style lang="scss" scoped>
    #myHeader {
        width: 100%;
        height: 40px;
        line-height: 40px;
        -webkit-app-region: drag;
    }

    .v-icon.v-icon::after {
        border-radius: unset;
        background-color: unset
    }
</style>
