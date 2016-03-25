$ = jQuery;
$(document).ready(function() {
    var favor = [];
    var contra = [];
    var indeciso = [];
    for (var i in deputados) {
        if (deputados[i].politico_impeachment == 'INDECISO')
            indeciso.push(deputados[i]);
        if (deputados[i].politico_impeachment == 'FAVOR')
            favor.push(deputados[i]);
        if (deputados[i].politico_impeachment == 'CONTRA')
            contra.push(deputados[i]);
    }
    console.log(indeciso)
    var deputados_faltam = 171 - contra.length;
    if (deputados_faltam < 0)
        deputados_faltam = 0;
    var percentual = parseInt(100 * deputados_faltam / indeciso.length);
    $('#deputados-faltando').attr('data-number-value', deputados_faltam);
    $('#deputados-percentual').text(percentual + '%');

    var dias_faltam = parseInt((new Date(2016, 3, 11).getTime() - new Date().getTime()) / (3600000*24));
    $('#dias-faltando').attr('data-number-value', dias_faltam);

    var compare = function(a, b) {
        if (a.title < b.title)
            return -1;
        return 1;        
    }

    var listaDeputados = function(lista, table) {
        lista.sort(compare)
        for (var i=0; i<lista.length; i++) {
            var tr = $('<tr>').appendTo(table);
            $('<td>').text(lista[i].title).appendTo(tr);
            $('<td>').text(lista[i].politico_partido + '/' + lista[i].politico_estado).appendTo(tr);
        }
    };

    listaDeputados(contra, $('#deputados-contra'));
    listaDeputados(indeciso, $('#deputados-indecisos'));
    listaDeputados(favor, $('#deputados-favor'));

})
