const URL =
  "https://v6.exchangerate-api.com/v6/b9dc771dc2605ccaecb4c9a9/latest/usd";
const btn = document.querySelector("#Btn");
const dropdowns = document.querySelectorAll("form select");
const fromE1 = document.querySelector(".from select");
const toE1 = document.querySelector(".to select");
const msg = document.querySelector(".msg");

dropdowns.forEach((dropdown) => {
  for (let currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;
    if (currcode === "INR" && dropdown.name === "to") {
      newoption.selected = "selected";
    } else if (currcode === "USD" && dropdown.name === "from") {
      newoption.selected = "selected";
    }
    dropdown.append(newoption);

    dropdown.addEventListener("change", (evt) => {
      updateflag(evt.target);
    });
  }
});

function updateflag(element) {
  let currcode = element.value;
  let countrycode = countryList[currcode];

  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countrycode}/flat/64.png`;
}

const updateExchangerate = async () => {
  let amount = document.querySelector("input");
  let Amtval = amount.value;

  if (Amtval < 1 || Amtval == "") {
    amount.value = 1;
    Amtval = 1;
  }

  let res = await fetch(URL);
  let response = await res.json();
  let tocurr = toE1.value;
  let fromcurr = fromE1.value;
  let rate1 = response.conversion_rates[tocurr];
  let rate2 = response.conversion_rates[fromcurr];

  let result = (rate1 * Amtval) / rate2;
  // console.log(result);

  msg.innerText = `${Amtval} ${fromE1.value} = ${result.toFixed(2)} ${
    toE1.value
  }`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangerate();
});
window.addEventListener("load", () => {
  updateExchangerate();
});
