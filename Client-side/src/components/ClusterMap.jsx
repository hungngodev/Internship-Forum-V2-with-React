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

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./MapComponents/layers";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaHVuZ25nb2NzIiwiYSI6ImNscWZ4YjhwdTEzdnUyanBycTFkMzl4Y2oifQ.rnPCLhr8QSM5WMsN7pvg7g"; // Set your mapbox token here

export default function ClusterMap({ internship, token }) {
  const mapRef = useRef(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [pin, setPin] = useState(false);

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
    console.log(UnClusterfeatures);
    const feature2 = UnClusterfeatures[0];
    const { popUpMarkup } = feature2.properties;
    const coordinates = feature2.geometry.coordinates.slice();
    console.dir(event);
    while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    setPopupInfo({
      longitude: coordinates[0],
      latitude: coordinates[1],
      popUpMarkup: popUpMarkup,
    });
  };

  return (
    <div id="map">
      <Map
        initialViewState={{
          latitude: 39.8283,
          longitude: -98.5795,
          zoom: 2.5,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={onClick}
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
                <div>
               {popupInfo.popUpMarkup}
                </div>
                <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>
    </div>
  );
}
