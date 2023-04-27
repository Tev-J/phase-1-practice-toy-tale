let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const createToyForm = document.querySelector(".add-toy-form");
  createToyForm.addEventListener("submit", handleSubmit); // Submits new toys

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //API Endpoint
  const toyList = fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((data) => parseAndysToys(data));
});

function parseAndysToys(data) {
  //receives array and creates Div for each element
  const collectionDiv = document.getElementById("toy-collection");

  for (let item of data) {
    const newCard = createToyCard(item);
    newCard.classList.add("card");
    collectionDiv.appendChild(newCard);
  }
}

function createToyCard(data) {
  //creates DOM elements from data objects and returns a DIV
  const newDiv = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.textContent = data.name;
  newDiv.appendChild(h2);

  const img = document.createElement("img");
  img.src = data.image;
  img.classList.add("toy-avatar");
  newDiv.appendChild(img);

  const p = document.createElement("p");
  p.textContent = `${data.likes} likes`;
  newDiv.appendChild(p);

  const btn = document.createElement("button");
  btn.classList.add("like-btn");
  btn.setAttribute("id", data.id);
  btn.textContent = "Like ♥️";
  newDiv.appendChild(btn);

  return newDiv;
}

function handleSubmit(e) {
  //handles the submit event ->
  //takes etargets from input and calls for POST
  e.preventDefault();

  let newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  };

  postNewToy(newToy);
}

function postNewToy(data) {
  //handles POST request and passes data to build a new DOM DIV

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((toy) => createToyCard(toy));
}
