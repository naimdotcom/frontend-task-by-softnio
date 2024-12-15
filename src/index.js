const colorInputs = document.querySelectorAll('input[name="color"]');
const sizeInputs = document.querySelectorAll('input[name="size"]');
const productImage = document.querySelector("#product-image");
const output = document.getElementById("output");
const decrementBtn = document.getElementById("decrement");
const incrementBtn = document.getElementById("increment");
const countOfProduct = document.getElementById("count");
const addToCardBtn = document.getElementById("add-to-card");
const modal = document.getElementById("modal");
const modalCart = document.getElementById("modal-cart");
const checkoutBtn = document.getElementById("open-check-out");
const closeBtn = document.getElementById("close-check-out");
const finalCheckOutBtn = document.getElementById("final-check-out");

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

// todo: checkout close and open
checkoutBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  checkOutProductModal();
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
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
    modalCartTotal.innerHTML = `No products added to cart`;
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
}
