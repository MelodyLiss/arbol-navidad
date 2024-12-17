const encenderArbol = () => {
    console.log('🔍 FUNCIÓN encenderArbol DEFINIDA');
    
    const coloresLuces = ['blanca', 'amarilla', 'azul', 'roja', 'verde', 'rosada'];
    let indice = 0;
    
    const cambiarColorLuces = (secuencia) => {
        const luces = document.querySelectorAll('.luz');
        console.log('🚨 Luces encontradas:', luces.length);
        console.log(`🌈 Cambiando luces - ${secuencia}`);
        
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
                    const colorActual =[coloresLuces[1],coloresLuces[3],coloresLuces[5]]
                    let colorIndex = (indice + i) % colorActual.length;
                    luz.classList.add(colorActual[colorIndex]);
                    luz.style.opacity = '1';
                } else {
                    luz.style.opacity = '0';
                }
                
            });
        } else {
            luces.forEach((luz, i) => {
                coloresLuces.forEach(color => luz.classList.remove(color));
                if (i % 2 === 0) {
                    const colorActual =[coloresLuces[0],coloresLuces[2],coloresLuces[4]]
                    let colorIndex = (indice + i) % colorActual.length;
                    luz.classList.add(colorActual[colorIndex]);
                    luz.style.opacity = '1';
                } else {
                    luz.style.opacity = '0';
                }
            });
        }
        indice = (indice + 1) % coloresLuces.length;
    };

    let intervaloActual = null;
    let secuenciaActual = 'secuencia3';

    const cambiarSecuencia = () => {
        console.log('🔄 Cambiando secuencia');
        
        if (intervaloActual) {
            clearInterval(intervaloActual);
        }

        if (secuenciaActual === 'secuencia1') {
            secuenciaActual = 'secuencia2';
        } else if (secuenciaActual === 'secuencia2') {
            secuenciaActual = 'secuencia3';
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
        
        if (cajaAdornos && cajaAdornos.children.length > 0) {
            console.log("❌ Aún te quedan esferas por colocar");
            return;
        }

        const luces = document.querySelectorAll('.luz');
        if (luces.length === 0) {
            console.log("❌ No se encontraron luces.No se crearon correctamente 😒.");
            return;
        }

        cambiarSecuencia();

        setInterval(cambiarSecuencia, 6000);
    };
};

export{
    encenderArbol
}