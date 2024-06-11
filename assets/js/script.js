const apiKey1 = '02a59a6bd3msh8b98276d625fb31p16f63djsn357e4e8b34f3'
const apiKey2 = '122586d94dmsh85bd15fe85ef9a2p1e537bjsn37d5cb377140'
const listGroup = $('.list-group');





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

    let citySearches = JSON.parse(localStorage.getItem('itemCurrency')) || [];

    createSearchList();
}

// Shows the search history of the user
function createSearchList() {
    let formList = JSON.parse(localStorage.getItem('itemCurrency')) || [];

    for(i = 0; i < formList.length; i ++) {
        const newSection = $('<button>');
        newSection.addClass('btn mt-3 bg-dark text-white');
        $('.list-group').append(newSection);
        const textBox = $('<div>')
        textBox.text(formList[i].item);
        newSection.append(textBox);
    }
}

function getItemEbay(item) {
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
        const currency = $('#currency-type-input').val();
        const price = response.products[0].price.value;
        // console.log(price);
        getItemCurrency(price, currency);
        // const price2 = response.products[1].price.value;
        // const price3 = response.products[2].price.value;
        // const price4 = response.products[3].price.value;
        // for(let i = 0; i < 4; i++) {
        //     const price = response.products[i].price
        //     getItemCurrency(price, currency);
        // }
    });
}

function getItemCurrency(price, currency) {
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
    });
}
// getItemCurrency('100', 'EUR');
// getItemEbay('iphone');

function removeSearchList(){
	$('.list-group').empty();
	localStorage.clear('itemCurrency');
}

$(document).ready(function () {
    $('#submit').on('click', HandleSubmit);
	$('#removeItems').on('click', removeSearchList);
    renderSearchList();
});



