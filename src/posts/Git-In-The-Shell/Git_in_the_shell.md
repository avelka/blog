---
layout: layouts/post.njk
title: "Git in the shell: a guide to the basics"
date: 2020-06-29
---

## Basic Git Commands with Specific Flags

### useful git config

display your git config:

```bash
git config --list
```

Change your name and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "my@email.com"
```

Change your default editor to use vscode:

```bash

git config --global core.editor "code --wait"

# change it back to nvim:

git config --global core.editor "nvim"
```

### Git Init and Git Clone:

Git init is used to initialize a new Git repository in your local directory. To create a Git repository with an initial commit, you can use `git init`.

Git clone creates a local copy of a remote repository. For example, to clone a repository and immediately change to the working directory, you can use `git clone <repository_URL> <folder_name>`.

### Git Checkout and Git Switch:

Git checkout and Git switch are used to switch between branches in your Git repository. To create a new branch and switch to it in one step, use git checkout -b new_branch_name.
To discard changes in your working directory when switching branches, use `git checkout -f` or `git switch -f`.

this is also how you can create new branches with git checkout:

```bash

git checkout -b new_branch_name

# or using switch

git switch -c new_branch_name

```

#### Differences between Git Checkout and Git Switch:

In older versions of Git (prior to Git 2.23), git checkout is the primary command used for branch switching.
It also serves various other purposes, like checking out a specific commit or file. This versatility can sometimes lead to confusion.
`git switch`` is primarily used for switching branches and is designed to be more intuitive, reducing the risk of unintended side effects.
It enforces a stricter separation between the different use cases, making it less error-prone than git checkout.

##### Alternative use case of `git checkout`:

- Undo Local Changes:

If you've made changes to a file and want to discard those changes, you can use git checkout to revert the file to its last committed state. This is especially handy when you've made a mistake or want to start fresh with the file.

```bash
git checkout file_name
```

- Resolve Conflicts:

During a merge or a rebase, Git may generate conflicts that need to be resolved. After resolving conflicts in a file, you can use git checkout to accept the changes from one of the conflicting branches and discard the changes from the other.

```bash
git checkout --ours file_name # Accept changes from the current branch (usually the branch you're on).
git checkout --theirs file_name # Accept changes from the other branch.
```

- View File from a Different Branch:

You can also use git checkout to view a file from a different branch without actually switching branches. This can be useful for comparing or copying code from one branch to another.

```bash
git checkout branch_name -- file_name
```

> Keep in mind that when using git checkout to undo local changes, it's a destructive operation. Any unsaved changes in the file will be permanently lost, so use it with caution. If you want to save your changes before discarding them, consider using git stash to temporarily save your work.

### Git Status, Git Add, and Git Commit:

- Git status is used to view the status of your working directory. To display untracked files as well, use `git status -u` or `git status --untracked-files`.
- Git add stages changes for the next commit. To interactively stage changes, use `git add -i`.
- Git commit saves the staged changes to the repository. To commit all changes, including untracked files, use `git commit -a`. To sign your commits, use `git commit -S -m "Your commit message"`.

### Git Pull and Git Push:

Git pull fetches changes from a remote repository and merges them into your current branch. To rebase instead of merging, use `git pull --rebase`.
Git push uploads your local commits to a remote repository. To push a specific branch, use `git push origin branch_name`. To delete a remote branch, use `git push origin --delete branch_name`.

## Intermediate Git Commands with Situational Examples

### Git Merge and Git Rebase:

- Git merge is useful when you want to combine changes from a feature branch into the main branch, typically when you've completed work on a feature. For example:

```bash
  git checkout main
  git merge feature-branch
```

- Git rebase is handy when you want to integrate changes from a feature branch into the main branch while maintaining a linear commit history. For instance:

```bash
  git checkout feature-branch
  git rebase main
```

this is usually done with your remote tool such as github or gitlab, but you can also do it locally. when you do it locally it is usually to integrate changes from default branch to your feature branch:
you could then use the pull command with the --rebase flag to do the same thing:

