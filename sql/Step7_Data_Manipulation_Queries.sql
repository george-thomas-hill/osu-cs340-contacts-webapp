-- Throughout this file, single quotes are used to set off variables that will
-- be provided by the backend programming language.

--------------------------------------------------------------------------------

-- Queries needed by /home.js:

-- -- Query to generate list of users (and user IDs):

SELECT userId, lastName, firstName FROM users ORDER BY lastName ASC, firstName ASC;

-- -- Query to create a new account:

INSERT INTO users (lastName, firstName, phone, email) VALUES ('LastNameFromUserInput', 'FirstNameFromUserInput', 'PhoneNumberFromUserInput', 'EmailAddressFromUserInput');

--------------------------------------------------------------------------------

-- Queries needed by /myAccount.js:

-- -- Query to get current user's name:

-- -- -- (Not needed because we'll use the information from the query below.)

-- -- Query to get current information for current user:

SELECT lastName, firstName, phone, email FROM users WHERE userId='CurrentUserIdFromURL';

-- -- Query to update information for current user:

UPDATE users SET lastName='LastNameFromUserInput', firstName='FirstNameFromUserInput', phone='PhoneFromUserInput', email='EmailFromUserInput' WHERE userId='CurrentUserIdFromURL';

--------------------------------------------------------------------------------

-- Queries needed by /contacts.js:

-- -- Query to get current user's name:

SELECT lastName, firstName
FROM users
WHERE userId='CurrentUserIdFromURL';

-- -- Query to run when a user searches for a last name and/or a first name and/or no name:

SELECT C.contactId, C.lastName, C.firstName, C.phone, C.email, C.notes, EC.lastName AS `EClastName`, EC.firstName as `ECfirstName`
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

-- -- -- Turns out to be unnecessary: we're just reusing the results from the query to run when
-- -- -- a user searches for a last name and/or a first name and/or no name.

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

-- Queries needed by /editContact.js:

-- -- Query to get current user's name:

SELECT lastName, firstName
FROM users
WHERE userId='CurrentUserIdFromURL';

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
EC.contactId AS `ECcontactId`,
EC.lastName AS `EClastName`, 
EC.firstName as `ECfirstName`
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

-- Queries needed by /interactions:

-- -- Query to get current user's name:

SELECT lastName, firstName
FROM users
WHERE userId='CurrentUserIdFromURL';

-- -- Query to get current contact's name:

SELECT lastName, FirstName
FROM contacts
WHERE contactId='SelectedContactIdFromURL';

-- -- Query to get list of interactions with selected contact:

SELECT startDate, interactId
FROM interactions
WHERE contactId='SelectedContactIdFromUrl'
AND userId='CurrentUserIdFromURL'
ORDER BY startDate ASC;

-- -- Querty to delete an interaction:

DELETE FROM interactions
WHERE interactId='ChosenInteractIdFromForm';

-- -- Query to add an interaction:

INSERT INTO interactions
(contactId, startDate)
VALUES
'SelectedContactIdFromURL', 'EnteredStartDateFromForm';

--------------------------------------------------------------------------------

-- Queries needed by /interactionDetails.js:

-- -- Query to get current user's name:

SELECT lastName, firstName
FROM users
WHERE userId='CurrentUserIdFromURL';

-- -- Query to get current contact's name:

SELECT lastName, FirstName
FROM contacts
WHERE contactId='SelectedContactIdFromURL';

-- -- Query to get selected interaction's start date:

SELECT startDate
FROM interactions
WHERE interactId='SelectedInteractionIdFromURL';

-- -- Query to get interaction details:

SELECT I.detailsId, I.startTime, I.details, C.type
FROM interactionDetails AS I
LEFT JOIN communicationModes AS C
ON I.comId=C.comId
WHERE I.interactId='SelectedInteractionIdFromURL'
ORDER BY I.startTime;

-- -- Query to get modes:

SELECT comId, type
FROM communicationModes
ORDER BY type ASC;

-- -- Querty to delete interaction details:

DELETE FROM interactionDetails
WHERE detailsId='ChosenInteractionDetailsIdFromForm';

-- -- Query to add new mode / interaction details to an interaction:

INSERT INTO interactionDetails
(interactId, startTime, comId, details)
VALUES
('CurrentInteractIdFromUrl',
'ProvidedStartTimeFromForm'
'SelectedComIdFromUrl',
'DetailsFromUserInputFromForm');

--------------------------------------------------------------------------------

-- Queries neeed by /modes.js:

-- -- Query to get current user's name:

SELECT lastName, firstName
FROM users
WHERE userId='CurrentUserIdFromURL';

-- -- Query to get modes:

SELECT type
FROM communicationModes
ORDER BY type ASC;

-- -- Query to add a new communication type:

INSERT INTO communicationModes
(type)
VALUES
('TypeFromUserInputFromForm');
