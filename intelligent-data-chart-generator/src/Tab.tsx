import "./styles/Tab.css";

import { useState } from "react";

import { Button, Textarea, ToggleButton } from "@fluentui/react-components";
import { Send24Regular } from "@fluentui/react-icons";

import Chart from "./components/Chart";
import EmptyState from "./components/EmptyState";
import ErrorState from "./components/ErrorState";
import Introduction from "./components/Introduction";
import LoadingBar from "./components/LoadingBar";
import SqlStatement from "./components/SqlStatement";
import { sqlCompletion } from "./services/chartService";

const SuggestionPrompt = [
  { id: 1, value: "Top 20 selling products" },
  { id: 2, value: "Monthly sales data of product 969" },
  { id: 3, value: "Sales statistic by month" },
];

export default function Tab() {
  const [onloading, setOnloading] = useState<boolean>(false);
  const [validInput, setValidInput] = useState<boolean>(true);
  const [prompt, setPrompt] = useState<string>("");
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [xKey, setXKey] = useState<string>();
  const [yKey, setYKey] = useState<string>();
  const [sqlString, setSqlString] = useState<string | undefined>(undefined);
  const [enabledId, setEnabledId] = useState<number>();
  const [closed, setClosed] = useState<boolean>(false);

  // Handle user prompt to generate chart.
  const handlePrompt = async (prompt: string) => {
    if (!prompt) return;
    setOnloading(true);
    setValidInput(true);
    setData(undefined);
    try {
      // Request SQL completion with the given prompt.
      const resp = await sqlCompletion(prompt);
      setData(resp.data);
      setSqlString(resp.sqlString);
      setXKey(resp.xKey);
      setYKey(resp.yKey);

      // If the data is empty, set validInput to false.
      if (!resp.data || resp.data.length === 0) {
        setValidInput(false);
      }
    } catch (e) {
      // If an error occurs, set validInput to false and sqlString to undefined.
      setValidInput(false);
      setSqlString(undefined);
    } finally {
      setOnloading(false);
    }
  };

  // Determine if the data is empty.
  const empty = validInput && !data && !onloading;

  // Determine if the chart should be shown.
  const showChart = !onloading && validInput && data && xKey && yKey;

  // Determine if an error occurred.
  const error = !validInput && !onloading;

  return (
    <div className="content">
      <Introduction />
      <div className="suggestion-list">
        {SuggestionPrompt.map((t) => (
          <ToggleButton
            className="suggestion-btn"
            key={t.id}
            checked={t.id === enabledId}
            disabled={t.id === enabledId || onloading}
            onClick={() => {
              setEnabledId(t.id);
              setPrompt(t.value);
            }}
          >
            {t.value}
          </ToggleButton>
        ))}
      </div>
      <div className="prompt-textarea">
        <Textarea
          className="prompt-input"
          resize="vertical"
          placeholder="Enter your query here"
          value={prompt}
          disabled={onloading}
          onKeyDown={(e) => {
            if (e.key === "Enter") handlePrompt(prompt);
          }}
          onChange={(e, v) => {
            setPrompt(v.value);
            setEnabledId(undefined);
          }}
        />
        <Button
          appearance="transparent"
          icon={<Send24Regular />}
          disabled={onloading}
          onClick={() => handlePrompt(prompt)}
        />
      </div>
      {onloading && <LoadingBar />}
      {!onloading && sqlString && (
        <SqlStatement
          sqlString={sqlString}
          closed={closed}
          setClosed={setClosed}
        />
      )}
      {showChart ? (
        <Chart data={data} xKey={xKey} yKey={yKey} />
      ) : (
        <div className="chart-container">
          {empty && <EmptyState />}
          {error && <ErrorState />}
        </div>
      )}
    </div>
  );
}
