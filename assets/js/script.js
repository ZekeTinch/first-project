// Currency Converter API test
const settings = {
	async: true,
	crossDomain: true,
	url: 'https://currency-converter-pro1.p.rapidapi.com/latest-rates?base=USD',
	method: 'GET',
	headers: {
		'x-rapidapi-key': '122586d94dmsh85bd15fe85ef9a2p1e537bjsn37d5cb377140',
		'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

