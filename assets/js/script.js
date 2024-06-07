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

$.ajax(settings).done(function (response) {
	console.log(response);
});
