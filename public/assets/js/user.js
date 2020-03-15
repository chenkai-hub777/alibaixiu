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
}