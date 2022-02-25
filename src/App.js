import Target from './components/Target'
import {useCallback, useEffect, useState} from "react";
import Toolbar from "./components/Toolbar";
import {v4 as uuidv4} from 'uuid';
import Field from "./components/Field";
import ResultModal from "./components/ResultModal";

const liveTime = 2500

const App = () => {

    const [targets, setTargets] = useState([])

    const [isStarted, setIsStarted] = useState(false)

    const [disableTime, setDisableTime] = useState(0)

    const [totalTargetCount, setTotalTargetCount] = useState(0)

    const [clickedTargetCount, setClickedTargetCount] = useState(0)

    const [isResultModalOpened, setIsResultModalOpened] = useState(false)

    const [intervalIds, setIntervalIds] = useState([])

    const onStart = useCallback(() => {
        setIsStarted(true)
        setDisableTime(5)
    }, [])

    const onFinish = useCallback(() => {
        setIsStarted(false)
        setTargets([])
        intervalIds.forEach(({timeoutId}) => clearInterval(timeoutId))
        setIsResultModalOpened(true)
    }, [intervalIds])


    useEffect(() => {

        const intervalId = setInterval(() => {
                if (isStarted) {
                    const id = uuidv4()
                    const timeoutId = setTimeout(() => {

                        setTotalTargetCount(prevState => prevState + 1)
                        setTargets((prevTargets) => [
                            ...prevTargets,
                            {
                                id,
                                position: {
                                    x: Math.random() * 100,
                                    y: Math.random() * 100
                                }
                            }
                        ])
                    }, Math.random() * (1000) + 500)
                    setIntervalIds(prevState => [...prevState, {id, timeoutId}])
                    if (disableTime) {
                        setDisableTime(prevState => prevState - 1)
                    }
                }
            },
            1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [disableTime, isStarted])

    const onDestroyTarget = useCallback((targetId) => {
        setTargets((prevTargets) => prevTargets.filter(({id}) => targetId !== id))
        setIntervalIds((prevState) => prevState.filter(({id}) => targetId !== id))
    }, [])

    const onTargetClick = useCallback((targetId) => {
        setTargets((prevTargets) => prevTargets.filter(({id}) => targetId !== id))
        setIntervalIds((prevState) => prevState.filter(({id}) => targetId !== id))
        setClickedTargetCount(prevState => prevState + 1)
    }, [])

    return (
        <div className="App">
            <Toolbar isStarted={isStarted} onFinish={onFinish} onStart={onStart} disableTime={disableTime}/>
            <Field>
                {targets.map(({id, position}) => (
                    <Target
                    key={id} position={position} id={id}
                    onDestroyTarget={onDestroyTarget} liveTime={liveTime}
                    onClick={onTargetClick}/>
                ))}
            </Field>
            {isResultModalOpened && <ResultModal/>}
        </div>
    );
}

export default App;
