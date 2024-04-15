import { stopwatchClock, stopwatchWrapper, stopwatchStart, stopwatchStop, changeBackgroundColor, changeBorderColor } from "./helper.js"

export const startStopwatch = () => {
    const btnStopwatch = document.querySelectorAll(`.timer__button_wrapper`);



    let isStopwatchPlay = true;
    let timeInterval

    // setDefaultstopwatch()

    stopwatchStart.addEventListener(`click`, () => {
        if (isStopwatchPlay === false) {
            isStopwatchPlay = true;
            stopwatchStart.innerHTML = `Продолжить`
            stopwatchStop.innerHTML = `Сброс`

            clearInterval(timeInterval)

            changeBackgroundColor(timerStart, `orange`);
            changeBorderColor(timerWrapper, `orange`)
        } else {
            isStopwatchPlay = false;
            stopwatchStart.innerHTML = `Пауза`
            stopwatchStop.innerHTML = `Кружочек`

            changeBackgroundColor(stopwatchStart, `green`)
            changeBorderColor(stopwatchWrapper, `green`)


            const userTime = {
                hours: +stopwatchClock[0].innerHTML, minutes: +stopwatchClock[1].innerHTML, seconds: +timerClock[2].innerHTML
            }

            const newTime = new Date();

            newTime.setHours(newTime.getHours() + userTime.hours);
            newTime.setMinutes(newTime.getMinutes() + userTime.minutes);
            newTime.setSeconds(newTime.getSeconds() + userTime.seconds);

            setClock(newTime);
        }
    })

    stopwatchStop.addEventListener(`click`, () => {
        clearInterval(timeInterval)
        setDefaultTimer()
    })

    btnStopwatch.addEventListener(`click`, () => {
        const stopwatchNums = getTimerInput()

        if (stopwatchNums.length === 3) {
            setTime(stopwatchClock, stopwatchNums);
            changeBackgroundColor(timerStart, `green`);
            changeBackgroundColor(timerStop, `red`);
        }
    })

    function setDefaultTimer() {
        isStopwatchPlay = true;
        stopwatchStart.innerHTML = `Старт`;

        setTime(stopwatchClock, [0, 0, 0]);

        changeBackgroundColor(stopwatchStart, `#947fff`);
        changeBackgroundColor(stopwatchStop, `#947fff`);
        changeBorderColor(stopwatchWrapper, `#947fff`)
    }

    // function getStopwatchInput() {
    //     const inputStopwatch = document.querySelector(`#timer_input_timer`);
    //     return inputTimer.value.split(`:`)
    //         .map(item => +item)
    // }

    function getTimeRemaing(userTime) {
        const currentTime = new Date();
        const time = userTime.getTime() + currentTime.getTime();

        const hours = Math.floor((time / 1000 / 60 / 60) % 24),
            minutes = Math.floor((time / 1000 / 60) % 60),
            seconds = Math.floor((time / 1000) % 60);

        return {
            total: time,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(userTime) {
        timeInterval = setInterval(updateClock, 1000);

        updateClock()

        function updateClock() {
            const t = getTimeRemaing(userTime);

            setTime(timerClock, [t.hours, t.minutes, t.seconds]);

            // if (t.total <= 0) {
            //     clearInterval(timeInterval)
            //     setDefaultTimer()
            // }
        }

    }

}

