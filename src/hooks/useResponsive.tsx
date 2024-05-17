import { useContext } from "react";
import { ResponsiveContext } from "../contexts/ResponsiveContext";

const useResponsive = () => useContext(ResponsiveContext);

export default useResponsive;
