import { useEffect, useState } from "react";
import "./ResultSeen.css";
import { deleteScore, getRank, postScore, putScore } from "../api";
export const ResultSeen = () => {
    const [isPost, setIsPost] = useState(false);
    const [ranks, setRank] = useState([]);
    const [playerId, setPlayerId] = useState(0);
    //取得関数
    const handleGetRanks = () => {
        getRank(setRank)
    }
    //投稿関数
    const handlePostScore = () => {
        postScore(setPlayerId)
    }
    //編集関数
    const handlePutScore = () => {
        putScore(playerId);
    } //削除関数
    const handleDeleteScore = () => {
        deleteScore(playerId)
    }
    useEffect(() => {
        handleGetRanks();
    }, []);
    return (
        <div className="container">
            <h1 className="heading">GAME OVER</h1>
            <section className="section score" >
                <h2 className="score__heading">今回のスコア</h2>
                <div className="score__value">{localStorage.getItem("score")}</div>
                <p className="score__text">ニックネーム求む</p>
                {!isPost && <button className="score__btn" onClick={() => {
                    handlePostScore();
                    setIsPost(true);
                }} >スコア投稿</button>
                }
                {isPost &&
                    <>
                        <button className="score__btn" onClick={() => {
                            handlePutScore()
                        }} >ニックネーム更新</button>
                        <button className="score__btn" onClick={() => {
                            handleDeleteScore();
                        }} >スコア削除</button>
                    </>
                }
            </section>
            <div className="divider"></div>
            <section className="section ranking">
                <h2 className="ranking__heading">ランキング</h2>
                {ranks.map((rank, rankIndex) => {
                    return (
                        <div className="ranking-row" key={`rank-${rankIndex}`} >
                            <div className="ranking__name">{rank.nickname}</div>
                            <div className="ranking__score">{String(rank.score).toString().padStart(8, "0")}</div>
                        </div>
                    )
                })}

            </section>
            <div className="divider"></div>
            <a className="replay" href="./">リプレイ</a>
        </div >
    )
}