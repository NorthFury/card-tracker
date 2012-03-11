<%-- 
    Document   : menu
    Created on : Mar 1, 2012, 11:24:46 PM
    Author     : North
--%>

<div id="navigationMenu" class="ui-widget-header" style="margin-bottom: 5px;">
    <a href="admin">Admin</a>
    <a href="stats">Stats</a>
    <a href="cards">Cards</a>
    <div id="loginContainer" style="float: right;"></div>
</div>
<script type="text/javascript">
    (function ($) {
        $('#navigationMenu a').button().each(function () {
            if(location.href.indexOf(this.href) !== -1){
                $(this).button({
                    disabled: true
                });
            }
        });
        var login = Login($);
        login.init({
            container: '#loginContainer'
        });
    }) (jQuery);
</script>