-- Throughout this file, single quotes are used to set off variables that will
-- be provided by the backend programming language.

--------------------------------------------------------------------------------

-- Queries needed by /home.html:

-- -- Query to generate list of users (and user IDs):

SELECT userId, lastName, firstName
FROM users
ORDER BY lastName ASC, firstName ASC;

-- -- Query to create a new account:

INSERT INTO users (lastName, firstName, phone, email) VALUES
('LastNameFromUserInput', 
'FirstNameFromUserInput', 
'PhoneNumberFromUserInput', 
'EmailAddressFromUserInput');

--------------------------------------------------------------------------------

-- Queries needed by /myAccount.html:

-- -- Query to get current user's name:

SELECT lastName, firstName
FROM users
WHERE userId='CurrentUserIdFromURL';

-- -- Query to get current information for current user:

SELECT lastName, firstName, phone, email
FROM users
WHERE userId='CurrentUserIdFromURL';

-- -- Query to update information for current user:

UPDATE users
SET lastName='LastNameFromUserInput', 
firstName='FirstNameFromUserInput', 
phone='PhoneFromUserInput', 
email='EmailFromUserInput'
WHERE userId='CurrentUserIdFromURL';

--------------------------------------------------------------------------------

-- Queries needed by /contacts.html:

-- -- Query to get current user's name:

-- -- -- See above.

-- -- Query to run when a user searches for a last name and/or a first name and/or no name:

SELECT C.contactId, C.lastName, C.firstName, C.phone, C.email, C.notes, EC.lastName AS `EC.lastName`, EC.firstName as `EC.firstName`
FROM contacts AS C
LEFT JOIN contacts AS EC ON EC.contactId=C.emergencyContactId
WHERE C.lastName LIKE 'LastNameSearchParameter'
AND C.firstName LIKE 'FirstNameSearchParameter'
AND C.userId='CurrentUserIdFromUrl'
ORDER BY C.lastName ASC, C.firstName ASC;

-- -- -- Note: Any search parameter that is not provided by the user will be set equal to a % character.
-- -- -- As a result, we'll be able to use this one query whether the user searches for a last name,
-- -- -- a first name, or no name.

-- -- Query to delete a contact:

DELETE FROM contacts
WHERE contactId='ContactIdFromUserInput'
AND userId='CurrentUserIdFromUrl';

-- -- Query to populate the "Emergency Contact" selection element:

SELECT contactId, lastName, firstName
FROM contacts
WHERE userId='CurrentUserIdFromUrl'
ORDER BY lastName ASC, firstName ASC;

-- -- Query to add a new contact:

INSERT INTO contacts (userId, lastName, firstName, phone, email, notes, emergencyContactId) VALUES
('CurrentUserIdFromUrl',
'LastNameFromUserInput',
'FirstNameFromUserInput',
'PhoneFromUserInput',
'EmailFromUserInput',
'NotesFromUserInput',
'EmergencyContactIdFromUserInput');

-- -- -- Note: We don't have a way to ensure that the end user doesn't hack the form by submitting some other user's
-- -- -- userId.
-- -- -- 
-- -- -- We also don't have a way to ensure that the end user doesn't hack the form by submitting an invalid
-- -- -- emergency contact ID.
-- -- -- 
-- -- -- For this class's purposes, I'm sure that this okay. Just sayin'.

--------------------------------------------------------------------------------

-- Queries needed by /editContact.html:

-- -- Query to get current user's name:

-- -- -- See above.

-- -- Query to populate "Emergency Contact" selection element:

SELECT contactId, lastName, firstName
FROM contacts
WHERE userId='CurrentUserIdFromUrl'
AND contactId<>'SelectedContactIdFromUrl'
ORDER BY lastName ASC, firstName ASC;

-- -- Query to get selected contact's current information:

SELECT C.contactId,
C.lastName,
C.firstName,
C.phone,
C.email,
C.notes,
EC.contactId AS `EC.contactId`,
EC.lastName AS `EC.lastName`, 
EC.firstName as `EC.firstName`
FROM contacts AS C
LEFT JOIN contacts AS EC ON EC.contactId=C.emergencyContactId
WHERE C.contactId='SelectedContactIdFromUrl'
AND C.userId='CurrentUserIdFromUrl';

-- -- Query to update selected contact's current information

UPDATE contacts
SET lastName='LastNameFromUserInput',
firstName='FirstNameFromUserInput',
phone='PhoneFromUserInput',
email='EmailFromUserInput',
notes='NotesFromUserInput',
emergencyContactId='EmergencyContactIdFromUserInput'
WHERE contactId='SelectedContactIdFromUrl'
AND userId='CurrentUserIdFromURL';

--------------------------------------------------------------------------------

-- Queries needed by /viewInteractions.html:

-- -- Query to get list of interactions with selected contact:

SELECT start
FROM interactions
WHERE contactId='SelectedContactIdFromUrl'
AND userId='CurrentUserIdFromURL';
ORDER BY start ASC;

-- -- Query to get the interaction details from the select interaction:

SELECT comid, details
FROM interactionDetails
WHERE contactId='CurrentContactIdFromUrl'
AND interactId='SelectedInteractIdFromUrl'
AND userId='CurrentUserIdFromURL';

-- -- Query to delete interaction details:

DELETE FROM interactionDetails
WHERE interactId='SelectedInteractIdFromUrl'
AND comId='SelectedComIdFromUrl'
AND userId='CurrentUserIdFromUrl';

--------------------------------------------------------------------------------

-- Queries needed by /addModeToInteraction.html:

-- -- Query to add new mode / interaction details to an interaction:

INSERT INTO interactionDetails (interactId, comId, details) VALUES
('CurrentInteractIdFromUrl',
'SelectedComIdFromUrl',
'DetailsFromUserInput');

--------------------------------------------------------------------------------

-- Queries neeed by /modes.html:

-- -- Query to add a new communication type:

INSERT INTO communicationModes (type) VALUES
('TypeFromUserInput');