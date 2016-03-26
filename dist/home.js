$ = jQuery;
window.deputadosPromise = $.get('/fixture/fixture.json');
window.deputadosPromise.fail(function(err) {
    console.error('couldnt get deputados', err)
})

$(document).ready(function() {
    window.deputadosPromise.done(function (deputados) {
        if (! deputados.length) {
            return console.error('problem parsing json', deputados);
        }

        var favor = [];
        var favor_comissao = [];
        var contra = [];
        var contra_comissao = [];
        var indeciso = [];
        var indeciso_comissao = [];
        var malformed = [];

        var impeachementMap ={
            'INDECISO': indeciso,
            'FAVOR': favor,
            'CONTRA': contra
        }

        var comissaoMap ={
            'INDECISO': indeciso_comissao,
            'FAVOR': favor_comissao,
            'CONTRA': contra_comissao
        }

        deputados.forEach(function(deputado){
            if (!deputado.politico_impeachment.match(/(INDECISO|FAVOR|CONTRA)/)) {
                malformed.push(deputado.title);
                console.error('Malformed politico_impeachment field, forcing to indeciso', deputado.politico_impeachment, deputado)
                deputado.politico_impeachment = 'INDECISO'
            }

            impeachementMap[deputado.politico_impeachment].push(deputado);
            if (deputado.politico_comissao)
                comissaoMap[deputado.politico_impeachment].push(deputado);
        })

        malformed.length && console.error('malformed', malformed);

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
})
