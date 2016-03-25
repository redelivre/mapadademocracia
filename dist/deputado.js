$ = jQuery;
$(document).ready(function() {
    var getURLParameter = function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }
    var deputado = deputados[getURLParameter('id')]

    var pessoa = $('.et_pb_team_member')
    var foto = pessoa.find('.et_pb_team_member_image img')
    foto.attr('src', 'http://mapadademocracia.org.br/files/fotos/' + deputado.politico_picture)
    foto.attr('alt', deputado.title)

    pessoa.find('.et_pb_team_member_description h4').text(deputado.title);
})
