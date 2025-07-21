# Nubomind Quiz - Qualificação de Leads

Um quiz interativo para qualificação de leads empresariais, com estilo retrô dos anos 90 e visual cyberpunk/Neo Tokyo. **Design de uma dobra** com caixas de diálogo estilo jogos clássicos, desenvolvido para a Nubomind.

## 🚀 Características

- **Design Single Page**: Apenas uma dobra, tudo em uma tela
- **Caixas de Diálogo Anos 90**: Interface inspirada em jogos clássicos
- **Efeito de Digitação**: Texto aparece sendo digitado em tempo real
- **Quiz Interativo**: 10 perguntas estratégicas para qualificação de leads
- **Design Cyberpunk**: Estilo futurista com cores neon (ciano, magenta, amarelo)
- **Estilo Retrô/8-bit**: Elementos visuais inspirados nos anos 90
- **Sistema de Qualificação**: Score baseado no engajamento e respostas estratégicas
- **Sem Limite de Tempo**: Responda com calma, sem pressão
- **Ranking Global**: Sistema de leaderboard com top 10 jogadores
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações**: Efeitos visuais suaves e interativos
- **Persistência**: Dados salvos no localStorage do navegador

## 🎮 Como Funciona

1. **Carregamento Automático**: O quiz inicia automaticamente após 2 segundos
2. **Tela de Boas-vindas**: Leia as instruções e escolha uma opção
3. **Responder Perguntas**: Selecione uma das 4 opções para cada pergunta
4. **Sem Pressão**: Responda com calma, não há limite de tempo
5. **Navegar**: Use "Anterior" e "Próxima" para revisar respostas
6. **Finalizar**: Complete todas as perguntas para ver sua análise personalizada
7. **Resultados**: Receba uma análise personalizada baseada em suas respostas

## 🎯 Sistema de Qualificação

- **Resposta Base**: +10 pontos por pergunta respondida
- **Experiência com Automação**: +20 pontos para quem já usou IA/chatbots
- **Benefícios Múltiplos**: +30 pontos para quem vê todos os benefícios
- **Capacidade de Investimento**: +25 pontos para investimento acima de R$ 4k
- **Potencial Percebido**: +25 pontos para quem vê grande potencial
- **Score Máximo**: 100 pontos (engajamento máximo + respostas estratégicas)

## 🎨 Interface Retrô

### **Caixas de Diálogo Anos 90:**
- **Cabeçalho Azul**: Barra de título estilo Windows 95/98
- **Botões de Controle**: Minimizar, maximizar e fechar
- **Gradientes Cinza**: Fundo com gradientes clássicos
- **Bordas Pretas**: Contornos grossos e sombras
- **Fonte 8-bit**: Press Start 2P para autenticidade

### **Efeito de Digitação:**
- **Texto Progressivo**: Caracteres aparecem um por vez
- **Cursor Piscante**: Indicador de digitação animado
- **Velocidade Ajustável**: Diferentes velocidades para diferentes textos
- **Quebras de Linha**: Suporte a formatação de texto

### **Navegação por Telas:**
- **Tela de Boas-vindas**: Introdução e opções principais
- **Tela de Instruções**: Regras e dicas do jogo
- **Tela do Quiz**: Perguntas e respostas
- **Tela de Resultados**: Pontuação final e estatísticas
- **Tela de Ranking**: Top 10 jogadores

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com variáveis CSS e animações
- **JavaScript**: Lógica do quiz e sistema de digitação
- **Font Awesome**: Ícones
- **Google Fonts**: Orbitron, Rajdhani e Press Start 2P (fonte 8-bit)

## 📁 Estrutura do Projeto

```
página quiz/
├── index.html          # Página principal (single page)
├── styles.css          # Estilos CSS cyberpunk/retrô
├── script.js           # Lógica do quiz e sistema de digitação
└── README.md           # Documentação
```

## 🚀 Como Usar

1. **Clone ou baixe** os arquivos do projeto
2. **Abra** o arquivo `index.html` em seu navegador
3. **Aguarde** 2 segundos para o quiz iniciar automaticamente

### Para Desenvolvimento Local

