<template>
    <v-toolbar class="mx-2 pa-2 px-4 transparent elevation-0">
        <v-text-field
                :label="label ? label : 'Folder'"
                class="pt-2 mt-1"
                light
                v-model="folder"
                solo
        ></v-text-field>
        <div>
            <v-icon v-if="folderExists" color="success">
                mdi-check
            </v-icon>
            <v-icon v-else color="error">
                mdi-close
            </v-icon>
        </div>
        <v-btn
                @click="openDialog"
                class="elevation-5 justify-right text-xs-right"
                color="primary"
                style="border-radius:0;"
        >
            BROWSE
        </v-btn>
    </v-toolbar>
</template>
<script>
    const fs = require("fs");
    const os = require("os");
    const path = require("path");
    import {mapActions} from "vuex"
    import {ipcRenderer} from "electron"

    const {dialog} = require('electron').remote
    const {remote} = require('electron')
    console.log(remote)

    export default {
        name: "FolderSelect",
        props: {
            value: String,
            label: String
        },
        data() {
            return {
                folder: this.value
            };
        },
        watch: {
            folder(value) {
                this.$emit("input", this.folder);
            }
        },
        computed: {
            folderExists() {
                return fs.existsSync(this.folder);
            }
        },
        methods: {
            ...mapActions([
                "setfilePath"
            ]),
            openDialog() {
                /*ipcRenderer.send('open-directory-dialog', 'openDirectory');
                ipcRenderer.on('selectedItem', this.getPath);
                ipcRenderer.on('openDialogError', (err) => {
                    console.log(err)
                });*/
                const dir = dialog.showOpenDialogSync({
                    properties: ['openDirectory']
                })
                console.log(dir)
                this.dealPath(dir[0])
            },
            dealPath(dbpath) {
                this.folder = path.join(dbpath, 'data.json');
                const emptyDb = {
                    "todo": {
                        "data": []
                    },
                    "done": {
                        "data": []
                    },
                    "config": {
                        "tags": []
                    }
                }
                this.setfilePath(this.folder)
                localStorage.setItem("filePath", this.folder)
                fs.writeFileSync(this.folder, JSON.stringify(emptyDb))
                this.$forceUpdate()
                this.$emit('checkFolderExists', fs.existsSync(this.folder))
            },
            getPath(e, dbpath) {
                console.log(e, dbpath)
                this.folder = path.join(dbpath, 'data.json');
                const emptyDb = {
                    "todo": {
                        "data": []
                    },
                    "done": {
                        "data": []
                    },
                    "config": {
                        "tags": []
                    }
                }
                this.setfilePath(this.folder)
                localStorage.setItem("filePath",this.folder)
                fs.writeFileSync(this.folder, JSON.stringify(emptyDb))
                this.$forceUpdate()
                this.$emit('checkFolderExists', fs.existsSync(this.folder))
            }
        },

    };
</script>

<style scoped></style>
