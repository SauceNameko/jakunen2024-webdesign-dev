import { useState } from "react"
import { deleteScore, postNickName, postScore } from "../Api"
import "./gameOver.css"
export const GameOver = ({ setGameOverFlag, results }) => {
    const [btnMessage, setBtnMessage] = useState("スコア投稿");
    const [playerId, setPlayerId] = useState(0);

    return (
        <>
            <div className="container">
                <h1 className="heading">GAME OVER</h1>
                <section className="section score" key={"score"}>
                    <h2 className="score__heading">今回のスコア</h2>
                    <div className="score__value">{localStorage.getItem("score")}</div>
                    <p className="score__text">ニックネーム求む</p>
                    {btnMessage == "スコア投稿" ? <button className="score__btn" onClick={() => {
                        postScore(setPlayerId)
                        setBtnMessage("ニックネーム更新");
                    }}>{btnMessage}</button>
                        :
                        <>
                            <button className="score__btn" onClick={() => { postNickName(playerId) }} >{btnMessage}</button>
                            <button className="score__btn" onClick={() => { deleteScore(playerId) }}>スコア削除</button>
                        </>
                    }

                </section>
                <div className="divider"></div>
                <section className="section ranking" key={"ranking"}>
                    <h2 className="ranking__heading">ランキング</h2>
                    {results.map((data, index) => {
                        return (
                            <>
                                <div className="ranking-row" key={`nickname-${index}`}>
                                    <div className="ranking__name" >{data.nickname}</div>
                                    <div className="ranking__score" >{data.score}</div>
                                </div>
                            </>
                        )
                    })}
                </section>
                <div className="divider"></div>
                <a className="replay" href="./" onClick={() => { setGameOverFlag(false) }} >リプレイ</a>
            </div >
        </>
    )
}