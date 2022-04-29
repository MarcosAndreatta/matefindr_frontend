import { FetchingData } from "../../../types";

const useActualizadorDetallador = () => {
    class State {
        id: string = null;
        private static instance: State;
        async sendRequest() {
            try {
                
                const preliminaryResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/places/show/${this.id}`);
                if (!preliminaryResponse.ok) {
                    throw new Error("Response not ok")
                };
                
                const response: FetchingData.response = await preliminaryResponse.json();
               return response;
            }
            catch (e) {console.log("From actualizardetallador, response failed")}
        }
        retornarId () {
            return this.id
        }
        registrarId(id: string) {
            this.id = id;
        }
        static getInstance () {
            if (this.instance) {return this.instance}
            else {return new State()}
        }
    }
    const stateManagementObject = State.getInstance()
    
    
    return stateManagementObject
};
export default useActualizadorDetallador