<template>
    <v-row justify="center">
        <v-dialog
                v-model="dialogVisible"
                max-width="500px"
        >
            <v-card>
                <v-card-title>
                    <span class="headline">新增待办任务</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                    cols="24"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        label="任务标题*"
                                        v-model="addForm.title"
                                        required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                    cols="24"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        label="任务详情*"
                                        v-model="addForm.description"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                    cols="24"
                                    sm="6"
                                    md="4"
                            >
                                <v-select
                                        v-model="addForm.tag"
                                        :items="tags"
                                        chips item-text="name"
                                        :item-value="getItemValue"
                                        label="Tags"
                                        multiple
                                        outlined
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*表示必填哦</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="dialogVisible = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="onclick_save"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
    const fs = require("fs")
    const path = require("path")
    import {writeJson, search} from "../dataStore";
    import {mapActions, mapGetters} from "vuex"

    export default {
        name: "addDialog",
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                dialogVisible: this.visible,
                addForm: {
                    title: "",
                    description: '',
                    tag: "",
                },

            }
        },
        computed: {
            ...mapGetters([
                'tags'
            ])
        },
        watch: {
            dialogVisible(val) {
                this.$emit('changeVisible', val)
            }
        },
        methods: {
            async onclick_save() {
                console.log(this.addForm)
                this.addForm = Object.assign(this.addForm, {
                    id: new Date().getTime(),
                    create_time: new Date().getTime(),
                    update_time: new Date().getTime()
                })
                let res = await writeJson(this.addForm)
                console.log(res)
                this.dialogVisible = false
                const {data} = await search('todo');
                console.log(data)
                this.setToDoList(data)
            },
            ...mapActions([
                'setToDoList'
            ]),
            getItemValue(item) {
                return item
            }
        }
    }
</script>

