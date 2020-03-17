// 修改密码js文件
// 点击修改密码按钮，触发事件
$('#btnModify').on('click',function(){
    // 获取所有的密码数据
    let userPass = $('input[name="userPass"]').val().trim();
    let newPass = $('input[name="newPass"]').val().trim();
    let confirmPass = $('input[name="confirmPass"]').val().trim();
    console.log(userPass,newPass,confirmPass)
    // 先判断是否填写完整
    if(userPass.length == 0) {
        alert('请输入原密码');
        return
    };
    if(newPass.length == 0) {
        alert('请输入新密码');
        return
    };
    if(confirmPass.length == 0) {
        alert('请输入确认密码');
        return
    };

    // 再发送ajax请求
    $.ajax({
        type:'PUT',
        url:'/users/password',
        data:{
            userPass:userPass,
            newPass:newPass,
            confirmPass:confirmPass
        },
        success:function(res){
            // 请求成功 就把页面重定向到登录页面
            location.href = '/admin/login.html'
        }
    })
})