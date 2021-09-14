export const deletePropertiesByObject = (data, delArray = []) => {
    return Object.keys(data).reduce((acc, ele)=>{
        if (!delArray.includes(ele)){
            acc[ele] = data[ele]
        }
        return acc
    }, {})
}