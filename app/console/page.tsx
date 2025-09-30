"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import styles from "./page.css";

export default function Page() {
  const [isEditMode, setIsEditMode] = useState(false);


  // 📅 現在の日付（YYYY年MM月DD日形式）
  const now = new Date();
  const formattedDate = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;

  // ✨ centerContent を CSS 付きで定義
  const centerContent = (
    <div className={styles.centerContent}>
      <span className={styles.date}>{formattedDate}</span>
      <Link href="">
      <Button
        className={`${styles.editButton} ${isEditMode ? styles.active : ""}`}
        onClick={() => setIsEditMode(!isEditMode)}
      >
        編集モード
      </Button>
      </Link>
    </div>
  );

  return (
      <div>
        <div>
          <Header centerContent={centerContent} />
        </div>
        <div className="main-wrapper">
          <div className="project-dashboard">
            
          </div>
          <div className="schedule-dashboard"></div>
          <div className="task-dashboard"></div>
        </div>
        
      </div>
  );  
}
