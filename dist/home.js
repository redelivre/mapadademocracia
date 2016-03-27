$ = jQuery;
$(document).ready(function() {
    var getURLParameter = function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }
    var uf = getURLParameter('uf')
    if (uf) {
        uf = uf.substring(0, 2)
    }
    var favor = [];
    var favor_comissao = [];
    var contra = [];
    var contra_comissao = [];
    var indeciso = [];
    var indeciso_comissao = [];
    var precisa = 0;
    for (var i in deputados) {
        if (uf && deputados[i].politico_estado != uf) {
            continue;
        }
        precisa += 1;
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

    precisa = parseInt(precisa / 3 + 1);
    var deputados_faltam = precisa - contra.length;
    if (deputados_faltam < 0)
        deputados_faltam = 0;
    var percentual = parseInt(100 * deputados_faltam / indeciso.length);
    $('#num-plenaria-faltando').attr('data-number-value', deputados_faltam);
    $('.num-plenaria-faltando-text').text(deputados_faltam);
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
            if(addresses.indexOf(e) < 0 && addresses.length < 100){
                addresses.push(e);
            }
        });


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

        var href_mailto="mailto:" + addresses + "?bcc=" + bcc + '&subject=' + subject + '&body=' + body;

        $('#home-acao-' + grupo + ' a.et_pb_promo_button.et_pb_button').attr('href', href_mailto);
    };



    adicionaBotaoCompartilhaco(contra_comissao, contra, 'contra');
    adicionaBotaoCompartilhaco(indeciso_comissao, indeciso, 'indecisos');
    adicionaBotaoCompartilhaco(favor_comissao, favor, 'favor');


    listaDeputados(contra_comissao, $('#lista-comissao-contra'));
    listaDeputados(indeciso_comissao, $('#lista-comissao-indecisos'));
    listaDeputados(favor_comissao, $('#lista-comissao-favor'));

    listaDeputados(contra, $('#lista-plenaria-contra'));
    listaDeputados(indeciso, $('#lista-plenaria-indecisos'));
    listaDeputados(favor, $('#lista-plenaria-favor'));

    var estados = {
        AC: ['Acre', 'do'],
        AL: ['Alagoas', 'de'],
        AP: ['Amapá', 'do'],
        AM: ['Amazonas', 'do'],
        BA: ['Bahia', 'da'],
        CE: ['Ceará', 'do'],
        DF: ['Distrito Federal', 'do'],
        ES: ['Espírito Santo', 'do'],
        GO: ['Goiás', 'de'],
        MA: ['Maranhão', 'do'],
        MT: ['Mato Grosso', 'do'],
        MS: ['Mato Grosso do Sul', 'do'],
        MG: ['Minas Gerais', 'de'],
        PA: ['Pará', 'do'],
        PB: ['Paraíba', 'da'],
        PR: ['Paraná', 	'do'],
        PE: ['Pernambuco', 'de'],
        PI: ['Piauí', 'do'],
        RJ: ['Rio de Janeiro', 'do'],
	RN: ['Rio Grande do Norte', 'do'],
        RS: ['Rio Grande do Sul', 'do'],
        RO: ['Rondônia', 'de'],
        RR: ['Roraima', 'de'],
        SC: ['Santa Catarina', 'de'],
        SP: ['São Paulo', 'de'],
        SE: ['Sergipe', 'de'],
        TO: ['Tocantins', 'do']
    }

    if (uf) {
        $('#nome-estado').text(estados[uf][0]);
        $('#prefixo-estado').text(estados[uf][1]);
        $('.nome-estado').text(estados[uf][0]);
        $('.prefixo-estado').text(estados[uf][1]);
    } else {
        $('#bloco-estado').hide();
        $('.bloco-estado').hide();
    }


})
