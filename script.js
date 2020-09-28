const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        if (data.quoteText.length > 100) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        complete();
    } catch (error) {
        getQuote();
    }
}

// On Load
getQuote();

// Twitter
function postTwitter () {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_Blank')
}

// Boutons
newQuoteButton.onclick = getQuote;
twitterButton.onclick = postTwitter;