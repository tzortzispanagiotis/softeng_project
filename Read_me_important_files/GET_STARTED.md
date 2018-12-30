Workspace preparation:

1) Download + install node.js
https://nodejs.org/en/download/

2) Download + install git
https://git-scm.com/downloads

3) visual studio code:
https://code.visualstudio.com/

4) MariaDB:
https://downloads.mariadb.org/mariadb/10.3.11/
Download to MSI για windows.

How to setup a database with a user:
http://www.daniloaz.com/en/how-to-create-a-user-in-mysql-mariadb-and-grant-permissions-on-a-specific-database/

Default database and user credentials:
database: {
db_name: process.env.DB_NAME || "rns_softeng_database",
username: process.env.DB_USER ||"my_user",
password: process.env.DB_PASS || "my_password"
}

5) Git clone repository την πρώτη φορά
     git fetch, git pull

6) npm install

7) Install nodemon: npm install -g nodemon

8) git branching : https://jameschambers.co/writing/git-team-workflow-cheatsheet/
