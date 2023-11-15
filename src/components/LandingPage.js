/* eslint-disable */
import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { secrets } from "../secrets";
import { variables } from "../variables";

// Class displays the map that is shown on landing page. List of cities is populated from database calls

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

// Export Function that is called by App 
export default function LandingPage() {
    //For CSS Styling
    const classes = useStyles();

    // City names fetched from backend
    const [cityNameData, setCityNameData] = useState([]);

    // Map parameters
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [lng, setLng] = useState(variables.center_long); // longitude for center of map (Current set to middle of canada)
    const [lat, setLat] = useState(variables.center_lat);   // Latitude for center of map (Current set to middle of canada)
    const [zoom, setZoom] = useState(1);

    //Runs once
    useEffect(() => {
        //Creates new mapbox map as per parameters
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: variables.mapbox_style,
            center: [lng,lat],
            zoom: zoom,
        });
        fetch(`${secrets.database_origin}/`)
        .then(response => response.json())
        .then(data => {
            setCityNameData(data);
            data.forEach(city => {
                const long = (parseFloat(city[2]) + parseFloat(city[4])) / 2; // Get average long value to find center of city
                const lat = (parseFloat(city[3]) + parseFloat(city[5])) / 2;  // Get average lat value to find center of city
                
                const marker = new mapboxgl.Marker()
                    .setLngLat([long, lat])
                    .setPopup(new mapboxgl.Popup().setHTML(`<h3><a href="/${city[0]}${city[1]}">${city[0]}, ${city[1]}</a></h3>`))
                    .addTo(map);
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
                <div className={classes.description}>
                    {variables.website_description}
                </div> 
                <div className={classes.subtitle}>
                    City List: 
                </div>
                <div className={classes.subtitle}>
                    {cityNameData.map((item, index) => (
                        <a key={index} href={`/${item[0]}${item[1]}`}>
                            <p>{item[0]}, {item[1]}</p>
                        </a>
                    ))}
                 </div>         
            </div>
        </div>
    );
}