<template>
    <v-dialog
            hide-overlay
            content-class="grey darken-3"
            v-model="dialogVisible"
            transition="dialog-top-transition"
            max-width="600"
    >
        <div class="d-flex align-center">
            <v-text-field
                    v-model="tagName"
                    autofocus clearable
                    class="white--text px-2" style="color: #fff">
                <v-icon
                        slot="append"
                        color="#fff"
                >
                    mdi-search
                </v-icon>
            </v-text-field>
            <v-btn
                    @click="addTag"
                    class="elevation-5 justify-right text-xs-right"
                    color="primary"
                    style="border-radius:0;"
            >
                ADD
            </v-btn>
        </div>
        <colorPicker @selectColor="selectColor"></colorPicker>
        <div>
            <v-chip
                    class="ma-2"
                    close label small
                    v-for="(tag,index) in tags"
                    :color="tag.color"
                    text-color="white"
                    @click:close="removeTag(index)"
            >
                {{tag.name}}
            </v-chip>
        </div>

        <v-btn
                @click="save"
                class="elevation-5 justify-right text-xs-right"
                color="primary"
                style="border-radius:0;"
        >
            SAVE
        </v-btn>
    </v-dialog>

</template>

<script>
    import colorPicker from "./colorPicker";
    import {setTags as setTagsConfig} from "../../dataStore"
    import {mapGetters, mapActions} from "vuex"

    export default {
        name: "tagDialog",
        components: {
            colorPicker
        },
        data() {
            return {
                dialogVisible: this.visible,
                color: '',
                tagName: '',
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false
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
            ...mapActions([
                'setTags'
            ]),
            selectColor(color) {
                this.color = color
            },
            addTag() {
                if (!this.color) {
                    return alert("请选择标签颜色")
                }
                this.tags.push({
                    name: this.tagName,
                    color: this.color
                })
                this.color = '';
                this.tagName = ''
            },
            async removeTag(index) {
                this.tags.splice(index, 1)
                await setTagsConfig(this.tags)
                this.setTags(this.tags)
            },
            async save() {
                const res = await setTagsConfig(this.tags)
                console.log(res)
                this.setTags(this.tags);
                this.dialogVisible = false
            }
        }
    }
</script>

<style scoped>
    /deep/
    input {
        color: #fff !important;
    }
</style>