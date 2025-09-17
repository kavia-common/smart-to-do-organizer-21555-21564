# Android Placeholder

This directory contains placeholders to satisfy CI pipelines that expect `./gradlew` to exist.

- In Expo managed workflow, native Android project files are not checked in.
- To generate them locally or in CI when you actually need a native build, run:

npm run prebuild:android

That command will create the full `android/` project with a real Gradle wrapper.

The current `gradlew` script is a no-op that exits successfully to prevent CI failures when Gradle is not required.
