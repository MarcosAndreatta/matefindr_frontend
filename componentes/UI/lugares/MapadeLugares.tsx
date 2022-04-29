import React, { useRef, useEffect, useCallback} from "react";
import mapboxgl from "mapbox-gl";
import classes from "./Lugar.module.css";
import useSWR from "swr";
import {getPoints} from "../../react_management/helper";
import { useAppDispatch } from "../../react_management/store/hooks";
import {detailerActions } from "../../react_management/store";
import Detailer from "./Detailer";
import useActualizadorDetallador from "../../react_management/custom_hooks/use-actualizadorDetallador";
import useHttpandmanageStates from "../../react_management/custom_hooks/use-http";
import useMapa from "../../react_management/custom_hooks/use-map";
import { State } from "../../../types";
////////////////////////// Interfaces /////////////////////////
interface MapadeLugaresProps {
  lugares: State.lugarMinimal[];
}
////////////////////React function/////////////////////////////
const MapadeLugares: React.FC<MapadeLugaresProps> = (props) => {
  ///////////////////////////////Hooks calling///////////////////////////////
  
  const dispatcher = useAppDispatch();
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map>(null);
  const stateManagementObject = useActualizadorDetallador();
  const { detailerState } = useHttpandmanageStates();
  const { data: lugarMinimalData, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/lugares`,
    getPoints,
    { refreshInterval: 15000, fallbackData: props.lugares }
  );
  const {mapGetter, state} = useMapa(props.lugares);
  const purgeThisPlace = (lugar: string) => {
    const mutateTo = lugarMinimalData.filter((lugarMinimal: State.lugarMinimal) => {
      return lugarMinimal._id !== lugar
    });
    mutate(mutateTo)
  };
  const getCenter = useCallback(() => {
    if (props.lugares.length > 0) {
      const preliminaryLocations = [0, 0];
    props.lugares.forEach((value) => {
      const previousIndex0value = preliminaryLocations[0];
      const previousIndex1value = preliminaryLocations[1];
      preliminaryLocations[0] = previousIndex0value + value.ubicacion[0];
      preliminaryLocations[1] = previousIndex1value + value.ubicacion[1]
    });
    const centerAt = [(preliminaryLocations[0])/props.lugares.length, (preliminaryLocations[1])/props.lugares.length];
    const lngLat: {lng: number, lat: number} = {
      lng: centerAt[0],
      lat: centerAt[1]
    };
    return lngLat
    } else {
      return {lng: -58, lat: -34}
    }
  }, [props.lugares]);
  
  ///////////////////////////////////////////////////////////Map/////////////////////////////////////
  useEffect(() => {
      mapboxgl.accessToken =
      "pk.eyJ1IjoicmV5eGVuZWlzZSIsImEiOiJja3Y4NDI0c3QxdmFtMnZwNnFhc3cxNG5uIn0.QgDKImDO1Qimeh_aMmzUCQ";
    if (map.current) {
      return;
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: getCenter(),
      zoom: 3,
    });
    const mapa = mapGetter(map);
    
    mapa.addOnListenerOnLayer("click", "points", (ev) => {
      //Get rid of the if check, because it triggers some updating bug
      //if (stateManagementObject.retornarId() !== ev.features[0].properties._id) {
        stateManagementObject.registrarId(ev.features[0].properties._id);
        stateManagementObject.sendRequest()
        .then((response) => {
          
          //Why don't just pass the lugar data, which comes into the response, via props instead of redux?
          dispatcher(detailerActions.setNewDetailerState({ //Trigger an update of State. state2.setNewDetailerState(data)
            algoParamostrar: true,
            lugar: {
              _id: response.lugar._id,
              nombre: response.lugar.nombre,
              author: {
                _id: response.lugar.author._id,
                username: response.lugar.author.username
              },
              comentarios: response.lugar.comentarios
            }
          }));
        })
        .catch((error) => {console.log("From mapa de lugares, there was an error:", error)});
      
    });
    mapa.addOnListenerOnLayer("touchstart", "points", (ev) => {
      mapa.map.current.getCanvas().style.cursor = "pointer"
    });
    mapa.addOnListenerOnLayer("mouseenter", "points", (ev) => {
      mapa.map.current.getCanvas().style.cursor = "pointer"
    });
    mapa.addOnListenerOnLayer("mouseleave", "points", (ev) => {
      mapa.map.current.getCanvas().style.cursor = ""
    });
  }, [mapGetter, stateManagementObject, dispatcher, getCenter]);
  useEffect(() => {
    state.setData(lugarMinimalData);
    state.updateListeners()
  }, [lugarMinimalData, state])
  
  /////////////////////////////Return statement////////////////////////////////
  return (
    <React.Fragment>
      <div style={{ marginBottom: "20px" }} className="card">
        <h5 className="card-header">Map of places to drink mate</h5>
        <div className="card-body">
          <div className={classes.contenedor_superior}>
            <div ref={mapContainer} className={classes.map_container} />
          </div>
          <div className={classes.contenedor_inferior}>
            {detailerState.algoParamostrar && <Detailer purgeThisPlace={purgeThisPlace} lugar={detailerState.lugar}/>}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default MapadeLugares;
