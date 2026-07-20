// ================================
// Free Dictionary API
// ================================

const apiURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// ================================
// HTML Elements
// ================================

const form = document.getElementById( "search-form" );
const input = document.getElementById( "word-input" );

const results = document.getElementById( "results" );

const loading = document.getElementById( "loading" );

const error = document.getElementById( "error-message" );

const wordTitle = document.getElementById( "word-title" );

const phonetic = document.getElementById( "phonetic" );

const audioButton = document.getElementById( "audio-button" );

const audioPlayer = document.getElementById( "audio-player" );

const partOfSpeech = document.getElementById( "part-of-speech" );

const definition = document.getElementById( "definition" );

const example = document.getElementById( "example" );

const synonyms = document.getElementById( "synonyms" );

const sourceLink = document.getElementById( "source-link" );

// ================================
// Hide Sections
// ================================

results.style.display = "none";
loading.style.display = "none";
error.style.display = "none";
audioButton.style.display = "none";

// ================================
// Form Submission
// ================================

form.addEventListener( "submit", function ( event ) {

    event.preventDefault();

    const word = input.value.trim();

    if ( word === "" ) {

        showError( "Please enter a word." );

        return;

    }

    fetchWord( word );

} );

// ================================
// Fetch Dictionary Data
// ================================

async function fetchWord( word ) {

    loading.style.display = "block";

    results.style.display = "none";

    error.style.display = "none";

    try {

        const response = await fetch( apiURL + word );

        if ( !response.ok ) {

            throw new Error( "Word not found" );

        }

        const data = await response.json();

        displayData( data[ 0 ] );

    }

    catch ( err ) {

        showError( "Word not found." );

    }

    finally {

        loading.style.display = "none";

    }

}

// ================================
// Display Data
// ================================

function displayData( data ) {

    results.style.display = "block";

    wordTitle.textContent = data.word;

    phonetic.textContent = data.phonetic || "Pronunciation unavailable";

    const meaning = data.meanings[ 0 ];

    partOfSpeech.textContent = meaning.partOfSpeech;

    definition.textContent = meaning.definitions[ 0 ].definition;

    example.textContent =
        meaning.definitions[ 0 ].example || "No example available.";

    // ================================
    // Synonyms
    // ================================

    synonyms.innerHTML = "";

    let synonymArray = [];

    if ( meaning.definitions[ 0 ].synonyms ) {

        synonymArray = meaning.definitions[ 0 ].synonyms;

    }

    if ( synonymArray.length > 0 ) {

        synonymArray.slice( 0, 10 ).forEach( function ( item ) {

            const span = document.createElement( "span" );

            span.textContent = item;

            synonyms.appendChild( span );

        } );

    } else {

        synonyms.innerHTML = "<span>No synonyms available.</span>";

    }

    // ================================
    // Audio
    // ================================

    const audio = data.phonetics.find( function ( item ) {

        return item.audio && item.audio !== "";

    } );

    if ( audio ) {

        audioPlayer.src = audio.audio;

        audioButton.style.display = "inline-block";

        audioButton.innerHTML = "🔊";

        audioButton.onclick = function () {

            audioPlayer.play();

        };

    } else {

        audioButton.style.display = "none";

    }

    // ================================
    // Source
    // ================================

    if ( data.sourceUrls && data.sourceUrls.length > 0 ) {

        sourceLink.href = data.sourceUrls[ 0 ];

        sourceLink.style.display = "inline";

    } else {

        sourceLink.removeAttribute( "href" );

        sourceLink.textContent = "No source available";

    }

}

// ================================
// Error Message
// ================================

function showError( message ) {

    error.style.display = "block";

    error.textContent = message;

    results.style.display = "none";

}