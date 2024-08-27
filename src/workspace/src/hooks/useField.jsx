import { useEffect, useState } from "react";
import { getField } from "../Api";
import { playerPos } from "../searchPos/playerPos";
import { enemyPos } from "../searchPos/enemyPos";
import { flower, mushroom, rock } from "../fieldObject";

export const useField = (setGameOverFlag, setScore,setEnh,enh) => {
    const [field, setField] = useState([]);
    useEffect(() => {
        getField(setField)
    }, []);

    const move = (e) => {
        const posPlayerX = playerPos(field).x;
        const posPlayerY = playerPos(field).y;
        const posEnemyX = enemyPos(field).x;
        const posEnemyY = enemyPos(field).y;
        const newField = [...field];

        if (e.key == "ArrowRight") {
            if (newField[posPlayerX][posPlayerY + 1] != null) {
                const tempPlayer = newField[posPlayerX][posPlayerY];
                const tempEnemy = newField[posEnemyX][posEnemyY];
                newField[posPlayerX][posPlayerY] = newField[posPlayerX][posPlayerY + 1]
                newField[posPlayerX][posPlayerY + 1] = tempPlayer;
                newField[posEnemyX][posEnemyY] = 0
                newField[posEnemyX][posEnemyY + 1] = tempEnemy;
                setField(newField)
                //岩に当たった時
                rock(newField, setField, "Right", setGameOverFlag,enh,setEnh);
                //花に当たった時
                flower(newField, setField, setScore, "Right")
                //きのこに当たった時
                mushroom(newField, setField, setScore, "Right",setEnh)
                setScore(prev => prev += 10);
            }
        }
        if (e.key == "ArrowLeft") {
            if (newField[posPlayerX][posPlayerY - 1] != null) {
                const tempPlayer = newField[posPlayerX][posPlayerY];
                const tempEnemy = newField[posEnemyX][posEnemyY];
                newField[posPlayerX][posPlayerY] = newField[posPlayerX][posPlayerY - 1]
                newField[posPlayerX][posPlayerY - 1] = tempPlayer
                newField[posEnemyX][posEnemyY] = 0
                newField[posEnemyX][posEnemyY - 1] = tempEnemy
                setField(newField)
                //岩に当たった時
                rock(newField, setField, "Left", setGameOverFlag,enh,setEnh);
                //花に当たった時
                flower(newField, setField, setScore, "Left")
                //きのこに当たった時
                mushroom(newField, setField, setScore, "Left",setEnh)
                setScore(prev => prev += 10);
            }
        }
    }
    return { field, move, setField }
}