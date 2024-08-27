import "./field.css";
export const Field = ({ field, time, enh }) => {
    return (
        <>
            <div className='field'>
                {field.map((x, xIndex) => {
                    return x.map((y,yIndex) => {
                        if (xIndex >= time && xIndex <= time + 11) {
                            return <>
                                <div className={`reaf`} key={yIndex}>
                                    <div className={`${y == 1 ? "stump" : ""}
                                ${y == 2 ? "flower" : ""}
                                ${y == 3 ? "mushroom" : ""}
                                ${y == 4 ? `player ${enh ? "enh" : ""} ` : ""}
                                ${y == 5 ? "enemy" : ""}`}></div>
                                </div>
                            </>
                        }
                    })
                })}
            </div >
        </>
    )
}