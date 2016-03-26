var googleDocsCms = require('google-docs-cms');

var id = '1H_cnrYN6GjkTNynyL4PpJLMdIP-kaLrrOdtyukrwcAs';

googleDocsCms({id: id}).then(function(res) {
    var deputados = res['Todos os Deputados'].map (function (dep){
        dep.politico_comissao = (dep.politico_comissao === 'sim') ? true : false;
        return dep;
    })
    console.log(JSON.stringify(deputados));
})
