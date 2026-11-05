"use strict";

const API_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random";

function showFact(fact, textElement, sourceElement) {
	textElement.textContent = fact.text;

	if (fact.source_url) {
		sourceElement.href = fact.source_url;
		sourceElement.hidden = false;
	} else {
		sourceElement.hidden = true;
	}
}

async function getRandomFact() {
	const response = await fetch(API_URL);

	if (!response.ok) {
		throw new Error("No se pudo obtener el dato.");
	}

	const fact = await response.json();

	if (!fact || typeof fact.text !== "string") {
		throw new Error("La respuesta de la API no contiene un dato válido.");
	}

	return fact;
}

async function loadDailyFact() {
	const factElement = document.getElementById("daily-fact");
	const sourceElement = document.getElementById("daily-source");

	try {
		const fact = await getRandomFact();
		showFact(fact, factElement, sourceElement);
	} catch (error) {
		factElement.textContent = "No se pudo cargar el dato. Comprueba tu conexión e inténtalo más tarde.";
	}
}

async function loadRandomFact() {
	const button = document.getElementById("random-button");
	const factElement = document.getElementById("random-fact");
	const sourceElement = document.getElementById("random-source");

	button.disabled = true;
	button.textContent = "Buscando...";
	factElement.hidden = false;
	factElement.textContent = "Cargando dato...";
	sourceElement.hidden = true;

	try {
		const fact = await getRandomFact();
		showFact(fact, factElement, sourceElement);
	} catch (error) {
		factElement.textContent = "No se pudo cargar el dato. Inténtalo de nuevo.";
	} finally {
		button.disabled = false;
		button.textContent = "Buscar otro dato";
	}
}

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("random-button").addEventListener("click", loadRandomFact);
	loadDailyFact();
});
