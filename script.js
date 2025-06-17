class PasswordGenerator {
  constructor() {
    this.uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    this.numericChars = "0123456789";
    this.symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    this.initializeElements();
    this.attachEventListeners();
    this.generatePassword();
  }

  initializeElements() {
    this.passwordOutput = document.getElementById("passwordOutput");
    this.copyBtn = document.getElementById("copyBtn");
    this.uppercaseCheck = document.getElementById("uppercase");
    this.lowercaseCheck = document.getElementById("lowercase");
    this.numericCheck = document.getElementById("numeric");
    this.symbolsCheck = document.getElementById("symbols");
    this.lengthInput = document.getElementById("lengthInput");
    this.lengthSlider = document.getElementById("lengthSlider");
    this.generateBtn = document.getElementById("generateBtn");
  }

  attachEventListeners() {
    this.copyBtn.addEventListener("click", () => this.copyPassword());
    this.generateBtn.addEventListener("click", () => this.generatePassword());

    // Sync slider and input
    this.lengthSlider.addEventListener("input", () => {
      this.lengthInput.value = this.lengthSlider.value;
    });

    this.lengthInput.addEventListener("input", () => {
      this.lengthSlider.value = this.lengthInput.value;
    });

    // Auto-generate on option change
    [
      this.uppercaseCheck,
      this.lowercaseCheck,
      this.numericCheck,
      this.symbolsCheck,
    ].forEach((checkbox) => {
      checkbox.addEventListener("change", () => this.generatePassword());
    });

    this.lengthSlider.addEventListener("input", () => this.generatePassword());
    this.lengthInput.addEventListener("input", () => this.generatePassword());
  }

  generatePassword() {
    let charset = "";

    if (this.uppercaseCheck.checked) charset += this.uppercaseChars;
    if (this.lowercaseCheck.checked) charset += this.lowercaseChars;
    if (this.numericCheck.checked) charset += this.numericChars;
    if (this.symbolsCheck.checked) charset += this.symbolChars;

    if (charset === "") {
      this.passwordOutput.value = "Please select at least one option";
      return;
    }

    const length = parseInt(this.lengthInput.value);
    let password = "";

    // Ensure at least one character from each selected type
    if (this.uppercaseCheck.checked) {
      password += this.getRandomChar(this.uppercaseChars);
    }
    if (this.lowercaseCheck.checked) {
      password += this.getRandomChar(this.lowercaseChars);
    }
    if (this.numericCheck.checked) {
      password += this.getRandomChar(this.numericChars);
    }
    if (this.symbolsCheck.checked) {
      password += this.getRandomChar(this.symbolChars);
    }

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      password += this.getRandomChar(charset);
    }

    // Shuffle the password
    password = this.shuffleString(password);

    this.passwordOutput.value = password;
  }

  getRandomChar(charset) {
    return charset.charAt(Math.floor(Math.random() * charset.length));
  }

  shuffleString(str) {
    return str
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  async copyPassword() {
    try {
      await navigator.clipboard.writeText(this.passwordOutput.value);
      this.copyBtn.textContent = "✓";
      setTimeout(() => {
        this.copyBtn.textContent = "📋";
      }, 1000);
    } catch (err) {
      // Fallback for older browsers
      this.passwordOutput.select();
      document.execCommand("copy");
      this.copyBtn.textContent = "✓";
      setTimeout(() => {
        this.copyBtn.textContent = "📋";
      }, 1000);
    }
  }
}

// Initialize the password generator when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new PasswordGenerator();
});
