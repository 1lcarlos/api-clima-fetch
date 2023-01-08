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
  const appId = "f257a171e195ae98dffdbda1552a411f";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}&lang=es`;
  spinner();
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
    name,
    main: { temp, temp_max, temp_min },
    coord: { lat, long },
  } = datos;
  const tempCelcius = kelvinACelcius(temp);
  const tempMaxCelcius = kelvinACelcius(temp_max);
  const tempMinCelcius = kelvinACelcius(temp_min);

  const nombreCiudad = document.createElement("p");
  nombreCiudad.innerHTML = `Clima en ${name} &#8451`;
  nombreCiudad.classList.add("font-bold", "text-2xl");

  const actual = document.createElement("p");
  actual.innerHTML = `${tempCelcius} &#8451`;
  actual.classList.add("font-bold", "text-6xl");

  const max = document.createElement("p");
  max.innerHTML = `Max: ${tempMaxCelcius} &#8451`;
  max.classList.add("text-xl");

  const min = document.createElement("p");
  min.innerHTML = `Min: ${tempMinCelcius} &#8451`;
  min.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");

  const mapaDiv = document.createElement("div");
  mapaDiv.setAttribute("id", "map");

  /* const map = L.map("map").setView([long, -lat], 5);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map); */

  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(max);
  resultadoDiv.appendChild(min);
  resultadoDiv.appendChild(mapaDiv);

  resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

const kelvinACelcius = (temp) => parseInt(temp - 273.15);

function spinner() {
  limpiarHTML();
  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-cube-grid");
  divSpinner.innerHTML = `
  
      <div class="sk-cube sk-cube1"></div>
      <div class="sk-cube sk-cube2"></div>
      <div class="sk-cube sk-cube3"></div>
      <div class="sk-cube sk-cube4"></div>
      <div class="sk-cube sk-cube5"></div>
      <div class="sk-cube sk-cube6"></div>
      <div class="sk-cube sk-cube7"></div>
      <div class="sk-cube sk-cube8"></div>
      <div class="sk-cube sk-cube9"></div>

  `;
  resultado.appendChild(divSpinner);
}
