(function($) {
    var pushData = function(action){
        if($('#dataInput').val().length > 0) {
            $.ajax({
                type: 'POST',
                url: 'admin',
                data: {
                    action: action,
                    data: $('#dataInput').val()
                },
                success: function(){
                    alert('Cards data imported');
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
