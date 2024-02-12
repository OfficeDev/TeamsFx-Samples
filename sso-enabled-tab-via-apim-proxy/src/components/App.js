// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from "react";
import "./App.css";
import * as microsoftTeams from "@microsoft/teams-js";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Privacy from "./about/Privacy";
import TermsOfUse from "./about/TermsOfUse";
import Tab from "./Tab";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
function App() {
  // Check for the Microsoft Teams SDK object.
  if (microsoftTeams) {
    return (
      <Router>
        <Routes>
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/termsofuse" element={<TermsOfUse />} />
          <Route path="/tab" element={<Tab />} />
        </Routes>
      </Router>
    );
  } else {
    return <h3>Microsoft Teams SDK not found.</h3>;
  }
}

export default App;
