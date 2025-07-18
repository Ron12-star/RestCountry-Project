const countriesContainer = document.querySelector(".countries-container");
const FilterByRegion = document.querySelector(".filter-by-region");
const search = document.querySelector(".search");
const body = document.body;
const darkModeToggle = document.querySelector(".darkModeToggle");

let allcountriesData = [];

// Fetch and render all countries
fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then((data) => {
    if (Array.isArray(data)) {
      allcountriesData = data;
      Rendercountries(data);
    } else {
      console.error("Expected an array of countries, got:", data);
    }
  })
  .catch((err) => {
    console.error("Failed to fetch countries:", err);
  });

// Filter by region
FilterByRegion.addEventListener("change", () => {
  fetch(`https://restcountries.com/v3.1/region/${FilterByRegion.value}`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        Rendercountries(data);
      } else {
        console.error("Expected an array for region data, got:", data);
      }
    })
    .catch((err) => {
      console.error("Failed to fetch region countries:", err);
    });
});

// Render countries to the DOM
function Rendercountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const nativeName = country.name.nativeName
      ? Object.values(country.name.nativeName)[0].common
      : country.name.common;

    const capital = Array.isArray(country.capital) ? country.capital[0] : "N/A";

    const countryCard = document.createElement("a");
    countryCard.classList.add("country_card");
    countryCard.href = `/country.html?name=${country.name.common}`;

    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="flag of ${country.name.common}">
      <div class="cardtext">
        <h3 class="cardtitle">${country.name.common}</h3>
        <p><b>Population:</b> ${country.population.toLocaleString()}</p>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Region:</b> ${country.region}</p>
      </div>
    `;

    countriesContainer.append(countryCard);
  });
}

// Search functionality
search.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filteredCountries = allcountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(value)
  );
  Rendercountries(filteredCountries);
});

// Handle theme from localStorage
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️ Light Mode";
  }
});

// Toggle dark/light mode
darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    darkModeToggle.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    darkModeToggle.textContent = "🌙 Dark Mode";
  }
});
