(function($) {
    var pushData = function(action){
        var data = $('#dataInput').val();

        function sendData(start) {
            var end = data.indexOf("\n", start + 500000);
            var toSend = (end != -1) ? data.slice(start, end) : data. slice(start);
            if (toSend.length > 0) {
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: 'admin',
                    data: {
                        action: action,
                        data: toSend
                    },
                    success: function(){
                        if (end != -1)
                            sendData(end + 1);
                        else
                            alert('Finished');
                    }
                });
            }
        }

        sendData(0);
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
        $('#importMtgoData').click(function() {
            pushData('importMtgoData');
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
