// This is used to delete an interaction; it is called by clicking a button on the /interactions page.

function deleteInteraction(interactId){
    $.ajax({
        url: '/interactions/' + interactId,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
