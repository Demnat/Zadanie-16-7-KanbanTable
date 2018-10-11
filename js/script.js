$(function() {
    
    //zwraca strinng 10 losowych znaków z tablicy chars
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    };

    //===============================
    //===== COLUMN ==================
    function Column(name) {
        var self = this; // dla zagnieżdżonych funkcji
    
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();
    
        function createColumn() {
            // CREATING COMPONENTS OF COLUMNS
            var $column = $('<div>').addClass('index__board-columnContainer-column');
            var $columnHeader = $('<div>').addClass('index__board-columnContainer-column-header');
            $columnHeader.append($('<h2>').addClass('index__board-columnContainer-column-header-title').text(self.name));
            var $columnDelete = $('<i>').addClass('index__board-columnContainer-column-header-icon icon-trash-empty board-btn-delete');
            $columnHeader.append($columnDelete);
            var $columnCardList = $('<ul>').addClass('index__board-columnContainer-column-cardList');
            var $columnAddCard = $('<button>').addClass('index__board-columnContainer-column-addCard').text('Add a card');
        
            // ADDING EVENTS
            $columnDelete.click(function() {
                self.removeColumn();
            });
            
            $columnAddCard.click(function(event) {
                self.addCard(new Card(prompt("Enter the name of the card")));
            });
        
            // CONSTRUCTION COLUMN ELEMENT
            $column.append($columnHeader)
                // .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
        
            // RETURN OF CREATED COLUMN
            return $column;
        
        }

    };

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };

    //===============================
    //===== CARD ====================
    function Card(description) {
        var self = this;
    
        this.id = randomString();
        this.description = description;
        this.$element = createCard();
    
        function createCard() {
            
            // CREATING THE BLOCKS
            var $card = $('<li>').addClass('index__board-columnContainer-column-cardList-card');
            var $cardDescription = $('<p>').addClass('index__board-columnContainer-column-cardList-card-description').text(self.description);
            var $cardDelete = $('<i>').addClass('index__board-columnContainer-column-cardList-card-icon icon-trash-empty');
        
            // BINDING TO CLICK EVENT
            $cardDelete.click(function(){
                self.removeCard();
            });
        
            // COMBINING BLOCKS AND RETURNING THE CARD
            $card.append($cardDelete)
                 .append($cardDescription);
        
            return $card;
        
        }

    };

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    };

    //===============================
    //===== BOARD ====================
    function initSortable() {
        $('.column-card-list').sortable({
          connectWith: '.column-card-list',
          placeholder: 'card-placeholder'
        }).disableSelection();
    }
    
    function Board(name) {

        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createBoard();

        function createBoard() {
            
            // CREATING COMPONENTS OF BOARD
            $('.index__board--active').removeClass('index__board--active');                      
            var $board = $('<div>').addClass('index__board index__board index__board--active').attr('id', self.id);
            var $boardHeader = $('<div>').addClass('index__board-header');
            $boardHeader.append($('<h1>').addClass('index__board-header-title').text(self.name));
            var $boardDelete = $('<i>').addClass('index__board-header-icon icon-trash-empty board-btn-delete');
            $boardHeader.append($boardDelete);
            var $boardAddColumn = $('<button>').addClass('index__board-btn create-column').text('Add a column');
            var $columnsContainer = $('<div>').addClass('index__board-columnContainer');

            // ADDING EVENTS
            $boardDelete.click(function() {
                self.removeBoard();
            });
            
            $boardAddColumn.click(function(event) {
                var name = prompt('Enter a column name');
                var column = new Column(name);
                self.addColumn(column);
            });
        
            // CONSTRUCTION BOARD ELEMENT
            $board.append($boardHeader)
                .append($boardAddColumn)
                .append($columnsContainer);
        
            // RETURN OF CREATED COLUMN
            return $columnsContainer;
        
        }

    };

    Board.prototype = {
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        removeBoard: function() {
            this.$element.parent().remove();
        }
    };

    // var board = {
    //     name: 'Kanban Board',
    //     addColumn: function(column) {
    //       this.$element.append(column.$element);
    //       initSortable();
    //     },
    //     $element: $('#board .column-container')
    // };

    // $('.create-column')
    // .click(function(){
    //     var name = prompt('Enter a column name');
    //     var column = new Column(name);
    //         board.addColumn(column);
    // });

    $('.add-board')
    .click(function(){
        var name = prompt('Enter a board name');
             
        // CREATING BOARDS
        var kanbanBoard = new Board(name);
        
        //ADDING BOARD TO HTML
        kanbanBoard.$element.parent().appendTo($(".index"));

         // CREATING COLUMNS
        var todoColumn = new Column('To do');
        var doingColumn = new Column('Doing');
        var doneColumn = new Column('Done');

        // ADDING COLUMNS TO THE BOARD
        kanbanBoard.addColumn(todoColumn);
        kanbanBoard.addColumn(doingColumn);
        kanbanBoard.addColumn(doneColumn);

        // CREATING CARDS
        var card1 = new Card('New task');
        var card2 = new Card('Create kanban boards');

        // ADDING CARDS TO COLUMNS
        todoColumn.addCard(card1);
        doingColumn.addCard(card2);

        //CREATING TAB
        $('.index__boards-tab--active').removeClass('index__boards-tab--active');
       
        // connects li to tabs ul
        var $boardTab = $('<li>').addClass('index__boards-tab index__boards-tab--active')
                                 .prependTo($('.index__boards')); 
        var $boardLinkTab = $('<a>').addClass('index__boards-tab-link')
                                    .text(kanbanBoard.name)
                                    .attr('href', '#' + kanbanBoard.id)
                                    .click(function(e){
                                            e.preventDefault();
                                            $('.index__boards-tab--active').removeClass('index__boards-tab--active');
                                            $boardLinkTab.parent().addClass('index__boards-tab--active');
                                            $('.index__board--active').removeClass('index__board--active');  
                                            kanbanBoard.$element.parent().addClass('index__board--active');
                                        });
        $boardTab.append($boardLinkTab);

    });

})