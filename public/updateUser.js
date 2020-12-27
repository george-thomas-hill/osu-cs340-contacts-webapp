// This is used to update a user's information; it is called by clicking a button on the /myAccount page.

function updateUser(id){
    $.ajax({
        url: '/myAccount/' + id,
        type: 'PUT',
        data: $('#update-user').serialize(),
        success: function(result){
            window.location.reload(true);
        }
    })
};
