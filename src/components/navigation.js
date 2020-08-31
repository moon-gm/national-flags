import Link from 'next/link'
import styles from '../styles/navigation.module.scss'

export default function Navigation() {
    return (
        <div className={styles.grid}>

            <Link href="/asia">
                <h3 className={styles.card}>アジア &rarr;</h3>
            </Link>

            <Link href="/europe">
                <h3 className={styles.card}>ヨーロッパ &rarr;</h3>
            </Link>

            <Link href="/middleEast">
                <h3 className={styles.card}>中東 &rarr;</h3>
            </Link>

            <Link href="/africa">
                <h3 className={styles.card}>アフリカ &rarr;</h3>
            </Link>

            <Link href="/oceania">
                <h3 className={styles.card}>オセアニア &rarr;</h3>
            </Link>

            <Link href="/northAmerica">
                <h3 className={styles.card}>北アメリカ &rarr;</h3>
            </Link>

            <Link href="/centralAmerica">
                <h3 className={styles.card}>中央アメリカ &rarr;</h3>
            </Link>

            <Link href="/southAmerica">
                <h3 className={styles.card}>南アメリカ &rarr;</h3>
            </Link>

            <Link href="/all">
                <h3 className={styles.card}>全ての国々 &rarr;</h3>
            </Link>
        </div>
    )
}
