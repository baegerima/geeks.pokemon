const container = document.getElementById("pokemon-container");

// Функция для загрузки покемонов
async function loadPokemons() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
    const data = await response.json();
    const pokemonList = data.results;

    // Получение детальной информации о каждом покемоне
    const pokemonPromises = pokemonList.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    });

    const pokemons = await Promise.all(pokemonPromises);
    displayPokemons(pokemons);
  } catch (error) {
    console.error("Ошибка при загрузке покемонов:", error);
  }
}

// Функция для отображения покемонов на странице
function displayPokemons(pokemons) {
  pokemons.forEach((pokemon) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <h3>${pokemon.name}</h3>
    `;

    container.appendChild(card);
  });
}

// Загрузка покемонов при загрузке страницы
loadPokemons();