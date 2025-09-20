export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce psychology-first commit message types
    'type-enum': [
      2,
      'always',
      [
        'feat', // New features
        'enhance', // Improvements to existing features
        'fix', // Bug fixes (not "broken" language)
        'improve', // Performance or code improvements
        'docs', // Documentation changes
        'style', // Formatting, semicolons, etc.
        'refactor', // Code refactoring
        'test', // Adding tests
        'build', // Build system changes
        'ci', // CI configuration changes
        'chore', // Maintenance tasks
        'revert', // Reverting changes
        'accessibility', // Accessibility improvements
        'ux', // User experience improvements
        'psychology', // Psychology-focused changes
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },
};
