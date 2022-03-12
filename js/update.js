const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

const titleElement = document.getElementById("title-input");
const descriptionElement = document.getElementById("description-input");
const photoUrlElement = document.getElementById("photo-input");
const priceElement = document.getElementById("price-input");
const submitBtn = document.getElementById("submit-btn");

const getData = () => {
  const title = titleElement.value;
  const description = descriptionElement.value;
  const photoUrl = photoUrlElement.value;
  const price = priceElement.value;

  updateProduct(title, description, price, photoUrl, productId);
};

submitBtn.addEventListener("click", getData);

const placeProductData = () => {
  const url = `https://kodecamp2022-bc967-default-rtdb.firebaseio.com/products/${productId}.json`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((product) => {
      titleElement.value = product.title;
      descriptionElement.value = product.description;
      photoUrlElement.value = product.imageUrl;
      priceElement.value = product.price;
    });
};

placeProductData();
