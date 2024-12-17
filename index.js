import {adornarArbol} from "./public/assets/js/adornar-arbol.js";
import {secuenciaLuces} from "./public/assets/js/animacion-inicio-luces.js";
import {encenderArbol} from "./public/assets/js/animacion-luces-encendidas.js"



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
    { nombre: 'esfera_01', src: './public/assets/img/adornos/esfera_navidad_A.svg' },
    // { nombre: 'esfera_02', src: './public/assets/img/adornos/esfera_navidad_A.svg' },
    // { nombre: 'esfera_03', src: './public/assets/img/adornos/esfera_navidad_A.svg' },
    // { nombre: 'esfera_04', src: './public/assets/img/adornos/esfera_navidad_A.svg' },
    // { nombre: 'esfera_05', src: './public/assets/img/adornos/esfera_navidad_A.svg' },
    // { nombre: 'esfera_06', src: './public/assets/img/adornos/esfera_navidad_A.svg' },
    // { nombre: 'esfera_07', src: './public/assets/img/adornos/esfera_navidad_A.svg' },
    // { nombre: 'esfera_08', src: './public/assets/img/adornos/esfera_navidad_A.svg' },
    // { nombre: 'esfera_09', src: './public/assets/img/adornos/esfera_navidad_A.svg' },
    // { nombre: 'esfera_10', src: './public/assets/img/adornos/esfera_navidad_A.svg' },
];

const coloresLuces = ['blanca', 'amarilla', 'azul', 'roja', 'verde', 'rosada']

document.addEventListener("DOMContentLoaded", () => {
    secuenciaLuces(setLuces);
    adornarArbol(arbol,cajaAdornos,adornos)
    encenderArbol(coloresLuces)
    
});