import { animacionAdornos, inicializarEventosEsferas, } from "./adornar-arbol.js"

const encenderArbol = () => {

    const coloresLuces = ['blanca', 'amarilla', 'azul', 'roja', 'verde', 'rosada'];
    let indice = 0;

    const cambiarColorLuces = (secuencia) => {
        const luces = document.querySelectorAll('.luz');

        if (secuencia === 'secuencia1') {
            luces.forEach((luz, i) => {
                coloresLuces.forEach(color => luz.classList.remove(color));
                const colorIndex = (indice + i) % coloresLuces.length;
                luz.classList.add(coloresLuces[colorIndex]);
                luz.style.opacity = '1';
            });
        } else if (secuencia === 'secuencia2') {
            luces.forEach((luz, i) => {
                coloresLuces.forEach(color => luz.classList.remove(color));
                if (i % 2 !== 0) {
                    const colorActual = [coloresLuces[1], coloresLuces[3], coloresLuces[5]];
                    let colorIndex = (indice + i) % colorActual.length;
                    luz.classList.add(colorActual[colorIndex]);
                    luz.style.opacity = '1';
                } else {
                    luz.style.opacity = '0';
                }
            });
        } else if (secuencia === 'secuencia3') {
            luces.forEach((luz, i) => {
                coloresLuces.forEach(color => luz.classList.remove(color));
                if (i % 2 === 0) {
                    const colorActual = [coloresLuces[0], coloresLuces[2], coloresLuces[4]];
                    let colorIndex = (indice + i) % colorActual.length;
                    luz.classList.add(colorActual[colorIndex]);
                    luz.style.opacity = '1';
                } else {
                    luz.style.opacity = '0';
                }
            });
        } else if (secuencia === 'secuencia4') {
            // Alternamos entre secuencia2 y secuencia3
            const subSecuencia = Math.floor(Date.now() / 800) % 2 === 0 ? 'secuencia2' : 'secuencia3';
            cambiarColorLuces(subSecuencia);
        }
        indice = (indice + 1) % coloresLuces.length;
    };

    let intervaloActual = null;
    let secuenciaActual = 'secuencia4';

    const cambiarSecuencia = () => {
        if (intervaloActual) {
            clearInterval(intervaloActual);
        }

        if (secuenciaActual === 'secuencia1') {
            secuenciaActual = 'secuencia2';
        } else if (secuenciaActual === 'secuencia2') {
            secuenciaActual = 'secuencia3';
        } else if (secuenciaActual === 'secuencia3') {
            secuenciaActual = 'secuencia4';
        } else {
            secuenciaActual = 'secuencia1';
        }

        cambiarColorLuces(secuenciaActual);

        intervaloActual = setInterval(() => {
            cambiarColorLuces(secuenciaActual);
        }, 800);
    };

    return () => {
        const cajaAdornos = document.querySelector('.adornos-arbol-navidenio');
        const mensajeFaltan = document.querySelector('#mensaje-falta');
        const mostrarFoto = document.querySelector('#mostrar-foto');

        if (cajaAdornos && cajaAdornos.children.length > 0) {
            mensajeFaltan.innerHTML = "❌ Aún te quedan esferas por colocar"
            return;
        }

        const luces = document.querySelectorAll('.luz');
        if (luces.length === 0) {
            console.log("❌ No se encontraron luces. No se crearon correctamente 😒.");
            return;
        }

        cambiarSecuencia();
        animacionAdornos();
        inicializarEventosEsferas();


        // setTimeout(() => {
        //     mostrarFoto.classList.remove('ocultar')
        // }, 15000); // 15000 ms = 15 segundos

        setInterval(cambiarSecuencia, 6000);
    };
};

export {
    encenderArbol
}


