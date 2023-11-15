# Poppy Streets

## Database Schema

The database dump can be found in "./Backend/file.sql" The database dump includes all the statements required to recreate the database using the following commands with appropriate substitutions: 
```mysql -u username -p
mysql> create database mydb;
mysql> use mydb;
mysql> source file.sql;```

The actual database has two tables.
1. Cities - Each row has a "name". "province", "country", Southwest and northeast coordinates (SEE NOTE 1 AT BOTtOM)
1. Streets - Each row has a "name". "province", "city", Southwest and northeast coordinates (SEE NOTE 1 AT BOTtOM), story, street_sign_image_url (optional), resources (optional)

## Map

For mapping we use the "mapbox" api (mapbox.com). Google maps currently has not free tier that allows users to use it's maps however mapbox allows 50,000 map loads a month free. Due to this being an extremely large amount, this application used the mapbox api. For this application to run, you must sign up for an account and generate a token key. See "secrets and variables" section for more information

## Secrets And Variables

This function requires 3 files
1. Variables (GIVEN) - This is given in "/src" and contains:
``` mapbox_style : //Here you can specify a specific themed mapbox map or leave it as the default,
    center_long : //center longitude value of the map (currently set to center of canada)
    center_lat :  // Center latitude value of the map (currently set center of canada)
    website_description // Easy access to make changes```
2. database_secrets.txt (NOT GIVEN) - This is not given and must be created in "/Backend" and named exactly "database_secrets.txt"
    Below are the values used for development. Feel free to copy/paste or adjust to your liking:
    ```database_name = "poppy_streets"
        database_host = "localhost"
        database_user = "root"
        database_port ="4000"
        database_password = MYSQL PASSWORD HERE
        client_origin = "http://localhost:3000"```
3. clientSecrets.js (NOT GIVEN) - this is not given and must be created in "/src" and named exactly "clientSecrets.js"
    Below are the values used for development. Feel free to copy/paste or adjust to your liking
    ```export const secrets = {
    database_origin : "http://localhost:4000",
    client_origin : "http://localhost:3000",
    mapbox_token : INSERT TOKEN HERE
}```

## Packages

In the "/backend" directory run
```pip search . > all_packages.txt

    pip install -r all_packages.txt

```
To install needed packages (mysql, flask, CORS)
In "/src" run
```npm install```
to install all packages for react. If any packages fail add the ```--force``` flag, sometimes the material-ui caused weird conflicts but they can be safely ignored
## Notes

1. The coordinate system used requires a coordinate for a southwest (bottom left) boundary and a northeast (top right) boundary. A rectangle is then drawn based on these coordinates for adjusting the view of the map. Anytime the center coordinate is required, the average longitude/latitude is calculated.

