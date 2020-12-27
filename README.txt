
To build and run, first create a MySQL database:

```
$ sudo mysql
...
mysql> CREATE DATABASE contacts_webapp;
mysql> CREATE USER 'contacts_webapp'@'localhost' IDENTIFIED BY 'strong-password-goes-here';
mysql> GRANT ALL PRIVILEGES ON contacts_webapp.* TO 'contacts_webapp'@'localhost';
mysql> FLUSH PRIVILEGES;
mysql> EXIT;
$
```

Then open a port on your firewall.

(How you do so depends on your system details.)

Then:

```






To install this webapp . . .

* Connect to the OSU VPN.

* SSH to flip2.

* Run: "git clone https://github.com/george-code/CS-340-Contacts-Webapp-v2.git".

* Run: "cd CS-340-Contacts-Webapp-v2".

* Run: "npm install".

* Copy "dbcon~TEMPLATE.js" to just "dbcon.js".

* Edit "dbcon.js" to use your username, your password, and your database.

* Import "sql/Step7_DDL_Queries.sql" into your database.

* Run: "node main.js PORT" (replacing PORT with a port number you choose).

* Go to: "http://flip2.engr.oregonstate.edu:PORT/" (replacing PORT with the correct number).
