var socket = io();
$('#messageForm').submit(function(){
    
    socket.emit('send message', $('#text').val());
    $('#text').val('');
    return false;
});

socket.on('new message', function(data){
    $('.chatBox').prepend(`<div class='rowMessage'><span><b>${data[0]} : </b></span><span> ${data[1]}<span></div>`);
})

socket.on('get users', function(data){
    var html = '';
    data.forEach(function(element) {
        html += '<li><b>'+element+'</b></li>';
    });
    
    $('#userList').html(html);
})