$ = jQuery;
$(document).ready(function() {
    var favor = 0;
    var contra = 0;
    var indeciso = 0;
    for (var i in deputados) {
        if (deputados[i].politico_impeachment == 'INDECISO')
            indeciso++;
        if (deputados[i].politico_impeachment == 'FAVOR')
            favor++;
        if (deputados[i].politico_impeachment == 'CONTRA')
            contra++;
    }
    var deputados_faltam = 171 - contra;
    if (deputados_faltam < 0)
        deputados_faltam = 0;
    var percentual = parseInt(100 * deputados_faltam / indeciso);
    $('#deputados-faltando').attr('data-number-value', deputados_faltam);
    $('#deputados-percentual').text(percentual + '%');

    var dias_faltam = parseInt((new Date(2016, 3, 11).getTime() - new Date().getTime()) / (3600000*24));
    $('#dias-faltando').attr('data-number-value', dias_faltam);
})
