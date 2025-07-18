document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;

      ramo.classList.toggle("aprobado");
      const desbloquea = ramo.dataset.desbloquea?.split(",") || [];

      desbloquea.forEach(id => {
        const target = document.getElementById(id.trim());
        if (target && document.querySelectorAll(`[data-desbloquea*="${id}"]`).length === 1 || [...document.querySelectorAll(`[data-desbloquea*="${id}"]`)].every(r => r.classList.contains("aprobado"))) {
          target.classList.remove("bloqueado");
        }
      });
    });
  });
});
