import { createStore } from 'vuex';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithPopup, GoogleAuthProvider, updateProfile, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import router from '../router';
import { auth, googleProvider, db } from '../firebase';

export default createStore({
  state: {
    user: null,
    userRole: null // New state to store user role
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
      state.userRole = null; // Clear user role on logout
    },
    SET_USER_ROLE(state, role) {
      state.userRole = role;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        commit('SET_USER', user);
        const userRole = await fetchUserRole(user.uid); // Fetch user role after login
        commit('SET_USER_ROLE', userRole);
      } catch (error) {
        throw error;
      }
    },
    async register({ commit }, { email, password, role }) {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, { displayName: role });
        await setDoc(doc(db, 'users', user.uid), {
          email,
          role
        });
        await sendEmailVerification(user);
        commit('SET_USER', user);
        commit('SET_USER_ROLE', role); // Set user role after registration
      } catch (error) {
        throw error;
      }
    },
    async logout({ commit }) {
      await signOut(auth);
      commit('CLEAR_USER');
      router.push('/login');
    },
    async resetPassword(_, email) {
      try {
        await sendPasswordResetEmail(auth, email);
      } catch (error) {
        throw error;
      }
    },
    async signInWithGoogle({ commit }) {
      const provider = new GoogleAuthProvider();
      try {
        const { user } = await signInWithPopup(auth, provider);
        commit('SET_USER', user);
        const userRole = await fetchUserRole(user.uid); // Fetch user role after Google sign-in
        commit('SET_USER_ROLE', userRole);
      } catch (error) {
        throw error;
      }
    }
  },
  getters: {
    userRole: state => state.userRole
  }
});

async function fetchUserRole(userId) {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (userDoc.exists()) {
    return userDoc.data().role;
  }
  return null; // Handle if user role is not found
}
