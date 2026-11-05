// ═══════════════════════════════════════
//   LÓGICA – Organizador de Fichas SENA
// ═══════════════════════════════════════

// Lista donde se guardan todas las fichas
let fichas = [];

// Colores de categorías disponibles (para la clase CSS)
const categorias = [
  "General", "Matemáticas", "Lenguaje",
  "Ciencias", "Tecnología", "Humanidades", "Arte"
];

// ══════════════════════════════════════════
//  Función: Agregar una ficha nueva
// ══════════════════════════════════════════
function agregarFicha() {
  const titulo    = document.getElementById("inp-titulo").value.trim();
  const categoria = document.getElementById("inp-categoria").value;
  const info      = document.getElementById("inp-info").value.trim();

  // Validar campos vacíos
  if (titulo === "" || info === "") {
    mostrarToast("⚠️ Escribe un título y la información.");
    return;
  }

  // Crear el objeto ficha
  const ficha = {
    id: Date.now(),
    titulo: titulo,
    categoria: categoria,
    info: info
  };

  // Guardar en la lista
  fichas.push(ficha);

  // Limpiar formulario
  document.getElementById("inp-titulo").value = "";
  document.getElementById("inp-info").value   = "";
  document.getElementById("inp-categoria").value = "General";

  // Mostrar en pantalla
  mostrarFichas(fichas);
  mostrarToast("✅ Ficha guardada correctamente");
}

// ══════════════════════════════════════════
//  Función: Eliminar una ficha por su ID
// ══════════════════════════════════════════
function eliminarFicha(id, evento) {
  // Evitar que abra el modal al eliminar
  evento.stopPropagation();

  const confirmacion = confirm("¿Eliminar esta ficha?");
  if (!confirmacion) return;

  // Filtrar: quedar con las que NO tienen ese id
  fichas = fichas.filter(function(f) {
    return f.id !== id;
  });

  mostrarFichas(fichas);
  mostrarToast("🗑️ Ficha eliminada");
}

// ══════════════════════════════════════════
//  Función: Ordenar de A a Z
// ══════════════════════════════════════════
function ordenarAZ() {
  fichas.sort(function(a, b) {
    return a.titulo.toLowerCase().localeCompare(b.titulo.toLowerCase());
  });
  mostrarFichas(fichas);
  mostrarToast("🔤 Ordenado de A → Z");
}

// ══════════════════════════════════════════
//  Función: Ordenar de Z a A
// ══════════════════════════════════════════
function ordenarZA() {
  fichas.sort(function(a, b) {
    return b.titulo.toLowerCase().localeCompare(a.titulo.toLowerCase());
  });
  mostrarFichas(fichas);
  mostrarToast("🔤 Ordenado de Z → A");
}

// ══════════════════════════════════════════
//  Función: Buscar fichas por título
// ══════════════════════════════════════════
function buscarFichas() {
  const texto = document.getElementById("inp-buscar").value.trim().toLowerCase();

  const resultados = fichas.filter(function(f) {
    return f.titulo.toLowerCase().includes(texto);
  });

  mostrarFichas(resultados);
}

// ══════════════════════════════════════════
//  Función: Renderizar fichas en pantalla
// ══════════════════════════════════════════
function mostrarFichas(lista) {
  const grid   = document.getElementById("grid-fichas");
  const vacio  = document.getElementById("estado-vacio");
  const total  = document.getElementById("total-fichas");

  // Limpiar grid
  grid.innerHTML = "";

  // Actualizar contador
  total.textContent = fichas.length + (fichas.length === 1 ? " ficha" : " fichas");

  // Mostrar estado vacío si no hay fichas
  if (lista.length === 0) {
    vacio.style.display = "block";
    return;
  }

  vacio.style.display = "none";

  // Crear una tarjeta por cada ficha
  lista.forEach(function(ficha) {

    // Recortar preview a 120 caracteres
    const preview = ficha.info.length > 120
      ? ficha.info.substring(0, 120) + "..."
      : ficha.info;

    // Nombre de clase CSS para la categoría
    const claseCategoria = "cat-" + ficha.categoria;

    // Crear elemento tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.className = "ficha " + claseCategoria;
    tarjeta.onclick = function() { abrirModal(ficha); };

    tarjeta.innerHTML =
      '<span class="ficha-etiqueta">' + ficha.categoria + '</span>' +
      '<h3 class="ficha-titulo">' + ficha.titulo + '</h3>' +
      '<p class="ficha-preview">' + ficha.info + '</p>' +
      '<div class="ficha-pie">' +
        '<span class="ficha-ver">Ver más →</span>' +
        '<button class="ficha-eliminar" onclick="eliminarFicha(' + ficha.id + ', event)">✕ Eliminar</button>' +
      '</div>';

    grid.appendChild(tarjeta);
  });
}

// ══════════════════════════════════════════
//  Función: Abrir modal con detalle
// ══════════════════════════════════════════
function abrirModal(ficha) {
  document.getElementById("modal-cat").textContent   = ficha.categoria;
  document.getElementById("modal-titulo").textContent = ficha.titulo;
  document.getElementById("modal-info").textContent   = ficha.info;

  document.getElementById("overlay").classList.add("visible");
  document.getElementById("modal").classList.add("visible");
}

// ══════════════════════════════════════════
//  Función: Cerrar modal
// ══════════════════════════════════════════
function cerrarModal() {
  document.getElementById("overlay").classList.remove("visible");
  document.getElementById("modal").classList.remove("visible");
}

// Cerrar modal con tecla Escape
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") cerrarModal();
});

// Enviar formulario con Enter en el título
document.getElementById("inp-titulo").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    document.getElementById("inp-info").focus();
  }
});

// ══════════════════════════════════════════
//  Función: Mostrar notificación toast
// ══════════════════════════════════════════
function mostrarToast(mensaje) {
  // Crear elemento toast si no existe
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = mensaje;
  toast.classList.add("show");

  // Ocultar después de 2.5 segundos
  setTimeout(function() {
    toast.classList.remove("show");
  }, 2500);
}

// ══════════════════════════════════════════
//  Inicio: mostrar pantalla vacía
// ══════════════════════════════════════════
mostrarFichas(fichas);

