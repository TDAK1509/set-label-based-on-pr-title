const core = require("@actions/core");
const github = require("@actions/github");

try {
  const contextPullRequest = github.context.payload.pull_request;
  if (!contextPullRequest) {
    throw new Error(
      "This action can only be invoked in `pull_request` events. Otherwise the pull request can't be inferred."
    );
  }

  const prTitle = contextPullRequest.title;
  console.log(prTitle);
} catch (error) {
  core.setFailed(error.message);
}
