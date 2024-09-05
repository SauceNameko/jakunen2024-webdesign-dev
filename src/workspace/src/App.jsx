import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useField } from './hooks/useField'
import { GameSeen } from './components/GameSeen'
import { useStart } from './hooks/useStart'
import { usePlayer } from './hooks/usePlayer'
import { useEnemy } from './hooks/useEnemy'
import { ResultSeen } from './components/ResultSeen'

function App() {
  const [downCount, setDownCount] = useState(0);
  const [score, setScore] = useState(0);
  const [isEnh, setIsEnh] = useState(false);
  const [gameOverFlag, setGameOverFlag] = useState(false);
  const [time, setTime] = useState(1000);
  const { start } = useStart(gameOverFlag);
  const { playerPos, movePlayerDown } = usePlayer(start);
  const { enemyPos, moveEnemyDown } = useEnemy(start);
  const { field, itemData, itemKey } = useField(playerPos, enemyPos, start, downCount);
  const currentPlayerX = useRef(playerPos.x);
  //時間計測
  useEffect(() => {
    console.log(time);

    if (start) {
      const interval = setInterval(() => {
        moveEnemyDown();
        movePlayerDown();
        setDownCount(prev => prev + 1);
        setScore(prev => prev + 10);
      }, time);
      return () => {
        clearInterval(interval);
      }
    }
  }, [start, time]);
  //アイテム取得時の処理
  useEffect(() => {
    if (itemData == "stump") {
      if (isEnh) {
        setIsEnh(false);
      } else {
        moveEnemyDown(itemData)
      }
    } else if (itemData == "flower") {
      setScore(prev => prev + 100);
    } else if (itemData == "mushroom") {
      setIsEnh(true);
    }
  }, [itemKey]);
  //ゲームオーバー判定
  useEffect(() => {
    if (field[0]) {
      const newField = [...field];
      if (newField[playerPos.y][playerPos.x] == newField[enemyPos.y][enemyPos.x]) {
        localStorage.setItem("score", String(score).toString().padStart(8, "0"));

        setGameOverFlag(true);
      }
    }
  }, [enemyPos]);
  //動くごとにスコア増加
  useEffect(() => {
    if (start) {
      if (playerPos.x != currentPlayerX.current) {
        setScore(prev => prev + 10);
      }
      currentPlayerX.current = playerPos.x;
    }
  }, [playerPos]);
  useEffect(() => {
    if (downCount % 5 == 0 && downCount != 0) {
      setTime(prev => {
        if (prev == 400) {
          return prev;
        }
        return prev - 100;
      });
    }
  }, [downCount]);


  return (
    <>
      {!gameOverFlag && <GameSeen field={field} isEnh={isEnh} score={score} ></GameSeen>}
      {gameOverFlag && <ResultSeen></ResultSeen>}
    </>
  )
}

export default App