```bash
git pull --rebase origin main
```

> note that this is also available as a config option:

```bash
git config --global pull.rebase true
```

### Git Rebase -i (Interactive Rebase):

Git rebase -i is valuable when you want to clean up your commit history or combine multiple commits into one. Let's say you want to squash the last three commits into a single commit:

```bash
git rebase -i HEAD~3
# or
git rebase -i <base_commit>
```

Here, `<base_commit>` is the commit that you want to set as the new base for your branch. The base commit can be specified in various ways, such as a commit hash, a branch name, or even relative references like `HEAD~3` (three commits back from the current `HEAD`).

After running the `git rebase -i` command, Git will open a text editor, typically your default terminal text editor. In this text editor, you will see a list of commits in your branch and their actions, which are typically "pick" by default. You can then edit this list to specify what you want to do with each commit.

Here's a breakdown of the actions you can use during an interactive rebase:

`Pick (p)`: This is the default action, and it means you want to keep the commit as is.

`Reword (r)`: Use this action to edit the commit message. Git will open a text editor for you to modify the message.

`Edit (e):` If you choose "edit," Git will pause the rebase after applying the commit, allowing you to make changes to the commit's content.

`Squash (s):` Squashing combines the commit with the one before it. You can use this to group related commits together.

`Fixup (f)`: Similar to squash, but it discards the commit message. It's used for combining commits without keeping their individual messages.

`Drop (d)`: This action discards the commit entirely, effectively removing it from the branch's history.

`Exec (x)`: This action allows you to run a shell command during the rebase. For example, you can use it to amend changes or execute custom scripts.

Here's an example of what an interactive rebase might look like:

```bash
pick abc123 Implement feature A
pick def456 Refactor code
pick ghi789 Bug fix for issue #123
pick jkl012 Documentation updates
pick mno345 Merge branch 'feature/B'
pick pqr678 Fix typo in README
```

In this example, you could change the actions as needed. For instance, to squash the last three commits into a single commit, you could modify the list as follows:

```bash
pick abc123 Implement feature A
pick def456 Refactor code
pick ghi789 Bug fix for issue #123
squash jkl012 Documentation updates
squash mno345 Merge branch 'feature/B'
squash pqr678 Fix typo in README
```

Once you've made your desired changes in the text editor, save and exit the file. Git will then execute the rebase according to the instructions you provided. This can be a powerful way to clean up your commit history and make it more organized.

### Git Cherry-Pick:

Use git cherry-pick when you want to apply a specific bug fix or feature from one branch to another. For example, if you have a bug-fix commit on a "hotfix" branch that needs to be added to the main branch:

```bash
git checkout main
git cherry-pick <commit-hash>
```

### Git Log (Extracting a Changelog):

Use git log to generate a changelog for a specific date range. For example, if you want to list commits between January 1, 2023, and December 31, 2023:

```bash
git log --since="2023-01-01" --until="2023-12-31" --oneline
```

you can also use the --author flag to filter by author:

```bash
git log --author="Antoine Corre"
```

More advanced use case could be preparing a release changelog:

1.Determine the Last Release Tag:

First, you need to identify the tag that represents the last release in your Git repository. You can use git tag to list all the tags and find the most recent one.

```bash
git tag --sort=-committerdate
```

This command lists tags sorted by committer date in descending order, making it easier to identify the most recent release tag.

2. Generate a Changelog Since the Last Release:

Once you have identified the last release tag (let's say it's named "v1.0.0"), you can generate a changelog for all the commits made since that tag.

```bash
git log v1.0.0..HEAD --oneline
```

