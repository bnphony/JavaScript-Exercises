function boardGames() {
    
    /*
        TODO: Matriz de M * N
            1) Solo te puedes mover de acuerdo a las reglas de movimiento
                * Sin salirte del GRID o si la posicion destino es '1'
                * Solo puedes moverte a casillas con '0'
            2) Calcular el menor numero de movimientos desde la posicion actual
                a la posicion destino

            !INPUTS:
                1.- M(filas), N(columnas)
                2.- Grid creado a partide de M y N
                3.- Posicion inicial
                4.- Posicion de destino
                5.- REGLA DE MOVIMIENTO
            
            !OUTPUT:
                1.- INT (numero minimo de movientos necesarios para llegar a 
                    la posicion de destino)
    */



    // * Move rules:
    /*
        * Regla de movimiento: (1, 2) -> Es decir debes moverte (1) fila y (2) columnas
            * -> Es decir:
            *  Si vas hacia adelante (FORWARD) debes avanzar 1 fila y 2 columnas
    */

    // * Reglas de movimiento:
    /*
        * REGLA: (1, 2)
        * Adelante (Forward): current position (x, y) -> ((x + 1), (y + 2))
        * Atras (Backward): current position (x, y) -> ((x - 1), (y - 2))
        * Derecha (Right): current position (x, y) -> ((x + 2), (y - 1))
        * Izquierda (Left): current position (x, y) -> ((x - 2), (y + 1))
    
    */

    const moves = (rule, fila, columna, position) => {    
        const rules = {
            'forward': [position[0] + fila, position[1] + columna],
            'backward': [position[0] - fila, position[1] - columna],
            'right': [position[0] + columna, position[1] - fila],
            'left': [position[0] - columna, position[1] + fila]
        }
        
        
        return rules[rule];
    }
    console.log(moves('forward', 1, 2, [0, 0]));
    // * GRID RESTRICCTIONS:
    // 4 <= M and N <= 50 
    function createBoard(M, N) {
        let errorMessage = "Las filas (N) deben ser 4 o mas, y las columnas (N) deben ser menor o igual a 50";
        if (M <= 3 || N > 50) return errorMessage;  // No cumple los requisitos
        let matriz = [];
        for (let i = 0; i < M; i++) {
            let row = [];
            for (let j = 0; j < N; j++) {
                row.push(Math.random() < 0.5 ? 1 : 0);
            }
            matriz.push(row);
        }
        console.log(matriz);
        let libre = false;

        // Eligir una posicion inicial
        let initialPosition = chooseInitialPosition(matriz, M, N);
        console.log(initialPosition);
        return 'ok';

    }

    function chooseInitialPosition(matriz, row, column) {
        let position;
        let libre = false;
        while (!libre) {
            let [ rowRandom, columnRandom ] = [ Math.floor(Math.random() * row), Math.floor(Math.random() * column)];
            if (matriz[rowRandom][columnRandom] == 0) {
                libre = true;
                // console.log(`Row: ${rowRandom}, Column: ${columnRandom}`);
                position = [rowRandom, columnRandom];
            }
        }
        return position;
    }

    console.log(createBoard(6, 6));
}


export function codeVitaExercises() {
    boardGames();
}