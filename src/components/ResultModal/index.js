import styles from './index.module.css'

const ResultModal = ({onResultModalClose, totalTargetCount, clickedTargetCount}) => {
    return (
        <>
            <div className={styles.blur}/>
            <div className={styles.modal}>
                <h3>Результаты</h3>
                <div><b>Всего целей</b>: {totalTargetCount}</div>
                <div><b>Количество удачных кликов</b>: {clickedTargetCount}</div>
                <div><b>Количество пропущенных целей мишеней</b>: {totalTargetCount - clickedTargetCount}</div>
                <div><b>Процент удачных кликов</b>: {Math.round(clickedTargetCount/totalTargetCount * 10000)/100}%</div>
                <button className="btn btnPrimary" onClick={onResultModalClose}>ОК</button>
            </div>
        </>
    )
}
export default ResultModal