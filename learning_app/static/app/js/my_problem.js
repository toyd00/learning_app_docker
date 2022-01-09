{
  $(document).on('click','#remove-button', function() {
    if (!confirm('本当に削除しますか？')) {
      return false;
    }
  })
}