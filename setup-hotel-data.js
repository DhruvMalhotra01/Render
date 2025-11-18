const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hotel = require('./models/hotel');

dotenv.config();

// 连接到MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // 检查是否已有酒店数据
    return Hotel.countDocuments({});
  })
  .then(count => {
    console.log(`现有酒店数量: ${count}`);
    
    if (count === 0) {
      console.log('没有找到酒店数据，正在创建测试数据...');
      
      // 创建测试酒店数据
      const hotels = [
        {
          name: 'ORCHID VIEW RETREATS, MUMBAI',
          location: 'Mumbai, India',
          description: 'Experience timeless elegance at The Pierre, where orchid\'s hospitality meets New York\'s luxury, offering sophistication and classic charm',
          images: ['/images/hotel3.jpeg']
        },
        {
          name: 'ORCHID HOTEL, GOA',
          location: 'Goa, India',
          description: 'Immerse in London\'s history and style at St. James\' Court, a orchid Hotel, offering a blend of Victorian grandeur and contemporary luxury',
          images: ['/images/hotel2.jpeg']
        },
        {
          name: 'ORCHID HOTELS, HYDERABAD',
          location: 'Hyderabad, India',
          description: 'Explore luxury and elegance at Taj Krishna, Hyderabad, where impeccable service, sumptuous dining, and opulent accommodations define your stay',
          images: ['/images/hotel4.jpeg']
        },
        {
          name: 'ORCHID HOTEL, BENGALURU',
          location: 'Bengaluru, India',
          description: 'Amidst lush gardens, the Taj West End is a sanctuary of elegance in Bengaluru, boasting a heritage walk, exquisite dining and an aura of timeless sophistication.',
          images: ['/images/hotel5.jpeg']
        },
        {
          name: 'ORCHID HOTEL, DUBAI',
          location: 'Dubai, UAE',
          description: 'Surrender to luxury on The Palm at Exotica, where Arabian elegance, pristine beaches, and indulgent moments define your Dubai getaway',
          images: ['/images/hotel1.jpeg']
        },
        {
          name: 'ORCHID MOUNTAIN BLISS, LEH',
          location: 'Leh, India',
          description: 'Find peace and serenity in the lap of the mountains.',
          images: ['/images/hotel6.jpeg']
        }
      ];
      
      // 保存酒店数据
      return Hotel.insertMany(hotels);
    } else {
      console.log('数据库中已有酒店数据，无需添加。');
      return Promise.resolve();
    }
  })
  .then(insertedHotels => {
    if (insertedHotels && insertedHotels.length > 0) {
      console.log(`成功添加了 ${insertedHotels.length} 家酒店数据！`);
      insertedHotels.forEach(hotel => {
        console.log(`- ${hotel.name}`);
      });
    }
    
    // 断开连接
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('MongoDB连接已关闭');
    console.log('\n✅ 酒店数据设置完成！现在您应该可以：');
    console.log('1. 点击顶部导航栏的 "Stay" 链接');
    console.log('2. 在酒店列表页面选择一个酒店，点击 "BOOK NOW" 按钮');
    console.log('3. 成功进入酒店详情页面');
  })
  .catch(error => {
    console.error('设置酒店数据时出错：', error);
    mongoose.connection.close().catch(e => console.error('关闭连接时出错：', e));
  });