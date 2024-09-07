const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to scrape Hindu calendar data from DrikPanchang
async function getHinduDate() {
    try {
        const { data } = await axios.get('https://www.drikpanchang.com/?geoname-id=1275339');
        const $ = cheerio.load(data);

        // Scraping the required elements
        const mainDiv = $('.dpPHeaderLeftContent');
        const dateParts = mainDiv.find('div').toArray();
        
        if (dateParts.length >= 3) {
            const combinedDateString = $(dateParts[1]).text().trim();
            
            let firstPart = '';
            let secondPart = '';
            let thirdPart = '';

            // Determine the keyword to split by
            const pakshaKeyword = combinedDateString.includes('Krishna Paksha') ? 'Krishna Paksha' : 
                                  combinedDateString.includes('Shukla Paksha') ? 'Shukla Paksha' : null;

            if (pakshaKeyword) {
                const firstSplit = combinedDateString.split(pakshaKeyword, 2);
                firstPart = firstSplit[0].trim();
                const remainingText = pakshaKeyword + ' ' + (firstSplit[1] || '').trim();

                // Use regex to find the first number in the remaining text
                const numberMatch = remainingText.match(/\d+/);
                if (numberMatch) {
                    secondPart = remainingText.substring(0, numberMatch.index).trim();
                    thirdPart = remainingText.substring(numberMatch.index).trim();
                } else {
                    secondPart = remainingText;
                    thirdPart = 'Data not found';
                }
            } else {
                // If no paksha keyword found, use default parsing
                const numberMatch = combinedDateString.match(/\d+/);
                if (numberMatch) {
                    firstPart = combinedDateString.substring(0, numberMatch.index).trim();
                    secondPart = combinedDateString.substring(numberMatch.index).trim();
                    thirdPart = 'Data not found';
                } else {
                    firstPart = combinedDateString;
                    secondPart = 'Data not found';
                    thirdPart = 'Data not found';
                }
            }

            // Remove trailing commas from the first part
            if (firstPart.endsWith(',')) {
                firstPart = firstPart.slice(0, -1).trim();
            }

            return {
                date: firstPart,
                tithi: secondPart,
                samvata: thirdPart
            };
        } else {
            return {
                date: 'Date not found',
                tithi: 'Date not found',
                samvata: 'Date not found'
            };
        }
    } catch (error) {
        console.error('Error fetching Hindu calendar:', error);
        return {
            date: 'N/A',
            tithi: 'N/A',
            samvata: 'N/A'
        };
    }
}

// Serve the HTML page with Hindu date data
app.get('/', async (req, res) => {
    const hinduDate = await getHinduDate();
    
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Retro Link Tree</title>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>
<body class="light-mode">
    <div class="container">
        <header>
            <h1>Hello World !</h1>
            <section class="links">
                <div class="link-box"><a href="https://github.com/Jeevan-04" target="_blank">GitHub</a></div>
                <div class="link-box"><a href="https://www.linkedin.com/in/jeevan-naidu-bhārata/" target="_blank">LinkedIn</a></div>
                <div class="link-box"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=njeevan0406@gmail.com" target="_blank">Gmail</a></div>
                <div class="link-box"><a href="https://medium.com/@@2023.jeevann" target="_blank">Medium</a></div>
                <div class="link-box"><a href="https://twitter.com/_Jeevan_naidu_" target="_blank">Twitter</a></div>
                <div class="link-box"><a href="portfolio.html" target="_blank">Portfolio</a></div>
            </section>
            <br>
            <br>
            <footer>
                <h4>Welcome to my digital playground!</h4>
                <h5>Explore my LinkedIn for professional adventures and GitHub for code wizardry.</h5>
            </footer>
        </header>
    </div>

    <div class="hindu-date">
        <div>${hinduDate.date}</div>
        <div>${hinduDate.tithi}</div>
        <div>${hinduDate.samvata}</div>
    </div>

    <div class="game">
        <div id="tic-tac-toe">
            <h3>&nbsp;&nbsp;Play With Me !</h3>
            <div class="board">
                <div class="square" data-index="0"></div>
                <div class="square" data-index="1"></div>
                <div class="square" data-index="2"></div>
                <div class="square" data-index="3"></div>
                <div class="square" data-index="4"></div>
                <div class="square" data-index="5"></div>
                <div class="square" data-index="6"></div>
                <div class="square" data-index="7"></div>
                <div class="square" data-index="8"></div>
            </div>
            <div class="status">
                <p id="status-message">Your turn!</p>
                <button id="play-again" style="display:none;">Play Again</button>
            </div>
        </div>
    </div>
    <div class="in-marquee">
        <div class="marquee-content">
            <span class="marquee-text">
                Welcome to my personal hub! Connect with me, explore my projects, and stay updated. Browse the links and let’s stay in touch!
            </span>
            <span class="marquee-text">
                Welcome to my personal hub! Connect with me, explore my projects, and stay updated. Browse the links and let’s stay in touch!
            </span>
        </div>
    </div>

    <div class="an-marquee">
        <div class="marquee-content">
            <span class="marquee-text">
                स्वागतम् मम आत्मीयमन्दिरे! मया सह स्नेहबन्धं विधाय, मम कृतयोजनाः पश्यन्तु, नवरत्नेषु उपक्रमेषु अद्यतनाः स्यात। एतानि सम्पर्कसूत्राणि अनुबध्नन्तु, सहृदयसंपर्कं धारयन्तु।
            </span>
            <span class="marquee-text">
                स्वागतम् मम आत्मीयमन्दिरे! मया सह स्नेहबन्धं विधाय, मम कृतयोजनाः पश्यन्तु, नवरत्नेषु उपक्रमेषु अद्यतनाः स्यात। एतानि सम्पर्कसूत्राणि अनुबध्नन्तु, सहृदयसंपर्कं धारयन्तु।
            </span>
        </div>
    </div>
    <div class="quote"></div>
    <div class="image">
        <img class="imag" alt="temples">
    </div>

    <button id="toggle-button">🌙</button>

    <script src="index.js"></script>
</body>
</html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});