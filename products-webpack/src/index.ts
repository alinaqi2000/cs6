import axios from "axios";
import "./styles/main.scss";
import "./ui";
const API_URL = "https://60c9c5c9772a760017204610.mockapi.io/";

const cartToggle = document.querySelector("#cartToggle"); // get Cart list element from the dom
let isCartOpened = false;
cartToggle.addEventListener("click", (e) => {
  if (isCartOpened) {
    document.querySelector("#cartToggle i").classList.add("fa-angle-down");
    document.querySelector("#cartToggle i").classList.remove("fa-angle-up");
    isCartOpened = true;
  } else {
    document.querySelector("#cartToggle i").classList.add("fa-angle-up");
    document.querySelector("#cartToggle i").classList.remove("fa-angle-down");
    isCartOpened = false;
  }
  document.querySelector(".cart-body").classList.toggle("show");
});

interface Product {
  title: string;
  description: string;
  image: string;
  quantity: number;
  price: string;
  id: string;
  createdAt: string;
}
let products: Product[] = [];
let cart: Product[] = [];
const getProducts = async () => {
  const data = await axios
    .get<Product[]>(API_URL + "products")
    .then((res) => res.data);
  if (data.length) {
    products = data;
    renderProducts();
  }
};
/**
 * Function name
 *
 * function siasd aas dasd asasad
 *
 * @param id:string
 *
 * @return name:string
 */
const renderProducts = () => {
  if (products.length) {
    const productsList = document.querySelector("#productsList");
    let pList = "";
    products.forEach((product) => {
      let li = `
          <div class="col-md-4">
          <div class="card mb-3">
              <img src="${product.image}" class="card-img-top" />
              <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">
                  ${product.description}
                  </p>
                  <button data-id="${product.id}" class="btn addToCartBtn btn-sm btn-primary">Add to cart</button>
              </div>
          </div>
      </div>
          `;
      pList += li;
    });
    productsList.innerHTML = pList;
    const addToCartBtns = document.querySelectorAll(".addToCartBtn");
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const productId = (event.target as Element).getAttribute("data-id");
        addToCart(productId);
      });
    });
  }
};
const addToCart = (productId: string) => {
  const isInCart = cart.findIndex((p) => p.id === productId);
  if (isInCart === -1) {
    const index = products.findIndex((p) => p.id === productId);
    cart.push(products[index]);
    renderCart();
    document.querySelector("#cartToggle i").classList.add("fa-angle-down");
    document.querySelector("#cartToggle i").classList.remove("fa-angle-up");
    document.querySelector(".cart-body").classList.add("show");
    isCartOpened = true;
  }
};
const removeFromCart = (productId: string) => {
  cart = [...cart.filter((p) => p.id !== productId)];
  renderCart();
};
const renderCart = () => {
  const cartList = document.querySelector("#cartList");
  let cList = "";
  cart.forEach((product) => {
    let li = `
      <li class="list-group-item">
      <div class="info">
        <img
          src="${product.image}"
          height="50px"
          alt=""
        />
        <h4>${product.title}</h4>
      </div>
      <div class="actions">
        <button data-id="${product.id}" class="btn removeFromCart"><i class="fa fa-trash"></i></button>
      </div>
      </li>
            `;
    cList += li;
  });
  cartList.innerHTML = cList;

  const removeFromCartBtns = document.querySelectorAll(".removeFromCart");
  removeFromCartBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const productId = (event.target as Element).getAttribute("data-id");
      removeFromCart(productId);
    });
  });
};
getProducts();
