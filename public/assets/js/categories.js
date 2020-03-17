// 文章列表js文件

// 定义一个空数组用来存放文章数据
let titleAry = []

// 点击添加按钮  添加文章
$('#addBtn').on('click',function(){
    // 先获取到名称和类 
    let title = $('input[name="title"]').val().trim();
    let className = $('input[name="className"]').val().trim();
    // 判断内容是否为空
    if(title.length == 0){
        alert('请输入名称');
        return;
    };
    if(className.length == 0){
        alert('请输入图标');
        return;
    };
    // 发送ajax请求
    $.ajax({
        type:'POST',
        url:'/categories',
        data:{
            title:title,
            className:className
        },
        success:function(res){
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
function render(){
    let html = template('cTpl',{data:titleAry});
    $('tbody').html(html)
};

// 显示文章列表
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        titleAry = res;
        render()
    }
});

// 全选按钮
$('#checkAll').on('change',function(){
    $('tbody input').prop('checked',$(this).prop('checked'))
});

// 复选按钮
$('tbody').on('click','.check',function(){
    // 当选择的按钮长度等于所有复选按钮的长度时  全选按钮就选中
    let length = $('tbody input').length;
    let checkLength = $('tbody input:checked').length;
    // console.log(length,checkLength);
    $('#checkAll').prop('checked',length === checkLength);
});

