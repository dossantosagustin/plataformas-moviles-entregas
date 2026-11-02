var consolas = [
    {
        nombre: "PlayStation 2",
        fabricante: "Sony",
        anio: 2000,
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/PS2-Versions.jpg"
    },
    {
        nombre: "Game Boy",
        fabricante: "Nintendo",
        anio: 1989,
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Nintendo-Game-Boy-FL.jpg"
    },
    {
        nombre: "Mega Drive",
        fabricante: "SEGA",
        anio: 1988,
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Sega-Genesis-Mk2-Console-Set.jpg"
    },
    {
        nombre: "Nintendo 64",
        fabricante: "Nintendo",
        anio: 1996,
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Nintendo-64-Console-Set.jpg"
    },
    {
        nombre: "Xbox 360",
        fabricante: "Microsoft",
        anio: 2005,
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Xbox-360-Pro-wController.jpg"
    },
    {
        nombre: "Nintendo DS",
        fabricante: "Nintendo",
        anio: 2004,
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Nintendo-DS-Fat-Blue.jpg"
    }
];

var contenedor = document.getElementById("consolas");
var datos = document.getElementById("Datos");

// Elegimos tres consolas diferentes
var elegidas = [];

while (elegidas.length < 3) {
    var consola = consolas[Math.floor(Math.random() * consolas.length)];

    if (!elegidas.includes(consola)) {
        elegidas.push(consola);
    }
}

// Mostramos las tres consolas
for (var i = 0; i < elegidas.length; i++) {
    var consola = elegidas[i];

    var columna = document.createElement("div");
    columna.className = "col-12 col-md-4";

    var imagen = document.createElement("img");
    imagen.src = consola.imagen;
    imagen.alt = consola.nombre;
    imagen.className = "img-fluid rounded";

    columna.appendChild(imagen);
    contenedor.appendChild(columna);

    var item = document.createElement("li");
    item.className = "list-inline-item";

    var texto = document.createElement("span");
    texto.className = "badge bg-primary";
    texto.textContent = consola.nombre + " - " +
        consola.fabricante + " - " + consola.anio;

    item.appendChild(texto);
    datos.appendChild(item);
}
