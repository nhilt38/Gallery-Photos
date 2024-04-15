import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Upload from "./pages/upload";
import View from "./pages/view-picture";
import "./app.css";
import { autoLogin } from "./actions";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    autoLogin(dispatch);
  }, [dispatch]);
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/view/:photoId" element={<View />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
