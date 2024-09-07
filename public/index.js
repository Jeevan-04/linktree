document.addEventListener('DOMContentLoaded', () => {
    const playAgainButton = document.getElementById('play-again');

    // Tic-Tac-Toe Game
    const board = document.querySelector('.board');
    const statusMessage = document.getElementById('status-message');
    const squares = document.querySelectorAll('.square');
    
    let boardState = Array(9).fill(null);
    let currentPlayer = 'X'; // User is 'X', Jeevan (AI) is 'O'
    let gameActive = true; // Track if the game is active

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const [a, b, c] of winPatterns) {
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        return boardState.includes(null) ? null : 'Tie';
    }

    function makeMove(index, player) {
        if (boardState[index] === null) {
            boardState[index] = player;
            squares[index].classList.add(player.toLowerCase());
            squares[index].textContent = player;
        }
    }

    function handleSquareClick(event) {
        if (!gameActive) return; // Ignore clicks if the game is not active
        const index = event.target.dataset.index;
        if (!boardState[index] && currentPlayer === 'X') {
            makeMove(index, 'X');
            const winner = checkWinner();
            if (winner) {
                if (winner === 'Tie') {
                    statusMessage.textContent = "It's a tie!";
                } else {
                    statusMessage.textContent = `You won!!!`;
                }
                gameActive = false; // Disable further moves
                playAgainButton.style.display = 'inline'; // Show the play again button
                return;
            }
            currentPlayer = 'O';
            statusMessage.textContent = "Jeevan's turn...";
            setTimeout(computerMove, 500);
        }
    }

    function computerMove() {
        if (!gameActive) return; // Ignore computer move if the game is not active
        const availableMoves = boardState.map((value, index) => value === null ? index : null).filter(value => value !== null);
        if (availableMoves.length > 0) {
            const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            makeMove(move, 'O');
            const winner = checkWinner();
            if (winner) {
                if (winner === 'Tie') {
                    statusMessage.textContent = "It's a tie!";
                } else {
                    statusMessage.textContent = `Jeevan won!!!`;
                }
                gameActive = false; // Disable further moves
                playAgainButton.style.display = 'inline'; // Show the play again button
                return;
            }
            currentPlayer = 'X';
            statusMessage.textContent = "Your turn!";
        }
    }

    function resetGame() {
        boardState = Array(9).fill(null);
        currentPlayer = 'X';
        gameActive = true; // Reset game active status
        squares.forEach(square => {
            square.classList.remove('x', 'o');
            square.textContent = '';
        });
        statusMessage.textContent = "Your turn!";
        playAgainButton.style.display = 'none'; // Hide the play again button
    }

    squares.forEach(square => square.addEventListener('click', handleSquareClick));
    playAgainButton.addEventListener('click', resetGame);
});


document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-button');
    const body = document.body;
    const playAgainButton = document.getElementById('play-again');

    // Toggle between dark mode and light mode
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode);
        toggleButton.textContent = isDarkMode ? '🌕' : '🌙'; // Toggle icon

        // Image switching based on the mode
        const imageElement = document.querySelector('.imag'); // assuming .imag is the class for the image
        if (isDarkMode) {
            imageElement.src = './dark.png'; // Change to your dark mode image
        } else {
            imageElement.src = './image.png'; // Change to your light mode image
        }
    });

    // Retrieve and set the initial mode from localStorage
    const savedMode = localStorage.getItem('dark-mode') === 'true';
    if (savedMode) {
        body.classList.add('dark-mode');
        toggleButton.textContent = '🌕'; // Moon icon for dark mode
        document.querySelector('.imag').src = './dark.png'; // Set initial image for dark mode
    } else {
        document.querySelector('.imag').src = './image.png'; // Set initial image for light mode
    }
});

