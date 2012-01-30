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
        <script  src="resources/js/crypto-md5.js" type="text/javascript"></script>
        <script  src="resources/js/admin.js" type="text/javascript"></script>
        <style>
            .aButton {
                background: #79bbff;
                border: 2px outset #79bbff;
                padding-left: 5px;
                padding-right: 5px;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <a id="importExpansionData" class="aButton">Import Expansion data</a>
        <a id="importCardsData" class="aButton">Import Cards data</a>
        <a id="importImplementedCards" class="aButton">Import Implemented Cards</a>
        <a id="importRequestedCards" class="aButton">Import Requested Cards</a>
        <a id="importMtgoData" class="aButton">Import MTGO Data</a>
        <textarea id="dataInput" rows="20" cols="100" style="margin-top: 5px;"></textarea>
        <br/>
        <br/>
        <a id="registerAccount" class="aButton">Register Account</a>
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
