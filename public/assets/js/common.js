// 退出登录功能
$('#logoutBtn').on('click',function(){
    let out = window.confirm('您确定要退出吗');
    if(out){
      $.ajax({
        type:'post',
        url:'/logout',
        success:function(res){
          location.href = '/admin/login.html'
        },
        error:function(res){
          alert('退出失败')
        }
      })
    }
  });

  // console.log(userId)
  // 向服务器端发送请求，索要登录信息
  $.ajax({
    type:'get',
    url:'/users/' + userId,
    success:function(res){
      console.log(res);
      // 获取头像并显示
      $('.profile .avatar').attr('src',res.avatar);
      // 显示用户名
      $('.profile h3').text(res.nickName)
    }

  })
