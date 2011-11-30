(function($) {
    var pushData = function(action){
        if($('#dataInput').val().length > 0) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: 'admin',
                data: {
                    action: action,
                    data: $('#dataInput').val()
                },
                success: function(data){
                    if(data.success)
                        alert('Success');
                    else
                        alert('Failure');
                }
            });
        }
    }

    var onAdminLoad = function() {
        $('#importExpansionData').click(function() {
            pushData('importExpansionData');
        });
        $('#importCardsData').click(function() {
            pushData('importCardsData');
        });
        $('#importImplementedCards').click(function() {
            pushData('importImplementedCards');
        });
        $('#importRequestedCards').click(function() {
            pushData('importRequestedCards');
        });

        $('#registerAccount').click(function() {
            var name, password, email;
            name = $('#name').val();
            password = $('#password').val();
            email = $('#email').val();

            if (name.length && password.length && email.length) {
                password = Crypto.MD5(password);
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: 'admin',
                    data: {
                        action: 'registerAccount',
                        name: name,
                        password: password,
                        email: email
                    },
                    success: function(data){
                        if(data.success)
                            alert('Success');
                        else
                            alert('Failure');
                    }
                });
            } else {
                alert('Fields are not optional!');
            }
        });
    };

    $(document).ready(onAdminLoad);
})(jQuery);
