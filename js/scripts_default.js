async function fetchQuestions(mainIndex) {
    const response = await fetch(`http://localhost:3001/questions/${mainIndex}`);
    const data = await response.json();
    console.log(`Fetched data for mainIndex ${mainIndex}:`, data);
    return data;
}

async function populateSubAccordions(mainIndex, subCount) {
    const questions = await fetchQuestions(mainIndex);
    for (let i = 1; i <= subCount; i++) {
        const question = questions[i - 1] ? questions[i - 1].question : `Question #${mainIndex}.${i}`;
        const guidelines = questions[i - 1] ? questions[i - 1].guidelines : `Guidelines for question #${mainIndex}.${i}`;
        document.querySelector(`#collapse${mainIndex}_${i} .subaccordion-section.question`).innerHTML = `<strong>Question:</strong> ${question}`;
        document.querySelector(`#collapse${mainIndex}_${i} .subaccordion-section.guidelines`).innerHTML = `<strong>Guidelines:</strong> ${guidelines}`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const elements = [
        { mainIndex: 1, subCount: 13 },
        { mainIndex: 2, subCount: 15 },
        { mainIndex: 3, subCount: 13 },
        { mainIndex: 4, subCount: 14 },
        { mainIndex: 5, subCount: 9 },
        { mainIndex: 6, subCount: 6 },
        { mainIndex: 7, subCount: 7 },
        { mainIndex: 8, subCount: 9 },
        { mainIndex: 9, subCount: 13 },
        { mainIndex: 10, subCount: 8 }
    ];

    elements.forEach(element => {
        populateSubAccordions(element.mainIndex, element.subCount);
    });
});