<template>
    <v-row justify="center">
        <v-dialog
                v-model="dialogVisible"
                max-width="500px"
        >
            <v-card>
                <v-card-title>
                    <span class="headline">CREATE A TODO TASK</span>
                </v-card-title>
                <v-form
                        class="px-4"
                        ref="addForm"
                        v-model="valid"
                        lazy-validation
                >
                    <v-text-field
                            label="TASK-TITLE*"
                            v-model="addForm.title"
                            :rules="titleRules"
                            required
                    ></v-text-field>
                    <v-text-field
                            label="TASK-DESCRIPTION*"
                            v-model="addForm.description"
                            :rules="descriptionRules"
                            required
                    ></v-text-field>
                    <v-select
                            v-model="addForm.tag"
                            :items="tags"
                            chips item-text="name"
                            :item-value="getItemValue"
                            label="TAGS"
                            multiple
                            outlined
                    ></v-select>
                    <small>*NESSARY</small>
                </v-form>

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
    import {writeJson, search} from "../../dataStore";
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
                valid: true,
                titleRules: [
                    v => !!v || 'Title is required',
                    // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
                descriptionRules: [
                    v => !!v || 'Description is required',
                ],

            }
        },
        computed: {
            ...mapGetters([
                'tags'
            ])
        },
        watch: {
            dialogVisible(val) {
                if (!val) {
                    this.$refs.addForm.reset()
                }
                this.$emit('changeVisible', val)
            }
        },
        methods: {
            async onclick_save() {
                const isValid = this.$refs.addForm.validate()
                if (!isValid) {
                    return
                }
                this.addForm = Object.assign(this.addForm, {
                    id: new Date().getTime(),
                    create_time: new Date().getTime(),
                    update_time: new Date().getTime()
                })
                let res = await writeJson(this.addForm)
                console.log(res)
                const {data} = await search('todo');
                this.setToDoList(data);
                this.dialogVisible = false
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

