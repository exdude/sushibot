require('dotenv').config()

const TelegramApi = require('node-telegram-bot-api')
const { actions, actionsForOrders, productCategories, porducts, productsNames, payments, acceptOrder } = require('./comands')

const bot = new TelegramApi(process.env.TOKEN, { polling: true })
const orders = new Object()

bot.setMyCommands([{command: '/start', description: 'Запустить бота'}])

bot.on('message', async msg => {

    const text = msg.text
    const chatId = msg.chat.id
    const name = msg.from.first_name
    const userId = msg.from.id

    if (text === "/start") {
        bot.deleteMessage(chatId, msg.message_id)
        return bot.sendMessage(chatId, `Привет ${name}! Добро пожаловать в нашу сеть ресторанов Ринато Сушито!`, actions)
    }

    if (orders[userId]) {
        if (orders[userId].orderFlag) {
            const card = orders[userId].card
            let info = ''
            card.forEach(x => info += `\n ${productsNames[x.name][0]} ${x.count}р.`)
            orders[userId].adress = text
            bot.deleteMessage(chatId, msg.message_id)
            return bot.sendMessage(chatId, `Подтвердите данные: \nВаш адрес: ${orders[userId].adress} \n\nСписок: ${info} \n Сумма заказа: ${orders[userId].summ}`, acceptOrder)
        }
    }
    
    bot.deleteMessage(chatId, msg.message_id)
    return bot.sendMessage(chatId, `Извини, я тебя не понимаю, выбери действие:`, actions)
})

bot.on('callback_query', async msg => {
    const chatId = msg.message.chat.id
    const data = msg.data
    
    const userId = msg.from.id

    const nameOfRolls = data.replace('_cats', '')
    const nameOfOrder = data.includes('_order')
    const nameOfCats = data.includes('_cats')
    
    const typeOfPay = data.includes('_pay')

    if (data === 'order') order(chatId, userId)
    if (data === 'accept_rolls') acceptOrderToSend(chatId, userId)
    if (data === 'my_card') showCard(msg)

    if (data === 'get_rolls') createOrder(chatId, userId)

    if (typeOfPay) getPay(chatId, userId, data, msg)

    
    if (nameOfOrder) addToCard(chatId, userId, nameOfRolls)
    if (data === 'back_menu') backToMenu(chatId, userId)

    if (data === 'back_cat') bot.sendMessage(chatId, 'Выберите категорию: ', productCategories)
    if (nameOfCats) bot.sendMessage(chatId, 'Выбери суши или роллы: ', porducts[nameOfRolls])

    

    return bot.deleteMessage(chatId, msg.message.message_id)
})


const order = (chatId, userId) => {
    orders[userId] = { date: (new Date()).toString() }
    return bot.sendMessage(chatId, 'Выбери категорию', productCategories)
}

const addToCard = (chatId, userId, nameOfRolls) => {
    if (orders.hasOwnProperty(userId)) {
        if (orders[userId].hasOwnProperty('card')) {
            
            orders[userId].card.push({name: nameOfRolls, count: productsNames[nameOfRolls][1]})
            return bot.sendMessage(chatId, `Товар ${productsNames[nameOfRolls][0]} добавлен`, productCategories)
        } else {
            orders[userId].card = [{name: nameOfRolls, count: productsNames[nameOfRolls][1]}]
            return bot.sendMessage(chatId, `Товар ${productsNames[nameOfRolls][0]} добавлен`, productCategories)
        }
    } else {
        return bot.sendMessage(chatId, 'Для начала выберите действие: ', actions)
    }
}

const showCard = msg => {
    const chatId = msg.message.chat.id
    const userId = msg.from.id

    if (orders[userId]) {
        let info = '\n'
        const card = orders[userId].card
        card.forEach(x => info += `\n ${productsNames[x.name][0]} ${x.count}р.`)
        return bot.sendMessage(chatId, `Ваш заказ: ${info}`, actionsForOrders)
    } else {
        return bot.sendMessage(chatId, 'У Вас нет заказов: ', actions)
    }
}


const backToMenu = (chatId, userId) => {
    if (orders.hasOwnProperty(userId)) {
        if (orders[userId].hasOwnProperty('card')) {
            return bot.sendMessage(chatId, 'Главное меню: ', actionsForOrders)
        } else {
            return bot.sendMessage(chatId, 'Главное меню: ', actions)
        }
    } else {
        return bot.sendMessage(chatId, 'Главное меню: ', actions)
    }
}

const createOrder = (chatId, userId) => {
    if (orders[userId]) {
        const card = orders[userId].card
        let info = '\n'
    
        orders[userId].summ = 0
    
        card.forEach(x => orders[userId].summ += productsNames[x.name][1])
        card.forEach(x => info += `\n ${productsNames[x.name][0]} ${x.count}р.`)
    
    
        return bot.sendMessage(chatId, `Сумма заказа ${orders[userId].summ} р. из: \n${info}`, payments)
    } else {
        return bot.sendMessage(chatId, 'Главное меню: ', actions)
    }
}

const getPay = (chatId, userId, type) => {
    if (orders[userId]) {
        orders[userId].orderFlag = true
        orders[userId].typePay = type
        return bot.sendMessage(chatId, `Введите адрес доставки и номер телефона для дальнейшего контакта:`)
    } else {
        return bot.sendMessage(chatId, 'Главное меню: ', actions)
    }
}

const acceptOrderToSend = (chatId, userId) => {
    let info = ''
    let ordersMenu = '\n Роллы: '
    const obj = orders[userId]
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            obj[key].forEach(x => {
                ordersMenu += `\n ${productsNames[x.name][0]}`
            })
        } else {

            info += `\n ${
                key === 'date' ? 
                'Дата заказа' : 
                key === 'summ' ? 
                'Сумма заказа' : 
                key === 'typePay' ? 
                'Тип оплаты' : 
                key === 'adress' ? 
                'Адресс доставки и телефон ': 
                'Заказ'
            } : ${
                obj[key] === 'card_pay' ? 
                'Оплата картой' : 
                obj[key] === 'cache_pay' ? 
                'Оплата наличными' : obj[key]
            }`

        }
        
    }
    console.log(info);
    console.log(ordersMenu);
    return bot.sendMessage(chatId, `Ваш заказ принят, через 5 минут с вами свяжуться за подтверждением заказа!


Отправляем на почту ресторанна инфу:
    ${info}
    ${ordersMenu}
    `, actions)
}