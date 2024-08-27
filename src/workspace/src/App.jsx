import { useEffect, useState } from 'react'
import './App.css'
import { useField } from './hooks/useField'
import { useStart } from './hooks/useStart'
import { useCount } from './hooks/useCount'
import { Field } from './components/field'
import { GameOver } from './components/gameOver'
import { getIndex } from './Api'

function App() {
  const [gameOverFlag, setGameOverFlag] = useState(false);
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);
  const [enh, setEnh] = useState(false);
  const { field, move, setField } = useField(setGameOverFlag, setScore,setEnh,enh);
  const { pushShift, start, setStart } = useStart();
  const { time, setTime } = useCount(field, start, setField, setGameOverFlag, setScore, setStart,setEnh,enh);
  //左右移動
  useEffect(() => {
    if (start) {
      document.addEventListener("keydown", move);
      return () => {
        document.removeEventListener("keydown", move);
      }
    }
  }, [field, start]);
  //Shiftトグル
  useEffect(() => {
    document.addEventListener("keydown", pushShift);
    return () => {
      document.removeEventListener("keydown", pushShift);
    }
  }, [start]);
  //ゲームオーバー時
  useEffect(() => {
    if (gameOverFlag) {
      localStorage.setItem("score", String(score).padStart(8, "0"));
      setStart(false);
      setTime(0);
      getIndex(setResults);
    }
  }, [gameOverFlag, score]);


  return (
    <>
      <div className='score'>{String(score).padStart(8, "0")}</div>
      {gameOverFlag ? <GameOver setGameOverFlag={setGameOverFlag} results={results}
      ></GameOver> : <Field field={field} time={time} enh={enh} ></Field>}
    </>
  )
}

export default App
