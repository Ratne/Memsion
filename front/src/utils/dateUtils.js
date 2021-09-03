export const formatDateEng = (date) => {
   // return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    return `${date.getFullYear()}-${padNumber(date.getMonth()+1)}-${padNumber(date.getDate())}`
}
export const padNumber = (value) => `0${value}`.slice(-2);

export const copyDate = (date) => {
    return new Date(date);
}

export const nextDayDate = (date, days=1) => {
    const copy = copyDate(date)
    return new Date(copy.setDate(copy.getDate()+days))
}

export const prevDayDate = (date, days=1) => {
    const copy = copyDate(date)
    return new Date(copy.setDate(copy.getDate()-days))
}