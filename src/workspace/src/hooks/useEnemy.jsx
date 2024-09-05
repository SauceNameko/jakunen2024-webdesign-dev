import { useEffect, useState } from "react"

export const useEnemy = (start) => {
    const [enemyPos, setEnemyPos] = useState({ y: 0, x: 1 });
    const handleKeyDown = (e) => {
        switch (e.key) {
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
        }
    }

    const moveLeft = () => {
        setEnemyPos(prev => {
            if (prev.x > 0) {
                return { y: prev.y, x: prev.x - 1 }
            }
            return { y: prev.y, x: prev.x }
        })
    }
    const moveRight = () => {
        setEnemyPos(prev => {
            if (prev.x < 2) {
                return { y: prev.y, x: prev.x + 1 }
            }
            return { y: prev.y, x: prev.x }
        })
    }
    const moveEnemyDown = (itemData) => {
        setEnemyPos(prev => {
            if (itemData == "stump") {
                return { y: prev.y + 1, x: prev.x }
            } else {
                
            }
            return { y: prev.y, x: prev.x }
        })
    }
    useEffect(() => {
        if (start) {
            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            }
        }
    }, [start]);

    return { enemyPos, moveEnemyDown }
}