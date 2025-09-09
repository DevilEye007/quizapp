import { useState } from "react";
import { Github, Mail, Linkedin, Globe } from "lucide-react"; // ✅ Import extra icons
import Logo from '../assets/Logo2.png'; 

export default function Home({ setQuiz }) {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [numQ, setNumQ] = useState();
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    setLoading(true);

    const prompt = `Generate ${numQ} multiple-choice quiz questions about ${topic} with ${difficulty} difficulty.
    Format JSON: [{question, options, answer}]`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDt-Wq3TDRmLQty2dU_-Whh_aD2iO_At-k`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await res.json();

      let content = data.candidates[0].content.parts[0].text;

      content = content.replace(/```json|```/g, "").trim();

      let quiz;
      try {
        quiz = JSON.parse(content);
      } catch (err) {
        console.error("❌ JSON parse failed. Raw content:", content);
        alert("Failed to parse quiz JSON. Check console.");
        return;
      }

      setQuiz(quiz);
    } catch (error) {
      console.error(error);
      alert("Failed to generate quiz");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-emerald-600 p-6">
      
      {/* Main Container */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30 w-full max-w-5xl">
        
        {/* Logo Section */}
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <img
            src={Logo} 
            alt="Logo"
            className="w-40 h-40 md:w-[300px] md:h-[300px] object-contain mx-auto drop-shadow-2xl"
          />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md text-center">
          {/* Heading */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
              AI Quiz Generator
            </h1>
            <p className="text-base md:text-lg text-white/80 mt-2">
              Create smart quizzes instantly with AI. Pick a topic, difficulty, and number of questions!
            </p>
          </div>

          {/* Input Fields */}
          <input
            type="text"
            placeholder="Enter Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-white/80 border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-white/80 border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <input
            type="number"
            min="1"
            max="20"
            placeholder="Number of Questions (1-20)"
            value={numQ}
            onChange={(e) => setNumQ(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg bg-white/80 border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
          />

          {/* Button */}
          <button
            onClick={generateQuiz}
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold rounded-lg shadow-md transition transform hover:scale-105 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-500 to-green-600 text-white hover:opacity-90"
            }`}
          >
            {loading ? "Generating..." : "Start Quiz"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-2 text-center text-white/80 text-sm flex flex-col items-center gap-2">
        <p>Developed by <span className="font-semibold">Faizan Sultan</span></p>

        <div className="flex items-center gap-4">
          {/* GitHub */}
          <a
            href="https://github.com/DevilEye007"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-semibold text-white hover:underline"
          >
            <Github size={18} /> GitHub
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/faizan-sultan-302b1b24b"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-semibold text-white hover:underline"
          >
            <Linkedin size={18} /> LinkedIn
          </a>

          {/* Email */}
          <a
            href="mailto:fs6700408@gmail.com"
            className="flex items-center gap-1 font-semibold text-white hover:underline"
          >
            <Mail size={18} /> Email
          </a>

          {/* Portfolio */}
          <a
            href="https://faizan-posrfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-semibold text-white hover:underline"
          >
            <Globe size={18} /> Portfolio
          </a>
        </div>
      </footer>
    </div>
  );
}
