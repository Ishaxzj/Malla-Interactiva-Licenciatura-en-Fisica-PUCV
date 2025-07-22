// Esta parte detecta qué página estamos viendo:
let ruta = window.location.pathname.toLowerCase();

let ramos = [];
if (ruta.includes("fisica.html")) {
  ramos = ramosData.normal;
} else if (ruta.includes("astronomia.html")) {
  ramos = ramosData.astronomia;
}

// ----- CREAR CONTENEDOR + BOTÓN REINICIAR -----
const container = document.createElement("div");
container.className = "container";
document.body.appendChild(container);

const btnReset = document.createElement("button");
btnReset.textContent = "Reiniciar malla";
btnReset.style.margin = "20px auto";
btnReset.style.display = "block";
btnReset.style.padding = "10px 20px";
btnReset.style.borderRadius = "10px";
btnReset.style.background = "#ff94a2";
btnReset.style.color = "white";
btnReset.style.border = "none";
btnReset.style.cursor = "pointer";
btnReset.onclick = () => {
  localStorage.removeItem(tipoMalla);
  location.reload();
};
document.body.insertBefore(btnReset, container);

// ----- AGRUPAR POR SEMESTRE -----
const porSemestre = {};
ramos.forEach(r => {
  if (!porSemestre[r.semestre]) porSemestre[r.semestre] = [];
  porSemestre[r.semestre].push(r);
});

// ----- CREAR SEMESTRES -----
for (let semestre in porSemestre) {
  const columna = document.createElement("div");
  columna.className = "semestre";

  const titulo = document.createElement("h3");
  titulo.textContent = semestre + "º Semestre";
  columna.appendChild(titulo);

  porSemestre[semestre].forEach(ramo => {
    const div = document.createElement("div");
    div.className = "ramo";
    div.textContent = ramo.nombre;
    div.id = ramo.id;

    if (ramo.tipo === "optativo") div.classList.add("optativo");
    if (ramo.tipo === "mencion") div.classList.add("mencion");

    if (aprobados.has(ramo.id)) {
      div.classList.add("aprobado");
    } else if (ramo.requisitos.length === 0 || ramo.requisitos.every(req => aprobados.has(req))) {
      div.classList.add("desbloqueado");
    }

    div.addEventListener("click", () => aprobarRamo(ramo.id));
    columna.appendChild(div);
  });

  container.appendChild(columna);
}

// ----- FUNCIONES -----
function aprobarRamo(id) {
  const el = document.getElementById(id);
  if (!el.classList.contains("desbloqueado")) return;

  el.classList.add("aprobado");
  el.classList.remove("desbloqueado");
  aprobados.add(id);

  localStorage.setItem(tipoMalla, JSON.stringify([...aprobados]));

  desbloquearDependientes();
}

function desbloquearDependientes() {
  ramos.forEach(ramo => {
    const div = document.getElementById(ramo.id);
    if (!div || div.classList.contains("aprobado")) return;

    const cumple = ramo.requisitos.every(req => aprobados.has(req));
    if (cumple) {
      div.classList.add("desbloqueado");
    }
  });
}
