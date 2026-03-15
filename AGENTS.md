# Development Guidelines

Iterate on the project using a **strict TDD (Test-Driven Development)** workflow (see Development Cycle below).
Each step should be an atomic change, reasonable for a single git commit, and quickly reviewable — meaning I can fully read and understand the diff. You can guide me for the commit messages too.

**Reviewer context:** All code will be reviewed by the full team. We are learning the stack and the codebase together. Clarity is prioritized over brevity.

## Core Principles

- **Domain-Driven Design (DDD):** Use Ubiquitous Language throughout the codebase. Core domain logic is isolated from infrastructure and UI. Domain layer must not import from infrastructure or UI.
- **Type-First:** Define types and interfaces for data structures before implementation.
- **Pure Logic vs. Side Effects:** Decouple core transformation logic (testable) from external API calls and I/O.
- **Error Handling:** Prefer early returns and explicit error messages.
- **YAGNI:** No commented-out code, unused imports, or speculative abstractions. Only build what is needed now.
- **Test All Logic:** Domain and application logic must have tests. Infrastructure adapters do not need unit tests but must be kept thin. (See Infrastructure Adapters below for definition.)
- **Test Naming:** Describe behavior, not implementation. Prefer `should return empty list when no donations exist` over `test getAll`.

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

## Development Cycle

### Philosophy

Follow strict **Red-Green-Refactor** discipline:

1. **Discuss (if needed):** Clarify the Design Brief or contract. Ask design-level questions before coding.
2. **Types:** Create or update types and interfaces.
3. **Red:** Write a failing test case. Run tests to confirm the failure.
4. **Green:** Implement the minimal code to pass the test. Run tests to confirm.
5. **Refactor:** Clean up code and tests, improve readability/structure. Run tests to confirm nothing broke.
6. **Present:** Show the full diff. Write a draft commit message to `GIT_COMMIT_MSG`.
7. **Pause:** Wait for review before proceeding.

Tests must fail before implementation exists. This forces deliberate interface design and catches assumptions early — especially valuable when a team is learning together.

### Step Granularity

Each step is an atomic change: one concern, one commit, quickly reviewable. **After each step, write a draft commit message to `GIT_COMMIT_MSG` in the project root, then pause to let me commit the changes myself.**

- **One concern per commit.** Don't mix unrelated refactors, unrelated test changes, or unrelated features into the same commit.
- **Types, Red, Green, and Refactor may each be their own commit**, or combined when the change is small enough to review as a unit. Use judgment: if the diff stays quickly reviewable, combining is fine.
- **Documentation updates** (project plans, `AGENTS.md`) must be in their own separate commits. **Exception:** `DEV_LOG.md` progress updates may be bundled with the implementation commit they relate to.
- **Infrastructure adapters** get their own commits, separate from the domain logic they implement. (See Infrastructure Adapters below for definition.)

Steps can be combined or skipped when appropriate (e.g., type-only changes don't need Red/Green, configuration file changes like `tsconfig.json` don't need tests).

If there are tasks that need action from my side, please guide me with precise instructions.

## Infrastructure Adapters

An infrastructure adapter is a class that **implements a domain/application interface** (port) **and depends on an external API or I/O** (e.g., database clients, HTTP API clients, file system, external service SDKs, platform-specific runtime APIs). These should be thin wrappers — push logic into the domain layer, keep the adapter as a translation layer.

Infrastructure adapters do not need unit tests (verify via integration tests or manual testing as appropriate for the stack), but they must be kept thin enough that the untested surface area is minimal.

## Review Contract

When presenting a step for review, include:

1. **What changed** — a brief summary (2-3 sentences max).
2. **Key decisions** — any design choices I should know about or might want to override.
3. **Test coverage** — what's tested, what's not, and why.
4. **Open questions** — anything that arose during implementation that needs my input. (Design-level questions should be asked _before_ coding per Step 1; this is for questions discovered _during_ implementation.)
5. **Team decisions** — flag any non-trivial design choices that warrant team discussion before committing. These should be clearly marked so the team can align before moving forward.
