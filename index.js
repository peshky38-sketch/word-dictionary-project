const apiURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const form = document.getElementById( "search-form" );
const input = document.getElementById( "search-input" );

const results = document.getElementById( "results" );
const loading = document.getElementById( "loading" );
const error = document.getElementById( "error" );

const word = document.getElementById( "word" );
const phonetic = document.getElementById( "phonetic" );
const partOfSpeech = document.getElementById( "part-of-speech" );
const definition = document.getElementById( "definition" );
const example = document.getElementById( "example" );
const synonyms = document.getElementById( "synonyms" );
const source = document.getElementById( "source" );

const audioButton = document.getElementById( "audio-btn" );
const audioPlayer = document.getElementById( "audio" );

results.style.display = "none";
loading.style.display = "none";
error.style.display = "none";

form.addEventListener( "submit", function ( event ) {

    event.preventDefault();

    const searchWord = input.value.trim();

    if ( searchWord === "" ) {
        showError( "Please enter a word." );
        return;
    }

    loading.style.display = "block";
    results.style.display = "none";
    error.style.display = "none";

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch( apiURL + searchWord, requestOptions )

        .then( function ( response ) {

            if ( !response.ok ) {
                throw new Error( "Word not found" );
            }

            return response.json();

        } )

        .then( function ( data ) {

            displayWord( data[ 0 ] );

            loading.style.display = "none";

        } )

        .catch( function () {

            loading.style.display = "none";

            showError( "Sorry! Word not found." );

        } );

} );
function displayWord( data ) {

    results.style.display = "block";

    word.textContent = data.word;

    phonetic.textContent = data.phonetic || "Pronunciation unavailable";

    const meaning = data.meanings[ 0 ];

    partOfSpeech.textContent = meaning.partOfSpeech;

    definition.textContent = meaning.definitions[ 0 ].definition;

    if ( meaning.definitions[ 0 ].example ) {
        example.textContent = meaning.definitions[ 0 ].example;
    } else {
        example.textContent = "No example available.";
    }

    synonyms.innerHTML = "";

    let synonymArray = [];

    if ( meaning.definitions[ 0 ].synonyms.length > 0 ) {

        synonymArray = meaning.definitions[ 0 ].synonyms;

    } else if ( meaning.synonyms.length > 0 ) {

        synonymArray = meaning.synonyms;

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

    const audioObject = data.phonetics.find( function ( item ) {

        return item.audio !== "";

    } );

    if ( audioObject ) {

        audioPlayer.src = audioObject.audio;

        audioButton.style.display = "inline-block";

        audioButton.onclick = function () {

            audioPlayer.play();

        };

    } else {

        audioButton.style.display = "none";

    }

    if ( data.sourceUrls && data.sourceUrls.length > 0 ) {

        source.innerHTML = `<a href="${ data.sourceUrls[ 0 ] }" target="_blank">View Source</a>`;

    } else {

        source.textContent = "No source available.";

    }

}

function showError( message ) {

    error.style.display = "block";

    error.textContent = message;

    results.style.display = "none";

}