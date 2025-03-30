const Award = {
        
}

const getValues = () => {
    const keys = Object.keys(Award).map(key => Award[key])
    console.log(keys)
    return keys
 }

 const setValues = premios => {
    premios.forEach(p => {
        const titulo = p.titulo.toUpperCase()
        Award[titulo] = [p.id, p.titulo, p.anyos]
    });
 }

export default { getValues, setValues }