/* eslint-disable */
import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useParams } from "react-router-dom";
import { secrets } from "../secrets";
import { variables } from "../variables";

// Class displays Street page, depending on what parameter is passed into the url

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
export default function Street() {      

    // Mapbox access token
    const ACCESS_TOKEN = secrets.mapbox_token;
    // Set access token
    mapboxgl.accessToken = ACCESS_TOKEN;

    // For CSS Styling
    const classes = useStyles();

    // Access the parameters of the redirect
    let { city, street } = useParams();

    // Format street parameter for special characters
    street = street.replace(/%20/g, " ");

    // Extract the province from the parameter
    const province = city.substring(city.length - 2);

    // Remove the last two characters from city
    city = city.substring(0, city.length-2);

    // Street names and coordinates fetched from database
    const [streetData, setStreetData] = useState([]);

    // Map parameters
    const mapContainer = useRef(null);
    const [zoom, setZoom] = useState(10);

    //Runs once
    useEffect(() => {
        fetch(`${secrets.database_origin}/${city}${province}/${street}`)
        .then(response => response.json())
        .then(data => {
            
            setStreetData(data);
            const long = (parseFloat(data.southwest_longitude) + parseFloat(data.northeast_longitude)) / 2;
            const lat = (parseFloat(data.southwest_latitude) + parseFloat(data.northeast_latitude)) / 2;
            const bounds = [
                [parseFloat(data.southwest_latitude), parseFloat(data.southwest_longitude)], // Southwest coordinates
                [parseFloat(data.northeast_latitude), parseFloat(data.northeast_longitude)] // Northeast coordinates
            ];
            //Creates new mapbox map as per parameters
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: variables.mapbox_style,
                zoom: zoom,
            });
            map.fitBounds(bounds); // Set the map's viewport to contain the given bounds
            const marker = new mapboxgl.Marker()
                        .setLngLat([lat, long])
                        .addTo(map);
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
                    {street}
                </div>
                <div className={classes.description}>
                    {streetData.story}
                </div>         
            </div>
        </div>
    );
}