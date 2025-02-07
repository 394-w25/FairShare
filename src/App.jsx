import Dispatcher from './components/Dispatcher';
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";


const App = () => {

  return (
    <BrowserRouter>
      <Dispatcher />
    </BrowserRouter>
  );
};

export default App;
