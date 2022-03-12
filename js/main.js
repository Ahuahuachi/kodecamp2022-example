const buildCard = (title, description, photoUrl, price, productId) => {
  let cardContainer = document.createElement("div");
  let cardImage = document.createElement("img");
  let cardBody = document.createElement("div");
  let cardTitle = document.createElement("h5");
  let cardText = document.createElement("p");
  let cardButton = document.createElement("a");

  // Add classes to elements
  cardContainer.classList.add("card", "custom-card", "m-2");
  cardImage.classList.add("card-img-top", "custom-card-image");
  cardBody.classList.add("card-body");
  cardTitle.classList.add("card-title");
  cardText.classList.add("card-text");
  cardButton.classList.add("btn", `btn-primary`); // template strings

  // Add values to the elements
  cardImage.src = photoUrl;
  cardTitle.innerText = title;
  cardText.innerText = `${description} Price: $ ${price}`;
  cardButton.innerText = "Details";
  cardButton.href = `/details.html?productId=${productId}`;

  // Build structure
  cardContainer.appendChild(cardImage);
  cardContainer.appendChild(cardBody);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardButton);

  return cardContainer;
};

let mainContent = document.getElementById("main-content");

// fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     data.results.forEach((pokemon) => {
//       fetch(pokemon.url)
//         .then((res) => {
//           return res.json();
//         })
//         .then((pokemonDetails) => {
//           let card = buildCard(
//             pokemon.name,
//             `Su peso es de:${pokemonDetails.weight}`,
//             pokemonDetails.sprites.front_default,
//             "primary",
//             "Da click aquí"
//           );
//           mainContent.appendChild(card);
//         });
//     });
//   });

const createProduct = (title, description, price, imageUrl) => {
  const url =
    "https://kodecamp2022-bc967-default-rtdb.firebaseio.com/products.json";

  const product = {
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
  };

  let productId = "";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((product) => {
      productId = product.name;
      window.location.href = `/details.html?productId=${productId}`;
    });
};

const getProduct = (id) => {
  const url = `https://kodecamp2022-bc967-default-rtdb.firebaseio.com/products/${id}.json`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((product) => {
      const card = buildCard(
        product.title,
        product.description,
        product.imageUrl,
        product.price
      );

      mainContent.appendChild(card);
    });
};

const getAllProducts = () => {
  const url = `https://kodecamp2022-bc967-default-rtdb.firebaseio.com/products.json`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((products) => {
      for (const key in products) {
        const product = products[key];

        const card = buildCard(
          product.title,
          product.description,
          product.imageUrl,
          product.price,
          key
        );

        mainContent.appendChild(card);
      }
    });
};

const updateProduct = (title, description, price, imageUrl, productId) => {
  const url = `https://kodecamp2022-bc967-default-rtdb.firebaseio.com/products/${productId}.json`;

  const product = {
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
  };

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((res) => {
    if (res.ok) {
      window.location.href = `/details.html?productId=${productId}`;
    } else {
      console.error(res);
    }
  });
};
