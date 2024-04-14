
const zeroStart = [...document.querySelectorAll(`.timer__clock`)]
    .map(function (start) {
        return [...start.querySelectorAll(`span`)]
    })
export const [timerClock, stopwatchClock, intervalClock] = zeroStart;

export const [timerWrapper, stopwatchWrapper, intervalWrapper] = [...document.querySelectorAll(`.timer`)]


const timersButtons = [...document.querySelectorAll(`.timer__button_wrapper`)];
const [timerButtons, stopwatchButtons, intervalButtons] = timersButtons;

export const [timerStart, timerStop] = timerButtons.querySelectorAll(`button`),
    [stopwatchStart, stopwatchStop] = stopwatchButtons.querySelectorAll(`button`),
    [intervalStart, intervalStop] = intervalButtons.querySelectorAll(`button`);


export function setTime(a, numbers) {
    a.forEach((item, i) => {
        item.innerHTML = getZero(numbers[i])

    })
}


export function changeBackgroundColor(element, color) {
    element.style[`background-color`] = color

}

export function changeBorderColor(element, color) {
    element.style[`border-color`] = color

}

function getZero(num) {
    if (num === undefined) {
        return `00`
    }
    if (num >= 0 && num < 10) {
        return `0${num}`
    } else {
        return num
    }
}
