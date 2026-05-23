#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

function run(cmd) {
  return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
}

// Ensure we are inside a git repo
try {
  run("git rev-parse --is-inside-work-tree");
} catch {
  console.error("Error: Not inside a git repository.");
  process.exit(1);
}

// Get uncommitted files (tracked + untracked, excluding ignored)
let statusOutput = run("git status --porcelain");

if (!statusOutput) {
  console.log("No uncommitted files found.");
  process.exit(0);
}

console.log("Uncommitted files found:" , statusOutput);
let files = statusOutput
  .split("\n")
  .map(line => {
    // Git status porcelain format: XY filename (2 status chars + space + filename)
    // We need to skip the first 3 characters but handle edge cases
    const trimmed = line.trim();
    if (trimmed.length < 3) return "";
    return trimmed.substring(2).trim(); // Skip 2 status chars, then trim space
  })
  .filter(Boolean);

// Count files
const count = files.length;

console.log(`Uncommitted files count: ${count}`);
console.log("--------------------------------");

let committed = 0;


//function to return random commit messages
// function getRandomCommitMessage() {
//   const messages = [
//     "Update code",
//     "Refactor code",
//     "Fix bugs",
//     "Improve performance",
//     "Add new features",
//     "Enhance functionality",
//     "Optimize codebase",
//     "Clean up code",
//     "Update dependencies",
//     "Improve documentation",
//     "Code improvements",
//     "Minor fixes",
//     "Code cleanup",
//     "Enhance user experience",
//     "Improve stability",
//     "Refine code structure",
//     "Boost performance",
//     "Fix issues",
//     "Add enhancements",
//     "Update modules",
//   ];
//   return messages[Math.floor(Math.random() * messages.length)];
// }


/**
 * A dictionary of commit components based on Conventional Commits.
 * Extracted outside the function so it isn't recreated on every call.
 */
const COMMIT_DATA = {
  types: ['feat', 'fix', 'refactor', 'chore', 'docs', 'perf', 'test'],
  actions: ['implement', 'update', 'refactor', 'remove', 'fix', 'optimize', 'enhance', 'integrate'],
  targets: [
    'React components', 'Node.js middleware', 'API routes', 'database schemas',
    'authentication flow', 'state management', 'UI layout', 'configuration', 'dependencies'
  ]
};

/**
 * Helper function to pick a random element from an array.
 */
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Generates a random, Conventional Commits-compliant message.
 * * @param {Object} options - Optional parameters to customize the commit.
 * @param {string} [options.type] - Force a specific commit type (e.g., 'feat', 'fix').
 * @param {string} [options.scope] - Add a module scope (e.g., 'auth', 'ui').
 * @returns {string} The formatted commit message.
 */
const getRandomCommitMessage = ({ type = '', scope = '' } = {}) => {
  const selectedType = type || getRandomElement(COMMIT_DATA.types);
  const action = getRandomElement(COMMIT_DATA.actions);
  const target = getRandomElement(COMMIT_DATA.targets);

  // Format the scope only if it is provided
  const scopeText = scope ? `(${scope})` : '';

  // Returns format: type(scope): action target
  return `${selectedType}${scopeText}: ${action} ${target}`;
};


for (const file of files) {
  if (fs.existsSync(file)) {
    console.log(`Committing: ${file}`);
    try {
      run(`git add "${file}"`);
      const commitMessage = getRandomCommitMessage();
      run(`git commit -m " ${commitMessage} : ${file} "`);
      committed++;
      console.log(`Committed (${committed}/${count}): ${file}`);
    } catch (err) {
      console.error(`Failed to commit: ${file}`);
      console.error(err.message);
      process.exit(1);
    }
  } else {
    console.log(`Skipped (missing): ${file}`);
  }
}

console.log("--------------------------------");
console.log(`Done. Total files committed: ${committed}`);
