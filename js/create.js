const getData = () => {
  const titleElement = document.getElementById("title-input");
  const descriptionElement = document.getElementById("description-input");
  const photoUrlElement = document.getElementById("photo-input");
  const priceElement = document.getElementById("price-input");

  const title = titleElement.value;
  const description = descriptionElement.value;
  const photoUrl = photoUrlElement.value;
  const price = priceElement.value;

  createProduct(title, description, price, photoUrl);
};

const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", getData);
