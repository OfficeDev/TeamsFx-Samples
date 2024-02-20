import "../styles/MyDashboard.css";

import { Image, Spinner } from "@fluentui/react-components";
import { BaseDashboard } from "@microsoft/teamsfx-react";

import { loginAction } from "../internal/login";
import { TeamsUserCredentialContext } from "../internal/singletonContext";
import { Calendar } from "../widgets/Calendar";
import { Chart } from "../widgets/Chart";
import { Collaboration } from "../widgets/Collaboration";
import { Documents } from "../widgets/Document";
import { Task } from "../widgets/Task";

const scope = ["Files.Read", "Tasks.ReadWrite", "Calendars.Read", "User.Read"];

export default class MyDashboard extends BaseDashboard<any, any> {
  override layout(): JSX.Element | undefined {
    return (
      <>
        {this.state.showLogin === false ? (
          <>
            <Image className="img-style" src="bg.png" />
            <Chart />
            <div className="one-column">
              <Calendar />
              <Task />
            </div>
            <Collaboration />
            <Documents />
          </>
        ) : (
          <div className="spinner-layout">
            <Spinner size="huge" />
          </div>
        )}
      </>
    );
  }

  override styling(): string {
    return this.state.isMobile === true ? "dashboard-mobile" : "dashboard";
  }

  async componentDidMount() {
    super.componentDidMount();
    if (await this.checkIsConsentNeeded()) {
      try {
        await loginAction(scope);
      } catch (e) {
        console.log("Consent failed:", e);        
      }
    }
    this.setState({ showLogin: false });
  }

  /**
   * Checks if user consent is needed for the specified scopes.
   * @returns {Promise<boolean>} A Promise that resolves to true if user consent is needed, false otherwise.
   */
  async checkIsConsentNeeded(): Promise<boolean> {
    let needConsent = false;
    try {
      // Try to get a token for the specified scopes using the TeamsUserCredentialContext singleton instance.
      await TeamsUserCredentialContext.getInstance().getCredential().getToken(scope);
    } catch (error) {
      // If an error occurs, it means user consent is needed.
      needConsent = true;
    }
    return needConsent;
  }
}
