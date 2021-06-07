<template>
    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                persistent
                max-width="450"
        >
            <v-card>
                <v-card-title class="text-h5">
                    WELCOME TO KANBAN MANAGER
                </v-card-title>
                <v-card-text>you kan setup default folder to store your projects!
                </v-card-text>
                <v-divider></v-divider>
                <FolderSelect v-model="defaultFolder" @checkFolderExists="checkFolderExists"></FolderSelect>
                <v-card-actions>
                    <v-spacer></v-spacer>
<!--                    <v-btn-->
<!--                            color="green darken-1"-->
<!--                            text-->
<!--                            @click="dialog = false"-->
<!--                    >-->
<!--                        Disagree-->
<!--                    </v-btn>-->
                    <v-btn
                            color="green darken-1"
                            text
                            @click="setFolderDone"
                    >
                        Agree
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
    import FolderSelect from "./FolderSelect";

    export default {
        name: "firstUse",
        components: {
            FolderSelect
        },
        data() {
            return {
                dialog: true,
                defaultFolder: null,
                folderExists:false
            }
        },
        methods: {
            setFolderDone() {
                if(!this.folderExists){
                    return
                }

                this.$router.replace({
                    path: "/home"
                })
                this.dialog = false
            },
            checkFolderExists(val){
                this.folderExists = val
            }
        }
    }
</script>