const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'img/crazy.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'img/light.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        price: 29000,
        name: 'CheeseBurger',
        img: 'img/cheseeburger.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        price: 24000,
        name: 'dBurger',
        img: 'img/dBurger.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}

const productBtns = document.querySelectorAll('.card__item_btn'),
    productMenu = document.querySelector('.basket__inner'),
    basketBtn = document.querySelector('.basket'),
    basketClose = document.querySelector('.close'),
    menuList = document.querySelector('.basket__list'),
    totalMenuPrice = document.querySelector('.basket__down_price'),
    productCount = document.querySelector('.basket__span');
    
    menuList.innerHTML = '<p class="menuList__text">заказа нет</p>'


productBtns.forEach((item) => {
    item.addEventListener('click', function () {
        plusOrMinus(this)
        // console.log(this);
    })
})

function plusOrMinus(btn) {

    let parent = btn.closest('.card'),
        parentId = parent.getAttribute('id');

    product[parentId].amount++;
    basket()
}

function basket() {

    let productArr = [],
        totalCount = 0;

    for (const key in product) {
        let pk = product[key],
            productCard = document.querySelector(`#${pk.name.toLowerCase()}`),
            productIndicator = productCard.querySelector('.card__span')

        if (pk.amount) {
            productArr.push(pk)
            productIndicator.classList.add('active')
            totalCount += pk.amount
            // totalCount + totalCount + pk.amount
            productCount.classList.add('active')
            productIndicator.innerHTML = pk.amount;
        } else {
            productIndicator.classList.remove('active')
            productIndicator.innerHTML = 0;
        }
        productCount.innerHTML = totalCount;
    }

    menuList.innerHTML = ''

    for (let i = 0; i < productArr.length; i++) {

        menuList.innerHTML += menuItemBurger(productArr[i])

    }

    totalMenuPrice.innerHTML = totalSumProduct()
}

function menuItemBurger(productItem) {
    const { name, totalSum, amount, img } = productItem;

    return `      <div class="basket__list">
    <div class="basket__list_item">
        <div class="basket__list_left">
            <img src="${img}" alt="crazy">
            <div class="basket__list_desc">
                <h4 class="basket__list_desc-title">${name}</h4>
                <p class="basket__list_desc-text">${totalSum}</p>
            </div>
        </div>
        <div class="basket__btns" id="${name.toLowerCase()}__card">
            <button class="basket__btn minus" data-symbol="-">-</button>
            <output class="basket__count">${amount}</output>
            <button class="basket__btn plus" data-symbol="+">+</button>
        </div>
    </div>
</div>
    `
}


function totalSumProduct() {
    let totalPrice = 0;
    
    for (const key in product) {
        totalPrice += product[key].totalSum
    }
    return totalPrice;
}


window.addEventListener('click', (e) => {
    let btn = e.target;
    
    if (btn.classList.contains('basket__btn')) {
        const attr = btn.getAttribute('data-symbol'),
            parent = btn.closest('.basket__btns');
        
        if (parent) {
            const idProduct = parent.getAttribute('id').split('__')[0]
            if (attr == '+') {
                product[idProduct].amount++;
            }else if (attr == '-') {
                product[idProduct].amount--;
            }
            basket()
        }
    }
})


const printBody = document.querySelector('.print__body'),
      printCheck = document.querySelector('.basket__down'),
      printFooter = document.querySelector('.print__footer');
      
      
      printCheck.addEventListener('click', () => {
        printBody.innerHTML = ''
        
        for (const key in product) {
            const {name, totalSum, amount} = product[key]
            if (amount) {
                printBody.innerHTML += `       
                <div class="print__body">
                <div class="print__body_title">
                    <span class="name">${name}</span>
                    <span class="count">штук: ${amount}</span>
                    <span class="Summ">сумма: ${totalSum}</span>
                </div>
            </div>`
            }
            if (amount) {
                printFooter.innerHTML = `<div class="print__footer">Общая стоимость заказ: ${totalSumProduct()}</div>`
            }
        }
        window.print()
      })
      










basketBtn.addEventListener('click', () => {
    productMenu.classList.toggle('active')
})

basketClose.addEventListener('click', () => {
    productMenu.classList.remove('active')
})

















