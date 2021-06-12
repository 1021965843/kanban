import vue from "vue";

const dateFormat = (timeStr) => {
    const date = new Date(timeStr)

    let Y = date.getFullYear()
    let M = date.getMonth() + 1 + ""
    let D = date.getDate() + ""
    let weekDay = "日一二三四五六".charAt(date.getDay())
    let dateH = (date.getHours() + "").padStart(2, "0");
    let dateM = (date.getMinutes() + "").padStart(2, "0");

    return ` ${Y}/${M}/${D}  星期${weekDay} ${dateH}:${dateM}`
}

[dateFormat].forEach(item => vue.filter(item.name, item))