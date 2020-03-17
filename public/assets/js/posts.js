
// 显示文章  发送ajax请求
$.ajax({
    type:'get',
    url:'/posts',
    data:{
        page:1
    },
    success:function(res){
        // console.log(res);
        let html = template('pTpl',{data:res.records});
        $('tbody').html(html)
    }
})
