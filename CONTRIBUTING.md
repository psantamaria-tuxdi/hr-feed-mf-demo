# Contributing Guidelines

## Branch Protection Rules

⚠️ **Important**: Direct pushes to protected branches are not allowed or discouraged.

### Protected Branches

- **`main`**: Production-ready code, strict PR workflow required
- **`develop`**: Integration branch, PR workflow required (approval from any developer)

## Required Workflow for Main Branch (Gitflow)

1. Create a release branch (`release/x.y.z`) or hotfix branch (`hotfix/x.y.z`) from `develop` (for release) or `main` (for hotfix)
2. Make your changes in the release or hotfix branch
3. Open a Pull Request to `main` from the release or hotfix branch
4. **@PabloSantaMaria must approve the PR** (enforced by CODEOWNERS)
5. **Only @PabloSantaMaria can merge** the approved PR

## Required Workflow for Develop Branch

1. Create a feature branch from `develop`
2. Make your changes in the feature branch
3. Open a Pull Request to `develop`
4. **At least 1 approval from any developer is required**
5. **Any approved PR can be merged** to develop

## Typical Git Flow

```bash
# For new features (develop branch workflow)
git checkout develop
git pull origin develop
git checkout -b feature/my-new-feature

# Make your changes and commit
git add .
git commit -m "Add new feature"

# Push feature branch
git push origin feature/my-new-feature

# Open PR via GitHub UI targeting develop branch
# After approval and merge to develop, create a release branch from develop for production
```

## Branch Hierarchy

```plaintext
feature/branch → develop → release/x.y.z → main
     ↑              ↑           ↑           ↑
   Development   Integration  Pre-release  Production
```

### Example Workflows

#### Feature Development

```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication

# Work on feature, then create PR to develop
# After approval, merge to develop
```

#### Release to Production

```bash
# Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/1.2.0

# Prepare release, then open PR to main
# After @PabloSantaMaria approval, merge to main
```

#### Hotfix to Production

```bash
# Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/1.2.1

# Prepare hotfix, then open PR to main
# After @PabloSantaMaria approval, merge to main
```

**Note**: The CODEOWNERS file ensures that @PabloSantaMaria must approve all PRs to main. For develop, any developer can approve PRs.
