const countryName = new URLSearchParams(location.search).get('name');

const flagImage = document.querySelector('.country-details img');
const Name = document.querySelector('.details h1');
const nativeName = document.querySelector('.nativename');
const Population = document.querySelector('.population');
const Region = document.querySelector('.region');
const SubRegion = document.querySelector('.sub_region');
const Capital = document.querySelector('.capital');
const currencies = document.querySelector('.currency');
const languages = document.querySelector('.languages');
const domain = document.querySelector('.domain');
const borderCountry = document.querySelector('.border_country');
const body = document.body;
const darkModeToggle = document.querySelector(".darkModeToggle");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);
    return res.json();
  })
  .then(([country]) => {
    // Flag and Name
    flagImage.src = country.flags.svg;
    Name.innerText = country.name.common;

    // Native Name
    nativeName.innerText = country.name.nativeName
      ? Object.values(country.name.nativeName)[0].common
      : country.name.common;

    // Population
    Population.innerText = country.population.toLocaleString();

    // Region & Subregion
    Region.innerText = country.region;
    SubRegion.innerText = country.subregion || "N/A";

    // Capital
    Capital.innerText = Array.isArray(country.capital)
      ? country.capital.join(", ")
      : "N/A";

    // Currencies
    currencies.innerText = country.currencies
      ? Object.values(country.currencies)
          .map((currency) => currency.name)
          .join(", ")
      : "N/A";

    // Languages
    languages.innerText = country.languages
      ? Object.values(country.languages).join(", ")
      : "N/A";

    // Top-level domain
    domain.innerText = country.tld ? country.tld.join(", ") : "N/A";

    // Borders
    if (country.borders && country.borders.length) {
      country.borders.forEach((borderCode) => {
        fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
          .then((res) => res.json())
          .then(([borderData]) => {
            const borderTag = document.createElement("a");
            borderTag.innerText = borderData.name.common;
            borderTag.href = `/country.html?name=${borderData.name.common}`;
            borderCountry.appendChild(borderTag);
          })
          .catch((err) => {
            console.error("Error loading border country:", err);
          });
      });
    } else {
      const noBordersTag = document.createElement("span");
      noBordersTag.innerText = "No bordering countries";
      borderCountry.appendChild(noBordersTag);
    }
  })
  .catch((err) => {
    console.error("Error fetching country details:", err);
  });

// Load theme preference
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️ Light Mode";
  }
});

// Toggle dark mode
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
