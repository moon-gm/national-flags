import Link from 'next/link'
import styles from '../styles/navigation.module.scss'

export default function Navigation() {
    return (
        <div className={styles.grid}>

            <Link href="/asia" className={styles.card}>
                <h3>アジア &rarr;</h3>
            </Link>

            <Link href="/europe" className={styles.card}>
                <h3>ヨーロッパ &rarr;</h3>
            </Link>

            <Link
                href="/middleEast"
                className={styles.card}
            >
                <h3>中東 &rarr;</h3>
            </Link>

            <Link
                href="/africa"
                className={styles.card}
            >
                <h3>アフリカ &rarr;</h3>
            </Link>

            <Link
                href="/oceania"
                className={styles.card}
            >
                <h3>オセアニア &rarr;</h3>
            </Link>

            <Link
                href="/northAmerica"
                className={styles.card}
            >
             <h3>北アメリカ &rarr;</h3>
            </Link>

            <Link
                href="/centralAmerica"
                className={styles.card}
            >
                <h3>中央アメリカ &rarr;</h3>
            </Link>

            <Link
                href="/southAmerica"
                className={styles.card}
            >
                <h3>南アメリカ &rarr;</h3>
            </Link>

            <Link
                href="/all"
                className={styles.card}
            >
                <h3>全て &rarr;</h3>
            </Link>
            
      </div>
    )
}