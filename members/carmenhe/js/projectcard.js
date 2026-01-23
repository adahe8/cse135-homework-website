class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        const proj_title = this.getAttribute('proj_title') || 'Untitled';
        const genre = this.getAttribute('genre') || '';
        const urls = JSON.parse(this.getAttribute('image_urls'));

        const desktopurl = urls[0] || "";
        const tableturl = urls[1] || desktopurl;
        const mobileurl = urls[2] || tableturl;
        const imgcontent = this.getAttribute('img_content') || '';
        const preview = this.getAttribute('preview') || '';
        const synopsis = this.getAttribute('synopsis') || '';
        const link = this.getAttribute('link') || '';
        const type = this.getAttribute('type') || '';

        // create component template
        this.shadowRoot.innerHTML += `
            <style>
                :host {
                    border: 1px solid var(--border-color);
                    display: grid;
                    grid-template-columns: 1fr auto auto;
                    grid-template-rows: auto auto auto;
                    row-gap: 0.5rem;
                    align-items: center;
                    padding: 0.75em;
                    @media (min-width: 940px) {
                        font-size: 1rem;
                        width: 30vw;
                        max-width: 320px;
                    }
                    @media (max-width: 940px) and (min-width: 720px) {
                        font-size: 0.75rem;
                        width: 30vw;
                        min-width: 160px;
                        max-width: 230px;
                    }
                    @media (max-width: 720px) {
                        font-size: 0.75rem;
                        width: 75vw;
                        max-width: 270px;
                    }
                }
                .cardHeader {
                    grid-column: 1 / 3;
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                }
                .cardHeader * {
                    margin: 0;
                }
                .cardHeader h3 {
                    font-size: 1.25em;
                }
                .action-menu {
                    grid-column: 3;
                    cursor: pointer;
                    padding: 0;
                }
                picture, .tags, .content {
                    grid-column: 1 / 4;
                }
                .tags {
                    display: flex;
                    justify-content: start;
                    vertical-align: center;
                }
                .tags project-tag{
                    padding: 2px;
                    outline: 1px solid;
                    font-size: 0.75em;
                    height: fit-content;
                    margin: 0 0.5em;
                    font-family: var(--default-script-font);
                }
                .preview {
                    font-family: var(--default-header-font);
                    font-weight: 700;
                }
                a[href] {
                    text-decoration: underline;
                    color: var(--valid-field);
                }
                p, label, textarea {
                    font-family: var(--default-body-font);
                }
                #menu-toggle {
                    border: 0;
                    background-color: unset;
                }
                #menu-toggle #menu-icon {
                    fill: var(--menu-icon-color);
                }
                ul[role="actions"] {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: none;
                }
                .action-menu:hover ul[role="actions"] {
                    position: absolute;
                    display: block;
                }
                li[role="action"] {
                    border: 1px solid var(--border-color);
                    background-color: var(--menu-item-color);
                }
                picture {
                    margin: 0.5em 0;
                    width: 100%;
                }
                picture img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            </style>
            <hgroup class="cardHeader">
                <h3>${proj_title.toUpperCase()}</h3>
                <p class="genre">${genre.toUpperCase()}</p>
            </hgroup>
            <div class="action-menu">
                <button id="menu-toggle" role="menu toggle">
                    <svg viewBox="0 0 12 12" height="12" width="12" role="menu icon" title="actions" id="menu-icon">
                        <circle cx="6" cy="2" r="1.25" />
                        <circle cx="6" cy="6" r="1.25" />
                        <circle cx="6" cy="10" r="1.25" />
                    </svg>
                </button>
                <ul role="actions">
                    <li id="edit" role="action">Edit</li>
                    <li id="delete" role="action">Delete</li>
                </ul>
            </div>
            <picture style="display: block;">
                <source media="(max-width: 720px)" srcset="${mobileurl}">
                <source media="(max-width: 940px) and (min-width: 721px)" srcset="${tableturl}">
                <source media="(min-width: 941px)" srcset="${desktopurl}">
                <img src="${desktopurl}" alt="${imgcontent}">
            </picture>
            <div class="content">
                <div class="tags"></div>
                <p class="preview">${preview}</p>
                <p class="synopsis">${synopsis}</p>
                <p class="code">Learn more about my process <a class="url" href="${link}">here</a>.</p>
            </div>
        `;
        this.id = `p-${this.getAttribute('proj_title')}`.toLowerCase().replaceAll(' ', '-');
        this.populateTags();
    }
    populateTags() {
        const tagContainer = this.shadowRoot.querySelector('.tags');
        const tags = JSON.parse(this.getAttribute('tags'));
        try {
            if (typeof tags !== 'object') {
                throw new Error("attribute type error");
            }
        } catch {
            console.error("tags attribute should be assigned as an array");
        }
        for (let tag of tags) {
            let newTag = document.createElement('project-tag');
            newTag.textContent = tag;
            tagContainer.appendChild(newTag);
        }
    }
    update() {
        const preview = this.shadowRoot.querySelector('.preview');
        const synopsis = this.shadowRoot.querySelector('.synopsis');
        const link = this.shadowRoot.querySelector('.url');
        const content = this.shadowRoot.querySelector('.content');

        let form = document.createElement("form");
        form.innerHTML = `
            <style>
                form {
                    grid-column: 1/4;
                }
                input, textarea {
                    font-size: 0.9em;
                }
            </style>
            <label>Project Tags:</label>
            <select class="tags" multiple>
                <option value="html" sel>html</option>
                <option value="css">css</option>
                <option value="javascript">javascript</option>
                <option value="html">python</option>
                <option value="html">java</option>
                <option value="html">ai</option>
                <option value="html">deep reinforcement learning</option>
            </select>
            <label>Description:</label>
            <input type="text" class="preview" value="${preview.textContent}">
            <label>Learnings:</label>
            <textarea rows="8" class="synopsis">${synopsis.textContent}</textarea>
            <label>Access link:</label>
            <input type="url" class="link" value="${link.getAttribute("href")}">
            <button type="submit" class="submit">Save</button>
            <button type="button" class="cancel">Cancel</button>
        `;
        content.replaceWith(form);

        form.addEventListener("submit",async event=>{
            event.preventDefault();
            const newTags = Array.from(form.querySelector('.tags').selectedOptions).map(tag => tag.value);
            const newPreview = form.querySelector('.preview').value;
            const newSynopsis = form.querySelector('.synopsis').value;
            const newLink = form.querySelector('.link').value;

            //update local storage
            const myKey = `p-${this.getAttribute('proj_title')}`.toLowerCase().replaceAll(' ', '-');
            const currCardData = JSON.parse(localStorage.getItem(myKey));
            currCardData['tags'] = newTags;
            currCardData['preview'] = newPreview;
            currCardData['synopsis'] = newSynopsis;
            currCardData['link'] = newLink;

            localStorage.setItem(myKey, JSON.stringify(currCardData));

            // update remote -- works, commented out so users don't do it
            // const response = await fetch(``https://api.jsonbin.io/v3/b/6932af27ae596e708f850dcb"url``, {
            //     method: 'PUT', headers:{
            //         'Content-Type': 'application/json',
            //         'X-Master-Key':'$2a$10$ljkp2hT31vQmNcZh0aAt4e0WgQlJJLtvSTM6Zfl.bTxL9qo3xh9Nm',
            //         'X-Access-Key': '$2a$10$CciXh/0vGHtYnt9dOzzuZ.3NghwTBH6a/uAUapK4fJH8GwHSA/5Z6'
            //     }, body: JSON.stringify(currCardData)
            // });
            // localStorage.setItem("projectloaded",false); // will update on next click
            // if (!response.ok) {console.log("fail")};

            //exit edit view
            this.exitForm(form,newTags,newPreview,newSynopsis,newLink);
        });

        form.querySelector('.cancel').addEventListener("click",event=>{
            //exit edit view
            this.exitForm(form,JSON.parse(this.getAttribute('tags')),preview.textContent,synopsis.textContent,link.getAttribute("href"));
        });
    }

    exitForm(form_, tagset = null, pre, syn, href) {
        let content = document.createElement("div");
        content.className = "content";
        content.innerHTML = `
            <div class="tags"></div>
            <p class="preview">${pre}</p>
            <p class="synopsis">${syn}</p>
            <p class="code">Learn more about my process <a class="url" href="${href}">here</a>.</p>
        `;
        
        // Convert tagset if passed as string
        if (typeof tagset === 'string') {
            try {
                tagset = JSON.parse(tagset);
            } catch {
                tagset = [];
            }
        }
        if (Array.isArray(tagset)) {
            this.setAttribute('tags', JSON.stringify(tagset))
        };

        form_.replaceWith(content);
        this.populateTags();
    }
    
    disconnectedCallback() {
        // delete from local
        const myKey = `p-${this.getAttribute('proj_title')}`.toLowerCase().replaceAll(' ', '-');
        localStorage.removeItem(myKey);
        // delete from remote -- works so long as no updates arecommented out so users don't do it
        // const response = await fetch(`https://api.jsonbin.io/v3/b/6932af27ae596e708f850dcb/${myKey}`, {
        //     method: 'DELETE', headers:{
        //         'Content-Type': 'application/json',
        //         'X-Master-Key':'$2a$10$ljkp2hT31vQmNcZh0aAt4e0WgQlJJLtvSTM6Zfl.bTxL9qo3xh9Nm',
        //         'X-Access-Key': '$2a$10$CciXh/0vGHtYnt9dOzzuZ.3NghwTBH6a/uAUapK4fJH8GwHSA/5Z6'
        //     }
        // });
        // localStorage.setItem("projectloaded",false); // will update on next click
    }
}
customElements.define('project-card', ProjectCard);