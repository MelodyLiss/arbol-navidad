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



/* animacion de adornos */

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
};

const cambioEsfera = () => {
    const mostrar = document.getElementById('mostrar-foto');

    fetch('./public/assets/datos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON');
            }
            return response.json();
        })
        .then(datos => {
            mostrar.addEventListener('click', () => {
                const esferas = document.querySelectorAll('.adorno_en_arbol');

                esferas.forEach((esfera, index) => {
                    if (datos[index] && datos[index].imagen) {
                        // Crear un nuevo elemento SVG
                        const nuevoSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        nuevoSVG.setAttribute("width", "250");
                        nuevoSVG.setAttribute("height", "250");
                        nuevoSVG.setAttribute("viewBox", "0 0 24.053027 24.053027");
                        nuevoSVG.setAttribute("class", "esfera-foto");

                        // Crear un identificador único para el patrón
                        const patternId = `imagePattern_${index}`;

                        // Crear el contenido del SVG
                        nuevoSVG.innerHTML = `
                            <defs>
                                <pattern id="${patternId}" x="0" y="0" width="14.33" height="13.46" preserveAspectRatio="xMidYMid slice" >
                                    <image href="${datos[index].imagen}" x="0" y="0" width="14.33" height="13.46" preserveAspectRatio="xMidYMid slice"  />
                                </pattern>
                            </defs>
                            <ellipse style="fill:url(#${patternId});fill-opacity:1;stroke:none;stroke-width:0.727272"cx="11.760735" cy="14.14187" rx="7.1641097" ry="6.7292938" />

                            <path d="m 11.86451,4.0167416 c -0.857731,-9.73e-5 -1.553116,0.6210375 -1.553111,1.3872771 9.15e-4,0.048531 0.0047,0.096985 0.01128,0.1451638 0,0 -0.5168037,-0.049174 -0.5483985,0.010658 C 9.41437,6.2414062 9.8828326,7.8813947 9.8828326,7.8813947 l 4.0485754,0.2122947 c 0,0 0.21469,-1.8613046 -0.05856,-2.5445069 -0.05751,-0.1437976 -0.464618,0 -0.464618,0 0.0058,-0.048216 0.0088,-0.09667 0.0089,-0.1451638 5e-6,-0.7660759 -0.695094,-1.387143 -1.552642,-1.3872771 z m 0,0.4350215 c 0.560144,1.534e-4 1.01417,0.4171668 1.014268,0.931585 7.6e-5,0.055605 -0.0053,0.1111046 -0.01597,0.1658344 h -1.996589 c -0.01086,-0.054717 -0.01636,-0.1102164 -0.01644,-0.1658344 9.8e-5,-0.5145863 0.45441,-0.9316695 1.014737,-0.931585 z" style="fill:#d1bd31;fill-opacity:0.947522;stroke:none;stroke-width:0.727272" />
                            <path d="m 11.760615,7.4127483 a 7.1641097,6.7292938 0 0 0 -7.1637621,6.7292097 7.1641097,6.7292938 0 0 0 7.1637621,6.729211 7.1641097,6.7292938 0 0 0 7.164231,-6.729211 7.1641097,6.7292938 0 0 0 -7.164231,-6.7292097 z m 0.02067,0.760583 A 6.3412266,6.0099382 0 0 1 18.122453,14.1833 6.3412266,6.0099382 0 0 1 11.781285,20.193268 6.3412266,6.0099382 0 0 1 5.4401182,14.1833 6.3412266,6.0099382 0 0 1 11.781285,8.1733313 Z" style="fill:#c10000;stroke-width:0.727272" />
                        `;

                        esfera.innerHTML = '';
                        esfera.appendChild(nuevoSVG);

                        // Forzar un reflow para asegurar que el navegador actualice la visualización >:C
                        esfera.offsetHeight;
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
};





export {
    adornarArbol,
    animacionAdornos,
    cambioEsfera
}