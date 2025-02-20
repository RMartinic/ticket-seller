const datepicker = document.querySelector(".datepicker");
const dates = document.querySelector(".dates");
const monthName=document.querySelector(".current-month");
const yearNumber=document.querySelector(".current-year");
const refreshButton=document.querySelector(".refresh");
const refreshContainer=document.querySelector(".datepicker-footer");
const nextButton=document.querySelector(".next");
const prevButton=document.querySelector(".prev");

let selectedDate = new Date();
let year = selectedDate.getFullYear();
let month = selectedDate.getMonth();
let fixedDate=false;

const monthArray=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const selectedDaysList = [];
let MarkedDate1 = new Date(0);
let MarkedDate2 = new Date(0);

const createButton = (text, isDisabled = false, isToday = false) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.disabled = isDisabled;
    if (isToday) button.classList.add("today");
    return button;
};

function handleDateClick(button){
    if(fixedDate) return;
    if(selectedDaysList.length>=2){
        const oldestDateInList=selectedDaysList.pop();
        oldestDateInList.classList.remove("selected");
    }
    button.classList.add("selected");
    selectedDaysList.unshift(button);
}

function handleRefreshClick(){
    for (let i = selectedDaysList.length; i >= 1; i--) {
        selectedDaysList[i-1].classList.remove("selected");
        selectedDaysList.pop();
    }
}
function markFixedDates(date1, date2){
    fixedDate=true; 
    refreshContainer.style.display="none";  
    MarkedDate1=date1;
    MarkedDate2=date2;
    const datesElements= dates.children;
    const dayInMIliseconds=1000*60*60*24;
    let startDate = date1<date2 ? date1 : date2;
    let endDate =date1>date2 ? date1 : date2;
    let startingMonth=startDate.getMonth();
    let i=findStartDate(startDate,datesElements);
    if(!i) return;
    while(startDate<=endDate){
        if(startDate.getMonth()===month && startDate.getFullYear()===year){
            datesElements[i].classList.add("selected");
        }
        i++;
        startDate=new Date(startDate.getTime()+dayInMIliseconds);
        if(startingMonth!=startDate.getMonth()){
            i=findStartDate(startDate,datesElements);
            startingMonth=startDate.getMonth();
        } 
    }
    
}
function findStartDate(startdate,datesElements){
    for (let index = 0; index < datesElements.length; index++) {
        if(startdate.getDate()===parseInt(datesElements[index].innerHTML)) {
            return index;
        }
    }
    return null;
}

refreshButton.addEventListener('click',()=>handleRefreshClick());
nextButton.addEventListener('click',()=>{
    month=(month+1)%12;
    if(month==0) year=year+1;
    renderDates();
    markFixedDates(MarkedDate1,MarkedDate2);
});
prevButton.addEventListener('click',()=>{
    month=(month-1+12)%12;
    if(month===11) year=year-1;
    renderDates();
    markFixedDates(MarkedDate1,MarkedDate2);
});

const renderDates = () => {
    dates.innerHTML = "";
    
    const firstOfMonth = new Date(year,month, 1);
    const lastOfPrevMonth = new Date(year, month, 0);
    const lastOfMonth = new Date(year, month + 1, 0);
    
    let firstDayOfTheWeek=firstOfMonth.getDay();
    if (firstDayOfTheWeek===0) firstDayOfTheWeek=7;

    for (let i = firstDayOfTheWeek-1; i > 0; i--) {
        const text = lastOfPrevMonth.getDate() - i+1;
        const button = createButton(text, true, false);
        dates.append(button);
    }

    for (let i = 1; i <= lastOfMonth.getDate(); i++) {
        const isToday = 
            i === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear();
        const button = createButton(i, false, isToday);
        button.addEventListener('click', () => handleDateClick(button));
        dates.append(button);
    }

    let lastDayOfTheWeek = lastOfMonth.getDay();
    if(lastDayOfTheWeek===0) lastDayOfTheWeek=7;

    const remainingDays = 7 - lastDayOfTheWeek;
    for (let i = 1; i <= remainingDays; i++) {
        const button = createButton(i, true, false);
        dates.append(button);
    }
    monthName.innerHTML=` ${monthArray[month]}`;
    yearNumber.innerHTML=`${year}`;
};

renderDates();
