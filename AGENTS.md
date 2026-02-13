Please follow best practices regarding code structure, code readability/clarity and maintainability.

Please iterate on the project plan step by step using a strict TDD (Test-Driven Development) approach.
One step should be quickly reviewable by me, and should involve atomic changes, reasonable for a single git commit. You can guide me for the commit messages too.

By review, I mean fully understand what changed to be able to give my opinion. I will read most of the code and try to understand it. I am a backend developer, usually working with Rust. My other experience includes JS/TS, Docker, Bash, SQL, and Python.

### Core Principles

- **Domain-Driven Design (DDD) Basics:** Use Ubiquitous Language throughout the codebase. Ensure the core domain logic is isolated from infrastructure concerns (databases, external APIs, frameworks).
- **Type-First:** Define types and interfaces for data structures before implementation.
- **Pure Logic vs. Side Effects:** Decouple core transformation logic (testable) from external API calls and I/O.
- **Error Handling:** Prefer early returns and explicit error messages.

### Local Verification & Tracking

- **Local Verification:** Always run local tests before declaring a step complete.
- **Progress Tracking:** Update `DEV_LOG.md` after completing each significant task or iteration to maintain a clear record of progress.

### Step Structure

Steps should follow this pattern for each atomic change. **After each step, you must write a draft commit message to a file named `GIT_COMMIT_MSG` in the project root, and then pause to let me commit the changes myself.**

**Docs Updates:** Whenever documentation files (project plans, `DEV_LOG.md`, or `AGENTS.md`) are updated, the associated git commit must be exclusively related to that documentation change. Any subsequent implementation changes must be handled in their own separate commits.

1. **Step 1: Types.** Create or update types and interfaces. (Write to `GIT_COMMIT_MSG` & pause)
2. **Step 2: Red.** Create a failing test case. (Write to `GIT_COMMIT_MSG` & pause)
3. **Step 3: Green.** Implement the minimal code to pass the test and verify locally. (Write to `GIT_COMMIT_MSG` & pause)
4. **Step 4: Refactor.** Clean up the code and tests, improve readability/structure.
5. **Step 5: Verify.** Ensure tests still pass. (Write to `GIT_COMMIT_MSG` & pause)

If there are tasks that need action from my side, please guide me with precise instructions.
