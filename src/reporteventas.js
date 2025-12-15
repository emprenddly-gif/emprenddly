// modal.js
export function abrirModal(producto, precio, cantidad, fecha, imagenId) {
  const modal = document.getElementById("miModal");
  modal.style.display = "flex";

  document.getElementById("modalTitulo").innerText = producto;
  document.getElementById("modalPrecio").innerText = precio;
  document.getElementById("modalCantidad").innerText = cantidad;
  document.getElementById("modalFecha").innerText = fecha;

  document.querySelectorAll(".img-modal").forEach((img) => (img.style.display = "none"));
  document.getElementById(imagenId).style.display = "block";
}

export function cerrarModal() {
  document.getElementById("miModal").style.display = "none";
}

window.addEventListener("click", (event) => {
  const modal = document.getElementById("miModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
