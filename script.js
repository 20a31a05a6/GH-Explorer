const repoForm = document.getElementById('repoForm');
const usernameInput = document.getElementById('usernameInput');
const repoTitle = document.getElementById('repoTitle');
const repoList = document.getElementById('repoList');

repoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = usernameInput.value;
    exploreRepositories(username);
});

function exploreRepositories(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repositories => {
            repoTitle.textContent = `Repositories for ${username}:`;
            repoList.innerHTML = '';

            repositories.forEach(repo => {
                const listItem = document.createElement('li');
                listItem.classList.add('repository');

                const link = document.createElement('a');
                link.href = repo.html_url;
                link.textContent = repo.name;

                listItem.appendChild(link);
                repoList.appendChild(listItem);
            });
        })
        .catch(error => {
            repoTitle.textContent = `Error: ${error.message}`;
            repoList.innerHTML = '';
        });
}
