// This is used to delete a contact; it is called by clicking a button on the /contacts page.

function deleteContact(userId, contactId){
    $.ajax({
        url: '/contacts/' + userId + "/" + contactId,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
