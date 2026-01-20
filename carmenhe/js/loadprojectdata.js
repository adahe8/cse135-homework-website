const techProjContainer = document.querySelector('#tech_cards');
const creativeProjContainer = document.querySelector('#creative_cards');

// Step 1: event listeners
window.addEventListener('DOMContentLoaded', () => {
    const remoteButton = document.querySelector("#remote");
    const localButton = document.querySelector("#local");
    
    remoteButton.addEventListener('click', getRemote);
    localButton.addEventListener('click', getLocal);
});
// Load from Remote
async function getRemote() {
    let records = {}; // use to hold fetched data
    // Step 2: request
    const url = "https://api.jsonbin.io/v3/b/6932af27ae596e708f850dcb";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        // Step 3: receiving and handling response
        const projectData = await response.json();
        records = projectData.record;

        Object.keys(records).forEach(key => {
            // remove redundancy
            if (document.querySelector(`#${key}`)) {
                return;
            }
            const projectData = records[key];
            createProjectCard(projectData);

            // local storage support -- each time we load from remote successfully, update local
            if (!localStorage.getItem("projectsloaded")){
                localStorage.setItem(key, JSON.stringify(projectData));
            }
        });
        localStorage.setItem("projectsloaded", true);
    } catch(error) {
        console.error(error.message);
    }
}
// Load from LocalStorage
async function getLocal() {
    // Step 2: serialize json and store in localStorage
    if (!localStorage.getItem("projectsloaded")){ // first load pulls from the remote -- requires network
        getRemote();
        console.log("Initial network load");
    } else {
        console.log("Truely local load");
        // Step 3: retrieve from local storage
       Object.keys(localStorage).forEach(key => {
            // avoid repeat insertions
            if (document.querySelector(`#${key}`)) {
                return;
            }
            if(!key.startsWith("p-",0)) return;
            const projectData = JSON.parse(localStorage.getItem(key));
            createProjectCard(projectData);
        });
    }
}
function createProjectCard(jsonObj) {
    const newcard = document.createElement("project-card");
    newcard.setAttribute("proj_title", jsonObj.proj_title);
    newcard.setAttribute("genre", jsonObj.genre);
    newcard.setAttribute("image_urls", JSON.stringify(jsonObj.image_urls));
    newcard.setAttribute("img_content", jsonObj.image_content);
    newcard.setAttribute("tags", JSON.stringify(jsonObj.tags));
    newcard.setAttribute("preview", jsonObj.preview);
    newcard.setAttribute("synopsis", jsonObj.synopsis);
    newcard.setAttribute("link", jsonObj.link);
    newcard.setAttribute("type", jsonObj.type);

    const genre = jsonObj["genre"].toLowerCase();
    const type = jsonObj["type"].toLowerCase();
    if (type.includes("creative") || genre.includes("writing") || genre.includes("art") || genre.includes("travel")) {
        creativeProjContainer.prepend(newcard);
    } else {
        techProjContainer.prepend(newcard);
    }
}