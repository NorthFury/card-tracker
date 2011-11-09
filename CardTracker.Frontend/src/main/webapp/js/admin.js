(function($) {
    var pushData = function(action){
        if($('#dataInput').val().length > 0) {
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: 'admin',
                data: {
                    action: action,
                    data: $('#dataInput').val()
                },
                success: function(data){
                    if(data.success)
                        alert('Success');
                    else
                        alert('Failure');
                }
            });
        }
    }

    var onAdminLoad = function() {
        $("#importExpansionData").click(function() {
            pushData('importExpansionData');
        });
        $("#importCardsData").click(function() {
            pushData('importCardsData');
        });
        $("#importImplementedCards").click(function() {
            pushData('importImplementedCards');
        });
    };

    $(document).ready(onAdminLoad);
})(jQuery);
