$ = jQuery;
$(document).ready(function() {
    var getURLParameter = function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }
    var deputado = deputados[getURLParameter('id')]

    if (deputado !== undefined) {

        var pessoa = $('#nome-deputado').find('h1');
        pessoa.text(deputado.title);

        var foto = $('#imagem-deputado').find('img');
        foto.attr('src', 'http://placardaprevidencia.com.br/files/fotos/' + deputado.politico_picture)
        foto.attr('alt', deputado.title)

        var partido = $('#partido-deputado').find('h1');
        partido.text(deputado.politico_partido + ' / ' + deputado.politico_estado);

        var posicao = $('#posicao-deputado');
        var posicao_sufixo = $('#posicao-sufixo-deputado');

        if (deputado.politico_impeachment == 'INDECISO') {
            posicao.text('INDECISO');
            posicao_sufixo.text(' em relação à reforma da previdência');
        }
        if (deputado.politico_impeachment == 'FAVOR') {
            posicao.text('A FAVOR');
            posicao_sufixo.text(' da reforma da previdência');
        }
        if (deputado.politico_impeachment == 'CONTRA') {
            posicao.text('CONTRA');
            posicao_sufixo.text(' a reforma da previdência');
        }

        var facebook = $('#facebook-deputado');
        if (deputado.politico_facebook) {
            facebook.attr('href', deputado.politico_facebook)
            // var facebook_url = deputado.politico_facebook
        } else {
            facebook.hide();
        }

        var twitter = $('#twitter-deputado');
        if (deputado.politico_twitter) {
            var parts = deputado.politico_twitter.split("/");
            var twitter_alias = parts[parts.length - 1];
            var twitter_url = 'https://twitter.com/intent/tweet?text=@' + twitter_alias + ' Vote%20%20Contra%20o%20Impeachment de%20Dilma.%20N%C3%A3o%20h%C3%A1%20nenhuma%20base%20legal%20para%20afast%C3%A1-la.&hashtags=GolpeNuncaMais&url=http%3A//placardaprevidencia.com.br'
            twitter.attr('href', twitter_url);
            // var msg_twitter = $('#posicao-deputado');
        } else {
            twitter.hide();
        }

        var email = $('#email-deputado');
        if (deputado.politico_email) {
            var email_body = '';
            if(deputados[i].politico_mulher == 'SIM') {
              email_body = 'Excelentíssima Senhora Deputada Federal ' + deputado.title + ',%0D%0A%0D%0A\n';
            } else {
              email_body = 'Excelentíssimo Senhor Deputado Federal ' + deputado.title + ',%0D%0A%0D%0A\n';
            }

            email_body += 'Gostaria de contar com o apoio de V.Exa. no sentido de garantir que não sejam retirados direitos dos trabalhadores brasileiros na reforma da Previdência Social (PEC 287/16) patrocinada pelo governo federal, rejeitando na íntegra a proposta governamental.%0D%0A%0D%0A\n' +
            'Entendo que é urgente e necessária uma ampla e profunda discussão acerca da arrecadação do Sistema de Seguridade Social Brasileiro e a desvinculação das receitas da União (DRU), de modo a apurar a real existência de déficit da Previdência no País, divulgado pelo governo em sua campanha como justificativa para as reformas.%0D%0A%0D%0A\n' +
            'Assim sendo, quero contar com seu apoio para rejeitar qualquer proposta de retirada dos direitos dos trabalhadores.%0D%0A%0D%0A%0D%0A\n\n' +
            'Acompanharei seu voto!%0D%0A%0D%0A\n' +
            'Cordialmente,%0D%0A%0D%0A\n';

            var url_email = 'mailto:' + deputado.politico_email + '?bcc=mapadademocracia@culturalivre.org&subject=Excelentissimo Deputado Federal&body=' + email_body;
            email.attr('href', url_email);
        } else {
            email.hide();
        }

        var telefone = $('#telefone-deputado');
        if (deputado.politico_phone) {
            var fone_href = 'tel:+5561' + deputado.politico_phone;
            telefone.attr('href', fone_href);
            $('#telefone-deputado-span').html('+5561' + deputado.politico_phone)
        } else {
            telefone.hide();
        }

        var erro_deputado = $('.et_pb_promo_button');
        var erro_deputado_email_body = 'Link da página: '+ window.location.href + '%0D%0A%0D%0ADescreva aqui o erro que encontrou:';
        var erro_deputado_url_email = 'mailto:mapadademocracia@culturalivre.org' +
            '?subject=Erro na página do Deputado(a) ' +
            deputado.title +
            '&body=' +
            erro_deputado_email_body;

        erro_deputado.attr('href', erro_deputado_url_email);
    }
})
