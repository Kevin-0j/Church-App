import { createStore } from 'vuex';
import router from '../router';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          alert('Please verify your email address before logging in.');
          await signOut(auth);
          return;
        }
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        const userData = userDoc.data();
        if (!userData.admin) {
          router.push('/'); // Change to the root path
        } else {
          router.push('/admin'); // Redirect to admin dashboard
        }
        commit('SET_USER', userCredential.user);
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('User not found');
            break;
          case 'auth/wrong-password':
            alert('Wrong password');
            break;
          default:
            alert('Something went wrong');
        }
      }
    },
    async register({ commit }, details) {
      const { email, password } = details;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(auth.currentUser);
        await setDoc(doc(db, 'users', userCredential.user.uid), { email: userCredential.user.email, admin: false });
        alert('Registration successful. Please check your email for verification.');
        await signOut(auth);
        router.push('/login');
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('Email already in use');
            break;
          case 'auth/invalid-email':
            alert('Invalid email');
            break;
          case 'auth/operation-not-allowed':
            alert('Operation not allowed');
            break;
          case 'auth/weak-password':
            alert('Weak password');
            break;
          default:
            alert('Something went wrong');
        }
      }
    },
    async logout({ commit }) {
      await signOut(auth);
      commit('CLEAR_USER');
      router.push('/login');
    },
    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit('CLEAR_USER');
        } else if (!user.emailVerified) {
          await signOut(auth);
          commit('CLEAR_USER');
          alert('Please verify your email address before logging in.');
        } else {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          if (!userData.admin) {
            router.push('/'); // Change to the root path
          } else {
            router.push('/admin'); // Redirect to admin dashboard
          }
          commit('SET_USER', user);
        }
      });
    },
    async signInWithGoogle({ commit }) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        if (!result.user.emailVerified) {
          alert('Please verify your email address before logging in.');
          await signOut(auth);
          return;
        }
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
        const userData = userDoc.data();
        if (!userData.admin) {
          router.push('/'); // Change to the root path
        } else {
          router.push('/admin'); // Redirect to admin dashboard
        }
        commit('SET_USER', result.user);
      } catch (error) {
        console.error('Google sign-in error:', error);
        alert('Google sign-in failed');
      }
    },
    async resetPassword({ commit }, email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset email sent. Please check your inbox.');
      } catch (error) {
        console.error('Reset password error:', error);
        alert(error.message);
      }
    },
  },
});
