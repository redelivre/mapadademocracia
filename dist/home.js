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


    listaDeputados(contra_comissao, $('#lista-comissao-contra'));
    listaDeputados(indeciso_comissao, $('#lista-comissao-indecisos'));
    listaDeputados(favor_comissao, $('#lista-comissao-favor'));

    listaDeputados(contra, $('#lista-plenaria-contra'));
    listaDeputados(indeciso, $('#lista-plenaria-indecisos'));
    listaDeputados(favor, $('#lista-plenaria-favor'));

})
