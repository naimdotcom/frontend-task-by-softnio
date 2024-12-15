const colorInputs = document.querySelectorAll('input[name="color"]');
const sizeInputs = document.querySelectorAll('input[name="size"]');
const productImage = document.querySelector("#product-image");
const output = document.getElementById("output");
const decrementBtn = document.getElementById("decrement");
const incrementBtn = document.getElementById("increment");
const countOfProduct = document.getElementById("count");
const addToCardBtn = document.getElementById("add-to-card");

const checkoutProducts = [];
let addToCardProduct = {
  productImage: "./public/product-images/purple.png",
  productColor: "purple",
  productSize: "S",
  productName: "Classy Modern Smart watch",
  productPrice: "69",
  productCount: "1",
};
// todo: on change of input value change the image and set aathe state also
colorInputs.forEach((input) => {
  input.addEventListener("change", () => {
    console.log(input.value);
    // todo: change the image
    productImage.src = `./public/product-images/${input.value}.png`;
    addToCardProduct = {
      ...addToCardProduct,
      productColor: input.value,
      productImage: `./public/product-images/${input.value}.png`,
    };
  });
});

//todo: on change of size input value change the image and set the state also

sizeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    console.log(input.value);
    console.log(input.dataset.productPrice);
    addToCardProduct = {
      ...addToCardProduct,
      productSize: input.value,
      productPrice: input.dataset.productPrice,
    };
    console.log(addToCardProduct);
  });
});

// todo: product amount increment decrement
decrementBtn.addEventListener("click", () => {
  if (countOfProduct.textContent > 1) {
    countOfProduct.textContent = parseInt(countOfProduct.textContent) - 1;
  }
  addToCardProduct = {
    ...addToCardProduct,
    productCount: countOfProduct.textContent,
  };
});
incrementBtn.addEventListener("click", () => {
  countOfProduct.textContent = parseInt(countOfProduct.textContent) + 1;
  addToCardProduct = {
    ...addToCardProduct,
    productCount: countOfProduct.textContent,
  };
});

// todo: add to card
addToCardBtn.addEventListener("click", () => {
  console.log(addToCardProduct);
  checkoutProducts.push(addToCardProduct);
  console.log(checkoutProducts);
});
