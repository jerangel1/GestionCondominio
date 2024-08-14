import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";


const AppDispatchContext = createContext((params: any) => params);
const AppStateContext = createContext({
  range: {}
});

const AppProvider = ({ children, defaultValue = {} }: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, defaultValue);

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};

export const useStateApp = (): any => useContext(AppStateContext);
export const useDispatchApp = (): any => useContext(AppDispatchContext);

export default AppProvider;
