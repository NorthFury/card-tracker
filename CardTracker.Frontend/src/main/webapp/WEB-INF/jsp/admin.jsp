<%-- 
    Document   : admin
    Author     : North
--%>

<%--<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" isELIgnored="false"%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Card Tracker Administration Page</title>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js" type="text/javascript"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js" type="text/javascript"></script>
        <script  src="/resources/js/admin.js" type="text/javascript"></script>
    </head>
    <body>
        <a id="importExpansionData">Import Expansion data</a>
        <br/>
        <a id="importCardsData">Import Cards data</a>
        <br/>
        <a id="importImplementedCards">Import Implemented Cards</a>
        <br/>
        <a id="importRequestedCards">Import Requested Cards</a>
        <br/>
        <textarea id="dataInput" rows="20" cols="100"></textarea>
    </body>
</html>
