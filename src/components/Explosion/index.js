import {useEffect, useRef} from "react";

import styles from './index.module.css'

const Explosion = ({position, id, onDestroyExplosion}) => {
    const ref = useRef()
    useEffect(() => {
        if (ref.current) {
            ref.current.style.left = position.x + '%'
            ref.current.style.top = position.y + '%'
            ref.current.style.display = 'block'
        }
    }, [position])
    return (
        <div ref={ref} className={styles.explosion} onAnimationEnd={() => onDestroyExplosion(id)}/>
    )
}
export default Explosion