// Array of quotes, each quote includes the Sanskrit and translated versions.
const quotes = [
    {
        sanskrit: 'काकः कृष्णः पिकः कृष्णः को भेदः पिककाकयोः । वसन्तसमये प्राप्ते काकः काकः पिकः पिकः ॥',
        translation: 'The crow is black, and the cuckoo is black. What is the difference between the two? It is when spring arrives that the crow is identified as the crow, and the cuckoo, the cuckoo.'
    },
    {
        sanskrit: 'सज्जनस्य हृदयं नवनीतं यद्वदन्ति कवयस्तदलीकम् । अन्यदेहविलसत्परितापात् सज्जनो द्रवति, नो नवनीतम् ॥',
        translation: 'Poets say that the heart of a good man is like butter, but that is not correct. The heat residing in another body does not melt butter, but it does melt the good man.'
    },
    {
        sanskrit: 'स्वयं पञ्चमुखः पुत्रौ गजाननषडाननौ । दिगम्बरः कथं जीवेत् अन्नपूर्णा न चेद्गृहे ॥',
        translation: 'Five mouthed himself (Shiva), and sons: the elephant-mouthed (Ganesh) and the one with six mouths (Kartikeya). How would Shiva survive if Annapurna (Parvati) was not at home?'
    },
    {
        sanskrit: 'स्वयं महेशः शव्शुरो नगेशः सखा धनेशश्च सुतो गणेशः । तथापि भिक्षाटनमेव शम्भोः बलीयसी केवलमीश्वरेच्छा ॥',
        translation: 'Himself the great lord, his father-in-law the king of mountains, his friend the king of wealth, and his son the lord of the gaNas. Even then, roaming around begging for food is Shiva’s destiny; only God’s wish is powerful.'
    },
    {
        sanskrit: 'साहित्य संगीत कला विहीनः साक्षात् पशुः पुछ विषाण हीनः । तृणं न खादन्नपि जीवमानः तद् भागधेयं परमं पषूणाम् ॥',
        translation: 'The man without love for literature, music, or the arts is indeed an animal without a tail or horns. The fact that he survives even without eating grass is indeed a great piece of luck for other animals.'
    },
    {
        sanskrit: 'पि स्वर्णमयी लङ्का न मे लक्ष्मण रोचते । जननी जन्मभूमिश्च स्वर्गादपि गरीयसी ॥',
        translation: 'O LakShmana, even though Lanka is a golden land, it does not appeal to me. One\'s mother and motherland are greater than heaven itself.'
    },
    {
        sanskrit: 'परोपकाराय फलन्ति वृक्षाः परोपकाराय वहन्ति नद्यः । परोपकाराय दुहन्ति गावः परोपकारार्थमिदं शरीरम् ॥',
        translation: 'Trees give fruits to assist others. Rivers flow to help others. Cows produce milk to feed others. In the same way, our own human body should also be employed for the assistance of others.'
    },
    {
        sanskrit: 'अमन्त्रम् अक्षरं नास्ति नास्ति मूलमनौषदम् । अयोग्यः पुरुषो नास्ति योजकस्तत्र दुर्लभः ॥',
        translation: 'There is no letter in the alphabet that cannot be used in divine poems (mantra). There exists no root which cannot be used as a medicine. Likewise, there is no useless person. The scarcity is for the one who knows how to use them!'
    },
    {
        sanskrit: 'सम्पूर्णकुम्भो न करोति शब्दं अर्धो घटो घोषमुपैति नूनं  । विद्वान् कुलीनो न करोति गर्वं मूधास्तु जल्पन्ति गुणैर्विहीनाः ॥',
        translation: 'A full pot does not make any noise, however, a half-full pot makes noise. A learned respectable person is never vain, but foolish people bereft of good qualities babble incessantly.'
    },
    {
        sanskrit: 'गुणैरुत्तुंगतां याति नोत्तुंगेनासनेन वै । प्रासादशिखरस्थोऽपि काको न गरुडायते ॥',
        translation: 'One achieves greatness because of one&apos;s qualities, not because of a high position. Even  is placed at the top of the palace. a crow does not become an eagle'
    },
    {
        sanskrit: 'नात्यन्तं सरलैर्भाव्यं गत्वा पश्य वनस्थलीम् । छिद्यन्ते सरलास्तत्र कुब्जास्तिष्ठन्ति पादपाः ॥',
        translation: 'Do not be very upright in your dealings, as you would see in forest, the straight trees are cut down while the crooked ones are left standing.'
    },
    {
        sanskrit: 'कामधेनुगुना विद्या ह्यकाले फलदायिनी। प्रवासे मातृसदृशी विद्या गुप्तं धनं स्मृतम्॥',
        translation: 'Learning is like a cow of desire. It, like her, yields in all seasons. Like a mother, it feeds you on your journey, therefore learning is a hidden treasure.'
    },
    {
        sanskrit: 'यथा चतुर्भिः कनकं परीक्ष्यते निघर्षणच्छेदनतापताडनैः। तथा चतुर्भिः पुरुषः परीक्ष्यते त्यागेन शीलेन गुणेन कर्मणा॥',
        translation: 'As gold is tested in four ways by rubbing, cutting, heating and beating – so a man should be tested by these four things: his renunciation, his conduct, his qualities, and his actions.'
    },
    {
        sanskrit: 'दारिद्र्यनाशनं दानं शीलं दुर्गतिनाशनम्। अज्ञाननाशिनी प्रज्ञा भावना भयनाशिनी॥',
        translation: 'Charity puts end to poverty; righteous conduct to misery; discretion to ignorance; and scrutiny to fear.'
    },
    {
        sanskrit: 'सर्वं परवशं दुःखं सर्वमात्मवशं सुखम्। एतद् विद्यात् समासेन लक्षणं सुखदुःखयोः॥',
        translation: 'Everything that is in other’s control is painful. All that is in self-control is happiness. This is the definition of happiness and pain in short.​'
    },
];

// Function to display a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteContainer = document.querySelector('.quote');
    quoteContainer.innerHTML = `
        <p class="sanskrit-text"><strong>${randomQuote.sanskrit}</strong></p>
        <p class="translation-text">${randomQuote.translation}</p>
    `;

    adjustFontSize(quoteContainer);
}

// Function to adjust the font size of the entire container
function adjustFontSize(container) {
    let sanskritFontSize = 28; // Starting font size for Sanskrit
    let englishFontSize = 16; // Starting font size for translation

    const sanskritText = container.querySelector('.sanskrit-text');
    const translationText = container.querySelector('.translation-text');

    sanskritText.style.fontSize = `${sanskritFontSize}px`;
    translationText.style.fontSize = `${englishFontSize}px`;

    // Decrease font sizes if the content overflows the container
    while (container.scrollHeight > container.clientHeight && sanskritFontSize > 20 && englishFontSize > 12) {
        sanskritFontSize -= 1;
        englishFontSize -= 1;
        sanskritText.style.fontSize = `${sanskritFontSize}px`;
        translationText.style.fontSize = `${englishFontSize}px`;
    }
}

// Call the function to display a random quote when the page loads
window.onload = displayRandomQuote;