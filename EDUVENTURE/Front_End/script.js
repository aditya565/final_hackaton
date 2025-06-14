// Wait for the page to load
document.addEventListener("DOMContentLoaded", function () {
  // Fetch a quiz question from the backend
  fetch('/api/quiz')
    .then(response => response.json())
    .then(data => {
      const questionElement = document.getElementById('question');
      const optionButtons = document.querySelectorAll('.option-button');
      const submitButton = document.querySelector('.submit-btn');

      // Set the question text
      questionElement.textContent = data.question;

      // Set options text
      optionButtons.forEach((btn, index) => {
        btn.textContent = data.options[index];
        btn.classList.remove('correct', 'incorrect', 'selected');
        btn.disabled = false;

        // Option click event
        btn.addEventListener('click', () => {
          // Remove selection from all
          optionButtons.forEach(b => b.classList.remove('selected'));
          // Mark this one as selected
          btn.classList.add('selected');
        });
      });

      // Submit button logic
      submitButton.addEventListener('click', () => {
        const selected = document.querySelector('.option-button.selected');

        if (!selected) {
          alert("Please select an option!");
          return;
        }

        const selectedIndex = Array.from(optionButtons).indexOf(selected);
        const isCorrect = selectedIndex === data.correctIndex;

        if (isCorrect) {
          selected.classList.add('correct');
          alert("✅ Correct Answer!");
        } else {
          selected.classList.add('incorrect');
          optionButtons[data.correctIndex].classList.add('correct');
          alert("❌ Wrong Answer!");
        }

        // Disable buttons after submitting
        optionButtons.forEach(btn => btn.disabled = true);
        submitButton.disabled = true;
      });
    })
    .catch(error => {
      console.error('Error fetching quiz:', error);
      document.getElementById('question').textContent = "Failed to load question.";
    });
});