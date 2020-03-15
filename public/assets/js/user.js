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

// 点击编辑按钮，把用户信息显示在左侧页面里面  要使用事件委托
$('tbody').on('click','#edit',function(){
    // 先把添加用户改为编辑用户
    $('form h2').html('编辑用户')
    // 再把用户信息显示在左侧表单中
    let tr = $(this).parents('tr');
    $('#prev').attr('src',tr.find('img').attr('src'));
    $('input[type="email"]').val(tr.children().eq(2).text());
    $('input[name="nickName"]').val(tr.children().eq(3).text());
    if(tr.children().eq(4).text() == '激活'){
        $('#status1').prop('checked',true);
    }else{
        $('#status0').prop('checked',true);
    }
    if(tr.children().eq(5).text() == '超级管理员'){
        $('#admin').prop('checked',true);
    }else{
        $('#normal').prop('checked',true);

    }
    // 点击编辑按钮，把添加用户按钮隐藏起来，把编辑用户按钮显示出来
    $('#addBtn').hide();
    $('#editBtn').show();
})

