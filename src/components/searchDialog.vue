<template>
    <v-dialog
            hide-overlay
            content-class="grey darken-3"
            v-model="dialogVisible"
            transition="dialog-top-transition"
            max-width="300"
    >
        <v-text-field
                v-model="searchContent"
                autofocus clearable
                class="white--text px-2" style="color: #fff">
            <v-icon
                    slot="append"
                    color="#fff"
            >
                mdi-search
            </v-icon>
        </v-text-field>
    </v-dialog>

</template>

<script>
    export default {
        name: "searchDialog",
        data() {
            return {
                dialogVisible: this.visible,
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        computed:{
            searchContent: {
                get() {
                    return this.$store.state.todoList.searchContent
                },
                set(v) {
                    this.$store.state.todoList.searchContent = v
                }
            }
        },
        watch: {
            dialogVisible(val) {
                this.$emit('changeVisible', val)
            }
        },
    }
</script>

<style scoped>
    /deep/
    input {
        color: #fff !important;
    }
</style>