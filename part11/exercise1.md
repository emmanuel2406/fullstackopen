# CI with Python

The CI environment should ideally be setup with an automated sequence of Github actions with three core focal areas.

- Style with ESlint
- Test-Driven Development with unit and integration tests with pytest
- Deployment of built version with Vercel error logging

As the bedrock of our framework we can either use Github Actions, Jenkins or [CircleCI](https://circleci.com).

Since we are a small team that already centralizes our codebase on Github, a cloud-based option like Github Actions would be the most ideal. As our team grows and we require more sophisticated automation, we can transition to Jenkins or CircleCI.
