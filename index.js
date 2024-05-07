// class Calendar {
//     date;
//     year;
//     month;
//     firstDateOfTheMonth;
//     lastDateOfTheMonth;
//     totalDatesInTheMonth = [];

//     constructor(date) {
//         this.date = date;
//         this.year = date.getFullYear();
//         this.month = date.getMonth();
//         this.firstDateOfTheMonth = new Date(this.year, this.month, 1);
//         this.lastDateOfTheMonth = new Date(this.year, this.month + 1, 0);
//     }

//     getCurrentDate() {
//         return this.date;
//     }

//     getFirstDayOfTheMonth() {
//         return this.firstDateOfTheMonth;
//     }

//     getLastDayOfTheMonth() {
//         return this.lastDateOfTheMonth;
//     }

//     getTotalDatesInTheMonth() {
//         const end = this.lastDateOfTheMonth.getDate();
//         const prevDaysCount = 1 - this.firstDateOfTheMonth.getDay();
//         const nextDaysCount = 7 - this.lastDateOfTheMonth.getDay();

//         for (let i = prevDaysCount; i < 1; i++) {
//             this.totalDatesInTheMonth.push({
//                 date: new Date(this.year, this.month, i),
//                 currentMonth: false,
//                 currentDate: false,
//             });
//         }

//         for (let i = 1; i <= end; i++) {
//             this.totalDatesInTheMonth.push({
//                 date: new Date(this.year, this.month, i),
//                 currentMonth: true,
//                 currentDate:
//                     new Date(this.year, this.month, i).toLocaleDateString() ===
//                     new Date().toLocaleDateString(),
//             });
//         }

//         for (let i = 1; i < nextDaysCount; i++) {
//             this.totalDatesInTheMonth.push({
//                 date: new Date(this.year, this.month + 1, i),
//                 currentMonth: false,
//                 currentDate: false,
//             });
//         }
//         return this.totalDatesInTheMonth;
//     }
// }

// const dates = document.querySelector(".dates");
// const calendar = new Calendar(new Date());

// const totalDates = calendar.getTotalDatesInTheMonth();

// let date;

// totalDates.forEach((d) => {
//     date = document.createElement("li");
//     date.innerText = d.date.getDate();
//     date.dataset.currentMonth = d.currentMonth;
//     date.dataset.currentDate = d.currentDate;
//     dates.appendChild(date);
// });

class Calendar {
    constructor(month, year) {
        this.month = month;
        this.year = year;
    }

    firstDay() {
        return new Date(this.year, this.month, 1);
    }

    lastDay() {
        return new Date(this.year, this.month + 1, 0);
    }

    getDays() {
        let date;
        let days = [];
        const end = this.lastDay().getDate();
        const currentDate = new Date().toLocaleDateString();

        for (let i = 1; i <= end; i++) {
            date = new Date(this.year, this.month, i);
            days.push({
                date,
                currentDate: currentDate.includes(date.toLocaleDateString()),
                currentMonth: true,
            });
        }
        return days;
    }

    getPrevMonthDays() {
        let date;
        let days = [];
        const prevDaysCount = 1 - this.firstDay().getDay();

        for (let i = prevDaysCount; i < 1; i++) {
            date = new Date(this.year, this.month, i);
            days.push({
                date,
                currentMonth: false,
                currentDate: false,
            });
        }
        return days;
    }
    getNextMonthDays() {
        let date;
        let days = [];
        const nextDaysCount = 7 - this.lastDay().getDay();
        for (let i = 1; i < nextDaysCount; i++) {
            date = new Date(this.year, this.month + 1, i);
            days.push({
                date,
                currentMonth: false,
                currentDate: false,
            });
        }
        return days;
    }
}

function displayCalendar(month, year) {
    const dates = document.querySelector(".dates");
    const calendar = new Calendar(month, year);

    const currentMonthDays = calendar.getDays();
    const prevMonthDays = calendar.getPrevMonthDays();
    const nextMonthDays = calendar.getNextMonthDays();

    let calendarDate;

    [...prevMonthDays, ...currentMonthDays, ...nextMonthDays].forEach((day) => {
        calendarDate = document.createElement("li");
        calendarDate.innerText = day.date.getDate();
        calendarDate.dataset.currentMonth = day.currentMonth;
        calendarDate.dataset.currentDate = day.currentDate;
        dates.appendChild(calendarDate);
    });
}

const calendarNavigationBtn = document.querySelectorAll(
    "[data-calendar-navigation-btn]"
);

const calendarInformation = document.querySelector(".info-container>h2");

const date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
];

let info = document.createElement("p");
info.innerText = `${months[month]}, ${year}`;
calendarInformation.appendChild(info);
displayCalendar(month, year);

calendarNavigationBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        const dates = document.querySelector(".dates");
        let current = btn.dataset.calendarNavigationBtn === "next" ? 1 : -1;

        month = month + current;

        if (month > 11) {
            ++year;
            month = 0;
        } else if (month < 0) {
            --year;
            month = 11;
        }

        calendarInformation.innerHTML = "";
        let info = document.createElement("p");
        info.innerText = `${months[month]}, ${year}`;
        calendarInformation.appendChild(info);

        dates.innerHTML = "";
        displayCalendar(month, year);
    });
});
