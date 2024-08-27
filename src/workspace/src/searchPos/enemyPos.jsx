export const enemyPos = (field) => {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] == 5) {
                return { x: i, y: j }
            }
        }
    }
}