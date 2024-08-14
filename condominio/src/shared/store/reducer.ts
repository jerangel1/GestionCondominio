import { IAction } from "./action";

const errorActions = (type: string): void => {
  throw new Error(`Unknown action: ${type}`);
};

const setDateRange = (state: any, { init, end }: any): any => ({
  ...state,
  range: {
    init,
    end
  },
});


const actionsType = {
  NOT_FOUND_ACTION: errorActions,
  SET_DATE_RANGE: setDateRange,
};

const reducer = (state: any, action: IAction): any => {
  const { type, params } = action;
  const updateState = actionsType[type];

  return updateState ? updateState(state, params) : errorActions(type);
};

export default reducer;
