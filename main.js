let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemData
    .map((x) => {
      let { id, name, price, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return ` <div id="item-${id}" class="item">
        <img src="${img}"
            alt="Product 01" width="200">
        <div class="details">
            <h3>${name}</h3>
            <p>Lorem ipsum dolor amet consectetur adipisicing elit.</p>
            <div class="price">
                <h4>$ ${price}</h4>
                <div class="buySec">
                    <p onclick="increment(${id})" ><i class='bx bx-plus'></i></p>
                    <div id="${id}" class="quentity">${
        search.item === undefined ? 0 : search.item
      }</div>
                    <p onclick="decrement(${id})" ><i class='bx bx-minus'></i></p>
                </div>
            </div>
        </div>
    </div> `;
    })
    .join(""));
};

generateShop();

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
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
