let time = document.getElementById("time");
let dateInput = document.getElementById("alarmDate");
let timeInput = document.getElementById("alarmTime");
let setBtn = document.getElementById("setAlarm");
let alarms = document.getElementById("alarms");

let alarmList = [];

function timeChange() {
    let curr = new Date();
   
    let hrs = curr.getHours();
    let min = timeHelper(curr.getMinutes());
    let sec = timeHelper(curr.getSeconds());
   
    // handlling am & pm , also converting to 12 hr clock
    let period = "AM";
    if (hrs >= 12) {
        period = "PM";
        if (hrs > 12) {
            hrs -= 12;
        }
    }
    hrs = timeHelper(hrs);
  
    time.textContent = `${hrs}:${min}:${sec} ${period}`;
}

function timeHelper(time){
    if(time<10){
        return '0' + time;
    }
    return time;
}

function alarmSet() {
    let now = new Date();
    let selectedDate = new Date(dateInput.value + "T" + timeInput.value);
   
    // check alarm time should greater than current time.
    if (selectedDate <= now) {
        alert(`Invalid time. Please select 
      a future date and time.`);
        return;
    }

    // should not allowed to set multiple alarm for same time.
    if (alarmList.find((item) => (item.date===selectedDate.toLocaleString()))) {
        alert(`You cannot set multiple 
      alarms for the same time.`);
        return;
    }

    let timeUntilAlarm = selectedDate - now;
    let timerID = setTimeout(() => {
        alert("Time to wake up!");

        // once alarm is up , removed it from alarm list
        clearTimeout(timerID);
            alarmList = alarmList.filter((item) => (item.date!==selectedDate.toLocaleString()));
            showAlarm();

    }, timeUntilAlarm)

    alarmList.push({id: alarmList.length+1, date: selectedDate.toLocaleString() , timerID});

   showAlarm();

   
}

function showAlarm() {
    alarms.textContent = '';

    alarmList.forEach((alarm) => {
        let alarmDiv = document.createElement("div");
        alarmDiv.classList.add("alarm");
       
        let cont = document.createElement("span");
        cont.textContent = alarm.date;
       

        let deleteButton = document.createElement("button");
        deleteButton.textContent = 'delete';
        deleteButton.classList.add("delete-alarm");

        deleteButton.addEventListener("click", () => {
            
            clearTimeout(alarm.timerID);
            alarmList = alarmList.filter((item) => (item.date!==alarm.date));
            showAlarm();
        });

        alarmDiv.appendChild(cont);
        alarmDiv.appendChild(deleteButton);
        alarms.appendChild(alarmDiv);
    }); 
}

setInterval(timeChange,1000);
setBtn.addEventListener('click', alarmSet)