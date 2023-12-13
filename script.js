let isCatSleeping = false;
let sleepAudio = document.getElementById('sleepAudio');
let wakeupAudio = document.getElementById('wakeupAudio');

document.addEventListener('DOMContentLoaded', function () {
    updateCatImage();
});

function updateCatImage() {
    if (isCatSleeping) {
        document.body.style.backgroundImage = "url('cat.png')";
    } else {
        document.body.style.backgroundImage = "url('cat_wakeup.png')";
    }
}

function formatTimeUnit(timeUnit) {
    return timeUnit < 10 ? `0${timeUnit}` : `${timeUnit}`;
}

function startTimer() {
    document.getElementById('timer').style.display='block';
    isCatSleeping = true;
    updateCatImage();
    document.getElementById('time-selector').style.display = 'none';
    document.getElementById('start-button').style.display = 'none';
    sleepAudio.play();

    var hours = document.getElementById('hours').value;
    var minutes = document.getElementById('minutes').value;
    var seconds = document.getElementById('seconds').value;

    var totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

    var timerInterval = setInterval(function () {
        var hoursDisplay = formatTimeUnit(Math.floor(totalSeconds / 3600));
        var minutesDisplay = formatTimeUnit(Math.floor((totalSeconds % 3600) / 60));
        var secondsDisplay = formatTimeUnit(totalSeconds % 60);

        document.getElementById('timer').innerHTML = `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
        
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').innerHTML = "00:00:00";
            document.getElementById('timer').style.display='none';
            catWakeup();
        }

        totalSeconds--;
    }, 1000);
}

function catWakeup() {
    isCatSleeping = false;
    updateCatImage();
    document.getElementById('time-selector').style.display = 'block';
    sleepAudio.pause();
    sleepAudio.currentTime = 0;
    wakeupAudio.play();

    document.getElementById('start-button').style.display = 'block';
    
}
