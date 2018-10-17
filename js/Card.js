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
        $cardDelete.click(function () {
            self.removeCard();
        });

        // COMBINING BLOCKS AND RETURNING THE CARD
        $card.append($cardDelete)
            .append($cardDescription);

        return $card;

    }

};

Card.prototype = {
    removeCard: function () {
        this.$element.remove();
    }
};