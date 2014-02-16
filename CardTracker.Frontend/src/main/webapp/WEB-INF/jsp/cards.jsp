<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" isELIgnored="false"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Cards Page</title>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.min.js"></script>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/amplifyjs/1.1.0/amplify.min.js"></script>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min.js"></script>
        <script type="text/javascript" src="resources/js/crypto-md5.js"></script>
        <script src="resources/js/main.js" type="text/javascript"></script>
        <script src="resources/js/cards.js" type="text/javascript"></script>
        <link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/themes/cupertino/jquery-ui.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/custom-theme/dataTable.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/custom-theme/default.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/cards.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/render.css" />
    </head>
    <body>
        <jsp:include page="menu.jsp"/>
        <table style="min-width: 1150px">
            <tr>
                <td style="vertical-align: top">
                    <div id="cardsContainer" style="width: 800px;"></div>
                </td>
                <td style="vertical-align: top">
                    <div id="cardsFilter" class="ui-widget" style="width: 310px;">
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
                                    <td>Name</td>
                                    <td>
                                        <input id="nameFilter" name="name" />
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
                                    <td>Color</td>
                                    <td>
                                        <select id="colorFilter" name="color" multiple="multiple">
                                            <option value="any">Any</option>
                                            <option value="W">White</option>
                                            <option value="U">Blue</option>
                                            <option value="B">Black</option>
                                            <option value="R">Red</option>
                                            <option value="G">Green</option>
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
                    <a id="toogleTooltip">Toggle Tooltip</a>
                </td>
            </tr>
        </table>
        <div id="cardDialog" title="Card"></div>
        <div id="cardUnlockConfirmDialog" title="Unlock card?" style="display:none;">
            <p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>Are you sure you want to unlock this card?</p>
        </div>
    </body>
</html>
