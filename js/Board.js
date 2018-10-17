//===============================
//===== BOARD ====================
function initSortable() {
    $('.index__board-columnContainer-column-cardList').sortable({
        connectWith: '.index__board-columnContainer-column-cardList',
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
        $boardDelete.click(function () {
            self.removeBoard();
        });

        $boardAddColumn.click(function (event) {
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
    addColumn: function (column) {
        this.$element.append(column.$element);
        initSortable();
    },
    removeBoard: function () {
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
    .click(function () {
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
            .click(function (e) {
                e.preventDefault();
                $('.index__boards-tab--active').removeClass('index__boards-tab--active');
                $boardLinkTab.parent().addClass('index__boards-tab--active');
                $('.index__board--active').removeClass('index__board--active');
                kanbanBoard.$element.parent().addClass('index__board--active');
            });
        $boardTab.append($boardLinkTab);

    });