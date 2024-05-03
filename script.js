const pokemonNameElement = document.querySelector('.pokemonName');
const pokemonImgElement = document.querySelector('.pokemonImg');
const pokemonDescritionElement = document.querySelector('.pokemonDescrition');
const pokemonTypeElement = document.querySelector('.pokemonType');
const pokemonAbilitiesElement = document.querySelector('.pokemonAbilities');

async function handleSearch() {
    try {
        const inputValue = document.getElementById('in1').value.toLowerCase(); // Obtener el valor del input
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${inputValue}`; // Construir la URL de la API

        const types = await typePokemon(pokemonUrl);
        const description = await descriptionPokemon(pokemonUrl);
        const abilities = await abilitiesPokemon(pokemonUrl);
        const image = await imageUrlPokemon(pokemonUrl);
        const name = await namePokemon(pokemonUrl);

        // Actualizar elementos del DOM con los datos obtenidos
        document.querySelector('.pokemonName').textContent = name;
        document.querySelector('.pokemonType').textContent = types.join(', ');
        document.querySelector('.pokemonDescrition').textContent = description.join(' ');
        document.querySelector('.pokemonAbilities').textContent = abilities.join(', ');
        document.querySelector('.pokemonImg').src = image;

        // Mostrar el contenedor de información
        document.querySelector('.containerInfo').style.display = 'block';

        // Ocultar el contenedor de error en caso de que esté visible
        document.querySelector('.containerError').style.display = 'none';
    } catch (error) {
        // Manejar errores
        console.error("Hubo un error:", error);
        // Mostrar un mensaje de error en caso de que falle la obtención de datos
        document.querySelector('.containerError').style.display = 'block';
    }
}
async function typePokemon(endpoint) {
    try {
        // Realiza la solicitud HTTP al endpoint proporcionado
        const response = await axios.get(endpoint);

        // Accede a la lista de tipos de Pokémon en los datos
        const types = response.data.types;

        // Array para almacenar los tipos de Pokémon
        // Devuelve el array de tipos de Pokémon
        return types.map(type => type.type.name);
    } catch (error) {
        // Manejo de errores
        console.error("Hubo un error al obtener los datos:", error);
        return []; // Devuelve un array vacío en caso de error
    }
}
async function descriptionPokemon(endpoint) {
    try {
        // Realiza la solicitud HTTP al endpoint proporcionado
        const response = await axios.get(endpoint);

        // Obtiene la URL para obtener más detalles sobre la especie del Pokémon
        const speciesUrl = response.data.species.url;

        // Realiza una segunda solicitud para obtener los detalles de la especie del Pokémon
        const speciesResponse = await axios.get(speciesUrl);

        // Filtra las descripciones en español y toma solo las primeras tres
        const spanishDescriptions = speciesResponse.data.flavor_text_entries
            .filter(entry => entry.language.name === "es")
            .map(entry => entry.flavor_text)
            .slice(0, 3); // Tomar solo las primeras tres descripciones

        // Devuelve las descripciones en español
        return spanishDescriptions;
    } catch (error) {
        // Manejo de errores
        console.error("Hubo un error al obtener las descripciones:", error);
        return []; // Devuelve un array vacío en caso de error
    }
}
async function abilitiesPokemon(endpoint) {
    try {
        // Realiza la solicitud HTTP al endpoint proporcionado
        const response = await axios.get(endpoint);

        // Obtiene las habilidades del Pokémon
        const abilities = response.data.abilities;

        // Extrae los nombres de las habilidades
        const abilityNames = abilities.map(ability => ability.ability.name);

        // Devuelve los nombres de las habilidades
        return abilityNames;
    } catch (error) {
        // Manejo de errores
        console.error("Hubo un error al obtener las habilidades:", error);
        return []; // Devuelve un array vacío en caso de error
    }
}
async function imageUrlPokemon(endpoint) {
    try {
        // Realiza la solicitud HTTP al endpoint proporcionado
        const response = await axios.get(endpoint);

        // Obtiene la URL de la imagen del Pokémon
        const imageUrl = response.data.sprites.front_default;

        // Devuelve la URL de la imagen del Pokémon
        return imageUrl;
    } catch (error) {
        // Manejo de errores
        console.error("Hubo un error al obtener la imagen del Pokémon:", error);
        return null; // Devuelve null en caso de error
    }
}
async function namePokemon(apiUrl) {
    try {
        // Realiza la solicitud HTTP al endpoint proporcionado
        const response = await axios.get(apiUrl);

        // Obtiene el nombre del Pokémon
        const pokemonName = response.data.name;

        // Devuelve el nombre del Pokémon
        return pokemonName;
    } catch (error) {
        // Manejo de errores
        console.error("Hubo un error al obtener el nombre del Pokémon:", error);
        return null; // Devuelve null en caso de error
    }
}



