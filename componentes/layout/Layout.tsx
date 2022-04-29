import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Modal from "../UI/modal/Modal";
import classes from "./Layout.module.css";
import { useAppSelector } from "../react_management/store/hooks";
interface LayoutProps {
  children: JSX.Element;
};

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const modalState = useAppSelector((states) => {
    return states.modal;
  });
  return (
    <div className={classes.wrapper}>
      <Header />

      <div style={{ height: "65px" }} />
      <Modal modo={modalState.modo} formOptions={modalState.formOptions}/>
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
        
        
        {props.children}
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
