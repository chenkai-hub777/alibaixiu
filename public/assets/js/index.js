// 发起请求  获取文章数量
$.ajax({
    type:'get',
    url:'/posts/count',
    success:function(res){
        // console.log(res);
        $('#txt').html('<strong>'+res.postCount+'</strong>篇文章（<strong>'+res.draftCount+'</strong>篇草稿）')
    }
});

// 发送请求 获取分类数量
$.ajax({
    type:'get',
    url:'/categories/count',
    success:function(res){
        // console.log(res);
        $('#cla').html('<strong>'+ res.categoryCount +'</strong>个分类')
    }
});

// 发送请求，查询评论数量
$.ajax({
    type:'get',
    url:'/comments/count',
    success:function(res){
        console.log(res);
        $('#comments').html('<strong>'+res.commentCount+'</strong>条评论')
    }
})
