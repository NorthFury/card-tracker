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
        <script src="/resources/js/dataTable.js" type="text/javascript"></script>
    </head>
    <body>
        <div id="myDataTable" style="width: 600px;"></div>
        <div id="dialog" title="Card"></div>
        <script type="text/javascript">
            (function(){
                $('#dialog').hide();
                var rowClass = function (rowData) {
                    if(rowData.implemented){
                        return 'implementedCard';
                    }
                    if(rowData.requested){
                        return 'requestedCard';
                    }
                    return '';
                }
                var dt = DataTable(jQuery);
                dt.init({
                    url: 'http://localhost:8080/cards',
                    container:  '#myDataTable',
                    rows: 30,
                    columnModel: [
                        {name: 'Name', key: 'name', sortable: false},
                        {name: 'Cost', key: 'cost', sortable: false, format: function(row){return row.cost ? row.cost.replace(/\\$/g, '') : '';}},
                        {name: 'Type', key: 'type', sortable: false},
                        {name: 'Power', key: 'power', sortable: false, format: function(row){return row.power || '';}},
                        {name: 'Toughness', key: 'toughness', sortable: false, format: function(row){return row.toughness || '';}}
                    ],
                    rowClass: rowClass
                });
            })();
        </script>
    </body>
</html>
