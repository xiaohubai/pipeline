import router from '@/router'

// 获取标题
function getPageTitle(pageTitle) {
  return pageTitle? `${pageTitle} - ${import.meta.env.VITE_LOGO_NAME}` : `${import.meta.env.VITE_LOGO_NAME}`;
}

// 路由过滤
router.beforeEach(async (to) => {
  document.title = getPageTitle(to.meta.title);

  to.meta.matched = [...to.matched];

  if (to.name === 'login') {
    return true;
  }


  // 路由匹配检查
  return to.matched.length ? true : { path: '/404' };
});
