import React, { useEffect } from "react";
import useHttpandmanageStates from "../react_management/custom_hooks/use-http";
import { authActions, modalActions } from "../react_management/store";
import { useAppDispatch } from "../react_management/store/hooks";
import Informador from "./Informador";
import classes from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import mate from "../../public/images/mate.png";

const Header: React.FC = (props) => {
  const dispatcher = useAppDispatch();
  const logoutHandler = () => {
    dispatcher(authActions.dropUser());
  };
  const { authState, httpFunction } = useHttpandmanageStates();
  useEffect(() => {
    const isAlreadyaToken = localStorage.getItem("porongas");
    if (isAlreadyaToken) {
      httpFunction({
        modo: "autorizar",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/users/authorize`,
        accessToken: localStorage.getItem("porongas"),
      });
    }
    if (!isAlreadyaToken) {
      //console.log("There is not token");
    }
  }, [httpFunction]);
  const loginLinkHandler = () => {
      const expanded = document.querySelector(".navbar-collapse");
      expanded.classList.remove("show");
      dispatcher(modalActions.login({
        modo: "Login"
      }))
  };
  const registerLinkHandler = () => {
    const expanded = document.querySelector(".navbar-collapse");
    expanded.classList.remove("show");
    dispatcher(modalActions.register({
      modo: "Register"
    }))
  };
  return (
    <React.Fragment>
      <section className={`fixed-top ${classes.container_section}`}>
        <div className="container-sm fixed-top">
          <nav
            className={`navbar navbar-expand-lg navbar-dark bg-dark ${classes.fixing}`}
          >
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <Image
                  src={mate}
                  alt="Mate"
                  quality={100}
                  width={30}
                  height={30}
                  className="d-inline-block align-text-top"
                ></Image>
              </a>
              <p className="text-white mb-0">MateFindr</p>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarNav"
                style={{ justifyContent: "flex-end" }}
              >
                <ul className="navbar-nav">
                  {authState.isUser && (
                    <li className="d-flex justify-content-center">
                      <button
                        className="btn btn-light"
                        style={{ paddingRight: "20px", paddingLeft: "20px" }}
                      >
                        {authState.user.username}
                      </button>
                    </li>
                  )}
                  <Link passHref href="/">
                    <li className="nav-item">
                      <a
                        onClick={() => {
                          const expanded =
                            document.querySelector(".navbar-collapse");
                          expanded.classList.remove("show");
                        }}
                        className="nav-link active"
                        href=""
                        aria-current="page"
                      >
                        Home
                      </a>
                    </li>
                  </Link>
                  <Link href="/lugares" passHref>
                    <li className="nav-item">
                      <a
                        onClick={() => {
                          const expanded =
                            document.querySelector(".navbar-collapse");
                          expanded.classList.remove("show");
                        }}
                        className="nav-link"
                        href="#"
                      >
                        See places!
                      </a>
                    </li>
                  </Link>
                  {!authState.isUser && (
                    
                    <li className="nav-item">
                      <a
                        onClick={registerLinkHandler}
                        className="nav-link"
                        href="#"
                      >
                        Register
                      </a>
                    </li>
                  
                )}
                  {!authState.isUser && (
                    
                      <li className="nav-item">
                        <a
                          onClick={loginLinkHandler}
                          className="nav-link"
                          href="#"
                        >
                          Login
                        </a>
                      </li>
                    
                  )}
                  <Link passHref href="/about">
                    <li className="nav-item">
                      <a
                        onClick={() => {
                          const expanded =
                            document.querySelector(".navbar-collapse");
                          expanded.classList.remove("show");
                        }}
                        className="nav-link"
                        href="#"
                      >
                        About Us
                      </a>
                    </li>
                  </Link>
                  {authState.isUser && (
                    <Link passHref href="/nuevoLugar">
                      <li className="nav-item">
                        <a
                          onClick={() => {
                            const expanded =
                              document.querySelector(".navbar-collapse");
                            expanded.classList.remove("show");
                          }}
                          className="nav-link"
                          href="#"
                        >
                         Post a new Place!
                        </a>
                      </li>
                    </Link>
                  )}
                  {authState.isUser && (
                    <Link passHref href="/">
                      <li onClick={logoutHandler} className="nav-item">
                        <a
                          onClick={() => {
                            const expanded =
                              document.querySelector(".navbar-collapse");
                            expanded.classList.remove("show");
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Logout
                        </a>
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        
        <div id="modal"></div>
        <Informador />
      </section>
      
    </React.Fragment>
  );
};
export default Header;
