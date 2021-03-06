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
            userAry.unshift(res);
            // userAry.push(res);
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

// 获取到编辑按钮里面的id
var userId;
// 点击编辑按钮，把用户信息显示在左侧页面里面  要使用事件委托
$('tbody').on('click','#edit',function(){
    userId = $(this).attr('data-id')
    // 先把添加用户改为编辑用户
    $('form h2').html('编辑用户')
    // 再把用户信息显示在左侧表单中
    let tr = $(this).parents('tr');
    $('#prev').attr('src',tr.find('img').attr('src'));
    $('#hiddenImg').val(tr.find('img').attr('src'))
    $('input[type="email"]').prop('disabled',true).val(tr.children().eq(2).text());
    $('input[name="nickName"]').val(tr.children().eq(3).text());
    $('input[name="password"]').prop('disabled',true);
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
});

// 点击完成编辑按钮，发送ajax请求
$('#editBtn').on('click',function(){
    // 获取到form表单里面的所有数据
    let data = $('form').serialize();
    // console.log(data)
    $.ajax({
        type:'PUT',
        url:'/users/'+userId,
        data:data,
        success:function(res){
            // console.log(res)
            // 根据索引，查找到数组里面的元素，再进行替换
            let index = userAry.findIndex((item => {
                return item._id == res._id
            }))
            userAry[index] = res;
            render();
            // 完成编辑后，把左侧的表单修改回来
            $('form h2').text('添加新用户');
            // 调用清除数据函数
            clearData()
            $('#hiddenImg').val('');
            // 将email和password输入框设为启用
            $('input[type="email"]').prop('disabled',false).val('');
            $('input[name="password"]').prop('disabled',false).val('');
            // 将编辑按钮隐藏，添加按钮显示
            $('#addBtn').show();
            $('#editBtn').hide();
            
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
            url:'/users/'+id,
            success:function(res){
                // 找到当前点击删除的索引
                let index = userAry.findIndex(item => item._id == res._id);
                // 根据索引删除数组元素
                userAry.splice(index,1);
                render()
            }
        })
    }
});

// 全选按钮
$('#checkAll').on('change',function(){
    $('tbody input').prop('checked',$(this).prop('checked'));
    if($(this).prop('checked')){
        $('#delMany').show();
    }else{
        $('#delMany').hide();
    }
})

// 复选按钮  使用事件委托
$('tbody').on('click','.check',function(){
    // 当选择的按钮长度等于所有复选按钮的长度时  全选按钮就选中
    let length = $('tbody input').length;
    let checkLength = $('tbody input:checked').length;
    // console.log(length,checkLength);
    $('#checkAll').prop('checked',length === checkLength);
    // 当选中状态的按钮长度大于1时，显示批量删除按钮  否则隐藏
    if(checkLength > 1){
        $('#delMany').show();
    }else{
        $('#delMany').hide();
    }
})

// 点击批量删除按钮  获取选中按钮里面的 id  发送ajax请求
$('#delMany').on('click',function(){
    // 定义一个空数组 用来存放选中状态的id
    let arr = [];
    // 我们需要获取被选中的元素  拿到它们的id值 但是id的值 在  需要遍历选中的元素的tr上面  在jQuery中学习的each方法
    $('.check:checked').each(function(index,item){
        // 获取被选中元素的id  把它push到arr里面去
        let id =  $(item).parents('tr').attr('data-id');
        arr.push(id);
    });
    // 在发送ajax请求之前，先提醒用户是否确认删除
    if(confirm('确定都要删除吗?')){
        // 确定删除后，发送ajax请求
        $.ajax({
            type:'delete',
            // 在这里把数组里面的id使用 join 方法 用 - 进行拼接成字符串
            url:'/users/' + arr.join('-'),
            success:function(res){
                // 返回回来的是一个数组  里面是对象  就是被删除的元素 先遍历数组 同样根据索引 删除 userArr 里面的元素 再render
                res.forEach(item => {
                    let index = userAry.findIndex(ele => item._id === ele._id);
                    // 根据索引，每次循环删除一个  最后再重新渲染页面
                    userAry.splice(index,1);
                    render();
                    $('#delMany').hide();
                })

            }
        })
    }
})


