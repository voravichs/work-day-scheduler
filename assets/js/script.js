var currentDayEl = $('#current-day');
var currentTimeEl = $('#current-time');
var workWarningEl = $('#work-warning');
var timeBlockEl = $('#timeblock-container')

var now = moment();
var numWorkHours = 13;
var timeBlocks = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
var timeBlockNames = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM'];
var isWorkTime = false;
var savedTasks = [];

// Generates the time blocks
function generateTimeBlocks() {
    for (let i = 0; i < numWorkHours; i++) {
        timeBlockEl.append(
            '<section class= \'row time-block\'> \n' +
                '<div class=\"col-2 hour text-dark p-4\">' + timeBlockNames[i] +'</div> \n' +
                '<textarea class=\"col-8 description\"></textarea> \n' +
                '<div class=\"col-2 saveBtn border border-secondary p-4\"><i>💾</i></div> \n' +
            '</section>'
        )
    }
}

// Displays the date and time in the header
function tellTime() {
    currentDayEl.text(now.format('dddd, MMMM Do'));
    currentTimeEl.text(now.format('H:mm a'));
}

// Update the timeblocks with past, present, or future styles
function updateTimeblocks() {
    // get the current hour
    var momentHour = now.hour();


    for (var i = 0; i < timeBlocks.length; i++) {
        // Get the list of current tasks
        currentTime = timeBlockEl.children().eq(i).find('.hour').text();
        currentTask = localStorage.getItem(currentTime);
        // If local storage is empty, make it an empty string
        if (currentTask == null) {
            localStorage.setItem(currentTime, '');
        }
        //update the timeblocks with past, present, or future styles
        currentTimeBlock = timeBlockEl.children().eq(i).find('.description');
        if (timeBlocks[i] < momentHour) {
            currentTimeBlock.addClass('past');
        } else if (timeBlocks[i] == momentHour) {
            currentTimeBlock.addClass('present');
            isWorkTime = true;
        } else if (timeBlocks[i] > momentHour) {
            currentTimeBlock.addClass('future');
        }
        // Update description with local storage item
        currentTimeBlock.val(currentTask);
    }

    // Display welcome message if it is time to work,
    // otherwise display another message 
    if (isWorkTime) {
        workWarningEl.text('Currently within normal working hours. It\'s time to work!');
    } else {
        workWarningEl.text('It is beyond normal working hours. Time to take a break!');
    }
}

// When the save button is clicked, stores the task in local storage
timeBlockEl.on('click', '.saveBtn', storeTask);
function storeTask(event) {
    btnClicked = $(event.target);
    if (btnClicked.is('div')) {
        var textInput = btnClicked.prev().val();
        var savedHour = btnClicked.prev().prev().text();
        localStorage.setItem(savedHour, textInput);
        $("#effect").show('highlight', 500, callback);
    }
}

//callback function to bring a hidden box back
function callback() {
    setTimeout(function () {
        $("#effect:visible").removeAttr("style").fadeOut();
    }, 500);
};

function init() {
    tellTime();
    generateTimeBlocks();
    updateTimeblocks();
    $("#effect").hide();
}

init();