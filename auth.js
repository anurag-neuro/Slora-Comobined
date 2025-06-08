// === Import Supabase Client ===
import { supabase } from './supabase-config.js';

// === Handle Email/Password Login ===
export async function handleEmailLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Login failed: " + error.message);
  } else {
    alert("Login successful! Redirecting...");
    window.location.href = "main.html"; // Or wherever your main page is
  }
}

// === Handle Social Login (Google, GitHub, Facebook) ===
export async function loginWithProvider(provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    alert("OAuth failed: " + error.message);
    return;
  }

  const popup = window.open(data.url, "_blank", "width=500,height=600");

  // Watch for sign-in event
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      popup.close();
      alert("Social login successful! Redirecting...");
      window.location.href = "dashboard.html";
    }
  });
}

