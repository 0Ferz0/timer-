import { stopwatchClock, setTime, stopwatchWrapper, stopwatchStart, stopwatchStop, changeBackgroundColor, changeBorderColor } from "./helper.js"

export const startStopwatch = () => {

    let isStopwatchPlay = true;
    let timeInterval
    let t = 0

    setDefaultStopwatch()

    stopwatchStart.addEventListener(`click`, () => {
        if (isStopwatchPlay) {
            isStopwatchPlay = false;
            stopwatchStart.innerHTML = `Пауза`
            stopwatchStop.innerHTML = `Кружочек`

            changeBackgroundColor(stopwatchStart, `green`)
            changeBorderColor(stopwatchWrapper, `green`)
            changeBackgroundColor(stopwatchStop, `orange`)

            const newTime = new Date((new Date).getTime() - t);

            setClock(newTime);
        } else {
            isStopwatchPlay = true;
            stopwatchStart.innerHTML = `Продолжить`
            stopwatchStop.innerHTML = `Сброс`

            clearInterval(timeInterval)

            changeBackgroundColor(stopwatchStart, `orange`);
            changeBorderColor(stopwatchWrapper, `orange`)
            changeBackgroundColor(stopwatchStop, `red`)
        }
    })

    stopwatchStop.addEventListener(`click`, () => {
        if (isStopwatchPlay) {
            clearInterval(timeInterval)
            setDefaultStopwatch()
        }
    })

    function setDefaultStopwatch() {
        isStopwatchPlay = true;
        stopwatchStart.innerHTML = `Старт`;
        t = 0;

        setTime(stopwatchClock, [0, 0, 0]);

        changeBackgroundColor(stopwatchStart, `#947fff`);
        changeBackgroundColor(stopwatchStop, `#947fff`);
        changeBorderColor(stopwatchWrapper, `#947fff`)
    }

    function getTimeRemaing(userTime) {
        const currentTime = new Date();
        const time = currentTime.getTime() - userTime.getTime();

        const hours = Math.floor((time / 1000 / 60 / 60) % 24),
            minutes = Math.floor((time / 1000 / 60) % 60),
            seconds = Math.floor((time / 1000) % 60);

        return {
            total: time,
            hours,
            minutes,
            seconds
        }
    }

    function setClock(userTime) {
        timeInterval = setInterval(() => t = updateClock(), 1000);

        function updateClock() {
            const t = getTimeRemaing(userTime);

            setTime(stopwatchClock, [t.hours, t.minutes, t.seconds]);
            return t.total
        }
    }
}
