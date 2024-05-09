const URL = "http://api.nbp.pl/api/exchangerates/rates/A/";
let currencies = ["USD", "CHF", "EUR"];
const selectOptions = document.querySelector(".currencies");
const btn = document.querySelector(".btn");
const conversion = document.querySelector(".conversion");
const input = document.querySelector(".inputValue");

const currDrop = () => {
  currencies.forEach((element) => {
    const option = document.createElement("option");
    option.value = element;
    option.textContent = element;
    selectOptions.appendChild(option);
  });
};
currDrop();

btn.addEventListener("click", () => {
  fetch(URL + selectOptions.value)
    .then((response) => response.json())
    .then((data) => {
      console.log(selectOptions.value);
      console.log(data.rates[0].mid);
      console.log(data);
      conversion.innerHTML = `For ${selectOptions.value} ${input.value}  you will get PLN ${(data.rates[0].mid * input.value).toFixed(2)}`;
    });
});
