// This is used to delete an interaction detail; it is called by clicking a button on the /interactionDetails page.

function deleteDetails(detailsId){
    $.ajax({
        url: '/interactionDetails/' + detailsId,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
