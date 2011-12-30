(function ($) {
    var pushData = function (action) {
        var inputData = $('#dataInput').val();
        var failed = [];

        function sendData(start) {
            var end = inputData.indexOf("\n", start + 500000);
            var toSend = (end !== -1) ? inputData.slice(start, end) : inputData.slice(start);
            if (toSend.length > 0) {
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: 'admin',
                    data: {
                        action: action,
                        data: toSend
                    },
                    success: function (data) {
                        var i;
                        if (data.failed && data.failed.length > 0) {
                            var offset = inputData.slice(0, start).match(/\n/g);
                            offset = offset !== null ? offset.length : 0;
                            if (offset > 0) {
                                for (i = 0; i < data.failed.length; i++) {
                                    data.failed[i] += offset;
                                }
                            }
                            failed = failed.concat(data.failed);
                        }
                        if (end !== -1) {
                            sendData(end + 1);
                        } else {
                            alert('Finished' + (failed.length > 0 ? ". The entries below couldn't be processed." : ''));
                            if (failed.length > 0) {
                                var splitedData = inputData.split('\n');
                                for (i = 0; i < failed.length; i++) {
                                    failed[i] = splitedData[failed[i]];
                                }
                                $('#dataInput').val(failed.join('\n'));
                            } else {
                                $('#dataInput').val('');
                            }
                        }
                    }
                });
            }
        }

        sendData(0);
    };

    var onAdminLoad = function () {
        $('#importExpansionData').click(function () {
            pushData('importExpansionData');
        });
        $('#importCardsData').click(function () {
            pushData('importCardsData');
        });
        $('#importImplementedCards').click(function () {
            pushData('importImplementedCards');
        });
        $('#importRequestedCards').click(function () {
            pushData('importRequestedCards');
        });
        $('#importMtgoData').click(function () {
            pushData('importMtgoData');
        });

        $('#registerAccount').click(function () {
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
                    success: function (data) {
                        if (data.success) {
                            alert('Success');
                        } else {
                            alert('Failure');
                        }
                    }
                });
            } else {
                alert('Fields are not optional!');
            }
        });
    };

    $(document).ready(onAdminLoad);
})(jQuery);
