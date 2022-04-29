import React from "react";
import classes from "./Footer.module.css";

const Footer: React.FC = () => {
    return <div className={classes.container_div}>
        <div className="container-sm">
        <p className="text-white">Demo app by Marcos Andreatta</p>
        </div>
    </div>
};
export default Footer