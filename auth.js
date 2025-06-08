// auth.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = 'https://mukctnzjzeiszdexknyf.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY'; // Replace with your actual anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let isLogin = true;

export async function handleAuth() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fullName = document.getElementById("full-name")?.value;

  if (!email || !password || (!isLogin && !fullName)) {
    return alert("Please fill all required fields.");
  }

  if (isLogin) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return alert("Login failed: " + error.message);
    alert("Login successful!");
    window.location.href = "main.html";
  } else {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return alert("Signup failed: " + error.message);

    const userId = data.user?.id;
    if (userId) {
      await supabase.from("profiles").insert([{ id: userId, full_name: fullName }]);
    }

    alert("Signup successful! Check your email for verification.");
  }
}

export function toggleMode() {
  isLogin = !isLogin;
  document.getElementById("form-title").textContent = isLogin
    ? "Login to Your Account"
    : "Create Your Account";

  const fullNameField = document.getElementById("full-name");
  if (!isLogin && !fullNameField) {
    const input = document.createElement("input");
    input.id = "full-name";
    input.placeholder = "Your Full Name";
    input.type = "text";
    input.style.marginTop = "10px";
    document.querySelector(".container").insertBefore(input, document.querySelector(".auth-btn"));
  } else if (isLogin && fullNameField) {
    fullNameField.remove();
  }

  document.querySelector(".toggle-link").textContent = isLogin
    ? "Don't have an account? Sign up"
    : "Already have an account? Login";
}
