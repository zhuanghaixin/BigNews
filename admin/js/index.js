
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

    //三: 首页左侧一级菜单设置点击事件
    $("div.level01").on("click", function() {
        //当前点击的设置一个active类,其他的兄弟移除active类.
        $(this)
            .addClass("active")
            .siblings("div")
            .removeClass("active");
        //如果你点击的是文章管理.
        if ($(this).index() == 1) {
            $("ul.level02").slideToggle(); //二级菜单显示就隐藏,隐藏就显示

            //设置小剑尖的旋转(其实就是设置有咩有rotate0类- 本质是c3的旋转动画)
            $(this)
                .find("b")
                .toggleClass("rotate0");

            //默认选中第一个二级菜单.
            $("ul.level02>li:eq(0)>a")[0].click();
            //jQuery对象的click()事件,他只会触发js单击事件,而不会触发a标签的默认跳转事件.
            //dom对象的click()事件,他不仅会触发js单击事件,还会触发a标签的默认跳转事件
        }
    });

    //四:首页左侧二级菜单设置点击事件
    $("ul.level02>li").on("click", function() {
        //当前点击的添加active类,其他的兄弟移除active类
        $(this)
            .addClass("active")
            .siblings("li")
            .removeClass("active");
    });
    //登出
    $(".logout").on("click", function() {
        //2.删除token,跳转到登录页面
        window.localStorage.removeItem("token");
        window.location.href = "./login.html";
    });
})
