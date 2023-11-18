const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://journalofbigdata.springeropen.com/articles/10.1186/s40537-021-00444-8';

async function fetchData() {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log('Error fetching data:', error);
    return null;
  }
}

async function scrapeData() {
  const html = await fetchData();
  if (!html) {
    console.log('No data to scrape');
    return;
  }

  const scrapedData = []; // Array to store scraped data

  const $ = cheerio.load(html);

  $(`p`).each((index, element) => {
    const data = $(element).text().trim();
    scrapedData.push(data); // Push each scraped paragraph into the array
  });

  return scrapedData; // Return the array of scraped data
}

scrapeData().then((data) => {
  if (data && data.length > 0) {
    console.log('Scraped data:', data);
    // Here you can use the 'data' array as needed
  } else {
    console.log('No data scraped');
  }
});
