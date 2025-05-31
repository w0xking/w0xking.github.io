document.addEventListener("DOMContentLoaded", () => {
    initializeCard();
});

document.addEventListener("pjax:complete", () => {
    initializeCard();
});

function initializeCard() {
    cardTimes();
    cardRefreshTimes();
}

let year, month, week, date, dates, weekStr, monthStr, asideTime, asideDay, asideDayNum, animalYear, ganzhiYear, lunarMon, lunarDay;
const now = new Date();

function cardRefreshTimes() {
    const e = document.getElementById("card-widget-schedule");
    if (e) {
        asideDay = (now - asideTime) / 1e3 / 60 / 60 / 24;
        e.querySelector("#pBar_year").value = asideDay;
        e.querySelector("#p_span_year").innerHTML = (asideDay / 365 * 100).toFixed(1) + "%";
        e.querySelector(".schedule-r0 .schedule-d1 .aside-span2").innerHTML = `还剩<a> ${(365 - asideDay).toFixed(0)} </a>天`;
        e.querySelector("#pBar_month").value = date;
        e.querySelector("#pBar_month").max = dates;
        e.querySelector("#p_span_month").innerHTML = (date / dates * 100).toFixed(1) + "%";
        e.querySelector(".schedule-r1 .schedule-d1 .aside-span2").innerHTML = `还剩<a> ${(dates - date)} </a>天`;
        e.querySelector("#pBar_week").value = week === 0 ? 7 : week;
        e.querySelector("#p_span_week").innerHTML = ((week === 0 ? 7 : week) / 7 * 100).toFixed(1) + "%";
        e.querySelector(".schedule-r2 .schedule-d1 .aside-span2").innerHTML = `还剩<a> ${(7 - (week === 0 ? 7 : week))} </a>天`;
    }
}

function cardTimes() {
    year = now.getFullYear();
    month = now.getMonth();
    week = now.getDay();
    date = now.getDate();

    const e = document.getElementById("card-widget-calendar");
    if (e) {
        const isLeapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        weekStr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][week];
        const monthData = [
            { month: "1月", days: 31 },
            { month: "2月", days: isLeapYear ? 29 : 28 },
            { month: "3月", days: 31 },
            { month: "4月", days: 30 },
            { month: "5月", days: 31 },
            { month: "6月", days: 30 },
            { month: "7月", days: 31 },
            { month: "8月", days: 31 },
            { month: "9月", days: 30 },
            { month: "10月", days: 31 },
            { month: "11月", days: 30 },
            { month: "12月", days: 31 }
        ];
        monthStr = monthData[month].month;
        dates = monthData[month].days;

        const t = (week + 8 - date % 7) % 7;
        let n = "", d = false, s = 7 - t;
        const o = (dates - s) % 7 === 0 ? Math.floor((dates - s) / 7) + 1 : Math.floor((dates - s) / 7) + 2;
        const c = e.querySelector("#calendar-main");
        const l = e.querySelector("#calendar-date");

        l.style.fontSize = ["64px", "48px", "36px"][Math.min(o - 3, 2)];

        for (let i = 0; i < o; i++) {
            if (!c.querySelector(`.calendar-r${i}`)) {
                c.innerHTML += `<div class='calendar-r${i}'></div>`;
            }
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j === t) {
                    n = 1;
                    d = true;
                }
                const r = n === date ? " class='now'" : "";
                if (!c.querySelector(`.calendar-r${i} .calendar-d${j} a`)) {
                    c.querySelector(`.calendar-r${i}`).innerHTML += `<div class='calendar-d${j}'><a${r}>${n}</a></div>`;
                }
                if (n >= dates) {
                    n = "";
                    d = false;
                }
                if (d) {
                    n += 1;
                }
            }
        }

        const lunarDate = chineseLunar.solarToLunar(new Date(year, month, date));
        animalYear = chineseLunar.format(lunarDate, "A");
        ganzhiYear = chineseLunar.format(lunarDate, "T").slice(0, -1);
        lunarMon = chineseLunar.format(lunarDate, "M");
        lunarDay = chineseLunar.format(lunarDate, "d");

        const newYearDate = new Date("2026/02/17 00:00:00");
        const daysUntilNewYear = Math.floor((newYearDate - now) / 1e3 / 60 / 60 / 24);
        asideTime = new Date(`${new Date().getFullYear()}/01/01 00:00:00`);
        asideDay = (now - asideTime) / 1e3 / 60 / 60 / 24;
        asideDayNum = Math.floor(asideDay);
        const weekNum = week - asideDayNum % 7 >= 0 ? Math.ceil(asideDayNum / 7) : Math.ceil(asideDayNum / 7) + 1;

        e.querySelector("#calendar-week").innerHTML = `第${weekNum}周&nbsp;${weekStr}`;
        e.querySelector("#calendar-date").innerHTML = date.toString().padStart(2, "0");
        e.querySelector("#calendar-solar").innerHTML = `${year}年${monthStr}&nbsp;第${asideDay.toFixed(0)}天`;
        e.querySelector("#calendar-lunar").innerHTML = `${ganzhiYear}${animalYear}年&nbsp;${lunarMon}${lunarDay}`;
        document.getElementById("schedule-days").innerHTML = daysUntilNewYear;
    }
}
