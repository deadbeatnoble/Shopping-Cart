let shop = document.getElementById("shop");



let basket = JSON.parse(localStorage.getItem("cart-data")) || [];

let generateShop = ()=>{
    return (shop.innerHTML = shopItems.map((x)=>{
        let {id, img, name, desc, price} = x;
        let search = basket.find((x)=> x.id === id) || [];

        return `
        <div id="product-id-${id}" class="item">
            <img width="220px" src=${img} alt="">
            <div class="detail">
                <h3>${name} </h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div class="quantity">${search.item ===  undefined ? 0 : search.item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `
    }).join(" "))
};

generateShop();
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

    basket = basket.filter((x)=>x.item !== 0);


    localStorage.setItem("cart-data", JSON.stringify(basket));
};
let update = (id)=>{
    let search = basket.find((x) => x.id === id);

    document.getElementById("product-id-" + search.id).querySelector(".quantity").innerText = search.item;
    calculation()
};

let calculation = () => {
    /*let val = 0;
    let cal = basket.forEach((x) => {
        val += x.item;
    });*/

    let val = basket.map((x)=>x.item).reduce((x,y)=> x+y, 0);

    document.getElementById("cart-amount").innerText = val;
    console.log(val);
};

calculation();