import * as React from "react";
import { useRef, useState } from "react";
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
import { customFetch } from "../utils";


import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./MapComponents/layers";
import MapCard from "./MapComponents/MapCard";

const MAPBOX_TOKEN ="pk.eyJ1IjoiaHVuZ25nb2NzIiwiYSI6ImNscWZ4YjhwdTEzdnUyanBycTFkMzl4Y2oifQ.rnPCLhr8QSM5WMsN7pvg7g"; // Set your mapbox token here

export default function ClusterMap({ internship, token }) {
    
  const mapRef = useRef(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [pin, setPin] = useState(false);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const geojson = {
    type: "FeatureCollection",
    crs: {
      type: "internship",
      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
    },
    features: [...internship],
  };


  const onClick = (event) => {
    const Clusterfeatures = mapRef.current.queryRenderedFeatures(event.point, {
      layers: ["clusters"],
    });

    const Clusterfeature = Clusterfeatures[0];
    if (Clusterfeature) {
      const clusterId = Clusterfeature.properties.cluster_id;

      const mapboxSource = mapRef.current.getSource("internships");
    //   mapboxSource.getClusterLeaves(clusterId, 100, 0,
    //     function (err, leafFeatures) {
    //       if (err) {
    //         return console.error(
    //           "error while getting leaves of a cluster",
    //           err
    //         );
    //       }
    //     console.log(leafFeatures)
    //     }
    //   );
      setPopupInfo(null);
      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }

        mapRef.current.easeTo({
          center: Clusterfeature.geometry.coordinates,
          zoom,
          duration: 500,
        });
      });
    }

    const UnClusterfeatures = mapRef.current.queryRenderedFeatures(
      event.point,
      { layers: ["unclustered-point"] }
    );
    if (UnClusterfeatures.length > 0) {
      const feature2 = UnClusterfeatures[0];
      const { popUpMarkup } = feature2.properties;
      const JSONdata = JSON.parse(popUpMarkup);

      const coordinates = feature2.geometry.coordinates.slice();

      while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      setPopupInfo({
        longitude: coordinates[0],
        latitude: coordinates[1],
        title: JSONdata.title,
        company: JSONdata.company,
        salary: JSONdata.salary,
        urlImage: JSONdata.urlImage,
      });
    }
  };

  const onMouseEnter = (event) => {
    mapRef.current.getCanvas().style.cursor = "pointer";
    const Clusterfeatures = mapRef.current.queryRenderedFeatures(event.point, {
      layers: ["clusters"],
    });
    if (Clusterfeatures) {
    }
    const UnClusterfeatures = mapRef.current.queryRenderedFeatures(
      event.point,
      { layers: ["unclustered-point"] }
    );
    if (UnClusterfeatures) {
      console.log("heyeey");
    }
  };

  const onMouseLeave = (event) => {
    mapRef.current.getCanvas().style.cursor = "";
  };

  const onMove = (event) => {
    setLng(mapRef.current.getCenter().lng.toFixed(4));
    setLat(mapRef.current.getCenter().lat.toFixed(4));
    setZoom(mapRef.current.getZoom().toFixed(2));
    console.log("hey")

  };
  return (
    <Stack>
      <div className="sidebar">
        <span>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </span>
      </div>
      <div id="map">
        <Map
          initialViewState={{
            latitude: 39.8283,
            longitude: -98.5795,
            zoom: 2.5,
          }}
          reuseMaps
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={[clusterLayer.id]}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMove={onMove}
          ref={mapRef}
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />

          <Source
            id="internships"
            type="geojson"
            data={geojson}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              onClose={() => setPopupInfo(null)}
            >
              <MapCard
                title={popupInfo.title}
                company={popupInfo.company}
                salary={popupInfo.salary}
                urlImage={popupInfo.urlImage}
                width={100}
                height={80}
              />
            </Popup>
          )}
        </Map>
      </div>
    </Stack>
  );
}
