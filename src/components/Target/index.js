import {useEffect, useRef} from "react";

import styles from './index.module.css'

const Target = ({position, id, onDestroyTarget, liveTime, onClick}) => {
    const ref = useRef()
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onDestroyTarget(id)
        }, liveTime)
        return () => {
            clearTimeout(timeoutId)
        }
    }, [id, liveTime, onDestroyTarget])
    useEffect(() => {
        if (ref.current) {
            ref.current.style.left = position.x + '%'
            ref.current.style.top = position.y + '%'
            ref.current.style.display = 'block'
        }
    }, [position])
    return (
        <div ref={ref} className={styles.target} onClick={() => onClick(id)}/>
    )
}
export default Target