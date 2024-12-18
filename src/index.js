const colorInputs = document.querySelectorAll('input[name="color"]');
const sizeInputs = document.querySelectorAll('input[name="size"]');
const productImage = document.querySelector("#product-image");
const output = document.getElementById("output");
const decrementBtn = document.getElementById("decrement");
const incrementBtn = document.getElementById("increment");
const countOfProduct = document.getElementById("count");
const addToCardBtn = document.getElementById("add-to-card");
const modalOverlay = document.getElementById("modal-overlay");
const modalCart = document.getElementById("modal-cart");
const checkoutBtn = document.getElementById("open-check-out");
const closeBtn = document.getElementById("close-check-out");
const finalCheckOutBtn = document.getElementById("final-check-out");
const starRating = document.getElementById("star-rating");
const favoriteBtn = document.getElementById("add-to-favorite");
const productCheckoutCount = document.getElementById("checkout-product-count");

const checkoutProducts = [];
let addToCardProduct = {
  productImage: "./public/product-images/purple.png",
  productColor: "purple",
  productSize: "S",
  productName: "Classy Modern Smart watch",
  productPrice: "69",
  productCount: "1",
  productFavorite: false,
};
// todo: show star rating
/*

*/
function showStarRating(rating) {
  let ratingStar = "";
  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      ratingStar += `<img src="./public/Icon/star-fill.svg" alt="" />`;
    } else if (rating > i && rating < i + 1) {
      ratingStar += `<img src="./public/Icon/star-half-fill.svg" alt="" />`;
    } else {
      ratingStar += `<img src="./public/Icon/star.svg" alt="" />`;
    }
  }
  starRating.innerHTML = ratingStar;
}
showStarRating(3.5);

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
    const productPrice = document.getElementById("product-price");

    productPrice.textContent = `$${input.dataset.productPrice}.00`;
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
  const productAddToCardMessage = document.getElementById(
    "product-addToCard-message"
  );

  checkoutProducts.push(addToCardProduct);

  productAddToCardMessage.textContent = "Product added to cart";

  productCheckoutCount.textContent = checkoutProducts.length;

  const timerId = setTimeout(() => {
    productAddToCardMessage.textContent = "Add to Cart";
    clearTimeout(timerId);
  }, 2000);
});

// todo: checkout close and open
checkoutBtn.addEventListener("click", () => {
  console.log("clicked");

  modalOverlay.classList.replace("hidden", "flex");

  checkOutProductModal();
});
function closeModal() {
  if (modalOverlay) {
    modalOverlay.classList.replace("flex", "hidden");
  }
}
closeBtn.addEventListener("click", () => {
  closeModal();
});
document.addEventListener("click", (event) => {
  console.log(
    modalCart.contains(event.target),
    modalOverlay.classList.contains("hidden"),
    event.target.closest("#open-check-out")
  );
  console.log(
    modalOverlay &&
      modalCart &&
      !modalCart.contains(event.target) &&
      !modalOverlay.classList.contains("hidden") &&
      !event.target.closest("#open-check-out")
  );

  // Check if the click is outside the modal
  if (
    modalOverlay &&
    modalCart &&
    !modalCart.contains(event.target) &&
    !modalOverlay.classList.contains("hidden") &&
    !event.target.closest("#open-check-out")
  ) {
    closeModal();
  }
});

modalCart.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event from reaching document-level handler
});

favoriteBtn.addEventListener("click", () => {
  console.log("clicked");

  const favoriteImg = document.querySelector("#add-to-favorite img");
  console.log(favoriteImg.src);
  let url = favoriteImg.src;
  let regex = /public\/.*$/;
  let src = url.match(regex);

  if (src[0] == "public/Icon/love.svg") {
    favoriteImg.setAttribute("src", "./public/Icon/love-fill.svg");
    addToCardProduct = {
      ...addToCardProduct,
      productFavorite: true,
    };
  } else {
    favoriteImg.setAttribute("src", "./public/Icon/love.svg");
  }
});

