import "./GameSeen.css";
import { Field } from "./Field"

export const GameSeen = ({ field, isEnh, score }) => {
    return (
        <>
            <div className="score">{String(score).toString().padStart(8, "0")}</div>
            <Field field={field} isEnh={isEnh} ></Field>
        </>
    )
} 