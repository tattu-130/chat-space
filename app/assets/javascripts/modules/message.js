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

  $('.form').on('submit',function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chatfield').append(html);
      $('.chatfield').animate({ scrollTop: $('.chatfield')[0].scrollHeight});
      $('form')[0].reset();
      $(".btn").prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});