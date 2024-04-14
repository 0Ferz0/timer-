import { timerStart, timerStop, setTime, changeBackgroundColor, changeBorderColor, timerClock, timerWrapper } from "./helper.js"

export const startTimer = () => {
    const btnTimerApply = document.querySelector(`#timer_apply_time_timer`)

    let isTimerPlay = true;
    let timeInterval

    setDefaultTimer()

    timerStart.addEventListener(`click`, () => {
        if (isTimerPlay === false) {
            isTimerPlay = true;
            timerStart.innerHTML = `Продолжить`

            clearInterval(timeInterval)

            changeBackgroundColor(timerStart, `orange`);
            changeBorderColor(timerWrapper, `orange`)
        } else {
            isTimerPlay = false;
            timerStart.innerHTML = `Пауза`

            changeBackgroundColor(timerStart, `green`)
            changeBorderColor(timerWrapper, `green`)

            const userTime = {
                hours: +timerClock[0].innerHTML, minutes: +timerClock[1].innerHTML, seconds: +timerClock[2].innerHTML
            }

            const newTime = new Date();

            newTime.setHours(newTime.getHours() + userTime.hours);
            newTime.setMinutes(newTime.getMinutes() + userTime.minutes);
            newTime.setSeconds(newTime.getSeconds() + userTime.seconds);

            setClock(newTime);
        }
    })

    timerStop.addEventListener(`click`, () => {
        clearInterval(timeInterval)
        setDefaultTimer()
    })

    btnTimerApply.addEventListener(`click`, () => {
        const timerNums = getTimerInput()

        if (timerNums.length === 3) {
            setTime(timerClock, timerNums);
            changeBackgroundColor(timerStart, `green`);
            changeBackgroundColor(timerStop, `red`);
        }
    })

    function setDefaultTimer() {
        isTimerPlay = true;
        timerStart.innerHTML = `Старт`;

        setTime(timerClock, [0, 0, 0]);

        changeBackgroundColor(timerStart, `#947fff`);
        changeBackgroundColor(timerStop, `#947fff`);
        changeBorderColor(timerWrapper, `#947fff`)
    }

    function getTimerInput() {
        const inputTimer = document.querySelector(`#timer_input_timer`);
        return inputTimer.value.split(`:`)
            .map(item => +item)
    }

    function getTimeRemaing(userTime) {
        const currentTime = new Date();
        const time = userTime.getTime() - currentTime.getTime();

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

            if (t.total <= 0) {
                clearInterval(timeInterval)
                alert('Timer is end!')
                setDefaultTimer()
            }
        }

    }

}
