<%-- 
    Document   : error
    Created on : Feb 6, 2012, 12:21:07 AM
    Author     : North
--%>

<%@page contentType="text/html" pageEncoding="windows-1252"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
        <title>Error Page</title>
        <script type="text/javascript">
            (function () {
                var time = 30;
                var tick = function () {
                    time--;
                    document.getElementById("timer").innerHTML = time;
                    if (time > 0) {
                        setTimeout(tick, 1000);
                    } else {
                        window.location.reload();
                    }
                }
                setTimeout(tick, 1000);
            })();
        </script>
    </head>
    <body>
        <p>The database connection idled out. It will be up again in a minute or two.</p>
        <p>Automatically reloading page in ... <a id="timer"></a> seconds</p>
    </body>
</html>
