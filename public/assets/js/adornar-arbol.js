

const adornarArbol = (arbol, cajaAdornos, adornosIniciales) => {

    let adornoSeleccionado = null;
    let offsetX, offsetY;

    const inicializarAdornos = () => {
        cajaAdornos.innerHTML = '';

        adornosIniciales.forEach(objeto => {
            const adorno = crearAdorno(objeto.nombre, objeto.src, objeto.clase || 'esfera_base_A');
            cajaAdornos.appendChild(adorno);
        });
    };

    const crearAdorno = (nombre, src, clase) => {
        const adorno = document.createElement('div');
        adorno.classList.add(clase);
        adorno.draggable = true;
        adorno.dataset.nombre = nombre;

        const imagen = document.createElement('img');
        imagen.src = src;
        imagen.alt = nombre;

        adorno.appendChild(imagen);
        adorno.addEventListener('dragstart', iniciarArrastre);
        adorno.addEventListener('touchstart', iniciarToque, { passive: false });
        return adorno;
    };

    const iniciarArrastre = (e) => {
        adornoSeleccionado = e.target.closest('[draggable="true"]');
        e.dataTransfer.setData('text/plain', adornoSeleccionado.dataset.nombre);
        const rect = adornoSeleccionado.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    };

    const iniciarToque = (e) => {
        e.preventDefault();
        adornoSeleccionado = e.target.closest('[draggable="true"]');
        const touch = e.touches[0];
        const rect = adornoSeleccionado.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        document.addEventListener('touchmove', moverToque, { passive: false });
        document.addEventListener('touchend', finalizarToque);
    };

    const permitirSoltar = (e) => {
        e.preventDefault();
    };

    const soltarAdorno = (e) => {
        e.preventDefault();
        const nombreAdorno = e.dataTransfer.getData('text');
        colocarOmoverAdorno(nombreAdorno, e.clientX, e.clientY);
    };

    const moverToque = (e) => {
        e.preventDefault();
        if (adornoSeleccionado) {
            const touch = e.touches[0];
            moverAdorno(adornoSeleccionado, touch.clientX, touch.clientY);
        }
    };

    const finalizarToque = (e) => {
        if (adornoSeleccionado) {
            if (!adornoSeleccionado.classList.contains('adorno_en_arbol')) {
                colocarOmoverAdorno(adornoSeleccionado.dataset.nombre, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            }
            adornoSeleccionado = null;
        }
        document.removeEventListener('touchmove', moverToque);
        document.removeEventListener('touchend', finalizarToque);
    };

    const colocarOmoverAdorno = (nombreAdorno, clientX, clientY) => {
        const adornoExistente = Array.from(arbol.querySelectorAll('.adorno_en_arbol'))
            .find(adorno => adorno.dataset.nombre === nombreAdorno);

        if (adornoExistente) {
            moverAdorno(adornoExistente, clientX, clientY);
        } else {
            const adornoOriginal = cajaAdornos.querySelector(`[data-nombre="${nombreAdorno}"]`);
            if (!adornoOriginal) return;

            const nuevoAdorno = crearAdorno(
                nombreAdorno,
                adornoOriginal.querySelector('img').src,
                'adorno_en_arbol'
            );
            nuevoAdorno.style.position = 'absolute';
            arbol.appendChild(nuevoAdorno);

            cajaAdornos.removeChild(adornoOriginal);
            moverAdorno(nuevoAdorno, clientX, clientY);
        }
    };

    const moverAdorno = (adorno, clientX, clientY) => {
        const arbolRect = arbol.getBoundingClientRect();
        const x = clientX - arbolRect.left - offsetX;
        const y = clientY - arbolRect.top - offsetY;

        const adornoRect = adorno.getBoundingClientRect();
        const maxX = arbolRect.width - adornoRect.width;
        const maxY = arbolRect.height - adornoRect.height;

        adorno.style.left = `${Math.min(Math.max(0, x), maxX)}px`;
        adorno.style.top = `${Math.min(Math.max(0, y), maxY)}px`;
    };

    inicializarAdornos();

    arbol.addEventListener('dragover', permitirSoltar);
    arbol.addEventListener('drop', soltarAdorno);
};

const animacionAdornos = () => {
    const adornosArbol = document.querySelectorAll('.adorno_en_arbol');
    const cambiarTamaño = () => {

        adornosArbol.forEach(adorno => {
            const escalaAleatoria = 0.8 + Math.random() * 0.4;
            adorno.style.transition = 'transform 0.5s ease-in-out';
            adorno.style.transform = `scale(${escalaAleatoria})`;
        });
    };
    setInterval(cambiarTamaño, 500);
    setInterval(girarEsferaAleatoria, 6000);
};

const cargarDatosEsferas = async () => {
    try {
        const response = await fetch('../assets/datos.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
        return null;
    }
};

const crearContenidoEsfera = (datos, index) => {
    const nuevoSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    nuevoSVG.setAttribute("width", "250");
    nuevoSVG.setAttribute("height", "250");
    nuevoSVG.setAttribute("viewBox", "0 0 24.053027 24.053027");
    nuevoSVG.setAttribute("class", "esfera-foto");

    const patternId = `imagePattern_${index}`;
    nuevoSVG.innerHTML = `
        <defs>
            <pattern id="${patternId}" x="0" y="0" width="14.33" height="13.46" preserveAspectRatio="xMidYMid slice">
                <image href="${datos.imagen}" x="0" y="0" width="14.33" height="13.46" preserveAspectRatio="xMidYMid slice" />
            </pattern>
        </defs>
        <ellipse style="fill:url(#${patternId});fill-opacity:1;stroke:none;stroke-width:0.727272" cx="11.760735" cy="14.14187" rx="7.1641097" ry="6.7292938" />
        <path d="m 11.86451,4.0167416 c -0.857731,-9.73e-5 -1.553116,0.6210375 -1.553111,1.3872771 9.15e-4,0.048531 0.0047,0.096985 0.01128,0.1451638 0,0 -0.5168037,-0.049174 -0.5483985,0.010658 C 9.41437,6.2414062 9.8828326,7.8813947 9.8828326,7.8813947 l 4.0485754,0.2122947 c 0,0 0.21469,-1.8613046 -0.05856,-2.5445069 -0.05751,-0.1437976 -0.464618,0 -0.464618,0 0.0058,-0.048216 0.0088,-0.09667 0.0089,-0.1451638 5e-6,-0.7660759 -0.695094,-1.387143 -1.552642,-1.3872771 z" style="fill:#d1bd31;fill-opacity:0.947522;stroke:none;stroke-width:0.727272" />
        <path d="m 11.760615,7.4127483 a 7.1641097,6.7292938 0 0 0 -7.1637621,6.7292097 7.1641097,6.7292938 0 0 0 7.1637621,6.729211 7.1641097,6.7292938 0 0 0 7.164231,-6.729211 7.1641097,6.7292938 0 0 0 -7.164231,-6.7292097 z m 0.02067,0.760583 A 6.3412266,6.0099382 0 0 1 18.122453,14.1833 6.3412266,6.0099382 0 0 1 11.781285,20.193268 6.3412266,6.0099382 0 0 1 5.4401182,14.1833 6.3412266,6.0099382 0 0 1 11.781285,8.1733313 Z" style="fill:#c10000;stroke-width:0.727272" />
    `;
    return nuevoSVG;
};

const girar = () => {
    const timeouts = new Map();
    let mostrandoContenidoAlternativo = false;

    const girarEsfera = async (esfera, forzarOriginal = false) => {
        // Cancelar timeout previo si existe
        const timeoutId = timeouts.get(esfera);
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeouts.delete(esfera);
        }

        const contenidoOriginal = esfera.innerHTML;
        const index = parseInt(esfera.dataset.nombre?.split('_')[1] || 1) - 1;

        if (forzarOriginal || mostrandoContenidoAlternativo) {
            esfera.style.transition = 'transform 0.5s ease-in-out';
            esfera.style.transform = 'rotateY(180deg)';

            setTimeout(() => {
                esfera.innerHTML = contenidoOriginal;
                esfera.style.transform = 'rotateY(0deg)';
            }, 500);
            return;
        }

        const datos = await cargarDatosEsferas();
        if (datos && datos[index]) {
            esfera.style.transition = 'transform 0.5s ease-in-out';
            esfera.style.transform = 'rotateY(180deg)';

            setTimeout(() => {
                esfera.innerHTML = '';
                esfera.appendChild(crearContenidoEsfera(datos[index], index));

                setTimeout(() => {
                    esfera.style.transform = 'rotateY(360deg)';

                    const timeout = setTimeout(() => {
                        esfera.style.transform = 'rotateY(0deg)';
                        esfera.innerHTML = contenidoOriginal;
                    }, 3000);
                    timeouts.set(esfera, timeout);
                }, 500);
            }, 250);
        }
    };

    const girarTodasLasEsferas = async () => {
        const esferas = document.querySelectorAll('.adorno_en_arbol');

        mostrandoContenidoAlternativo = !mostrandoContenidoAlternativo;

        if (esferas.length > 0) {
            for (let i = 0; i < esferas.length; i++) {
                await girarEsfera(esferas[i], !mostrandoContenidoAlternativo);
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }
    };

    const girarEsferaAleatoria = () => {
        const esferas = document.querySelectorAll('.adorno_en_arbol');
        if (esferas.length > 0) {
            const esferaAleatoria = esferas[Math.floor(Math.random() * esferas.length)];
            girarEsfera(esferaAleatoria);
        }
    };

    return {
        girarEsfera,
        girarTodasLasEsferas,
        girarEsferaAleatoria
    };
};

const { girarEsferaAleatoria, girarEsfera } = girar() //mejorar!

const crearDivDetalle = (datos, index) => {
    const divDetalle = document.createElement('div');
    divDetalle.classList.add('detalle-esfera');

    const btnCerrar = document.createElement('button');
    btnCerrar.classList.add('btnCerrar');
    btnCerrar.innerHTML = '×';
    btnCerrar.addEventListener('click', () => divDetalle.remove());

    const titulo = document.createElement('h2');
    titulo.classList.add('titilo-tarjeta')
    titulo.textContent = datos.nombre;

    const contenedorSVG = document.createElement('div');
    contenedorSVG.style.cssText = `
        margin: 15px 0;
        display: flex;
        justify-content: center;
    `;
    contenedorSVG.appendChild(crearContenidoEsfera(datos, index));

    const mensaje = document.createElement('p');
    mensaje.textContent = datos.mensaje;
    mensaje.classList.add('mensaje-tarjeta')

    const fondoOscuro = document.createElement('div');
    fondoOscuro.classList.add = 'fondoTarjeta';
    fondoOscuro.addEventListener('click', () => {
        fondoOscuro.remove();
        divDetalle.remove();
    });

    // Ensamblar el div de detalle
    divDetalle.appendChild(btnCerrar);
    divDetalle.appendChild(titulo);
    divDetalle.appendChild(contenedorSVG);
    divDetalle.appendChild(mensaje);

    return {
        divDetalle,
        fondoOscuro
    };
};

const mostrarDetalleEsfera = async (esfera) => {
    // Obtenemos el número de la esfera del atributo nombre
    const esferaNumero = esfera.dataset.nombre.split('_')[1];
    // Convertimos el string "01", "02", etc. a número y restamos 1 para el índice
    const index = parseInt(esferaNumero) - 1;

    const datos = await cargarDatosEsferas();

    if (datos && datos[index]) {
        const { divDetalle, fondoOscuro } = crearDivDetalle(datos[index], index);
        document.body.appendChild(fondoOscuro);
        document.body.appendChild(divDetalle);

        divDetalle.style.opacity = '0';
        divDetalle.style.transform = 'translate(-50%, -60%)';
        divDetalle.style.transition = 'all 0.3s ease-out';

        divDetalle.offsetHeight;

        divDetalle.style.opacity = '1';
        divDetalle.style.transform = 'translate(-50%, -50%)';
    }
};

const inicializarEventosEsferas = () => {
    const esferas = document.querySelectorAll('.adorno_en_arbol');
    esferas.forEach(esfera => {
        // Variable para evitar doble disparo en dispositivos táctiles
        let isTouch = false;

        // Evento hover para girar (solo en desktop)
        esfera.addEventListener('mouseenter', () => {
            if (!isTouch) {
                girarEsfera(esfera);
            }
        });

        // Evento click para mostrar detalle
        esfera.addEventListener('click', (e) => {
            if (!isTouch) {
                mostrarDetalleEsfera(esfera);
            }
        });

        // Eventos touch
        esfera.addEventListener('touchstart', (e) => {
            isTouch = true;
            mostrarDetalleEsfera(esfera);
        }, { passive: true });
    });
};

export {
    adornarArbol,
    animacionAdornos,
    girar,
    inicializarEventosEsferas
}