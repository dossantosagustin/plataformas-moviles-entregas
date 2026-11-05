// Activa el modo estricto para ayudar a detectar errores comunes de JavaScript.
"use strict";

// Guarda la direccion del endpoint que devuelve un dato curioso aleatorio.
const API_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random";

// Muestra el texto del dato y configura el enlace a su fuente.
function showFact(fact, textElement, sourceElement) {
	// Coloca el texto del dato dentro del elemento HTML recibido.
	textElement.textContent = fact.text;

	// Comprueba si la respuesta de la API incluye una direccion para la fuente.
	if (fact.source_url) {
		// Asigna esa direccion al enlace de la pagina.
		sourceElement.href = fact.source_url;
		// Hace visible el enlace para que pueda abrirse.
		sourceElement.hidden = false;
	} else {
		// Oculta el enlace cuando la API no proporciona una fuente.
		sourceElement.hidden = true;
	} // Fin de la comprobacion de la fuente.
} // Fin de showFact.

// Solicita un dato aleatorio y comprueba que la respuesta sea valida.
async function getRandomFact() {
	// Hace una peticion HTTP al endpoint y espera la respuesta.
	const response = await fetch(API_URL);

	// Comprueba si el servidor respondio con un error HTTP.
	if (!response.ok) {
		// Interrumpe la funcion y comunica que no se pudo obtener el dato.
		throw new Error("No se pudo obtener el dato.");
	} // Fin de la comprobacion del estado HTTP.

	// Lee el cuerpo de la respuesta y lo convierte de JSON a un objeto JavaScript.
	const fact = await response.json();

	// Verifica que exista el objeto y que su propiedad text sea una cadena.
	if (!fact || typeof fact.text !== "string") {
		// Interrumpe la funcion si la API no devolvio un dato utilizable.
		throw new Error("La respuesta de la API no contiene un dato válido.");
	} // Fin de la validacion del contenido.

	// Devuelve el objeto del dato a la funcion que hizo la solicitud.
	return fact;
} // Fin de getRandomFact.

// Carga un dato aleatorio al abrir la pagina.
async function loadDailyFact() {
	// Busca en el HTML el parrafo donde se mostrara el dato del dia.
	const factElement = document.getElementById("daily-fact");
	// Busca en el HTML el enlace donde se mostrara la fuente del dato.
	const sourceElement = document.getElementById("daily-source");

	// Intenta solicitar el dato y mostrarlo en la pagina.
	try {
		// Espera el resultado de la solicitud a la API.
		const fact = await getRandomFact();
		// Coloca el texto y la fuente en sus elementos HTML.
		showFact(fact, factElement, sourceElement);
	} catch (error) {
		// Muestra un mensaje en el parrafo si la solicitud o la validacion fallan.
		factElement.textContent = "No se pudo cargar el dato. Comprueba tu conexión e inténtalo más tarde.";
	} // Fin del manejo de errores de la carga inicial.
} // Fin de loadDailyFact.

// Solicita y muestra otro dato cuando se pulsa el boton.
async function loadRandomFact() {
	// Busca el boton que solicita otro dato.
	const button = document.getElementById("random-button");
	// Busca el parrafo donde aparecera el dato aleatorio.
	const factElement = document.getElementById("random-fact");
	// Busca el enlace que mostrara la fuente del dato aleatorio.
	const sourceElement = document.getElementById("random-source");

	// Desactiva el boton para evitar varias solicitudes simultaneas.
	button.disabled = true;
	// Cambia el texto del boton para indicar que la solicitud esta en curso.
	button.textContent = "Buscando...";
	// Muestra el parrafo que contendra el resultado.
	factElement.hidden = false;
	// Informa mientras se espera la respuesta de la API.
	factElement.textContent = "Cargando dato...";
	// Oculta la fuente anterior mientras se solicita el nuevo dato.
	sourceElement.hidden = true;

	// Intenta obtener un nuevo dato y mostrarlo.
	try {
		// Espera a que termine la solicitud a la API.
		const fact = await getRandomFact();
		// Muestra el texto y la fuente del nuevo dato.
		showFact(fact, factElement, sourceElement);
	} catch (error) {
		// Informa en el parrafo si no se pudo completar la solicitud.
		factElement.textContent = "No se pudo cargar el dato. Inténtalo de nuevo.";
	} finally {
		// Reactiva el boton tanto si la solicitud tuvo exito como si fallo.
		button.disabled = false;
		// Restaura el texto habitual del boton.
		button.textContent = "Buscar otro dato";
	} // Fin del manejo de errores y limpieza del boton.
} // Fin de loadRandomFact.

// Espera hasta que el navegador haya terminado de leer el HTML.
document.addEventListener("DOMContentLoaded", function () {
	// Conecta el evento de clic del boton con la funcion que carga otro dato.
	document.getElementById("random-button").addEventListener("click", loadRandomFact);
	// Carga el dato inicial apenas el contenido de la pagina esta preparado.
	loadDailyFact();
}); // Fin de la inicializacion de la pagina.
