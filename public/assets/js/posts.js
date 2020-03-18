
var cid = $('#classAll').val();
var state = $('#state').val();

// 显示文章  发送ajax请求  重复代码，可以封装成一个函数
function render(cid, state, page) {
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
render(cid, state, 1)

// 自定义一个页码 默认为1
let currentPage = 1

// 定义一个函数，实现点击分页
function changePage(index) {
    // 把当前页码赋值给自定义页码
    currentPage = index;
    render(cid, state, index)
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
    render(cid, state)
});

// 点击删除按钮 发送ajax请求，删除文章
$('tbody').on('click', '.del', function () {
    let id = $(this).attr('data-id')
    // 先弹出确定删除
    if (confirm('确定要删除吗？')) {
        $.ajax({
            type: 'DELETE',
            url: '/posts/' + id,
            success: function (res) {
                // 最后一页tbody里面tr的只有一个了，删除过后，就应该让它跳到前一页
                if ($('tbody tr').length == 1) {
                    // 但是如果已经是第一页了，就不用减一了
                    if (currentPage == 1) {
                        render(cid, state, currentPage)
                    } else {
                        render(cid, state, --currentPage)
                    }
                }
                // 发送自定义页码，执行删除请求后，停留在当前页码
                render(cid, state, currentPage)
            }
        })
    }
})