// todo: final check out
function checkOutProductModal() {
  const modalCartBody = document.getElementById("modal-cart-body");
  const modalCartTotal = document.getElementById("modal-cart-total");

  let checkoutproductsHtml = "";
  let checkoutTotalHtml = "";
  let totalProductCount = 0;
  let totalProductPrice = 0;

  if (checkoutProducts.length === 0) {
    modalCartBody.innerHTML = `No products added to cart`;
    modalCartTotal.innerHTML = `
    <tr>
                    <td
                      colspan="3"
                      class="py-4 font-bold text-left text-gray-800"
                    >
                      Total
                    </td>
  
                    <td class="py-4 font-bold text-gray-800">
                      <div
                        class="text-sm font-bold leading-loose text-center text-primaryFont font-roboto"
                      >
                        ${totalProductCount}
                      </div>
                    </td>
                    <td class="py-4 pl-8 font-bold text-gray-800">
                      <div
                        class="text-lg font-bold leading-loose text-primaryFont font-roboto"
                      >
                        $${totalProductPrice}
                      </div>
                    </td>
                  </tr>
                  `;
    productCheckoutCount.textContent = checkoutProducts.length;
    return;
  }

  checkoutProducts.forEach((product) => {
    // todo: add the product amount and count
    totalProductCount += parseInt(product.productCount);
    totalProductPrice += parseInt(product.productPrice * product.productCount);

    // todo: add the product in html
    checkoutproductsHtml += `
      <tr class="border-b">
                    <td class="py-4">
                      <div class="flex items-center pr-14">
                        <img
                          class="w-12 h-12 mr-4 rounded-md"
                          src="${product.productImage}"
                          alt="${product.productName}"
                        />
                        <h2
                          class="text-sm font-normal leading-normal text-primaryFont font-roboto"
                        >
                          ${product.productName}
                        </h2>
                      </div>
                    </td>
                    <td class="">
                      <h3
                        class="text-sm font-normal leading-normal text-center text-primaryFont font-roboto"
                      >
                        ${product.productColor}
                      </h3>
                    </td>
                    <td class="">
                      <h3
                        class="text-sm font-normal leading-normal text-center text-primaryFont font-roboto"
                      >
                        ${product.productSize}
                      </h3>
                    </td>
                    <td class="px-4 py-4">
                      <h3
                        class="text-sm font-bold leading-normal text-center text-primaryFont font-roboto"
                      >
                        ${product.productCount}
                      </h3>
                    </td>
                    <td class="py-4 font-bold text-gray-800">
                      <h3
                        class="text-sm font-bold leading-normal text-right text-primaryFont font-roboto"
                      >
                        $${product.productPrice * product.productCount}
                      </h3>
                    </td>
                  </tr>
                  `;

    checkoutTotalHtml = `
      <tr>
                    <td
                      colspan="3"
                      class="py-4 font-bold text-left text-gray-800"
                    >
                      Total
                    </td>
  
                    <td class="py-4 font-bold text-gray-800">
                      <div
                        class="text-sm font-bold leading-loose text-center text-primaryFont font-roboto"
                      >
                        ${totalProductCount}
                      </div>
                    </td>
                    <td class="py-4 pl-8 font-bold text-gray-800">
                      <div
                        class="text-lg font-bold leading-loose text-primaryFont font-roboto"
                      >
                        $${totalProductPrice}
                      </div>
                    </td>
                  </tr>
      `;
  });

  modalCartBody.innerHTML = checkoutproductsHtml;
  modalCartTotal.innerHTML = checkoutTotalHtml;
  productCheckoutCount.textContent = checkoutProducts.length;
}

finalCheckOutBtn.addEventListener("click", () => {
  checkoutProducts.splice(0, checkoutProducts.length);
  while (checkoutProducts.length > 0) {
    checkoutProducts.pop();
  }
  addToCardProduct = {};

  console.log(checkoutProducts, addToCardProduct);

  closeModal();
});
