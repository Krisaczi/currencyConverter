const URL = "http://api.nbp.pl/api/exchangerates/rates/A/";
let currencies = ["USD", "CHF", "EUR"];
const selectOptions = document.querySelector(".currencies");
const btn = document.querySelector(".btn");
const conversion = document.querySelector(".conversion");
const input = document.querySelector(".inputValue");

//Currencies dropdown creation
const currDrop = () => {
  currencies.forEach((element) => {
    const option = document.createElement("option");
    option.value = element;
    option.textContent = element;
    selectOptions.appendChild(option);
  });
};
currDrop();

//Conversion
btn.addEventListener("click", () => {
  try {
    fetch(URL + selectOptions.value)
      .then((response) => response.json())
      .then((data) => {
        if (!isNaN(input.value) && input.value > 0) {
          conversion.innerHTML = `For ${selectOptions.value} ${input.value}  you will get PLN ${(data.rates[0].mid * input.value).toFixed(2)}`;
        } else {
          alert("Please provide a valid amount");
        }
      });
  } catch (error) {
    alert("Calculation failed" + error);
  }
});
