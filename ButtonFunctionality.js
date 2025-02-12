import { questionValues, themeScores, questionMultipliers } from './questions.js';

// **Update Theme Scores**
export function updateThemeScores() {
    console.log("Triggered: updateThemeScores()");

    Object.keys(themeScores).forEach(themeId => {
        themeScores[themeId] = { score: 0, answeredQuestions: 0 };
    });

    let totalQuestionsAnswered = 0;
    let totalSumOfScores = 0;

    document.querySelectorAll(".tema").forEach(theme => {
        const themeId = theme.dataset.temaId;
        if (!themeScores[themeId]) {
            themeScores[themeId] = { score: 0, answeredQuestions: 0 };
        }
    });

    for (const questionId in questionValues) {
        const { value, multiplier, skipInFinal, themeId } = questionValues[questionId];

        if (skipInFinal) continue;

        const questionScore = value * multiplier;
        themeScores[themeId].score += questionScore;

        if (value !== 0) {  // Count only active questions
            themeScores[themeId].answeredQuestions += 1;
            totalQuestionsAnswered += 1;
        }

        totalSumOfScores += questionScore;
    }

    console.log("Theme Scores:", themeScores);
    console.log("Total Sum of Scores:", totalSumOfScores);
    console.log("Total Questions Answered:", totalQuestionsAnswered);

    // Update each theme's score display
    for (const themeId in themeScores) {
        const themeElement = document.querySelector(`[data-tema-id="${themeId}"]`);
        console.log(`Updating theme: ${themeId}`, themeElement);

        if (themeElement) {
            const scoreElement = themeElement.querySelector('.tema-score-value');
            const { score, answeredQuestions } = themeScores[themeId];

            console.log(`Score for ${themeId}:`, score, "Answered Questions:", answeredQuestions);

            if (answeredQuestions >= 3) {
                const normalizedScore = (score / answeredQuestions).toFixed(2);
                scoreElement.innerText = normalizedScore;
                scoreElement.style.color = parseFloat(normalizedScore) < 0 ? 'red' : 'green';

                console.log(`Updated Temascore for ${themeId}:`, normalizedScore);
            } else {
                scoreElement.innerText = ""; // Hide score if less than 3 answers
                console.log(`Temascore hidden for ${themeId} (less than 3 answered questions)`);
            }
        } else {
            console.error(`Theme element not found for ID: ${themeId}`);
        }
    }

    updateFinalValue(totalQuestionsAnswered, totalSumOfScores);
    updateQuestionCounter();
}

// **Update Final Score**
export function updateFinalValue(totalQuestionsAnswered, totalSumOfScores) {
    const displayResult = document.getElementById("displayResult");
    const footerDisplayResult = document.getElementById("footerDisplayResult");

    console.log("Updating Final Score...");
    console.log("Total Questions Answered for Final Score:", totalQuestionsAnswered);

    if (totalQuestionsAnswered >= 3) {
        const finalScore = (totalSumOfScores / totalQuestionsAnswered).toFixed(2);

        if (displayResult) {
            displayResult.innerText = finalScore;
            displayResult.style.color = parseFloat(finalScore) < 0 ? 'red' : 'green';

            console.log("Display Result Updated:", displayResult.innerText, "Color:", displayResult.style.color);
        }

        if (footerDisplayResult) {
            footerDisplayResult.innerText = finalScore;
            footerDisplayResult.style.color = parseFloat(finalScore) < 0 ? 'red' : 'green';

            console.log("Footer Display Result Updated:", footerDisplayResult.innerText, "Color:", footerDisplayResult.style.color);
        }
    } else {
        if (displayResult) displayResult.innerText = ""; // Hide total score if less than 3 answered questions
        if (footerDisplayResult) footerDisplayResult.innerText = "";

        console.log("Total score hidden (less than 3 answered questions)");
    }
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
