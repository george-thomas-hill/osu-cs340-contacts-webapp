// This is used to update a contact; it is called by clicking a button on the /editContacts page.

function updateContact(userId, contactId){
    $.ajax({
        url: '/editContact/' + userId + "/" + contactId,
        type: 'PUT',
        data: $('#update-contact').serialize(),
        success: function(result){
            window.location.href = "/contacts/" + userId + "/~/~"; // This brings the user back automatically to the /contacts page.
            // The ~ are placeholders for wildcards in the first name and last name search parameters.
        }
    })
};
