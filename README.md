
# osu-cs340-contacts-webapp

* _Screenshot and link to screencast._

CS 340 was Oregon State University's Introduction to Databases course.

The assignment was . . .

Please see [Assignment.pdf] . . .

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
./node_modules/forever/bin/forever start main.js 11758
```

You can then access the contacts webapp by going to:

```
http://<SERVER-NAME-GOES-HERE>:<PORT-NUMBER-GOES-HERE>
```
