# CI Gradle Stub

Your CI may attempt to run `./gradlew` at the repository root. This project uses Expo managed workflow,
so the native Android project (and real Gradle wrapper) is not checked into source control.

We include a root-level `gradlew` stub that forwards to `to_do_frontend/android/gradlew`. That script is a no-op
unless you first generate the native Android project by running:

cd to_do_frontend
npm run prebuild:android

Only run the native Gradle build in CI if you explicitly need it; otherwise rely on JS/TS checks and Expo tooling.