```bash
# Se você tiver Python instalado
python -m http.server 8000

# Ou se tiver Node.js
npx serve .

# Depois acesse http://localhost:8000
```

## 🎯 Funcionalidades do Quiz

### Jogabilidade
- 10 perguntas variadas sobre tecnologia e cultura pop
- 4 opções de resposta por pergunta
- Timer de 30 segundos por pergunta
- Navegação entre perguntas
- Sistema de pontuação com bônus de velocidade

### Interface Retrô
- Caixas de diálogo estilo anos 90
- Efeito de digitação em tempo real
- Botões com sombras e gradientes clássicos
- Cores e tipografia autênticas
- Animações suaves e responsivas

### Persistência
- Pontuação máxima salva localmente
- Contador de jogos jogados
- Ranking dos melhores jogadores
- Dados persistem entre sessões

## 🎨 Personalização

### Cores
As cores principais estão definidas como variáveis CSS no arquivo `styles.css`:

```css
:root {
    --primary-color: #00ffff;    /* Ciano */
    --secondary-color: #ff00ff;  /* Magenta */
    --accent-color: #ffff00;     /* Amarelo */
    --dark-bg: #0a0a0a;          /* Fundo escuro */
    --darker-bg: #050505;        /* Fundo mais escuro */
}
```

### Perguntas
Para adicionar ou modificar perguntas, edite o array `quizQuestions` no arquivo `script.js`:

```javascript
const quizQuestions = [
    {
        question: "Sua pergunta aqui?",
        options: ["Opção A", "Opção B", "Opção C", "Opção D"],
        correct: 0, // Índice da resposta correta (0-3)
        category: "Categoria"
    }
];
```

### Textos de Diálogo
Para modificar os textos das caixas de diálogo, edite o objeto `dialogTexts`:

```javascript
const dialogTexts = {
    welcome: "Seu texto de boas-vindas aqui...",
    instructions: "Suas instruções aqui...",
    // ...
};
```

## 📱 Compatibilidade

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🎮 Perguntas de Qualificação

O quiz inclui perguntas estratégicas sobre:
- **Identificação**: Nome, empresa e contato
- **Setor de Atuação**: Marketing, Saúde, Finanças, Outros
- **Dores do Negócio**: Aquisição, atendimento, organização, recuperação
- **Experiência Tecnológica**: Uso de automação e IA
- **Benefícios Esperados**: Tempo, vendas, organização, todos
- **Capacidade Financeira**: Faturamento e investimento disponível
- **Necessidades Tecnológicas**: CRM, dashboards, software personalizado
- **Potencial de Parceria**: Interesse na solução Nubomind

## 🔧 Customização Avançada

### Adicionando Novas Perguntas
1. Adicione objetos ao array `quizQuestions` em `script.js`
2. Siga o formato: `question`, `options`, `correct`, `category`
3. O índice `correct` deve corresponder à posição da resposta correta (0-3)

### Modificando o Timer
- Altere a variável `timeLeft = 30` na função `startTimer()`
- Ajuste o bônus de velocidade na função `finishQuiz()`

### Personalizando o Ranking
- Modifique o número máximo de entradas: `leaderboard.slice(0, 10)`
- Adicione novos campos aos objetos do leaderboard

### Velocidade de Digitação
- Ajuste o parâmetro `speed` nas funções `typeWriter()` e `showTypingText()`
- Valores menores = digitação mais rápida

## 📄 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

## 🤝 Contribuição

Sinta-se à vontade para:
- Adicionar novas perguntas
- Melhorar o design retrô
- Reportar bugs
- Sugerir melhorias
- Fazer pull requests

## 🎉 Recursos Especiais

- **Fonte 8-bit**: Press Start 2P para elementos retrô
- **Animações Pixel**: Personagem pixelado animado
- **Caixas de Diálogo**: Interface autêntica dos anos 90
- **Efeito de Digitação**: Texto aparece sendo digitado
- **Gradientes Neon**: Cores vibrantes e efeitos glow
- **Responsividade**: Adaptação perfeita para mobile
- **Single Page**: Tudo em uma tela, sem scroll

---

**Nubomind Quiz** - Qualificação inteligente para transformar seu negócio 🚀💼 