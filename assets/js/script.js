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
        item: $('#recipient-name').val(),
        currency: $('#project-type-input').val()
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
        const price = response.products[0].price;
        const price2 = response.products[1].price;
        const price3 = response.products[2].price;
        const price4 = response.products[3].price;
    });
}
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



