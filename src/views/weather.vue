<template>
    <div class="weather ">
        <v-text-field
                class="pl-5"
                style="width: 50%"
                label="城市"
                v-model="city">
            <v-icon
                    slot="append"
                    color="tear"
                    @click="getWeather"
            >
                mdi-magnify
            </v-icon>
        </v-text-field>
        <div class="d-flex" v-if="weatherInfo.weather.length" style="height: 100%">
            <div class="today d-flex flex-column  weatherItem pa-2">
                <div>{{weatherInfo.date}}</div>
                <div>{{weatherInfo["weather"][0].temp}}</div>
                <v-icon large>{{ getIcon(weatherInfo["weather"][0].weather) }}</v-icon>
                <div>{{weatherInfo["weather"][0].weather}}</div>
                <div>{{weatherInfo["weather"][0].wind}}</div>
            </div>

            <div v-for="item in weatherInfo.weather.slice(1)"
                 class="d-flex flex-column weatherItem pa-2">
                <div>{{item.date}}</div>
                <div>{{item.temp}}</div>
                <v-icon large>{{ getIcon(item.weather) }}</v-icon>
                <div>{{item.weather}}</div>
                <div>{{item.wind}}</div>
            </div>

        </div>
    </div>

</template>

<script>
    import jsonp from "../plugins/jsonp";

    export default {
        name: "weather",
        data() {
            return {
                city: "杭州",
                weatherInfo: {
                    weather: [{weather: ''}]
                }
            }
        },
        mounted() {
            this.getWeather()
        },
        methods: {
            async getWeather() {
                const res = await jsonp(`https://api.asilu.com/weather/?city=${this.city}&callback=weather`)
                console.log(res)
                this.weatherInfo = res;
            },
            getIcon(w) {
                const keyWordsMap = {
                    '雷阵雨': 'weather-lightning-rainy',
                    '多云': 'weather-cloudy',
                    '阴': 'weather-cloudy',
                    '多云转晴': 'weather-partly-cloudy',
                    '晴': 'weather-sunny',
                    '中雨': 'weather-pouring',
                    '大雨': 'weather-pouring',
                    '小雨': 'weather-rainy',
                    '小雪': 'weather-snowy',
                    '雨夹雪': 'weather-snowy-rainy',
                    '大雪': 'weather-snowy-heavy'
                }
                console.log(w)
                for (let key in keyWordsMap) {
                    if (w.includes(key)) return `mdi-${keyWordsMap[key]}`
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .weather {
        font-size: 13px;
    }

    .weatherItem {
        border-right: 1px solid #ccc;
        flex: 1;

        div {
            margin: 10px 0;
        }
    }
</style>