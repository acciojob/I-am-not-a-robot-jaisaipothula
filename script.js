const imageContainer = document.getElementById('image-container');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');
let selectedImages = [];
let identicalImage = null;

// List of image URLs (replace these with your actual image URLs)
const imageUrls = [
    'https://via.placeholder.com/100?text=1',
    'https://via.placeholder.com/100?text=2',
    'https://via.placeholder.com/100?text=3',
    'https://via.placeholder.com/100?text=4',
    'https://via.placeholder.com/100?text=5'
];

// Function to initialize the game
function initGame() {
    imageContainer.innerHTML = '';
    selectedImages = [];
    
    // Choose a random image to duplicate
    identicalImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];

    // Add a duplicate image
    const duplicateIndex = Math.floor(Math.random() * 5);
    const images = [...imageUrls];
    images.splice(duplicateIndex, 0, identicalImage); // Insert duplicate

    // Shuffle images
    const shuffledImages = images.sort(() => Math.random() - 0.5);

    // Render images
    shuffledImages.forEach((url, index) => {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add(`img${index + 1}`);
        img.onclick = () => handleImageClick(url);
        imageContainer.appendChild(img);
    });

    // Reset button visibility
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.textContent = '';
}

// Handle image click
function handleImageClick(url) {
    if (selectedImages.length < 2 && !selectedImages.includes(url)) {
        selectedImages.push(url);
        resetButton.style.display = 'block';

        // Check if two images are clicked
        if (selectedImages.length === 2) {
            verifyButton.style.display = 'block';
            selectedImages.forEach(img => {
                document.querySelector(`img[src='${img}']`).style.borderColor = 'blue';
            });
        }
    }
}

// Handle verify action
verifyButton.onclick = () => {
    if (selectedImages[0] === selectedImages[1]) {
        para.textContent = 'You are a human. Congratulations!';
    } else {
        para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyButton.style.display = 'none';
};

// Handle reset action
resetButton.onclick = () => {
    initGame();
};

// Initialize the game on page load
window.onload = initGame;
