const dataErrors = {
    errors : []
}

export const addErrors = (error)=>{
    error.id=Date.now()*(Math.round(Math.random() * 100))
    dataErrors.errors.push(error);
    dataErrors.update && dataErrors.update(dataErrors.errors);
}

export const resetErrors = ()=>{
    dataErrors.errors = [];
    dataErrors.update && dataErrors.update(dataErrors.errors);
}

export const removeErrors = (idError) =>{
    dataErrors.errors = dataErrors.errors.filter(error =>{
        return (idError !== error.id)
    })
    dataErrors.update && dataErrors.update(dataErrors.errors);
}

export default dataErrors