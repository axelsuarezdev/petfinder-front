import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Control } from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import css from "./mapbox.css"
mapboxgl.accessToken = "pk.eyJ1IjoiYXhlbG9pZGU5IiwiYSI6ImNsanQzeXpvMDByc2MzZXJ3YjVvaXIybzUifQ.tBFIBtyQ0ZhAun0fNr58dQ";

export function Mapbox(props){
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(props.coordinates?.lng || -58.38);
  const [lat, setLat] = useState(props.coordinates?.lat || -34.60);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
  if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false
    })
    
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      props.somethingChange({
        lng: map.current.getCenter().lng.toFixed(4),
        lat: map.current.getCenter().lat.toFixed(4)
      })
    });
    
  },[]);

  return <>
            <div ref={mapContainer} className={css.map_container} style={{borderRadius: "5px"}}>
              
            </div>
        </>
}