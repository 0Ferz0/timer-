import { startTimer } from "./timer.js"
import { startStopwatch } from "./stopwatch.js "

window.addEventListener(`DOMContentLoaded`, () => {
    const title = document.querySelector(`title`)
    title.innerHTML = `Timer+`;

    const headersTimer = [...document.querySelectorAll(`.timer`)]
        .map(function (timers) {
            return timers.querySelector(`h2`)
        })

    headersTimer[0].innerHTML = `Таймер`;
    headersTimer[1].innerHTML = `Секундомер`;
    headersTimer[2].innerHTML = `Интервал`;

    startTimer()

    startStopwatch()
});
