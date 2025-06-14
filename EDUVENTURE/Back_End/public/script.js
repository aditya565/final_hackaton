// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", function () {
  const questionElement = document.getElementById('question');
  const optionButtons = document.querySelectorAll('.option-button');
  const submitButton = document.querySelector('.submit-btn');
  const loader = document.getElementById('loader');
  const quizBox = document.getElementById('quiz-box');

  // Helper: clear old states
  function resetOptions() {
    optionButtons.forEach((btn) => {
      btn.classList.remove('correct', 'incorrect', 'selected');
      btn.disabled = false;
    });
    submitButton.disabled = false;
  }

  // Load quiz data from backend
  function loadQuiz() {
    loader.style.display = 'block';
    quizBox.style.display = 'none';

    fetch('/api/quiz')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        loader.style.display = 'none';
        quizBox.style.display = 'block';

        resetOptions();
        questionElement.textContent = data.question;

        // Populate options
        optionButtons.forEach((btn, index) => {
          btn.textContent = data.options[index] || `Option ${index + 1}`;

          // Remove old listeners to prevent stacking
          btn.replaceWith(btn.cloneNode(true));
        });

        // Re-select buttons after cloning
        const freshButtons = document.querySelectorAll('.option-button');

        freshButtons.forEach((btn, index) => {
          btn.addEventListener('click', () => {
            freshButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
          });
        });

        // Set submit listener
        submitButton.onclick = () => {
          const selected = document.querySelector('.option-button.selected');

          if (!selected) {
            alert("⚠ Please select an option!");
            return;
          }

          const selectedIndex = Array.from(freshButtons).indexOf(selected);
          const isCorrect = selectedIndex === data.correctIndex;

          if (isCorrect) {
            selected.classList.add('correct');
            alert("✅ Correct Answer!");
          } else {
            selected.classList.add('incorrect');
            freshButtons[data.correctIndex].classList.add('correct');
            alert("❌ Wrong Answer!");
          }

          freshButtons.forEach(b => b.disabled = true);
          submitButton.disabled = true;
        };
      })
      .catch(error => {
        console.error('Error fetching quiz:', error);
        loader.textContent = "❌ Failed to load quiz. Please refresh.";
      });
  }

  // Initial call
  loadQuiz();
});