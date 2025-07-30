function aprobar(id) {
  const ramo = document.getElementById(id);
  if (!ramo || ramo.classList.contains("bloqueado")) return;
  ramo.classList.toggle("aprobado");
  const desbloquea = ramo.dataset.desbloquea;
  if (desbloquea) {
    desbloquea.split(',').forEach(tid => {
      const t = document.getElementById(tid.trim());
      if (t && t.classList.contains("bloqueado")) t.classList.remove("bloqueado");
    });
  }
}
