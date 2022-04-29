import React from "react";
import MapadeLugares from "../UI/lugares/MapadeLugares";
interface LugaresPageProps {
  lugares: {
    nombre: string;
    ubicacion: [number, number];
    _id: string;
    autor_id: string;
  }[];
}

const LugaresPage: React.FC<LugaresPageProps> = (props) => {
  return (
    <React.Fragment>
      <div className="container-sm d-flex flex-column justify-content-evenly">
        <h1 className="mt-2 mb-2" style={{ textAlign: "center" }}>Places to drink some mate</h1>
        <div className="alert alert-secondary" role="alert">
          Just touch a place and get valuable information!. You can:
          <ul className="mt-1">
            <li>Add, edit and delete comments</li>
            <li>See what other people think about the selected place!</li>
          </ul>
          The information you see, is real-time updated!
        </div>
      
      
        <p></p>
        <div className="map"></div>
        <MapadeLugares lugares={props.lugares} />
      </div>
    </React.Fragment>
  );
};
export default LugaresPage;
