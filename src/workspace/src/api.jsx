
export const api = "http://localhost:8084/api"
//フィールド取得
export const getField = async (setField,setInitField) => {
    const res = await fetch(`${api}/field`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    const data = await res.json();
    setInitField(structuredClone(data.field));
    for (let i = 0; i < data.field.length; i++) {
        for (let j = 0; j < data.field[i].length; j++) {
            if (i == 0 && j == 1) {
                data.field[i][j] = 5;
            }
            if (i == 2 && j == 1) {
                data.field[i][j] = 4;
            }
        }
    }
    setField(data.field);
}
//ランキング3件取得
export const getRank = async (setRank) => {
    const res = await fetch(`${api}/score`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    const data = await res.json();
    const sortData = data.sort((a, b) => b.score - a.score);
    const sliceData = sortData.slice(0, 3);
    setRank(sliceData)
}
//スコア投稿
export const postScore = async (setPlayerId) => {
    const nickname = window.prompt("ニックネームを入力してください");
    if (nickname) {
        const res = await fetch(`${api}/score`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "nickname": nickname,
                "score": Number(localStorage.getItem("score"))
            })
        })
        const data = await res.json();
        window.alert(data.message);
        setPlayerId(data.id);
    }
}
//ニックネーム更新
export const putScore = async (playerId) => {
    const nickname = window.prompt("ニックネームを入力してください");
    if (nickname) {
        const res = await fetch(`${api}/score/${playerId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "id": playerId,
                "nickname": nickname,
            })
        })
        const data = await res.json();
        if (data.message == "無効なリクエストです" && data.message == "存在しないIDです") {
            window.alert(data.message);
        }
    }
}
//投稿削除
export const deleteScore = async (playerId) => {
    const confirm = window.confirm("本当に削除しますか?");
    if (confirm) {
        const res = await fetch(`${api}/score/${playerId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        const data = await res.json();
        if (data.message == "無効なリクエストです" && data.message == "存在しないIDです") {
            window.alert(data.message);
        }
    }
}