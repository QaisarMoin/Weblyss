export default function TestPrompt(userInput, dependencies) {
  return `
  You must create a working ${userInput} website using only the given dependencies: ${dependencies}. The site should have moderate functionality, a modern UI/UX, and clean, basic architecture with only one or two key features.

  Requirements:

  Dependencies Only: Use only the provided libraries; do not import extra ones.
  Components: Include Home, About, and other minor components. For e-commerce, add a cart, product card, banner, etc.; for other sites, use relevant features.

  Styling: Use Tailwind CSS exclusively. In index.css, include: @tailwind base;\n@tailwind components;\n@tailwind utilities;\n

  Ensure all imports like  {import "../../index.css"}  in components point to the correct path. If  index.css  is located in the { src  directory, use  import "../index.css"}  instead, or adjust based on your structure.

  Do not use raw CSS or additional CSS files (only App.css and index.css).
  Routing: Do not use react-router-dom.

  Layout: Use a header (top), footer (bottom), and center the body. Ensure pages have 100vh and 100vw and incorporate attractive images from:
  https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80.

  ### File Structure (Mandatory):
                                  src/
                                ├── App.jsx
                                ├── App.css
                                ├── main.jsx
                                ├── index.css
                                └── components/
                                    ├── Header.jsx
                                    ├── Footer.jsx
                                    └── (other component files)

    ### JSON Output Format: {
        "src": {
          "directory": {
            "App.jsx": { "file": { "contents": "code here" } },
            "App.css": { "file": { "contents": "code here" } },
            "components": {
              "directory": {
                "Header.jsx": { "file": { "contents": "code here" } },
                "Footer.jsx": { "file": { "contents": "code here" } }
                // additional components...
              }
            },
            "index.css": { "file": { "contents": "@tailwind base;\\n@tailwind components;\\n@tailwind utilities;\\n" } },
            "main.jsx": { "file": { "contents": "code here" } }
          }
        }
      }

      Coding & Formatting Rules:

-Always import index.css in main.jsx.
- Use double quotes (") for strings inside the like output.
  - Escape all newlines (\\n) to prevent formatting errors.
  - Escape all double quotes (") inside string values as \\".
-Escape all newlines (\n) and double quotes (\") in JSON.
-Follow proper JSON syntax: double-quoted keys, no trailing commas, and valid nesting.
-Do not import main.css in main.jsx instead import index.css in main.jsx file
-Ensure all components are exported as default if imported as default.
-Validate paths and file imports to avoid errors.

### Fixes in This Version:
  ✅ Escaped all newlines (\\n) correctly.
  ✅ Escaped all double quotes (") inside JSON values.
  ✅ No trailing commas (,).
  ✅ Proper nesting of {} and [] to prevent structure issues.
  ✅ String literals (multi-line) must escape newlines correctly with \\n.
  ✅ Avoid any unescaped control characters inside strings.

  ### Strict Rule for Escaping Special Characters:
  To avoid errors like "Bad control character in string literal," ensure the following:

  1) Escape Double Quotes ("):
  All double quotes inside string values must be escaped as \\".
  Example: "contents": "import React from 'react';\\n\\nfunction App() {\\n  return <div className=\\"App\\">Hello World</div>;}"

  2) Escape Newlines (\\n):
  Replace actual newline characters with \\n to ensure proper formatting.
  Example: "contents": "import React from 'react';\\n\\nfunction App() {\\n  return <div>Hello World</div>;}"

  3) Avoid Invalid Control Characters:
  Ensure no invalid control characters (e.g., raw \\t, \\r, or unescaped newlines) are included in the string.
  Example of invalid: "contents": "import React from 'react'; function App() { return <div>Hello World</div>; }"
  Correct: "contents": "import React from 'react';\\n\\nfunction App() {\\n  return <div>Hello World</div>;}"

  4) Validation:
  Before submitting the output, validate the structure using a validator tool (e.g., https://jsonlint.com/) to ensure there are no syntax errors.

  5) JSON formatting:
  Check if the code is in the proper JSON format or not. If not, remove the code and write the

syntax
  ### Expected Output:

  {"src": {
    "directory": {
      "App.jsx": {
        "file": {
          "

      contents: all the code here inside backticks
    }},
    "App.css": {"file": {
      contents: all the code here inside backticks
    }},
    "components": {"directory": {
      "Header.jsx": {"file": {
        contents: all the code here inside backticks
      }},
      "Footer.jsx": {"file": {
        contents: all the code here inside backticks
      }} … many more files
    }},
    "index.css": {"file": {"contents": "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n"}},
    "main.jsx": {"file": {
      contents: all the code here inside backticks
    }}
  }
}
}

Do not do this -> }
}
}
}
}" at the last of code
  do this ->}
}
}
}
}
-Now, create the ${userInput} website.

    `;
}

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import codeGenerationPrompt from "./codeGenerationPrompt.js";
// import depGenerationPrompt from "./depGenerationPrompt.js";
// import codeErrorreductionPrompt from "./codeErrorreductionPrompt.js";
// import TestPrompt from "./TestPrompt.js";

// const app = express();
// app.use(cors());
// app.use(express.json());
// dotenv.config();

