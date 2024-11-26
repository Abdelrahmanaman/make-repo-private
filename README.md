# GitHub Repository Privatization Script

## Overview

This Python script allows you to automatically convert all your public GitHub repositories to private repositories using the GitHub API.

## Prerequisites

- Python 3.x
- `requests` library
- GitHub Personal Access Token

## Setup

### 1. Install Required Library

```bash
pip install requests
```

### 2. Generate GitHub Personal Access Token

1. Go to GitHub Settings
2. Navigate to "Developer settings" > "Personal access tokens"
3. Click "Generate new token"
4. Select the following scopes:
   - `repo` (Full control of private repositories)
   - `user` (Update user profile information)

### 3. Configure Script

Open the script and replace the following variables:

```python
TOKEN = "your-personal-access-token"
USERNAME = "your-github-username"
```

## Usage

Run the script directly:

```bash
python script.py
```

### What the Script Does

- Fetches all repositories associated with your GitHub account
- Converts public repositories to private repositories
- Includes rate limiting protection with a 1-second delay between updates

## Cloning the Repository

To clone this repository:

```bash
git clone https://github.com/Abdelrahmanaman/make-repo-private.git
cd make-repo-private
```

## Important Security Notes

- Keep your Personal Access Token confidential
- Do not commit the token to version control
- Consider using environment variables or a configuration file for token management

## License

[Specify your license here]

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Disclaimer

Use this script responsibly. Ensure you understand the implications of converting repositories to private status.
