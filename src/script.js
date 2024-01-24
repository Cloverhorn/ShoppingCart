const shop = document.querySelector('#shop')


let basket = JSON.parse(localStorage.getItem('data')) || []

function generateShop() {
    shop.innerHTML += shopItemsData.map((elem) => {
        let { id, name, price, desc, imgSrc } = elem
        let search = basket.find(elem => elem.id === id) || []
        
        return `
        <div id="product-id-${id}" class="shop__item">
        <img src="${imgSrc}" alt="">
        <div class="shop__details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash"></i>
                    <div id="quantity-${id}" class="quantity">${search.item || 0}</div>
                    <i onclick="increment(${id})" class="bi bi-plus"></i>
                </div>
            </div>
        </div>
    </div>
    `
    }).join('')
    basketQuantityUpdate()
}

generateShop()


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
}

function update(id) {
    let search = basket.find(elem => elem.id === id)
    const selectedItemQuantity = document.querySelector('#quantity-' + id)
    if (!search) selectedItemQuantity.textContent = 0
    else selectedItemQuantity.textContent = search.item
    basketQuantityUpdate()
}

function basketQuantityUpdate() {
    const cartAmount = document.querySelector('#cartAmount')
    cartAmount.textContent = basket.reduce((acc, elem) => {
        return acc + elem.item
    }, 0)
}