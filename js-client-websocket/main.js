var stompClient = null;
var url = 'http://192.168.9.147:8000/ws';

function connect() {
    message('Starting websocket');

    var socket = new SockJS(url);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
}

function onConnected() {
    stompClient.subscribe('/application-event', messageReceiver);    
    document.getElementById('connect').disabled = true;
    document.getElementById('connect').style.color = "green";    
    message('Connected');
}

function onError(error) {
    document.getElementById('connect').disabled = false;
    message('Could not connect to ws server.');
}

messageReceiver = function (message) {
    document.getElementById("result").value += '\n\n' + message.body;
}

message = function (message) {
    document.getElementById("result").value += '\n\n' + message;
}
