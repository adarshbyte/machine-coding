'use client'
import Link from "next/link";
import styles from "./home.module.css";

const projects = [
  // { name: "Dropdown", path: "/dropdown" },
  { name: "Infinite Scroll", path: "/infinite-scroll" },
  // { name: "Modal", path: "/modal" },
  // { name: "OTP", path: "/otp" },
  // { name: "Stopwatch", path: "/stopwatch" },
  { name: "Folder", path: "/folder" },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Machine Coding Projects</h1>
      <ul className={styles.list}>
        {projects.map((proj) => (
          <li key={proj.path} className={styles.item}>
            <Link href={proj.path}>{proj.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
