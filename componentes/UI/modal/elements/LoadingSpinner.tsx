import React from "react";
import classes from "../Modal.module.css";
const LoadingSpinner: React.FC = () => {
    const modalContents = (
        <div className={classes.modal}>
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border"
              style={{ width: "6rem", height: "6rem", color: "white"}}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      );
      return modalContents
};
export default LoadingSpinner