import { enemyPos } from "./searchPos/enemyPos";
import { playerPos } from "./searchPos/playerPos";

export const rock = (newField, setField, moveDir, setGameOverFlag, enh, setEnh) => {
    const posPlayerX = playerPos(newField).x;
    const posPlayerY = playerPos(newField).y;
    const posEnemyX = enemyPos(newField).x;
    const posEnemyY = enemyPos(newField).y;
    if (newField[posPlayerX][posPlayerY - 1] == 1 && moveDir == "Right") {
        const tempEnemy = newField[posEnemyX][posEnemyY];
        if (!enh) {
            newField[posEnemyX][posEnemyY] = newField[posEnemyX + 1][posEnemyY];
            newField[posEnemyX + 1][posEnemyY] = tempEnemy;
        } else {
            setEnh(false)
        }
        if (newField[posPlayerX][posPlayerY] == tempEnemy) {
            setGameOverFlag(true);
        }
        setField(newField);
    }
    else if (newField[posPlayerX][posPlayerY + 1] == 1 && moveDir == "Left") {
        const tempEnemy = newField[posEnemyX][posEnemyY];
        if (!enh) {
            newField[posEnemyX][posEnemyY] = newField[posEnemyX + 1][posEnemyY];
            newField[posEnemyX + 1][posEnemyY] = tempEnemy;
        } else {
            setEnh(false)
        }
        if (newField[posPlayerX][posPlayerY] == tempEnemy) {
            setGameOverFlag(true);
        }
        setField(newField);
    } else if (newField[posPlayerX - 1][posPlayerY] == 1 && moveDir == "Up") {
        const tempEnemy = newField[posEnemyX][posEnemyY];
        if (!enh) {
            newField[posEnemyX][posEnemyY] = newField[posEnemyX + 1][posEnemyY];
            newField[posEnemyX + 1][posEnemyY] = tempEnemy;
        } else {
            setEnh(false)
        }
        setField(newField);
    }
    if (newField[posEnemyX - 1][posEnemyY] == 1 && newField[posPlayerX - 1][posPlayerY] == newField[posEnemyX][posEnemyY] && moveDir == "Up") {
        if (!enh) {
            setGameOverFlag(true);
        } else {
            setEnh(false)
            newField[posEnemyX - 1][posEnemyY] = 0;
        }
    }
}
export const flower = (newField, setField, setScore, moveDir) => {
    const posPlayerX = playerPos(newField).x;
    const posPlayerY = playerPos(newField).y;
    const posEnemyX = enemyPos(newField).x;
    const posEnemyY = enemyPos(newField).y;
    if (newField[posPlayerX][posPlayerY - 1] == 2 && moveDir == "Right") {
        setScore(prev => prev + 100);
        newField[posPlayerX][posPlayerY - 1] = 0;
    } else if (newField[posPlayerX][posPlayerY + 1] == 2 && moveDir == "Left") {
        setScore(prev => prev + 100);
        newField[posPlayerX][posPlayerY + 1] = 0;
    } else if (newField[posPlayerX - 1][posPlayerY] == newField[posEnemyX][posEnemyY] && newField[posEnemyX - 1][posEnemyY] == 2 && moveDir == "Up") {
        setScore(prev => prev + 100);
        newField[posEnemyX - 1][posEnemyY] = 0;
    } else if (newField[posPlayerX - 1][posPlayerY] == 2 && moveDir == "Up") {
        setScore(prev => prev + 100);
        newField[posPlayerX - 1][posPlayerY] = 0;
    }
}
export const mushroom = (newField, setField, setScore, moveDir, setEnh) => {
    const posPlayerX = playerPos(newField).x;
    const posPlayerY = playerPos(newField).y;
    const posEnemyX = enemyPos(newField).x;
    const posEnemyY = enemyPos(newField).y;

    if (newField[posPlayerX][posPlayerY - 1] == 3 && moveDir == "Right") {
        setEnh(true);
        newField[posPlayerX][posPlayerY - 1] = 0;
    }
    else if (newField[posPlayerX][posPlayerY + 1] == 3 && moveDir == "Left") {
        setEnh(true);
        newField[posPlayerX][posPlayerY + 1] = 0;
    } else if (newField[posPlayerX - 1][posPlayerY] == newField[posEnemyX][posEnemyY] && newField[posEnemyX - 1][posEnemyY] == 3 && moveDir == "Up") {
        setEnh(true);
    } else if (newField[posPlayerX - 1][posPlayerY] == 3 && moveDir == "Up") {
        setEnh(true);
        newField[posPlayerX - 1][posPlayerY] = 0;
    }
}
