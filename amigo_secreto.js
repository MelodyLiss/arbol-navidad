
const participantes = ['😺', '🦊', '🐶', '🐸','🐷'];

const nombres = ['gato','zorro','perro','rana','cerdo']


const mesclarParticipantes = (arreglo) => {
    const copiaArreglo = [...arreglo];  // Copiar el arreglo

    // Algoritmo de Fisher-Yates para mezclar el arreglo
    for (let i = copiaArreglo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [copiaArreglo[i], copiaArreglo[j]] = [copiaArreglo[j], copiaArreglo[i]];

    }
    return copiaArreglo;
};

const generarSorteo = (participantes) => {
    let amigoSecreto;

    do {
        amigoSecreto = mesclarParticipantes(participantes);
    } while (participantes.some((participante, index) => participante === amigoSecreto[index])); 

    // Crear el sorteo
    const sorteo = participantes.map((participante, index) => ({
        nombre: participante,
        regala: amigoSecreto[index],
    }));

    sorteo.forEach(obj => {
        const receptor = sorteo.find(receptor => receptor.nombre === obj.regala);
    
        if (receptor) {
            receptor.recibe = obj.nombre;
        }
    });

    return sorteo;
};

const sorteo = generarSorteo(participantes);
console.log("Sorteo:" , sorteo);



