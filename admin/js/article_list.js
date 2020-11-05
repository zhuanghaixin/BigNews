$(function () {
  //todo 渲染多选
  $.ajax({
    type: 'get',
    url: BigNew.category_list,
    success: function (res) {
      if (res.code == 200) {
        let html = template('category_list', res);
        $('#selCategory').html(html)
      }
    }
  })

  //封装渲染函数
  function renderData(currentPage, callback) {
    console.log('callback')
    console.log(callback)
    console.log(currentPage);
    $.ajax({
      type: 'get',
      url: BigNew.article_query,
      data: {
        type: $('#selCategory').val(),
        state: $('#selStatus').val(),
        page: currentPage, //当前显示页
        perpage: 3 //当前页显示多少篇文章
      },
      success: function (res) {
        console.log('res...');
        console.log(res);
        if (res.code == 200) {
          const html = template('article_list', res.data)
          $('tbody').html(html)
          if (res.data.data.length != 0 && callback != null) {
            $('#pagination').show().next('p').hide();
            console.log('第一种')
            callback(res)

          } else if (res.data.totalPage == 0) {
            console.log('第二种')
            $('#pagination-demo').hide().next('p').show();
          } else if (res.data.totalPage == currentPage - 1 && res.data.data
            .length == 0) {
            //满足这两个条件,就说明当前你删的是最后一页的最后一条.
            //重绘页码条
            console.log('第三种')
            currentPage -= 1;
            $('#pagination-demo').twbsPagination('changeTotalPages',
              res.data.totalPage, currentPage);
          }

        }
      }

    })
  }

  // todo 渲染数据
  let currentPage = 1
  renderData(currentPage, function (res) {
    console.log('resXXXXXX');
    console.log(res);
    $('#pagination-demo').twbsPagination({
      totalPages: res.data.totalPage,
      visiblePages: 7,
      currentPage: 1,
      first: '第一页',
      prev: '上一页',
      next: '下一页',
      last: '最后一页',
      onPageClick: function (event, page) {
        console.log(page);
        // 点击哪一页,渲染哪一页的数据
        //如果当前页面与起始页面不一样，发送ajax请求
        currentPage = page //把当前点击的页码给保存起来.
        renderData(currentPage, null) //后面不执行操作
      }
    })
  })
  // 筛选
  $('#btnSearch').on('click', function (e) {
    e.preventDefault()
    currentPage = 1

    renderData(currentPage, function (res) {
      //重绘页码条
      $('#pagination-demo').twbsPagination('changeTotalPages',
        res.data.totalPage, 1);
    })
  })

  //删除
  $('tbody').on('click', 'a.delete', function (e) {
    e.preventDefault();
    let id = $(this).attr('data-id')
    if (confirm('你确定删除吗')) {
      $.ajax({
        type: 'post',
        url: BigNew.article_delete,
        data: {
          id
        },
        success: function (res) {
          console.log('删除。。。res');
          console.log(res);
          if (res.code == 204) {
            alert('删除成功!');
            renderData(currentPage, function (res) {
              $('#pagination-demo').twbsPagination('changeTotalPages',
                res.data.totalPage, currentPage)
            })
          }

        }
      })
    }
  })

  //文章发表 跳转
  $('#release_btn').on('click',function(e){
    parent.$('.level02>li').eq(1).trigger('click')
  })



  // // todo 渲染数据
  // let currentPage = 1
  // $.ajax({
  //     type: 'get',
  //     url: BigNew.article_query,
  //     data: {
  //         type: $('#selCategory').val(),
  //         state: $('#selStatus').val(),
  //         page: currentPage, //当前显示页
  //         perpage: 3 //当前页显示多少篇文章
  //     },
  //     success: function (res) {
  //         // todo 渲染整个文章列表
  //         if (res.code == 200) {
  //             const html = template('article_list', res.data)
  //             $('tbody').html(html)
  //             // 生成分页器
  //             $('#pagination-demo').twbsPagination({
  //                 totalPages: res.data.totalPage,
  //                 visiblePages: 7,
  //                 currentPage: 1,
  //                 first: '第一页',
  //                 prev: '上一页',
  //                 next: '下一页',
  //                 last: '最后一页',
  //                 onPageClick: function (event, page) {
  //                     // 点击哪一页,渲染哪一页的数据
  //                     //如果当前页面与起始页面不一样，发送ajax请求
  //                     currentPage = page //把当前点击的页码给保存起来.
  //                     $.ajax({
  //                         type: 'get',
  //                         url: BigNew.article_query,
  //                         data: {
  //                             type: $('#selCategory').val(), //选中的文章分类
  //                             state: $('#selStatus').val(), //选中的文章状态
  //                             visiblePages: 7,
  //                             page: page, //当前点击的页码
  //                             perpage: 3 //当前页显示多少篇文章
  //                         },
  //                         success: function (res) {
  //                             if (res.code == 200) {
  //                                 let html = template('article_list', res.data);
  //                                 $('tbody').html(html);
  //                             }
  //                         }
  //                     })

  //                 }
  //             })
  //         }
  //     }
  // })

  // // todo 筛选功能
  // $('#btnSearch').on('click', function (e) {
  //     e.preventDefault();
  //     $.ajax({
  //         type: 'get',
  //         url: BigNew.article_query,
  //         data: {
  //             type: $('#selCategory').val(),
  //             state: $('#selStatus').val(),
  //             page: currentPage, //当前显示页
  //             perpage: 3 //当前页显示多少篇文章
  //         },
  //         success: function (res) {
  //             if (res.code == 200) {
  //                 // 通过模板引擎渲染
  //                 console.log(res);
  //                 let html = template('article_list', res.data);
  //                 $('tbody').html(html);

  //                 //有数据则显示分页器
  //                 if (res.data.data.length > 0) {
  //                     //pagination插件使用
  //                     //改变了搜索条件,总的页码就有可能会发生改变,那就要重绘页码条.
  //                     //第一个参数是事件名字
  //                     //第二个参数是新的总页码
  //                     //第三个参数是当前页码
  //                     $('#pagination-demo').show().next('p').hide();
  //                     $('#pagination-demo').twbsPagination('changeTotalPages',
  //                         res.data.totalPage, 1);
  //                 } else {
  //                     $('#pagination-demo').hide().next('p').show();
  //                 }

  //             }
  //         }
  //     })
  // })


  // // todo 删除
  // $('tbody').on('click', 'a.delete', function () {

  //     //获取id
  //     let id = $(this).attr('data-id')
  //     if (confirm('你是否删除吗？')) {
  //         $.ajax({
  //             type: 'post',
  //             url: BigNew.article_delete,
  //             data: {
  //                 id
  //             },
  //             success: function (res) {
  //                 if (res.code == 204) {
  //                     alert('删除成功')
  //                     //发送请求
  //                     $.ajax({

  //                         type: 'get',
  //                         url: BigNew.article_query,
  //                         data: {
  //                             type: $('#selCategory').val(),
  //                             state: $('#selStatus').val(),
  //                             page: currentPage, //当前显示页
  //                             perpage: 3 //当前页显示多少篇文章
  //                         },
  //                         success: function (res) {
  //                             if (res.code == 200) {
  //                                 // 通过模板引擎渲染
  //                                 let html = template('article_list', res.data);
  //                                 $('tbody').html(html);

  //                                 console.log('res.data');
  //                                 console.log(res.data);
  //                                 console.log('currentPage');
  //                                 console.log(currentPage);
  //                                 //有数据则显示分页器,无数据则不显示
  //                                 if (res.data.totalPage == 0) {
  //                                     $('#pagination-demo').hide().next('p').show();

  //                                 } else if (res.data.data.length != 0) {
  //                                     //pagination插件使用
  //                                     //改变了搜索条件,总的页码就有可能会发生改变,那就要重绘页码条.
  //                                     //第一个参数是事件名字
  //                                     //第二个参数是新的总页码
  //                                     //第三个参数是当前页码
  //                                     $('#pagination-demo').twbsPagination('changeTotalPages',
  //                                         res.data.totalPage, currentPage);
  //                                 } else if (res.data.data.length == 0) {
  //                                     currentPage -= 1
  //                                     $('#pagination-demo').twbsPagination(
  //                                         'changeTotalPages',
  //                                         res.data.totalPage,
  //                                         currentPage
  //                                     )
  //                                 }
  //                             }
  //                         }
  //                     })

  //                 }
  //             }
  //         })
  //     }


  // })

})
