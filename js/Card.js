//===============================
//===== CARD ====================
function Card(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.$element = createCard();

    function createCard() {

        // CREATING THE BLOCKS
        var $card = $('<li>').addClass('index__board-columnContainer-column-cardList-card');
        var $cardDescription = $('<p>').addClass('index__board-columnContainer-column-cardList-card-description').text(self.name);
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
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function(){
                self.$element.remove();
            }
        });

        //this.$element.remove();
    }
};