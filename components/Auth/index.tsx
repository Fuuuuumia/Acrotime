"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./index.module.css";

export default function AuthForm() {
  const supabase = createClient();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // ← 確認用
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ サインイン処理
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/calendar";
    }
  };

  // ✅ サインアップ処理
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // パスワード確認チェック
    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      alert("確認メールを送信しました。メールを確認してください。");
      setMode("signin"); // 登録後はサインイン画面へ戻す
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className={styles.container}>
      {/* タブ切替 */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${mode === "signin" ? styles.active : ""}`}
          onClick={() => setMode("signin")}
        >
          サインイン
        </button>
        <button
          className={`${styles.tab} ${mode === "signup" ? styles.active : ""}`}
          onClick={() => setMode("signup")}
        >
          サインアップ
        </button>
      </div>

      <h2 className={styles.title}>{mode === "signin" ? "ログイン" : "新規登録"}</h2>

      <form
        onSubmit={mode === "signin" ? handleSignIn : handleSignUp}
        className={styles.form}
      >
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />

        {mode === "signup" && (
          <input
            type="password"
            placeholder="パスワード（確認）"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
        )}

        <button type="submit" disabled={loading} className={styles.button}>
          {loading
            ? "処理中..."
            : mode === "signin"
            ? "ログイン"
            : "新規登録"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
