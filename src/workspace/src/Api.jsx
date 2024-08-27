
const api = "http://localhost:8084/api";

export const getField = async (setField) => {
    const res = await fetch(`${api}/field`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    const data = await res.json();
    const fie = data.field;
    for (let i = 0; i < fie.length; i++) {
        for (let j = 0; j < fie[i].length; j++) {
            if (i == 0 && j == 1) {
                fie[i][j] = 5;
            }
            if (i == 2 && j == 1) {
                fie[i][j] = 4;
            }
        }
    }
    setField(fie);
}

export const getIndex = async (setResults) => {
    const res = await fetch(`${api}/score`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    const data = await res.json();
    const sortData = data.sort((a, b) => b.score - a.score);
    const sliceData = sortData.slice(0, 3);
    setResults(sliceData);
}

export const postScore = async (setPlayerId) => {
    const name = window.prompt("名前を入力してください");
    if (name != "") {
        const res = await fetch(`${api}/score`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "nickname": `${name}`, "score": Number(localStorage.getItem("score")) })
        })
        const data = await res.json();
        setPlayerId(data.id);
        if (!data.message) {
            window.alert("スコアを投稿しました");
        } else {
            window.alert(data.message);
        }
    }
}

export const postNickName = async (playerId) => {
    const name = window.prompt("名前を入力してください");
    if (name != "") {
        const res = await fetch(`${api}/score/${playerId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "id": playerId, "nickname": `${name}` })
        })
        const data = await res.json();
        if (!data.message) {
        } else {
            window.alert(data.message);
        }
    }
}

export const deleteScore = async (playerId) => {
    const confirm = window.confirm("本当に削除しますか？")
    if (confirm) {
        const res = await fetch(`${api}/score/${playerId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        const data = await res.json();
    }
}