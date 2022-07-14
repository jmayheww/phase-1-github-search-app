document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("github-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // data we want to pass from the form
    const inputValue = e.target[0].value;



    fetch(`https://api.github.com/search/users?q=${inputValue}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        //login, avatar_url, url
        const userList = document.querySelector("#user-list");
        const reposList = document.getElementById("repos-list");
        reposList.innerHTML = "";
        userList.innerHTML = "";

        console.log(data);
        console.log(data.items[0].login);

        data.items.map(item => {
            const h2 = document.createElement("h2");
            h2.textContent = item.login;

            h2.addEventListener("click", e => showUserRepos(item.login, e))
            const img = document.createElement("img");
            img.src = item.avatar_url;
            const a = document.createElement("a");
            a.href = item.url;
            const li = document.createElement("li");




                li.append(h2, img, a);
                userList.append(li);
        })
      });
      form.reset();
    });

  function showUserRepos(username, e) {
    e.preventDefault();
    const reposList = document.getElementById("repos-list");
    reposList.innerHTML = "";

    fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())
    .then(data => data.map(repo => {
        const li = document.createElement("li");
       const h1 = document.createElement("h1");
       h1.textContent = repo.name;
       li.append(h1);
       reposList.append(li);
    }));
  }
});
