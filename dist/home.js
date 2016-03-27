$ = jQuery;
$(document).ready(function() {
    var favor = [];
    var favor_comissao = [];
    var contra = [];
    var contra_comissao = [];
    var indeciso = [];
    var indeciso_comissao = [];
    for (var i in deputados) {
        if (deputados[i].politico_impeachment == 'INDECISO') {
            indeciso.push(deputados[i]);
            if (deputados[i].politico_comissao) {
                indeciso_comissao.push(deputados[i]);
            }
        }
        if (deputados[i].politico_impeachment == 'FAVOR') {
            favor.push(deputados[i]);
            if (deputados[i].politico_comissao) {
                favor_comissao.push(deputados[i]);
            }
        }
        if (deputados[i].politico_impeachment == 'CONTRA') {
            contra.push(deputados[i]);
            if (deputados[i].politico_comissao) {
                contra_comissao.push(deputados[i]);
            }
        }
    }

    var deputados_faltam = 171 - contra.length;
    if (deputados_faltam < 0)
        deputados_faltam = 0;
    var percentual = parseInt(100 * deputados_faltam / indeciso.length);
    $('#num-plenaria-faltando').attr('data-number-value', deputados_faltam);
    $('#percentual-plenaria-faltando').text(percentual + '%');

    $('.num-comissao-contra').text(contra_comissao.length);
    $('.num-comissao-indecisos').text(indeciso_comissao.length);
    $('.num-comissao-favor').text(favor_comissao.length);

    $('.num-plenaria-contra').text(contra.length);
    $('.num-plenaria-indecisos').text(indeciso.length);
    $('.num-plenaria-favor').text(favor.length);

    var dias_faltam = parseInt((new Date(2016, 3, 11).getTime() - new Date().getTime()) / (3600000*24));
    $('#num-dias-faltando').attr('data-number-value', dias_faltam);

    var compare = function(a, b) {
        if (a.politico_comissao && !b.politico_comissao) {
            return -1;
        }
        if (!a.politico_comissao && b.politico_comissao) {
            return 1;
        }
        return Math.random() - 0.5;
    }

    var listaDeputados = function(lista, table) {
        // lista.sort(compare)
        for (var i=0; i<lista.length; i++) {
            var tr = $('<tr>').addClass('deputado').appendTo(table);
            var a = $('<a>').attr('href', 'deputado?id='+lista[i].politico_id_planilha).text(lista[i].title)
            $('<td>').append(a).appendTo(tr);
            //$('<td>').text(lista[i].title).appendTo(tr);
            $('<td>').text(lista[i].politico_partido + '/' + lista[i].politico_estado).appendTo(tr);
        }
    };

    var adicionaBotaoCompartilhaco = function(comissao, deputados, grupo) {
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
        var addresses = comissao.map(function(e){ return e.politico_email; });
        var _addresses = shuffleArray(deputados.map(function(e){ return e.politico_email; }));

        _addresses.forEach(function(e){
            if(addresses.indexOf(e) < 0 && addresses.length < 130){
                addresses.push(e);
            }
        });
        

        console.log(grupo, addresses.length);

        var bcc = "mapadademocracia@culturalivre.org";

        addresses = addresses.join(',');
        
        var subject = "Excelentissimo Deputado Federal";

        var body = 'Exmo. Deputado,%0D%0A%0D%0A\n'+
                    'Nossa democracia está em risco! A conduta política no judiciário brasileiro e as arbitrariedades na condução da Lava Jato estão colocando sob ameaça nosso estado democrático de direito. A investigação que deveria ser um processo formalmente jurídico, a cada dia, deixa mais evidente sua natureza política e o objetivo de abrir caminhos para o golpe.%0D%0A%0D%0A\n' +
                    'O processo de impeachment tem de ser denunciado e enfrentado, tendo em vista que extrapola os termos da legalidade. O impeachment é um processo de punição por crime de responsabilidade, no entanto não há provas de que tais crimes tenham sido cometidos no governo Dilma Rousseff.%0D%0A%0D%0A\n' +
                    'A Presidenta é acusada, por aqueles que defendem seu afastamento de ter cometido pedaladas fiscais. De fato, a conduta, que visa a dar certa aura de equilíbrio às contas públicas em momentos de aperto de caixa, não é boa prática de finança pública. No entanto, não se configura como crime de responsabilidade. Observe que 16 dos 27 governadores do país que também teriam cometido pedalas fiscais não estão respondendo por processos de impeachment, deixando claro o caráter golpista.%0D%0A%0D%0A\n' +
                    'No nosso país o processo de impeachment não deve ser utilizado quando a população se sente insatisfeita com o não cumprimento de promessas eleitorais, quando a oposição não aceita os resultados obtidos nas urnas e também não é o foro adequado para estabelecer uma catarse contra o estado endêmico de corrupção nacional.%0D%0A%0D%0A\n' +
                    'O processo está sendo tocado a toque de caixa pelo deputado Eduardo Cunha sob o qual existem investigações de desvio de dinheiro e contas na suíça, em uma comissão com 34 investigados pelo Supremo Tribunal Federal. Caso aprovada a votação irá para a Câmara dos Deputados onde 271 deputados enfrentam acusações que vão da fraude ao homicídio.%0D%0A%0D%0A\n' +
                    'Aprovar o impeachment da presidenta significa escrever na história um episódio de golpe, protagonizado pelo judiciário, validado pelo congresso e inflamado pela mídia. Promover o impeachment da presidente é abrir um precedente para que o direito de presunção de inocência seja determinado pela opinião pública e não pela lei.%0D%0A%0D%0A%0D%0A\n\n' +
                    '#ContraOImpeachment #GolpeNuncaMais%0D%0A%0D%0A\n';

        var href_mailto="mailto:?to=" + addresses + "?bcc=" + bcc + '&subject=' + subject + '&body=' + body;
        
        var button_mailto = $('a.js-mailto-' + grupo).attr('target','_blank').attr('href', href_mailto);

        $('#home-acao-' + grupo + ' a.et_pb_promo_button.et_pb_button').append(button_mailto);
    };

    

    adicionaBotaoCompartilhaco(contra_comissao, contra, 'contra');
    adicionaBotaoCompartilhaco(indeciso_comissao, indeciso, 'indecisos');
    adicionaBotaoCompartilhaco(favor_comissao, favor, 'favor');
    
    



// <a href="mailto:dep.osmarterra@camara.leg.br,dep.luciovieiralima@camara.leg.br,dep.mauromariani@camara.leg.br,dep.leonardoquintao@camara.leg.br,dep.washingtonreis@camara.leg.br,dep.leonardopicciani@camara.leg.br,dep.joaomarcelosouza@camara.leg.br,dep.valtenirpereira@camara.leg.br,dep.henriquefontana@camara.leg.br,dep.wadihdamous@camara.leg.br,dep.pauloteixeira@camara.leg.br,dep.vicentecandido@camara.leg.br,dep.josementor@camara.leg.br,dep.arlindochinaglia@camara.leg.br,dep.pepevargas@camara.leg.br,dep.zegeraldo@camara.leg.br,dep.carlossampaio@camara.leg.br,dep.brunocovas@camara.leg.br,dep.sheridan@camara.leg.br,dep.jutahyjunior@camara.leg.br,dep.nilsonleitao@camara.leg.br,dep.pauloabiackel@camara.leg.br,dep.jeronimogoergen@camara.leg.br,dep.paulomaluf@camara.leg.br,dep.aguinaldoribeiro@camara.leg.br,dep.juliolopes@camara.leg.br,dep.robertobritto@camara.leg.br,dep.mauricioquintellalessa@camara.leg.br,dep.ediolopes@camara.leg.br,dep.joserocha@camara.leg.br,dep.zenaidemaia@camara.leg.br,dep.juliocesar@camara.leg.br,dep.paulomagalhaes@camara.leg.br,dep.rogeriorosso@camara.leg.br,dep.marcosmontes@camara.leg.br,dep.fernandocoelhofilho@camara.leg.br,dep.daniloforte@camara.leg.br,dep.tadeualencar@camara.leg.br,dep.bebeto@camara.leg.br,dep.jovairarantes@camara.leg.br,dep.benitogama@camara.leg.br,dep.luizcarlosbusato@camara.leg.br,dep.rodrigomaia@camara.leg.br,dep.mendoncafilho@camara.leg.br,dep.elmarnascimento@camara.leg.br,dep.flavionogueira@camara.leg.br,dep.wevertonrocha@camara.leg.br,dep.fernandofrancischini@camara.leg.br,dep.paulopereiradasilva@camara.leg.br,dep.erosbiondini@camara.leg.br,dep.ronaldofonseca@camara.leg.br,dep.eduardobolsonaro@camara.leg.br,dep.pr.marcofeliciano@camara.leg.br,dep.jhonatandejesus@camara.leg.br,dep.marcelosquassoni@camara.leg.br,dep.evairdemelo@camara.leg.br,dep.jandirafeghali@camara.leg.br,dep.alexmanente@camara.leg.br,dep.chicoalencar@camara.leg.br,dep.bacelar@camara.leg.br,dep.alielmachado@camara.leg.br,dep.welitonprado@camara.leg.br,dep.juniormarreca@camara.leg.br,dep.marceloaro@camara.leg.br,dep.silviocosta@camara.leg.br&amp;bcc=cidadania2@catracalivre.com.br&amp;subject=N%C3%A3o%20vai%20ter%20golpe!&amp;body=Excelent%C3%ADssimos%20deputados%20da%20Comiss%C3%A3o%20Especial%20do%20Impeachment.%0A%0AAcredito%20que%20o%20processo%20de%20Impeachment%20contra%20a%20Presidenta%20Dilma%20Rousseff%20%C3%A9%20um%20golpe%20na%20democracia%20brasileira.%20%0A%0ACordialmente%2C%0A" target="_blank">Se você é <strong>contra</strong> o impeachment, clique aqui e envie o seu e-mail.</a>

    listaDeputados(contra_comissao, $('#lista-comissao-contra'));
    listaDeputados(indeciso_comissao, $('#lista-comissao-indecisos'));
    listaDeputados(favor_comissao, $('#lista-comissao-favor'));

    listaDeputados(contra, $('#lista-plenaria-contra'));
    listaDeputados(indeciso, $('#lista-plenaria-indecisos'));
    listaDeputados(favor, $('#lista-plenaria-favor'));

})
