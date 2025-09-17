# CI Notes

This Expo project does not include a pre-generated Android `android/` directory by default. If your CI attempts to run `./gradlew`, it will fail because the Gradle wrapper is created only after running:

npm run prebuild:android

If your CI needs to run Android Gradle checks, add a step to run the above prebuild before invoking `./gradlew`. Otherwise, prefer JS/TS checks and an Expo export (configured in the `build` script) that do not require Gradle.
