import useSWR from "swr";
import { useAppDispatch } from "../store/hooks";
import { detailerActions } from "../store";
import { getPlace } from "../helper";
import { useEffect, useMemo } from "react";
const useDetailerStateRegularUpdater = (initialData) => {
  //If an user connected was looking at a place that got erased by the owner, useSwr will get engaged
  //into sending a request with an id that does not exist a
  const {data, mutate} = useSWR(initialData._id, getPlace, {refreshInterval: 15000, fallbackData: initialData});
  const dispatcher = useAppDispatch();
  
  const detailerStateUpdater = useMemo(() => {
    class State2 {
      place: any | null
      dispatcher: typeof dispatcher
      constructor () {
        this.dispatcher = dispatcher;
      }
      registerNewPlace (place: any) {
        this.place = place
      }
      updateDetailerPlace () {
        this.dispatcher(detailerActions.setNewDetailerState({
          algoParamostrar: true,
          lugar: this.place
        }));
      }
    };
    return new State2()
  }, [dispatcher]);
  
  useEffect(() => {
    //Possible bad communication with backend. useSWR will do a get request using an id that
    //doesn't exist anymore because the owner erased within an update cycle.
    
    if (data === "Failed fetching") {
      dispatcher(detailerActions.emptyDetailerState())
    } else if (data.lugar) {
      detailerStateUpdater.registerNewPlace(data.lugar);
      detailerStateUpdater.updateDetailerPlace(); 
    } else if (initialData) {
      detailerStateUpdater.registerNewPlace(initialData);
      detailerStateUpdater.updateDetailerPlace();
    }
    
  },[dispatcher, data, detailerStateUpdater, initialData]);
  return mutate
};
export default useDetailerStateRegularUpdater