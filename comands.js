module.exports = {
    actions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Сделать заказ 🍔', callback_data: 'order'}]
            ]
        })
    },
    actionsForOrders: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Создать заказ заного 🍔', callback_data: 'order'}],
                [{ text: 'Мои заказы 🗂️', callback_data: 'my_card'}],
                [{ text: 'Заказать 💌', callback_data: 'get_rolls'}],
            ]
        })
    },
    acceptOrder: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Подтвердить заказ 📤', callback_data: 'accept_rolls'}],
                [{ text: 'Создать заказ заного 🍔', callback_data: 'order'}]
            ]
        })
    },
    payments: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Оплата картой онлайн 💳', callback_data: 'card_pay'}],
                [{ text: 'Оплата наличными при доставке 💰', callback_data: 'cache_pay'}],
                [{ text: 'Назад 🔙', callback_data: 'back_menu'}],
            ]
        })
    },
    productCategories: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Роллы 🍣', callback_data: 'rolls_cats'}],
                [{ text: 'Печене роллы 🍣', callback_data: 'bakedRolls_cats'}],
                [{ text: 'Суши 🍣', callback_data: 'sushi_cats'}],
                [{ text: 'Сет 🍣', callback_data: 'setRollsAndSushi_cats'}],
                [{ text: 'Назад 🔙', callback_data: 'back_menu'}],
            ]
        })
    },
    
    porducts: {
        rolls: {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'Креветка в деле', callback_data: 'krvtvdl_order'}],
                    [{ text: 'Креветка и манго', callback_data: 'krvtvmng_order'}],
                    [{ text: 'Мантра', callback_data: 'mantra_order'}],
                    [{ text: 'Лосось в деле', callback_data: 'lososvdl_order'}],
                    [{ text: 'Техасская резня', callback_data: 'texas_order'}],
                    [{ text: 'Назад 🔙', callback_data: 'back_cat'}]
                ]
            })
        },
        bakedRolls: {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'Запеченный Вулкан', callback_data: 'beakvulkan_order'}],
                    [{ text: 'Запеченный Майами', callback_data: 'beakmiami_order'}],
                    [{ text: 'Темпурный запечённый Цезарь', callback_data: 'beakcesar_order'}],
                    [{ text: 'Назад 🔙', callback_data: 'back_cat'}]
                ]
            })
        },
        sushi: {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'Ролл с тунцом', callback_data: 'sushtuc_order'}],
                    [{ text: 'Ролл с угрём', callback_data: 'sushugr_order'}],
                    [{ text: 'Ролл с лососем', callback_data: 'suslos_order'}],
                    [{ text: 'Ролл с креветкой', callback_data: 'suscrev_order'}],
                    [{ text: 'Ролл с огурцом', callback_data: 'suspicle_order'}],
                    [{ text: 'Назад 🔙', callback_data: 'back_cat'}]
                ]
            })
        },
        setRollsAndSushi: {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'ЧикагоBulls', callback_data: 'chikago_order'}],
                    [{ text: 'Окинава', callback_data: 'okinava_order'}],
                    [{ text: 'Пушка', callback_data: 'pushka_order'}],
                    [{ text: 'Якудза', callback_data: 'yakudza_order'}],
                    [{ text: 'Филадельфия', callback_data: 'philadlphi_order'}],
                    [{ text: 'Японика', callback_data: 'japan_order'}],
                    [{ text: 'Назад 🔙', callback_data: 'back_cat'}]
                ]
            })
        }
    },
    productsNames: {
        "krvtvdl_order": ["Креветка в деле", 100],
        "krvtvmng_order": ["Креветка и манго", 100],
        "mantra_order": ["Мантра", 100],
        "lososvdl_order": ["Лосось в деле", 100],
        "texas_order": ["Техасская резня", 100],
        "beakvulkan_order": ["Запеченный Вулкан", 100],
        "beakmiami_order": ["Запеченный Майами", 100],
        "sushtuc_order": ["Ролл с тунцом", 100],
        "sushugr_order": ["Ролл с угрём", 100],
        "suslos_order": ["Ролл с лососем", 100],
        "suscrev_order": ["Ролл с креветкой", 100],
        "suspicle_order": ["Ролл с огурцом", 100],
        "chikago_order": ["ЧикагоBulls", 100],
        "okinava_order": ["Окинава", 100],
        "pushka_order": ["Пушка", 100],
        "yakudza_order": ["Якудза", 100],
        "philadlphi_order": ["Филадельфия", 100],
        "beakcesar_order": ["Темпурный запечённый Цезарь", 100],
        "japan_order": ["Японика", 100 ]
    },
}