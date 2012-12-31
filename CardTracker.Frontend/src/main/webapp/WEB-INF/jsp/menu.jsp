<div id="navigationMenu" class="ui-widget-header" style="margin-bottom: 5px;">
    <a href="admin">Admin</a>
    <a href="stats">Stats</a>
    <a href="cards">Cards</a>
    <div id="loginContainer" style="float: right;"></div>
</div>
<script type="text/javascript">
    require(['jquery', 'core/login'], function($, login) {
        $('#navigationMenu a').button().each(function() {
            if (location.href.indexOf(this.href) !== -1) {
                $(this).button({
                    disabled: true
                });
            }
        });
        login({
            container: '#loginContainer'
        });
    });
</script>
