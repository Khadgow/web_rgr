import styles from './index.module.css'

const Header = ({isStarted, onFinish, onStart, disableTime}) => {

    return (
        <div className={styles.header}>
            <div>РГЗ "Тест на скорость реакции"</div>
            <div className={styles.col}>{isStarted ?
                (<>
                    <button className="btn btnDanger" onClick={onFinish} disabled={!!disableTime}>Стоп</button>
                    <p>{disableTime} секунд</p>
                </>) :
                <button className="btn btnPrimary" onClick={onStart}>Старт</button>
            }
            </div>

        </div>
    )
}
export default Header