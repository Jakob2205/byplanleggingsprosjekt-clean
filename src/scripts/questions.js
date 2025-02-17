export let themeScores = {};

export const themes = [
    { id: "tema1", title: "Boligbebyggelse" },
    { id: "tema2", title: "Kulturminner" },
];

export const questions = [
    {
        id: "q1",
        theme: "tema1",
        text: "Er planområdet tilstrekkelig dekket av nødvendige servicetilbud?",
    },
    {
        id: "q2",
        theme: "tema1",
        text: "Planens påvirkningsgrad på nødtjenester?",
    },
    {
        id: "q3",
        theme: "tema1",
        text: "Er planområdet tilstrekkelig dekket av nødvendige servicetilbud?",
    },
    {
        id: "q4",
        theme: "tema1",
        text: "Planens påvirkningsgrad på nødtjenester?",
    },
    {
        id: "q5",
        theme: "tema1",
        text: "Planens påvirkningsgrad på omkringliggende kulturminner og kulturmiljø?",
    },
    {
        id: "q6",
        theme: "tema2",
        text: "Påvirkning på nærliggende kulturarv?",
    },
    {
        id: "q7",
        theme: "tema2",
        text: "Påvirkning av kollektivtrafikk?",
    },
    {
        id: "q8",
        theme: "tema2",
        text: "Annen relevant påvirkning?",
    },

];

// Function to render questions dynamically
export function renderQuestions() {
    questions.forEach(question => {
        const themeSection = document.querySelector(`[data-tema-id="${question.theme}"] .content-section`);
        if (themeSection) {
            const questionGroup = document.createElement("div");
            questionGroup.classList.add("question-group");
            questionGroup.dataset.questionId = question.id;
            
            questionGroup.innerHTML = `
                <p>${question.text}</p>
                <div class="rating">
                    <span>Prioritet:</span>
                    <button class="priority-button" onclick="setPriorityButton(this)">Lav</button>
                    <button class="priority-button" onclick="setPriorityButton(this)">Normal</button>
                    <button class="priority-button" onclick="setPriorityButton(this)">Høy</button>
                    <button class="priority-button" onclick="setPriorityButton(this)">Ikke aktuelt</button>
                    <span>Verdi:</span>
                    <button class="value-button" onclick="toggleValueButton(this)">-5</button>
                    <button class="value-button" onclick="toggleValueButton(this)">-4</button>
                    <button class="value-button" onclick="toggleValueButton(this)">-3</button>
                    <button class="value-button" onclick="toggleValueButton(this)">-2</button>
                    <button class="value-button" onclick="toggleValueButton(this)">-1</button>
                    <button class="value-button" onclick="toggleValueButton(this)">0</button>
                    <button class="value-button" onclick="toggleValueButton(this)">1</button>
                    <button class="value-button" onclick="toggleValueButton(this)">2</button>
                    <button class="value-button" onclick="toggleValueButton(this)">3</button>
                    <button class="value-button" onclick="toggleValueButton(this)">4</button>
                    <button class="value-button" onclick="toggleValueButton(this)">5</button>
                </div>
                <textarea placeholder="Begrunnelse:"></textarea>
            `;

            themeSection.appendChild(questionGroup);
        }
    });
}

export let questionValues = {}; 

export const questionMultipliers = {
    q1: { lav: 1, normal: 1.3, høy: 1.8, ikkeAktuelt: 1 },
    q2: { lav: 1, normal: 1.2, høy: 1.7, ikkeAktuelt: 1 },
    q3: { lav: 1, normal: 1.4, høy: 1.9, ikkeAktuelt: 1 },
    q4: { lav: 1.2, normal: 1.7, høy: 2.1, ikkeAktuelt: 1 },
    q5: { lav: 1.2, normal: 1.7, høy: 2.1, ikkeAktuelt: 1 },
    q6: { lav: 1.2, normal: 1.7, høy: 2.1, ikkeAktuelt: 1 },
    q7: { lav: 1.2, normal: 1.7, høy: 2.1, ikkeAktuelt: 1 },
    q8: { lav: 1.2, normal: 1.7, høy: 2.1, ikkeAktuelt: 1 },
};