import React from "react";
import { InferGetStaticPropsType } from "next";
import {getPoints} from "../../componentes/react_management/helper";
import LugaresPage from "../../componentes/lugares/Lugares";
const LugaresPage_: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({lugares}) => {
    return <React.Fragment>
        
        <LugaresPage lugares={lugares}></LugaresPage>
    </React.Fragment>
};

export default LugaresPage_
export async function getStaticProps (context) {
    let lugares = [];
    try {
        lugares = await getPoints()
    }
    catch (e) {console.log(e)}
    return {
        props: {
          lugares: lugares,
        },
        revalidate: 30,
      };
};
