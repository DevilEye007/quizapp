import { useState } from "react";

export default function Quiz({ quiz, setResult }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (choice) => {
    setAnswers([...answers, { q: current, ans: choice }]);

    if (current + 1 < quiz.length) {
      setCurrent(current + 1);
    } else {
      setResult({ quiz, answers });
    }
  };

  const q = quiz[current];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-emerald-600 p-6">
      <div className="w-full max-w-2xl bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-10 text-center border border-white/30">
        
        {/* Question */}
        <h2 className="text-3xl font-extrabold text-white drop-shadow mb-10">
          {q.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col space-y-5">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              className="w-full py-4 px-6 text-lg font-semibold rounded-xl 
                         bg-white/80 text-gray-900 shadow-lg 
                         hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-600 hover:text-white 
                         transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Progress */}
        <p className="mt-8 text-white/90 font-medium text-lg">
          Question {current + 1} <span className="opacity-75">/ {quiz.length}</span>
        </p>
      </div>
    </div>
  );
}
