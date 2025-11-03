# Push to GitHub - Instructions

## Step 1: Create Repository on GitHub

You have two options:

### Option A: Using GitHub Web Interface (Easiest)
1. Go to https://github.com/new
2. Repository name: `SCI-reader`
3. Description: `Research Discovery Platform - React + TypeScript`
4. Set to **Public** or **Private** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Option B: Using GitHub CLI (if installed)
```bash
gh repo create SCI-reader --public --source=. --remote=origin --push
```

## Step 2: Add Remote and Push

After creating the repository on GitHub, run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/SCI-reader.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Alternative: If repository already exists

If you've already created the repo, just add the remote and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/SCI-reader.git
git push -u origin main
```

## Troubleshooting

If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Set up SSH keys
- Use GitHub CLI for authentication

