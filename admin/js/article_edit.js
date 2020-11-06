$(function () {
  //获取文章id
  console.log(window.location.search);
  let articleId = window.location.search.split('=')[1];
  //渲染文章类别
  const ajax1 = () => {
    $.ajax({
      type: 'get',
      url: BigNew.category_list,
      success: function (res) {
        console.log(res);
        if (res.code == 200) {
          const html = template('category_list', res)
          console.log(html);
          $('.category').html(html)
        }
      }
    })
  }
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

  //渲染文章类别之后再发起根据id获取文章信息发起ajax
  $.when(ajax1()).done(function () {
    $.ajax({
      type: 'get',
      url: BigNew.article_search,
      data: {
        id: articleId
      },
      success: function (res) {
        if (res.code == 200) {
          $('#inputTitle').val(res.data.title); //文章标题
          $('#inputCover').prev('img').attr('src', res.data
            .cover); //文章封面图片
          $('select.category').val(res.data.categoryId); //文章类别
          $('#indate').val(res.data.date); //文章发布时间
          editor.txt.html(res.data.content); //文章内容
        }
      }
    })
  })


  // 获取表单数据
  function getFormData(state) {
    const formData = new FormData($('form')[0]);
    console.log(formData)
    formData.append('content', editor.txt.html())
    formData.append('state', state);
    formData.append('id',articleId)
    return formData
  }
  //修改之后发起修改
  $('.btn-edit').on('click', function (e) {
    e.preventDefault()
    postAjax('已发布', function (res) {
      parent.$('ul.level02>li:eq(0)').trigger('click');
      window.location.href = './article_list.html'
    })
  })
  //存为草稿的ajax请求
  $('.btn-draft').on('click', function (e) {
    e.preventDefault()
    postAjax('已发布', function (res) {
      parent.$('ul.level02>li:eq(0)').trigger('click');
      window.location.href = './article_list.html'
    })

  })

  function postAjax(state, callback) {
    $.ajax({
      type: 'post',
      url: BigNew.article_edit,
      data: getFormData(state),
      contentType: false,
      processData: false,
      success: function (res) {
        console.log(res);
        callback(res)
      }
    })
  }


})