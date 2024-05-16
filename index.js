const URL = "https://api.nbp.pl/api/exchangerates/rates/A/";
let currencies = ["USD", "CHF", "EUR"];
const selectOptions = document.querySelector(".currencies");
const btn = document.querySelector(".btn");
const conversion = document.querySelector(".conversion");
const input = document.querySelector(".inputValue");
const loader = document.querySelector("#loader");
const form = document.querySelector("#conversionForm");

const showLoader = () => {
  loader.style.display = "block";
};

// Function to hide the loader
const hideLoader = () => {
  loader.style.display = "none";
};

hideLoader();
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
const calculateConversion = (e) => {
  e.preventDefault();
  const existingLabel = document.querySelector(".warning");
  if (existingLabel) {
    form.removeChild(existingLabel);
  }
  if (!isNaN(input.value) && input.value > 0) {
    try {
      showLoader();
      fetch(URL + selectOptions.value)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const rate = data?.rates?.[0]?.mid;
          if (!isNaN(input.value) && input.value > 0) {
            setTimeout(() => {
              hideLoader();
              conversion.innerHTML = `For ${selectOptions.value} ${input.value}  you will get PLN ${(rate * input.value).toFixed(2)}`;
            }, 500);
          } else {
            alert("Please provide a valid amount");
          }
        });
    } catch (error) {
      alert("Calculation failed" + error);
    }
  } else {
    //alert("Please provide a valid amount11");
    const label = document.createElement("label");
    label.classList.add("warning");
    label.style.color = "red";
    label.textContent = "Please provide a valid amount";
    form.appendChild(label);
  }
};

form.addEventListener("submit", calculateConversion);
