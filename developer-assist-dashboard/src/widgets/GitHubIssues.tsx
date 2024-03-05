import "../styles/GitHubIssues.css";
import "../styles/Common.css";

import { createRef } from "react";

import { Button, Image, Spinner, Text } from "@fluentui/react-components";
import {
  Add20Filled,
  ArrowRight16Filled,
  MoreHorizontal32Regular,
  Open16Regular,
} from "@fluentui/react-icons";
import { BaseWidget, IWidgetClassNames } from "@microsoft/teamsfx-react";

import { getImageByTheme } from "../components/ThemeImg";
import config from "../lib/config";
import { githubIssuesModel } from "../models/githubIssuesModel";
import { createIssue, getIssues } from "../services/githubService";

interface IIssueState {
  issues?: githubIssuesModel[];
  loading?: boolean;
  inputFocused?: boolean;
}

const themeImageMap = {
  default: "github.svg",
  dark: "github-dark.svg",
  contrast: "github-dark.svg",
};

export class GithubIssues extends BaseWidget<any, IIssueState> {
  inputDivRef;
  btnRef;
  inputRef;

  constructor(props: any) {
    super(props);
    this.inputRef = createRef<HTMLInputElement>();
    this.inputDivRef = createRef<HTMLDivElement>();
    this.btnRef = createRef<HTMLButtonElement>();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  override async getData(): Promise<IIssueState> {
    try {
      return { issues: await getIssues() };
    } catch (err) {
      console.error(err);
      return { issues: [] };
    } finally {
      this.setState({ inputFocused: false, loading: false });
    }
  }

  override header(): JSX.Element | undefined {
    return (
      <div>
        {getImageByTheme(themeImageMap)}
        <Text>GitHub Repository Issues</Text>
        <Button icon={<MoreHorizontal32Regular />} appearance="transparent" />
      </div>
    );
  }

  override body(): JSX.Element | undefined {
    const hasIssue = !!this.state.issues?.length;
    return (
      <div className="github-body">
        {this.inputLayout()}
        {hasIssue ? (
          <div className="issues">
            {this.state.issues?.map((item: githubIssuesModel, index: number) => {
              return (
                <div key={`item-${index}`} className={index % 2 === 0 ? "item" : "item item-odd"}>
                  <Image src="issue.svg" />
                  <div onClick={() => window.open(item.url, "_blank")}>
                    <Text className="state">[{item.state}]&nbsp;</Text>
                    {item.title}
                    {item.body && <Text className="desc">{item.body}</Text>}
                  </div>
                  <Button appearance="transparent" icon={<Open16Regular />} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-layout">
            <Image src="empty.svg" />
            <Text>Once you have a issue, you&apos;ll find it here</Text>
          </div>
        )}
      </div>
    );
  }

  override footer(): JSX.Element | undefined {
    if (!this.state.loading && this.state.issues?.length !== 0) {
      return (
        <Button
          appearance="transparent"
          icon={<ArrowRight16Filled />}
          iconPosition="after"
          size="small"
          onClick={() =>
            window.open(
              `https://github.com/${config.githubRepoOwner}/${config.githubRepoName}/issues`,
              "_blank"
            )
          }
        >
          View on GitHub
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
    return { footer: "footer-btn" };
  }

  private inputLayout(): JSX.Element | undefined {
    return (
      <div
        ref={this.inputDivRef}
        className={this.state.inputFocused ? "issue-create issue-create-focused" : "issue-create"}
      >
        {!this.state.inputFocused && <Add20Filled className="icon" />}
        <input
          ref={this.inputRef}
          type="text"
          className={
            this.state.inputFocused
              ? "input-issue input-issue-focused"
              : "input-issue input-issue-unfocused"
          }
          onFocus={() => this.inputFocusedState()}
          placeholder="Create new"
        />
        {this.state.inputFocused && (
          <button
            className="add-btn"
            onClick={() => {
              this.onAddButtonClick();
            }}
          >
            Add
          </button>
        )}
      </div>
    );
  }

  async componentDidMount() {
    super.componentDidMount();
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount(): void {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  private handleClickOutside(event: any) {
    if (!this.inputDivRef.current?.contains(event.target)) {
      this.setState({
        issues: this.state.issues,
        inputFocused: false,
        loading: false,
      });
      this.clearQuestion();
    }
  }

  private onAddButtonClick = async () => {
    if (this.inputRef.current && this.inputRef.current.value.length > 0) {
      const issues: githubIssuesModel[] = await createIssue(this.inputRef.current.value);
      this.setState({
        issues: issues,
        inputFocused: false,
        loading: false,
      });
      this.clearQuestion();
    }
  };

  private clearQuestion() {
    if (this.inputRef.current) {
      this.inputRef.current.value = "";
    }
  }

  private inputFocusedState = () => {
    this.setState({
      inputFocused: true,
      loading: false,
    });
  };
}
