# Tracing for Debugging

Tracing captures detailed execution logs, DOM snapshots, screenshots, and network activity to help diagnose failing tests.

## Why Use Tracing?

| Feature | Description |
|---------|-------------|
| **DOM Inspection** | View the exact DOM state at the moment of failure. |
| **Network Waterfall** | Identify failed API calls or slow resources. |
| **Step-by-Step Replay** | See every action the agent performed. |
| **Console Logs** | Correlate browser errors with test steps. |

## Workflow for Healing

1.  **Start Tracing**: Use `browser_start_tracing()` before running the failing scenario.
2.  **Execute Scenario**: Run the test code that is currently failing.
3.  **Stop & Analyze**: Use `browser_stop_tracing()` to save the trace.
4.  **Examine Trace**: Review the generated `.trace` file to identify:
    -   Changing selectors.
    -   Timing/Synchronization issues (elements not ready).
    -   Network 401/500 errors.

## Best Practices
- **Capture more than just the error**: Start tracing a few steps *before* the failure to see the full context.
- **Cleanup**: Traces can be large (MBs). Ensure old traces are cleaned up periodically.
