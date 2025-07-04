const countryName=new URLSearchParams(location.search).get('name');
const flagImages=document.querySelector('.country-details img')
const Name=document.querySelector('.details h1')
const nativeName=document.querySelector('.nativename')
const Population=document.querySelector('.population')
const Region=document.querySelector('.region')
const SubRegion=document.querySelector('.sub_region')
const Capital=document.querySelector('.capital')
const currencies=document.querySelector('.currency')
const languages=document.querySelector('.languages')
const domain=document.querySelector('.domain')
const bordercountry=document.querySelector('.border_country')
const body = document.body;
const darkModeToggle = document.querySelector(".darkModeToggle");



fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res)=>res.json())
.then(([country])=>{
    console.log()
    flagImages.src=country.flags.svg
    Name.innerText=country.name.common
    
    if(country.name.nativeName){
    nativeName.innerText= Object.values(country.name.nativeName)[0].common
    }
    else{
    nativeName.innerText=country.name.common
    }
    Population.innerText=country.population
    Region.innerText=country.region
    SubRegion.innerText=country.subregion
    Capital.innerText=country.capital
    currencies.innerText=Object.values(country.currencies).map((currency)=>currency.name)
    languages.innerText=Object.values(country.languages)
    domain.innerText=Object.values(country.tld)
    if(country.borders){
        country.borders.forEach((border) => {
            console.log(border);
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=>res.json())
            .then(([BorderCountry])=>{
                console.log(BorderCountry);
                const bordercounterytag=document.createElement('a')
                bordercounterytag.innerText=BorderCountry.name.common
                bordercounterytag.href=`/country.html?name=${BorderCountry.name.common}`
                console.log(bordercounterytag)
                bordercountry.append(bordercounterytag)
            })
        })
    }
    else{
        const bordercounterytag=document.createElement('a')
                bordercounterytag.innerText="data not available";
    }
})


window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️ Light Mode"; // Change button text when dark mode is applied
    }
});

// Toggle dark mode on button click
darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save preference in localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        darkModeToggle.textContent = "☀️ Light Mode"; // Update button text
    } else {
        localStorage.setItem("theme", "light");
        darkModeToggle.textContent = "🌙 Dark Mode"; // Update button text
    }
});