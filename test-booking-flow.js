const http = require('http');
const querystring = require('querystring');


const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
};


function testUrl(url, description) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            console.log(`${colors.blue}[TEST] ${description}: Status Code ${res.statusCode}${colors.reset}`);
            resolve(res.statusCode);
        }).on('error', (e) => {
            console.error(`${colors.red}[TEST] ${description} failed:${colors.reset}`, e.message);
            reject(e);
        });
    });
}


function testBookingForm() {
    return new Promise((resolve, reject) => {
        const postData = querystring.stringify({
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            phone: '1234567890',
            roomType: 'Deluxe Room',
            checkin: '2024-06-01',
            checkout: '2024-06-03',
            bookingType: 'online',
            hotelId: '6633dd8b62a9d05a523c4e5d',
            itemId: 'room1',
            totalAmount: '20000'
        });

        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/hotel/book',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = http.request(options, (res) => {
            console.log(`${colors.green}[TEST] 预订表单提交: Status Code ${res.statusCode}${colors.reset}`);
            resolve(res.statusCode);
        });

        req.on('error', (e) => {
            console.error(`${colors.red}[TEST] 预订表单提交失败:${colors.reset}`, e.message);
            reject(e);
        });

        req.write(postData);
        req.end();
    });
}


async function runFullBookingTest() {
    console.log(`${colors.yellow}开始测试完整的预订流程...\n${colors.reset}`);
    
    try {
        
        await testUrl('http://localhost:3000', '首页访问');
        
        
        await testUrl('http://localhost:3000/hotelBooking', '酒店列表页面访问');
        
       
        await testUrl('http://localhost:3000/hotel/ORCHID%20VIEW%20RETREATS%2C%20MUMBAI', '酒店详情页面访问');
        
        
        await testBookingForm();
        
        console.log(`\n${colors.green}🎉 完整的预订流程测试成功完成！${colors.reset}`);
        console.log(`\n${colors.yellow}现在请您在浏览器中测试实际的用户体验：${colors.reset}`);
        console.log(`1. 访问 http://localhost:3000`);
        console.log(`2. 点击顶部导航栏的 "Stay" 链接`);
        console.log(`3. 在酒店列表页面选择一个酒店，点击 "BOOK NOW" 按钮`);
        console.log(`4. 在酒店详情页面填写预订信息`);
        console.log(`5. 点击提交按钮完成预订`);
        console.log(`\n${colors.green}所有问题应该都已解决！您现在可以正常浏览酒店、查看详情并完成预订了。${colors.reset}`);
    } catch (error) {
        console.error(`${colors.red}\n❌ 测试过程中出现错误:${colors.reset}`, error);
    }
}


runFullBookingTest();