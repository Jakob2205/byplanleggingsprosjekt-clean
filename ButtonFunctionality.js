// Object to store the selected values and multipliers for each question group
let questionValues = {};

function updateFinalValue() {
    let totalScore = 0;

    // Update each question's temascore and calculate the total score
    for (const questionId in questionValues) {
        const { value, multiplier, skipInFinal } = questionValues[questionId];
        const temascore = value * multiplier;

        // Update the individual temascore display for each question
        const questionElement = document.querySelector(`[data-question-id="${questionId}"]`);
        if (questionElement) {
            questionElement.querySelector('.temascore-value').innerText = temascore.toFixed(2);
        }

        // Add to the total calculated value if not skipped
        if (!skipInFinal) {
            totalScore += temascore;
        }
    }

    // Update the hidden input and display the total calculated result
    document.getElementById("hiddenInput").value = totalScore;
    document.getElementById("displayResult").innerText = totalScore.toFixed(2); // Display result with 2 decimal places
}

// Function to handle value button selection for a specific question group
function toggleValueButton(element) {
    const questionId = element.closest('.question-group').dataset.questionId;

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
            questionValues[questionId] = { value: selectedValue, multiplier: 1, skipInFinal: false };
        } else {
            questionValues[questionId].value = selectedValue;
        }
    }

    // Update the final calculated value
    updateFinalValue();
}

// Function to handle priority button selection for a specific question group
function setPriorityButton(element) {
    const questionId = element.closest('.question-group').dataset.questionId;

    // Check if the clicked button is already active
    if (element.classList.contains('active')) {
        // If active, deselect it and reset the multiplier to 1 and skipInFinal to false
        element.classList.remove('active');
        if (questionValues[questionId]) {
            questionValues[questionId].multiplier = 1;
            questionValues[questionId].skipInFinal = false;
        }
    } else {
        // Deselect all other priority buttons within the same question group
        const priorityButtons = element.parentNode.querySelectorAll('.priority-button');
        priorityButtons.forEach(button => button.classList.remove('active'));

        // Set the active state of the clicked button
        element.classList.add('active');

        // Determine the multiplier and skipInFinal flag based on the selected priority
        let multiplier;
        let skipInFinal = false;
        switch (element.textContent.trim().toLowerCase()) {
            case 'lav':
                multiplier = 1;
                break;
            case 'normal':
                multiplier = 1.3;
                break;
            case 'høy':
                multiplier = 1.8;
                break;
            case 'ikke aktuelt':
                multiplier = 1;
                skipInFinal = true;
                break;
            default:
                multiplier = 1;
                break;
        }

        // Store the multiplier and skipInFinal in the questionValues object
        if (!questionValues[questionId]) {
            questionValues[questionId] = { value: 0, multiplier: multiplier, skipInFinal: skipInFinal };
        } else {
            questionValues[questionId].multiplier = multiplier;
            questionValues[questionId].skipInFinal = skipInFinal;
        }
    }

    // Update the final calculated value
    updateFinalValue();
}
