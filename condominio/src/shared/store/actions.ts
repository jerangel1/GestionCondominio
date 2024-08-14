import { useDispatchApp } from "./context";

interface IUseActionsDispatch {
	setDateRange: ({ init, end }: any) => void;
}

const useActionsDispatch = (): IUseActionsDispatch => {
  const dispatch = useDispatchApp();

  const setDateRange = ({ init, end }: any): void => {
    dispatch({ type: "SET_DATE_RANGE", params: { init, end } });
  };


  return {
    setDateRange
  };
};

export default useActionsDispatch;
