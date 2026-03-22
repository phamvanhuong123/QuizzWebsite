

const convertNumberToTime = (number : number) => {

    let remainderTime = number

    const hours = Math.floor(remainderTime / 3600);
    remainderTime = remainderTime % 3600
    const minutes = Math.floor(remainderTime / 60)
    const seconds =  remainderTime % 60;

    const formatTime = (time : number) => time < 10 ? `0${time}`: `${time}`

    return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
}

export const timeUtils = {
    convertNumberToTime
}