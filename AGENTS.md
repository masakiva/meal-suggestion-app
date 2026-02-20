# Development Guidelines

Iterate on the project plan step by step using a strict TDD (Test-Driven Development) approach.
Each step should be an atomic change, reasonable for a single git commit, and quickly reviewable — meaning I can fully read and understand the diff. You can guide me for the commit messages too.

**Reviewer context:** I am a backend developer (Rust, JS/TS, Docker, Bash, SQL, Python). I will read most of the code.

## Core Principles

- **Domain-Driven Design (DDD):** Use Ubiquitous Language throughout the codebase. Core domain logic is isolated from infrastructure and UI. Domain layer must not import from infrastructure or UI.
- **Type-First:** Define types and interfaces for data structures before implementation.
- **Pure Logic vs. Side Effects:** Decouple core transformation logic (testable) from external API calls and I/O.
- **Error Handling:** Prefer early returns and explicit error messages.
- **YAGNI:** No commented-out code, unused imports, or speculative abstractions. Only build what is needed now.
- **Test Naming:** Describe behavior, not implementation. Prefer `should return empty list when no recipes exist` over `test getAll`.

## Local Verification & Tracking

- **Local Verification:** Always run local tests before declaring a step complete.
- **Progress Tracking:** `DEV_LOG.md` is a minimal offset tracker — current position and completed milestones only.

## Documentation Policy

- **Plan docs:** Update only when a design decision changes scope _before_ implementation. Do not update to reflect implementation details after the fact — the code is the truth.
- **High-level plan / roadmap:** Update only for backlog additions and major directional changes.
- **`DEV_LOG.md`:** Keep minimal. Current position + completed milestones. Never more than ~10 lines.
- **Commit messages:** The real history. Decisions, deviations, and reasoning live here, not in doc files.

## Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/): `type: description`

Types: `feat`, `fix`, `test`, `refactor`, `docs`, `chore`.

## Step Structure

Steps should follow this pattern for each atomic change. **After each step, you must write a draft commit message to a file named `GIT_COMMIT_MSG` in the project root, and then pause to let me commit the changes myself.**

**One concern per commit.** Don't mix refactors with new features, or test changes with production code changes. In particular, documentation updates (project plans, `DEV_LOG.md`, `AGENTS.md`) must be in their own separate commits.

1. **Types.** Create or update types and interfaces. (Write to `GIT_COMMIT_MSG` & pause)
2. **Red.** Create a failing test case. (Write to `GIT_COMMIT_MSG` & pause)
3. **Green.** Implement the minimal code to pass the test and verify locally. (Write to `GIT_COMMIT_MSG` & pause)
4. **Refactor & Verify.** Clean up code and tests, then ensure tests still pass. (Write to `GIT_COMMIT_MSG` & pause)

Steps can be combined or skipped when appropriate (e.g., type-only changes don't need Red/Green, config changes don't need tests).

If there are tasks that need action from my side, please guide me with precise instructions.
