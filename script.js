document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".ramo").forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;
      ramo.classList.toggle("aprobado");
      ramo.dataset.desbloquea?.split(",").forEach(id => {
        const el = document.getElementById(id.trim());
        if (el) el.classList.remove("bloqueado");
      });
    });
  });
});
