const params = new URLSearchParams(window.location.search);

const productId = params.get("productId");
const deleteBtn = document.getElementById("btn-delete");
const editBtn = document.getElementById("btn-edit");

getProduct(productId);

const deleteProduct = (productId) => {
  const url = `https://kodecamp2022-bc967-default-rtdb.firebaseio.com/products/${productId}.json`;

  fetch(url, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      window.location.href = "/index.html";
    } else {
      console.error(res);
    }
  });
};

deleteBtn.addEventListener("click", () => {
  deleteProduct(productId);
});

editBtn.addEventListener("click", () => {
  window.location.href = `/update.html?productId=${productId}`;
});
