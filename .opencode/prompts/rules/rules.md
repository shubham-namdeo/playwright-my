---
trigger: always_on
glob: "**/*"
description: Ensure the agent follows the comprehensive playwright workflow (Plan -> Generate -> Execute -> Heal).
---

# Playwright Agent Instructions

When assigned a task related to Playwright tests, you MUST follow this structured workflow:

1.  **Analyze & Plan**: ALWAYS start by creating a detailed test plan using the `playwright-test-planner` skill. This ensures all scenarios are covered.
    -   Location: `specs/[name].plan.md`
    -   Tools: `mcp_playwright-test_planner_setup_page`, `mcp_playwright-test_planner_save_plan`, `browser_subagent`.

2.  **Generate Test Script**: Generate the test script based on the plan using the `playwright-test-generator` skill.
    -   Location: `tests/[name].spec.ts`
    -   Tools: `mcp_playwright-test_generator_setup_page`, `mcp_playwright-test_generator_write_test`, `browser_subagent`.

3.  **Execute**: Run the tests using `npx playwright test`.
    -   Tools: `run_command`.

4.  **Debug & Heal**: If tests fail, use the `playwright-test-healer` skill to analyze the error logs and fix the code. Do not manually fix unless absolutely necessary; leverage the healer tools.
    -   Tools: `mcp_playwright-test_test_run`, `mcp_playwright-test_test_debug`, `browser_subagent`.

5.  **Use MCP Tools**: Always check for available Playwright tools (`mcp_playwright-test_*`) and use them appropriately for browser interactions, code execution, and debugging.

By adhering to this workflow, you ensure consistent, high-quality test automation.