import React from "react";
import FormValidation from "./components/FormValidation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <>
      {/* zastosowanie routingu  */}
      <Router>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" exact />
        </Routes>
        <FormValidation />
      </Router>
    </>
  );
}
