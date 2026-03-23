

const convertNumberToTime = (number : number) => {

    let remainderTime = number

    const hours = Math.floor(remainderTime / 3600);
    remainderTime = remainderTime % 3600
    const minutes = Math.floor(remainderTime / 60)
    const seconds =  remainderTime % 60;

    const formatTime = (time : number) => time < 10 ? `0${time}`: `${time}`

    return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
}

const convertTimeToNumber = (hours : number,seconds : number) => {
    return (hours * 3600) + (seconds * 60)
}

export const timeUtils = {
    convertNumberToTime,
    convertTimeToNumber
}