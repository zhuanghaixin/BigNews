$(function () {
    function renderData() {
        $.ajax({
            type: 'get',
            url: BigNew.user_detail,
            success: function (res) {
                if (res.code == 200) {
                    // const {email,nickname,password,userPic,username} =res.data
                    // console.log(email)
                    // console.log(nickname)
                    // console.log(password)
                    // console.log(userPic)
                    // console.log(username)
                    const formData = new FormData($('#form')[0])
                    // console.log(formData)
                    console.log(res.data)
                    for (let key in res.data) {
                        $(`input.${key}`).val(res.data[key])
                    }
                    $("img.user_pic").attr("src", res.data.userPic);

                }
            },
            error: function (a, b, c) {
                console.log(a)
                console.log(b)
                console.log(c)
            }
        })
    }

    renderData()


    //图片预览
    $('#exampleInputFile').on('change', function (e) {
        const fileIcon = this.files[0]
        const url = URL.createObjectURL(fileIcon)
        $('img.user_pic').attr('src', url)
    })

    //点击修改
    $('button.btn-edit').on('click', function (e) {
        e.preventDefault()
        console.log(1)
        const formData = new FormData($('#form')[0])
        console.log(formData)
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            data: formData,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.code == 200) {
                    //弹出模态框
                    $("#myModal .modal-body").text(res.msg);
                    $('#myModal').modal()
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        $.ajax({
                            url: window.BigNew.user_info,
                            success: function (res) {
                                //console.log(backData);
                                if (res.code == 200) {

                                    //在最外级元素中获取
                                    parent.$('.user_info>img').attr('src', res.data.userPic);
                                    parent.$('.user_info>span').text(`欢迎回来,${res.data.nickname}`);
                                    parent.$('.user_center_link>img').attr('src', res.data.userPic);
                                }
                            }
                        })
                    })


                }
            },
            error: function (a, b, c) {
                console.log(a)
                console.log(b)
                console.log(c)
            }
        })
        console.log(2)

    })

})
