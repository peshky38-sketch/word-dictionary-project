#  Wordly Dictionary SPA

## Author

- Name: Rachel Angela Gathoni Kanyoro

---

## Project Description

This project is a Single Page Application (SPA) that allows users to search for English words and immedaiately view their meanings without refreshing the page. The application connects to the Free Dictionary API to retrieve word information and display it dynamically using JavaScript.

The goal of this project was to practice working with APIs, the Fetch API, DOM manipulation, event handling, and responsive web design.

---

## Features

- Search for any English word
- Display the word searched
- Display pronunciation
- Play pronunciation audio
- Display the part of speech
- Display the definition
- Display an example sentence
- Display synonyms (when available)
- Display the dictionary source link
- Show a loading spinner while searching
- Display error messages for invalid or empty searches
- Responsive design for desktop and mobile devices
- Background image and modern user interface

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Fetch API
- Free Dictionary API
- Google Fonts (Poppins)

---

## API Used

- Free Dictionary API

API Website:

https://dictionaryapi.dev/

API Endpoint:

https://api.dictionaryapi.dev/api/v2/entries/en/

The API provides:

- Word
- Pronunciation
- Audio pronunciation
- Definitions
- Part of speech
- Example sentences
- Synonyms
- Source links

---

## Project Structure

- index.html
- style.css
- index.js
- README.md


---

## How to Run the Project

- Download or clone the project.
- Open the project folder in Visual Studio Code.
- Open **index.html** using Live Server or your browser.
- Type a word into the search box.
- Click the **Search** button.
- The results will appear instantly without refreshing the page.

---

## How the Application Works

- The user enters a word.
- JavaScript checks if the input is valid.
- The Fetch API sends a request to the Free Dictionary API.
- The API returns dictionary information.
- JavaScript extracts the required information.
- The page updates automatically using DOM manipulation.
- If the word is not found, an error message is displayed.

---

## Error Handling

The application handles:

- Empty search input
- Invalid words
- Missing pronunciation
- Missing audio
- Missing synonyms
- API or network errors

---

## Accessibility Features

- Semantic HTML elements
- ARIA labels
- ARIA live regions
- Responsive layout
- Keyboard-friendly form

---

## Testing

I tested the application using:

- Valid English words
- Invalid words
- Empty input
- Words with pronunciation audio
- Words without pronunciation audio
- Words with synonyms
- Words without synonyms
- Desktop and mobile screen sizes

---

## Future Improvements

If I continue developing this project, I would like to add:

- Save favourite words
- Search history
- Dark mode
- Word of the Day
- Voice search
- Multiple language support

---

## What I Learned

Through this project, I learned how to:

- Work with APIs using Fetch
- Use asynchronous JavaScript (Async/Await)
- Manipulate the DOM dynamically
- Handle user events
- Handle errors properly
- Build a responsive web application
- Create a Single Page Application (SPA)
- Organize JavaScript code into reusable functions

---

## Acknowledgements

I would like to thank:

- Moringa School for providing the project requirements and learning materials.
- The Free Dictionary API for providing free dictionary data.
- My TM for their guidance and support throughout the project.

---

## License

- This project was created for educational purposes as part of my Software Development coursework.

## Copyright

© 2026 Rachel Angela Gathoni Kanyoro. All Rights Reserved.
