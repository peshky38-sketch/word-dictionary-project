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