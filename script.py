import requests
import time

# GitHub Personal Access Token
TOKEN = "your-token-here"

# GitHub username
USERNAME = "example-username"


# API endpoint
API_URL = "https://api.github.com"
# Headers for authentication
headers = {
    "Authorization": f"token {TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

def get_repositories():
    repos = []
    page = 1
    while True:
        response = requests.get(f"{API_URL}/user/repos", headers=headers, params={"page": page, "per_page": 100})
        if response.status_code != 200:
            print(f"Failed to fetch repositories: {response.json()}")
            break
        page_repos = response.json()
        if not page_repos:
            break
        repos.extend(page_repos)
        page += 1
    return repos

def update_repository_to_private(repo_name):
    update_url = f"{API_URL}/repos/{USERNAME}/{repo_name}"
    payload = {"private": True}
    
    update_response = requests.patch(update_url, json=payload, headers=headers)
    
    if update_response.status_code == 200:
        print(f"Successfully updated {repo_name} to private")
    else:
        print(f"Failed to update {repo_name}: {update_response.json()}")

def main():
    repos = get_repositories()
    for repo in repos:
        if not repo["private"]:
            update_repository_to_private(repo["name"])
            time.sleep(1)  # Delay to avoid hitting rate limits

if __name__ == "__main__":
    main()