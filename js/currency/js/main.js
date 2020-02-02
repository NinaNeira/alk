$(document).ready(function() {
    function getRating() {
        $('.btn').on('click', function(){

            if($('input[name="currency-1"]').val()) {
                const amount = $('input[name="currency-1"]').val(),
                      result = $('input[name="currency-2"]'),
                      currencyOne = $('#currency-1 option:selected').text(),
                      currencyTwo = $('#currency-2 option:selected').text();

                $.get('http://data.fixer.io/api/latest?access_key=66731dd1c4ae166818a3d2fac6cef489&symbols=EUR,USD,PLN', function(data){
                    const USD = data.rates[Object.keys(data.rates)[1]],
                          PLN = data.rates[Object.keys(data.rates)[2]];
    
                    switch (true) {
                        case currencyOne == currencyTwo:
                            result.val(amount);
                            break;

                        case currencyOne == 'EUR':
                            $.get('http://data.fixer.io/api/latest?access_key=66731dd1c4ae166818a3d2fac6cef489&symbols=' + currencyTwo, function(data){
                                let rate = data.rates[Object.keys(data.rates)[0]];
                                result.val(Math.round((amount * rate) * 1000) / 1000);
                            });
                            break;
                        case currencyOne == 'PLN':
                            $.get('http://data.fixer.io/api/latest?access_key=66731dd1c4ae166818a3d2fac6cef489&symbols=' + currencyTwo, function(data){
                                let rate = data.rates[Object.keys(data.rates)[0]] / PLN;
                                result.val(Math.round((amount * rate) * 1000) / 1000);
                            });
                            break;
                        case currencyOne == 'USD':
                            $.get('http://data.fixer.io/api/latest?access_key=66731dd1c4ae166818a3d2fac6cef489&symbols=' + currencyTwo, function(data){
                                let rate = data.rates[Object.keys(data.rates)[0]] / USD;
                                result.val(Math.round((amount * rate) * 1000) / 1000);
                            });
                            break;    
                        default:
                            console.log('No data.');
                      }
                  });

            }
        });
    }

    getRating();
});