"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Auth from "@/components/Auth";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const [user, setUser] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // 初回ユーザー情報の取得
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user?.email ?? null);
    });

    // サインイン/サインアウトの変化を監視
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user?.email ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* ヘッダー */}
      <Header 
        user={user} 
        onSignOut={() => supabase.auth.signOut()} 
      />

      {/* メイン部分 */}
      <main
        style={{
          marginTop: "80px", // ヘッダー高さぶん下げる
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "2rem",
        }}
      >
        <Auth />
      </main>
    </div>
  );
}
