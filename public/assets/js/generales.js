

const volumenInicial = () => {
    const musica = document.getElementById('musica');
    const audioButton = document.getElementById('audio-button');

    // Configurar el volumen inicial
    musica.volume = 0.01;

    // Alternar música
    audioButton.addEventListener('click', () => {
        if (musica.paused) {
            musica.play();
            audioButton.textContent = '🎵'; 
            audioButton.title = "Música activada";
        } else {
            musica.pause();
            audioButton.textContent = '🔇'; 
            audioButton.title = "Música desactivada";
        }
    });

};

const crearCopo = () => {
    const contenedorNieve = document.querySelector('.nieve');
    const copo = document.createElement('div');
        copo.classList.add('copo');

        // Posición aleatoria en el eje X
        copo.style.left = `${Math.random() * 100}vw`;
        const tamano = Math.random() * 5 + 3; // Tamaño entre 3px y 8px
        copo.style.width = `${tamano}px`;
        copo.style.height = `${tamano}px`;


        const duracion = Math.random() * 3 + 5; 
        copo.style.animationDuration = `${duracion}s`;

        contenedorNieve.appendChild(copo);


        setTimeout(() => {
            copo.remove();
        }, duracion * 1000);
};


export{
volumenInicial,
crearCopo
}