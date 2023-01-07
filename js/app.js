import {appId} from './config.js'

const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    mostrarError("Ambos Campos son obligatorios");
    return;
  }
  consultarApi(ciudad, pais);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector(".bg-red-100");

  if (!alerta) {
    const alerta = document.createElement("div");
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
        <strong class = "font-bold"> Error!</strong>
        <span class = "block"> ${mensaje}</span>
    `;
    container.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}

function consultarApi(ciudad, pais) {
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}&lang=es`;
  fetch(url)
    .then((res) => res.json())
    .then((datos) => {
      console.log(datos);
      limpiarHTML();
      if (datos.cod === "404") {
        mostrarError("Ciudad no encontrada");
        return;
      }
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    main: { temp, tem_max, temp_min },
  } = datos;
  const celcius = parseInt(temp - 273.15); 

  const actual = document.createElement("p");
  actual.innerHTML = `${celcius} &#8451`;
  actual.classList.add("font-bold", "text-6xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(actual);
  resultado.appendChild(resultadoDiv);
}

function limpiarHTML(){
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
  }
}
