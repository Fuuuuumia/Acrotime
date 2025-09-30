"use client";

import Link from "next/link";
import styles from "./index.module.css";
import Button from "@/components/Button";

type HeaderProps = {
  user?: string | null; // ログイン中のユーザー
  onSignOut?: () => void;
  centerContent?: React.ReactNode; // ← ここを追加（中央の可変エリア）
};

export default function Header({ user, onSignOut, centerContent }: HeaderProps) {
  return (
    <header className={styles.header}>
      {/* 左側：ロゴ */}
      <div className={styles.logo}>
        <Link href="/">Acrodash</Link>
      </div>

      {/* 中央部分：ページごとに差し替え */}
      <div className={styles.center}>{centerContent}</div>

      {/* 右側：認証 */}
      <div className={styles.auth}>
        {user ? (
          <Button onClick={onSignOut}>ログアウト</Button>
        ) : (
          <Link href="/signin">
            <Button>サインイン</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
