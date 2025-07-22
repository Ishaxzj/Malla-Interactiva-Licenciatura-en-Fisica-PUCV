function aprobar(id) {
  const ramo = document.getElementById(id);
  if (ramo.classList.contains("bloqueado")) return;

  ramo.classList.toggle("aprobado");

  const desbloquea = ramo.dataset.desbloquea;
  if (desbloquea) {
    desbloquea.split(',').forEach(targetId => {
      const target = document.getElementById(targetId.trim());
      if (target && target.classList.contains("bloqueado")) {
        target.classList.remove("bloqueado");
      }
    });
  }
}
