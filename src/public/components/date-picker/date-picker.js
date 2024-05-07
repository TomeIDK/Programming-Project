const maxDateTime = 12;
const now = new Date();
let currentDateTime = new Date();

if (now.getHours() >= maxDateTime) {
    currentDateTime.setDate(currentDateTime.getDate() + 1);
}

const picker = new easepick.create({
    element: "#datepicker",
    css: [
        "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css"
    ],
    zIndex: 110,
    format: "DD/MM/YYYY",
    header: "Kies een datum",
    LockPlugin: {
        minDate: currentDateTime,
        filter(date, picked) {
            return [0, 2, 3, 4, 6].includes(date.getDay());
        }
    },
    plugins: [
        "LockPlugin"
    ]
})