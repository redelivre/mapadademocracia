$ = jQuery;
$(document).ready(function() {
    var getURLParameter = function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }
    var uf = getURLParameter('uf')
    if (uf) {
        uf = uf.substring(0, 2)
    }
    var partido = getURLParameter('partido')
    if (partido && partido[partido.length-1] == '/') {
        partido = partido.substring(0, partido.length-1)
    }
    var favor = [];
    var favor_comissao = [];
    var contra = [];
    var contra_comissao = [];
    var indeciso = [];
    var indeciso_comissao = [];
    var todos_comissao = [];
    var todos = [];
    var precisa = 0;
    for (var i in deputados) {
        if (uf && deputados[i].politico_estado != uf) {
            continue;
        }
        if (partido && deputados[i].politico_partido != partido) {
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
        todos.push(deputados[i])
        if (deputados[i].politico_comissao) {
            todos_comissao.push(deputados[i]);
        }
    }

    precisa = parseInt(precisa / 3 + 1);
    var deputados_faltam = precisa - contra.length;
    if (deputados_faltam < 0)
        deputados_faltam = 0;
    var percentual = parseInt(100 * deputados_faltam / indeciso.length);
    $('#num-plenaria-faltando').attr('data-number-value', deputados_faltam);
    $('.num-plenaria-faltando-text').text(deputados_faltam);
    $('.num-plenaria-faltando').text(deputados_faltam);
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

        function mapEmail(e){
            return e.politico_email;
        }


        var addresses = comissao.map(mapEmail);
        var _addresses = shuffleArray(deputados.map(mapEmail));

        _addresses.forEach(function(e){
            if(addresses.indexOf(e) < 0 && addresses.length < 100){
                addresses.push(e);
            }
        });


        var bcc = "mapadademocracia@culturalivre.org";

        
        addresses = addresses.join(',');

        var element = $('#home-acao-' + grupo + ' span.message-data')
        var subject;
        var body;

        if (element.length > 0) {
            var subjects = element.find('subject');
            var index = Math.floor(Math.random() * (subjects.length));
            subject = $(subjects[index]).text();
            
            body = element.find('msg-body').text().replace(/\n/g, '%0D%0A%0D%0A\n');
            element.hide();
        } else {
            subject = "Excelentissimo Deputado Federal";
            body = 'Exmo. Deputado,%0D%0A%0D%0A\n'+
                    'Nossa democracia está em risco! A conduta política no judiciário brasileiro e as arbitrariedades na condução da Lava Jato estão colocando sob ameaça nosso estado democrático de direito. A investigação que deveria ser um processo formalmente jurídico, a cada dia, deixa mais evidente sua natureza política e o objetivo de abrir caminhos para o golpe.%0D%0A%0D%0A\n' +
                    'O processo de impeachment tem de ser denunciado e enfrentado, tendo em vista que extrapola os termos da legalidade. O impeachment é um processo de punição por crime de responsabilidade, no entanto não há provas de que tais crimes tenham sido cometidos no governo Dilma Rousseff.%0D%0A%0D%0A\n' +
                    'A Presidenta é acusada, por aqueles que defendem seu afastamento de ter cometido pedaladas fiscais. De fato, a conduta, que visa a dar certa aura de equilíbrio às contas públicas em momentos de aperto de caixa, não é boa prática de finança pública. No entanto, não se configura como crime de responsabilidade. Observe que 16 dos 27 governadores do país que também teriam cometido pedalas fiscais não estão respondendo por processos de impeachment, deixando claro o caráter golpista.%0D%0A%0D%0A\n' +
                    'No nosso país o processo de impeachment não deve ser utilizado quando a população se sente insatisfeita com o não cumprimento de promessas eleitorais, quando a oposição não aceita os resultados obtidos nas urnas e também não é o foro adequado para estabelecer uma catarse contra o estado endêmico de corrupção nacional.%0D%0A%0D%0A\n' +
                    'O processo está sendo tocado a toque de caixa pelo deputado Eduardo Cunha sob o qual existem investigações de desvio de dinheiro e contas na suíça, em uma comissão com 34 investigados pelo Supremo Tribunal Federal. Caso aprovada a votação irá para a Câmara dos Deputados onde 271 deputados enfrentam acusações que vão da fraude ao homicídio.%0D%0A%0D%0A\n' +
                    'Aprovar o impeachment da presidenta significa escrever na história um episódio de golpe, protagonizado pelo judiciário, validado pelo congresso e inflamado pela mídia. Promover o impeachment da presidente é abrir um precedente para que o direito de presunção de inocência seja determinado pela opinião pública e não pela lei.%0D%0A%0D%0A%0D%0A\n\n' +
                    '#ContraOImpeachment #GolpeNuncaMais%0D%0A%0D%0A\n';
        }

        var href_mailto="mailto:" + addresses + "?bcc=" + bcc + '&subject=' + subject + '&body=' + body;

        
        if(isMobile.any){
            return;
        }



        var urls = {
          'gmail'   : 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&shva=1' + 
                      '&to='      + addresses +
                      '&bcc='     + bcc +         
                      '&su='      + subject +
                      '&body='    + body,
          'yahoo'   : 'https://compose.mail.yahoo.com/?' +
                      'to='       + comissao.map(mapEmail).join(',') +
                      '&bcc='     + bcc +
                      '&subject='    + subject +
                      '&body='    + body,
          'hotmail' : 'https://mail.live.com/#viewmodel=IMailComposeViewModelFactory' +
                      '&to='      + comissao.slice(0,1).map(mapEmail).join(',')
                      // '&cco='     + bcc +
                      // '&bcc='     + bcc +
                      // '&subject=' + subject +
                      // '&body='    + body
        }

        $addresses = $('<div id="emails-' + grupo + '">')
            .css({position:'absolute', display:'none', width:'1px', height:'1px', overflow:'hidden'})
            .text(deputados.map(mapEmail).join(','))

        $(document.body).append($addresses);

        console.log($addresses);

        var $button = $('#home-acao-' + grupo + ' a.et_pb_promo_button.et_pb_button')
            .attr('href', href_mailto);



        var $div = $('<div>')
            .css({textAlign: 'center', marginTop: '10px', marginLeft: '-25px', marginRight: '-25px'});

        var $a = $('<a>')
            .css({textDecoration: 'underline', color:'white'})
            .text('Não funcionou?')
            .click(function(){
                $box.slideDown('fast');
            })
            .appendTo($div);

        var $box = $('<div>Tente uma das alternativas abaixo:<br></div>')
            .css({background:'rgba(0,0,0,.2)', display: 'none', padding: '10px', marginTop: '15px', fontSize: '13px'})
            .appendTo($div);

        var webmailCss = {color:'white', margin: '5px', fontSize:'13px', marginTop: '15px', display:'inline-block'};


        var $gmail = $('<a class="webmail-button et_pb_button"></a>')
            .data('url', urls.gmail)
            .css(webmailCss)
            .text('Gmail')
            .appendTo($box);

        // var $hotmail = $('<a class="webmail-button et_pb_button"></a>')
        //     .data('url', urls.hotmail)
        //     .css(webmailCss)
        //     .text('Hotmail')
        //     .appendTo($box);

        // var $yahoo = $('<a class="webmail-button et_pb_button"></a>')
        //     .data('url', urls.yahoo)
        //     .css(webmailCss)
        //     .text('Yahoo')
        //     .appendTo($box);

        [$gmail/*, $yahoo, $hotmail */].forEach(function($e){
            $e.click(function(){
                var newWindow = window.open($(this).data('url'), '_blank', 'location=0,statusbar=0,menubar=0,width=600,height=600');
            });
        });

        $('<p>')
            .text('Se você não usa o Gmail, você pode clicar nos botões abaixo para copiar os endereços de email dos deputados e o corpo do email para a área de transferência.')
            .appendTo($box)

        var $clipboard_emails = $('<a class="et_pb_button"></a>')
            .css(webmailCss).css('display', 'block')
            .text('Copiar todos os emails')
            .appendTo($box)
            .click(function(){
                copyToClipboard(document.getElementById('emails-' + grupo));
                $(this).focus();
                return false;
            });

        var $clipboard_emails = $('<a class="et_pb_button"></a>')
            .css(webmailCss).css('display', 'block')
            .text('Copiar texto do email')
            .appendTo($box)
            .click(function(){
                copyToClipboard(document.getElementById('emails-' + grupo));
                $(this).focus();
                return false;
            });



        $div.find('a').css('cursor', 'pointer');

        $button.after($div);
    };



    adicionaBotaoCompartilhaco(contra_comissao, contra, 'contra');
    adicionaBotaoCompartilhaco(indeciso_comissao, indeciso, 'indecisos');
    adicionaBotaoCompartilhaco(favor_comissao, favor, 'favor');
    adicionaBotaoCompartilhaco(todos_comissao, todos, 'todos');


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

    if (partido) {
        $('.nome-partido').text(partido);
    } else {
        $('.bloco-partido').hide();
    }

});




