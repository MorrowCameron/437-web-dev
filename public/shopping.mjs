const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const article = document.createElement("article");
    const div = document.createElement("div");
    div.classList.add("product-details");
    const h3 = document.createElement("h3");
    h3.textContent = product.name;
    const description = document.createElement("p");
    description.textContent = product.description;
    const img = document.createElement("img");
    img.src = product.imageSrc;
    const price = document.createElement("p");
    price.classList.add("price");
    price.textContent = `$${product.price}`;

    const buttonDiv = document.createElement("div");
    const button = document.createElement("button");
    button.classList.add("buy-button");
    button.textContent = "Add to Cart";
    button.addEventListener("click", () => {
        console.log(`Added ${product.name} to cart`);
        product.numInCart++;
        rerenderCart();
        rerenderAllProducts();
    });
    const numInCart = document.createElement("span");
    numInCart.classList.add("num-in-cart");
    numInCart.textContent = `${product.numInCart} in cart`;

    buttonDiv.appendChild(button);
    buttonDiv.appendChild(numInCart);

    div.appendChild(h3);
    div.appendChild(description);
    div.appendChild(price);
    div.appendChild(buttonDiv);

    article.appendChild(img);
    article.appendChild(div);
    return article;
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    /*
    1. remove all <article>s
    2. recreate them using the data in PRODUCTS
    3. modify the re-creation so it uses shouldProductBeVisible() (details are near the bottom of the lab directions)

    You can remove and recreate the heading element if it makes things easier.
     */
    const productContainer = document.querySelector(".product-list");
    productContainer.innerHTML = ""; // Clear the container

    PRODUCTS.forEach(product => {
        if(shouldProductBeVisible(product)) {
            const productCard = renderProductCard(product);
            productContainer.appendChild(productCard);
        }
    });

}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    const cartContainer = document.querySelector(".cart-items");
  
    // Clear current cart contents
    cartContainer.innerHTML = "";
  
    PRODUCTS.forEach((product) => {
      if (product.numInCart > 0) {
        const item = document.createElement("p");
        item.textContent = `${product.name} x${product.numInCart}`;
  
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
          product.numInCart = 0;
          rerenderCart();
        });
  
        cartContainer.appendChild(item);
        cartContainer.appendChild(removeButton);
      }
    });
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    const min = Number.parseFloat(minPriceInput.value);
    const max = Number.parseFloat(maxPriceInput.value);
  
    const meetsMin = isNaN(min) || product.price >= min;
    const meetsMax = isNaN(max) || product.price <= max;
  
    return meetsMin && meetsMax;
  }

console.log(renderProductCard(PRODUCTS[0]));

rerenderAllProducts();
rerenderCart();

minPriceInput.addEventListener("change", rerenderAllProducts);
maxPriceInput.addEventListener("change", rerenderAllProducts);