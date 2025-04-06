const firebaseConfig = {
    apiKey: "AIzaSyDqvgm-ZvhCTtsdYkr9zeMS5rs3bLoh70",
    authDomain: "sinav-sitesi.firebaseapp.com",
    projectId: "sinav-sitesi",
    storageBucket: "sinav-sitesi.appspot.com",
    messagingSenderId: "890357777142",
    appId: "1:890357777142:web:9e777b09f750188fb5f169",
    measurementId: "G-Y8Q6X2XQ2R"
};


firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const questionsByClass = {
    "9": [
        { text: "soru 1", image: "sorular/9.sınıf/9.sınıf1.jpg", correct: "C" },
        { text: "soru 2", image: "sorular/9.sınıf/9.sınıf2.jpg", correct: "D"  },
        { text: "soru 3", image: "sorular/9.sınıf/9.sınıf3.jpg", correct: "D"  },
        { text: "soru 4", image: "sorular/9.sınıf/9.sınıf4.jpg", correct: "C"  },
        { text: "soru 5", image: "sorular/9.sınıf/9.sınıf5.jpg", correct: "E"  },
        { text: "soru 6", image: "sorular/9.sınıf/9.sınıf6.jpg", correct: "B"  },
        { text: "soru 7", image: "sorular/9.sınıf/9.sınıf7.jpg", correct: "D" },
        { text: "soru 8", image: "sorular/9.sınıf/9.sınıf8.jpg", correct: "D"  },
        { text: "soru 9", image: "sorular/9.sınıf/9.sınıf9.jpg", correct: "C"  },
        { text: "soru 10", image: "sorular/9.sınıf/9.sınıf10.jpg", correct: "B"  },
        
    ],
    "10": [
        { text: "soru 1", image: "sorular/10.sınıf/10.sınıf1.jpg", correct: "A"  },
        { text: "soru 2", image: "sorular/10.sınıf/10.sınıf2.jpg", correct: "C"  },
        { text: "soru 3", image: "sorular/10.sınıf/10.sınıf3.jpg", correct: "D"  },
        { text: "soru 4", image: "sorular/10.sınıf/10.sınıf4.jpg", correct: "B"  },
        { text: "soru 5", image: "sorular/10.sınıf/10.sınıf5.jpg", correct: "C"  },
        { text: "soru 6", image: "sorular/10.sınıf/10.sınıf6.jpg", correct: "C"  },
        { text: "soru 7", image: "sorular/10.sınıf/10.sınıf7.jpg", correct: "B"  },
        { text: "soru 8", image: "sorular/10.sınıf/10.sınıf8.jpg", correct: "E"  },
        { text: "soru 9", image: "sorular/10.sınıf/10.sınıf9.jpg", correct: "D"  },
        { text: "soru 10", image: "sorular/10.sınıf/10.sınıf10.jpg", correct: "B"  },
    ],
    "11": [
        { text: "soru 1", image: "sorular/11.sınıf/11.sınıf1.jpg", correct: "B"  },
        { text: "soru 2", image: "sorular/11.sınıf/11.sınıf2.jpg", correct: "D"  },
        { text: "soru 3", image: "sorular/11.sınıf/11.sınıf3.jpg", correct: "D"  },
        { text: "soru 4", image: "sorular/11.sınıf/11.sınıf4.jpg", correct: "A"  },
        { text: "soru 5", image: "sorular/11.sınıf/11.sınıf5.jpg", correct: "B"  },
        { text: "soru 6", image: "sorular/11.sınıf/11.sınıf6.jpg", correct: "A"  },
        { text: "soru 7", image: "sorular/11.sınıf/11.sınıf7.jpg", correct: "D"  },
        { text: "soru 8", image: "sorular/11.sınıf/11.sınıf8.jpg", correct: "D"  },
        { text: "soru 9", image: "sorular/11.sınıf/11.sınıf9.jpg", correct: "D"  },
        { text: "soru 10", image: "sorular/11.sınıf/11.sınıf10.jpg", correct: "E"  },
    ],
    "12": [
        { text: "soru 1", image: "sorular/12.sınıf/12.sınıf1.jpg", correct: "C"  },
        { text: "soru 2", image: "sorular/12.sınıf/12.sınıf2.jpg", correct: "E"  },
        { text: "soru 3", image: "sorular/12.sınıf/12.sınıf3.jpg", correct: "D"  },
        { text: "soru 4", image: "sorular/12.sınıf/12.sınıf4.jpg", correct: "D"  },
        { text: "soru 5", image: "sorular/12.sınıf/12.sınıf5.jpg", correct: "D"  },
        { text: "soru 6", image: "sorular/12.sınıf/12.sınıf6.jpg", correct: "A"  },
        { text: "soru 7", image: "sorular/12.sınıf/12.sınıf7.jpg", correct: "B"  },
        { text: "soru 8", image: "sorular/12.sınıf/12.sınıf8.jpg", correct: "E"  },
        { text: "soru 9", image: "sorular/12.sınıf/12.sınıf9.jpg", correct: "A"  },
        { text: "soru 10", image: "sorular/12.sınıf/12.sınıf10.jpg", correct: "B"  },
    ]
};

let currentQuestion = 0;
let timeRemaining;
let userAnswers = Array(10).fill(null);
let userName = localStorage.getItem("userName") || "Bilinmeyen Kullanıcı";
let userClass = localStorage.getItem("userClass") || "9";

function sinaviBaslat() {
    document.getElementById('kurallar-container').style.display = 'none';
    document.getElementById('sinav').style.display = 'block';
    const questions = getQuestionsForClass(userClass);
    loadQuestion(questions);
    startTimer(900);
}

