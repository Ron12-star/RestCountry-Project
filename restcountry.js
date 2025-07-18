const countriesContainer = document.querySelector(".countries-container");
const FilterByRegion = document.querySelector(".filter-by-region");
const search = document.querySelector(".search");
const body = document.body;
const darkModeToggle = document.querySelector(".darkModeToggle");

let allCountriesData = []; // Will store all data once fetched

// 1. Fetch and show all countries on page load
fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital")
  .then((res) => res.json())
  .then((data) => {
    allCountriesData = data;
    RenderCountries(data); // Show all countries first

    // 2. Search by name (after countries are loaded)
    search.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      const filtered = allCountriesData.filter((country) => {
    const nameMatch = country.name.common.toLowerCase().includes(value);
    const capitalMatch = country.capital?.[0]?.toLowerCase().includes(value);
    return nameMatch || capitalMatch;
  });

      RenderCountries(filtered);
    });

    // 3. Filter by region (after countries are loaded)
    FilterByRegion.addEventListener("change", (e) => {
      const region = e.target.value;
      if (region === "all") {
        RenderCountries(allCountriesData); // Reset to all
      } else {
        const filtered = allCountriesData.filter(
          (country) => country.region.toLowerCase() === region.toLowerCase()
        );
        RenderCountries(filtered);
      }
    });
  })
  .catch((err) => console.error("Error fetching countries:", err));

// Render country cards
function RenderCountries(data) {
  countriesContainer.innerHTML = ""; // Clear container first
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country_card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="flag">
      <div class="cardtext">
        <h3 class="cardtitle">${country.name.common}</h3>
        <p><b>Population:</b> ${country.population.toLocaleString()}</p>
        <p><b>Region:</b> ${country.region || 'N/A'}</p>
        <p><b>Capital:</b> ${country.capital?.[0] || 'N/A'}</p>
      </div>`;
    countriesContainer.append(countryCard);
  });
}

// Theme toggle and persistence
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️ Light Mode";
  }
});

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
