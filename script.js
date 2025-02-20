const eventContainer = document.getElementById("event-container");
const events = [
    {
        headline: "Istra 1961 - Hajduk",
        imageSrc: "https://hajduk.hr/sadrzaj/slike-za-vijesti/800x400/2023-09-02-23-14-3242-.jpg",
        description: "This Saturday, February 15, 2025, at 4:00 PM, Istra 1961 will host Hajduk Split at Stadion Aldo Drosina in a Croatian 1. HNL clash. Hajduk Split currently holds the 1st position in the league standings with 40 points from 21 matches, while Istra 1961 is in 7th place with 23 points from the same number of matches...",
        date: [new Date(2025, 1, 15), new Date(2025, 1, 16)],
        iframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.031973669814!2d13.848967976777569!3d44.86164387107056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477cd3248031ed7d%3A0xd35439cf394261dc!2sStadion%20Aldo%20Drosina!5e0!3m2!1shr!2shr!4v1739222465175!5m2!1shr!2shr"
    },
    {
        headline: "Varaždin - Slaven Belupo",
        imageSrc: "https://www.tportal.hr/media/thumbnail/w1000/2348544.jpeg",
        description: "This Sunday, NK Varaždin will host Slaven Belupo in the 22nd fixture of the SuperSport HNL. Varaždin is coming off a defeat against Hajduk Split, despite putting in a strong performance. On the other hand, Slaven Belupo secured a late win against NK Lokomotiva Zagreb, maintaining their good form in the competition with two draws prior to that victory. Slaven Belupo currently sits in 6th place, while NK Varaždin holds 5th place with a five-point advantage.",
        date: [new Date(2025, 1, 16), new Date(2025, 1, 17)],
        iframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d689.2039640140824!2d16.343046585059053!3d46.29363238558249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4768ab8110c6ce65%3A0x7dbcaa6b0b357f56!2sStadion%20An%C4%91elko%20Herjavec!5e0!3m2!1shr!2shr!4v1739398056936!5m2!1shr!2shr"
    }
];

if (!localStorage.getItem("events")) {
    localStorage.setItem("events", JSON.stringify(events));
}

document.addEventListener("DOMContentLoaded", () => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];

        for (let i = 0; i < storedEvents.length; i++) {
            const newEvent = makeEventDiv(storedEvents[i]);
            eventContainer.append(newEvent);
        }
    
});

function makeEventDiv(event) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("event");

    newDiv.innerHTML = `
        <h2>${event.headline}</h2>
        <img src="${event.imageSrc}" alt="${event.headline}">
        <div class="date-label-container">
            <p>Date:</p>
            <object class="datepicker" data="calendar.html" width="100%" height="390px"></object>
        </div>
        <p class="description">${event.description}</p>
        <div class="location-container">
            <p>Location:</p>
            <iframe src="${event.iframeSrc}" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
        <div class="button-container">
            <button class="buy-button">Buy tickets</button>
        </div>
    `;
    const datepickerObject=newDiv.querySelector(".datepicker");
    datepickerObject.addEventListener("load",()=>{
        const[date1, date2]=event.date.map(d=>new Date(d));
        datepickerObject.contentWindow.markFixedDates(date1,date2);
    })
    return newDiv;
}