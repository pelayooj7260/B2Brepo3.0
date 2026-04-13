# GitHub Issues Guide for AI Dev Agents

**Objective:** To maintain a clean, organized, and well-tracked workflow, you (the AI Dev Agent) must proactively manage and interact with GitHub Issues throughout the development lifecycle. This guide outlines the exact operating procedures for tracking tasks, updating milestones, and maintaining discipline.

**Read and apply these rules every time you start a new conversation or begin a new unit of work.**

---

## 1. Initial Assessment & Issue Creation

Before writing any code or executing commands to solve a new user request, you must ensure the work is tracked:
1. **Search Existing Issues:** Use your tool capabilities to search if an open issue already exists for the requested task.
2. **Create if Missing:** If no issue exists, create a new one. 
    * **Title:** Clear, objective, and concise summary of the task.
    * **Body:** Description of the problem, the proposed solution, and clear acceptance criteria.
    * **Labels:** Apply relevant tags (e.g., `enhancement`, `bug`, `documentation`, `ui/ux`).
3. **Milestone Assignment:** Check the repository for the current active milestone. Ensure the issue is assigned to it so progress tracking stays up-to-date.

## 2. Working on an Issue (In Progress)

Once an issue is identified or created and you are taking action on it:
1. **Status Comment:** Add a comment to the GitHub issue stating that work has begun and outlining your immediate technical plan. 
    * *Example: "Starting implementation. Will stand up the frontend components first, followed by the API integration."*
2. **Sub-Issues & Checklists:** If the task is large or complex, break it down using the `sub_issue_write` tool, or by adding a Markdown checklist (`- [ ]`) to the main issue body.
3. **Continuous Updates:** Update checklists or leave comments sequentially as you complete major sub-tasks.

## 3. Pull Requests & Commits

When you are ready to propose your changes:
1. **Branch Naming:** Create a new branch that optionally references the issue number (e.g., `feature/123-add-dark-mode`).
2. **Linking PRs to Issues:** You **MUST** link your Pull Request to the relevant issue using GitHub's closing keywords. 
    * Embed `Closes #<issue_number>`, `Resolves #<issue_number>`, or `Fixes #<issue_number>` in the PR body. This ensures the issue automatically attributes the work and closes when merged.
3. **Review Loops:** If the user points out bugs or asks for iterations, update the issue/PR with a comment acknowledging the adjustments being made.

## 4. Issue Closure & Summary

When a task is verified as complete:
1. **Final Summary Comment:** Before an issue is closed (or immediately after merging the PR), drop a brief summary comment. Note any major architectural decisions, hacks, or context the team might need later.
2. **Milestone Verification:** Verify that the issue remains correctly categorized under its intended milestone.

## Agent pre-flight Checklist

Before considering a request entirely "done", verify:
- [ ] Is there an issue tracking the context of my current work?
- [ ] Is the issue assigned to the correct milestone?
- [ ] Did I link my PR/commits to the issue (`Closes #123`)?
- [ ] Have I updated the issue with comments explaining major decisions or current progress?

**Discipline is key.** Do not bypass the issue management requirements. If you are ever unsure, ask the user before writing untracked code.
