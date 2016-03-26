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
        var email_body = 'Exmo. Deputado OSMAR TERRA,%0D%0A%0D%0A\n' +
                         'Nossa democracia está em risco! A conduta política no judiciário brasileiro e as arbitrariedades na condução da Lava Jato estão colocando sob ameaça nosso estado democrático de direito. A investigação que deveria ser um processo formalmente jurídico, a cada dia, deixa mais evidente sua natureza política e o objetivo de abrir caminhos para o golpe.%0D%0A%0D%0A\n' +
                         'O processo de impeachment tem de ser denunciado e enfrentado, tendo em vista que extrapola os termos da legalidade. O impeachment é um processo de punição por crime de responsabilidade, no entanto não há provas de que tais crimes tenham sido cometidos no governo Dilma Rousseff.%0D%0A%0D%0A\n' +
                         'A Presidenta é acusada, por aqueles que defendem seu afastamento de ter cometido pedaladas fiscais. De fato, a conduta, que visa a dar certa aura de equilíbrio às contas públicas em momentos de aperto de caixa, não é boa prática de finança pública. No entanto, não se configura como crime de responsabilidade. Observe que 16 dos 27 governadores do país que também teriam cometido pedalas fiscais não estão respondendo por processos de impeachment, deixando claro o caráter golpista.%0D%0A%0D%0A\n' +
                         'No nosso país o processo de impeachment não deve ser utilizado quando a população se sente insatisfeita com o não cumprimento de promessas eleitorais, quando a oposição não aceita os resultados obtidos nas urnas e também não é o foro adequado para estabelecer uma catarse contra o estado endêmico de corrupção nacional.%0D%0A%0D%0A\n' +
                         'O processo está sendo tocado a toque de caixa pelo deputado Eduardo Cunha sob o qual existem investigações de desvio de dinheiro e contas na suíça, em uma comissão com 34 investigados pelo Supremo Tribunal Federal. Caso aprovada a votação irá para a Câmara dos Deputados onde 271 deputados enfrentam acusações que vão da fraude ao homicídio.%0D%0A%0D%0A\n' +
                         'Aprovar o impeachment da presidenta significa escrever na história um episódio de golpe, protagonizado pelo judiciário, validado pelo congresso e inflamado pela mídia. Promover o impeachment da presidente é abrir um precedente para que o direito de presunção de inocência seja determinado pela opinião pública e não pela lei.%0D%0A%0D%0A%0D%0A\n\n' +
                         '#ContraOImpeachment #GolpeNuncaMais%0D%0A%0D%0A\n';
        var url_email = 'mailto:' + deputado.politico_email + '?bcc=mapadademocracia@culturalivre.org&subject=Excelentissimo Deputado Federal&body=' + email_body;
        email.attr('href', url_email);

        var telefone = $('#telefone-deputado');
        var fone_href = 'tel:+5561' + deputado.politico_phone;
        telefone.attr('href', fone_href);
    }
})
