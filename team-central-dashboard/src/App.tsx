import "./App.css";

import { useEffect } from "react";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import {
  FluentProvider,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
} from "@fluentui/react-components";
import { app } from "@microsoft/teams-js";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";

import MyDashboard from "./dashboards/MyDashboard";
import { TeamsFxContext } from "./internal/context";
import TabConfig from "./TabConfig";

export default function App() {
  const { loading, themeString } = useTeamsUserCredential({
    initiateLoginEndpoint: process.env.REACT_APP_START_LOGIN_PAGE_URL!,
    clientId: process.env.REACT_APP_CLIENT_ID!,
  });
  useEffect(() => {
    loading &&
      app.initialize().then(() => {
        // Hide the loading indicator.
        app.notifySuccess();
      });
  }, [loading]);
  return (
    <TeamsFxContext.Provider value={{ themeString }}>
      <FluentProvider
        id="fluent-provider"
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : teamsLightTheme
        }
      >
        {!loading && (
          <Router>
            <Routes>
              <Route path="/tab" element={<MyDashboard />} />
              <Route path="/config" element={<TabConfig />} />
              <Route path="*" element={<Navigate to={"/tab"} />} />
            </Routes>
          </Router>
        )}
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
