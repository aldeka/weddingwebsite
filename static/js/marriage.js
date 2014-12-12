$(document).ready(function(){
    var storageName = 'karenheartsblake';

    console.info("My code is " + localStorage[storageName]);

    var getData = function(pw, callbackSuccess, callbackFailure){
        $.ajax({
          url: '/login/',
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          data: JSON.stringify({
            passcode: pw
          }),
          success: function(householdData) {
            data = householdData;
            callbackSuccess(householdData);
          },
          error: function(xhr, status, err) {
            callbackFailure();
          }
        });
    };

    // POST password, get data for that user
    if (localStorage[storageName]) {
        getData(localStorage[storageName],
            function(data){
                renderSite(data);
            }, function(){
                // localStorage code is invalid
                localStorage.removeItem(storageName);
                $('#login').removeClass('hidden');
            });
    } else {
         $('#login').removeClass('hidden');

    }

    $('#login form input').on('focus', function(e) {
        $('#error').addClass('hidden');
    });

    $('#login form').on('submit', function(e){
        e.preventDefault();
        var input = $(this['input-code']).val();
        $(this['input-code']).val('');
        getData(input,
            function(data){
                $('#login').addClass('hidden');
                localStorage.setItem(storageName, input);
                renderSite(data);
            }, function(){
                $('#error').removeClass('hidden');
            });
    });

    var renderSite = function(data){
        console.log(data);
        data['passcode'] = localStorage.getItem(storageName);
        $('#rsvp-form-template').tmpl(data).appendTo("#rsvp-form");

        $('form [name=rsvp-options]').change(function(e){
            if ($(this).attr('value') === "no") {
                $('[type=checkbox]').prop('checked', false);
                $('#fav-song').addClass('hidden');
            } else {
                $('.attendee-list [type=checkbox]').prop('checked', true);
                $('#fav-song').removeClass('hidden');
            }
        });
    };
});