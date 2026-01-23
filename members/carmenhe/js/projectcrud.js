document.addEventListener('click', (event) => {
    let card = event.target.closest('project-card');
    if (!card) return;
    const path = event.composedPath();

    // Update
    const editTrigger = path.find(el => el?.id === "edit"); // checks that edit is clicked
    if (editTrigger) {
        console.log(`Editing card: ${card}`); // returns all elements in click path
        card.update();
    }
    // Delete
    const delTrigger = path.find(el => el?.id === "delete"); // checks that delete is clicked
    if (delTrigger) {
        console.log(`Deleting card: ${card}`);
        card.style.transition = "opacity 0.5s";
        card.style.opacity = 0;
        //card.style.height = 0;
        setTimeout(() => card.remove(), 500);
    }
});

// create
const createBtns = document.querySelectorAll('.create');
createBtns.forEach(btn => {
    btn.addEventListener("click", createProject);
});

function createProject(event) {
    const btn = event.currentTarget;
    console.log("click registered");
    const location = event.target.closest("section").getAttribute("id");

    const createForm = document.createElement("form");
    createForm.innerHTML = `
        <style>
            form {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }
            .form-actions{
                display: flex;
                justify-content: space-around;
            }
        </style>
        <label>Title:</label>
        <input type="text" class="title" placeholder="Project name">
        <label>Project type:</label>
        <input type="text" class="genre" list="genres" placeholder="category">
        <datalist id="genres">
            <option value="web dev">web dev</option>
            <option value="machine learning">machine learning</option>
            <option value="creative writing">creative writing</option>
        </datalist>
        <label>Limit 3 image files</label>
        <input type="file" class="images" accept=".jpg,.png,.svg,.webp,.avig,.gif" multiple>
        <label>Project Tags:</label>
        <select class="tags" multiple>
            <option value="html">html</option>
            <option value="css">css</option>
            <option value="javascript">javascript</option>
            <option value="html">python</option>
            <option value="html">java</option>
            <option value="html">ai</option>
            <option value="html">deep reinforcement learning</option>
        </select>
        <label>Description:</label>
        <input type="text" class="preview" placeholder="Short News Caption for Project.">
        <label>Learnings:</label>
        <textarea rows="8" class="synopsis" placeholder="Describe what you learned from the project."></textarea>
        <label>Access link:</label>
        <input type="url" class="link" placeholder="https://github.com/">
        <div class="form-actions">
            <button type="submit" class="submit">Save</button>
            <button type="button" class="cancel">Cancel</button>
        </div>
        <input type="hidden" class="type" value=${location}>
    `;
    btn.parentNode.insertBefore(createForm, btn);
    createForm.addEventListener("submit", (event) => {
        event.preventDefault();
        handleFormSave(event.target);
        handleFormClose(event);
    });
    createForm.querySelector('.cancel').addEventListener("click", handleFormClose);
}
async function handleFormSave(form) {
    const imageFiles = Array.from(form.querySelector('.images').files);
    const images = await Promise.all(imageFiles.map(file => fileToImgUrl(file)));

    const newProj = {
        proj_title: form.querySelector('.title').value,
        genre: form.querySelector('.genre').value,
        image_urls: images,
        image_content: `${form.querySelector('.title').value} demo`,
        tags: Array.from(form.querySelector('.tags').selectedOptions).map(tag => tag.value),
        preview: form.querySelector('.preview').value,
        synopsis: form.querySelector('.synopsis').value,
        link: form.querySelector('.link').value,
        type: form.querySelector('.type').value
    }
    const projKey = `p-${newProj["proj_title"]}`.toLowerCase().replaceAll(' ', '-');
    localStorage.setItem(projKey, JSON.stringify(newProj)); // save to local
    // save to remote
    // await fetch(``https://api.jsonbin.io/v3/b/6932af27ae596e708f850dcb"url``, {
    //     method: 'POST', headers:{
    //         'Content-Type': 'application/json',
    //         'X-Master-Key':'$2a$10$ljkp2hT31vQmNcZh0aAt4e0WgQlJJLtvSTM6Zfl.bTxL9qo3xh9Nm',
    //         'X-Access-Key': '$2a$10$CciXh/0vGHtYnt9dOzzuZ.3NghwTBH6a/uAUapK4fJH8GwHSA/5Z6'
    //     }, body: JSON.stringify(newProj)
    // });
}
function handleFormClose(event) { // btn can be either submit or cancel
    const form = event.target.closest('form');
    form.querySelector('.submit').removeEventListener("click",handleFormSave);
    form.querySelector('.cancel').removeEventListener("click",handleFormClose);
    form.style.transition = "opacity .5s";
    form.style.opacity = 0;
    setTimeout(() => form.remove(), 500);
}
// handle user image file upload -- resolve to usable url
function fileToImgUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // Base64 string
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}