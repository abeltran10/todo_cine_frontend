const Award = {
    GOYA: [1, 'Goya', [2024, 2025]],
    
}

const getValues = () => {
    const keys = Object.keys(Award).map(key => Award[key])
    console.log(keys)
    return keys
 }

export default { getValues }