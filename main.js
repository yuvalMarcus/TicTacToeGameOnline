
(function () {

    var helperController = (function () {

        return {
            nodeListForEach: function (list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            }
        }

    })();

    var UIController = (function (helperCtrl) {

        var DOMstrings = {
            menuFullScreen: '.menu-full-screen',
            newGameBtn: '.new-game',
            menuFullScreenClose: '.menu-full-screen .close',
            btnMenu: '.btn-menu',
            boardGameColumn: '.board-game .column',
            boardGameColumnPos0: '.board-game .column-pos-0',
            boardGameColumnPos1: '.board-game .column-pos-1',
            boardGameColumnPos2: '.board-game .column-pos-2',
            boardGameColumnPos3: '.board-game .column-pos-3',
            boardGameColumnPos4: '.board-game .column-pos-4',
            boardGameColumnPos5: '.board-game .column-pos-5',
            boardGameColumnPos6: '.board-game .column-pos-6',
            boardGameColumnPos7: '.board-game .column-pos-7',
            boardGameColumnPos8: '.board-game .column-pos-8',
            gameType: '.game-type',
            gameStatus: '.game-status',
            gameTurn: '.game-turn',
            boxResultContent: '.box-result .content'
        }

        var setGamePlayerVSPlayer = function () {

            document.querySelector(DOMstrings.gameType).textContent  = 'Player VS Player';
        }

        var getPlayerIconHtml = function (turn) {

            if(turn === 'x') {
                return '<i class="fa fa-times x color-red" aria-hidden="true"></i>';
            } else if(turn === 'o') {
                return '<i class="fa fa-circle-o o color-green" aria-hidden="true"></i>';
            } else {
                return turn;
            }
        }

        return {

            setGameStatus: function (status) {

                document.querySelector(DOMstrings.gameStatus).textContent  = status;
            },

            setGameType: function (type) {

                if(type === 'pvsp') {
                    setGamePlayerVSPlayer();
                }
            },

            setGameTurn: function (turn) {

                document.querySelector(DOMstrings.gameTurn).innerHTML = getPlayerIconHtml(turn);
            },

            clearBoardGame: function () {

                var boardGameColumns = document.querySelectorAll(DOMstrings.boardGameColumn);

                helperCtrl.nodeListForEach(boardGameColumns, function (column, index) {

                    column.innerHTML = '';
                    column.classList.remove('column-win');
                });

            },

            markerColumnsWinner: function (obj) {

                obj.columns.forEach(function (value) {
                    document.querySelector(DOMstrings['boardGameColumnPos' + value]).classList.add('column-win');
                });

            },

            setNotification: function (status, winnerTurn) {
                var html;

                if(status === 'active') {

                    html = '<h2>Game Active</h2> <div class="container-loader"> <div class="loader-game"> <div class="item item-1"></div> <div class="item item-2"></div> <div class="item item-3"></div> <div class="item item-4"></div> </div> </div>';

                    document.querySelector(DOMstrings.boxResultContent).innerHTML = html;
                }

                if(status === 'finished-winner') {

                    html = '<h2>Game Finished</h2><div>Winner: ' + getPlayerIconHtml(winnerTurn) + '</div>';

                    document.querySelector(DOMstrings.boxResultContent).innerHTML = html;
                }

                if(status === 'finished-draw') {

                    html = '<h2>Game Finished</h2><div>The game ended in a draw</div>';

                    document.querySelector(DOMstrings.boxResultContent).innerHTML = html;
                }
            },

            markerColumn: function (pos, turn) {

                document.querySelector(DOMstrings['boardGameColumnPos' + pos]).classList.remove('not-marker');
                document.querySelector(DOMstrings['boardGameColumnPos' + pos]).classList.add('marker');
                document.querySelector(DOMstrings['boardGameColumnPos' + pos]).innerHTML = getPlayerIconHtml(turn);
            },

            opneMenuFullScreen: function () {

                document.querySelector(DOMstrings.menuFullScreen).style.display = 'block';
            },

            closeMenuFullScreen: function () {

                document.querySelector(DOMstrings.menuFullScreen).style.display = 'none';
                document.querySelector(DOMstrings.menuFullScreenClose).style.display = 'block';
            },

            getDOMstrings: function () {
                return DOMstrings;
            }
        }

    })(helperController);

    var coreController = (function (helperCtrl) {

        var data = {
            status: 'waiting',
            type: '',
            turn: '',
            board: null
        }

        return {

            setGameStatus: function (status) {

                data.status = status;
            },

            getGameStatus: function () {

                return data.status;
            },

            setNameGame: function (type) {

                data.status = 'active';
                data.type = type;
                data.turn = 'x';
                data.board = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'];
            },

            checksIfBoardGameIsFull: function () {

                for(var i = 0; i < data.board.length; i++) {

                    if(data.board[i] === 'empty') {

                        return false;
                    }
                }

                return true;
            },

            checksIfGameIsFinished: function (turn) {

                switch (true) {
                    case turn === data.board[0] && turn === data.board[1] && turn === data.board[2]:
                        return {
                            status: 'finished',
                            thereIsWinner: true,
                            winnerTurn: turn,
                            columns: [0, 1, 2]
                        }
                    case turn === data.board[3] && turn === data.board[4] && turn === data.board[5]:
                        return {
                            status: 'finished',
                            thereIsWinner: true,
                            winnerTurn: turn,
                            columns: [3, 4, 5]
                        }
                    case turn === data.board[6] && turn === data.board[7] && turn === data.board[8]:
                        return {
                            status: 'finished',
                            thereIsWinner: true,
                            winnerTurn: turn,
                            columns: [6, 7, 8]
                        }
                    case turn === data.board[0] && turn === data.board[3] && turn === data.board[6]:
                        return {
                            status: 'finished',
                            thereIsWinner: true,
                            winnerTurn: turn,
                            columns: [0, 3, 6]
                        }
                    case turn === data.board[1] && turn === data.board[4] && turn === data.board[7]:
                        return {
                            status: 'finished',
                            thereIsWinner: true,
                            winnerTurn: turn,
                            columns: [1, 4, 7]
                        }
                    case turn === data.board[2] && turn === data.board[5] && turn === data.board[8]:
                        return {
                            status: 'finished',
                            thereIsWinner: true,
                            winnerTurn: turn,
                            columns: [2, 5, 8]
                        }
                    case turn === data.board[0] && turn === data.board[4] && turn === data.board[8]:
                        return {
                            status: 'finished',
                            thereIsWinner: true,
                            winnerTurn: turn,
                            columns: [0, 4, 8]
                        }
                    case turn === data.board[2] && turn === data.board[4] && turn === data.board[6]:
                        return {
                            status: 'finished',
                            thereIsWinner: true,
                            winnerTurn: turn,
                            columns: [2, 4, 6]
                        }
                    case this.checksIfBoardGameIsFull():
                        return {
                            status: 'finished',
                            thereIsWinner: false
                        }
                    default:
                        return {
                            status: 'active'
                        }
                }

            },

            markerColumn: function (columnPos) {
                var pos, turn;

                pos = parseInt(columnPos);

                if(data.board[pos] === 'empty') {

                    turn = data.turn;

                    data.board[pos] = turn;

                    return true;
                }

                return false;
            },

            moveToNextTurn: function () {
                var nextTrun;

                nextTrun = data.turn === 'x' ? 'o' : 'x' ;

                this.setTurnGame(nextTrun);
            },

            setTurnGame: function (turn) {
                data.turn = turn;
            },

            getTurnGame: function () {
                return data.turn;
            },

            getData: function () {
                return data;
            }
        }

    })(helperController);

    var controller = (function (UICtrl, coreCtrl, helperCtrl) {

        var DOM = UICtrl.getDOMstrings();

        var newGame = function (event) {
            var type;

            type = event.target.getAttribute('data-type');

            coreCtrl.setNameGame(type);

            UICtrl.clearBoardGame();

            UICtrl.setGameType(type);

            UICtrl.setGameStatus('playing');

            UICtrl.setGameTurn('x');

            UICtrl.setNotification('active');

            UICtrl.closeMenuFullScreen(type);
        }

        var markerColumn = function (event) {
            var pos, result, obj, turn;

            pos = event.target.getAttribute('data-pos');

            result = coreCtrl.markerColumn(pos);

            if(coreCtrl.getGameStatus() === 'active' && result) {

                turn = coreCtrl.getTurnGame();

                UICtrl.markerColumn(pos, turn);

                obj = checksIfGameIsFinished(turn);

                if(obj.status === 'finished') {

                    coreCtrl.setGameStatus('finished');
                    UICtrl.setGameStatus('finished');
                    UICtrl.setGameTurn('finished');

                    if(obj.thereIsWinner) {

                        UICtrl.markerColumnsWinner(obj);
                        UICtrl.setNotification('finished-winner', obj.winnerTurn);

                    } else {

                        UICtrl.setNotification('finished-draw', false);
                    }
                }

                if(obj.status === 'active') {

                    coreCtrl.moveToNextTurn();
                    UICtrl.setGameTurn(coreCtrl.getTurnGame());
                }
            }
        }

        var checksIfGameIsFinished = function (turn) {

            return coreCtrl.checksIfGameIsFinished(turn);
        }

        var setupEventListeners = function () {

            var newGameBtns = document.querySelectorAll(DOM.newGameBtn);

            helperCtrl.nodeListForEach(newGameBtns, function (btn, index) {

                btn.addEventListener('click', newGame);
            });

            document.querySelector(DOM.btnMenu).addEventListener('click', UICtrl.opneMenuFullScreen);

            document.querySelector(DOM.menuFullScreenClose).addEventListener('click', UICtrl.closeMenuFullScreen);

            var boardGameColumns = document.querySelectorAll(DOM.boardGameColumn);

            helperCtrl.nodeListForEach(boardGameColumns, function (column, index) {

                column.addEventListener('click', markerColumn);
            });

        }

        return {
            init: function () {
                setupEventListeners();
            }
        }

    })(UIController, coreController, helperController);

    controller.init();

})();