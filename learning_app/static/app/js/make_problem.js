'use strict';

/* 分野と難易度の初期値を変更 */
{
  if ($('#display').prop('data-id') === 'make') {
      $('#id_subject').find('option').eq(0).remove();
      $('<option>')
        .text("問題の分野を選択してください")
        .prop({
          'selected': true,
          'value': -1,
        })
        .prependTo('#id_subject')

      $('#id_type').find('option').eq(0).remove();
      $('<option>')
        .text("問題の難易度を選択してください")
        .prop('selected', true)
        .prependTo('#id_type')
  }
}

/* 科目が選択された時にタイトルの選択肢を動的に変更 */
{
  $(document).on('change', '#id_subject', function(event) {
    if (event) {
      event.preventDefault();
    }

    $('#id_title').find('option').each(function (index, value){
      value.remove()
    })

    console.log($('#id_subject').val())
    $.ajax({
      'url': $('#get_title').prop('action'),
      'type': $('#get_title').prop('method'),
      'data': {
        'subject_id': $('#id_subject').val()
      },
      'dataType': 'json',
    })
    .done(function(response){
      $('<option>')
        .text("問題のタイトルを選択してください")
        .prop('selected', true)
        .appendTo('#id_title')

      $.each(response, function(index, value){
        $('<option>')
          .val(index)
          .text(value)
          .appendTo('#id_title');
      })
    })
    .fail(function() {
      $('<option>')
        .text("まず問題の分野を選択してください")
        .prop('selected', true)
        .prependTo('#id_title')
    });
  })
}

/* 作成完了ボタンを押した時に送信する部分のタグのform属性をdoneに変える */
{
  $(document.body).find('textarea, select, .answer, input')
    .each(function(){
      $(this).attr('form', 'done');
    })
}


/* 一つ目の選択肢がデフォルトで選択されている状態にする */
{
  if ($('#display').data('id') === 'make') {
    $('#answer-1').attr('checked', true);
    $('#form-set-1').append('<p id="is-correct" style="display:inline;">正解の選択肢</p>');
  }
  else {
    const correct_choice = $('#ans-choice').text().slice(-1)
    $(`#answer-${correct_choice}`).attr('checked', true);
    $(`#form-set-${correct_choice}`).append('<p id="is-correct" style="display:inline;">正解の選択肢</p>');
  }
}

/* 追加ボタンを押した時の挙動：フォーム・削除ボタン・ラジオボタン が追加される */
{
  $(document).on('click', '.add', function(event) {
    if (event) {
      event.preventDefault();
    }
    /* フォームの数 */
    const empty_form_count = $('.problem-form').length;
    console.log(empty_form_count)

    /* 選択肢の数の上限を８個に制限 */
    if (empty_form_count === 8) {
      alert("選択肢は８個以上増やせません");
      return
    }
  

    /* form_setにフォーム・削除ボタン・ラジオボタンをまとめる */
    const form_set = $('#form-set')
      .clone(true)
      .attr({
        id: `form-set-${empty_form_count + 1}`,
        class: 'form-set',
      })

    /* フォーム */
    const empty_form = $('#empty-form').clone(true);
    empty_form
      .attr({
        id: `form-${empty_form_count + 1}`,
        class: 'problem-form',
      })
      .html(empty_form.html().replace(/__prefix__/g, empty_form_count))
      .appendTo(form_set);

    /* 削除ボタン */
    $('#remove-button')
      .clone(true)
      .attr({
        id: `remove-${empty_form_count + 1}`,
        class: 'remove',
        'data-id': `${empty_form_count + 1}`
      })
      .appendTo(form_set);

    /* 答えの選択肢を選ぶボタン */
    $('#answer-button')
      .clone(true)
      .attr({
        id: `answer-${empty_form_count + 1}`,
        class: 'answer',
        name: 'answer',
        value: empty_form_count + 1,
      })
      .appendTo(form_set);

    /* フォーム・削除ボタン・ラジオボタンをまとめたform_setを追加 */
    form_set.appendTo($('#options'))
    $('#id_form-TOTAL_FORMS').attr('value', empty_form_count + 1);
  })
}

/* 削除ボタンを押した時にフォーム・削除ボタン・ラジオボタンを削除 */
{
  $(document).on('click', '.remove', function(event) {
    if (event) {
      event.preventDefault();
    }
    if ($('.problem-form').length <= 2){
      alert('選択肢は２個以上必要です');
      return
    }

    const id = $(this).data('id');
    for(var i = id; i <= $('.problem-form').length; i++){
      $(`#id_form-${i - 1}-content`).val($(`#id_form-${i}-content`).val());
    }

    $(`#form-set-${$('.problem-form').length}`).remove();
    $('#id_form-TOTAL_FORMS').attr('value', $('.problem-form').length);
  })
}

/* 正解の選択肢をラジオボタンで制御 */
{
  $(document).on('change', "input[type=radio][name=answer]", function() {
    $('#is-correct').remove()
    const answer = $("input[name='answer']:checked").val();
    $(`#form-set-${answer}`).append('<p id="is-correct" style="display:inline;">正解の選択肢</p>');
    $('#ans-choice').text(`正解の選択肢：${answer}`)
  })
}

/* 作成完了ボタンが押された時のエラー処理と確認 */
{
  /* エラー処理 */
  $('#done').submit(function(event) {
    if ($("input[name='answer']:checked").val() === undefined) {
      alert("正解の選択肢を選んでください");
      return false;
    }

    /* 確認の処理 */
    if (!confirm("問題作成を完了しますか？")) {
      return false;
    }
  })
}
{
  $(document).on('click','#remove-button', function() {
    if (!confirm('本当に削除しますか？')) {
      return false;
    }
  })
}
