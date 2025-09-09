import { useState } from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

export default function App() {
  const [quiz, setQuiz] = useState(null);
  const [result, setResult] = useState(null);

  if (!quiz) return <Home setQuiz={setQuiz} />;
  if (!result) return <Quiz quiz={quiz} setResult={setResult} />;
  return <Result result={result} reset={() => { setQuiz(null); setResult(null); }} />;
}
