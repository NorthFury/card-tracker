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
        <link type="text/css" rel="stylesheet" href="resources/css/custom-theme/jquery-ui-1.8.17.custom.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/custom-theme/default.css" />
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js" type="text/javascript"></script>
        <script src="resources/js/crypto-md5.js" type="text/javascript"></script>
        <script src="resources/js/admin.js" type="text/javascript"></script>
        <script src="resources/js/login.js" type="text/javascript"></script>
    </head>
    <body>
        <jsp:include page="menu.jsp"/>
        <c:choose>
            <c:when test="${empty sessionScope.AuthenticatedUser}">
                <h1>Please login and reload the page.</h1>
            </c:when>

            <c:otherwise>
                <div id="mainContent">
                    <a id="importExpansionData">Import Expansion data</a>
                    <a id="importCardsData">Import Cards data</a>
                    <a id="importImplementedCards">Import Implemented Cards</a>
                    <a id="importRequestedCards">Import Requested Cards</a>
                    <a id="importMtgoData">Import MTGO Data</a>
                    <textarea id="dataInput" rows="20" cols="100" style="margin-top: 5px;"></textarea>
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
                </div>
            </c:otherwise>
        </c:choose>
    </body>
</html>
