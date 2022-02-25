import styles from './index.module.css'

const Field = ({children}) => {
    return (
            <div className={styles.field}>
                {children}
            </div>
    )
}
export default Field