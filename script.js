let isPartyMode = false;

// Function to handle emoji display
function showEmoji(emoji, index) {
    const emojiElement = document.getElementById('emoji-' + index);
    emojiElement.innerHTML = emoji;
    emojiElement.style.display = "block";

    // Hide the emoji after 1.5 seconds
    setTimeout(() => {
        emojiElement.style.display = "none";
    }, 1500);
}

// Toggle party mode (rainbow effect)
function toggleParty() {
    isPartyMode = !isPartyMode;
    if (isPartyMode) {
        startRainbow();
    } else {
        stopRainbow();
    }
}

// Start rainbow effect
function startRainbow() {
    let i = 0;
    const colors = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#8b00ff"];
    document.body.style.transition = "background-color 0.5s";

    function changeColor() {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
    }

    setInterval(changeColor, 500);
}

// Stop rainbow effect
function stopRainbow() {
    document.body.style.backgroundColor = "#f0f0f0";
}

// Go to next set of boxes when a box is clicked
function goToNext(ruta) {
    const container = document.querySelector('.box-container');
    const backButton = document.getElementById('back-button');
    backButton.classList.remove('hidden');
    
    container.innerHTML = ''; // Clear current boxes

    if (ruta === 1) {
        container.innerHTML = `
            <div class="box" onclick="showEmoji('❤️', 1)">Jag är så lycklig med dig</div>
            <div class="box" onclick="showEmoji('🥰', 2)">Jag ser fram emot att spendera mitt liv tillsammans med dig</div>
        `;
        showEmoji('❤️', 1); // Show emoji immediately when clicked
    } else if (ruta === 2) {
        container.innerHTML = `
            <div class="box" onclick="showEmoji('🥰', 2)">Du får mig att känna mig älskad</div>
            <div class="box" onclick="showEmoji('❤️', 1)">Du är det finaste som hänt mig</div>
        `;
        showEmoji('🥰', 2);
    } else if (ruta === 3) {
        container.innerHTML = `
            <div class="box" onclick="showEmoji('👨‍👩‍👦', 3)">Tänk att ha en liten mini-dig som springer runt</div>
            <div class="box" onclick="showEmoji('👨‍👩‍👦', 4)">Nerf-gun krig varje dag? hallååå??</div>
        `;
        showEmoji('👨‍👩‍👦', 3);
    } else if (ruta === 4) {
        container.innerHTML = `
            <div class="box" onclick="showEmoji('😏', 4)">Komsi Komsi</div>
            <div class="box" onclick="showEmoji('😏', 3)">Jag längtar efter att bli knullad av dig</div>
        `;
        showEmoji('😏', 4);
    }
}

// Go back to start screen
function backToStart() {
    const container = document.querySelector('.box-container');
    const backButton = document.getElementById('back-button');
    backButton.classList.add('hidden');

    container.innerHTML = `
        <div class="box" onclick="goToNext(1)">Jag älskar dig</div>
        <div class="box" onclick="goToNext(2)">Du älskar mig</div>
        <div class="box" onclick="goToNext(3)">Ska vi skaffa barn?</div>
        <div class="box" onclick="goToNext(4)">Ska vi knulla?</div>
    `;
}

// Function to make the eyes follow the mouse
const eyeLeft = document.getElementById('eye-left');
const eyeRight = document.getElementById('eye-right');
const pupilLeft = document.createElement('div');
const pupilRight = document.createElement('div');

pupilLeft.classList.add('pupil');
pupilRight.classList.add('pupil');
eyeLeft.appendChild(pupilLeft);
eyeRight.appendChild(pupilRight);

document.addEventListener('mousemove', function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Move eyes
    const eyeLeftRect = eyeLeft.getBoundingClientRect();
    const eyeRightRect = eyeRight.getBoundingClientRect();

    const eyeLeftCenter = {
        x: eyeLeftRect.left + eyeLeftRect.width / 2,
        y: eyeLeftRect.top + eyeLeftRect.height / 2
    };

    const eyeRightCenter = {
        x: eyeRightRect.left + eyeRightRect.width / 2,
        y: eyeRightRect.top + eyeRightRect.height / 2
    };

    // Calculate angle and move pupils
    const angleLeft = Math.atan2(mouseY - eyeLeftCenter.y, mouseX - eyeLeftCenter.x);
    const angleRight = Math.atan2(mouseY - eyeRightCenter.y, mouseX - eyeRightCenter.x);

    const distance = 10; // How far the pupils can move
    pupilLeft.style.transform = `translate(-50%, -50%) translate(${Math.cos(angleLeft) * distance}px, ${Math.sin(angleLeft) * distance}px)`;
    pupilRight.style.transform = `translate(-50%, -50%) translate(${Math.cos(angleRight) * distance}px, ${Math.sin(angleRight) * distance}px)`;
});