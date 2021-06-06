<template>
        <div class="colorPickerCon">
            <div class="colorPickerItem"
                 @click="selectColor(color,index)"
                 :class="{active:currentIndex==index}"
                 v-for="(color,index) in colors"
                 :style="{background:color}"></div>
        </div>
</template>
<script>
    export default {
        name: 'colorPicker',
        data() {
            return {
                colors: [
                    "#F44336",
                    "#2196F3",
                    "#ff9800",
                    "#4CAF50",
                    "#9c27b0",
                    "#3f51b5",
                    "#e91e63",
                    "#9e9e9e",
                    "#673ab7",
                    "#00bcd4",
                    "#009688",
                    "#8bc34a",
                    "#ffeb3b",
                    "#ffc107",
                    "#ff5722",
                    "#795548",
                    "#607d8b",
                ],
                currentIndex: null
            }
        },
        methods: {
            selectColor(color, index) {
                this.currentIndex = index
                this.$emit("selectColor", color)
            }
        }
    }
</script>
<style scoped lang="scss">
    .colorPickerCon {
        display: flex;
        /*width: 200px;*/
        height: 20px;
        align-items: center;
        flex-wrap: wrap;

        .colorPickerItem {
            width: 30px;
            height: 10px;
            transition: height 0.3s ease-in-out;
        }

        .active {
            height: 16px;
        }
    }
</style>