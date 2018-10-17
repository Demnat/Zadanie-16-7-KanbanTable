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
        $columnDelete.click(function () {
            self.removeColumn();
        });

        $columnAddCard.click(function (event) {
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
    addCard: function (card) {
        this.$element.children('ul').append(card.$element);
    },
    removeColumn: function () {
        this.$element.remove();
    }
};