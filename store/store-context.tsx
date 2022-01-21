import React, { createContext, useReducer } from "react";

const initialState = {
  latLong: "",
  coffeeStores: [],
};

export const StoreContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

export interface CoffeeStore {
  id: number;
  name: string;
  imgUrl: string;
  websiteUrl: string;
  address: string;
  neighbourhood: string;
}

type State = {
  latLong: string;
  coffeeStores: CoffeeStore[];
};

type CoffeStoresAction = {
  type: typeof ACTION_TYPES.SET_COFFEE_STORES;
  payload: { coffeeStores: CoffeeStore[] };
};

type LangLatAction = {
  type: typeof ACTION_TYPES.SET_LAT_LONG;
  payload: { latLong: string };
};

type Action = CoffeStoresAction | LangLatAction;

const storeReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return {
        ...state,
        latLong: (action as LangLatAction).payload.latLong,
      };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return {
        ...state,
        coffeeStores: (action as CoffeStoresAction).payload.coffeeStores,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
