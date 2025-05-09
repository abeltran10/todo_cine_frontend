

const Region = {
    ES: [0, 'ES', 'España'],
    US: [1, 'US', 'USA']
}

const getValues = () => {
    const keys = Object.keys(Region).map(key => Region[key])
    console.log(keys)
    return keys
 }

 const getRegion = (region) => {
    return Region[region]
 }

export default { getValues, getRegion }