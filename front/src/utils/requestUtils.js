export const setFormDataWithImage = (data, imageFields=['image']) => {

    let formData = new FormData();
    Object.keys(data).forEach(ele =>{
        imageFields.includes(ele) ? formData.append(ele,data[ele],  data[ele].name) :  formData.append(ele, data[ele])
    })
    return formData;
}