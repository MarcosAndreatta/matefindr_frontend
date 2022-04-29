import React, { FormEvent, useEffect, useState } from "react";
import useHttpandmanageStates from "../react_management/custom_hooks/use-http";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import classes from "./NuevoLugar.module.css";
import { useAppDispatch } from "../react_management/store/hooks";
import { modalActions } from "../react_management/store";
import {useRouter} from "next/router";
const NuevoLugar: React.FC = () => {
  const dispatcher = useAppDispatch();
  const router = useRouter();
  const [nombre, setNombre] = useState<"">("");
  const [comentarios, setComentarios] = useState<"">("");
  const [rating, setRating] = useState<number>()
  const [coordernadas, setCoordenadas] = useState<[number | null, number | null]>([null,null]);
  const {httpFunction, authState} = useHttpandmanageStates();
  const onChangeNombre = (ev) => {
    setNombre(ev.target.value)
  };
  const onChangeComentarios = (ev) => {
    setComentarios(ev.target.value)
  };
  const ratingDivChangeHandler = (ev) => {
    const {id} = ev.target;
    setRating(parseInt(id))
  };
  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    const data = {
      nombre: nombre,
      _id: authState.user.id,
      comentarioCuerpo: comentarios,
      lng: coordernadas[0],
      lat: coordernadas[1],
      comentarioRating: rating
    };
    httpFunction({
      modo: "postear",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/places/new`,
      data: data,
      accessToken: authState.user.accessToken
    }).then(() => {
      dispatcher(modalActions.closeModal());
      router.push("/lugares")
    });
  };
  useEffect(() => {
    // Create a new map
    mapboxgl.accessToken =
      "pk.eyJ1IjoicmV5eGVuZWlzZSIsImEiOiJja3Y4NDI0c3QxdmFtMnZwNnFhc3cxNG5uIn0.QgDKImDO1Qimeh_aMmzUCQ";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-79.4512, 43.6568],
      zoom: 13,  
    });
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: false
    });
    geocoder.on("result", function (e) {
      const marker = new mapboxgl.Marker({draggable: true, color: "pink"}).
      setLngLat(e.result.center).addTo(map);
      setCoordenadas([e.result.geometry.coordinates[0], e.result.geometry.coordinates[1]]);
      marker.on("dragend", (ev: any) => {
        setCoordenadas([ev.target.getLngLat().lng as number, ev.target.getLngLat().lat as number])
      });
    });
    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
  }, []);
  return (
    <div className={`container-sm ${classes.container}`}>
      <h1 className="mt-2 mb-2">Post a new place!</h1>
      <div className="alert alert-secondary" style={{width: "100%"}} role="alert">
         
          <ul className="mt-1">
            <li>Do a general search using the search box and, then, you will get results</li>
            <li>Drag and drop the marker in order to locate more accurately your place</li>
            <li>Don't forget to share a comment, other users will surely find it useful :)</li>
          </ul>
        </div>
      <form onSubmit={onSubmitHandler} className={`${classes.formulario_nuevo_lugar} needs-validation`} noValidate>
        <div className="card" style={{ width: "100%", marginBottom: "20px" }}>
          <div style={{ height: "200px" }} id="map"></div>
          <div className="card-body">
            <div id="geocoder" className={classes.geocoder_div}></div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="mb-3">
                <label htmlFor="Nombre" className="form-label">
                  Place name
                </label>
                <input
                  onChange={onChangeNombre}
                  value={nombre}
                  type="text"
                  className="form-control"
                  id="Nombre"
                  aria-describedby="lugar"
                  required
                ></input>
                <div className="valid-feedback">
                  It looks good
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="mb-3">
                <label htmlFor="Comentarios" className="form-label">
                  Comment
                </label>
                <input
                onChange={onChangeComentarios}
                  value={comentarios}
                  type="text"
                  className="form-control"
                  id="Comentarios"
                  aria-describedby="comentario"
                ></input>
                <div id="comentario" className="form-text">
                  Feel free to share your thoughts
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div onChange={ratingDivChangeHandler} className={`mb-3 ${classes.star_widget}`}>
              <input type="radio" name="rating" id="5" className={`${classes.star} ${classes["star-5"]}`}></input>
              <label htmlFor="5" className={`${classes.star} ${classes["star-5"]}`}></label>
              <input type="radio" name="rating" id="4" className={`${classes.star} ${classes["star-4"]}`}></input>
              <label htmlFor="4" className={`${classes.star} ${classes["star-4"]}`}></label>
              <input type="radio" name="rating" id="3" className={`${classes.star} ${classes["star-3"]}`}></input>
              <label htmlFor="3" className={`${classes.star} ${classes["star-3"]}`}></label>
              <input type="radio" name="rating" id="2" className={`${classes.star} ${classes["star-2"]}`}></input>
              <label htmlFor="2" className={`${classes.star} ${classes["star-2"]}`}></label>
              <input type="radio" name="rating" id="1" className={`${classes.star} ${classes["star-1"]}`}></input>
              <label htmlFor="1" className={`${classes.star} ${classes["star-1"]}`}></label>
              
              </div>
            </li>
            <li className="list-group-item">
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};
export default NuevoLugar;
