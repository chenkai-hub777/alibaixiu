// 定义一个空的轮播数组
let slidesArr = [];
// 发送ajax请求 获取轮播列表
$.ajax({
    type:'get',
    url:'/slides',
    success:function(res){
        // console.log(res);
        slidesArr = res
        render()
    }
})

// 定义一个函数，渲染页面
function render(){
    let html = template('sTpl',{data:slidesArr});
    $('tbody').html(html)
};


// 图片上传功能  给avatar这个表单添加onchange事件
// 需要将图片的地址上传到数据库
$('#image').on('change',function(){
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
            $('#prev').show().attr('src',res[0].img);
            // 将图片地址添加在隐藏域表单中
            $('#hidden').val(res[0].img)
        }

    })
});

// 添加轮播功能  给addBtn按钮添加点击事件
$('#addBtn').on('click',function(){
    // 先获取到表单提交的数据
    let data = $('form').serialize();
    // console.log(userData)
    // 发送ajax请求
    $.ajax({
        type:'post',
        url:'/slides',
        data:data,
        success:function(res){
            // 将添加的数据追加到数组中去
            slidesArr.unshift(res);
            // userAry.push(res);
            // 渲染页面
            render();
            // 清空数据
            $('input[name="title"]').val('');
            $('input[name="link"]').val('');
            $('#hidden').val('');
            $('#image').val('');
            $('#prev').hide()

        },
        error:function(err){
            console.log(err)
        }
        
    })
});

// 删除单个用户  使用事件委托  给删除按钮绑定点击事件
$('tbody').on('click','.del',function(){
    let id = $(this).attr('data-id')
    if(confirm('确定要删除吗？')){
        // 确定删除，发送请求
        $.ajax({
            type:'delete',
            url:'/slides/'+id,
            success:function(res){
                // 找到当前点击删除的索引
                let index = slidesArr.findIndex(item => item._id == res._id);
                // 根据索引删除数组元素
                slidesArr.splice(index,1);
                render()
            }
        })
    }
});