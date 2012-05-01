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

        var onLoginSuccess = function (data) {
            if (data.success) {
                localStorage.setItem('account', JSON.stringify(account));
                container.html('<a class="accountName">' + account.name + '</a><a class="ui-button-text logout">Logout</a>');
                container.find('.logout').button();
            } else {
                alert('Credidentials not valid. Please try again.');
            }
        };
        var login = function (e) {
            account = {
                name: $('#loginName').val(),
                password: Crypto.MD5($('#loginPassword').val())
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
                    success: onLoginSuccess
                });
            }
        };

        if (account) {
            account = JSON.parse(account);
            $.ajax({
                url: 'admin',
                dataType: 'json',
                data: {
                    action: 'login',
                    name: account.name,
                    password: account.password
                },
                success: onLoginSuccess
            });
        } else {
            container.html(loginHtml);
            $(settings.container + ' input').on('keyup', login);
        }

        var logout = function () {
            localStorage.removeItem('account');
            sessionStorage.removeItem('account');
            container.html(loginHtml);
            $(settings.container + ' input').on('keyup', login);
            $.ajax({
                url: 'admin',
                dataType: 'json',
                data: {
                    action: 'logout'
                }
            });
        };

        var editAccount = function () {
            var onOkClick = function () {
                var email, password, passwordConfirm;
                email = $('#accountEditEmail').val();
                password = $('#accountEditPassword').val();
                passwordConfirm = $('#accountEditPasswordConfirm').val();
                if (password !== passwordConfirm) {
                    alert('Passwords do not match!');
                } else {
                    password = Crypto.MD5(password);
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: 'admin',
                        data: {
                            action: 'updateAccount',
                            newPassword: password,
                            newEmail: email,
                            oldName: account.name
                        },
                        success: function (data) {
                            if (data.success) {
                                alert('Success');
                                account.password = password;
                                localStorage.setItem('account', JSON.stringify(account));
                                accountDialog.dialog('close');
                            } else {
                                alert('Failure');
                            }
                        }
                    });
                }
            };

            if (account) {
                var accountDialog = $('#accountDialog');
                if (accountDialog.length === 0) {
                    accountDialog = $('<div id="accountDialog"></div>');
                    $('body').append(accountDialog);
                    accountDialog.on('click', '.ok', onOkClick);
                    accountDialog.dialog({
                        autoOpen: false,
                        width: 'auto',
                        title: "Account Settings"
                    });
                }

                accountDialog.html('<table><tr><td>Password</td><td><input id="accountEditPassword" type="password"/></td></tr>'
                    + '<tr><td>Confirm Password</td><td><input id="accountEditPasswordConfirm" type="password"/></td></tr>'
                    + '<tr><td>Email</td><td><input id="accountEditEmail" type="text"/></td></tr></table>'
                    + '<a class="ui-button-text ok">OK</a>');
                accountDialog.find('.ok').button();

                accountDialog.dialog('open');
            }
        };

        container.on('click', '.logout', logout);
        container.on('click', '.accountName', editAccount);
    };
    return {
        init: init
    };
}
