"use client";

import "./globals.css";
import "./page.css";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function HomePage() {
  const [user, setUser] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user?.email ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user?.email ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ ナビゲーション部分をここで定義して渡す
  const navLinks = (
    <>
      <Link href="/about">もっと知る</Link>
      <Link href="/features">Acrotimeでできること</Link>
      <Link href="/contact">お問い合わせ</Link>
    </>
  );

  return (
    <div className="overall">
      <Header
        user={user}
        onSignOut={() => supabase.auth.signOut()}
        centerContent={navLinks} // ← 中央ナビをここから渡す
      />

      <div className="title-component">
        <h1 className="acrotime">Acrotime</h1>
        <p className="description">
          習慣・プロジェクトを長期的に管理。
          <br />
          毎日のスケジュールを整理し、
          <br />
          あなたの集中をサポートします。
        </p>

        <Button onClick={() => (window.location.href = "/signin")}>
          はじめる（無料）
        </Button>
      </div>
    </div>
  );
}
