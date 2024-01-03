import React, { useState } from 'react';
import './Popup.css';


const axios = require('axios');
const cheerio = require('cheerio');


const fetchData = async (url) => {
 try {
   // Use axios to make a GET request to the provided URL
   const response = await axios.get(url);


   // Return the HTML content
   return response.data;
 } catch (error) {
   // Handle errors, for example, log the error and return null
   console.error('Error fetching data:', error);
   return null;
 }
};


const scrapeData = (html) => {
 if (!html) {
   console.log('No data to scrape');
   return;
 }


 const scrapedData = [];
 const $ = cheerio.load(html);


 $('p').each((index, element) => {
   const data = $(element).text().trim();
   scrapedData.push(data);
 });


 return scrapedData;
};


const extractKeywordsAndDefinitions = (rawResponseData) => {
  const jsonPattern = /{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*}/; // Regex pattern to extract JSON-like content

  const matchedJSON = rawResponseData.match(jsonPattern);

  if (matchedJSON) {
    try {
      const responseData = JSON.parse(matchedJSON[0]);
      if (responseData && responseData.keywords && Array.isArray(responseData.keywords)) {
        const keywordData = responseData.keywords;

        const keywords = [];
        const definitions = [];

        // Iterate through each keyword object
        for (const keywordObj of keywordData) {
          if (keywordObj && keywordObj.keyword && keywordObj.definition) {
            const keyword = keywordObj.keyword;
            const definition = keywordObj.definition;

            keywords.push(keyword);
            definitions.push(definition);
          }
        }

        return { keywords, definitions };
      } else {
        console.error("Invalid or missing 'keywords' array in the extracted JSON");
      }
    } catch (error) {
      console.error("Error parsing extracted JSON:", error);
    }
  } else {
    console.error("No valid JSON-like content found in the input string");
  }

  return { keywords: [], definitions: [] };
};

const createHTMLFile = (scrapedText, keywords, definitions) => {
  const { highlightedContent } = parseContent(scrapedText, keywords, definitions);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Scraped Content</title>
      <style>
        .highlighted {
          background-color: yellow;
          position: relative;
        }
        .tooltip {
          display: none;
          position: absolute;
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 5px;
          z-index: 2;
        }
        .highlighted:hover .tooltip {
          display: block;
        }
      </style>
    </head>
    <body>
      <div id="content">${highlightedContent}</div>
    </body>
    </html>
  `;
  const blob = new Blob([htmlContent], { type: 'text/html' });
  return URL.createObjectURL(blob);
};

const parseContent = (text, keywords, definitions) => {
  let highlightedContent = text;
  const matchedKeywords = new Set();
  keywords.forEach((keyword, index) => {
    const regExp = new RegExp(`\\b${keyword}\\b`, 'gi');
    let match;
    while ((match = regExp.exec(text)) !== null) {
      if (!matchedKeywords.has(keyword)) {
        const tooltipId = `tooltip-${index}-${match.index}`;
        highlightedContent = highlightedContent.replace(match[0], () => {
          matchedKeywords.add(keyword);
          return `<span class="highlighted">${match[0]}<span class="tooltip" id="${tooltipId}">${definitions[index]}</span></span>`;
        });
      }
    }
  });
  return { highlightedContent };

};



const openHTMLFileInNewTab = (htmlContent) => {
  const newWindow = window.open('');
  if (newWindow) {
    newWindow.document.write(`<iframe src="${htmlContent}" width="100%" height="100%"></iframe>`);
  } else {
    console.error('Pop-up window blocked!');
  }
};

const sendTextToApi = async (text, scraped) => {
  console.log('Before fetch');
  try {
    // Truncate the text to the first 20,000 characters
    const truncatedText = text.slice(0, 20000);
    const response = await fetch('https://saniyad22-ii4pry32dq-vp.a.run.app/get_keywords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: truncatedText }),
    });
    console.log('After fetch');
    const rawResponse = await response.text();
    console.log(rawResponse);
    if (response.ok) {
      // Extracted keywords and definitions from the API response
      const { keywords, definitions } = extractKeywordsAndDefinitions(rawResponse);
      // Joined the scraped data into a single text string
      const textToSend = scraped.join(' ');
  
      console.log(keywords)
      const htmlContent = createHTMLFile(textToSend, keywords, definitions);
  
      // Open the generated HTML in a new tab
      openHTMLFileInNewTab(htmlContent);
    } else {
      console.log('Not working');
    }
  } catch (error) {
    console.error('Error during fetch:', error);
  }
 };

const Popup = () => {
 const [urlInput, setUrlInput] = useState('');


 const handleUrlInputChange = (event) => {
   setUrlInput(event.target.value);
 };


 const handleClick = async () => {
   console.log('Button clicked');
   try {
     // Fetch and scrape data from the provided URL
     const html = await fetchData(urlInput);
     const scrapedData = scrapeData(html);


     if (scrapedData && scrapedData.length > 0) {
       console.log('Scraped data:', scrapedData);


       // Join the scraped data into a single text string
       const textToSend = scrapedData.join(' ');


       // Send the text to the API endpoint
       await sendTextToApi(textToSend, scrapedData);
     } else {
       console.log('No data scraped');
     }
   } catch (error) {
     console.error('Error:', error);
   }
 };


 return (
   <div className="App">
     <header className="App-header">
       {/* Text field for user to input the URL */}
       <input
         type="text"
         placeholder="Enter URL"
         value={urlInput}
         onChange={handleUrlInputChange}
       />


       {/* Button to trigger the scraping and API call */}
       <button onClick={handleClick}>
         Click me
       </button>
     </header>
   </div>
 );
};


export default Popup;
