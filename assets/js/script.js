// Currency Converter API test
// const settings = {
// 	async: true,
// 	crossDomain: true,
// 	url: `https://currency-converter-pro1.p.rapidapi.com/convert?from=USD&to=${itemAndCurrency.currency}&amount=${100}`,
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '02a59a6bd3msh8b98276d625fb31p16f63djsn357e4e8b34f3',
// 		'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
// 	}
// };
const apiKey1 = '02a59a6bd3msh8b98276d625fb31p16f63djsn357e4e8b34f3'
const apiKey2 = '122586d94dmsh85bd15fe85ef9a2p1e537bjsn37d5cb377140'

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



// EBay API test
// const settings2 = {
//     async: true,
//     crossDomain: true,
//     url: `https://ebay32.p.rapidapi.com/search/${itemCurrency.item}?page=1&country=germany&country_code=de`,
//     method: 'GET',
//     headers: {
//         'x-rapidapi-key': '122586d94dmsh85bd15fe85ef9a2p1e537bjsn37d5cb377140',
//         'x-rapidapi-host': 'ebay32.p.rapidapi.com'
//     }
// };

$.ajax(settings2).done(function (response) {
    console.log(response);
});

$.ajax(settings).done(function (response) {
	console.log(response);
});


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
}

$(document).ready(function () {
    $('#submit').on('click', HandleSubmit);
});