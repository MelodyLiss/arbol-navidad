import { adornarArbol, girar } from "./adornar-arbol.js";
const { girarTodasLasEsferas } = girar()
import { secuenciaLuces } from "./animacion-inicio-luces.js";
import { encenderArbol } from "./animacion-luces-encendidas.js";
import { volumenInicial, crearCopo } from "./generales.js"
const arbol = document.querySelector('#arbol');
const cajaAdornos = document.querySelector('.adornos-arbol-navidenio');




/* trayectos para la creacion de las luces */
const setLuces = [
    { pathId: '#trayecto_1', svgId: '#svg1', /* opciones: { espaciado: 5, color: 'red', radio: 2, intervalo: 80 } */ }, // podemos variar las opciones tambien 
    { pathId: '#trayecto_2', svgId: '#svg1' },
    { pathId: '#trayecto_3', svgId: '#svg1' },
    { pathId: '#trayecto_4', svgId: '#svg1' }
];

/* adornos para el arbol */
const adornos = [
    { nombre: 'esfera_01', src: '../assets/img/adornos/esfera_navidad_A.svg' },
    { nombre: 'esfera_02', src: '../assets/img/adornos/esfera_navidad_A.svg' },
    { nombre: 'esfera_03', src: './assets/img/adornos/esfera_navidad_A.svg' },
    { nombre: 'esfera_04', src: './assets/img/adornos/esfera_navidad_A.svg' },
    { nombre: 'esfera_05', src: './assets/img/adornos/esfera_navidad_A.svg' },
    { nombre: 'esfera_06', src: './assets/img/adornos/esfera_navidad_A.svg' },
    { nombre: 'esfera_07', src: './assets/img/adornos/esfera_navidad_A.svg' },
    { nombre: 'esfera_08', src: '/assets/img/adornos/esfera_navidad_A.svg' },
    { nombre: 'esfera_09', src: '/assets/img/adornos/esfera_navidad_A.svg' },
    { nombre: 'esfera_10', src: '/assets/img/adornos/esfera_navidad_A.svg' },
];

document.addEventListener("DOMContentLoaded", () => {

    volumenInicial();
    setInterval(crearCopo, 100);
    secuenciaLuces(setLuces);
    adornarArbol(arbol, cajaAdornos, adornos);

    const iniciarSecuenciaLuces = encenderArbol();

    const btnEncender = document.querySelector('#listo');
    btnEncender.addEventListener('click', iniciarSecuenciaLuces);




    // const mostrarFotoBtn = document.querySelector('#mostrar-foto');
    // ['click', 'touchstart'].forEach(evento => {
    //     mostrarFotoBtn.addEventListener(evento, (e) => {
    //         if (e.type === 'touchstart') e.preventDefault();
    //         girarTodasLasEsferas();
    //     });
    // });
});