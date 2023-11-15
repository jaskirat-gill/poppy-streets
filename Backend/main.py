from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

# Read necessary information from files
with open('database_secrets.txt', 'r') as f:
    for line in f:
        if 'database_name' in line:
            databaseName = line.split('=')[1].strip().strip('"')
        if 'database_host' in line:
            databaseHost = line.split('=')[1].strip().strip('"')
        if 'database_user' in line:
            databaseUser = line.split('=')[1].strip().strip('"')
        if 'database_port' in line:
            databasePort = line.split('=')[1].strip().strip('"')
        if 'database_password' in line:
            databasePassword = "E=mc2Jas1"
        if 'client_origin' in line:
            clientOrigin = line.split('=')[1].strip().strip('"')

app = Flask(__name__)
CORS(app, origins=clientOrigin)


# Main endpoint for landing page. Returns all cities in database
@app.route('/')
def get_cities():
    # Connect to the database
    db = mysql.connector.connect(
        host= databaseHost,
        user= databaseUser,
        password= databasePassword,
        database= databaseName,
        auth_plugin='mysql_native_password'
    )

    # Create a cursor object
    cursor = db.cursor()

    # Execute the query to get the column values
    cursor.execute("SELECT name, province, southwest_longitude, southwest_latitude, northeast_longitude, northeast_latitude FROM cities")

    # Fetch all the rows
    rows = cursor.fetchall()

    # Close the cursor and database connections
    cursor.close()
    db.close()

    # Create dictionary with column names as keys
    cities = []
    for row in rows:
        city = {
            'name': row[0],
            'province': row[1],
            'southwest_longitude': row[2],
            'southwest_latitude': row[3],
            'northeast_longitude': row[4],
            'norteast_latitude': row[5],
        }
        cities.append(city)

    # Return the name column values as a JSON response
    return jsonify(rows)

# Endpoint for getting geographic data about specific city. 
@app.route('/getData/<city>')
def get_data(city):

    # Extract the province and city from the parameter
    province = city[-2:]
    city = city[:-2]

    # Connect to the database
    db = mysql.connector.connect(
        host= databaseHost,
        user= databaseUser,
        password= databasePassword,
        database= databaseName,
        auth_plugin='mysql_native_password'
    )

    # Create a cursor object
    cursor = db.cursor()

    # Execute the query to get the column values
    cursor.execute(f"SELECT name, province, southwest_longitude, southwest_latitude, northeast_longitude, northeast_latitude FROM cities WHERE name = '{city}' AND province = '{province}'")

    # Fetch all the rows
    rows = cursor.fetchall()

    # Close the cursor and database connections
    cursor.close()
    db.close()

    # Create dictionary with column names as keys
    cities = []
    for row in rows:
        city = {
            'name': row[0],
            'province': row[1],
            'southwest_longitude': row[2],
            'southwest_latitude': row[3],
            'northeast_longitude': row[4],
            'norteast_latitude': row[5],
        }
        cities.append(city)
    # Return the name column values as a JSON response
    return jsonify(rows)

# Endpoint for returning all streets for a specific city
@app.route('/<city>')
def get_streets(city):

    # Extract the province and city from the parameter
    province = city[-2:]
    city = city[:-2]

    # Connect to the database
    db = mysql.connector.connect(
        host= databaseHost,
        user= databaseUser,
        password= databasePassword,
        database= databaseName,
        auth_plugin='mysql_native_password'
    )

    # Create a cursor object
    cursor = db.cursor()

    # Execute the query to get the column values
    cursor.execute(f"SELECT name, southwest_longitude, southwest_latitude, northeast_longitude, northeast_latitude, city, province FROM streets WHERE city = '{city}' AND province = '{province}'")

    # Fetch all the rows
    rows = cursor.fetchall()

    # Close the cursor and database connections
    cursor.close()
    db.close()

    # Create dictionary with column names as keys
    streets = []
    for row in rows:
        street = {
            'name': row[0],
            'southwest_longitude': row[1],
            'southwest_latitude': row[2],
            'northeast_longitude': row[3],
            'northeast_latitude': row[4],
            'city': row[5],
            'province': row[6]
        }
        streets.append(street)

    

    # Return the name column values as a JSON response
    return jsonify(streets)

# Endpoint for returning data about a specific street
@app.route('/<city>/<street>')
def get_street(city, street):
    # Extract the province from the city parameter
    province = city[-2:]
    city = city[:-2]

    # Format parameter
    street = street.replace("%20", " ")

    # Connect to the database
    db = mysql.connector.connect(
        host= databaseHost,
        user= databaseUser,
        password= databasePassword,
        database= databaseName,
        auth_plugin='mysql_native_password'
    )

    # Create a cursor object
    cursor = db.cursor()

    # Execute the query to get the row that matches the specified parameters
    cursor.execute(f"SELECT name, southwest_longitude, southwest_latitude, northeast_longitude, northeast_latitude, story FROM streets WHERE city = '{city}' AND province = '{province}' AND name = '{street}'")

    # Fetch the row
    row = cursor.fetchone()

    # Close the cursor and database connections
    cursor.close()
    db.close()

    # Create dictionary with column names as keys
    street = {
        'name': row[0],
        'southwest_longitude': row[1],
        'southwest_latitude': row[2],
        'northeast_longitude': row[3],
        'northeast_latitude': row[4],
        'story': row[5]
    }

    # Return the street data as a JSON response
    return jsonify(street)

if __name__ == "__main__":
  app.run(databaseHost, databasePort)
