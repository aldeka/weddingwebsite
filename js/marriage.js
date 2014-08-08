$(document).ready(function(){
    $("img").unveil(200, function(){
        $('[data-spy="scroll"]').each(function () {
          var $spy = $(this).scrollspy('refresh')
        });
    });
    var storageName = 'karenheartsblake';
    var toggleAvailability = function(){
        $('#availability').toggleClass('show');
        $('[data-spy="scroll"]').each(function () {
          var $spy = $(this).scrollspy('refresh')
        });
    };
    $('#availability-toggle').on('click', toggleAvailability);

    if (location.search.split('book=')[1]) {
        $('.email').hide();
        toggleAvailability();
    } else {
        $('.dwolla').hide();
    }
    // console.log("Hello world");
    // console.log(localStorage[storageName]);

    // $.getJSON("test.json", function(response) {
    //     var secretCodes = response;
    //     if (localStorage[storageName] && localStorage[storageName] in secretCodes) {
    //         renderSite(secretCodes[localStorage[storageName]]);
    //     } else {
    //         $('#login').removeClass('hidden');
    //     }

    //     $('#login form input').on('focus', function(e) {
    //         $('#error').addClass('hidden');
    //     });

    //     $('#login form').on('submit', function(e){
    //         e.preventDefault();
    //         var input = $(this.inputCode).val();
    //         $(this.inputCode).val('');
    //         if (input in secretCodes) {
    //             $('#login').addClass('hidden');
    //             localStorage.setItem(storageName, input);
    //             renderSite(secretCodes[input]);
    //         } else {
    //             $('#error').removeClass('hidden');
    //         }
    //     });
    // }).error(function(jqXhr, textStatus, error) {
    //     console.log("ERROR: " + textStatus + ", " + error);
    // });
});

var renderSite = function(codeInfo){
    $('#rsvp-form-template').tmpl(codeInfo).appendTo("#rsvp-form");

    $('form [name=rsvp-options]').change(function(e){
        if ($(this).attr('value') === "no") {
            $('[type=checkbox]').prop('checked', false);
        } else {
            $('.attendee-list [type=checkbox]').prop('checked', true);
        }
    });
};