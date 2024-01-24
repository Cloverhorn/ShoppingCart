let basket = JSON.parse(localStorage.getItem('data')) || []
const label = document.querySelector('#label')
const shoppingCart = document.querySelector('#shopping-cart')
const cartContainer = document.querySelector('.cart-container')

basketQuantityUpdate()

function basketQuantityUpdate() {
    const cartAmount = document.querySelector('#cartAmount')
    cartAmount.textContent = basket.reduce((acc, elem) => {
        return acc + elem.item
    }, 0)
}

function generateCartItems() {
    if (basket.length !== 0) {
        shoppingCart.innerHTML = basket.map(basketElem => {
            let { id, item } = basketElem
            let search = shopItemsData.find((shopElem) => shopElem.id === basketElem.id) || []
            // let { searchDesc, searchId, searchImgSrc, searchName, searchPrice } = seacrh
            // console.log(searchImgSrc)
            return `
            <div class="cart-item">
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                <img width="100px" src=${search.imgSrc} alt="">
                <div class="details">
                    <div class="title-price-x">
                    <h4 class="title-price">
                        <p>${search.name}</p>
                        <p class="cart-item-price">$${search.price}</p>
                    </h4>
                    </div>
                    <div class="buttons-cart">
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash"></i>
                        <div id="quantity-${id}" class="quantity">${item || 0}</div>
                        <i onclick="increment(${id})" class="bi bi-plus"></i>
                    </div>
                        <h3 class="">$${item * search.price}</h3>
                    </div>

                </div>
            </div>
            `
        }).join("")
    }
    else {
        // shoppingCart.innerHTML = `
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="homeBtn">Back to homepage</button>
        </a>
        `
    }
}

generateCartItems()

function increment(id) {
    const selectedItemQuantity = document.querySelector('#quantity-' + id)

    if (!selectedItemQuantity) {
        console.error(`Element with id "quantity-${id}" not found`)
        return
    }

    let search = basket.find(elem => elem.id === id)

    if (!search) {
        basket.push({
            id: id,
            item: 1
        })
        // selectedItemQuantity.textContent = 1
    } else {
        search.item += 1
        // selectedItemQuantity.textContent = search.item
    }

    localStorage.setItem('data', JSON.stringify(basket))
    update(id)
    generateCartItems()
}

function decrement(id) {
    const selectedItemQuantity = document.querySelector('#quantity-' + id)

    if (!selectedItemQuantity) {
        console.error(`Element with id "quantity-${id}" not found`)
        return
    }

    let search = basket.find(elem => elem.id === id)

    if (!search) {
        console.error(`Item with id "${id}" not found in the basket`)
        return
    }

    if (search.item === 1) {
        const index = basket.indexOf(search)
        if (index > -1) {
            basket.splice(index, 1)
        }

    } else {
        search.item -= 1
    }
    localStorage.setItem('data', JSON.stringify(basket))
    update(id)
    generateCartItems()
    basket = basket.filter(elem => elem.item !== 0)
}

function update(id) {
    let search = basket.find(elem => elem.id === id)
    const selectedItemQuantity = document.querySelector('#quantity-' + id)
    if (!search) selectedItemQuantity.textContent = 0
    else selectedItemQuantity.textContent = search.item
    basketQuantityUpdate()
    totalAmount()
}

function removeItem(id) {

    basket = basket.filter(elem => {
        return elem.id !== id
    })

    localStorage.setItem('data', JSON.stringify(basket))
    generateCartItems()
    basketQuantityUpdate()
    totalAmount()
}

function totalAmount() {
    if (basket.length !== 0) {
        let amount = basket.map(elem => {
            let { item, id } = elem
            let search = shopItemsData.find((shopElem) => shopElem.id === id) || []
            return item * search.price
        }).reduce((acc, sum) => acc + sum, 0)
        // <button class="checkout">Checkout</button>
        // cartContainer.innerHTML += `
        label.innerHTML = `
        <h2>Total Amount: ${amount}</h2>
        <button onclick="clearCart()" class="removeAll">Empty Cart</button>
        `
    } else return
}
totalAmount()

function clearCart() {
    basket = []
    generateCartItems()
    localStorage.setItem('data', JSON.stringify(basket))
}