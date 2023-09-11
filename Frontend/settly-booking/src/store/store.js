import { createContext, useEffect, useState } from "react";

// Step 1 : create Context
export const AppContext = createContext();

// Step 2 : Provide
const initial = {
  data: [],
  isLoading: true, 
  isError: false,
};
const AppContextProvider = ({ children }) => {
    const [store,setStore] = useState(initial)
const renderData = (action,payload)=>{
switch (action) {
    case "fetchLoading":
        let updatedValue = {isLoading:true,data:[],isError:false}
        setStore(store => ({
            ...store,
            ...updatedValue
          }));
          break;
    case "fetchsucces":
        let updatedValue2 = {isLoading:false,data:payload,isError:false}
        setStore(store => ({
            ...store,
            ...updatedValue2
          }));
          break;
    case "fetcherror":
        let updatedValue3 = {isLoading:false,data:[],isError:true}
        setStore(store => ({
            ...store,
           ... updatedValue3
          }));
          break;
   
   

}
}

useEffect(() => {
  console.log("Updated store:", store);
}, [store]);

  return (
    <AppContext.Provider value={{ store ,renderData}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;