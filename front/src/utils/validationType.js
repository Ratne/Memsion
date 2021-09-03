export const required = (data, name) =>{
    const value = data[name];
    return !(value === undefined || value === '' || value === null)
}

export const email = (data, name) => {
    const value = data[name];
    return ( value === undefined || value === '' ) || /\S+@\S+\.\S+/.test(value)
}
export const compare = (data, name, valid) =>{
    const    value = data[name];
    const valueCompare = data[valid.extraField]
    return (value === valueCompare)
}
export const messageErrors = {
    required: (field) => `il campo ${field} è obbligatorio`,
    email: (field) => `il campo ${field} deve essere una email valida`,
}


export const validationTypeName = {
    required: 'required',
    email: 'email',
    compare: 'compare'
}


export const validationType = {
   [validationTypeName.required] :  required, [validationTypeName.email] :email,
    [validationTypeName.compare] : compare
}