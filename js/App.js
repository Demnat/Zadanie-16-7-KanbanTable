//zwraca strinng 10 losowych znaków z tablicy chars
function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '3461',
    'X-Auth-Token': 'dc60a460dbae44366d2c911537e7c6c8'
};

$.ajaxSetup({
	headers: myHeaders
});

function setupCards(col, cards) {
	cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.addCard(cardObj);
  	})
};

function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        kanbanBoard.addColumn(col);
        setupCards(col, column.cards);
    });
};

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
      setupColumns(response.columns);
    }
});