function startTimer(duration) {
    timeRemaining = duration;
    const timerElement = document.getElementById('timer');

    const timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Süreniz doldu! Sınav sona erdi.");
            return;
        }

        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `Kalan Süre: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeRemaining--;
    }, 1000);
}

function getQuestionsForClass(userClass) {
    return questionsByClass[userClass] || [];
}

function loadQuestion(questions) {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestion];

    if (!question) {
        questionContainer.innerHTML = "<h2>Soru bulunamadı!</h2>";
        return;
    }

    questionContainer.innerHTML = `
        <div class="question">
            <h2>${question.text}</h2>
            <img src="${question.image}" alt="Soru Resmi" style="width: 100%; max-height: 300px;">
        </div>
        <div class="options">
            ${['A', 'B', 'C', 'D', 'E'].map(letter => `
                <button class="${userAnswers[currentQuestion] === letter ? 'active' : ''}" 
                onclick="selectAnswer('${letter}')">${letter}</button>
            `).join('')}
        </div>
    `;
}

function selectAnswer(letter) {
    userAnswers[currentQuestion] = userAnswers[currentQuestion] === letter ? null : letter;
    loadQuestion(getQuestionsForClass(userClass));
}

function nextQuestion() {
    const questions = getQuestionsForClass(userClass);

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(questions);
    } else {
        endQuiz(); 
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(getQuestionsForClass(userClass));
    }
}

function endQuiz() {
    let score = 0;
    let resultsHTML = "<h2>Sınav Sonuçları</h2><ul>";
    const questions = getQuestionsForClass(userClass);

    
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;

        if (isCorrect) {
            score++; 
        } else if (userAnswer !== null) {
            score--; 
        }

        resultsHTML += `
            <li>
                <strong>${question.text}</strong><br>
                Kullanıcı cevabı: ${userAnswer || "Boş"} <br>
                Doğru cevap: <span style="color: ${isCorrect ? 'green' : 'red'}">${question.correct}</span>
            </li>
        `;
    });

    resultsHTML += `</ul><h3>Toplam Puanınız: ${score}</h3>`;

    
    document.getElementById('sonuclar-container').innerHTML = resultsHTML;
    document.getElementById('sonuclar-container').style.display = 'block';

   
    firebase.database().ref(`kullanicilar/${userName}`).set({
        sinif: userClass,
        puan: score,
        zaman: new Date().toLocaleString(),
        cevaplar: userAnswers
    }).then(() => {
        console.log("Kullanıcı bilgileri kaydedildi.");
        
        siralamayiGetir();
    }).catch(error => {
        console.error("Firebase kaydedilirken bir hata oluştu:", error);
    });

    alert(`Sınav tamamlandı! Puanınız: ${score}`);
}

    
    document.getElementById('sonuclar-container').innerHTML = resultsHTML;
    document.getElementById('sonuclar-container').style.display = 'block';
    siralamayiGetir();
    
    firebase.database().ref(`kullanicilar/${userName}`).set({
        sinif: userClass,
        puan: score,
        zaman: new Date().toLocaleString(),
        cevaplar: userAnswers
    }).then(() => {
        console.log("Kullanıcı bilgileri kaydedildi.");
        
        siralamayiGetir();
    }).catch(error => {
        console.error("Firebase kaydedilirken bir hata oluştu:", error);
    });

    alert(`Sınav tamamlandı! Puanınız: ${score}`);


    resultsHTML += `</ul><h3>Toplam Puanınız: ${score}</h3>`;

    document.getElementById('siralama-container').innerHTML = resultsHTML;
    document.getElementById('siralama-container').style.display = 'block';

    firebase.database().ref(`kullanicilar/${userName}`).set({
        sinif: userClass,
        puan: score,
        zaman: new Date().toLocaleString(),
        cevaplar: userAnswers
    }).then(() => {
        console.log("Kullanıcı bilgileri kaydedildi.");
        siralamayiGetir(); 
    }).catch(error => {
        console.error("Firebase kaydedilirken bir hata oluştu:", error);
    });

    alert(`Sınav tamamlandı! Puanınız: ${score}`);

    resultsHTML += `</ul><h3>Toplam Puanınız: ${score}</h3>`;
    
   
    document.getElementById('siralama-container').innerHTML = resultsHTML;
    document.getElementById('siralama-container').style.display = 'block';

    
    firebase.database().ref(`kullanicilar/${userName}`).set({
        sinif: userClass,
        puan: score,
        zaman: new Date().toLocaleString(),
        cevaplar: userAnswers 
    }).then
    function siralamayiGetir() {
        firebase.database().ref("kullanicilar").orderByChild("puan").once("value", snapshot => {
            const data = snapshot.val();
            if (!data) {
                document.getElementById('siralama-container').innerHTML = "Henüz sıralama verisi yok.";
                document.getElementById('siralama-container').style.display = 'block';
                return;
            }
    
             
            const userClass = localStorage.getItem("userClass");
            const siralamaListesi = Object.entries(data)
                .filter(([key, value]) => value.sinif === userClass)    
                .sort(([, a], [, b]) => b.puan - a.puan)    
                .map(([key, value], index) => `${index + 1}. ${key} - ${value.puan} puan (${value.sinif}. sınıf)`)
                .join("<br>");
    
            
            document.getElementById('siralama-container').innerHTML = `
                <h2>${userClass}. Sınıf Sıralaması</h2>
                ${siralamaListesi}
            `;
            document.getElementById('siralama-container').style.display = 'block'; 
        }).catch(error => {
            console.error("Sıralama getirirken hata oluştu:", error);
            document.getElementById('siralama-container').innerHTML = "Sıralama verisi alınamadı.";
        });
    }