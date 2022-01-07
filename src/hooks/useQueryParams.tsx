import { useLocation } from "react-router-dom";

export const useQueryParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  return queryParams;
};
