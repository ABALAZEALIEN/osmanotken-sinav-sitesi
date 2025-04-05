const questionsByClass = {
    "9": [
        { text: "Bu 9. sınıfın ilk sorusu", image: "images/9.sınıfsoru1.jpg" }
    ],
    "11": [
        { text: "Bu 11. sınıfın ilk sorusu", image: "images/11.sınıfsoru1.jpg" }
    ]
};
let currentQuestion = 0; // Mevcut soruyu takip eder
let timeRemaining; // Zamanlayıcı için global değişken

function getQuestionsForClass(userClass) {
    return questionsByClass[userClass] || [];
}

function loadQuestion(questions) {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestion];

    questionContainer.innerHTML = `
        <div>
            <h2>${question.text}</h2>
            <img src="${question.image}" alt="Soru Resmi" style="width: 100%; max-height: 300px;">
        </div>
    `;
}

function startTimer(duration) {
    timeRemaining = duration;
    const timerElement = document.getElementById('timer');

    const timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        timerElement.textContent = `Kalan Süre: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Süreniz doldu!");
        }

        timeRemaining--;
    }, 1000);
}

function kaydetVeYönlendir() {
    const username = document.getElementById("username").value.trim();
    const userClass = document.getElementById("class").value;

    if (!username || !userClass) {
        alert("Lütfen tüm bilgileri doldurun.");
        return;
    }

    localStorage.setItem("userName", username);
    localStorage.setItem("userClass", userClass);

    window.location.href = 'sinav.html'; // Sınav sayfasına yönlendir
}

function sinaviBaslat() {
    const userClass = localStorage.getItem("userClass") || "9";
    const questions = getQuestionsForClass(userClass);

    document.getElementById('kurallar-container').style.display = 'none';
    document.getElementById('sinav').style.display = 'block';

    startTimer(900); // 15 dakika
    loadQuestion(questions); // İlk soruyu yükle
}