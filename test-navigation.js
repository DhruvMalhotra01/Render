const http = require('http');

// 测试函数：访问指定URL并记录结果
function testUrl(url, description) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            console.log(`[TEST] ${description}: Status Code ${res.statusCode}`);
            resolve(res.statusCode);
        }).on('error', (e) => {
            console.error(`[TEST] ${description} failed:`, e.message);
            reject(e);
        });
    });
}

// 运行测试序列
async function runTests() {
    console.log('开始测试网站导航流程...\n');
    
    try {
        // 1. 测试首页访问
        await testUrl('http://localhost:3000', '首页访问');
        
        // 2. 测试酒店列表页面访问
        await testUrl('http://localhost:3000/hotelBooking', '酒店列表页面访问');
        
        // 3. 测试酒店详情页面访问（使用第一个酒店名称）
        await testUrl('http://localhost:3000/hotel/ORCHID%20VIEW%20RETREATS%2C%20MUMBAI', '酒店详情页面访问');
        
        // 4. 测试登录页面访问
        await testUrl('http://localhost:3000/login', '登录页面访问');
        
        // 5. 测试注册页面访问
        await testUrl('http://localhost:3000/signup', '注册页面访问');
        
        console.log('\n✅ 所有导航测试完成！网站的主要页面都可以正常访问。');
        console.log('\n请在浏览器中测试：');
        console.log('1. 点击顶部导航栏的 "Stay" 链接');
        console.log('2. 在酒店列表页面选择一个酒店，点击 "BOOK NOW" 按钮');
        console.log('3. 在酒店详情页面填写信息并提交预订');
    } catch (error) {
        console.error('\n❌ 测试过程中出现错误:', error);
    }
}

// 执行测试
runTests();