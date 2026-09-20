# Content pipeline boundary
Phase 1 runs scripts/validate-content.py and scripts/build-content.py locally/CI.
No Worker entrypoint, queue, schedule, publishing endpoint or AI generation exists.
Future Worker requires authentication, reviewed status transitions and idempotent jobs.
Only an explicitly approved publishing change may render content into public output.
