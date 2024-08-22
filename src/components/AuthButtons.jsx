import { createSignal } from "solid-js";
import { auth } from "./firebaseConfig";
import "../index.css"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import axios from "axios";

function AuthButtons() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [user, setUser] = createSignal(null);

  const handleEmailSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email(),
        password()
      );
      const user = userCredential.user;
      console.log("Email Sign-In User:", user);
      setUser(user);
      await saveUserToMongoDB(user);
    } catch (error) {
      console.error("Email sign-in error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In User:", user);
      setUser(user);
      await saveUserToMongoDB(user);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Facebook Sign-In User:", user);
      setUser(user);
      await saveUserToMongoDB(user);
    } catch (error) {
      console.error("Facebook sign-in error:", error);
    }
  };

  const saveUserToMongoDB = async (user) => {
    try {
      console.log("Saving user to MongoDB:", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        providerId: user.providerData[0].providerId,
      });

      const response = await axios.post("http://localhost:8000/saveUser", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        providerId: user.providerData[0].providerId,
      });
      console.log("MongoDB Save Response:", response);
    } catch (error) {
      console.error("Error saving user to MongoDB:", error);
    }
  };

  return (
    <div class="auth-container">
      <div class="auth-box">
        <h2>Sign in to your account</h2>
        <form>
          <div class="input-group">
            <label for="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            class="btn btn-primary"
            onClick={handleEmailSignIn}
          >
            Sign in
          </button>
        </form>

        <div class="social-divider">
          <span class="social-divider-text">Or continue with</span>
        </div>

        <div class="social-buttons">
          <button class="btn btn-social" onClick={handleGoogleSignIn}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Google
          </button>
          <button class="btn btn-social" onClick={handleFacebookSignIn}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthButtons;
