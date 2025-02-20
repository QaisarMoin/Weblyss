import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import codeGenerationPrompt from "./src/codeGenerationPrompt.js";
import depGenerationPrompt from "./src/depGenerationPrompt.js";
import codeErrorreductionPrompt from "./src/codeErrorreductionPrompt.js";
import TestPrompt from "./src/TestPrompt.js";

const app = express();

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (e.g., mobile apps, Postman)
//       if (!origin) return callback(null, true);

//       // Explicitly allow specific origins (e.g., your frontend URL)
//       const allowedOrigins = [
//         " http://localhost:5174/", // Your frontend URL
//         // Add more trusted origins here if needed
//       ];

//       // If the origin is in the allowed list, allow it
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       // Allow all other origins dynamically
//       return callback(null, true); // This effectively acts as "*"
//     },
//     credentials: true, // Allow credentials (cookies, authorization headers)
//   })
// );
app.use(express.json());
dotenv.config();

// import session from "express-session";

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "default_secret", // Replace with a secure secret
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: false, // Set to `true` if using HTTPS
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000, // Session expires after 24 hours
//     },
//   })
// );

// Store generated data in variables
let currentDependencies = "";
let currentCleanedCode = "";
let currentCommand = "echo 'No command set'";
let userData = {};

// ------------------> Gemini Configuration ------------------ //
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// ------------------> Fixed Routes ------------------ //

app.post("/api/set-command", (req, res) => {
  const { command } = req.body;
  if (command) {
    currentCommand = command;
    res.json({ success: true, message: "Command updated successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid command" });
  }
});

app.post("/api/get-user-prompt", async (req, res) => {
  try {
    const { userPrompt, userId } = req.body;

    console.log(userId, userPrompt);

    // Generate dependencies and code
    const depGenerationPromptText = depGenerationPrompt(userPrompt);
    const depGenerationPromptResult = await model.generateContent(
      depGenerationPromptText
    );
    const currentDependencies = await depGenerationPromptResult.response.text();

    console.log(currentDependencies);

    const codeGenerationPromptText = codeGenerationPrompt(
      userPrompt,
      currentDependencies
    );

    const generatedCode = await model.generateContent(codeGenerationPromptText);

    const errorFreeGeneratePrompt = await codeErrorreductionPrompt(
      generatedCode.response.text()
    );

    const generation_config = {
      temperature: 0.7,
      top_p: 0.9,
      max_output_tokens: 7000,
    };

    const errorFreeCode = await model.generateContent(errorFreeGeneratePrompt, {
      generationConfig: generation_config,
    });

    const cleanedCode = await cleanJSONCode(errorFreeCode.response.text());

    console.log(cleanedCode);

    userData = {
      ...userData,
      [userId]: {
        code: cleanedCode,
        dependencies: currentDependencies,
      },
    };

    console.log("Saved UserData ---> ", userData);

    const acctualData = Object.entries(userData).find(([id, usersData]) => {
      if (id === userId) {
        return usersData;
      }
    });

    console.log("acctualData ---> ", acctualData[0]);

    // console.log(req.session.currentCleanedCode);
    res.json({ code: acctualData[1], dependencies: acctualData[2] });
  } catch (error) {
    console.error("Error in processing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get("/api/getcode", async (req, res) => {

//   const code = (await req.session.currentCleanedCode) || "";
//   console.log("Sending Code:", code); // Log the code being sent
//   if (!code) {
//     console.error("No code found in session");
//     return res.status(400).json({ error: "No code generated yet" });
//   }
//   res.json({ code });
// });

app.get("/api/get-command", async (req, res) => {
  const { dependencies } = req.body;

  res.json({
    command: `npm install vite react@18 react-dom@18 @vitejs/plugin-react postcss@^8.4.35 tailwindcss@^3.4.1 --save-dev autoprefixer eslint react-router-dom react-icons ${dependencies} `,
    // dependecyCommand: `npm i ${await req.session.currentDependencies} `,
    secondCommand: `npm install eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh globals@^15.0.0  --save-dev `,
    thirdCommand: `npm pkg set type=module`,
    fourthCommand: `npx eslint src/**/*.{js,jsx} --format json`,
    fifthCommand: `npx vite build --emptyOutDir`,
  });
});

// // ------------------> Utility Functions ------------------ //
function cleanJSONCode(inputCode) {
  return inputCode
    .replace(/^```(json|javascript|js)?[\r\n]*/gm, "")
    .replace(/```$/gm, "")
    .replace(/^""[\r\n]*/gm, "")
    .replace(/^`[\r\n]*/gm, "")
    .trim();
}

const takeInput = async (error, code) => {
  try {
    const errorFreeCode = await model.generateContent(
      `Strictly follow these instructions to fix the error and return the entire corrected code:

      Error Handling & Fixing:
      
      If the error contains "Rollup failed to resolve import", apply the following fixes:
      Ensure the module is correctly imported using the exact package name.
      If it’s an external package (e.g., "react-router-dom"), ensure it is installed in "package.json". If missing, add it and correct any incorrect paths.
      If it’s a local file, verify and correct the import path to match the actual file location.
      If needed, check Vite configuration ("vite.config.js") to ensure proper resolution settings.
      If the issue persists, consider adding it to "build.rollupOptions.external" if externalization is required.
      Fix only the given error, ensuring that no such error remains after the fix.
      Code Correction Requirements:
      
      Modify the code only as needed to completely resolve the issue.
      Do not change the structure, formatting, or style of the code.
      If other related issues are detected, fix them too, but do not alter the structure unnecessarily.
      Strictly ensure that you return the entire corrected code, not just the fixed part.
      Response Format:
      
      Do not add explanations, comments, or extra content.
      Only return the corrected code while maintaining its original structure.
      Error Message Format:
      
      js
      Copy
      Edit
      This is the error -> ${error || ""}  
      This is the code -> ${code || ""}
      Strictly ensure that the entire corrected code is provided after fixing the error.      

      `
    );

    const secondVerification = await model.generateContent(
      codeErrorreductionPrompt(code, error)
    );

    return cleanJSONCode(errorFreeCode.response.text());
  } catch (err) {
    console.error("Error generating content:", err);
    return "";
  }
};

app.post("/api/errorcorrection", async (req, res) => {
  try {
    const { code, error } = req.body;
    if (code && error) {
      const errorFreeCode = await takeInput(error, code);
      const clearedCode = cleanJSONCode(errorFreeCode);
      return res.json({ cleancode: clearedCode || "" });
    }
    return res.json({ cleancode: "Nothing" });
  } catch (err) {
    console.error("Error processing request:", err);
    return res.status(500).json({ error: "Error processing request" });
  }
});

// ------------------> Server Start ------------------ //
const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
