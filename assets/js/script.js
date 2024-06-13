const apiKey1 = '02a59a6bd3msh8b98276d625fb31p16f63djsn357e4e8b34f3'
const apiKey2 = '122586d94dmsh85bd15fe85ef9a2p1e537bjsn37d5cb377140'
const listGroup = $('.list-group');
const itemCardBox = $('#item-card-box');




function HandleSubmit(event) {
    event.preventDefault();
    const formList = JSON.parse(localStorage.getItem('itemCurrency')) || [];

    const itemAndCurrency = {
        item: $('#item-name').val(),
        currency: $('#currency-type-input').val()
    }

	// Get products

	// Then get currency info for each product




    formList.push(itemAndCurrency);
    localStorage.setItem('itemCurrency', JSON.stringify(formList))
    renderSearchList();
    getItemEbay(itemAndCurrency.item)
}

function renderSearchList() {
    listGroup.empty();
    createSearchList();
}

// Shows the search history of the user
function createSearchList() {
    let formList = JSON.parse(localStorage.getItem('itemCurrency')) || [];

    for(i = 0; i < formList.length; i ++) {
        const newSection = $('<button>');
        newSection.addClass('btn mt-3 bg-dark text-white border previous-search');
        newSection.attr('data-currency', formList[i].currency)
        $('.list-group').append(newSection);
        const textBox = $('<div>')
        textBox.text(formList[i].item);
        newSection.append(textBox);
    }

    $('.previous-search').on('click', function() {
        console.log('search');
        
        const itemText = $(this).text();
        const currency = $(this).attr('data-currency');

        
        console.log(itemText, currency);
        getItemEbay(itemText, currency);
    })

}

function getItemEbay(item, currencyOverride) {
    itemCardBox.empty();

    const settings = {
        async: true,
        crossDomain: true,
        url: `https://ebay32.p.rapidapi.com/search/${item}?page=1`,
        method: 'GET',
        headers: {
            'x-rapidapi-key': '122586d94dmsh85bd15fe85ef9a2p1e537bjsn37d5cb377140',
            'x-rapidapi-host': 'ebay32.p.rapidapi.com'
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        const currency = currencyOverride ?? $('#currency-type-input').val();

        for(let i = 5; i < 9; i++) {
            const price = response.products[i].price.value
            const itemPicture = response.products[i].thumbnail
            const ebayLink = response.products[i].url
            console.log(ebayLink);
            getItemCurrency(item, price, currency, itemPicture, ebayLink);
        }
    });
}

function getItemCurrency(item, price, currency, itemPicture, ebayLink) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://currency-converter-pro1.p.rapidapi.com/convert?from=USD&to=${currency}&amount=${price}`,
        method: 'GET',
        headers: {
            'x-rapidapi-key': '122586d94dmsh85bd15fe85ef9a2p1e537bjsn37d5cb377140',
            'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response.result);
        const oldPrice = response.request.amount;
        const oldCurrency = response.request.from;
        const newCurrency = response.request.to;
        const newValue = response.result;
        createItemCards(item, newValue, oldPrice, itemPicture, newCurrency, newValue, ebayLink);
    });
}

function createItemCards(item, newValue, oldprice, itemPicture, newCurrency, newValue, ebayLink) {

    itemName = $('#item-name').val();

    const itemCard = $('<div>');
    itemCard.addClass('card task-card my-3 col-md-6 text-white bg-secondary mb-3');
    const itemCardHeader = $('<div>').addClass('card-header h4').text(item);
    const itemCardBody = $('<div>').addClass('card-body');
    const itemCardText = $('<p>').addClass('card-text').text(`Price in USD: ${oldprice}`);
    const itemCardText2 = $('<p>').addClass('card-text').text(`Price in ${newCurrency}: ${newValue}`);
    const itemCardPicture = $('<div>');
    const itemLink = $('<button>').addClass('btn btn-dark mt-3').text('Link to Ebay');

    itemCardPicture.html(`<img src='${itemPicture}' alt='Thumbnail of item on ebay' />`);

    itemCardBox.append(itemCard);
    itemCard.append(itemCardHeader);
    itemCard.append(itemCardBody);
    itemCardBody.append(itemCardText);
    itemCardBody.append(itemCardText2);
    itemCardBody.append(itemCardPicture);
    itemCardBody.append(itemLink);

    itemLink.on('click', function() {
        window.open(ebayLink);
    });
}

function removeSearchList(){
	$('.list-group').empty();
	localStorage.clear('itemCurrency');
}

$(document).ready(function () {
    $('#submit').on('click', HandleSubmit);
	$('#removeItems').on('click', removeSearchList);
    renderSearchList();
});



