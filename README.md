# Firebase Feedback

Feedback (proposals + issues + roadmap) solution built using ReactJS, MobX, and Firebase.

Note: Library is not very modulized at this point; that is, it requires many specific libraries to already be in use in the parent project. Because of this, it's not yet recommended for use in third-party projects.

### Installation

```
npm install firebase-feedback --save-exact
```

The `--save-exact` flag is recommended, since this package uses [Explicit Versioning](https://medium.com/sapioit/why-having-3-numbers-in-the-version-name-is-bad-92fc1f6bc73c) (`Release.Breaking.FeatureOrFix`) rather than SemVer (`Breaking.Feature.Fix`).

To let npm increment `FeatureOrFix` (recommended), prepend "`~`" to its version in `package.json`. (for `Breaking`, prepend "`^`")