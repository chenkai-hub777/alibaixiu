
var cid = $('#classAll').val();
var state = $('#state').val();

// 显示文章  发送ajax请求  重复代码，可以封装成一个函数
function render(cid,state,page){
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page,
            category: cid,
            state: state
        },
        success: function (res) {
            // console.log(res);
            let html = template('pTpl', { data: res.records });
            $('tbody').html(html);
            let pageHtml = template('pageTpl', res);
            $('.pagination').html(pageHtml);
        }
    });
}

// 先直接调用
render(cid,state,1)


// 定义一个函数，实现点击分页
function changePage(index) {
    render(cid,state,index)
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
    render(cid,state)
})

