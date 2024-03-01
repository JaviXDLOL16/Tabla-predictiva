import React, { useEffect, useState } from "react";
import { Editor, loader } from "@monaco-editor/react";
import "./App.css";
import { analyzeSyntax } from "./utils/index";


function App() {
  const [currentWord, setCurrentWord] = useState("");
  const [type, setType] = useState("neutral");
  const [history, setHistory] = useState("");

  const separarElementos = (inputString) => {
    var elements = [
      "function",
      "(",
      ")",
      "boolean",
      "var",
      "integer",
      "real",
      "string",
      ";",
      ":",
    ];
    var outputList = [];
    var currentWord = "";

    for (var i = 0; i < inputString.length; i++) {
      var char = inputString[i];
      if (char === " ") {
        if (currentWord !== "") {
          if (elements.includes(currentWord)) {
            outputList.push(currentWord);
          } else {
            outputList.push(...currentWord.split(""));
          }
          currentWord = "";
        }
      } else if (elements.includes(char)) {
        if (currentWord !== "") {
          if (elements.includes(currentWord)) {
            outputList.push(currentWord);
          } else {
            outputList.push(...currentWord.split(""));
          }
          currentWord = "";
        }
        outputList.push(char);
      } else {
        currentWord += char;
      }
    }

    if (currentWord !== "") {
      if (elements.includes(currentWord)) {
        outputList.push(currentWord);
      } else {
        outputList.push(...currentWord.split(""));
      }
    }

    return outputList;
  };

  useEffect(() => {
    const inputList = separarElementos(currentWord);
    const response = analyzeSyntax(inputList);
    if (response.success) {
      setType("success");
    } else {
      setType("error");
    }
    setHistory(response.stackHistory);
  }, [currentWord]);

  return (
    <div className="Container">
      <div className="ConTop">
        <p>Gramatica 9</p>
      <Editor
      width="50vw"
      height="30vw"
        onChange={(value) => setCurrentWord(value)}
      />
      </div>
      <div className="ConRight">
      <div className={`status ${type}`}>
        {type === "success" ? "Correcto" : "Incorrecto"}
      </div>
      <pre className={`text-white ${type}`}>{history}</pre>
      </div>
    </div>
  );
}

export default App;
