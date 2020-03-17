// 分类列表js文件

// 定义一个空数组用来存放分类数据
let titleAry = []

// 点击添加按钮  添加分类
$('#addBtn').on('click', function () {
    // 先获取到名称和类 
    let title = $('input[name="title"]').val().trim();
    let className = $('input[name="className"]').val().trim();
    // 判断内容是否为空
    if (title.length == 0) {
        alert('请输入名称');
        return;
    };
    if (className.length == 0) {
        alert('请输入图标');
        return;
    };
    // 发送ajax请求
    $.ajax({
        type: 'POST',
        url: '/categories',
        data: {
            title: title,
            className: className
        },
        success: function (res) {
            // 添加的元素 push 到数组里面去
            titleAry.push(res);
            render();
            // 再把名称和图标清空
            $('input[name="title"]').val('');
            $('input[name="className"]').val('')
        }
    })
});

// 定义一个render函数用来渲染页面
function render() {
    let html = template('cTpl', { data: titleAry });
    $('tbody').html(html)
};

// 显示分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        titleAry = res;
        render()
    }
});

let classId;
// 编辑分类  点击编辑按钮 将信息展示出来
$('tbody').on('click', '#edit', function () {
    classId = $(this).parent().attr('data-id');
    $('form h2').text('编辑分类');
    // 把分类信息展示在右侧
    let tr = $(this).parents('tr');
    $('input[name="title"]').val(tr.children().eq(1).text());
    $('input[name="className"]').val(tr.children().eq(2).text());
    // 添加按钮隐藏  编辑按钮显示
    $('#addBtn').hide();
    $('#editBtn').show()
});

// 点击完成编辑按钮 发送ajax请求
$('#editBtn').on('click', function () {
    // 发送ajax请求
    $.ajax({
        type: 'put',
        url: '/categories/' + classId,
        data: {
            title: $('input[name="title"]').val(),
            className: $('input[name="className"]').val()
        },
        success: function (res) {
            let index = titleAry.findIndex(item => item._id == res._id);
            titleAry[index] = res;
            render();
            // 再把编辑分类修改回添加分类并清空表单
            $('form h2').text('添加分类');
            $('input[name="title"]').val('');
            $('input[name="className"]').val('');
            // 添加按钮显示  编辑按钮隐藏
            $('#addBtn').show();
            $('#editBtn').hide();
        }
    })

});

// 删除单个用户
$('tbody').on('click', '#del', function () {
    let id = $(this).parent().attr('data-id')
    if (confirm('确定要删除吗？')) {
        // 发现请求
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function (res) {
                let index = titleAry.findIndex(item => item._id == res._id);
                titleAry.splice(index, 1);
                render();
            }
        })
    }

});


// 全选按钮
$('#checkAll').on('change', function () {
    $('tbody input').prop('checked', $(this).prop('checked'));
    if ($(this).prop('checked')) {
        // 显示批量删除按钮
        $('#delMany').show();
    } else {
        $('#delMany').hide();
    }
});

// 复选按钮
$('tbody').on('click', '.check', function () {
    // 当选择的按钮长度等于所有复选按钮的长度时  全选按钮就选中
    let length = $('tbody input').length;
    let checkLength = $('tbody input:checked').length;
    // console.log(length,checkLength);
    $('#checkAll').prop('checked', length === checkLength);
    // 当复选按钮选中大于1时，显示批量删除
    if(checkLength > 1){
        $('#delMany').show();
    }else{
        $('#delMany').hide();
    }
});

// 批量删除  
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
            url:'/categories/' + arr.join('-'),
            success:function(res){
                // 返回回来的是一个数组  里面是对象  就是被删除的元素 先遍历数组 同样根据索引 删除 userArr 里面的元素 再render
                res.forEach(item => {
                    let index = titleAry.findIndex(ele => item._id === ele._id);
                    // 根据索引，每次循环删除一个  最后再重新渲染页面
                    titleAry.splice(index,1);
                    render();
                    $('#delMany').hide();
                })

            }
        })
    }
})

