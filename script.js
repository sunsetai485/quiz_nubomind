// Quiz Data
const quizQuestions = [
    {
        question: "Olá! Sou o Nubo, assistente de negócios da Nubomind. Para começarmos, como posso te chamar e qual o nome da sua empresa?",
        options: [],
        correct: -1, // Não há resposta correta, é coleta de informação
        type: "text_input",
        placeholder: "Ex: João Silva da Empresa ABC Ltda"
    },
    {
        question: "Ótimo! Para facilitar nosso contato e, se você topar, até te mostrar um pedacinho do que fazemos, qual o seu melhor número de telefone para contato?",
        options: [],
        correct: -1,
        type: "text_input",
        placeholder: "Ex: (11) 99999-9999"
    },
    {
        question: "Em qual setor ou nicho sua empresa atua?",
        options: [
            "Marketing Digital / Infoprodutos",
            "Saúde / Clínicas (Médicas, Odontológicas, Estéticas)",
            "Finanças / Corretoras / Cassinos (iGaming)",
            "Outros (Imobiliário, Advocacia, Varejo, Indústria, etc.)"
        ],
        correct: -1
    },
    {
        question: "No dia a dia da sua empresa, qual processo você sente que mais \"drena\" o tempo da sua equipe ou que poderia ser muito mais eficiente?",
        options: [
            "Aquisição e qualificação de novos clientes (leads frios)",
            "Atendimento e suporte ao cliente (perguntas repetitivas, tempo de espera)",
            "Organização interna e gestão de projetos (CRM, planilhas, várias ferramentas)",
            "Recuperação de vendas e reengajamento de clientes antigos"
        ],
        correct: -1
    },
    {
        question: "Você já utilizou alguma ferramenta de automação, chatbot ou inteligência artificial no seu negócio hoje?",
        options: [
            "Sim, e tive uma boa experiência!",
            "Sim, mas não atendeu minhas expectativas.",
            "Não, mas tenho curiosidade em experimentar.",
            "Não, e ainda não vejo muita necessidade."
        ],
        correct: -1
    },
    {
        question: "Se você pudesse resolver esse desafio, o que isso representaria em ganhos para sua empresa?",
        options: [
            "Uma grande economia de tempo e recursos",
            "Aumento significativo nas vendas e faturamento",
            "Maior organização e eficiência nos processos",
            "Todas as opções acima e ainda mais!"
        ],
        correct: -1
    },
    {
        question: "Para eu ter uma ideia do porte do projeto e te direcionar à solução mais adequada, em qual faixa de faturamento mensal sua empresa se encontra atualmente?",
        options: [
            "Até R$ 50 mil",
            "Entre R$ 50 mil e R$ 100 mil",
            "Acima de R$ 100 mil",
            "Prefiro não informar agora, podemos prosseguir?"
        ],
        correct: -1
    },
    {
        question: "Pensando em soluções que podem transformar esses processos, qual valor você teria disponível para investir mensalmente em um serviço personalizado de tecnologia e inovação?",
        options: [
            "Menos de R$ 2.000",
            "Entre R$ 2.000 e R$ 4.000",
            "R$ 4.000 ou mais",
            "Não tenho um valor definido ainda, mas busco retorno."
        ],
        correct: -1
    },
    {
        question: "Além da automatização de processos e atendimento, qual outro tipo de solução tecnológica sua empresa mais busca para otimizar o dia a dia?",
        options: [
            "Um CRM personalizado para gestão de clientes",
            "Dashboards visuais para acompanhar métricas em tempo real",
            "Um software ou ferramenta sob medida para centralizar tarefas",
            "Outro (especificar no WhatsApp)"
        ],
        correct: -1
    },
    {
        question: "Com base no que conversamos até agora, você consegue imaginar como uma solução como a da Nubomind poderia se encaixar e impulsionar o crescimento do seu negócio?",
        options: [
            "Sim, vejo um grande potencial!",
            "Sim, mas tenho algumas dúvidas pontuais.",
            "Talvez, preciso entender melhor.",
            "Não tenho certeza ainda."
        ],
        correct: -1
    }
];

// Dialog Texts
const dialogTexts = {
    welcome: "BEM-VINDO A NUBOMIND\n\nVou fazer algumas perguntas rápidas para entender melhor suas necessidades e como podemos ajudar sua empresa.\n\nVamos começar?",
    results: "QUALIFICAÇÃO CONCLUÍDA!\n\nPerfeito! Com base nas suas respostas, preparamos uma análise personalizada para sua empresa:"
};

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];
let timeLeft = 30;
let timer = null;
let quizStarted = false;
let startTime = null;
let questionTimes = [];
let currentScreen = 'welcome';

// Load saved data
let highScore = localStorage.getItem('neoTokyoHighScore') || 0;
let gamesPlayed = localStorage.getItem('neoTokyoGamesPlayed') || 0;
let leaderboard = JSON.parse(localStorage.getItem('neoTokyoLeaderboard') || '[]');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateScoreDisplay();
    initializeAnimations();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing Effect Function
function typeWriter(element, text, speed = 50, callback = null) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    
    type();
}

