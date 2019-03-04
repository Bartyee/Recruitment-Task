let furniture = []; //Global array for items from api. Globally because in the future we can manipulate this variable between function etc.
const apiURL = "http://localhost:3030"; // Url for API

//////////////////////////////// DOM elements

let productsWrapper = document.querySelector('.productsWrapper');
let buttonsView = document.querySelectorAll('.productViewButtons__button');

//////////////////////////////


const getData = () => { // Get Data from Api and print this data(printData is a other function)
    $.ajax({
        url: apiURL,
        dataType: "json",
        headers: {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': "GET,POST,OPTIONS,DELETE,PUT" //CORS settings for localhost testing
        }
    }).done(response => {
        furniture = response.list;
        printData(); // printData on site

    }).fail(() => {
        console.log("Error in connect"); //add loading
    })
}

const printData = () => {
    
    let product; //Need to create element
    let productName; //Name of product
    let producerName; //Name of product producer
    let productUrl; //productUrl name need to get product image
    let absoluteImgPath; // path to place where we can get img
    let productAmount; // product amount in stock
    let priceBeforePromo; // price before promotion
    let priceAfterPromo; // price after promotion
    let priceSave; // price save (priceBeforePromo - priceAfterPromo)

    
    for(let i=0; i<furniture.length; i++){
        product = document.createElement('div'); //Create element which represent product
        product.className = "product";

        productUrl = furniture[i].main_image;
        absoluteImgPath = `https://outletmeblowy.pl/environment/cache/images/300_300_productGfx_${productUrl}.jpg`;

        productName = furniture[i].name;
        productAmount = furniture[i].number;
        producerName = furniture[i].producer.name;
        priceAfterPromo = furniture[i].price.gross.promo_float;
        priceBeforePromo = furniture[i].price.gross.base_float;
        priceSave = priceBeforePromo - priceAfterPromo;
        
        
        product.innerHTML = `
        <div class="product__amount_priceSave">
            <div class="product__amount">sztuk: ${productAmount}</div>
            <div class="product__priceSave">oszczędzasz: <span>${priceSave}zł</span></div>
        </div>
        <div class="product__picture">
            <img class="product__picture__img" src=${absoluteImgPath} alt="product_picture">
        </div>
        <div class="product__mainInformation">
            <div class="product__mainInformation__price">
                <p class="price__afterPromo">${priceAfterPromo} zł</p><span class="price__beforePromo">${priceBeforePromo} zł</span>
            </div>
            <p class="product__mainInformation__name">${productName}</p>
            <p class="product__mainInformation__producer">Grupa ${producerName}</p>
        </div>
        `
        if(i === 4){ //default site show just only four products, so if loop iteration is on 4, dont show next product
            productsWrapper.appendChild(product).style.display = "none";
        }
        else{ //add product else if loop iteration is other than 4
            productsWrapper.appendChild(product)
        }    
    }
} //printData is in getData, when data get from API, print data start

const listenerViewButtons = () => {
    
    buttonsView.forEach(el => {
        if(el.classList.contains('productViewButtons__button-1')){
            el.addEventListener("click", () => {
                //do something with slide
                el.classList.add('productViewButtons__button--clicked');
    
                if(buttonsView[1].classList.contains('productViewButtons__button--clicked') || buttonsView[2].classList.contains('productViewButtons__button--clicked')){
                    buttonsView[1].classList.remove('productViewButtons__button--clicked');
                    buttonsView[2].classList.remove('productViewButtons__button--clicked');
                }

                //If first button clicked then remove class from another

                

                let productLength = $('.product').length;

                $('.product').slice(0,2).css('display', '');
                $('.product').slice(2,productLength).css('display', 'none');
                
            })
        }
        else if(el.classList.contains('productViewButtons__button-2')){
            el.addEventListener("click", () => {
                el.classList.add('productViewButtons__button--clicked');
    
                if(buttonsView[0].classList.contains('productViewButtons__button--clicked') || buttonsView[2].classList.contains('productViewButtons__button--clicked')){
                    buttonsView[0].classList.remove('productViewButtons__button--clicked');
                    buttonsView[2].classList.remove('productViewButtons__button--clicked');
                }
                
                let productLength = $('.product').length;

                $('.product').slice(0,4).css('display', '');
                $('.product').slice(4,productLength).css('display', 'none');

                //If second button clicked then remove class from another

                
            })
        }
        else{
            el.addEventListener("click", () => {
                el.classList.add('productViewButtons__button--clicked');
    
                if(buttonsView[0].classList.contains('productViewButtons__button--clicked') || buttonsView[1].classList.contains('productViewButtons__button--clicked')){
                    buttonsView[0].classList.remove('productViewButtons__button--clicked');
                    buttonsView[1].classList.remove('productViewButtons__button--clicked');
                }

                $('.product').slice(0,8).css('display', '');
                $('.product').slice(4,productLength).css('display', 'none');

                //If third button clicked then remove class from another
            })
        }
    })
} // Add eventListener to buttons which show number of products in wrapper 

const timerSetup = () => {
    $('.timer').countdown('2019/03/05 20:30:00')
    .on('update.countdown', function(event) {
    var format = '%H : %M : %S';
    if(event.offset.totalDays > 0) {
        format = '%-d : %!d ' + format;
    }
    if(event.offset.weeks > 0) {
        format = '%-w week%!w ' + format;
    }
    $(this).html(event.strftime(format));
    })
    .on('finish.countdown', function(event) {
    $(this).html('Oferta wygasła!')
        .parent().addClass('disabled');
    });
}

const initApplication = () => {
    getData();
    listenerViewButtons();
    timerSetup();  
}

initApplication();





