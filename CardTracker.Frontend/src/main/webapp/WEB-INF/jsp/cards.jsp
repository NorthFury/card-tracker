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
        <title>Cards Page</title>
        <link type="text/css" rel="stylesheet" href="resources/css/custom-theme/jquery-ui-1.8.17.custom.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/custom-theme/primefaces.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/custom-theme/default.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/cards.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/render.css" />
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js" type="text/javascript"></script>
        <script  src="resources/js/crypto-md5.js" type="text/javascript"></script>
        <script src="resources/js/login.js" type="text/javascript"></script>
        <script src="resources/js/filter.js" type="text/javascript"></script>
        <script src="resources/js/dataTable.js" type="text/javascript"></script>
        <script  src="resources/js/cardRender.js" type="text/javascript"></script>
        <script  src="resources/js/tooltip.js" type="text/javascript"></script>
        <script  src="resources/js/cards.js" type="text/javascript"></script>
    </head>
    <body>
        <div style="float:right">
            <div id="cardsFilter" class="ui-widget" style="width: 310px">
                <div class="ui-widget-header" style="padding:5px;">Filter Settings</div>
                <div class="ui-widget-content">
                    <table>
                        <tr>
                            <td>Rules text</td>
                            <td>
                                <input id="abilitiesFilter" name="abilities" />
                            </td>
                        </tr>
                        <tr>
                            <td>Subtype</td>
                            <td>
                                <input id="subtypeFilter" name="subtype" />
                            </td>
                        </tr>
                        <tr>
                            <td>Implemented</td>
                            <td>
                                <select id="implementedFilter" name="implemented">
                                    <option value="any">Any</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Requested</td>
                            <td>
                                <select id="requestedFilter" name="requested">
                                    <option value="any">Any</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Bugged</td>
                            <td>
                                <select id="buggedFilter" name="bugged">
                                    <option value="any">Any</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Tested</td>
                            <td>
                                <select id="testedFilter" name="tested">
                                    <option value="any">Any</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>
                                <select id="typeFilter" name="type" multiple="multiple">
                                    <option value="any">Any</option>
                                    <option value="Artifact">Artifact</option>
                                    <option value="Creature">Creature</option>
                                    <option value="Enchantment">Enchantment</option>
                                    <option value="Instant">Instant</option>
                                    <option value="Sorcery">Sorcery</option>
                                    <option value="Planeswalker">Planeswalker</option>
                                    <option value="Land">Land</option>
                                    <option value="Tribal">Tribal</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Developer</td>
                            <td>
                                <select id="developerFilter" name="developer" multiple="multiple">
                                    <option value="any">Any</option>
                                    <c:forEach var = "account" items="${accounts}">
                                        <option value="${account.id}">${account.name}</option>
                                    </c:forEach>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Edition</td>
                            <td>
                                <select id="editionFilter" name="expansion" multiple="multiple">
                                    <option value="any">Any</option>
                                    <c:forEach var = "expansion" items="${expansions}">
                                        <option value="${expansion.code}">${expansion.name}</option>
                                    </c:forEach>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="ui-widget">
                <label for="cardNames">Find Card: </label>
                <input id="cardNames" />
            </div>
            <div id="loginContainer"></div>
            <a id="toogleTooltip" class="aButton">Toggle Tooltip</a>
        </div>
        <div id="cardsContainer" style="width: 800px;"></div>
        <div id="cardDialog" title="Card"></div>
    </body>
</html>
