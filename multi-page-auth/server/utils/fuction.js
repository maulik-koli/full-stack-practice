const allFields = ['name', 'email', 'password']

const isValid = (reqBody, requireFields = allFields) => {
    const inputedField = Object.keys(reqBody)
    const match = inputedField.every((field) => requireFields.includes(field))
    return match
}

module.exports = isValid