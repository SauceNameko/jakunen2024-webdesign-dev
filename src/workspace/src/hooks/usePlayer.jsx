import { useEffect, useState } from "react"

export const usePlayer = (start) => {
    const [playerPos, setPlayerPos] = useState({ y: 2, x: 1 });
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
        setPlayerPos(prev => {
            if (prev.x > 0) {
                return { y: prev.y, x: prev.x - 1 }
            }
            return { y: prev.y, x: prev.x }
        })
    }
    const moveRight = () => {
        setPlayerPos(prev => {
            if (prev.x < 2) {
                return { y: prev.y, x: prev.x + 1 }
            }
            return { y: prev.y, x: prev.x }
        })
    }
    const movePlayerDown = () => {
        setPlayerPos(prev => {
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

    return { playerPos, movePlayerDown }
}