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



/* .............Show all Products in UI From api .................. */
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {

    const div = document.createElement("div");
    div.classList.add("product",);
    div.innerHTML = `
      <div class="single-product ">

        <div>
          <img class="product-image " src=${product.image}></img>
        </div>
        <div class="single-product-info">
          <h3>${product.title}</h3>
          <p>Category: ${product.category}</p>
          <h4> <span class="my-style"><i class="far fa-star"></i> ${product.rating.rate}  <br>  </span>
          <span class="my-style"><i class="fas fa-users"></i> ${product.rating.count}</span>Veiws</h4>
          <h2>Price: $ ${product.price}</h2>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
          <button onclick="getProductId(${product.id})" id="details-btn" class="btn btn-danger">Details</button>
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
  const convertPrice = convertedOldPrice.toFixed(2);
  const convertedNumber = parseFloat(convertPrice);
  const total = convertedNumber + value;
  const totalFixed = total.toFixed(2);
  const totalParse = parseFloat(totalFixed)
  document.getElementById(id).innerText = Math.abs(totalParse);
};


/* .......................Set innerText function..................... */
const setInnerText = (id, value) => {
  const fixedTaxFloating = value.toFixed(2);
  const convertFixedFloating = parseFloat(fixedTaxFloating);
  document.getElementById(id).innerText = Math.abs(convertFixedFloating);
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
  const grandTotalDacimal = grandTotal.toFixed(2);
  const grandTotalFloat = parseFloat(grandTotalDacimal)
  document.getElementById("total").innerText = grandTotalFloat;
};


/*................... product details..............  */
//======get products id =============
const getProductId = (productId) =>{
  const idUrl = `https://fakestoreapi.com/products/${productId}`;
  fetch(idUrl)
  .then(res => res.json())
  .then(data => showProductDetails(data));
};


// ======show UI products details===============
const showProductDetails = (products) => {
    const ProductDetails = document.getElementById("products-details");
    const div = document.createElement("div");
    div.classList.add("details-item")
    div.innerHTML = `
      <h3>${products.title}</h3>
      <p>${products.description}</p>
      `;
    ProductDetails.textContent = '';
    ProductDetails.appendChild(div);
  
}