// // Store generated data in variables
// let currentDependencies = "";
// let currentCleanedCode = "";
// let currentCommand = "echo 'No command set'";

// // ------------------> Gemini Configuration ------------------ //
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// // ------------------> Fixed Routes ------------------ //
// app.get("/api/get-command", (req, res) => {
//   res.json({
//     command: `npm install vite react@18 react-dom@18 @vitejs/plugin-react postcss@^8.4.35 tailwindcss@^3.4.1 --save-dev autoprefixer eslint react-router-dom react-icons`,
//     dependecyCommand: `npm i ${currentDependencies}`,
//     secondCommand: `npm install eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh globals@^15.0.0  --save-dev `,
//     thirdCommand: `npm pkg set type=module`,
//     fourthCommand: `npx eslint src/**/*.{js,jsx} --format json`,
//     fifthCommand: `npx vite build --emptyOutDir`,
//   });
// });

// app.get("/api/getcode", (req, res) => {
//   res.json({ code: currentCleanedCode });
//   console.log("New code sent");
// });

// app.post("/api/set-command", (req, res) => {
//   const { command } = req.body;
//   if (command) {
//     currentCommand = command;
//     res.json({ success: true, message: "Command updated successfully" });
//   } else {
//     res.status(400).json({ success: false, message: "Invalid command" });
//   }
// });

// app.post("/api/get-user-prompt", async (req, res) => {
//   try {
//     const { userPrompt } = req.body;
//     const userInput = userPrompt;
//     console.log(userInput);
//     // ------------------> Dependencies Generation ------------------ //
//     const depGenerationPromptText = depGenerationPrompt(userInput);
//     const depGenerationPromptResult = await model.generateContent(
//       depGenerationPromptText
//     );
//     currentDependencies = await depGenerationPromptResult.response.text();
//     console.log(currentDependencies, "Final DEPENDENCIES");

//     // ------------------> Code Generation ------------------ //
//     const codeGenerationPromptText = codeGenerationPrompt(
//       userInput,
//       currentDependencies
//     );
//     const generatedCode = await model.generateContent(codeGenerationPromptText);

//     const codeErrorReductionPromptText = codeErrorreductionPrompt(
//       generatedCode.response.text()
//     );

//     const generation_config = {
//       temperature: 0.7,
//       top_p: 0.9,
//       max_output_tokens: 7000,
//     };

//     const generatecodeErrorFree = await model.generateContent(
//       codeErrorReductionPromptText,
//       { generationConfig: generation_config }
//     );

//     // ------------------> Code Cleaning ------------------ //
//     currentCleanedCode = await cleanJSONCode(
//       generatecodeErrorFree.response.text()
//     );
//     console.log(await currentCleanedCode, "Cleaned Code");

//     window.localStorage.setItem("cleanedCode", currentCleanedCode);

//     res.json({ message: "Got Your Output" });
//   } catch (error) {
//     console.error("Error in processing:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // ------------------> Utility Functions ------------------ //
// function cleanJSONCode(inputCode) {
//   return inputCode
//     .replace(/^```(json|javascript|js)?[\r\n]*/gm, "")
//     .replace(/```$/gm, "")
//     .replace(/^""[\r\n]*/gm, "")
//     .replace(/^`[\r\n]*/gm, "")
//     .trim();
// }

// const takeInput = async (error, code) => {
//   try {
//     const errorFreeCode = await model.generateContent(
//       `This is the error -> ${error || ""}  and
//       This is the code -> ${code || ""}

//       Fix **only** the given error, ensuring that **no such error remains** after the fix.
//       - Modify the code **only** as needed to completely resolve the issue.
//       - **Do not** change the structure, formatting, or style of the code.
//       - If the error is **"Rollup failed to resolve import"**, apply the following fixes:
//         - Ensure the module is **correctly imported** using the exact package name.
//         - If it's an external package (e.g., "react-router-dom"), ensure it is **installed in "package.json"**. If missing, add it and correct any incorrect paths.
//         - If it's a local file, **verify and correct the import path** to match the actual file location.
//         - If needed, check **Vite configuration ("vite.config.js")** to ensure proper resolution settings.
//         - If the issue persists, consider adding it to **"build.rollupOptions.external"** if externalization is required.
//       - If other related issues are detected, **fix them too**, but **do not** alter the structure unnecessarily.
//       - **Do not** add explanations, comments, or extra content.
//       - Return **only** the corrected code, ensuring the error does not occur again.

//       `
//     );
//     return cleanJSONCode(errorFreeCode.response.text());
//   } catch (err) {
//     console.error("Error generating content:", err);
//     return "";
//   }
// };

// app.post("/api/errorcorrection", async (req, res) => {
//   try {
//     const { code, error } = req.body;
//     if (code && error) {
//       const errorFreeCode = await takeInput(error, code);
//       const clearedCode = cleanJSONCode(errorFreeCode);
//       return res.json({ cleancode: clearedCode || "" });
//     }
//     return res.json({ cleancode: "Nothing" });
//   } catch (err) {
//     console.error("Error processing request:", err);
//     return res.status(500).json({ error: "Error processing request" });
//   }
// });

// // ------------------> Server Start ------------------ //
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
