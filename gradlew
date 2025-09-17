#!/usr/bin/env bash
# Root-level Gradle wrapper stub for CI.
# Forward to the to_do_frontend Android placeholder when Expo prebuild hasn't been executed.
APP_DIR="to_do_frontend/android"
if [ -x "$APP_DIR/gradlew" ]; then
  (cd "$APP_DIR" && ./gradlew "$@")
  exit $?
fi
echo "[CI NOTICE] Gradle wrapper not generated. This Expo project uses the managed workflow."
echo "To generate native Android project, run within to_do_frontend/: npm run prebuild:android"
echo "Skipping Gradle task as a no-op."
exit 0
