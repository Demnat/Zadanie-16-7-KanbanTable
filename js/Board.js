//===============================
//===== BOARD ====================
function initSortable() {
    $('.index__board-columnContainer-column-cardList').sortable({
        connectWith: '.index__board-columnContainer-column-cardList',
        placeholder: 'card-placeholder',
        update: function(event, ui) {
            
            $.ajax({
                url: baseUrl + '/card/' + ui.item.data('id'),
                method: 'PUT',
                data: {
                    name: ui.item.find('p').text(),
                    bootcamp_kanban_column_id: ui.item.parents('.index__board-columnContainer-column').data('id'),
                }
            });     

        }
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
            var columnName = prompt('Enter a column name');
            $.ajax({
                url: baseUrl + '/column',
                method: 'POST',
                data: {
                    name: columnName
                },
                success: function(response){
                    var column = new Column(response.id, columnName);
                    self.addColumn(column);  //w module board.createColumn(column);
                  }
            });
            
            // var column = new Column(name); //zmiana name na columnName
            // self.addColumn(column);
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

// 
$('.add-board')
    .click(function () {
        var name = prompt('Enter a board name');

        // CREATING BOARDS
        var kanbanBoard = new Board(name);

        //ADDING BOARD TO HTML
        kanbanBoard.$element.parent().appendTo($(".index"));

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

// CREATING BOARDS
var kanbanBoard = new Board('name');

//ADDING BOARD TO HTML
kanbanBoard.$element.parent().appendTo($(".index"));

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