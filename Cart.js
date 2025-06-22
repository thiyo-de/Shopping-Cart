let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket.map((x) => {
        let{id, item} = x;
        let search = shopItemData.find((y)=> y.id === id) || [];
      return `
             <div class="cart-item">
             <i onclick="removeItem(${id})" class='bx bxs-x-circle'></i>
              <img width="100" src=${search.img}>
              <div class="details">
              <div class="title-price-x">
              <h4>
              <p>${search.name} - $${search.price}</p>
              </h4>
              </div>
              <div class="buttons">
                    <p onclick="increment(${id})" ><i class='bx bx-plus'></i></p>
                    <div id=${id} class="quentity">${item}</div>
                    <p onclick="decrement(${id})" ><i class='bx bx-minus'></i></p>
                </div>
              <h3 class="incre-price">
              $ ${item * search.price}
              </h3>
              </div>
             </div>
            `;
    }));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Your Cart Is Empty 😱 !!!</h2>
        <a href="index.html">
         <button class="HomeBtn">Back To Home</button>
        </a>
        `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  update(selectedItem.id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  
  update(selectedItem.id);
  basket = basket.filter((x)=>x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let clearCart = () => {
basket = [];
generateCartItems();
localStorage.setItem("data", JSON.stringify(basket))
calculation();
};

let removeItem = (id) => {
 let selectedItem = id;
 basket = basket.filter((x)=>x.id !== selectedItem.id);
 generateCartItems();
 localStorage.setItem("data",JSON.stringify(basket));
 totalAmount();
 calculation();
}

let totalAmount = () => {
  if(basket.length !== 0){
    let amount = basket.map((x)=>{
      let {item, id} = x;
      let search = shopItemData.find((y)=>y.id === id) || [];
      return item*search.price;
    }).reduce((x, y)=> x + y, 0)
    label.innerHTML = `
      <h2>Total Bill : $ ${amount}</h2>
      <a href="index.html"><button class="checkout">Checkout</button></a>
      <button onclick="clearCart()" class="removeAll">Remove All</button>
      `
  }
  else
    return; 
}

totalAmount();