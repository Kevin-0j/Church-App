<template>
  <main class="login">
    <section class="forms">
      <form v-if="isRegistering" class="register" @submit.prevent="register">
        <h2>Register</h2>
        <input 
          type="email" 
          placeholder="Email address"
          v-model="register_form.email"
        />
        <input 
          type="password" 
          placeholder="Password" 
          v-model="register_form.password"
          @focus="onFocus"
          @blur="onBlur" />
        <input 
          type="password" 
          placeholder="Re-enter Password"
          v-model="register_form.confirmPassword"
          @focus="onFocus"
          @blur="onBlur" />
        <select v-model="register_form.role" required>
          <option disabled value="">Select your role</option>
          <option value="youth member">Youth Member</option>
          <option value="church member">Church Member</option>
          <option value="priest">Priest</option>
         
        </select>
        <input 
          type="submit" 
          value="Register" />
        <p>Already have an account? <a href="#" @click.prevent="toggleForm">Login</a></p>
      </form>

      <form v-else class="login" @submit.prevent="login">
        <h2>Login</h2>
        <input 
          type="email" 
          placeholder="Email address"
          v-model="login_form.email"
          @focus="onFocus"
          @blur="onBlur" />
        <input 
          type="password" 
          placeholder="Password" 
          v-model="login_form.password"
          @focus="onFocus"
          @blur="onBlur" />
        <input 
          type="submit" 
          value="Login" />
        <p>Don't have an account? <a href="#" @click.prevent="toggleForm">Register</a></p>
        <div class="forgot-password">
          <a href="#" @click.prevent="showResetPassword">Forgot Password?</a>
        </div>
        <div class="google-signup">
          <p>or sign up with</p>
          <button @click="signUpWithGoogle" class="google-button">
            <i class="fab fa-google"></i> Google
          </button>
        </div>
      </form>

      <div v-if="resetPasswordVisible" class="reset-password">
        <h2>Forgot Password</h2>
        <p>We will send a password reset link to your email address.</p>
        <input 
          type="email" 
          placeholder="Enter your email address"
          v-model="resetEmail"
          @focus="onFocus"
          @blur="onBlur" />
        <button @click="resetPassword" class="reset-button">Reset Password</button>
        <button @click="resetPasswordVisible = false" class="cancel-button">Cancel</button>
      </div>
    </section>
  </main>
</template>

<script>
import { ref } from 'vue';
import store from '../store';
import router from '../router';

export default {
  setup() {
    const isRegistering = ref(false);
    const login_form = ref({});
    const register_form = ref({});
    const resetEmail = ref('');
    const resetPasswordVisible = ref(false);

    const login = () => {
      store.dispatch('login', login_form.value)
        .then(() => {
          router.push('/home');
        })
        .catch((error) => {
          alert(error.message);
        });
    };

    const register = () => {
      if (register_form.value.password !== register_form.value.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      store.dispatch('register', {
        email: register_form.value.email,
        password: register_form.value.password,
        role: register_form.value.role
      })
      .then(() => {
        alert('Registration successful! Please check your email for verification.');
        isRegistering.value = false;
        router.push('/login'); // Redirect to login page after successful registration
      })
      .catch((error) => {
        alert(error.message);
      });
    };

    const onFocus = (event) => {
      event.target.style.borderColor = '#6C63FF';
      event.target.style.backgroundColor = '#F3F4F6';
    };

    const onBlur = (event) => {
      event.target.style.borderColor = '#D1D5DB';
      event.target.style.backgroundColor = '#FFFFFF';
    };

    const toggleForm = () => {
      isRegistering.value = !isRegistering.value;
    };

    const showResetPassword = () => {
      resetPasswordVisible.value = true;
    };

    const resetPassword = () => {
      store.dispatch('resetPassword', resetEmail.value)
        .then(() => {
          alert('Password reset email sent!');
        })
        .catch((error) => {
          alert(error.message);
        });
    };

    const signUpWithGoogle = () => {
      store.dispatch('signInWithGoogle')
        .then(() => {
          router.push('/home');
        })
        .catch((error) => {
          alert(error.message);
        });
    };

    return {
      isRegistering,
      login_form,
      register_form,
      resetEmail,
      resetPasswordVisible,
      login,
      register,
      onFocus,
      onBlur,
      toggleForm,
      showResetPassword,
      resetPassword,
      signUpWithGoogle,
    };
  }
};
</script>

<style scoped>
.forms {
  display: flex;
  min-height: 100vh;
}

form {
  flex: 1 1 0%;
  padding: 4rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease-in-out;
}

form:hover {
  transform: scale(1.05);
}

form.register {
  color: white;
  background-color: #333;
}

form.login {
  color: white;
  background-color: #333;
}

h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

input,
select {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.4s, background-color 0.4s;
}

input:not([type="submit"]),
select {
  opacity: 0.8;
}

input:focus:not([type="submit"]),
select {
  opacity: 1;
  border-color: yellow;
}

input::placeholder {
  color: grey;
}

form.register input:not([type="submit"]) {
  color: white;
  border-bottom: 2px solid white;
}

form.login input:not([type="submit"]) {
  color: white;
  border-bottom: 2px solid white;
}

form.login input[type="submit"] {
  background-color: yellow;
  color: #333;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s;
}

form.login input[type="submit"]:hover {
  background-color: #c0392b;
  color: white;
}

form.register input[type="submit"] {
  background-color: yellow;
  color: #333;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s, color 0.3s;
}

form.register input[type="submit"]:hover {
  background-color: #c0392b;
  color: white;
}

.forgot-password {
  margin-top: 1rem;
}

.forgot-password a {
  color: yellow;
  text-decoration: none;
  cursor: pointer;
}

.google-signup {
  margin-top: 2rem;
  text-align: center;
}

.google-signup p {
  margin-bottom: 1rem;
}

.google-button {
  background-color: #4285F4;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.google-button i {
  margin-right: 0.5rem;
}

.reset-password {
  background-color: white;
  border: 1px solid #ddd;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.reset-password input {
  margin-bottom: 1rem;
}

.reset-button {
  background-color: yellow;
  color: #333;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.cancel-button {
  background-color: #ddd;
  color: #333;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
