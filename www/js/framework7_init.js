var myApp = new Framework7({
    pushState: true,
    swipePanel: 'left',
    cache: false,
    // ... other parameters
});


var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
})

var $$ = Dom7;

$$(document).on('pageInit', function(e) {
    try {
        updateForm();
    }
    catch (err) {};

    try {
        updateSettingsInfo();
    }
    catch (err) {};

    try {
        updateResults();
    }
    catch (err) {};
    
    try {
        $('#id').bind('input', function() {
            if ($(this).val() === "") {
                // you need an ID
                $("#submit").addClass("disabled");
            }
            else {
                $("#submit").removeClass("disabled");
            }
        });
        
    }
    catch (err) {};

});
