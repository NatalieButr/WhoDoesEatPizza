let body = document.querySelector("body");
let load = document.querySelector(".load");
let btntext = document.querySelector(".btntext");
let waiting = document.querySelector(".waiting");
let squareForPizza = document.querySelector(".entry");

load.onclick = function() {
  let url = "https://gp-js-test.herokuapp.com/pizza";
  btntext.innerHTML = "LOADING";
  load.classList = "loading";
  waiting.style.display = "inline-block";
  fetch(url)
    .then(function(items) {
      return items.json();
    })
    .then(function(results) {
      load.classList = "load";
      btntext.innerHTML = "LOAD";
      waiting.style.display = "none";
      let party = results.party;
      renderPizza(party);
    });
};

function renderPizza(party) {
  squareForPizza.innerHTML = "";
  let pizzaLovers = party.filter(guest => guest.eatsPizza === true);
  let pizza = document.createElement("div");
  pizza.className = "pizza-body";
  squareForPizza.appendChild(pizza);
  renderSLices(pizzaLovers, pizza);
  renderText(party, pizzaLovers);
}

function renderSLices(pizzaLovers, pizza) {
  let count = pizzaLovers.length;
  let degree = 360 / count;
  for (let k = 0; k < pizzaLovers.length; k++) {
    let line = document.createElement("span");
    line.className = "slice";
    line.style.transform = `rotate(${degree * k}deg)`;

    let name = document.createElement("span");
    name.classList = "name";
    name.innerHTML = `${pizzaLovers[k].name}`;

    line.appendChild(name);
    pizza.appendChild(line);
  }
}

function renderText(party, pizzaLovers) {
  let text = document.createElement("p");
  text.className = "text";
  text.innerHTML = `${party.length} guests will be at a party and ${
    pizzaLovers.length
  } will eat pizza.`;
  squareForPizza.appendChild(text);
}
