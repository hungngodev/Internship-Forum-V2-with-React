import Stack from "@mui/material/Stack";
import * as React from "react";
import { useRef, useState } from "react";
import {
  FullscreenControl,
  GeolocateControl,
  Layer,
  Map,
  NavigationControl,
  Popup,
  ScaleControl,
  Source
} from "react-map-gl";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import MapCard from "./MapComponents/MapCard";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./MapComponents/layers";

import Font from "../utils/FontConfiguration";

export default function ClusterMap({
  internship,
  c9db5c7a7d7755f4560c3f9fae9968b1,
}) {
  const theme = useTheme();
  const mapRef = useRef(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [pin, setPin] = useState(false);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const c13cfc645b73bd5a00ec181c30a56379 = c9db5c7a7d7755f4560c3f9fae9968b1;
  const geojson = {
    type: "FeatureCollection",
    crs: {
      type: "internship",
      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
    },
    features: [...internship],
  };
 
  const onClick = (event) => {
    setLng(mapRef.current.getCenter().lng.toFixed(4));
    setLat(mapRef.current.getCenter().lat.toFixed(4));
    setZoom(mapRef.current.getZoom().toFixed(2));
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
    console.log(UnClusterfeatures);
    if (UnClusterfeatures.length >= 0) {
      mapRef.current.getCanvas().style.cursor = "pointer";
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
        id: JSONdata._id,
      });
    }
    console.log(popupInfo);
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
      mapRef.current.getCanvas().style.cursor = "pointer";
    }
  };

  const onMouseLeave = (event) => {
    mapRef.current.getCanvas().style.cursor = "";
  };
  // const onLoad = (e) => {
  //   if (mapRef.current) {
  //     const pinImage = new Image();
  //     pinImage.onload = () => {
  //       if (!mapRef.current.hasImage('pin')) {
  //         mapRef.current.addImage('pin', pinImage, { sdf: true });
  //       }
  //     }
  //     pinImage.src = pin; // pin is your svg import
  //   }
  // }
  return (
    <Stack>
      <div
        className="sidebar"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "90vw",
          height: "8vh",
          color: "#fff",
          fontFamily: "monospace",
          fontSize: "2rem",
          zIndex: 1,
          position: "static",
          top: 0,
          left: 0,
          border: "3px solid",
          borderColor: theme.palette.secondary.main,
          borderRadius: "4px",
        }}
      >
        <Typography variant="h4" color="primary" fontFamily={Font.subtitle}>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </Typography>
      </div>
      <div id="map" style={{ width: "90vw", height: "70vh" }}>
        <Map
          initialViewState={{
            latitude: 39.8283,
            longitude: -98.5795,
            zoom: 2.5,
          }}
          reuseMaps
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={c13cfc645b73bd5a00ec181c30a56379}
          interactiveLayerIds={[clusterLayer.id]}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          // onLoad={onLoad}

          ref={mapRef}
        >
          {popupInfo != null && (
            <Popup
              anchor="top"
              // closeOnClick={false}
              key= {popupInfo.longitude + popupInfo.latitude}
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
                id={popupInfo.id}
              />
            </Popup>
          )}
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
        </Map>
      </div>
    </Stack>
  );
}
