const Award = {
        
}

const getValues = () => {
    const values = Object.keys(Award).map(key => Award[key])
    console.log(values)
    return values
 }

 const setValues = premios => {
    premios.forEach(p => {
        const titulo = p.titulo.toUpperCase()
        Award[titulo] = [p.id, p.titulo, p.anyos]
    });
 }

export default { getValues, setValues }