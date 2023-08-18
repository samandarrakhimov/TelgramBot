
const TelegramBot = require('node-telegram-bot-api');

const token = '6019255957:AAFwvlRKov3gl5xCbqqtuwf62jjF6ZDrnZ4';

const bot = new TelegramBot(token, {polling: true});
 const obj = {}
 const getOption = {
    reply_markup:{
     inline_keyboard:[
         [
            {
               text: 1,
               callback_data:1
            },
            {
                text: 2,
                callback_data:2
             },
             {
                text: 3,
                callback_data:3
             },
         ],
         [
            {
               text: 4,
               callback_data:4
            },
            {
                text: 5,
                callback_data:5
             },
             {
                text: 6,
                callback_data:6
             },
         ],
         [
            {
               text: 6,
               callback_data:6
            },
            {
                text: 7,
                callback_data:7
             },
             {
                text: 8,
                callback_data:8
             },
         ],
         [
            {
                text: 0,
                callback_data:0
             },
         ]
        ]
    },
 }
 const againOptions =  {
    reply_markup:{
     inline_keyboard:[
        [
            {
                text: 'Qaytadan boshlash',
                callback_data:'/agian'
            }
        ]
     ]
    }
 }
 const getgame = async chatId => {
    await bot.sendMessage(chatId,
        "kompyuter 0 dan 9 gacha son o'yladi topishga harakat qiling"
        ); 
        const randomNumber = Math.floor(Math.random() * 10 );
        obj[chatId] = randomNumber
        await bot.sendMessage(chatId,"Tugmani bosing",getOption)
 }
const bootstrap = () => {
    bot.setMyCommands([
        {
            command:"/start",
            description:"botni ishga tushrish"
        },
        {
       command:"/info",
       description:"o'zingiz xaqigizda malumot"
       
        },
        {
            command:"/game",
            description:"O'yinlar"
        },
        {
         command: "/css",
         description:"css darslari"
        },
    ])
    
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id;
        if (text == '/start') {
          return bot.sendMessage(chatId,
            `Assalomu alaykum hurmatli ${msg.from?.first_name} sizni botmizda ko'rip turganmdan xursandman`
        )
        }
        if (text == '/css') {
         return bot.sendMessage(chatId,
            'Tez kunda Css darsalari Chiqadi Botimzdan uzoqlashmang'
            )
        }
        if (text == '/info') {
           return bot.sendMessage(chatId,
            `sizning telgram username ${msg.from?.first_name}, sizning ismingiz ${msg.from?.username} famiylangiz ${msg.from?.last_name}`)
        }
       
        if (text == '/game') {
           return getgame(chatId)
            }
        bot.sendMessage(chatId,'Men siznin gapingzga tushinmadm!!')
    });
    bot.on('callback_query', msg => {
            const data = msg.data;
            const chatId = msg.message.chat.id;
            if (data == '/agian') {
               return getgame(chatId) 
            }
            
            if (data == obj[chatId]) {
             return  bot.sendMessage(chatId , 
            `Tabriklaymiz siz tanlagan son ${data}, kompuyter shu ${obj[chatId]} xaqida o'ylagan edi`) 
            }
            else(
              bot.sendMessage(chatId, 
                `siz notogri son kirtingiz siz kirtgan son ${data}, kompuyter shu ${obj[chatId]} xaqida o'ylagan edi`,
              againOptions )
            )
        }) 
            
}
bootstrap()
    