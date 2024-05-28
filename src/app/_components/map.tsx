"use client";

import { hexToRGBAArray } from "@/lib/utils";
import { useTrackerStore } from "@/stores/tracker-store";
import { DeckGL, GeoJsonLayer, IconLayer, MapViewState } from "deck.gl";
import "mapbox-gl/dist/mapbox-gl.css";
import BaseMap from "react-map-gl";
import { orange, zinc } from "tailwindcss/colors";
interface MapProps {}

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmlsaXBlY29yZG92aWwiLCJhIjoiY2lmOGNsdXBpMXJuMHNxa3J2MWN3YTVhdyJ9.q7geugmweU-PVCLr9fJh1g";

export const MAP_INITIAL_VIEW_STATE: MapViewState = {
  longitude: -46.5735131,
  latitude: -23.6477519,
  zoom: 3,
  bearing: 0,
  pitch: 0,
  maxZoom: 24,
  minZoom: 16,
};

export function Map({}: MapProps) {
  const { location } = useTrackerStore();

  const layers = [
    new GeoJsonLayer({
      id: "geojson-layer",
      data: "https://gist.githubusercontent.com/ruymon/e29af690142f888dfa3893b47749bcb3/raw/fe67b1fdf96691340daabce4ead2f2400b66bb1d/maua.geojson",

      stroked: true,
      filled: true,
      pointType: "circle",
      pickable: true,
      autoHighlight: true,
      colorFormat: "RGBA",
      getFillColor: hexToRGBAArray(zinc[300]),
      getLineColor: hexToRGBAArray(zinc[500]),
      getLineWidth: 2,
    }),
    new IconLayer({
      id: "tracker-layer",
      data: location ? [location] : null,

      getPosition: (d) => [d.coords.longitude, d.coords.latitude],

      getColor: hexToRGBAArray(orange[500]),
      getIcon: (d: any) => "marker",
      getSize: 40,
      iconAtlas:
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
      iconMapping:
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json",
    }),
  ];

  return (
    <figure
      className="absolute inset-0 flex h-full w-full"
      onContextMenu={(event) => event.preventDefault()}
    >
      <DeckGL
        pickingRadius={10}
        controller={{
          doubleClickZoom: false,
        }}
        initialViewState={MAP_INITIAL_VIEW_STATE}
        layers={layers}
        getTooltip={({ object }) =>
          (object && object.properties?.Name) || object?.coords?.latitude
        }
      >
        <BaseMap
          attributionControl={false}
          reuseMaps={true}
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
          antialias={true}
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
    </figure>
  );
}
