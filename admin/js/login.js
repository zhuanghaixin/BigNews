$(function () {

    $('.input_sub').on('click', function (e) {
        //阻止默认行为
        e.preventDefault()
        const userInfo = $('.input_txt').val().trim()
        const password = $('.input_pass').val().trim()
        console.log(userInfo)
        console.log(password)

        //校验
        if(userInfo=="" || password==""){
            // alert('用户名和密码不能为空')
            $("#myModal .modal-body").text("账号和密码不能为空!");
            $('#myModal').modal()
        }
        $.ajax({
            type:'post',
            url:BigNew.user_login,
            data:{
                username:userInfo,
                password:password
            },
            success:function(res){
                console.log(res)
                $("#myModal .modal-body").text(res.msg);
                $('#myModal').modal()
                if(res.code==200){
                    //跳转
                    //本地存储token
                    localStorage.setItem('token',res.token)
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        // do something...
                        window.location.href='./index.html'
                    })
                }
            },
            error:function(jqXHR,textStatus,errorThrown){

                if(jqXHR){
                    $("#myModal .modal-body").text('当前接口有问题');
                    $('#myModal').modal()
                    console.log('jqXHR...')
                    console.log(jqXHR)
                    console.log('jqXHR.readyState')
                    console.log(jqXHR.readyState)
                    console.log('jqXHR.status')
                    console.log(jqXHR.status)
                    console.log('jqXHR.statusText')
                    console.log('jqXHR.statusText')
                    console.log('jqXHR.responseText')
                    console.log(jqXHR.responseText)
                    console.log('textStatus...')
                    console.log(textStatus)
                    console.log('errorThrown...')
                    console.log(errorThrown)
                }
            }
        })
    })



})
