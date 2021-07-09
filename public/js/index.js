var $messages = $('.messages-content');
var serverResponse = "wala";

var suggession;
//speech reco
try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
}

$('#start-record-btn').on('click', function(e) {
  recognition.start();
});

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
 document.getElementById("MSG").value= speechToText;
  //console.log(speechToText)
  insertMessage()
}


function listendom(no){
  console.log(no)
  //console.log(document.getElementById(no))
document.getElementById("MSG").value= no.innerHTML;
  insertMessage();
}

$(window).load(function() {
  setTimeout(function() {
    serverMessage("hello i am customer support bot type hi and i will show you quick buttions");
  }, 100);

});


function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<span class="chat_msg_item chat_msg_item_user">' + msg + '</span>').appendTo($('.messages-content')).addClass('new');
  fetchmsg();
  
  $('.message-input').val(null);
  //updateScrollbar();

}

document.getElementById("mymsg").onsubmit = (e)=>{
  e.preventDefault() 
  insertMessage();
  // sending back message
  //serverMessage();
  // text to speech message
  //speechSynthesis.speak( new SpeechSynthesisUtterance("hello"))
}

function serverMessage(response2) {


  if ($('.message-input').val() != '') {
    return false;
  }
  
  //updateScrollbar();
  

  setTimeout(function() {
    $('<span class="chat_msg_item chat_msg_item_admin"><div class="chat_avatar"><img src="img/bot.png"/></div>' + response2 + '</span>').appendTo($('.messages-content')).addClass('new');
    //updateScrollbar();
  }, 100);

}


function fetchmsg(){

     var url = 'http://localhost:3000/send-msg';
      
      const data = new URLSearchParams();
      for (const pair of new FormData(document.getElementById("mymsg"))) {
          data.append(pair[0], pair[1]);
          console.log(pair)
      }
    
      console.log("abc",data);
        fetch(url, {
          method: 'POST',
          body:data
        }).then(res => res.json())
         .then(response => {
          console.log(response);
          serverMessage(response.Reply);
          speechSynthesis.speak( new SpeechSynthesisUtterance(response.Reply))
        
          
         })
          .catch(error => console.error('Error h:', error));

}


