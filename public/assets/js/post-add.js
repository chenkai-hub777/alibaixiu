
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
});

// 封装一个函数  根据参数来返回对应的值  如果有就返回 如果没有就返回 -1
function getParams(key){
    // 先获取浏览器地址栏上面 ？ 后面的数据  即从？开始截取 然后再使用&将其分隔为数组
    let params = location.search.substr(1).split('&');
    // 得到一个数组  需要遍历数组
    for(var i = 0; i < params.length; i++){
        // 因为数组里面的元素形式为  key=value 将=截取
        let temp = params[i].split('=');

        // temp 是数组 它的0下标就可以用来和传递过来的参数作为对比  如果有 就把数组的第二个元素返回
        if(temp[0] === key){
            return temp[1]
        }
    }
    // 否则返回 -1
    return -1;
}
// 接下来调用函数
let id = getParams('id')

// 当id有返回值  即id 不等于 -1 时 发送ajax请求
if(id != -1){
    // 根据id返回文章的信息  把添加文章修改为编辑文章
    $.ajax({
        type:'get',
        url:'/posts/' + id,
        success:function(res){
            // 更改为编辑文章
            $('h1').text('编辑文章');
            $('#title').val(res.title);
            $('#content').val(res.content);
            $('.thumbnail').show().attr('src',res.thumbnail);
            $('#hidden').val(res.thumbnail);
            // 时间
            $('#created').val(res.createAt.substr(0,16));

            // 分类 先获取 id=category 下面所有的 option
            $('#category option').each(function(index,item){
                if($(item).attr('value') == res.category._id){
                    $(item).prop('selected',true)
                }
            });
            // 发布状态  
            $('#status option').each(function(index,item){
                if($(item).attr('value') == res.state){
                    $(item).prop('selected',true)
                }
            });

            // 隐藏添加按钮 显示编辑按钮
            $('#save').hide();
            $('#edit').show();

        }
    })
};

// 点击编辑按钮  发送ajax请求 完成编辑
$('#edit').on('click',function(){
    let data = $('form').serialize();
    $.ajax({
        type:'PUT',
        url:'/posts/' + id,
        data:data,
        success:function(res){
            location.href = 'posts.html'
        }
    })
});

