import React from 'react';
import './App.css';
import Header from "./container/Header/Header";
import Routers from "./container/Routers/Routers";
import {ToastContainer} from "react-toastify";
import CssBaseline from "@material-ui/core/CssBaseline";
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import Container from "@material-ui/core/Container";


function App() {
  const user = useSelector(state => state.users.user);

  return (
      <div>
        <CssBaseline/>
        <ToastContainer autoClose={1000}/>
        <Header user={user}/>
        <Container>
          <Routers/>
        </Container>
      </div>
  );
}

export default App;
