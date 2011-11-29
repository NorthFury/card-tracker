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
        <link type="text/css" rel="stylesheet" href="http://www.primefaces.org/showcase-labs/javax.faces.resource/theme.css.jsf?ln=primefaces-cupertino" />
        <link type="text/css" rel="stylesheet" href="http://www.primefaces.org/showcase-labs/javax.faces.resource/primefaces.css.jsf?ln=primefaces&amp;v=3.0.RC1-SNAPSHOT" />
        <link type="text/css" rel="stylesheet" href="http://www.primefaces.org/showcase-labs/css/default.css" />
        <link type="text/css" rel="stylesheet" href="/resources/css/cards.css" />
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js" type="text/javascript"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js" type="text/javascript"></script>
        <script src="/resources/js/filter.js" type="text/javascript"></script>
        <script src="/resources/js/dataTable.js" type="text/javascript"></script>
    </head>
    <body>
        <div id="cardsFilter" class="ui-widget" style="width: 400px; float:right">
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
        <div id="cardsContainer" style="width: 600px;"></div>
        <div id="dialog" title="Card"></div>
        <script type="text/javascript">
            (function(){
                $('#dialog').hide();

                var filter = CardsFilter(jQuery);
                filter.init({
                    container: '#cardsFilter'
                });

                var rowClass = function (rowData) {
                    if(rowData.implemented){
                        return 'implementedCard';
                    }
                    if(rowData.requested){
                        return 'requestedCard';
                    }
                    if(rowData.bugged){
                        return 'buggedCard';
                    }
                    return '';
                }
                var dt = DataTable(jQuery);
                dt.init({
                    url: 'http://localhost:8080/cards',
                    container: '#cardsContainer',
                    rows: 30,
                    columnModel: [
                        {name: 'Name', key: 'name', sortable: false},
                        {name: 'Cost', key: 'cost', sortable: false, format: function(row){return row.cost ? row.cost.replace(/\\$/g, '') : '';}},
                        {name: 'Type', key: 'type', sortable: false},
                        {name: 'Power', key: 'power', sortable: false, format: function(row){return row.power || '';}},
                        {name: 'Toughness', key: 'toughness', sortable: false, format: function(row){return row.toughness || '';}}
                    ],
                    rowClass: rowClass,
                    filter: filter
                });

                filter.setPaginator(dt);
            })();
        </script>
    </body>
</html>