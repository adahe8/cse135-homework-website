const form = document.getElementById('echo-form');
const endpoints = {
    'PHP': '/cgi-bin/echo-php.php',
    'Ruby': '/cgi-bin/echo-ruby.rb',
    'Python': '/cgi-bin/echo-python.py'
}

form.addEventListener('submit', sendRequest);

function sendRequest(event){
    event.preventDefault();

    const data = getFormData(form);
    const encodeAsJSON = document.querySelector('input[name="json"]').checked;
    let selectedLang = document.getElementById('scripting-lang').value;
    let selectedMethod = document.getElementById('http-method').value;

    const action = endpoints[selectedLang];
    if (!action) throw new Error('Invalid language selected! Please stick to the original dropdown options.');

    if (selectedMethod === 'PUT' || selectedMethod === 'DELETE') {
        document.getElementById('override').value = selectedMethod;
        form.method = 'POST';
    } else if (selectedMethod === 'GET' || selectedMethod === 'POST'){
        form.method = selectedMethod;
    } else {
         throw new Error('Invalid request type! Please stick to the original dropdown options.');
    }
    form.action = action;
    
    if (encodeAsJSON) {
        // Include override field in JSON for PUT/DELETE
        if (selectedMethod === 'PUT' || selectedMethod === 'DELETE') {
            data._method = selectedMethod;
        }
        
        fetch(form.action, {
            method: (selectedMethod === 'PUT' || selectedMethod === 'DELETE') ? 'POST' : selectedMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body: (selectedMethod === 'GET') ? undefined : JSON.stringify(data)
        })
        .then(response => response.text())
        .then(data => {
            // Display or process the JSON response
            console.log('Response:', data);
            document.getElementById('results').innerHTML += data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        form.submit();
    }
}

function getFormData(form){
    return Object.fromEntries(new FormData(form).entries());
}