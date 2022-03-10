const pokedex = document.querySelector(".pokedex");
const header = document.querySelector(".header");
const getToTopBtn = document.querySelector("#backToTop");
const searchName = document.querySelector("#search-name");

const fetchData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=50")
    .then((res) => res.json())
    .then((data) => {
      const fetches = data.results.map((p) => {
        return fetch(p.url).then((res) => res.json());
      });
      Promise.all(fetches).then((res) => {
        // console.log(res);
        pokeCards(res);
      });
    });
};

const fetchType = (data) => {
  return data.types.map((i) => i.type.name);
};

const appendType = (card) => {
  if (fetchType(card).length === 1) {
    return fetchType(card)[0];
  } else {
    return fetchType(card)
      .map((item) => item)
      .join(" - ");
  }
};

const pokeCards = (data) => {
  const cards = data
    .map((card) => {
      return `
    <div class="card">
    <img src="${card.sprites.other.dream_world.front_default}" alt=${
        card.name
      }/>
    <div class="card-name">
    <h2>${card.name}</h2>
    <p>${appendType(card)}</p>
    </div>
    </div>`;
    })
    .join("");
  pokedex.innerHTML = cards;
};

const searchPokemon = (e) => {
  const cardNames = document.querySelectorAll(".card-name");
  const card = document.querySelectorAll(".card");
  const userInput = e.target.value.toLowerCase();

  [...cardNames].forEach((cardName, i) => {
    if (cardName.textContent.toLowerCase().indexOf(userInput) != -1) {
      card[i].style.display = "flex";
    } else {
      card[i].style.display = "none";
    }
  });
};

window.onscroll = function () {
  scrollFunction();
};

scrollFunction = () => {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    getToTopBtn.style.display = "block";
  } else {
    getToTopBtn.style.display = "none";
  }
};

const getToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

fetchData();
searchName.addEventListener("change", searchPokemon);
getToTopBtn.addEventListener("click", getToTop);
