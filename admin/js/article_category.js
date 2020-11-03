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
    // $('#add-btn-cancel').on('click', () => {
    //     $('#addModal').find('form')[0].reset()
    // })

    //更新数据
    $('#editModal').on('shown.bs.modal', function (e) {
        // console.log(this);
        console.log($(e.relatedTarget).parent().prev().prev().text());
        console.log($(e.relatedTarget).parent().prev().text());
        const name = $(e.relatedTarget).parent().prev().prev().text()
        const slug = $(e.relatedTarget).parent().prev().text();
        const id=$(e.relatedTarget).attr('data-id')
        $('#edit-name').val(name)
        $('#edit-slug').val(slug)
        $('#categoryId').val(id);

    })
    $('#edit-btn').on('click', function (e) {
        let id = +$('#categoryId').val()
        let name = $('#edit-name').val().trim()
        let slug = $('#edit-slug').val().trim()
        if (name == '' || slug == '') {
            alert('新增的文章类别和文章类别别名不能为空!');
            return
        }
        $.ajax({
            type: 'post',
            url: BigNew.category_edit,
            data: {
                id,
                name,
                slug
            },
            success: (res) => {
                console.log(res);
                if (res.code == 200) {
                    alert('新增成功!');
                    $('#editModal').modal('hide')
                    renderData()
                    $('#editModal').find('form')[0].reset()
                    return
                }
            }
        })

    })

    //删除数据
    
 
    $('tbody').on('click', 'a.btn-danger', function (e) {
        console.log('删除');
        
        console.log( $(this).attr('data-id'));

    })
    $('#deleteModal').on('shown.bs.modal', function (e) {

        let id=$(e.relatedTarget).attr('data-id')
        $('#delete-btn').on('click',function (e) {
            $.ajax({
                type: 'post',
                url: BigNew.category_delete,
                data: {
                    id
                },
                success: function (res) {
                    //console.log(backData);
                    if(res.code == 204){
                        alert('删除成功');
                        $('#deleteModal').modal('hide')
                        renderData(); 
                    }
                }
            });

        })

    })






})