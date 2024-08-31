import AOS from "aos";
import { Provider } from "react-redux";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Router from "./Router";
import store from "./store";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
}

export default App;
