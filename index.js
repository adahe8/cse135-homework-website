const form = document.getElementById('echo-form');
const endpoints = {
    'PHP': '/cgi-bin/echo-php.php',
    'Ruby': '/cgi-bin/echo-ruby.rb',
    'Node.js': '/cgi-bin/echo-node-express.js'
}

form.addEventListener('submit', sendRequest);

function sendRequest(event){
    event.preventDefault();

    const data = getFormData(form);
    const encodeAsJSON = document.querySelector('input[name="json"]').checked;
    let selectedLang = document.getElementById('scripting-lang').value;
    let selectedMethod = document.getElementById('http-method').value;

    const action = endpoints[selectedLang];
    if (!action) throw new Error('Invalid language selected! Please stick to dropdown options.');

    let url = action;
    let options = { selectedMethod };
    
    if (method === 'GET') {
        url += '?' + new URLSearchParams(data);
    } else {
        if (encodeAsJSON) {
            options.headers = { 'Content-Type':'application/json' };
            options.body = JSON.stringify(data);
        } else {
            options.headers = { 'Content-Type':'application/x-www-form-urlencoded' };
            options.body = new URLSearchParams(data);
        }
    }

    fetch(url, options)
        .then(res => res.text())
        .then(html => {
            document.body.innerHTML = html;
        })
}

function getFormData(form){
    return Object.fromEntries(new FormData(form).entries());
}