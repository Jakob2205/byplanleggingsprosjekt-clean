// Objects to store the selected values and multipliers for each question group and theme
let questionValues = {}; // Stores data for each question
let themeScores = {}; // Stores calculated scores for each theme

// Define multipliers for each question
const questionMultipliers = {
    q1: { lav: 1, normal: 1.3, høy: 1.8, ikkeAktuelt: 1 },
    q2: { lav: 1, normal: 1.2, høy: 1.7, ikkeAktuelt: 1 },
    q3: { lav: 1, normal: 1.4, høy: 1.9, ikkeAktuelt: 1 },
    // Add more questions as needed
};

function updateThemeScores() {
    themeScores = {}; // Reset theme scores

    // Calculate the score for each theme based on its subquestions
    for (const questionId in questionValues) {
        const { value, multiplier, skipInFinal, themeId } = questionValues[questionId];
        const questionScore = value * multiplier;

        // Add the question score to its respective theme's total score
        if (!themeScores[themeId]) {
            themeScores[themeId] = 0;
        }

        // Only add question score if it's not skipped
        if (!skipInFinal) {
            themeScores[themeId] += questionScore;
        }
    }

    // Update the displayed theme scores
    for (const themeId in themeScores) {
        const themeElement = document.querySelector(`[data-tema-id="${themeId}"]`);
        if (themeElement) {
            themeElement.querySelector('.tema-score-value').innerText = themeScores[themeId].toFixed(2);
        }
    }

    // Update the final calculated value
    updateFinalValue();
}

function updateFinalValue() {
    // Sum all theme scores for the final value
    const totalScore = Object.values(themeScores).reduce((sum, score) => sum + score, 0);

    // Update the hidden input and display the final score
    const hiddenInput = document.getElementById("hiddenInput");
    const displayResult = document.getElementById("displayResult");

    if (hiddenInput) hiddenInput.value = totalScore;
    if (displayResult) displayResult.innerText = totalScore.toFixed(2); // Display result with 2 decimal places
}

function toggleValueButton(element) {
    const questionId = element.closest('.question-group').dataset.questionId;
    const themeId = element.closest('.tema').dataset.temaId;

    // Check if the clicked button is already active
    if (element.classList.contains('active')) {
        // If active, deselect it and reset the value to 0
        element.classList.remove('active');
        if (questionValues[questionId]) {
            questionValues[questionId].value = 0;
        }
    } else {
        // Deselect all other value buttons within the same question group
        const valueButtons = element.parentNode.querySelectorAll('.value-button');
        valueButtons.forEach(button => button.classList.remove('active'));

        // Set the active state of the clicked button
        element.classList.add('active');

        // Parse the selected value and store it in the questionValues object
        const selectedValue = parseInt(element.textContent);
        if (!questionValues[questionId]) {
            questionValues[questionId] = { value: selectedValue, multiplier: 1, skipInFinal: false, themeId: themeId };
        } else {
            questionValues[questionId].value = selectedValue;
        }
    }

    // Update the theme scores
    updateThemeScores();
}

function setPriorityButton(element) {
    const questionId = element.closest('.question-group').dataset.questionId;
    const themeId = element.closest('.tema').dataset.temaId;

    // Deselect other buttons in the group
    const priorityButtons = element.parentNode.querySelectorAll('.priority-button');
    priorityButtons.forEach(button => button.classList.remove('active'));

    element.classList.add('active');

    const selectedPriority = element.textContent.trim().toLowerCase();
    const multipliers = questionMultipliers[questionId];
    let multiplier = multipliers ? multipliers[selectedPriority] : 1; // Default to 1 if undefined
    const skipInFinal = selectedPriority === 'ikke aktuelt';

    // Update the questionValues object
    if (!questionValues[questionId]) {
        questionValues[questionId] = { value: 0, multiplier, skipInFinal, themeId };
    } else {
        questionValues[questionId].multiplier = multiplier;
        questionValues[questionId].skipInFinal = skipInFinal;
    }

    updateThemeScores();
}

function toggleCollapse(button) {
    const themeSection = button.closest('.tema');
    const contentSection = themeSection.querySelector('.content-section');

    if (contentSection.style.display === 'none') {
        contentSection.style.display = 'block';
        button.textContent = '-';
    } else {
        contentSection.style.display = 'none';
        button.textContent = '+';
    }
}