// Dialog Management
function showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.dialog-screen').forEach(screen => {
        screen.style.display = 'none';
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenName + 'Screen');
    if (targetScreen) {
        targetScreen.style.display = 'flex';
        currentScreen = screenName;
    }
}

function showTypingText(elementId, text, speed = 50, showOptions = false, optionsId = null) {
    const element = document.getElementById(elementId);
    if (element) {
        typeWriter(element, text, speed, () => {
            if (showOptions && optionsId) {
                setTimeout(() => {
                    document.getElementById(optionsId).style.display = 'flex';
                }, 500);
            }
        });
    }
}

// Quiz Functions
function startQuiz() {
    document.getElementById('quizOverlay').style.display = 'flex';
    showWelcome();
}

function showWelcome() {
    showScreen('welcome');
    showTypingText('welcomeText', dialogTexts.welcome, 30, true, 'welcomeOptions');
}



function beginQuiz() {
    quizStarted = true;
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = [];
    questionTimes = [];
    startTime = Date.now();
    
    // Update games played
    gamesPlayed++;
    localStorage.setItem('neoTokyoGamesPlayed', gamesPlayed);
    updateScoreDisplay();
    
    showScreen('quiz');
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const questionText = document.getElementById('questionText');
    const questionOptions = document.getElementById('questionOptions');
    const progressFill = document.getElementById('progressFill');
    
    // Clear the question options area first (this will clear any existing input fields)
    questionOptions.innerHTML = '';
    
    // Update progress bar
    progressFill.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;
    
    // Type question text
    typeWriter(questionText, question.question, 30, () => {
        // Load options after question is typed
        loadOptions(question.options);
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').textContent = 
        currentQuestionIndex === quizQuestions.length - 1 ? 'FINALIZAR' : 'PRÓXIMA ➡️';
}

function loadOptions(options) {
    const questionOptions = document.getElementById('questionOptions');
    questionOptions.innerHTML = '';
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Check if this is a text input question
    if (currentQuestion.type === 'text_input') {
        // Create text input field
        const inputContainer = document.createElement('div');
        inputContainer.className = 'text-input-container';
        
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.className = 'text-input-field';
        inputField.placeholder = currentQuestion.placeholder || 'Digite sua resposta aqui...';
        
        // Set previous value if exists, otherwise clear the field
        if (selectedAnswers[currentQuestionIndex] !== undefined) {
            inputField.value = selectedAnswers[currentQuestionIndex];
        } else {
            inputField.value = ''; // Clear the field if no previous answer
        }
        
        inputContainer.appendChild(inputField);
        questionOptions.appendChild(inputContainer);
        
        // Auto-save on blur (when user leaves the field)
        inputField.addEventListener('blur', () => {
            const value = inputField.value.trim();
            if (value) {
                selectedAnswers[currentQuestionIndex] = value;
                inputField.style.borderColor = '#00ff00';
                inputField.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5)';
            }
        });
        
        // Auto-save on Enter key
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const value = inputField.value.trim();
                if (value) {
                    selectedAnswers[currentQuestionIndex] = value;
                    inputField.style.borderColor = '#00ff00';
                    inputField.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5)';
                    inputField.blur(); // Remove focus
                }
            }
        });
        
    } else {
        // Regular multiple choice options
        options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.textContent = option;
            optionBtn.onclick = () => selectAnswer(index);
            
            // Check if this option was previously selected
            if (selectedAnswers[currentQuestionIndex] === index) {
                optionBtn.classList.add('selected');
            }
            
            questionOptions.appendChild(optionBtn);
        });
    }
}

function selectAnswer(optionIndex) {
    // Remove previous selection
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Select new answer
    document.querySelectorAll('.option-btn')[optionIndex].classList.add('selected');
    selectedAnswers[currentQuestionIndex] = optionIndex;
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function startTimer() {
    timeLeft = 30;
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (currentQuestionIndex < quizQuestions.length - 1) {
                nextQuestion();
            } else {
                finishQuiz();
            }
        }
    }, 1000);
}

function resetTimer() {
    if (timer) {
        clearInterval(timer);
    }
    startTimer();
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeLeft;
    
    // Change color based on time left
    if (timeLeft <= 10) {
        timerElement.style.color = '#ff0000';
        timerElement.style.textShadow = '0 0 10px #ff0000';
    } else if (timeLeft <= 20) {
        timerElement.style.color = '#ffff00';
        timerElement.style.textShadow = '0 0 10px #ffff00';
    } else {
        timerElement.style.color = '#00ffff';
        timerElement.style.textShadow = '0 0 10px #00ffff';
    }
}

