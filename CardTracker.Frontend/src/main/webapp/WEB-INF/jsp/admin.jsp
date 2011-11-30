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
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js" type="text/javascript"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js" type="text/javascript"></script>
        <script src="http://crypto-js.googlecode.com/files/2.3.0-crypto-md5.js" type="text/javascript"></script>
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
        <br/>
        <br/>
        <a id="registerAccount">Register Account</a>
        <table>
            <tr>
                <td>Name</td>
                <td><input id="name" type="text"/></td>
            </tr>
            <tr>
                <td>Password</td>
                <td><input id="password" type="password"/></td>
            </tr>
            <tr>
                <td>Email</td>
                <td><input id="email" type="text"/></td>
            </tr>
        </table>
    </body>
</html>
