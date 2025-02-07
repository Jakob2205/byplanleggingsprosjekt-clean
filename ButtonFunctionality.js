import { questionValues, themeScores, questionMultipliers } from './questions.js';

// **Update Theme Scores**
export function updateThemeScores() {
    Object.keys(themeScores).forEach(themeId => {
        themeScores[themeId] = { score: 0, answeredQuestions: 0 };
    });

    let totalQuestionsAnswered = 0;
    let totalSumOfScores = 0;

    console.clear();
    console.log("Updating Theme Scores...");

    // **Ensure all themes are initialized**
    document.querySelectorAll(".tema").forEach(theme => {
        const themeId = theme.dataset.temaId;
        if (!themeScores[themeId]) {
            themeScores[themeId] = { score: 0, answeredQuestions: 0 };
        }
    });

    // **Process all answered questions**
    for (const questionId in questionValues) {
        const { value, multiplier, skipInFinal, themeId } = questionValues[questionId];

        if (skipInFinal) continue; // Now allowing value === 0

        const questionScore = value * multiplier;
        themeScores[themeId].score += questionScore;
        totalSumOfScores += questionScore;

        themeScores[themeId].answeredQuestions += 1; // Count even if value is 0
        totalQuestionsAnswered += 1;
    }

    // **Update the UI for each theme's score**
    for (const themeId in themeScores) {
        const themeElement = document.querySelector(`[data-tema-id="${themeId}"]`);
        if (themeElement) {
            const scoreElement = themeElement.querySelector('.tema-score-value');
            const { score, answeredQuestions } = themeScores[themeId];

            if (answeredQuestions >= 3) {
                const normalizedScore = (score / answeredQuestions).toFixed(2);
                scoreElement.innerText = normalizedScore;
                scoreElement.style.color = parseFloat(normalizedScore) < 0 ? 'red' : 'green';
            } else {
                scoreElement.innerText = "0.00";
                scoreElement.style.color = 'black';
            }
        }
    }

    console.log("Theme Scores Updated:", themeScores);
    console.log("Total Questions Answered (including 0 values):", totalQuestionsAnswered);

    updateFinalValue(totalQuestionsAnswered, totalSumOfScores);
    updateQuestionCounter();
}

// **Update Final Score**
export function updateFinalValue(totalQuestionsAnswered, totalSumOfScores) {
    const displayResult = document.getElementById("displayResult");

    console.log("Updating Final Score...");
    console.log("Total Questions Answered for Final Score:", totalQuestionsAnswered);

    let finalScore = "0.00";
    if (totalQuestionsAnswered >= 3) {
        finalScore = (totalSumOfScores / totalQuestionsAnswered).toFixed(2);
    }

    displayResult.innerText = finalScore;
    displayResult.style.color = parseFloat(finalScore) < 0 ? 'red' : 'green';
}

// **Update Active Question Counter**
export function updateQuestionCounter() {
    const counterDisplay = document.getElementById("questionCounter");
    if (counterDisplay) {
        let totalAnswered = Object.values(themeScores).reduce((sum, theme) => sum + theme.answeredQuestions, 0);
        counterDisplay.innerText = `Active Questions: ${totalAnswered}`;
    }
}

// **Toggle Value Button**
export function toggleValueButton(element) {
    const questionId = element.closest('.question-group').dataset.questionId;
    const themeId = element.closest('.tema').dataset.temaId;

    console.log(`Toggling value button for questionId: ${questionId}, themeId: ${themeId}`);

    if (!questionValues[questionId]) {
        questionValues[questionId] = { value: 0, multiplier: 1, skipInFinal: false, themeId: themeId };
    }

    if (element.classList.contains('active')) {
        element.classList.remove('active');
        questionValues[questionId].value = 0; // Ensure 0 is set
    } else {
        const valueButtons = element.parentNode.querySelectorAll('.value-button');
        valueButtons.forEach(button => button.classList.remove('active'));

        element.classList.add('active');
        questionValues[questionId].value = parseInt(element.textContent);
    }

    updateThemeScores();
    updateQuestionCounter();
    saveQuestionValues();
}

// **Toggles Priority Selection**
export function setPriorityButton(element) {
    const questionId = element.closest('.question-group').dataset.questionId;
    const themeId = element.closest('.tema').dataset.temaId;

    console.log(`Setting priority button for questionId: ${questionId}, themeId: ${themeId}`);

    if (element.classList.contains('active')) {
        element.classList.remove('active');

        if (questionValues[questionId]) {
            questionValues[questionId].multiplier = 1;
            questionValues[questionId].skipInFinal = false;
        }
    } else {
        const priorityButtons = element.parentNode.querySelectorAll('.priority-button');
        priorityButtons.forEach(button => button.classList.remove('active'));

        element.classList.add('active');

        const selectedPriority = element.textContent.trim().toLowerCase();
        const multipliers = questionMultipliers[questionId];
        let multiplier = multipliers ? multipliers[selectedPriority] : 1;
        const skipInFinal = selectedPriority === 'ikke aktuelt';

        if (!questionValues[questionId]) {
            questionValues[questionId] = { value: 0, multiplier, skipInFinal, themeId };
        } else {
            questionValues[questionId].multiplier = multiplier;
            questionValues[questionId].skipInFinal = skipInFinal;
        }
    }

    updateThemeScores();
    saveQuestionValues();
}

// **Toggle Collapse Button**
export function toggleCollapse(button) {
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

// **Save Values to Firestore**
export function saveQuestionValues() {
    const user = auth.currentUser;
    if (user) {
        const userDoc = doc(db, "users", user.uid);
        setDoc(userDoc, { questionValues }, { merge: true })
            .then(() => console.log("Question values saved successfully."))
            .catch((error) => console.error("Error saving question values:", error));
    }
}

// **Ensure Functions Are Globally Accessible**
window.toggleValueButton = toggleValueButton;
window.setPriorityButton = setPriorityButton;
window.updateThemeScores = updateThemeScores;
window.updateFinalValue = updateFinalValue;
window.updateQuestionCounter = updateQuestionCounter;
window.toggleCollapse = toggleCollapse;
window.saveQuestionValues = saveQuestionValues;
