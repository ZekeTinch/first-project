// Currency Converter API test
const settings = {
	async: true,
	crossDomain: true,
	url: 'https://currency-converter-pro1.p.rapidapi.com/convert?from=USD&to=EUR&amount=100',
	method: 'GET',
	headers: {
		'x-rapidapi-key': '02a59a6bd3msh8b98276d625fb31p16f63djsn357e4e8b34f3',
		'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
	}
};

// EBay API test
const settings2 = {
    async: true,
    crossDomain: true,
    url: 'https://ebay32.p.rapidapi.com/search/iphone?page=1&country=germany&country_code=de',
    method: 'GET',
    headers: {
        'x-rapidapi-key': '122586d94dmsh85bd15fe85ef9a2p1e537bjsn37d5cb377140',
        'x-rapidapi-host': 'ebay32.p.rapidapi.com'
    }
};

$.ajax(settings2).done(function (response) {
    console.log(response);
});

$.ajax(settings).done(function (response) {
	console.log(response);
});
