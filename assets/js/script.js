const apiKey1 = '02a59a6bd3msh8b98276d625fb31p16f63djsn357e4e8b34f3'
const apiKey2 = '122586d94dmsh85bd15fe85ef9a2p1e537bjsn37d5cb377140'
const listGroup = $('.list-group');



function getCurrency(type){
	const apiUrl = `https://currency-converter-pro1.p.rapidapi.com/convert?from=USD&to=${itemAndCurrency.currency}&amount=${100}appid=${apiKey1}`
	fetch(apiUrl).then(function(response){
		return response.json()
	}).then(function(data){
		const item = data[0].item;
        const price = data[0].currency;
        getCurrency()
	})
}

function getItem(item){
    const apiUrl =  `https://ebay32.p.rapidapi.com/search/${itemCurrency.item}?page=1&country=germany&country_code=de&appid=${apiKey2}`
    fetch(apiUrl).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
    })
}





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
        for(let i = 0; i < 4; i++) {
            const price = response.products[i].price.value
            getItemCurrency(price, currency);
        }
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



