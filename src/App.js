import "./App.scss";
import React, { useState, useEffect } from "react";
import COLORS_ARRAY from "./colorsArray";
import { FaTwitterSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

let quoteDBUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("Pray, charity, work");
  const [author, setAuthor] = useState("Tegar D Pradana");
  const [numberGenerator, setNumberGenerator] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState("#663c34");

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
    console.log(parsedJSON);
  };
  useEffect(() => {
    fetchQuotes(quoteDBUrl);
  }, [quoteDBUrl]);

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setNumberGenerator(randomInteger);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
    setAccentColor(COLORS_ARRAY[randomInteger]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="quote-box">
          <p id="text">"{quote}"</p>
          <p id="author">-{author}</p>
          <button
            id="new-quote"
            style={{ backgroundColor: accentColor }}
            onClick={() => getRandomQuote()}
          >
            Change Quote
          </button>
          <a
            id="tweet-quote"
            href={encodeURI(
              `https://twitter.com/intent/tweet?text=${author}-${quote}`
            )}
          >
            <FaTwitterSquare />
          </a>
        </div>
        <footer id="footer">
          <a id="github-link" href={"https://github.com/TechnoLatopumi"}>
            <FaGithub />
          </a>
          made by Tegar D Pradana
        </footer>
      </header>
    </div>
  );
}

export default App;
