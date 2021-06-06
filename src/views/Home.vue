<template>
    <div>
        <div class="home d-flex" v-if="!searchContent">
            <div style="width: 49%" class="pa-2">
                <div class="text-center title font-weight-bold">TODOLIST</div>
                <draggable
                        class="scroll-con"
                        :style="{'height':winHeight+'px'}"
                        group="notes" @change="log"
                        :list="toDoList"
                >
                    <v-card
                            height="120"
                            class="todonote mb-2"
                            v-for="item in toDoList"
                    >
                        <div class="pa-2 d-flex justify-space-between">
                            <span>{{item.title}}</span>
                            <div>
                                <v-icon>mdi-pencil-outline</v-icon>
                                <v-icon class="ml-2"
                                        @click="removeNote('todo',item.title,item.id)">
                                    mdi-trash-can-outline
                                </v-icon>
                            </div>
                        </div>
                        <v-divider></v-divider>
                        <div class="pa-2">
                            <v-chip class="mx-1"
                                    v-for="tag in item.tag"
                                    label x-small
                                    :color="tag.color"
                                    text-color="white"
                            >
                                {{tag.name}}
                            </v-chip>
                            <div>
                                {{item.description}}
                            </div>
                        </div>
                    </v-card>
                </draggable>
            </div>
            <v-divider vertical></v-divider>
            <div style="width: 49%" class="pa-2">
                <div class="text-center title font-weight-bold">DONELIST</div>
                <draggable
                        class="scroll-con"
                        :style="{'height':winHeight+'px'}"
                        :list="doneList" group="notes" @change="log"
                >
                    <v-card
                            height="120"
                            class="donenote mb-2"
                            v-for="item in doneList"
                    >
                        <div class="pa-2 d-flex justify-space-between">
                            <span>{{item.title}}</span>
                            <div>
                                <v-icon>mdi-pencil-outline</v-icon>
                                <v-icon @click="removeNote('done',item.title,item.id)">mdi-trash-can-outline</v-icon>
                            </div>
                        </div>
                        <v-divider></v-divider>
                        <div class="pa-2">
                            <v-chip class="mx-1"
                                    v-for="tag in item.tag"
                                    label x-small
                                    :color="tag.color"
                                    text-color="white"
                            >
                                {{tag.name}}
                            </v-chip>
                            <div>
                                {{item.description}}
                            </div>
                        </div>
                    </v-card>
                </draggable>
            </div>
        </div>


        <div class="home d-flex" v-if="searchContent">
            <div style="width: 49%" class="pa-2">
                <div class="text-center title font-weight-bold">TODOLIST</div>
                <draggable
                        class="scroll-con"
                        :style="{'height':winHeight+'px'}"
                        group="notesFilter"
                        :list="toDoListFilter"
                >
                    <v-card
                            height="120"
                            class="todonote mb-2"
                            v-for="item in toDoListFilter"
                    >
                        <div class="pa-2">{{item.title}}</div>
                        <v-divider></v-divider>
                        <div class="pa-2">
                            <v-chip class="mx-1"
                                    v-for="tag in item.tag"
                                    label x-small
                                    :color="tag.color"
                                    text-color="white"
                            >
                                {{tag.name}}
                            </v-chip>
                            <div>
                                {{item.description}}
                            </div>
                        </div>
                    </v-card>
                </draggable>
            </div>
            <v-divider vertical></v-divider>
            <div style="width: 49%" class="pa-2">
                <div class="text-center title font-weight-bold">DONELIST</div>
                <draggable
                        class="scroll-con"
                        :style="{'height':winHeight+'px'}"
                        :list="doneListFilter"
                        group="notesFilter"
                >
                    <v-card
                            height="120"
                            class="donenote mb-2"
                            v-for="item in doneListFilter"
                    >
                        <div class="pa-2">{{item.title}}</div>
                        <v-divider></v-divider>
                        <div class="pa-2">
                            <v-chip class="mx-1"
                                    v-for="tag in item.tag"
                                    label x-small
                                    :color="tag.color"
                                    text-color="white"
                            >
                                {{tag.name}}
                            </v-chip>
                            <div>
                                {{item.description}}
                            </div>
                        </div>
                    </v-card>
                </draggable>
            </div>
        </div>

        <v-dialog
                v-model="deleteDialog"
                persistent
                max-width="320"
        >

            <v-card>
                <v-card-title class="text-h5">
                    Are you sure you want to delete this task?
                </v-card-title>
                <v-card-text>{{removeInfo.title}}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="deleteDialog = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="confirmRemove"
                    >
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex"
    import {search, update} from "../dataStore";
    import draggable from "vuedraggable"

    export default {
        name: 'Home',
        components: {draggable},
        data() {
            return {
                taskList: [],
                winHeight: document.documentElement.clientHeight,
                deleteDialog: false,
                removeInfo: {}
            }
        },
        computed: {
            ...mapGetters([
                "count",
                "searchContent"
            ]),

            toDoList: {
                get() {
                    return this.$store.state.todoList.toDoList
                },
                set(v) {
                    this.$store.state.todoList.toDoList = v
                }
            },
            doneList: {
                get() {
                    return this.$store.state.todoList.doneList
                },
                set(v) {
                    this.$store.state.todoList.doneList = v
                }
            },
            toDoListFilter() {
                return this.toDoList.filter(item => {
                    return item.title.toLowerCase().includes(this.searchContent.toLowerCase()) ||
                        item.description.toLowerCase().includes(this.searchContent.toLowerCase())
                })
            },
            doneListFilter() {
                return this.doneList.filter(item => {
                    return item.title.toLowerCase().includes(this.searchContent.toLowerCase()) ||
                        item.description.toLowerCase().includes(this.searchContent.toLowerCase())
                })
            },
        },
        created() {
            this.gettoDoList();
            this.getdoneList();
        },
        methods: {
            ...mapActions([
                "addCount",
            ]),
            async gettoDoList() {
                const {data} = await search('todo');
                this.toDoList = data
            },
            async getdoneList() {
                const {data} = await search('done');
                this.doneList = data
            },
            async log(evt) {
                window.console.log(evt);
                console.log(this.toDoList, this.doneList)
                await update('todo', this.toDoList)
                await update('done', this.doneList)
            },
            removeNote(cate, title, id) {
                this.removeInfo = {
                    cate, title, id
                }
                this.deleteDialog = true
            },
            async confirmRemove() {
                const {cate, id} = this.removeInfo;
                if (cate == 'todo') {
                    const idx = this.toDoList.findIndex(item => item.id == id);
                    this.toDoList.splice(idx, 1);
                    await update('todo', this.toDoList)
                } else {
                    const idx = this.doneList.findIndex(item => item.id == id);
                    this.doneList.splice(idx, 1);
                    await update('done', this.doneList)
                }
                this.deleteDialog = false
            }
        }

    }
</script>
<style>
    .home {
        background-color: #eee;
    }

    .scroll-con {
        /*padding: 40px 0;*/
        scroll-padding: 40px 0;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>