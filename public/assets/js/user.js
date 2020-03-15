// 显示用户
let userAry = [];

// 发送ajax请求
$.ajax({
    type:'get',
    url:'/users',
    success:function(res){
        userAry = res;
        render()
    }
})

// 创建一个函数，渲染页面
function render(){
    let html = template('userTpl',{data:userAry});
    $('tbody').html(html)
};

// 图片上传功能  给avatar这个表单添加onchange事件
// 需要将图片的地址上传到数据库
$('#avatar').on('change',function(){
    let formData = new FormData();
    // $(this).files[0] 图片上传是一个数组，这个数组下标为0的就是当前上传的图片
    formData.append('avatar',this.files[0])
    // 发送ajax请求
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        // 只要是通过jquery中的ajax来实现文件上传的功能时，一定要设置下面的两个属性
        processData:false,
        contentType:false,
        success:function(res){
            // 将图片预览到页面上
            $('#prev').attr('src',res[0].avatar);
            // 将图片地址添加在隐藏域表单中
            $('#hiddenImg').val(res[0].avatar)
        }

    })
});

// 添加用户功能  给addBtn按钮添加点击事件
$('#addBtn').on('click',function(){
    // 先获取到表单提交的数据
    let userData = $('form').serialize();
    // console.log(userData)
    // 发送ajax请求
    $.ajax({
        type:'post',
        url:'/users',
        data:userData,
        success:function(res){
            // 将添加的数据追加到数组中去
            userAry.push(res);
            // 渲染页面
            render();
            // 清空数据
            clearData()
        },
        error:function(err){
            console.log(err)
        }
        
    })
});

// 定义一个函数，用来清空提交后的表单数据
function clearData(){
    $('#prev').attr('src','../assets/img/default.png');
    $('input[type="email"]').val('');
    $('input[name="nickName"]').val('');
    $('input[name="password"]').val('');
    $('input[name="status"]').prop('checked',false);
    $('input[name="status"]').prop('checked',false);
    $('input[name="role"]').prop('checked',false);
    $('input[name="role"]').prop('checked',false);
}

