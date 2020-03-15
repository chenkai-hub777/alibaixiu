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
})
