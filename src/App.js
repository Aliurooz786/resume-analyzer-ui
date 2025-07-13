// App.js
import React from "react";
import ResumeForm from "./components/ResumeForm";
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="title"> AI Resume Analyzer</h1>
      <ResumeForm />
    </div>
  );
}

export default App;