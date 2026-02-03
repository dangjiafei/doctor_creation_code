// 分页按钮功能
document.addEventListener('DOMContentLoaded', function() {
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活动状态
            pageBtns.forEach(page => page.classList.remove('active'));
            // 添加当前活动状态
            btn.classList.add('active');
        });
    });
});

// 跳转到指定页码功能已移除，因为当前分页组件没有输入框
// 如果需要添加跳转到指定页码功能，请先在HTML中添加对应的输入框元素

// 初始化菜单交互
function initializeMenu() {
    // 根据当前URL设置菜单项激活状态
    const currentUrl = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    
    // 先移除所有菜单项的active状态
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 然后根据URL匹配设置正确的active状态
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link) {
            const href = link.getAttribute('href');
            
            if (href && href !== '#') {
                if (href === 'index.html') {
                    // 首页的特殊处理
                    if (currentUrl === '/html/' || currentUrl === '/html/index.html') {
                        item.classList.add('active');
                    }
                } else if (href === 'activity-management.html') {
                // 活动管理页面的处理
                if (currentUrl.endsWith('activity-management.html') || 
                    currentUrl.endsWith('podcast-detail.html') || 
                    currentUrl.endsWith('case-collection-detail.html') ||
                    currentUrl.endsWith('create-case.html') ||
                    currentUrl.endsWith('case-detail.html')) {
                    item.classList.add('active');
                }
                } else if (href === 'expert-review.html') {
                    // 专家评审页面的处理
                    if (currentUrl.endsWith('expert-review.html') || 
                        currentUrl.endsWith('expert-review-detail.html') || 
                        currentUrl.endsWith('expert-review-case.html')) {
                        item.classList.add('active');
                    }
                } else {
                    // 通用处理：检查当前URL是否以href结尾
                    if (currentUrl.endsWith(href)) {
                        item.classList.add('active');
                    }
                }
            }
        }
    });
    
    // 导航菜单点击事件处理
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // 阻止默认跳转行为
            if (href === '#') {
                e.preventDefault();
            } else if (href && !href.startsWith('http')) {
                // 对于内部链接，允许默认跳转行为
                // 但先更新菜单状态，这样页面刷新后状态会由URL匹配逻辑处理
                const navItems = document.querySelectorAll('.nav-item');
                navItems.forEach(item => item.classList.remove('active'));
                
                const currentNavItem = link.closest('.nav-item');
                if (currentNavItem) {
                    currentNavItem.classList.add('active');
                }
            }
        });
    });
    
    // 下拉菜单功能
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const subNav = item.querySelector('.sub-nav');
        
        if (link && subNav) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // 切换子导航显示状态
                subNav.classList.toggle('show');
                // 切换活动状态
                item.classList.toggle('active');
            });
        }
    });
}

// 服务标签切换功能
function initializeServiceTabs() {
    const serviceTabs = document.querySelectorAll('.service-tab');
    const filterBars = document.querySelectorAll('.filter-bar');
    const tabContents = document.querySelectorAll('.tab-content');
    const recordTabsContainers = document.querySelectorAll('.record-tabs');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 获取当前标签的索引
            const index = Array.from(serviceTabs).indexOf(tab);
            
            // 移除所有标签的active状态
            serviceTabs.forEach(t => t.classList.remove('active'));
            // 为当前标签添加active状态
            tab.classList.add('active');
            
            // 移除所有筛选栏的active状态和显示
            filterBars.forEach(bar => {
                bar.style.display = 'none';
                bar.classList.remove('active');
            });
            // 显示对应索引的筛选栏
            filterBars[index].style.display = 'flex';
            filterBars[index].classList.add('active');
            
            // 移除所有内容区域的active状态和显示
            tabContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });
            // 显示对应索引的内容区域
            tabContents[index].style.display = 'block';
            tabContents[index].classList.add('active');
            
            // 切换对应的状态标签
            recordTabsContainers.forEach(container => {
                container.style.display = 'none';
                container.classList.remove('active');
            });
            
            // 根据服务类型显示对应的状态标签
            if (index === 0) {
                // 医学播客
                document.querySelector('.medical-podcast-tabs').style.display = 'flex';
                document.querySelector('.medical-podcast-tabs').classList.add('active');
            } else if (index === 1) {
                // 在线互动病例征集
                document.querySelector('.case-collection-tabs').style.display = 'flex';
                document.querySelector('.case-collection-tabs').classList.add('active');
            }
        });
    });
}

// 记录标签切换功能
function initializeRecordTabs() {
    // 为每个记录标签容器添加事件监听器
    const recordTabsContainers = document.querySelectorAll('.record-tabs');
    
    recordTabsContainers.forEach(container => {
        const recordTabs = container.querySelectorAll('.record-tab');
        
        recordTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 移除当前容器中所有标签的active状态
                recordTabs.forEach(t => t.classList.remove('active'));
                // 为当前标签添加active状态
                tab.classList.add('active');
                
                // 获取当前激活的服务内容区域
                const activeContent = document.querySelector('.tab-content.active');
                if (!activeContent) return;
                
                // 获取要筛选的状态
                const status = tab.getAttribute('data-status');
                
                // 筛选表格行
                const tableRows = activeContent.querySelectorAll('.record-table tbody tr');
                
                tableRows.forEach(row => {
                    // 获取当前行的状态
                    const statusElement = row.querySelector('.status');
                    if (!statusElement) return;
                    
                    let rowStatus = '';
                    const statusText = statusElement.textContent.trim();
                    
                    // 映射状态文本到数据状态
                    if (statusText === '可参加') {
                        rowStatus = 'available';
                    } else if (statusText === '待投稿') {
                        rowStatus = 'pending';
                    } else if (statusText === '审核中') {
                        rowStatus = 'reviewing';
                    } else if (statusText === '未通过' || statusText === '审核失败') {
                        rowStatus = 'failed';
                    } else if (statusText === '已完成') {
                        rowStatus = 'completed';
                    }
                    
                    // 根据筛选条件显示或隐藏行
                    if (status === 'all' || rowStatus === status) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        });
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeServiceTabs();
    initializeRecordTabs();
});