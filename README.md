# Interview BE PR Assignment

Congratulations on being shortlisted to join Synnax as a BE engineer! This assignment would require you to **review** a pull request (PR) to gauge your technical skills.

Take note that this code does contain issues related to architectural choices, performance, stability, correctness, etc.

## Getting Started

1. Create an **empty private** repository in your own account. For the purposes of step 2, we will name it `synnax-interview-be-pr-assignment`. **DO NOT FORK** this repository for reviewing as that will make your review public.
2. Clone this repository into your own repository. As we are unable to do that in GitHub's Web UI, you will need to perform this manually, by:

   ```bash
   git clone git@github.com:synnax-ai/interview-be-pr-assignment.git synnax-interview-be-pr-assignment
   cd synnax-interview-be-pr-assignment
   git fetch origin
   git remote add submission git@github.com:<username>/synnax-interview-be-pr-assignment.git
   git pull origin master
   git push -u submission master
   git switch feature
   git pull origin feature
   git push -u submission feature
   ```

3. In your own private repository, create a PR from the `feature` branch to the `master` branch, and review it as you would a normal PR.
4. Once you have finished reviewing the PR, invite `vs@synnax.ai` and `calvin@synnax.ai` as collaborators in the repo for processing :)

## PR Feature

- We have a campaign that gives away 10,000 USD.
- The endpoint will allow the public to join the giveaway.
- Only participants who are 18 years old and above at the end of the campaign are eligible.
- The end date of the campaign is currently undetermined at this stage.
- Distribute the money evenly for all participants.

## PR Reviewing Guidelines

- Treat this PR as any normal PR, and review it as well as you can.
- If there are larger issues that render some smaller issues moot, please do still flag out the smaller issues.
