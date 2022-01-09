
{
  if ($('#problem_count').data('problem_count') === 0) {
    $('#choice').attr('class', 'hidden')
  }
}

{
  'use strict';

  $('.like_button').on('click', function(event) {
    if (event){
      event.preventDefault();
    }
    const problem_pk = $(this).data('id');

    $.ajax({
      'url': $(this).prop('action'),
      'type': $(this).prop('method'),
      'data': {
        'like_num': $('#likeCount_' + problem_pk).text().substr(0, 1),
      },
      'dataType': 'json',
    })
    .done(function(response){
      $('#likeCount_' + problem_pk).text(response.like_count + "いいね");
      $('#button_' + problem_pk).text(response.button);
    });
  });
}