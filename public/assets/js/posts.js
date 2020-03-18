
var cid = $('#classAll').val();
var state = $('#state').val();

// 显示文章  发送ajax请求
$.ajax({
    type: 'get',
    url: '/posts',
    data: {
        page: 1
    },
    success: function (res) {
        // console.log(res);
        let html = template('pTpl', { data: res.records });
        $('tbody').html(html);
        let pageHtml = template('pageTpl', res);
        $('.pagination').html(pageHtml);
    }
});

// 定义一个函数，实现点击分页
function changePage(index) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: index,
            category:cid,
            state:state
        },
        success: function (res) {
            // console.log(res);
            let html = template('pTpl', { data: res.records });
            $('tbody').html(html);
            let pageHtml = template('pageTpl', res);
            $('.pagination').html(pageHtml);
        }
    });
};

// 获取所有文章分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        // console.log(res)
        let html = template('searchTpl', { data: res });
        $('#classAll').append(html)
    }
});

// 点击筛选按钮，发送ajax请求，进行筛选
$('#search').on('click', function () {
    cid = $('#classAll').val();
    state = $('#state').val();
    // 向服务器发送ajax请求
    $.ajax({
        type:'get',
        url:'/posts',
        data:{
            category:cid,
            state:state
        },
        success:function(res){
            let html = template('pTpl', { data: res.records });
            $('tbody').html(html);
            let pageHtml = template('pageTpl', res);
            $('.pagination').html(pageHtml);
        }
    })
})

