"use client";

import Link from "next/link";
import styles from "./index.module.css";
import Button from "@/components/Button";

type HeaderProps = {
  user?: string | null; // ログイン中のユーザー（なければ null）
  onSignOut?: () => void;
};

export default function Header({ user, onSignOut }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Acrotime</Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/about" className={styles.navLink}>もっと知る</Link>
        <Link href="/features" className={styles.navLink}>Acrotimeでできること</Link>
        <Link href="/contact" className={styles.navLink}>お問い合わせ</Link>
      </nav>

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