/**
 * isMobile.js v0.4.0
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
(function (global) {

    var apple_phone         = /iPhone/i,
        apple_ipod          = /iPod/i,
        apple_tablet        = /iPad/i,
        android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet      = /Android/i,
        amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        windows_phone       = /IEMobile/i,
        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry    = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera         = /Opera Mini/i,
        other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp(
            '(?:' +         // Non-capturing group

            'Nexus 7' +     // Nexus 7

            '|' +           // OR

            'BNTV250' +     // B&N Nook Tablet 7 inch

            '|' +           // OR

            'Kindle Fire' + // Kindle Fire

            '|' +           // OR

            'Silk' +        // Kindle Fire, Silk Accelerated

            '|' +           // OR

            'GT-P1000' +    // Galaxy Tab 7 inch

            ')',            // End non-capturing group

            'i');           // Case-insensitive matching

    var match = function(regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function(userAgent) {
        var ua = userAgent || navigator.userAgent;

        // Facebook mobile app's integrated browser adds a bunch of strings that
        // match everything. Strip it out if it exists.
        var tmp = ua.split('[FBAN');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        // Twitter mobile app's integrated browser on iPad adds a "Twitter for
        // iPhone" string. Same probable happens on other tablet platforms.
        // This will confuse detection so strip it out if it exists.
        tmp = ua.split('Twitter');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        this.apple = {
            phone:  match(apple_phone, ua),
            ipod:   match(apple_ipod, ua),
            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.amazon = {
            phone:  match(amazon_phone, ua),
            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
        };
        this.android = {
            phone:  match(amazon_phone, ua) || match(android_phone, ua),
            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone:  match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry:   match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera:        match(other_opera, ua),
            firefox:      match(other_firefox, ua),
            chrome:       match(other_chrome, ua),
            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;

        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;

        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function() {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    if (typeof module !== 'undefined' && module.exports && typeof window === 'undefined') {
        //node
        module.exports = IsMobileClass;
    } else if (typeof module !== 'undefined' && module.exports && typeof window !== 'undefined') {
        //browserify
        module.exports = instantiate();
    } else if (typeof define === 'function' && define.amd) {
        //AMD
        define('isMobile', [], global.isMobile = instantiate());
    } else {
        global.isMobile = instantiate();
    }

})(this);


function copyToClipboard(elem) {
      // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
          succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}