` v1.0.0..HEAD`` specifies the range of commits to display, starting from the last release tag (v1.0.0) and ending with the most recent commit in the current branch (HEAD).
 `--oneline` is an option to display a compact one-line summary for each commit. This makes the changelog more concise.

3. Customize the Changelog:

You can further customize the changelog by using additional git log options. For example, you can add the --pretty option to format the output according to your preference. Here's an example of a formatted changelog:

```bash
git log v1.0.0..HEAD --pretty=format:"%h - %s (%an)"
# %h displays the abbreviated commit hash.
# %s shows the commit subject.
# %an displays the author's name.
```

4.  Save or Output the Changelog:

You can save the changelog to a text file or view it in the terminal. To save it to a file, you can use the > operator to redirect the output to a file:

```bash
git log v1.0.0..HEAD --oneline > changelog.txt
# for macos user, pbcopy is the clipboard command
git log v1.0.0..HEAD --oneline > pbcopy

```

This command saves the changelog to a file named "changelog.txt."

By following these steps, you can use git log to generate a changelog that lists all the commits made since the last release tag up to the HEAD commit. This changelog can be useful for tracking and documenting the changes made in your project between releases.

### Git Stash:

Git stash is a useful command that allows you to temporarily save changes in your working directory without committing them. It's particularly handy when you need to switch to a different branch, address an urgent issue, or clean up your working directory without committing half-finished changes. Here are more details on how to use Git stash:

To save your changes in a stash, use the following syntax:

```bash
git stash
```

To apply the changes from the most recent stash, use:

```bash
git stash apply
```

If you want to remove the changes from the stash after applying, use:

```bash
git stash pop
```

when dealing with multiple stashes, you can specify a stash by its ID:

```bash
git stash apply stash@{2}
```

list them with:

```bash
git stash list
```

to help you further you can add a message to your stash:

```bash
git stash save "message"
```

## Git Advanded topics

### Git Worktree:

Git worktree is a powerful feature introduced in Git 2.5 that allows you to maintain multiple working trees in the same repository. Each working tree is essentially a separate, isolated directory within your repository, and it can have its own branch.

#### Use Cases for Git Worktree:

Parallel Development: You can work on different features or bug fixes simultaneously in separate worktrees, which is particularly useful for larger projects.
Testing and Verification: Use worktrees to quickly switch between different branches to test code changes or verify the impact of a bug fix.
Documentation or User Guides: Maintain separate worktrees for different versions of your project to update documentation or guides without affecting the current development.

#### Basic Git Worktree Commands:

- Creating a new worktree:

```bash
git worktree add <path_to_new_worktree> <branch_name>
```

- Listing existing worktrees:

```bash
git worktree list
```

- Removing a worktree:

```bash
git worktree remove <path_to_worktree>
```

### Git Bisect:

Git bisect is a built-in binary search tool in Git that helps you identify the commit that introduced a bug or regression in your project. It works by systematically narrowing down the range of commits where the issue was introduced.

#### Use Cases for Git Bisect:

- Bug Hunting: Use Git bisect to identify the exact commit that introduced a bug so you can address it.
- Regression Testing: Ensure that previously working code remains error-free by quickly pinpointing the commit causing a regression.
  Performance Optimization: Track down the commit that caused a performance regression in your codebase.

#### Basic Git Bisect Commands:

1. Start a bisect session:

```bash
git bisect start
```

2. Mark a known good and a known bad commit:

```bash
git bisect good <commit>
git bisect bad <commit>
```

3. Automatically locate the first bad commit:

```bash
git bisect run <test_command>
```

4. Exit the bisect session:

```bash
git bisect reset
```

Both `git worktree` and `git bisect` are advanced Git commands that offer unique capabilities for more complex development and debugging scenarios. Understanding how to use these commands can greatly enhance your productivity as a Git user.

### Some links:

- [13 Advanced (but useful) Git Techniques and Shortcuts - Fireship](https://www.youtube.com/watch?v=ecK3EnyGD8o&t=303s&ab_channel=Fireship)
- [Git Hidden Gems - Enrico Campidoglio - NDC Oslo 2023](https://www.youtube.com/watch?v=WtUCZYyv-_w&t=4s&ab_channel=NDCConferences)
