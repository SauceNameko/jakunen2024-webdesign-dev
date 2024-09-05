import "./Field.css";
export const Field = ({ field, isEnh }) => {

    return (
        <div className="field">
            {field.map((y, yIndex) => {
                return y.map((x, xIndex) => {
                    if (yIndex >= 0 && yIndex <= 12) {
                        return <div className={`cell 
                         ${x == 0 ? "reaf" : ""}
                         ${x == 1 ? "stump" : ""}
                         ${x == 2 ? "flower" : ""}
                         ${x == 3 ? "mushroom" : ""}
                         ${x == 4 ? `player ${isEnh ? "enh" : ""} ` : ""}
                         ${x == 5 ? "enemy" : ""}
                         
                         `

                        } key={`cell-${xIndex}`}></div>
                    }
                })
            })}
        </div>
    )
}