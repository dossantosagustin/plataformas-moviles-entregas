const listaPokemon = document.getElementById("lista-pokemon");
const cargando = document.getElementById("cargando");
const botonCargar = document.getElementById("cargar-mas");

let cantidad = 151;

//cargar los pokemon
async function cargarPokemon() {
    cargando.style.display = "block";
    botonCargar.disabled = true;

    try {
        const respuesta = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=" + cantidad
        );

        const datos = await respuesta.json();
        listaPokemon.innerHTML = "";

        for (const pokemon of datos.results) {
            const respuestaPokemon = await fetch(pokemon.url);
            const detalle = await respuestaPokemon.json();

            let tipos = "";

            for (const tipo of detalle.types) {
                tipos += `<span class="pokemon-tipo">${tipo.type.name}</span>`;
            }

            listaPokemon.innerHTML += `
                <div class="col-6 col-md-4 col-lg-3">
                    <div class="card pokemon-card shadow-sm p-3">
                        <h5>${detalle.name}</h5>
                        <img src="${detalle.sprites.front_default}"
                             class="pokemon-img mx-auto"
                             alt="${detalle.name}">
                        <div class="mb-3">${tipos}</div>
                        <button class="btn btn-primary"
                            onclick="verMas('${pokemon.url}')">
                            Ver más
                        </button>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.log("Error al cargar los Pokémon");
    }

    cargando.style.display = "none";
    botonCargar.disabled = false;
}

//habilidades y movimientos
async function verMas(url) {
    const respuesta = await fetch(url);
    const pokemon = await respuesta.json();

    let habilidades = "";
    let movimientos = "";

    for (const item of pokemon.abilities) {
        habilidades += item.ability.name + ", ";
    }

    for (const item of pokemon.moves.slice(0, 4)) {
        movimientos += item.move.name + ", ";
    }

    alert(
        "Pokémon: " + pokemon.name +
        "\nHabilidades: " + habilidades +
        "\nMovimientos: " + movimientos
    );
}

//cargar más pokmon
botonCargar.addEventListener("click", function() {
    cantidad += 20;
    cargarPokemon();
});


cargarPokemon();
