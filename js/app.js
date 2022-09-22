let searchBtn = document.getElementById("search-btn");
let countryInput = document.getElementById("country-input");
let showResult = document.getElementById("result");

searchBtn.addEventListener("click", () => {
  let countryName = countryInput.value;
  countryInput.value = ``;
  const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showResult.innerHTML = `
        <img src="${
          data[0].flags ? data[0].flags.svg : "N/A"
        }" class="flag-img" />
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
            <h4>Capital:</h4>
            <span>${data[0].capital[0] ? data[0].capital[0] : "N/A"}</span>
            </div>
        </div>

        <div class="wrapper">
            <div class="data-wrapper">
            <h4>Continent:</h4>
            <span>${data[0].continents ? data[0].continents : "N/A"}</span>
            </div>
        </div>

        <div class="wrapper">
            <div class="data-wrapper">
            <h4>Population:</h4>
            <span>${data[0].population}</span>
            </div>
        </div>

        <div class="wrapper">
            <div class="data-wrapper">
            <h4>Crrency:</h4>
            <span>${
              data[0].currencies
                ? data[0].currencies[Object.keys(data[0].currencies)[0]].name
                : "N/A"
            } - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>

        <div class="wrapper">
            <div class="data-wrapper">
            <h4>Common Languages:</h4>
            <span>${(data[0].languages
              ? Object.values(data[0].languages)
              : "N/A"
            )
              .toString()
              .split(",")
              .join(", ")}</span>
            </div>
        </div>
        `;
    })
    .catch(() => {
      if (countryName.length === 0) {
        showResult.innerHTML = `<h3>The input field cannot be empty.</h3>`;
      } else {
        showResult.innerHTML = `<h3>Please enter a valid country name.</h3>`;
      }
    });
});
