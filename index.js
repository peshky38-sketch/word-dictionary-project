// ============================
// Free Dictionary API
// ============================

const apiURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// ============================
// Selecting Elements
// ============================

const form = document.getElementById( "search-form" );
const input = document.getElementById( "search-input" );

const results = document.getElementById( "results" );

const loading = document.getElementById( "loading" );

const error = document.getElementById( "error" );

const wordTitle = document.getElementById( "word" );

const phonetic = document.getElementById( "phonetic" );

const audioButton = document.getElementById( "audio-btn" );

const audioPlayer = document.getElementById( "audio" );

const partOfSpeech = document.getElementById( "part-of-speech" );

const definition = document.getElementById( "definition" );

const example = document.getElementById( "example" );

const synonyms = document.getElementById( "synonyms" );

const source = document.getElementById( "source" );

// ============================
// Hide Elements Initially
// ============================

results.style.display = "none";
loading.style.display = "none";
error.style.display = "none";

// ============================
// Form Event
// ============================

form.addEventListener( "submit", function ( event ) {

    event.preventDefault();

    const word = input.value.trim();

    if ( word === "" ) {

        showError( "Please enter a word." );

        return;

    }

    getWord( word );

} );

// ============================
// Fetch Word
// ============================

async function getWord( word ) {

    loading.style.display = "block";

    results.style.display = "none";

    error.style.display = "none";

    try {

        const response = await fetch( apiURL + word );

        if ( !response.ok ) {

            throw new Error( "Word not found" );

        }

        const data = await response.json();

        displayWord( data[ 0 ] );

    }

    catch ( err ) {

        showError( "Sorry! Word not found." );

    }

    finally {

        loading.style.display = "none";

    }

}

// ============================
// Display Word
// ============================

function displayWord( data ) {

    results.style.display = "block";

    wordTitle.textContent = data.word;

    phonetic.textContent = data.phonetic || "Pronunciation unavailable";

    // Audio
    const audioObject = data.phonetics.find( item => item.audio );

    if ( audioObject ) {

        audioPlayer.src = audioObject.audio;

        audioButton.style.display = "inline-block";

        audioButton.onclick = function () {

            audioPlayer.play();

        };

    }

    else {

        audioButton.style.display = "none";

    }

    // Meaning

    const meaning = data.meanings[ 0 ];

    partOfSpeech.textContent = meaning.partOfSpeech;

    definition.textContent = meaning.definitions[ 0 ].definition;

    if ( meaning.definitions[ 0 ].example ) {

        example.textContent = meaning.definitions[ 0 ].example;

    }

    else {

        example.textContent = "No example available.";

    }