// Acceder a la api y mostrar en un console log lo que devuelve
// Crear un template para mostrar todos los paises en el html
// Ordenar alfabeticamente los paises
// Hacer una funcion que cuando le hago click a una bandera me muestra su info
// Dicha info sale en un modal
// Que se cierre el modal
// Añadir estilos

const url = `https://restcountries.com/v3.1/all?fields=name,flags,population,capital,car`;
let listaPaises = [];

const getPaises = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error de conexion con la API");
    }

    const data = await response.json();
    data.sort((a, b) => {
      // Local compare lo utilizo para el tema de los acentos
      // y que además omite las mayusculas y minusculas
      return a.name.common.localeCompare(b.name.common);
    });

    listaPaises = data;

    return listaPaises;
  } catch (error) {
    throw new Error("Error en la conexion");
  }
};

const getInfoPais = (idPais) => {
  const detallePais = listaPaises[idPais];
  console.log(detallePais);
  return detallePais;
};

const abrirModalPais = (idPais) => {
  const detalle = getInfoPais(idPais);
  let lado;
  if (detalle.car.side == "rigth") {
    lado = "derecha";
  } else {
    lado = "izquierda";
  }
  // Rellenar contenido del modal
  document.getElementById("modal-nombre").textContent =
    "Nombre: " + detalle.name.common;
  document.getElementById("modal-bandera").src = detalle.flags.png;
  document.getElementById("capital").textContent =
    "Capital: " + detalle.capital[0];
  document.getElementById("population").textContent =
    "Población: " + detalle.population + " habitantes.";
  document.getElementById("car").textContent = "Conducen por la " + lado;

  document.getElementById("modal-pais").style.display = "block";
};

const template = (paises) => {
  container = document.getElementById("countries-list");
  paises.forEach((pais, index) => {
    const numeroLista = index + 1;
    let templatePais = `
        <div class="pais" id="${
          numeroLista - 1
        }"onclick="abrirModalPais(${index})">
        <img src="${pais.flags.png}"> </img>
        <div class="descripcion">
        <p>${pais.name.common}</p>
        </div>
        </div>
        `;
    container.innerHTML += templatePais;
  });
};

getPaises().then((data) => template(data));

const modal = document.getElementById("modal-pais");
const btnCerrar = document.getElementById("cerrar-modal");

btnCerrar.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
