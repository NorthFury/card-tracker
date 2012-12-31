<%--
    Document   : stats
    Created on : Oct 23, 2011, 6:25:36 PM
    Author     : North
--%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" isELIgnored="false"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Stats Page</title>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.min.js"></script>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/amplifyjs/1.1.0/amplify.min.js"></script>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min.js"></script>
        <script type="text/javascript" src="resources/js/crypto-md5.js"></script>
        <script src="resources/js/main.js" type="text/javascript"></script>
        <script src="resources/js/stats.js" type="text/javascript"></script>
        <link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/themes/cupertino/jquery-ui.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/custom-theme/dataTable.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/custom-theme/default.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/cards.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/render.css" />
    </head>
    <body>
        <jsp:include page="menu.jsp"/>
        <div id="statsTable" style="width: 800px; margin-left: auto; margin-right: auto;"></div>
    </body>
</html>
