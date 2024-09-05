import { useEffect } from "react";
import { useState } from "react";

export const useStart = (gameOverFlag) => {
    const [start, setStart] = useState(false);
    const handleKeyDown = (e) => {
        if (e.key == " ") {
            setStart(prev => !prev);
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [start]);

    useEffect(() => {
        if (gameOverFlag) {
            setStart(false);
        }
    }, [gameOverFlag]);

    return { start }
}