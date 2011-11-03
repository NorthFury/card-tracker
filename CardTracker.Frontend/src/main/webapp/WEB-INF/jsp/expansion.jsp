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
        <title>Expansion Page</title>
        <!--        <link href="css/stats.css" rel="stylesheet" type="text/css">-->
    </head>
    <body>
        <h2>Cards in ${expansion}:</h2>
        <table>
            <tr>
                <th>Name</th>
                <th>Status</th>
            </tr>
            <c:forEach var = "card" items="${cards}">
                <c:choose>
                    <c:when test="${card.cardStatus.implemented}">
                        <tr style="background-color: #d0ffad">
                            <td>${card.name}</td>
                            <td>${card.cardStatus.implemented}</td>
                        </tr>
                    </c:when>
                    <c:otherwise>
                        <tr style="background-color: #fcdde6">
                            <td>${card.name}</td>
                            <td>${card.cardStatus.implemented}</td>
                        </tr>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
        </table>
    </body>
</html>
