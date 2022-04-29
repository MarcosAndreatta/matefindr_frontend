import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CSSTransition } from "react-transition-group";
import classes from "./Homepage.module.css";
import mate1 from "../../public/images/mate1.jpeg";
import mate2 from "../../public/images/mate2.png";
import mate3 from "../../public/images/mate3.jpeg";
import Link from "next/link";
import { State } from "../../types";


const Homepage: React.FC = () => {
  // Element to intersect with
  const hechoParasercruzado_3 = useRef<HTMLDivElement>(null);
  const hechoParasercruzado_2 = useRef<HTMLDivElement>(null); 
  const hechoParasercruzado_1 = useRef<HTMLDivElement>(null); 
  const [esVisible_section1, setEsVisibleSection1] = useState(true);
  const [esVisible_section2, setEsVisibleSection2] = useState(true);
  const [esVisible_section3, setEsVisibleSection3] = useState(false);
  useEffect(() => {
    ////////////////////
    let intersectionObserverOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: [1],
    };
    //////////////////////
    let section_3_IntersectionHandler: State.intersectionHandler = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setEsVisibleSection3(true);
        }
        if (!entry.isIntersecting) {
          setEsVisibleSection3(false);
        }
      });
    };
    
    let section_1_IntersectionHandler: State.intersectionHandler = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setEsVisibleSection1(true);
        }
        if (!entry.isIntersecting) {
          setEsVisibleSection1(false);
        }
      });
    };
    //////////////////////
    let section_3_Observer = new IntersectionObserver(
      section_3_IntersectionHandler,
      intersectionObserverOptions
    );
   
    let section_1_Observer = new IntersectionObserver(
      section_1_IntersectionHandler,
      intersectionObserverOptions
    );
    /////////////////////////////////////  
    setTimeout(() => {
      
      section_1_Observer.observe(hechoParasercruzado_1.current);
      section_3_Observer.observe(hechoParasercruzado_3.current);
    }, 1000);
  }, []);

  return (
    <React.Fragment>
      
      <CSSTransition
        mountOnEnter
        
        in={esVisible_section1}
        timeout={1000}
        classNames={{
          enter: classes["transition-enter"],
          enterActive: classes["transition-enter-active"],
          exit: classes["transition-exit"],
          exitActive: classes["transition-exit-active"],
        }}
      >
        <section className={classes.section_1}>
        <Image src={mate1}
          alt="Drinking mate"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          />
          <div
            className="container-sm d-flex justify-content-center"
          >
            <div className={classes.descriptor}>
              <h2 className="text-white mb-4">Do you use to drink mate?</h2>
              <p className="text-white fst-italic">
                Mate is made to be shared, so why do not use it as it was made
                for? Find places posted by people like you, to drink mate with
                your friends.
              </p>
              <Link passHref href="/lugares">
                <a className="btn btn-outline-light">Enter here, and find places</a>
              </Link>
              
            </div>
          </div>
         
        </section>
      </CSSTransition>
      <div id="section_1" ref={hechoParasercruzado_1}></div>
      
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={esVisible_section2}
        timeout={1000}
        classNames={{
          enter: classes["transition-enter"],
          enterActive: classes["transition-enter-active"],
          exit: classes["transition-exit"],
          exitActive: classes["transition-exit-active"],
        }}
      >
        <section className={`${classes.section_2}`}>
          
          <div className="container-sm">
            <div className={classes.tarjeta}>
              <div className={classes.image_container}>
                <Image
                  priority
                  quality={100}
                  layout="fill"
                  alt="Vale por una imagen"
                  src={mate2}
                ></Image>
              </div>
              <h2 className="mb-4 text-white">
                Do you have a mate like that?
              </h2>
              <p className="fst-italic text-end lh-base text-white">
               Just share it!, do not drink it alone. If you face issues when trying to find partners, I really encourage you to use this app!. Try it!
              </p>
            </div>
          </div>
        </section>
      </CSSTransition>
      
      <div id="section_2" ref={hechoParasercruzado_2}></div>
      <div id="section_3" ref={hechoParasercruzado_3}></div>
      <CSSTransition
        mountOnEnter
        
        in={esVisible_section3}
        timeout={1000}
        classNames={{
          enter: classes["transition-enter"],
          enterActive: classes["transition-enter-active"],
          exit: classes["transition-exit"],
          exitActive: classes["transition-exit-active"],
        }}
      >
        <section className={classes.section_3}>
        <Image src={mate3}
          alt="Drinking mate"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          />
          <div className="container-sm d-flex justify-content-center">
            <div className={classes.descriptor}>
            <h2 className="text-white mb-4">Do you lack of friends?</h2>
            <Link passHref href="/lugares">
                <a className="btn btn-outline-light">So, enter now a find some new ones!</a>
              </Link>
            
            </div>
          </div>
        </section>
      </CSSTransition>
      
    </React.Fragment>
  );
};
export default Homepage;
