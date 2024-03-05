import "../styles/DevOps.css";
import "../styles/Common.css";

import {
  Avatar,
  Button,
  Image,
  Spinner,
  Text,
} from "@fluentui/react-components";
import {
  ArrowRight16Filled,
  CircleSmall20Filled,
  MoreHorizontal32Regular,
} from "@fluentui/react-icons";
import { BaseWidget, IWidgetClassNames } from "@microsoft/teamsfx-react";

import { getImageByTheme } from "../components/ThemeImg";
import config from "../lib/config";
import { DevOpsModel } from "../models/devOpsModel";
import { DevOpsWorkItems } from "../services/devopsService";

interface IWorkItemState {
  devOpsData?: DevOpsModel[];
}

const themeImageMap = {
  default: "devops-default.svg",
  dark: "devops-dark.svg",
  contrast: "devops-dark.svg",
};

export class DevOps extends BaseWidget<any, IWorkItemState> {
  override async getData(): Promise<IWorkItemState> {
    try {
      const devOpsData = await DevOpsWorkItems();
      return { devOpsData };
    } catch (error) {
      console.error("Get Devops Data Error: ", error);
      return { devOpsData: [] };
    } finally {
      this.setState({ loading: false });
    }
  }

  override header(): JSX.Element | undefined {
    return (
      <div>
        {getImageByTheme(themeImageMap)}
        <Text>Azure DevOps Work Items</Text>
        <Button icon={<MoreHorizontal32Regular />} appearance="transparent" />
      </div>
    );
  }

  override body(): JSX.Element | undefined {
    const hasWorkItem = !!this.state.devOpsData?.length;
    return (
      <>
        {hasWorkItem ? (
          <div className="devops">
            <div className="title">
              <Text>Title</Text>
              <Text>Type</Text>
              <Text>Assigned To</Text>
              <Text>State</Text>
            </div>
            <div className="content">
              {this.state.devOpsData?.map((item: DevOpsModel, index) => {
                return (
                  <div key={`div-item-${index}`}>
                    {index !== 0 && <div className="divider" />}
                    <div
                      className="items"
                      onClick={() => {
                        window.open(item.url, "_blank");
                      }}
                    >
                      <Text>{item.title}</Text>
                      <Text>{item.workItemType}</Text>
                      <div>
                        <Avatar
                          name={item.assignedToName}
                          image={{ src: `${item.assignedToAvatar}` }}
                          size={16}
                        />
                        <Text>{item.assignedToName}</Text>
                      </div>
                      <div className="state">
                        <CircleSmall20Filled className="icon" />
                        <Text>{item.state}</Text>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="empty-layout">
            <Image src="empty.svg" className="empty-img" />
          </div>
        )}
      </>
    );
  }

  override footer(): JSX.Element | undefined {
    if (!this.state.loading && this.state.devOpsData?.length !== 0) {
      return (
        <Button
          appearance="transparent"
          icon={<ArrowRight16Filled />}
          iconPosition="after"
          size="small"
          onClick={() =>
            window.open(
              `https://dev.azure.com/${config.devopsOrgName}/${config.devopsProjectName}/_workitems/recentlyupdated/`,
              "_blank"
            )
          }
        >
          View on Azure DevOps
        </Button>
      );
    } else {
      return undefined;
    }
  }

  override loading(): JSX.Element | undefined {
    return (
      <div className="loading-layout">
        <Spinner label="Loading..." labelPosition="below" />
      </div>
    );
  }

  override styling(): IWidgetClassNames {
    return { body: "devops-body", footer: "footer-btn" };
  }
}
