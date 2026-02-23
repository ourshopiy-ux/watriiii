// manager.js

const TelegramBot = require('node-telegram-bot-api');

// Replace with your token
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

const bot = new TelegramBot(token, { polling: true });

// Command handling
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to the bot!');
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Here are the available commands: 
/start - Start the bot
/help - Get help');
});

// Additional command handling can be added here...

