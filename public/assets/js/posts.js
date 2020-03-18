
// 显示文章  发送ajax请求
$.ajax({
    type:'get',
    url:'/posts',
    data:{
        page:1
    },
    success:function(res){
        console.log(res);
        let html = template('pTpl',{data:res.records});
        $('tbody').html(html);
        let pageHtml = template('pageTpl',res);
        $('.pagination').html(pageHtml);
    }
});

// 定义一个函数，点击分页
function changePage(index){
    $.ajax({
        type:'get',
        url:'/posts',
        data:{
            page:index
        },
        success:function(res){
            console.log(res);
            let html = template('pTpl',{data:res.records});
            $('tbody').html(html);
            let pageHtml = template('pageTpl',res);
            $('.pagination').html(pageHtml);
        }
    });
}
