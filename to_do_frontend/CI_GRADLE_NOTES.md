# CI Gradle Notes (to_do_frontend)

Some CI systems try to execute `./gradlew` from the app directory. This Expo project does not include native Android sources by default.

- A `gradlew` stub is provided that forwards to `android/gradlew` if it exists, else no-ops.
- To perform a real native build, generate the Android project first:

npm run prebuild:android

Then run your Gradle tasks as usual from this directory or via the stub.
