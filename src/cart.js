let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("cart-data")) || [];


let calculation = () => {
    /*let val = 0;
    let cal = basket.forEach((x) => {
        val += x.item;
    });*/

    let val = basket.map((x)=>x.item).reduce((x,y)=> x+y, 0);

    document.getElementById("cart-amount").innerText = val;
};

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        console.log("not empty");
        return (shoppingCart.innerHTML = basket.map((x)=>{

            let {id,item} = x;
            let search = shopItems.find((y)=> y.id === id) || [];
            let {img, name, price} = search;
            return `
            <div id="product-id-${id}" class="cart-item">
                <img width="100px" src=${img}>
                <div class="detail">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>
                    <div class="cart-buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>$ ${item*price}</h3>
                </div>
            </div>
            `
        }).join(" "));
    } else {
        console.log("empty");

        shoppingCart.innerHTML = ``
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html"><button class="home-button">Back to home</button></a>
        `
    }
}

generateCartItems();

let increment = (id)=>{
    let selectedItem = id;

    let search = basket.find((x)=> x.id === id);

    if (search === undefined) {
        basket.push({
            id: id,
            item: 1,
        });        
    } else {
        search.item += 1;
    }

    generateCartItems();

    console.log(basket);
    update(selectedItem);

    localStorage.setItem("cart-data", JSON.stringify(basket));
};


let decrement = (id)=>{
    let selectedItem = id;

    
    let search = basket.find((x)=> x.id === id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    console.log(basket);
    update(selectedItem);

    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();


    localStorage.setItem("cart-data", JSON.stringify(basket));
};

let update = (id)=>{
    let search = basket.find((x) => x.id === id);

    document.getElementById("product-id-" + search.id).querySelector(".quantity").innerText = search.item;
    calculation();
    totalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;

    basket = basket.filter((x)=> x.id !== selectedItem);
    calculation();
    generateCartItems();
    totalAmount();
    localStorage.setItem("cart-data", JSON.stringify(basket));
    /*let search = basket.find((x)=> x.id === id);

    search.item = 0;
    update(selectedItem);

    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("cart-data", JSON.stringify(basket));*/

};

let clearCart = ()=> {
    basket = [];
    calculation();
    generateCartItems();
    localStorage.setItem("cart-data", JSON.stringify(basket));
};

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x)=> {
            let {item, id} = x;
            let search = shopItems.find((y)=> y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=>x+y,0);
        label.innerHTML = `
        <h2>Toatal Bill: $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()"class="remove-all">Clear Cart</button>
        `
    } else return;
};

totalAmount();