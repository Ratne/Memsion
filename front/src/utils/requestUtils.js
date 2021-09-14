export const setFormDataWithImage = (data, imageFields=['image']) => {

    let formData = new FormData();
    Object.keys(data).forEach(ele =>{      // mi prende tutte le chiavi dell'oggetto e te le trasforma in un array
                                           // quindi ora ho un array di array description image requiredTag
        imageFields.includes(ele) ? formData.append(ele,data[ele],  data[ele].name) :  formData.append(ele, data[ele])
    })
    return formData;
}