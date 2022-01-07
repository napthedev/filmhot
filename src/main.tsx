import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-lazy-load-image-component/src/effects/opacity.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { SWRConfig } from "swr";

ReactDOM.render(
  <BrowserRouter>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <App />
    </SWRConfig>
  </BrowserRouter>,
  document.getElementById("root")
);
