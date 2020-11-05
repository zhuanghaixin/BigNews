$(function () {
    //渲染文章类别

    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            if (res.code == 200) {
                const html = template('category_list', res)
                $('.category').html(html)
            }
        }
    })


    //选择图片更新
    $('#inputCover').on('change', function () {
        const imgFile = this.files[0]
        console.log(imgFile);
        const url = URL.createObjectURL(imgFile)
        console.log(url);
        $('.article_cover').attr('src', url)
    })

    //日期控件
    jeDate("#indate", {
        format: "YYYY-MM-DD",
        isTime: false,
        minDate: "2014-09-19 00:00:00",
        zIndex: 20000
    })
    $('.jebtns').on('click', function () {
        console.log(1);
        jeDate('#indate', {
            trigger: false,
            format: 'YYYY-MM-DD',
            zIndex: 20000
        })
    })
    //富文本控件
    const E = window.wangEditor
    const editor = new E('#div1')
    // 或者 const editor = new E( document.getElementById('div1') )
    editor.create()


    // 获取表单数据
    function getFormData(state) {
        const formData = new FormData($('form')[0]);
        console.log(formData)
        formData.append('content', editor.txt.html())
        formData.append('state', state);
        return formData
    }


    //发布
    $('.btn-release').on('click', function (e) {
        e.preventDefault()
        postAjax('已发布', function (res) {
            parent.$('ul.level02>li:eq(0)').trigger('click');
            window.location.href = './article_list.html'
        })
    })
    // 存为草稿
    $('.btn-draft').on('click', function (e) {
        e.preventDefault()
        postAjax('草稿', function (res) {
            parent.$('ul.level02>li:eq(0)').trigger('click');
            window.location.href = './article_list.html'
        })
    })

    //  发起请求
    function postAjax(state, callback) {
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: getFormData(state),
            contentType: false,
            processData: false,
            success: function (res) {
                callback(res)
            }
        })
    }

    // $('.btn-release').on('click', function (e) {
    //     e.preventDefault()
    //     $.ajax({
    //         type: 'post',
    //         url: BigNew.article_publish,
    //         data: getFormData('已发布'),
    //         contentType: false,
    //         processData: false,
    //         success: function (res) {

    //           console.log(res);
    //           if(res.code==200){
    //             alert('文章草稿保存成功');
    //               parent.$('ul.level02>li:eq(0)')
    //            parent.$('ul.level02>li:eq(0)').trigger('click');
    //               window.location.href = './article_list.html'
    //             }
    //         }
    //     })
    // })


    

})