const adornarArbol = (arbol,cajaAdornos,adornosIniciales) => {

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


export{
    adornarArbol
}
