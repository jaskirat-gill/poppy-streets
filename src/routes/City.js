/* eslint-disable */
import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useParams } from "react-router-dom";
import { secrets } from "../clientSecrets";
import { variables } from "../variables";

// Class displays City page, depending on what parameter is passed into the url

// Mapbox access token
const ACCESS_TOKEN = secrets.mapbox_token;
// Set access token
mapboxgl.accessToken = ACCESS_TOKEN;

// CSS Styling
const useStyles = makeStyles((theme) => ({ 
    map: {
        position: 'absolute',
        left: '25%',
        top: '0%',
        bottom: 0,
        width: '75%',
        height: '100%'
    },
    sideBar: {
        position: 'absolute',
        width: '25%',
        top: 0,
        bottom: 0,
        left: 0,
        right: '75%',
        maxHeight: '100%',
        overflow: 'hidden',
        backgroundColor: '#0e1111',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:'1rem',
        color: '#fff',
        fontFamily: 'Nunito',

    },
    poppyRedColor: {
        color: "#E35335"
    },
    description: {
      fontSize:'1rem',
      marginLeft: '15px',
      marginRight: '5px',

    },
    subtitle: {
        fontSize:'2rem',
        marginLeft: '15px',
        marginTop: '10px',
    },
    title: {
        marginLeft: '15px',
    }
}));

// Export function that is called by Index.js
export default function City() {
    // For CSS Styling
    const classes = useStyles();

    // Access the parameter of the redirect
    let { city } = useParams();

    // Extract the province from the parameter
    const province = city.substring(city.length - 2);

    // Remove the last two characters from city
    city = city.substring(0, city.length-2);

    // Street names and coordinates fetched from database
    const [streetData, setStreetData] = useState([]);
    // City name and coordinates fetched from database
    const [cityData, setCityData] = useState([]);

    // Map parameters
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [lng, setLng] = useState(); // longitude for center of city
    const [lat, setLat] = useState(); // Latitude for center of city
    const [zoom, setZoom] = useState(10);

    //Runs once
    useEffect(() => {
        fetch(`${secrets.database_origin}/getData/${city}${province}`)
        .then(response => response.json())
        .then(data => {
            setCityData(data);
            const bounds = [
                [parseFloat(data[0][2]), parseFloat(data[0][3])], // Southwest coordinates
                [parseFloat(data[0][4]), parseFloat(data[0][5])] // Northeast coordinates
            ];
            //Creates new mapbox map as per parameters
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: variables.mapbox_style,
                zoom: zoom,
            });
            map.fitBounds(bounds); // Set the map's viewport to contain the given bounds
            fetch(`${secrets.database_origin}/${city}${province}`)
            .then(response => response.json())
            .then(data => {
                setStreetData(data);
                data.forEach(street => {
                    const long = (parseFloat(street.northeast_longitude) + parseFloat(street.southwest_longitude)) / 2; // Get average long value to find center of street
                    const lat = (parseFloat(street.northeast_latitude) + parseFloat(street.southwest_latitude)) / 2;  // Get average lat value to find center of street
                    const marker = new mapboxgl.Marker()
                        .setLngLat([lat, long])
                        .setPopup(new mapboxgl.Popup().setHTML(`<h3><a href="/${city}${province}/${street.name}">${street.name}</a></h3>`))
                        .addTo(map);
                    });
                });
            });
    }, []);
    

    //HTML
    return (
        <div className={classes.root}>
            <div className={classes.map}  ref={mapContainer} >
            </div>
            
            <div className={classes.sideBar}>
                <h1 className={classes.title}> 
                    <span className={classes.poppyRedColor}>Poppy</span> Streets
                </h1>   
                <div className={classes.subtitle}>
                    {city}, {province}
                </div>
                <div className={classes.subtitle}>
                    {streetData.map((item, index) => (
                        <a key={index} href={`/${city}${province}/${item.name}`}>
                            <p>{item.name}</p>
                        </a>
                    ))}
                 </div>         
            </div>
        </div>
    );
}