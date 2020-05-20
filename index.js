const core = require("@actions/core");
const github = require("@actions/github");

const DLM = ";";

try {
  const contextPullRequest = github.context.payload.pull_request;
  if (!contextPullRequest) {
    throw new Error(
      "This action can only be invoked in `pull_request` events. Otherwise the pull request can't be inferred."
    );
  }

  const prTitle = contextPullRequest.title;
  const prTitleLowerCase = prTitle.toLowerCase();
  const prNumber = contextPullRequest.number;

  // Get injected inputs
  const words = core.getInput("words").split(DLM);
  const labels = core.getInput("labels").split(DLM);
  const repoToken = core.getInput("repo-token");

  const octokit = new github.GitHub(repoToken);

  const labelsToAdd = [];

  words.forEach((word, index) => {
    if (prTitleLowerCase.inclues(word.toLowerCase())) {
      labelsToAdd.push(labels[index]);
    }
  });

  if (labelsToAdd.length > 0) {
    octokit.issues
      .addLabels({
        ...github.context.repo,
        issue_number: prNumber,
        labels: labelsToAdd,
      })
      .then(() => {
        console.log(
          `These labels were added automatically: ${labelsToAdd.join(", ")}.`
        );
      });
  } else {
    console.log("No label was added.");
  }
} catch (error) {
  core.setFailed(error.message);
}
