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
        <link type="text/css" rel="stylesheet" href="resources/css/custom-theme/jquery-ui-1.8.17.custom.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/custom-theme/primefaces.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/custom-theme/default.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/stats.css" />
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js" type="text/javascript"></script>
        <script src="resources/js/crypto-md5.js" type="text/javascript"></script>
        <script src="resources/js/login.js" type="text/javascript"></script>
        <script src="resources/js/sortableTable.js" type="text/javascript"></script>
        <script src="resources/js/stats.js" type="text/javascript"></script>
    </head>
    <body>
        <jsp:include page="menu.jsp"/>
        <div id="statsTable" style="width: 800px; margin-left: auto; margin-right: auto;"></div>
    </body>
</html>