function finishQuiz() {
    // Calculate completion stats
    const totalTime = Date.now() - startTime;
    const avgTime = Math.round(totalTime / quizQuestions.length / 1000);
    const answeredQuestions = selectedAnswers.filter(answer => answer !== undefined && answer !== null).length;
    
    // Generate lead score based on engagement and answers
    let leadScore = 0;
    selectedAnswers.forEach((answer, index) => {
        if (answer !== undefined && answer !== null) {
            leadScore += 10; // Base points for answering
            // Bonus points for certain answers that indicate higher interest
            if (index === 4 && answer === 0) leadScore += 20; // Good experience with automation
            if (index === 5 && answer === 3) leadScore += 30; // All benefits mentioned
            if (index === 7 && answer === 2) leadScore += 25; // Higher investment capacity
            if (index === 9 && answer === 0) leadScore += 25; // Sees great potential
        }
    });
    
    // Update high score
    if (leadScore > highScore) {
        highScore = leadScore;
        localStorage.setItem('neoTokyoHighScore', leadScore);
    }
    
    // Add to leaderboard
    const playerName = prompt('Digite seu nome para receber sua análise personalizada:') || 'Lead Anônimo';
    const leaderboardEntry = {
        name: playerName,
        score: leadScore,
        date: new Date().toLocaleDateString('pt-BR'),
        answeredQuestions: answeredQuestions,
        totalQuestions: quizQuestions.length,
        avgTime: avgTime
    };
    
    leaderboard.push(leaderboardEntry);
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10); // Keep only top 10
    
    localStorage.setItem('neoTokyoLeaderboard', JSON.stringify(leaderboard));
    
    // Show results
    showResults(leadScore, answeredQuestions, quizQuestions.length, avgTime);
    
    // Update display
    updateScoreDisplay();
    loadLeaderboard();
}

function showResults(finalScore, answeredQuestions, totalQuestions, avgTime) {
    showScreen('results');
    
    // Type results text
    showTypingText('resultsText', dialogTexts.results, 30, true, 'resultsOptions');
    
    // Generate personalized analysis based on answers
    let analysis = "ANÁLISE PERSONALIZADA:\n\n";
    
    if (selectedAnswers[2] !== undefined) { // Setor
        const sectors = ["Marketing Digital", "Saúde", "Finanças", "Outros"];
        analysis += `📊 Setor: ${sectors[selectedAnswers[2]]}\n`;
    }
    
    if (selectedAnswers[3] !== undefined) { // Dor principal
        const pains = ["Aquisição de leads", "Atendimento", "Organização", "Recuperação"];
        analysis += `🎯 Dor Principal: ${pains[selectedAnswers[3]]}\n`;
    }
    
    if (selectedAnswers[6] !== undefined) { // Faturamento
        const revenue = ["Até R$ 50k", "R$ 50k-100k", "Acima R$ 100k", "Não informado"];
        analysis += `💰 Faturamento: ${revenue[selectedAnswers[6]]}\n`;
    }
    
    if (selectedAnswers[7] !== undefined) { // Investimento
        const investment = ["Até R$ 2k", "R$ 2k-4k", "Acima R$ 4k", "Flexível"];
        analysis += `💡 Investimento: ${investment[selectedAnswers[7]]}\n`;
    }
    
    analysis += `\n🎯 Score de Qualificação: ${finalScore}/100\n`;
    analysis += `📝 Perguntas Respondidas: ${answeredQuestions}/${totalQuestions}\n`;
    
    // Update results details
    document.getElementById('finalScore').textContent = finalScore;
    document.getElementById('correctAnswers').textContent = `${answeredQuestions}/${totalQuestions}`;
    document.getElementById('accuracy').textContent = `${Math.round((answeredQuestions / totalQuestions) * 100)}%`;
    
    // Show results details after text is typed
    setTimeout(() => {
        document.getElementById('resultsDetails').style.display = 'flex';
        // Add personalized analysis
        const analysisElement = document.createElement('div');
        analysisElement.className = 'result-item';
        analysisElement.innerHTML = `
            <div class="result-label">Análise:</div>
            <div class="result-value">${analysis.replace(/\n/g, '<br>')}</div>
        `;
        document.getElementById('resultsDetails').appendChild(analysisElement);
    }, 3000);
    
    // Animate score
    animateScore(finalScore);
}

function animateScore(targetScore) {
    const scoreElement = document.getElementById('finalScore');
    let currentScore = 0;
    const increment = targetScore / 50;
    
    const animation = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(animation);
        }
        scoreElement.textContent = Math.floor(currentScore);
    }, 50);
}

function restartQuiz() {
    showScreen('quiz');
    beginQuiz();
}

function closeQuiz() {
    document.getElementById('quizOverlay').style.display = 'none';
    if (timer) {
        clearInterval(timer);
    }
}



function updateScoreDisplay() {
    document.getElementById('highScore').textContent = highScore;
    document.getElementById('gamesPlayed').textContent = gamesPlayed;
}

// Initialize animations and effects
function initializeAnimations() {
    // Show loading screen with welcome message
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingText = document.getElementById('loadingText');
    
    if (loadingScreen && loadingText) {
        // Type the welcome message
        typeWriter(loadingText, "Bem-vindo a Nubomind!", 100, () => {
            // After typing is complete, wait 2 seconds then start quiz
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                startQuiz();
            }, 2000);
        });
    }
}

// Global functions for HTML onclick
window.startQuiz = startQuiz;
window.previousQuestion = previousQuestion;
window.nextQuestion = nextQuestion;
window.restartQuiz = restartQuiz;
window.closeQuiz = closeQuiz;
window.beginQuiz = beginQuiz;
window.showWelcome = showWelcome; 