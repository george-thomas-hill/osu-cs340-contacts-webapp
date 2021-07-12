# osu-cs340-contacts-webapp

[![A screenshot of this program.](http://georgethomashill.com/gh/osu/cs340/cs340-contacts-webapp-screenshot.png "Click to see screencast.")](http://georgethomashill.com/gh/osu/cs340/cs340-contacts-webapp-screencast.mp4)

CS 340 was Oregon State University's Introduction to Databases course.

I worked all term with a partner ([Jacky Tran](https://github.com/jtran8)) to make a database-driven website that would solve a problem and meet various criteria (e.g. have at least four tables, at least four relationships, and at least one many-to-many relationship).

We chose to make a contacts app that would track contact information and records of interactions with those contacts.

Please see [Assignment Step 1.pdf](https://github.com/george-thomas-hill/osu-cs340-contacts-webapp/blob/main/Assignment%20Step%201.pdf) and [Assignment Step 7.pdf](https://github.com/george-thomas-hill/osu-cs340-contacts-webapp/blob/main/Assignment%20Step%207.pdf) for details.

Please see our [Report.pdf](https://github.com/george-thomas-hill/osu-cs340-contacts-webapp/blob/main/Report.pdf) for the database's Entity Relationship Diagram and schema.

System requirements: a web server, `mysql`, Node.js, and `npm`.

To build and run, first clone the repository:

```
git clone https://github.com/george-thomas-hill/osu-cs340-contacts-webapp.git
cd osu-cs340-contacts-webapp
npm install
cp dbcon~TEMPLATE.js dbcon.js
```

Then create and initialize a MySQL database:

```
$ sudo mysql
...
mysql> CREATE DATABASE contacts_webapp;
mysql> CREATE USER 'contacts_webapp'@'localhost' IDENTIFIED BY 'strong-password-goes-here';
mysql> GRANT ALL PRIVILEGES ON contacts_webapp.* TO 'contacts_webapp'@'localhost';
mysql> FLUSH PRIVILEGES;
mysql> SOURCE sql/Step7_Data_Definition_Queries.sql
mysql> EXIT;
$
```

Then open a port on your firewall.

(How you do so depends on your system details.)

Then edit `dbcon.js` to match your database and port configuration.

Then:

```
./node_modules/forever/bin/forever start main.js <PORT-NUMBER-GOES-HERE>
```

You can then access the contacts webapp by going to:

```
http://<SERVER-NAME-GOES-HERE>:<PORT-NUMBER-GOES-HERE>
```

A screencast of the working website can be viewed [here](http://georgethomashill.com/gh/osu/cs340/cs340-contacts-webapp-screencast.mp4).
