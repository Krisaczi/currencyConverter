const URL = "https://api.nbp.pl/api/exchangerates/rates/A/";
const currencies = ["USD", "CHF", "EUR"];
const selectOptions = document.querySelector("#currencyList");
const btn = document.querySelector("#calculate");
const conversion = document.querySelector("#result");
const input = document.querySelector("#inpVal");
const loader = document.querySelector("#loader");
const form = document.querySelector("#cnvForm");

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
const calculateConversion = async (e) => {
  e.preventDefault();
  const existingLabel = document.querySelector(".warning");
  if (existingLabel) {
    form.removeChild(existingLabel);
  }
  if (!isNaN(input.value) && input.value > 0) {
    try {
      showLoader();
      const response = await fetch(URL + selectOptions.value);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const rate = data?.rates?.[0]?.mid;
      conversion.innerHTML = `For ${selectOptions.value} ${input.value} you will get PLN ${(rate * input.value).toFixed(2)}`;
    } catch (error) {
      alert("Calculation failed: " + error);
    } finally {
      hideLoader();
    }
  } else {
    const label = document.createElement("label");
    label.classList.add("warning");
    label.style.color = "red";
    label.textContent = "Please provide a valid amount";
    form.appendChild(label);
  }
};

form.addEventListener("submit", calculateConversion);
