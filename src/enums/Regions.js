

const Region = {
    ES: [0, 'ES', 'España'],
    USA: [1, 'US', 'USA']
}

const getValues = () => {
    const keys = Object.keys(Region).map(key => Region[key])
    console.log(keys)
    return keys
 }

export default { getValues }