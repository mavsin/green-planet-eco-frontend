import { createContext, ReactNode, useEffect, useReducer } from "react";
import { useMediaQuery } from "react-responsive";
import { IHandlers } from "../utils/interfaces";
import { TSizeOfDialog } from "../utils/types";

interface IState {
  dialogSize: TSizeOfDialog;
}

interface IAction {
  type: string;
  payload: TSizeOfDialog;
}

const initialState: IState = {
  dialogSize: "xs",
};

const handlers: IHandlers = {
  SET_DIALOG_SIZE: (state: IState, action: IAction) => ({
    ...state,
    dialogSize: action.payload,
  }),
};

const reducer = (state: IState, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const ResponsiveContext = createContext({
  ...initialState,
  setDialogSizeAct: (value: TSizeOfDialog) => Promise.resolve(),
});

const ResponsiveProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ minWidth: 480, maxWidth: 768 });
  const isLaptop = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1280 });

  useEffect(() => {
    if (isMobile) {
      setDialogSizeAct("xxl");
    } else if (isTablet) {
      setDialogSizeAct("xl");
    } else if (isLaptop) {
      setDialogSizeAct("xl");
    } else if (isDesktop) {
      setDialogSizeAct("sm");
    } else {
      setDialogSizeAct("lg");
    }
  }, [isMobile, isTablet, isLaptop]);

  const setDialogSizeAct = (size: TSizeOfDialog) => {
    dispatch({
      type: "SET_DIALOG_SIZE",
      payload: size,
    });
  };

  return (
    <ResponsiveContext.Provider value={{ ...state, setDialogSizeAct }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export { ResponsiveContext, ResponsiveProvider };
