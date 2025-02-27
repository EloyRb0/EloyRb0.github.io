document.addEventListener('DOMContentLoaded', async function() {
    const apiUrl = "https://opentdb.com/api.php?amount=10";
    const respuesta = await fetch(apiUrl);
    const rJSON = await respuesta.json();
    const trivia = document.getElementById("Respuestas");

    rJSON.results.forEach((item, index) => {
        const questionText = document.createTextNode(`${item.question}: `);
        const answerText = document.createTextNode(`${item.correct_answer}. `);
        
        trivia.appendChild(questionText);
        trivia.appendChild(document.createElement("br"));
        trivia.appendChild(answerText);
        trivia.appendChild(document.createElement("br"));
        trivia.appendChild(document.createElement("br"));
    });
});