var googleDocsCms = require('google-docs-cms');

var id = '1H_cnrYN6GjkTNynyL4PpJLMdIP-kaLrrOdtyukrwcAs';

googleDocsCms({id: id}).then(function(res) {
    console.log(JSON.stringify(res));
})
