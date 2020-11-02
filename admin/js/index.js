
$(function(){
    //判断是否携带token
    //请求用户信息数据
    $.ajax({
        type:'get',
        url:BigNew.user_info,
        // headers:{
        //     Authorization:window.localStorage.getItem('token')
        // },
        success:function(res){
            console.log(res)
            if (res.code == 200) {
                console.log(res)
                $('.user_info>img').attr('src', res.data.userPic);
                $('.user_info>span').text(`欢迎回来,${res.data.nickname}`);
                $('.user_center_link>img').attr('src', res.data.userPic);
            }
        },
        // error:function(jqXHR,textStatus,errorThrown){
        //     if(jqXHR){
        //         $("#myModal .modal-body").text('当前接口有问题');
        //         $('#myModal').modal()
        //         console.log('jqXHR...')
        //         console.log(jqXHR)
        //         console.log('jqXHR.readyState')
        //         console.log(jqXHR.readyState)
        //         console.log('jqXHR.status')
        //         console.log(jqXHR.status)
        //         console.log('jqXHR.statusText')
        //         console.log('jqXHR.statusText')
        //         console.log('jqXHR.responseText')
        //         console.log(jqXHR.responseText)
        //         console.log('textStatus...')
        //         console.log(textStatus)
        //         console.log('errorThrown...')
        //         console.log(errorThrown)
        //     }
        // }
    })
    //点击一级导航，显示选中状态
    $('.sider .menu .level01').on('click',function(){
        $(this)
            .addClass("active")
            .siblings("div")
            .removeClass("active");

    })
    //点击一级导航，显示二级导航
    $('.sider .menu .level01>a').on('click',function(){

       const $subMenu=$(this).parent().find('.level02')
       if($subMenu[0]){
           $subMenu.slideToggle()

           //箭头旋转
           $(this).parent()
               .find("b")
               .toggleClass("rotate0");

           //二级导航为选中状态
           $subMenu.find('li>a').eq(0)[0].click()
       }


    })
    //点击二级导航，显示选中状态
    $('.sider .menu .level02>li').on('click',function(){
        $(this)
            .addClass("active")
            .siblings("li")
            .removeClass("active");


    })



    $(".logout").on("click", function() {
        //2.删除token,跳转到登录页面
        window.localStorage.removeItem("token");
        window.location.href = "./login.html";
    });
})
