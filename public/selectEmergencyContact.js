// This function is used on the /editContact page.
// It makes the drop-down emergency contact selector start off selecting the correct contact.
// It is called by the "script defer" tag in editContact.handlebars.

function selectEmergencyContact(id){
    if (id == undefined) {
        id = "NULL";
    }
    $("#emergency-contact-selector").val(id);
}
