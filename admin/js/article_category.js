$(function () {
    function renderData() {
        $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    const html = template('article_categoryt_list', res)
                    $('tbody').html(html)
                }
            }
        })
    }
    //渲染数据
    renderData()

    //一开始模态框是隐藏的
    //新增数据
    //点击确定，发送ajax请求
    $('#add-btn').on('click', () => {
        let name = $('#add-name').val().trim()
        let slug = $('#add-slug').val().trim()
        if (name == '' || slug == '') {
            alert('新增的文章类别和文章类别别名不能为空!');
            return
        }
        $.ajax({
            type: 'post',
            url: BigNew.category_add,
            data: {
                name,
                slug
            },
            success: (res) => {
                console.log(res);
                if (res.code == 201) {
                    alert('新增成功!');
                    $('#addModal').modal('hide')
                    renderData()
                    $('#addModal').find('form')[0].reset()
                    return
                }
            }
        })


    })

    $('#add-btn-cancel').on('click', () => {
        $('#addModal').find('form')[0].reset()
    })



    //更新数据
    // $('tbody').on('click', 'a.btn-info', function (e) {
    //     console.log('编辑');
    // })
    $('#editModal').on('show.bs.modal', function () {
        console.log(2);
    })


    //删除数据
    // $('tbody').on('click', 'a.btn-danger', function (e) {
    //     console.log('删除');
    // })

    $('#deleteModal').on('show.bs.modal', function () {

    })




})
