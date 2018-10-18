//===============================
//===== COLUMN ==================
function Column(id, name) {
    var self = this; // dla zagnieżdżonych funkcji

    this.id = id;
    this.name = name || 'No name given';
    this.$element = createColumn();

    function createColumn() {
        // CREATING COMPONENTS OF COLUMNS
        var $column = $('<div>').addClass('index__board-columnContainer-column').data('id',self.id);
        var $columnHeader = $('<div>').addClass('index__board-columnContainer-column-header');
        var $headerTitle = $('<h2>').addClass('index__board-columnContainer-column-header-title').text(self.name);
        $columnHeader.append($headerTitle);
        var $columnDelete = $('<i>').addClass('index__board-columnContainer-column-header-icon icon-trash-empty board-btn-delete');
        $columnHeader.append($columnDelete);
        var $columnCardList = $('<ul>').addClass('index__board-columnContainer-column-cardList');
        var $columnAddCard = $('<button>').addClass('index__board-columnContainer-column-addCard').text('Add a card');

        // ADDING EVENTS
        $columnDelete.click(function () {
            self.removeColumn();
        });

        $columnAddCard.click(function (event) {
            var cardName = prompt("Enter the name of the card");
            event.preventDefault();
            $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                    name: cardName,
                    bootcamp_kanban_column_id: self.id
                },
                success: function(response) {
                    var card = new Card(response.id, cardName);
                    self.addCard(card); // w module self.createCard(card);
                }
            });

           // self.addCard(new Card(cardName));  // w materiale jest: self.createCard(new Card(prompt("Enter the name of the card")));
        });

        $headerTitle.click(function (event) {
            var title = prompt("Enter the name of the column");
            event.preventDefault();
            $.ajax({
                url: baseUrl + '/column/' + self.id,
                method: 'PUT',
                data: {
                    name: title,
                },
                success: function() {
                    self.name = title;
                    $headerTitle.text(self.name);
                }
            });

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
        var self = this;
        $.ajax({
        url: baseUrl + '/column/' + self.id,
        method: 'DELETE',
        success: function(response){  // nie ma odniesienia do response !!!!
            self.$element.remove();
        }
        });
        // this.$element.remove();
    }
    
};