import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import planepng from '@site/static/img/plane.png';

export default function Home(): JSX.Element {
  return (
    <Layout title="Silent Ski Project" description="Communication with Haptic">
      <main className={styles.main}>
        {/* TOWER SECTION */}
        <section className={styles.towerSection}>
          <svg className={styles.tower} viewBox="0 0 200 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bodyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#888" />
                <stop offset="100%" stopColor="#555" />
              </linearGradient>
              <linearGradient id="controlRoomGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#666" />
                <stop offset="100%" stopColor="#333" />
              </linearGradient>
              <linearGradient id="windowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ccefff" />
                <stop offset="100%" stopColor="#66b3cc" />
              </linearGradient>
            </defs>
            {/* Tower Base */}
            <path d="M80 600 L120 600 L120 400 Q100 390 80 400 Z" fill="url(#bodyGradient)" />
            {/* Tower Body */}
            <path d="M80 400 Q70 380 80 360 L80 200 Q100 190 120 200 L120 360 Q130 380 120 400 Z" fill="url(#bodyGradient)" />
            {/* Tower Top */}
            <path d="M60 190 L140 190 Q150 200 140 210 L60 210 Q50 200 60 190 Z" fill="url(#controlRoomGradient)" />
            {/* Windows */}
            <rect x="70" y="160" width="60" height="25" fill="url(#windowGradient)" rx="5" opacity="0.8" />
            {/* Antenna */}
            <rect x="98" y="100" width="4" height="60" fill="#222" />
            <circle cx="100" cy="100" r="6" fill="#ff4444" />
          </svg>
        </section>

        {/* CENTER RIGHT TEXT SECTION */}
        <section className={styles.textSection}>
          <h1 className={styles.title}>Siilent Sky Project</h1>
          <p className={styles.subtitle}>Communication with Haptic</p>
        </section>

        {/* PLANE SECTION */}
        <section className={styles.rightSection}>
          <img src={planepng} alt="Plane" className={styles.plane} />
        </section>
      </main>
    </Layout>
  );
}
