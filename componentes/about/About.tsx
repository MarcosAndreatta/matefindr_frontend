import React, { useState } from "react";
import classes from "./About.module.css";
import Image from "next/image";
import colt from "../../public/images/colt.png";

const AboutPage = () => {
  const [selected_item, setSelected_item] = useState<string>("About us");
  return (
    <React.Fragment>
      <div className={`${classes.section_1} mb-3`}>
        <div className="container-sm">
          <h1 className="text-white display-3">MateFindr</h1>
        </div>
      </div>
      <div className={classes.separador}></div>
      <div className={classes.section_2}>
        <div className="container-sm">
          <div className={classes.general_wrapper}>
            <div className={`${classes.screen_switcher} mb-4`}>
              <nav
                className={`navbar navbar-expand-lg navbar-light bg-light ${classes.customized_navBar}`}
              >
                <div className="container-fluid">
                  <a className="navbar-brand" href="#">
                    {selected_item}
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span
                      className={`navbar-toggler-icon`}
                      style={{ backgroundImage: "none" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="29"
                        fill="currentColor"
                        className="bi bi-arrows-expand"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10z"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul
                      id="aboutTab"
                      className={`navbar-nav me-auto mb-2 mb-lg-0 nav nav-tabs ${classes.customized_ul}`}
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          onClick={() => {
                            setSelected_item("Just, why?");
                            // const expanded =
                            //   document.querySelectorAll(".navbar-collapse")[1];
                            // expanded.classList.remove("show");
                          }}
                          className="btn nav-link"
                          id="why-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#why"
                          type="button"
                          role="tab"
                          aria-controls="why"
                          aria-selected="true"
                          aria-current="page"
                        >
                          Just, why?
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          onClick={() => {
                            setSelected_item("More About us...");
                            // const expanded =
                            //   document.querySelectorAll(".navbar-collapse")[1];
                            // expanded.classList.remove("show");
                          }}
                          className="btn nav-link"
                          id="more-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#more"
                          type="button"
                          role="tab"
                          aria-controls="more"
                          aria-selected="false"
                        >
                          More About us...
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div
                className={`tab-content p-4 ${classes.tab_content}`}
                id="myTabContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="why"
                  role="tabpanel"
                  aria-labelledby="why-tab"
                >
                  <figure className="text-center">
                    <p className="lead mb-3">
                      {" "}
                      This is why I decided to make this...
                    </p>
                    <div className={classes.general_wrapper}>
                      <div className={classes.image_wrapper}>
                        <Image
                          className={classes.image}
                          src="https://www.therecoveryvillage.com/wp-content/uploads/2018/11/DEPRESSION.jpg"
                          alt="Deppression"
                          layout="fill"
                        ></Image>
                      </div>
                      <div className={classes.text_wrapper}>
                        <h3 className="lh-base fw-bolder">
                          Crisis are a bottom, and a turnaround point.
                        </h3>
                        <p className="lh-base">
                          Due to reasons that are wide to explain here, I got into a huge personal crisis, few time ago.
                          How do I think one should get himself out of a crisis?... Just by improving, or at least trying to.
                          As a result, I got engaged into programming learning, so I am now making this simple demo app to prove what, just for now because I am constantly learning, I am able to develop.
                        </p>
                      </div>
                    </div>
                  </figure>
                </div>
                <div
                  className="tab-pane fade"
                  id="more"
                  role="tabpanel"
                  aria-labelledby="more-tab"
                >
                  <figure className="text-center">
                    <p className="lead mb-3">Where "MateFindr" originally comes from</p>
                    <div className={classes.general_wrapper}>
                      <div className={classes.image_wrapper}>
                        <Image
                          className={classes.image}
                          src={colt}
                          alt="Deppression"
                          layout="fill"
                        ></Image>
                      </div>
                      <div className={classes.text_wrapper}>
                        <h3 className="lh-base fw-bolder">
                          YelpCamp, and a pivot...
                        </h3>
                        <p className="lh-base">
                          The first course I took was one that belongs to Colt Steele, a Udemy's teacher. It was a bootcamp in which I learnt the basics of web developing, which, in my opinion, gave me good foundations.
                          At the end of the course, a demo app was made, called YelpCamp. I decided to refactor it in this "MateFindr" app, using React.
                        </p>
                      </div>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AboutPage;
