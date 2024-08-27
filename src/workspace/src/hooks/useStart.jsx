import { useState } from "react";

export const useStart = () => {
    const [start, setStart] = useState(false);
    const pushShift = (e) => {
        if (e.key == " ") {
            setStart(prev => !prev);
        }
    }
    return { pushShift,start,setStart }
}