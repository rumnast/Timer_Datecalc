import { formatError } from "./utils.js";
//import { loadScript } from "./loadscript.js";
import alarmSound from "../audio/alarm.mp3";
import alarmImg from "../img/alarm.png"



export function switchcHtml2() {
    mainForm.innerHTML = "";
    mainForm.insertAdjacentHTML("beforeend",
        `<div class="blockTimer">
        <form id="timer">
        <hr>
        <h3>Таймер</h3>
        <label>
            <strong>Время таймера (минуты):</strong>
            <input id="time" type="text" name="time" />
        </label>
        <button type="submit" id="buttonStart">Старт</button>
        <button type="submit" id="buttonStop">Стоп</button>
        <div id="timeValue"></div>
        <img class="alarmImg" src="${alarmImg}" alt="">
        <hr>
    </form>
    </div>`);
    const timerForm = document.getElementById("timer");
    const timerResult = document.getElementById("timeValue");
    let timerId;
    timerForm.addEventListener("submit", handleTimer);

    function handleTimer(event) {
        event.preventDefault();
        let activeElement = document.activeElement;
        let alarm = document.querySelector(".alarmImg");
        alarm.style.display = "none";
        if (activeElement.id === 'buttonStart') {

            let time = event.target.elements[0].value;
            // console.log(time);
            if (time == 0 || isNaN(time)) {
                //console.log(time);
                timerResult.innerHTML = formatError("Введите целое число");
                return
            }

            let timeMs = ((Math.abs(time) * 60000) - 1000);
            timerResult.innerHTML = millisToMinutesAndSeconds(timeMs);

            timerId = setInterval(() => ChangeTime(), 1000);
            function ChangeTime() {
                timeMs = timeMs - 1000;
                if (timeMs < 1000) {
                    clearInterval(timerId);
                    let audio = new Audio(alarmSound);
                    //audio.src = './audio/alarm.mp3';
                    //audio.preload = 'auto';
                    //console.log(audio);
                    audio.play();
                    alarm.style.display = "inline";
                    timerResult.innerHTML = millisToMinutesAndSeconds(timeMs);
                } else {
                    timerResult.innerHTML = millisToMinutesAndSeconds(timeMs);
                }
            }

        } else {
            clearInterval(timerId);
        }
    }
}


function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


function Alarm() {
    let audio = new Audio;
    audio.src = "http://localhost:5000/Timer_Date/audio/alarm.mp3";
    audio.play();
}

