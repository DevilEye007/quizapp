export default function Result({ result, reset }) {
  const { quiz, answers } = result;

  let score = 0;
  answers.forEach((a, i) => {
    if (quiz[i].answer === a.ans) score++;
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-teal-400 to-emerald-500 p-6">
      <div className="w-full max-w-2xl bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-10 text-center border border-white/30">
        
        {/* Final Score */}
        <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow">
          Quiz Finished!
        </h1>
        <p className="text-xl font-semibold text-yellow-200 mb-8">
          Your Score: {score} / {quiz.length}
        </p>

        {/* Question-wise Review */}
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/40 scrollbar-track-transparent pr-2">
          {quiz.map((q, i) => {
            const isCorrect = q.answer === answers[i]?.ans;
            return (
              <div
                key={i}
                className={`p-4 rounded-xl shadow-md text-left transition-all duration-300 ${
                  isCorrect
                    ? "bg-green-100 border-l-4 border-green-600"
                    : "bg-red-100 border-l-4 border-red-600"
                }`}
              >
                <p className="font-bold text-gray-800 mb-1">{q.question}</p>
                <p className="text-sm text-green-700">Correct: {q.answer}</p>
                <p
                  className={`text-sm ${
                    isCorrect ? "text-green-700" : "text-red-600"
                  }`}
                >
                  Your Answer: {answers[i]?.ans || "—"}
                </p>
              </div>
            );
          })}
        </div>

        {/* Try Again Button */}
        <button
          onClick={reset}
          className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-teal-500 text-white font-bold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
