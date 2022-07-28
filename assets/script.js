var currentDayEl = $('#currentDay');
function displayTime() {
    var rightNow = moment().format('LLL');
    currentDayEl.text(rightNow);
}

displayTime();