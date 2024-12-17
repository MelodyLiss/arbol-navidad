/* Encendido de luces al iniciar la página  */
const encenderLuces = (pathId, svgId, opciones = {}) => {
    const path = document.querySelector(pathId);
    const svg = document.querySelector(svgId);
    const pathLength = path.getTotalLength();

    let luces = 0;

    const espaciado = opciones.espaciado || 8;
    const color = opciones.color || 'yellow';
    const radio = opciones.radio || 2;
    const intervalo = opciones.intervalo || 35;

    return new Promise((resolve) => {
        const agregarLuz = () => {
            if (luces * espaciado >= pathLength) {
                resolve();
                return;
            }
            const punto = path.getPointAtLength(luces * espaciado);
            luces++;
            const nuevaLuz = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            nuevaLuz.setAttribute('cx', punto.x);
            nuevaLuz.setAttribute('cy', punto.y);
            nuevaLuz.setAttribute('r', radio);
            nuevaLuz.classList.add('luz');
            nuevaLuz.classList.add('blanca'); //color inicial
            svg.appendChild(nuevaLuz);
        }
        setInterval(agregarLuz, intervalo);
    })
}
const secuenciaLuces = (setLuces) => {
    let promesa = Promise.resolve();
    setLuces.forEach(set => {
        promesa = promesa.then(() => {
            return encenderLuces(set.pathId, set.svgId, set.opciones);
        });
    });
}

export{
    secuenciaLuces
}




