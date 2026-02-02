const form = document.getElementById('echo-form');
const langType = document.getElementById('scripting-lang');
const httpMethod = document.getElementById('http-method');

form.addEventListener('submit', sendRequest);

function sendRequest(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const encodeAsJSON = document.querySelector('input[name="json"]').checked;
    let selectedLang = langType.value;
    let selectedMethod = httpMethod.value;


    if (selectedLang == 'PHP'){
        this.action = "../../usr/lib/cgi-bin/echo-php.php";
    } else if (selectedLang == 'Ruby'){
        this.action = "../../usr/lib/cgi-bin/echo-ruby.rb";
    } else if (selectedLang == 'Node.js'){
        this.action = "../../usr/lib/cgi-bin/echo-node-express.js";
    }else{
        throw new Error("Pick a language from the ones available only!");
    }
    this.method = selectedMethod;
    
    if (encodeAsJSON) {
        if (httpMethod == 'POST' || httpMethod == 'PUT'){
            fetch(this.action, {
                method: selectedMethod,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            })
        } else if (httpMethod == 'GET' || httpMethod == 'DELETE'){
            fetch(this.action, {
                method: selectedMethod,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            })
        }
        
    } else {
        this.submit();
    }

}