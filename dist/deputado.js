$ = jQuery;
$(document).ready(function() {
    var getURLParameter = function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }
    var deputado = deputados[getURLParameter('id')]

    if (deputado !== undefined) {

        var pessoa = $('#nome-deputado').find('strong');
        pessoa.text(deputado.title);

        var foto = $('#imagem-deputado').find('img');
        foto.attr('src', 'http://mapadademocracia.org.br/files/fotos/' + deputado.politico_picture)
        foto.attr('alt', deputado.title)

        var partido = $('#partido-deputado').find('strong');
        partido.text(deputado.politico_partido + ' / ' + deputado.politico_estado);

        var posicao = $('#posicao-deputado');
        var posicao_sufixo = $('#posicao-sufixo-deputado');

        if (deputado.politico_impeachment == 'INDECISO') {
            posicao.text('INDECISO');
            posicao_sufixo.text(' em relação ao Golpe');
        }
        if (deputado.politico_impeachment == 'FAVOR') {
            posicao.text('À FAVOR');
            posicao_sufixo.text(' do Golpe');
        }
        if (deputado.politico_impeachment == 'CONTRA') {
            posicao.text('CONTRA');
            posicao_sufixo.text(' o Golpe');
        }

        var facebook = $('#facebook-deputado');
        facebook.attr('href', deputado.politico_facebook)
        // var facebook_url = deputado.politico_facebook

        var twitter = $('#twitter-deputado');

        var parts = deputado.politico_twitter.split("/");
        var twitter_alias = parts[parts.length - 1];
        var twitter_url = 'https://twitter.com/intent/tweet?text=@' + twitter_alias + ' Vote%20%20Contra%20o%20Impeachment de%20Dilma.%20N%C3%A3o%20h%C3%A1%20nenhuma%20base%20legal%20para%20afast%C3%A1-la.&hashtags=GolpeNuncaMais&url=http%3A//mapadademocracia.org.br'
        twitter.attr('href', twitter_url);
        // var msg_twitter = $('#posicao-deputado');

        var email = $('#email-deputado');
        var url_email = 'mailto:' + deputado.politico_email;
        email.attr('href', url_email);

        var telefone = $('#telefone-deputado');
        var fone_href = 'tel:+5561' + deputado.politico_phone;
        telefone.attr('href', fone_href);
    }
})
