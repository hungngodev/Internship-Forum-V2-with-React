import * as React from "react";
import { useRef, useState, useMemo, useCallback } from "react";
import { createRoot } from "react-dom/client";
import {
  Map,
  Source,
  Layer,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import { NavLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import mapboxgl from "mapbox-gl";

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./MapComponents/layers";
import MapCard from "./MapComponents/MapCard";
import Wrapper from "../css/AllInternships";

export default function ShowSingleMap({ internship,d8ba971ee917cbe15a969fb624b5b207 }) {
  const longtitude = Number(internship.geometry.coordinates[0]);
  const latitude = Number(internship.geometry.coordinates[1]);
  const { title, company, salary, imagesURL } = internship;

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const fb6f121648eed99bc9bcd4bcece99962 = d8ba971ee917cbe15a969fb624b5b207;
  const popup = useMemo(() => {
    return new mapboxgl.Popup({ offset: 25 }).setHTML(
        `  <h1>${title.slice(0, 50)}... at ${company}</h1>
    <img src=${imagesURL[0]} width="100%" height="20%"/>`);
  });
  const togglePopup = useCallback(() => {
    // markerRef.current?.togglePopup();
    // console.log(markerRef.current.togglePopup);
  }, []);

  return (
    <Stack>
      <div id="map" style={{ width: "100%", height: "30rem" }}>
        <Map
          initialViewState={{
            latitude: latitude,
            longitude: longtitude,
            zoom: 10,
          }}
          reuseMaps
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={fb6f121648eed99bc9bcd4bcece99962}
          ref={mapRef}
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />
          <Marker
            longitude={longtitude}
            latitude={latitude}
            anchor="top"
            onClick={togglePopup}
            popup={popup}
            ref={markerRef}
          />
        </Map>
      </div>
    </Stack>
  );
}
