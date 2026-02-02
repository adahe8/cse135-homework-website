const form = document.getElementById('echo-form');
const langType = document.getElementById('scripting-lang');
const httpMethod = document.getElementById('http-method');

form.addEventListener('submit', sendRequest)

function sendRequest(event){
    event.preventDefault();

    let selectedLang = langType.value;
    let selectedMethod = httpMethod.value;

    if (selectedLang == 'PHP'){
        this.action = "../../usr/lib/cgi-bin/echo-php.php";
    } else if (selectedLang == 'Ruby'){
        this.action = "../../usr/lib/cgi-bin/echo-ruby.rb";
    } else if (selectedLang == 'Node.js'){
        this.action = "../../usr/lib/cgi-bin/echo-node-express.js";
    }
    this.method = selectedMethod;
    
    this.submit();
}