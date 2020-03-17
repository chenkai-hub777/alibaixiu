
// 发起ajax请求，显示分类
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        // 写入模板
        let html = template('tTpl',{data:res});
        $('#category').html(html)
    }
});

// 图片上传功能
$('#feature').on('change',function(){
    let formData = new FormData();
    // $(this).files[0] 图片上传是一个数组，这个数组下标为0的就是当前上传的图片
    formData.append('img',this.files[0])
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
            $('#showImg').show().attr('src',res[0].img);
            // 将图片地址添加在隐藏域表单中
            $('#hidden').val(res[0].img)
        }

    })
})

// 点击保存按钮  发送ajax请求
$('#save').on('click',function(){
    // 先获取表单的内容数据
    let data = $('form').serialize();
    // 发送ajax请求
    $.ajax({
        type:'post',
        url:'/posts',
        data:data,
        success:function(res){
            location.href = 'posts.html';
        },
        error:function(err){
            console.log(err)
        }
    })
})