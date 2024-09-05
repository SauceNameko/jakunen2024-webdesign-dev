import { useEffect, useRef, useState } from "react"
import { api, getField } from "../api";
export const useField = (playerPos, enemyPos, start, downCount) => {

    const [field, setField] = useState([]);
    const [initField, setInitField] = useState([]);
    const updatedInitField = structuredClone(initField);
    const [itemData, setItemData] = useState("");
    const [itemKey, setItemKey] = useState(0);
    const diffCount = useRef(downCount);
    //fieldApi取得
    useEffect(() => {
        getField(setField, setInitField)
    }, [])

    useEffect(() => {
        const playerPosY = playerPos.y;
        const playerPosX = playerPos.x;
        const enemyPosY = enemyPos.y;
        const enemyPosX = enemyPos.x;
        const newField = [...field];

        if (start) {
            if (downCount > diffCount.current) {
                newField.shift(); // 現在のフィールドの最初の行を削除
                const newInitdata = updatedInitField.shift();
                newField.push(newInitdata); // 次の行を最後に追加
                updatedInitField.push(newInitdata)
                setInitField(updatedInitField); // 初期フィールドを更新
            }
            getItems(playerPos, newField)
            // プレイヤーとエネミーの位置を更新
            for (let i = 0; i < newField.length; i++) {
                for (let j = 0; j < newField[i].length; j++) {
                    // プレイヤー座標更新
                    if (newField[i][j] == 4) {
                        newField[i][j] = 0;
                    }
                    if (i === playerPosY && j === playerPosX) {
                        newField[i][j] = 4;
                    }
                    // エネミー座標更新
                    if (newField[i][j] == 5) {
                        newField[i][j] = 0;
                    }
                    if (i === enemyPosY && j === enemyPosX) {
                        newField[i][j] = 5;
                    }
                }
            }

        }
        setField(newField);
        diffCount.current = downCount
    }, [enemyPos, start]);

    const getItems = (playerPos, newField) => {
        const Y = playerPos.y;
        const X = playerPos.x;
        if (newField[Y][X] == 1) {
            setItemData("stump")
            setItemKey(prev => prev + 1)
        } else if (newField[Y][X] == 2) {
            setItemData("flower")
            setItemKey(prev => prev + 1)
        } else if (newField[Y][X] == 3) {
            setItemData("mushroom")
            setItemKey(prev => prev + 1)
        }
    }

    return { field, itemData, itemKey }
}