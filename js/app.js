 /* ............call api and load data ...................*/ 
const loadProducts = () => {
  const getSearchField = document.getElementById('input-field');
  const searchValue = getSearchField.value;
  getSearchField.value = '';
  const url = `https://fakestoreapi.com/${searchValue}`; //products
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
// loadProducts();


/* .............Show all Products in UI From api .................. */
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product",);
    div.innerHTML = `
      <div class="single-product">

        <div>
          <img class="product-image" src=${product.image}></img>
        </div>
        <div class="single-product-info">
          <h3>${product.title}</h3>
          <p>Category: ${product.category}</p>
          <h2>Price: $ ${product.price}</h2>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
          <button id="details-btn" class="btn btn-danger">Details</button>
        </div>
        
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;


/* .............add product quantity, product price, product tax, product total price.......... */
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};


/* .................get innerText from every card price.................... */
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};


/* ..............Update main price ............ */
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value).toFixed(2);
  const convertedNumber = parseFloat(convertPrice);
  const total = convertedOldPrice + convertedNumber;
  document.getElementById(id).innerText = Math.abs(total);
};


/* .......................Set innerText function..................... */
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.abs(value);
};


/* ...............Update delivery charge and total tax.................. */
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};


/* .............acount total update price value function................ */
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};
