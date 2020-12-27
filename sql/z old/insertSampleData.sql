-- This file will INSERT sample data.

-- Its use of foreign keys assumes that it is being run on an empty database.

INSERT INTO users (lastName, firstName, phone, email) VALUES
('Macintosh', 'Morgan', '555-555-1001', 'morgan@example.com'),
('Stone', 'Skyler', '555-555-1002', 'skyler@example.com'),
('Adams', 'Armani', '555-555-1003', 'armani@example.com');

INSERT INTO contacts (userId, lastName, firstName, phone, email, notes, emergencyContactId) VALUES
(1, 'Jung', 'Jordan', '617-555-1004', 'jordan@example.com', 'Owes me $15.', NULL),
(1, 'Smith', 'Sydney', '617-555-1005', 'sydney@example.com', 'Has a dog.', 1),
(1, 'Rogers', 'Robin', '617-555-1006', 'robin@example.com', 'Software engineer.', NULL),
(2, 'Moore', 'Murphy', '617-555-1007', 'murphy@example.com', 'Birthday is Jan. 1.', NULL),
(2, 'Hall', 'Hollis', '617-555-1008', 'hollis@example.com', '', 4),
(2, 'Brown', 'Brighton', '617-555-1009', 'brighton@example.com', '', NULL);

INSERT INTO interactions (contactId, `startDate`) VALUES
(1, '2000-01-01'),
(1, '2000-01-02'),
(1, '2000-01-03'),
(1, '2000-01-13');

INSERT INTO communicationModes (`type`) VALUES
('SMS Message'),
('Voice Call'),
('Meeting');

INSERT INTO interactionDetails (interactId, comId, startTime, details) VALUES
(1, 1, '09:00:00', 'Made plans to meet up over coffee or lunch.'),
(2, 2, '10:00:00', 'Chose a spot and time for lunch.'),
(3, 3, '11:00:00', 'Met up for lunch at Queen Margherita Pizza; he forgot his wallet so I covered.'),
(4, 1, '12:00:00', 'Reminded him he owes me for lunch.'),
(4, 2, '13:00:00', 'He called me apologize for taking so long to repay him.');