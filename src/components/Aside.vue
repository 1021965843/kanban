<template>
    <v-card
            :style="{'height':winHeight+'px'}"
            height="400"
            width="60"
            color="purple"
    >
        <v-navigation-drawer permanent>
            <v-list
                    dense
                    nav
            >
                <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        @click="onclick_asideMenu(item.flag)"
                        link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>
<script>
    export default {
        data() {
            return {
                items: [
                    {title: '首页', icon: 'mdi-home-outline', flag: 'home'},
                    {title: '新增任务', icon: 'mdi-plus', flag: 'add'},
                    {title: '搜索任务', icon: 'mdi-magnify', flag: 'search'},
                    {title: '标签', icon: 'mdi-tag', flag: 'tag'},
                    {title: '时间轴', icon: 'mdi-timeline-clock-outline', flag: 'timeline'},
                ],
                right: null,
                winHeight: document.documentElement.clientHeight
            }
        },
        methods: {
            onclick_asideMenu(flag) {
                if (flag == 'timeline') {
                    this.$router.push({
                        path: "/timeline"
                    })
                } else if (flag == 'home') {
                    this.$router.push({
                        path: "/home"
                    })
                } else {
                    this.$emit('onclick_asideMenu', flag)
                }

            }
        }

    }
</script>