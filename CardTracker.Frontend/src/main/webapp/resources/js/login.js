function Login($) {
    var settings = {};
    var init = function (options) {
        var container, account, loginHtml;
        if (options) {
            $.extend(settings, options);
        }

        container = $(settings.container);
        account = localStorage.getItem('account') || sessionStorage.getItem('account');
        loginHtml = 'Name: <input id="loginName" type="text"/> Password: <input id="loginPassword" type="password"/>';

        var login = function (e) {
            account = {
                name: $('#loginName').val(),
                password: Crypto.MD5($('#loginPassword').val())
            };
            var onSuccess = function (data) {
                if (data.success) {
                    localStorage.setItem('account', JSON.stringify(account));
                    container.html(account.name + ' <a class="ui-button-text logout">Logout</a>');
                    container.find('.logout').button();
                } else {
                    alert('Credidentials not valid. Please try again.');
                }
            };
            if ((e.keyCode || e.which) === 13) {
                $.ajax({
                    url: 'admin',
                    dataType: 'json',
                    data: {
                        action: 'login',
                        name: account.name,
                        password: account.password
                    },
                    success: onSuccess
                });
            }
        };
        var logout = function () {
            localStorage.removeItem('account');
            sessionStorage.removeItem('account');
            container.html(loginHtml);
            $(settings.container + ' input').on('keyup', login);
        };

        if (account) {
            account = JSON.parse(account);
            container.html(account.name + ' <a class="ui-button-text logout">Logout</a>');
            container.find('.logout').button();
        } else {
            container.html(loginHtml);
            $(settings.container + ' input').on('keyup', login);
        }

        container.on('click', '.logout', logout);
    };
    return {
        init: init
    };
}