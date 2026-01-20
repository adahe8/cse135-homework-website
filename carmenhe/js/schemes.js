/* approach: sets document color scheme to the value of button user clicks */
let switchBtns = document.querySelectorAll('.scheme');
let lightStyles = document.querySelector('link[rel=stylesheet][href*="./css/light.css"]');
let darkStyles = document.querySelector('link[rel=stylesheet][href*="./css/dark.css"]');
// let customStyles = document.querySelector('link[rel=stylesheet][href*="./css/oldfashioned.css"]');

document.addEventListener('DOMContentLoaded', function(){
    toggleScheme();
    let themeToggle = document.getElementById('schemepanel');
    themeToggle.style = "display: inherit;"
});
switchBtns.forEach(button => {
    button.addEventListener('click', function() {
        let selected = button;
        // update which putton is pressed for a11y
        switchBtns.forEach(btn => {
            btn.setAttribute('aria-pressed', btn === selected);
        });
        localStorage.setItem("theme", button.value);
        toggleScheme();
    });
});

function toggleScheme() {
    let lightMediaSettings;
    let darkMediaSettings;
    // let customMediaSettings;
    let chosenScheme = localStorage.getItem("theme") || 'auto';
    if (chosenScheme === 'light') {
        lightMediaSettings = 'all';
        darkMediaSettings = 'not all';
        customMediaSettings = 'not all';
    } else if (chosenScheme === 'dark') {
        lightMediaSettings = 'not all';
        darkMediaSettings = 'all';
        // customMediaSettings = 'not all';
    } else {
        lightMediaSettings = '(prefers-color-scheme: light)';
        darkMediaSettings = '(prefers-color-scheme: dark)';
        // lightMediaSettings = 'not all';
        // darkMediaSettings = 'not all';
        // customMediaSettings = 'all';
    }
    lightStyles.media = lightMediaSettings;
    darkStyles.media = darkMediaSettings;
    //customStyles.media = customMediaSettings;

    switchBtns.forEach(btn => {
        btn.setAttribute('aria-pressed', btn.value === chosenScheme);
    });
}