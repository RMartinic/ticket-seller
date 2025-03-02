const eventContainer = document.getElementById("event-container");
const addButton=document.getElementById("add-button");
const removeButton=document.getElementById("remove-button");
const filterButton=document.getElementById("filter-button");
const menuButton=document.getElementById("menu-bar");
const dropdownMenu=document.getElementsByClassName("dropdown-menu");
const dropdownAddButton=document.getElementById("dropdownd-add-button");
const dropdownRemoveButton=document.getElementById("dropdown-remove-button");
const dropdownFilterButton=document.getElementById("dropdown-filter-button");
const events = [
    {
        headline: "Istra 1961 - Hajduk",
        imageSrc: "https://hajduk.hr/sadrzaj/slike-za-vijesti/800x400/2023-09-02-23-14-3242-.jpg",
        description: "This Saturday, February 15, 2025, at 4:00 PM, Istra 1961 will host Hajduk Split at Stadion Aldo Drosina in a Croatian 1. HNL clash. Hajduk Split currently holds the 1st position in the league standings with 40 points from 21 matches, while Istra 1961 is in 7th place with 23 points from the same number of matches.In the last two matches both teams scored victory, Hajduk at home against Varaždin and Istra secured 1-0 win visiting Rijeka.",
        date: [new Date(2025, 1, 15), new Date(2025, 1, 16)],
        stadiumID:3
    },
    {
        headline: "Varaždin - Slaven Belupo",
        imageSrc: "https://www.tportal.hr/media/thumbnail/w1000/2348544.jpeg",
        description: "This Sunday, NK Varaždin will host Slaven Belupo in the 22nd fixture of the SuperSport HNL. Varaždin is coming off a defeat against Hajduk Split, despite putting in a strong performance. On the other hand, Slaven Belupo secured a late win against NK Lokomotiva Zagreb, maintaining their good form in the competition with two draws prior to that victory. Slaven Belupo currently sits in 6th place, while NK Varaždin holds 5th place with a five-point advantage.",
        date: [new Date(2025, 1, 16), new Date(2025, 1, 17)],
        stadiumID:9
    }
];

let stadiumsList = [];

if (!localStorage.getItem("events")) {
    localStorage.setItem("events", JSON.stringify(events));
}

addButton.addEventListener('click',()=>handleAddClick());
dropdownAddButton.addEventListener('click',()=>handleAddClick());
removeButton.addEventListener('click',()=>handleRemoveClick());
dropdownRemoveButton.addEventListener('click',()=>handleRemoveClick());
filterButton.addEventListener('click',()=>handleFilterClick());
dropdownFilterButton.addEventListener('click',()=>handleFilterClick());


