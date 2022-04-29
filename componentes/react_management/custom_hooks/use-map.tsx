import mapboxgl from "mapbox-gl";
import React, { useEffect, useMemo } from "react";
import { State } from "../../../types";


/////////////////////////////////////////////////////////////////////////////////////////

const useMapa = (initialData: State.lugarMinimal[] | undefined) => {
  

  const State = useMemo(() => {
    class State {
      listeners: Function[] = [];
      data: State.lugarMinimal[] | undefined;
      addListener(listener: Function) {
        this.listeners.push(listener);
        this.updateListeners()
      }
      updateListeners() {
        
        for (let listener of this.listeners) {
          listener(this.data);
        }
      }
      setData(data: State.lugarMinimal[] | undefined) {
        this.data = data;
      }
    }
    return State;
  }, []);

  const state = useMemo(() => {
    return new State();
  }, [State]);
  useEffect(() => {
    state.setData(initialData);
  }, [initialData, state]);

  const dataGetter = (data: State.lugarMinimal[] | undefined) => {
    state.setData(data);
  };
  class Map {
    map: React.MutableRefObject<mapboxgl.Map>;
    constructor(map: React.MutableRefObject<mapboxgl.Map>) {
      this.map = map;
      this.map.current.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (error, result) => {
          if (error) {
            throw error;
          }
          this.map.current.addImage("custom-marker", result);
        }
      );
      map.current.on("load", (ev) => {
        map.current.addSource("points", this.crearSource(state.data));
        map.current.addLayer({
          id: "points",
          type: "symbol",
          source: "points",
          layout: {
            "icon-image": "custom-marker",
            // get the title name from the source's "title" property
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 1.25],
            "text-anchor": "top",
          },
        });
        state.addListener(this.updatePoints);
      });
      
    }
    crearSource(data: State.lugarMinimal[]) {
      const makeFeatures = () => {
        const features: Array<GeoJSON.Feature> = data.map((value) => {
          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [value.ubicacion[0], value.ubicacion[1]],
            },
            properties: {
              title: value.nombre,
              _id: value._id,
            },
          };
        });
        return features;
      };
      const source: mapboxgl.AnySourceData = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: makeFeatures(),
        },
      };
      return source;
    }
    updatePoints = (data: State.lugarMinimal[]) => {
      const makeFeatures = () => {
        const features: Array<GeoJSON.Feature> = data.map((value) => {
          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [value.ubicacion[0], value.ubicacion[1]],
            },
            properties: {
              title: value.nombre,
              _id: value._id,
            },
          };
        });
        return features;
      };
      const crearJSONObject = () => {
        return {
          type: "FeatureCollection",
          features: makeFeatures(),
        };
      };
        const sourcePoints = this.map.current.getSource("points") as any;
        sourcePoints.setData(crearJSONObject());
    }
    addOnListenerOnLayer(
      event: keyof mapboxgl.MapLayerEventType,
      layer: string,
      listener: (ev) => void
    ) {
      this.map.current.on(event, layer, listener);
    }
  }

  const mapGetter = (map: React.MutableRefObject<mapboxgl.Map>) => {
    const mapa = new Map(map);
    return mapa;
  };

  return { mapGetter, dataGetter, state };
};
export default useMapa;
