const promptInput = document.getElementById('promptInput');
const generateBtn = document.getElementById('generateBtn');
const errorMessage = document.getElementById('errorMessage');
const outputBox = document.getElementById('outputBox');

generateBtn.addEventListener('click', async () => {
  const prompt = promptInput.value.trim();

  // Validate empty input
  if (!prompt) {
    errorMessage.textContent = 'Please enter a prompt before clicking generate!';
    errorMessage.classList.remove('hidden');
    return;
  }

  // Clear error and set loading state
  errorMessage.classList.add('hidden');
  outputBox.textContent = 'Generating response...';
  generateBtn.disabled = true;

  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (response.ok) {
      outputBox.textContent = data.result;
    } else {
      errorMessage.textContent = data.error || 'Something went wrong.';
      errorMessage.classList.remove('hidden');
      outputBox.textContent = 'Your generated text will appear here...';
    }
  } catch (error) {
    errorMessage.textContent = 'Network error. Please try again later.';
    errorMessage.classList.remove('hidden');
    outputBox.textContent = 'Your generated text will appear here...';
  } finally {
    generateBtn.disabled = false;
  }
});