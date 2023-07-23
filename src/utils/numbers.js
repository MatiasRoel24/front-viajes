
export const numberToCurrency = (number) => {
    if(typeof number !== 'string') throw new Error("El parametro debe ser un string");   
    return number.replace(',','.');
}

export const currencyFormat = (number) => {
    if (!number) throw new Error("El parametro debe ser un string");
    const precioFormated = new Intl.NumberFormat('es-AR').format(number);
    return precioFormated;
}