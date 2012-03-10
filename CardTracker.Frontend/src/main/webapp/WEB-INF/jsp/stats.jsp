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
        <link type="text/css" rel="stylesheet" href="resources/css/custom-theme/default.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/stats.css" />
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js" type="text/javascript"></script>
    </head>
    <body>
        <jsp:include page="menu.jsp"/>
        <h2>Implementation status by set:</h2>
        <c:forEach var = "expansionStatus" items="${expansionData}">
            <div class="skillBack">
                <div class="skillFront" style="width:${expansionStatus.implemented * 100 / expansionStatus.total}\%">
                    <div class="skillText" style="z-index: 10;"><a href="cards?expansion=${expansionStatus.code}">${expansionStatus.name}</a></div>
                    <div class="skillText" style="right:50px; text-align:right;">${expansionStatus.implemented} / ${expansionStatus.total}</div>
                    <div class="skillText" style="right:3px; text-align:right;">(${expansionStatus.total - expansionStatus.implemented})</div>
                </div>
            </div>
        </c:forEach>
    </body>
</html>
