// 图片上传功能  给avatar这个表单添加onchange事件
// 需要将图片的地址上传到数据库
$('#logo').on('change', function () {
    let formData = new FormData();
    // $(this).files[0] 图片上传是一个数组，这个数组下标为0的就是当前上传的图片
    formData.append('img', this.files[0])
    // 发送ajax请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 只要是通过jquery中的ajax来实现文件上传的功能时，一定要设置下面的两个属性
        processData: false,
        contentType: false,
        success: function (res) {
            // 将图片预览到页面上
            $('#logoImg').attr('src', res[0].img);
            // 将图片地址添加在隐藏域表单中
            $('#hidden').val(res[0].img)
        }

    })
});

// 点击保存设置按钮  发送ajax请求
$('#save').on('click', function () {
    // 先将是否开启评论功能与是否开始人工批准功能的内容写入到我们定义的两个隐藏域
    $('#comment').val($('#comment_status').prop('checked'));
    $('#review').val($('#comment_reviewed').prop('checked'));

    // 获取表单的数据  把name设置在隐藏域中 获取到的则是隐藏域的值
    let data = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/settings',
        data: data,
        success: function (res) {
            location.reload();
        }
    })


});

// 向服务器发送请求 索要网址设置数据   把数据显示在设置页面上
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (res) {
        // console.log(res)
        if (res) {
            // 将图片地址存放在隐藏域中
            $('#hidden').val(res.logo)
            // 再把图片显示在页面上
            $('#logoImg').attr('src', res.logo);
            // 其他数据显示
            $('input[name="title"]').val(res.title);
            $('#comment').prop('checked',res.comment);
            $('#review').prop('checked',res.review);
        }
    }
})