{
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    /* 符号のデータ配列 */
    var option_sign = ['+', '-', '×', '÷']
    var option_en = ['add', 'sub', 'mul', 'div']
    var option_ja = ['足し算', '引き算', 'かけ算', '割り算']
    var is_select = [false, false, false, false]
    var is_made = false

    /* --------------------------------------------------------- */
    /* 符号を追加する */
    $(document).on('click', '.add_sign', function(event) {
        const i = $(this).attr('id').slice(-1)
        if ($('#noSign_alert')) {
            $('#noSign_alert').remove()
        }
        if (is_select[i] || is_made) {
            return
        }
        else {
            is_select[i] = true
            $('<span></span>', {
                id: `${option_en[i]}_display_${i}`,
                'class': 'remove_sing_display',
            })
            .text(`${option_ja[i]}${option_sign[i]}|削除`)
            .appendTo($('#sign_list'))
        }
    })

    /* 符号が選択できていないことを表す関数 */
    function noSign_alert() {
        if (!$('#noSign_alert').length) {
            $('<span></span>', {
                id: 'noSign_alert'
            })
            .text("※どの符号の計算をするか選んでください")
            .appendTo($('#sign_list'))
        }
        return
    }

    /* 符号を取り消す */
    $(document).on('click', '.remove_sing_display', function(event) {
        if (is_made) {
            return
        }
        $(this).remove()
        const i = $(this).attr('id').slice(-1)
        is_select[i] = false
        if (selectedSign_count(is_select) === 0) {
            noSign_alert()
        }
    })

    /* --------------------------------------------------------- */
    /* 選ばれた符号の数を求める関数 */
    function selectedSign_count(is_select) {
        var divide = 0
        for (var i = 0; i < is_select.length; i++) {
            if (is_select[i]) {
                divide += 1
            }
        }
        return divide
    }

    /* 各問題に対してどの符号を用いるかランダムで選択 */
    function make_sign(sign_count) {
        var option = []
        for (var i = 0; i < is_select.length; i++) {
            if (is_select[i]) {
                option.push(option_sign[i])
            }
        }

        var sign = []
        var divide = selectedSign_count(is_select)
        const unit = 1 / divide
        for (var i = 0; i < sign_count; i++) {
            const rand_num = Math.random()
            var is_ok = false
            for (var j = 0; j < option.length; j++) {
                if (unit * j <= rand_num && rand_num < unit * (j + 1)) {
                    sign.push(option[j])
                    is_ok = true
                }
            }

            if (!is_ok) {
                sign.push('+')
            }
        }
        return sign
    }


    /* 数式を作る関数 */
    function create_formula(sign_list, i) {
        if (sign_list[i] === '÷') {
            html = `<span class='num_left'>${a_list[i] * b_list[i]}</span> ${sign_list[i]} <span class='num_right'>${b_list[i]}</span> = `
        }
        else {
            html = `<span class='num_left'>${a_list[i]}</span> ${sign_list[i]} <span class='num_right'>${b_list[i]}</span> = `
        }

        $('<p></p>', {
            'class': 'formula',
            id: `formula_${i}`
        })
        .html(html)
        .appendTo('#content')
    }


    /* 問題を実際に作成する */
    var sign_list = [], a_list = [], b_list = []
    $(document).on('click', '#btn_make_prob', function(event) {
        if (selectedSign_count(is_select) === 0) {
            noSign_alert()
            return
        }

        $('#show_result').attr({'class': 'show_result'})
        $('#btn_make_prob').attr({'class': 'hidden'})


        if (!is_made && selectedSign_count(is_select) !== 0) {
            is_made = true
            const problem_count = 10
            sign_list = make_sign(problem_count)
            for (var i = 0; i < problem_count; i++) {
                a_list.push(getRandomIntInclusive(1, 9))
                b_list.push(getRandomIntInclusive(1, 9))
            }

            for (var i = 0; i < 10; i++) {
                var html
                create_formula(sign_list, i)

                $('<input></input>', {
                    type: 'text',
                    'class': 'ans',
                    id: `ans_${i}`
                })
                .appendTo('#content')
                $('<br />').appendTo('#content')
            }
        }
    })

    /* --------------------------------------------------------- */
    /* 採点を行う */

    function score_test(problem_count) {
        var is_correct = [], correct_count = 0
        var correct
        for (var i = 0; i < problem_count; i++) {
            if (sign_list[i] === '+') {
                correct = a_list[i] + b_list[i]
            }
            if (sign_list[i] === '-') {
                correct = a_list[i] - b_list[i]
            }
            if (sign_list[i] === '×') {
                correct = a_list[i] * b_list[i]
            }
            if (sign_list[i] === '÷') {
                correct = a_list[i]
            }

            if (parseFloat($(`#ans_${i}`).val()) === correct) {
                is_correct.push(true)
                correct_count += 1
            }
            else {
                is_correct.push(false)
            }
        }
        return [is_correct, correct_count]
    }

    /* 採点結果を表示 */
    $(document).on('click', '#show_result', function(event) {
        if (event){
            event.preventDefault();
        }
        $('#show_result').attr('disabled', true)
        $('input').attr('disabled', true)

        problem_count = 10
        const [is_correct, correct_count] = score_test(problem_count)

        $('<p></p>')
        .text(`${correct_count}問正解です`)
        .appendTo($('#content'))

        for (var i = 0; i < problem_count; i++) {
            if (is_correct[i]) {
                $(`#formula_${i}`).addClass('green')
            }
            else {
                $(`#formula_${i}`).addClass('red')
            }
        }

        $.ajax({
            'url': $('#calTest_result').prop('action'),
            'type': $('#calTest_result').prop('method'),
            'data': {
                'correct_count': correct_count,
                'is_select': is_select,
            },
            traditional: true,
            'dataType': 'json',
        })
        .done(function(response){
        })
        .fail(function(){
        })
    })
}