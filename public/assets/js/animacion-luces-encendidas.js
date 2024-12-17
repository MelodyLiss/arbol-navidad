/* temporales mover al index o ver si ya estan*/

const cajaAdornos = document.querySelector('.adornos-arbol-navidenio');
const btnEncender = document.querySelector('#listo');




const encenderArbol = (coloresLuces) => {

    btnEncender.addEventListener('click', () => {

        if (cajaAdornos.children.length > 0) {
            console.log("Aún te quedan esferas por colocar");
            return;
        }
        const luces = document.querySelectorAll('.luz');     
        let indice = 0;

        setInterval(() => {
            luces.forEach((luz, i) => {
                coloresLuces.forEach(color => luz.classList.remove(color));
                const colorIndex = (indice + i) % coloresLuces.length; //para que sea ciclico :D
                luz.classList.add(coloresLuces[colorIndex]);
            });
            indice = (indice + 1) % coloresLuces.length; 
        }, 600);
    });
};




export {
    encenderArbol
}
