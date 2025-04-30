
document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const nav = document.querySelector("nav")
  
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", function () {
        nav.classList.toggle("active")
  
        // Toggle icon
        const icon = this.querySelector("i")
        if (icon.classList.contains("fa-bars")) {
          icon.classList.remove("fa-bars")
          icon.classList.add("fa-times")
        } else {
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
      })
    }
  
    // Parallax Effect
    window.addEventListener("scroll", () => {
      const parallaxBg = document.querySelector(".parallax-bg")
      if (parallaxBg) {
        const scrollPosition = window.pageYOffset
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`
      }
    })
  
    // Registration Form Validation
    const registerForm = document.getElementById("register-form")
  
    if (registerForm) {
      const fullnameInput = document.getElementById("fullname")
      const emailInput = document.getElementById("email")
      const passwordInput = document.getElementById("password")
      const confirmPasswordInput = document.getElementById("confirm-password")
      const termsCheckbox = document.getElementById("terms")
  
      const fullnameError = document.getElementById("fullname-error")
      const emailError = document.getElementById("email-error")
      const passwordError = document.getElementById("password-error")
      const confirmPasswordError = document.getElementById("confirm-password-error")
      const termsError = document.getElementById("terms-error")
  
      const strengthBar = document.querySelector(".strength-bar")
      const strengthText = document.querySelector(".strength-text")
  
      // Toggle Password Visibility
      const togglePassword = document.querySelector(".toggle-password")
      if (togglePassword) {
        togglePassword.addEventListener("click", function () {
          const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
          passwordInput.setAttribute("type", type)
  
          this.classList.toggle("fa-eye")
          this.classList.toggle("fa-eye-slash")
        })
      }
  
      // Password Strength Meter
      if (passwordInput) {
        passwordInput.addEventListener("input", function () {
          const password = this.value
          let strength = 0
          let message = ""
  
          if (password.length >= 8) strength += 1
          if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1
          if (password.match(/\d/)) strength += 1
          if (password.match(/[^a-zA-Z\d]/)) strength += 1
  
          switch (strength) {
            case 0:
              strengthBar.style.width = "0%"
              strengthBar.style.backgroundColor = "#e9ecef"
              message = "Password strength"
              break
            case 1:
              strengthBar.style.width = "25%"
              strengthBar.style.backgroundColor = "#ef476f" // danger color
              message = "Weak"
              break
            case 2:
              strengthBar.style.width = "50%"
              strengthBar.style.backgroundColor = "#ffbe0b" // warning color
              message = "Fair"
              break
            case 3:
              strengthBar.style.width = "75%"
              strengthBar.style.backgroundColor = "#3a86ff"
              message = "Good"
              break
            case 4:
              strengthBar.style.width = "100%"
              strengthBar.style.backgroundColor = "#06d6a0" // success color
              message = "Strong"
              break
          }
  
          strengthText.textContent = message
        })
      }
  
      // Form Validation
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let isValid = true
  
        // Reset errors
        fullnameError.textContent = ""
        emailError.textContent = ""
        passwordError.textContent = ""
        confirmPasswordError.textContent = ""
        termsError.textContent = ""
  
        // Validate Full Name
        if (fullnameInput.value.trim() === "") {
          fullnameError.textContent = "Full name is required"
          isValid = false
        } else if (fullnameInput.value.trim().length < 3) {
          fullnameError.textContent = "Full name must be at least 3 characters"
          isValid = false
        }
  
        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (emailInput.value.trim() === "") {
          emailError.textContent = "Email is required"
          isValid = false
        } else if (!emailRegex.test(emailInput.value.trim())) {
          emailError.textContent = "Please enter a valid email address"
          isValid = false
        }
  
        // Validate Password
        if (passwordInput.value === "") {
          passwordError.textContent = "Password is required"
          isValid = false
        } else if (passwordInput.value.length < 8) {
          passwordError.textContent = "Password must be at least 8 characters"
          isValid = false
        }
  
        // Validate Confirm Password
        if (confirmPasswordInput.value === "") {
          confirmPasswordError.textContent = "Please confirm your password"
          isValid = false
        } else if (confirmPasswordInput.value !== passwordInput.value) {
          confirmPasswordError.textContent = "Passwords do not match"
          isValid = false
        }
  
        // Validate Terms
        if (!termsCheckbox.checked) {
          termsError.textContent = "You must agree to the terms and conditions"
          isValid = false
        }
  
        if (isValid) {
          // Show loading state
          const submitBtn = document.querySelector(".submit-btn")
          const btnText = submitBtn.querySelector(".btn-text")
          const btnLoader = submitBtn.querySelector(".btn-loader")
  
          btnText.style.opacity = "0"
          btnLoader.style.transform = "translateY(0)"
  
          // Simulate form submission
          setTimeout(() => {
            // Hide loading state
            btnText.style.opacity = "1"
            btnLoader.style.transform = "translateY(100%)"
  
            // Show success modal
            const successModal = document.getElementById("success-modal")
            successModal.classList.add("show")
  
            // Reset form
            registerForm.reset()
            strengthBar.style.width = "0%"
            strengthText.textContent = "Password strength"
          }, 2000)
        }
      })
  
      // Continue button in success modal
      const continueBtn = document.getElementById("continue-btn")
      if (continueBtn) {
        continueBtn.addEventListener("click", () => {
          const successModal = document.getElementById("success-modal")
          successModal.classList.remove("show")
  
          // Redirect to homepage
          window.location.href = "index.html"
        })
      }
    }
  })
  