menuButton.addEventListener('click',()=>{
    dropdownMenu[0].classList.toggle("active");
})
function handleRemoveClick(){
    const trashButtons = document.querySelectorAll(".fa-trash-can");
    trashButtons.forEach(trashButton => {
        if(trashButton.style.display==="none"){
        trashButton.style.display="block";
        trashButton.addEventListener('click',()=>handleTrashClick(trashButton));
        }
    else{
        trashButton.style.display="none";
    }
    }); 
}
function handleAddClick(){
    const blackBackground=document.createElement("div");
    blackBackground.classList.add("add-background");
    eventContainer.append(blackBackground);
    const eventAdder=document.createElement("div");
    eventAdder.classList.add("event","adder");
    eventAdder.innerHTML=`
    <label for="headline-input">Headline:</label>
    <input type="text" id="headline-input">
    <label for="image-url">Image URL:</label>
    <input type="url" id="url-input">
    <label for="description-input">Description:</label>
    <textarea id="description-input" rows=10></textarea>
    <object id="choose-date-datepicker" class="datepicker" data="calendar.html" width="100%" height="510px"></object>
    <label for="location-selector">Location:</label>
    <select id="location-selector"></select>
    <div class="button-container">
    <button id="add-event-button">Add</button>
    <button id="cancel-event-button">Cancel</button>
    </div>
    `
    eventContainer.append(eventAdder);
    const locationSelector=document.getElementById("location-selector");
    for(let index=0;index<stadiumsList.length;index++){
        locationSelector.options[locationSelector.options.length]=new Option(stadiumsList[index].stadium,index);
    }
    const saveEventButton=document.getElementById("add-event-button");
    const cancelEventButton=document.getElementById("cancel-event-button");
    cancelEventButton.addEventListener('click',()=>{
        blackBackground.remove();
        eventAdder.remove();
    })
    saveEventButton.addEventListener('click',()=>handleSaveEvent())
}
function makeEventDiv(event,stadiumsList) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("event");

    newDiv.innerHTML = `
        <div class=event-header>
        <h2>${event.headline}</h2>
        <i class="fa-regular fa-trash-can" style= "display: none;"></i>
        </div>
        <img src="${event.imageSrc}" alt="${event.headline}">
        <div class="date-label-container">
            <p>Date:</p>
            <object class="datepicker" data="calendar.html" width="100%" height="390px"></object>
        </div>
        <p class="description">${event.description}</p>
        <div class="location-container">
            <p class="location-name">${stadiumsList[event.stadiumID].stadium}</p>
            <iframe src="${stadiumsList[event.stadiumID].iframeSrc}" width="100%" height="300px" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
        <div class="button-container">
            <button class="buy-button" onclick="window.open('${stadiumsList[event.stadiumID].buyTicketSrc}')">Buy tickets</button>
        </div>
    `;

    const datepickerObject=newDiv.querySelector(".datepicker");
    datepickerObject.addEventListener("load",()=>{
        const[date1, date2]=event.date.map(d=>new Date(d));
        datepickerObject.contentWindow.setFixed();
        datepickerObject.contentWindow.markFixedDates(date1,date2);
    })
    return newDiv;
}
function handleTrashClick(trashButton){
    const removedElement=trashButton.parentElement.parentElement;
    const removedElementHeadline=trashButton.parentElement.querySelector("h2").innerHTML;
    const datePickerElement=removedElement.querySelector(".datepicker");
    const selectedDaysList=datePickerElement.contentWindow.getSelectedDates();
    const storedEventsList=JSON.parse(localStorage.getItem("events"));
    for(let i=0;i<storedEventsList.length;i++){
        if(storedEventsList[i].headline===removedElementHeadline && new Date(storedEventsList[i].date[0]).getMilliseconds()===selectedDaysList[0].getMilliseconds() && new Date(storedEventsList[i].date[1]).getMilliseconds()===selectedDaysList[1].getMilliseconds()){
            storedEventsList.splice(i,1);
            console.log(storedEventsList);
            window.alert("Event removed!")
        }
    }
    localStorage.removeItem("events");
    localStorage.setItem("events",JSON.stringify(storedEventsList));
    location.reload();
}
function handleSaveEvent(){
    const newHeadline=document.getElementById("headline-input").value;
    const newImage=document.getElementById("url-input").value;
    const newDescription=document.getElementById("description-input").value;
    const newDatePicker=document.getElementById("choose-date-datepicker");
    const newDates= newDatePicker.contentWindow.getSelectedDates();
    const newLocation=document.getElementById("location-selector").value;
    if(newHeadline && newImage && newDates!==-1 && newLocation){
        const savedEvents=JSON.parse(localStorage.getItem("events"));
        const newObject={
            headline:newHeadline,
            imageSrc:newImage,
            description:newDescription,
            date:newDates,
            stadiumID:newLocation
        }
        savedEvents.push(newObject);
        localStorage.removeItem("events");
        localStorage.setItem("events",JSON.stringify(savedEvents));
        location.reload();
    }
    else{
        window.alert("Some key data is missing!");
    }
    
}
function handleFilterClick(){
    if(document.getElementsByClassName("filter-selection-container").length){
        const filterSelection=document.getElementsByClassName("filter-selection-container");
        filterSelection[0].remove();
        return;
    } 
    const filterSelection=document.createElement("div");
    filterSelection.classList.add("filter-selection-container");
    filterSelection.innerHTML=`
    <select id="filter-select"></select>
    <button class="filter-action-button" id="save-filter-button">Filter</button>
    <button class="filter-action-button" id="cancel-filter-button">Cancel</button>
    `;
    eventContainer.append(filterSelection);
    const filterSelectForm=document.getElementById("filter-select");
    for (let i = 0; i < stadiumsList.length; i++) {
        filterSelectForm.options[filterSelectForm.options.length]=new Option(stadiumsList[i].stadium,stadiumsList[i.stadium]);
    }
    const filterTargets=document.querySelectorAll(".location-name");
    document.getElementById("save-filter-button").addEventListener('click',()=>{
        filterTargets.forEach((target)=>{
            if(target.innerHTML!==filterSelectForm.value){
                target.parentElement.parentElement.style.display="none";
            }
        });
    });
    document.getElementById("cancel-filter-button").addEventListener('click',()=>{
        filterTargets.forEach((target)=>{
            target.parentElement.parentElement.style.display="block";
        });
        filterSelection.remove();
    });
}
async function fetchStadiums() {
    try {
        const response = await fetch('stadiums.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        stadiumsList=data;
        return data;
    } catch (error) {
        console.error('Error fetching stadiums:', error);
        return null;
    }
}
function loadEvents(){
fetchStadiums().then(data=>{
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];

        for (let i = 0; i < storedEvents.length; i++) {
            if(storedEvents[i]){
            const newEvent = makeEventDiv(storedEvents[i],stadiumsList);
            eventContainer.append(newEvent);
            }
        }
});
}
loadEvents();
