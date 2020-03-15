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
  })