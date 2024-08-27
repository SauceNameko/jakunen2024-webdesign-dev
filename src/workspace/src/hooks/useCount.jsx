import { useEffect, useState } from "react"
import { playerPos } from "../searchPos/playerPos";
import { enemyPos } from "../searchPos/enemyPos";
import { flower, mushroom, rock } from "../fieldObject";

export const useCount = (field, start, setField, setGameOverFlag, setScore, setStart, setEnh, enh) => {
    const [time, setTime] = useState(0);
    const [moveSpeed, setMoveSpeed] = useState(1000);
    useEffect(() => {

        if (start) {
            const num = setInterval(() => {
                const posPlayerX = playerPos(field).x;
                const posPlayerY = playerPos(field).y;
                const posEnemyX = enemyPos(field).x;
                const posEnemyY = enemyPos(field).y;
                const newField = [...field];
                if (posPlayerX != 29) {
                    const tempPlayer = newField[posPlayerX][posPlayerY];
                    const tempEnemy = newField[posEnemyX][posEnemyY];
                    newField[posPlayerX][posPlayerY] = newField[posPlayerX + 1][posPlayerY]
                    newField[posPlayerX + 1][posPlayerY] = tempPlayer
                    newField[posEnemyX][posEnemyY] = newField[posEnemyX + 1][posEnemyY]
                    newField[posEnemyX + 1][posEnemyY] = tempEnemy
                    setField(newField);
                } else {
                    setStart(false);
                    return;
                }
                setTime(prev => prev + 1);
                //岩に当たった時
                rock(newField, setField, "Up", setGameOverFlag, enh, setEnh);
                //花に当たった時
                flower(newField, setField, setScore, "Up");
                //きのこに当たった時
                mushroom(newField, setField, setScore, "Up", setEnh)
                setScore(prev => prev += 10);
                if (time % 5 == 0 && time != 0) {
                    setMoveSpeed(prev => prev - 100);
                }
            }, moveSpeed);
            return () => { clearInterval(num) }
        }


    }, [start, time, moveSpeed]);

    return { time, setTime }
}