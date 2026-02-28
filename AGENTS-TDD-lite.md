# Development Guidelines

Iterate on the project using a **Design-First TDD-Lite** workflow (see Development Cycle below).
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

Instead of strict Red-Green-Refactor per commit, we use a **feature-oriented** approach:

1. **Discuss (if needed):** Clarify the Design Brief or contract. Ask design-level questions before coding.
2. **Implement:** Write types, implementation, and tests together in one coherent pass.
3. **Verify:** Run all tests. Fix any failures before presenting the result.
4. **Present:** Show the full diff. Write a draft commit message to `GIT_COMMIT_MSG`.
5. **Pause:** Wait for my review before proceeding.

This preserves testability, domain isolation, and full understanding — while cutting unnecessary commit cycles. Tests are written alongside the implementation, not before it in a separate commit.

### Rationale

The strict TDD cycle (Red → commit → Green → commit → Refactor → commit) triples the number of review/commit cycles for equivalent code quality. The "Red" forcing function is designed for human focus — an AI agent can hold the full design in context. We still write tests for all domain and application logic; we just do it in one pass.

### Step Granularity

Each step is an atomic change: one concern, one commit, quickly reviewable. **After each step, write a draft commit message to `GIT_COMMIT_MSG` in the project root, then pause to let me commit the changes myself.**

- **One logical feature per commit.** Types + implementation + tests for that feature = one commit.
- **One concern per commit.** Don't mix unrelated refactors, unrelated test changes, or unrelated features into the same commit.
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
