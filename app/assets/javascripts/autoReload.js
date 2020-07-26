$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat" data-message-id=${message.id}>
          <div class="chatinfo">
            <div class="chatinfo__user">
              ${message.user_name}
            </div>
            <div class="chatinfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="coment">
            <p class="coment__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
    return html;
  } else {
    let html =
    `<div class="chat" data-message-id=${message.id}>
      <div class="chatinfo">
        <div class="chatinfo__user">
          ${message.user_name}
        </div>
        <div class="chatinfo__date">
          ${message.created_at}
        </div>
      </div>
      <div class="coment">
        <p class="coment__content">
          ${message.content}
        </p>
      </div>
    </div>`
    return html;
  };
  }

  let reloadMessages = function() {
    let last_message_id = $('.chat:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {

        // let side = messages.content;
        // $('.Group__content').append(side);
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chatfield').append(insertHTML);
        $('.chatfield').animate({ scrollTop: $('.chatfield')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});