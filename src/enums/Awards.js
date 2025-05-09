const Award = {
        1: [1, 'Goya', [2024, 2025]]
}

const getValues = () => {
    const values = Object.keys(Award).map(key => Award[key])
    console.log(values)
    return values
 }

 const setValues = premios => {
    premios.forEach(p => {
        Award[p.id] = [p.id, p.titulo, p.anyos]
    });
 }

 const getAward = (id) => {
    return Award[id]
 }

export default { getValues, setValues, getAward }