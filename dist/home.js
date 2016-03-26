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
    $('#deputados-faltando').attr('data-number-value', deputados_faltam);
    $('#deputados-percentual').text(percentual + '%');

    $('.num-deputados-contra').text(contra_comissao.length);
    $('.num-deputados-indecisos').text(indeciso_comissao.length);
    $('.num-deputados-favor').text(favor_comissao.length);

    var dias_faltam = parseInt((new Date(2016, 3, 11).getTime() - new Date().getTime()) / (3600000*24));
    $('#dias-faltando').attr('data-number-value', dias_faltam);

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


    //$('#deputados-contra').append($('<tr class="box"><td colspan="2"><h2>'+contra.length+' Deputados</h2><div>apoiam a democracia</div></td></tr>'))
    // listaDeputados(contra, $('#deputados-contra'));
    listaDeputados(contra_comissao, $('#deputados-contra'));

    //$('#deputados-indecisos').append($('<tr class="box"><td colspan="2"><h2>'+indeciso.length+' Indecisos</h2><div>Pressione!</div></td></tr>'))
    // listaDeputados(indeciso, $('#deputados-indecisos'));
    listaDeputados(indeciso_comissao, $('#deputados-indecisos'));

    //$('#deputados-favor').append($('<tr class="box"><td colspan="2"><h2>'+favor.length+' Golpistas!</h2><div>A história não os perdoará</div></td></tr>'))
    // listaDeputados(favor, $('#deputados-favor'));
    listaDeputados(favor_comissao, $('#deputados-favor'));

})
