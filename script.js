// Esta parte detecta qué página estamos viendo:
let ruta = window.location.pathname.toLowerCase();

let ramos = [];
if (ruta.includes("fisica.html")) {
  ramos = ramosData.normal;
} else if (ruta.includes("astronomia.html")) {
  ramos = ramosData.astronomia;
}

const container = document.createElement("div");
container.className = "container";
document.body.appendChild(container);

let aprobados = new Set();

// Agrupar por semestre
const porSemestre = {};
ramos.forEach(r => {
  if (!porSemestre[r.semestre]) porSemestre[r.semestre] = [];
  porSemestre[r.semestre].push(r);
});

// Renderizar por semestre
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

    if (ramo.requisitos.length === 0) div.classList.add("desbloqueado");

    div.addEventListener("click", () => aprobarRamo(ramo.id));
    columna.appendChild(div);
  });

  container.appendChild(columna);
}

// Al apretar un ramo
function aprobarRamo(id) {
  const el = document.getElementById(id);
  if (!el.classList.contains("desbloqueado")) return;

  el.classList.add("aprobado");
  el.classList.remove("desbloqueado");
  aprobados.add(id);

  desbloquearDependientes();
}

// Desbloquea los que tengan todos los requisitos aprobados
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
