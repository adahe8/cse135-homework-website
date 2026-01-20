class ProjectCard extends HTMLElement {
    static observedAttributes = ["data-title","data-tags","data-deploy-link","data-cover-type","data-srcs"];

    constructor(){
        super();
        // want to put this component in shadow DOM in open mode, so it can be accessed and edited frequently
        this.attachShadow({mode: "open"});
        this._ready = false; // track whether custom component is properly set up
        this._renderQueued = false;
    }

    connectedCallback(){
        this.render();
        this._ready = true; // if connected callback fires, it's rndered
    }

    disconnectedCallback(){
        console.log(`${this.getAttribute("data-title")} was removed.`);
    }

    attributeChangedCallback(name, oldValue, newValue){
        if (!this._ready) return;
        // render again on change only
        if (!this._renderQueued){
            this._renderQueued = true;
            queueMicrotask(() => {
                this._renderQueued = false;
                this.render()
            })
        }
    }

    render() {
        this.shadowRoot.innerHTML = "";
        // setting up markup
        let display = document.createElement("div");
        display.setAttribute("class", "projectdisplay");

        // grabbing necessary data
        const projectName = this.getAttribute("data-title");
        const coverType = this.getAttribute("data-cover-type");
        const srcLinks = JSON.parse(this.getAttribute("data-srcs"));
        const tags = JSON.parse(this.getAttribute("data-tags"));

        // put the tags into the div as custom subject-tag elements
        tags.forEach(subject => {
            let newTag = document.createElement("subject-tag");
            newTag.textContent = subject;
            newTag.setAttribute("class",subject);
            display.appendChild(newTag);
        });

        // handle cover display: either video or image
        if(coverType === "video"){
            let vidCover = document.createElement("video");
            vidCover.setAttribute("autoplay","");
            vidCover.setAttribute("muted","");
            vidCover.setAttribute("loop","");
            srcLinks.forEach(src => {
                let source = document.createElement("source");
                source.setAttribute("src", src);
                source.setAttribute("aria-label", `A demonstration of ${projectName}.`);
                vidCover.appendChild(source);
            });
            vidCover.appendChild(document.createTextNode("Video not supported."));
            display.appendChild(vidCover);
        } else if(coverType === "image") {
            let imgCover = document.createElement("picture");
            imgCover.setAttribute("loading", "lazy");
            srcLinks.forEach(src => {
                let lastIndex = src.lastIndexOf('.');
                let imgType = src.slice(lastIndex+1);
                if (srcLinks.length === 1 || imgType === "png"){
                    let img = document.createElement("img");
                    img.setAttribute("src", src);
                    img.setAttribute("alt", `The ${projectName} project deployed on a device.`);
                    imgCover.appendChild(img);
                }else{
                    let source = document.createElement("source");
                    source.setAttribute("srcset", src);
                    imgCover.appendChild(source);
                }
            });
            display.appendChild(imgCover);
        }

        // referencing external stylesheet
        const linkStyle = document.createElement("link");
        linkStyle.setAttribute("rel", "stylesheet");
        linkStyle.setAttribute("href", "components/projectCard.css");

        // putting it all together
        this.shadowRoot.appendChild(linkStyle);
        this.shadowRoot.appendChild(display);
        const title = document.createElement("h3");
        title.textContent = projectName;
        if(this.hasAttribute("data-deploy-link")){
            const anchor = document.createElement("a");
            anchor.setAttribute("href", this.getAttribute("data-deploy-link"));
            anchor.appendChild(title);
            this.shadowRoot.appendChild(anchor);
        } else {
            this.shadowRoot.appendChild(title);
        }
    }


}

customElements.define("project-card", ProjectCard);