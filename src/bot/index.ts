import { Markup } from 'telegraf'
import { message } from 'telegraf/filters'
import { url } from './api.js'
import Controller from './ServerController.js'
import { bot } from './bot.js'

bot.command('register', async ctx => {
  return await ctx.reply(
    'Все возможности',
    Markup.keyboard([
      Markup.button.webApp('Обновить wifi', url, false),
      Markup.button.text('sleepInfo'),
    ])
  )
})

bot.on(message('text'), async ctx => {
  switch (ctx.message.text) {
    case 'sleepInfo': {
      try {
        const message = await Controller.getLastSleepInfo()
        if (typeof message !== 'string') {
          throw new Error('Не удалось получить данные')
        }

        return await ctx.reply(message)
      } catch (e) {
        if (e instanceof Error) {
          return await ctx.reply(e.message)
        }
        break
      }
    }

    default: {
      return await ctx.reply('необработанная команда')
    }
  }
})

bot.on(message('web_app_data'), async ctx => {
  try {
    const data = JSON.parse(ctx.message.web_app_data.data)
    const message = await Controller.updateWifi(data)
    if (typeof message !== 'string')
      throw new Error('Не удалось получить данные')

    return await ctx.reply(`Данные приняты`)
  } catch (e) {
    if (e instanceof Error) {
      return await ctx.reply(e.message)
    }
  }
})

void bot.launch()

// bot.on('message', async ctx => {
//   console.log(ctx.message.web_app_data)
//   return ctx.reply('Данные приняты', Markup.keyboard([]))
// })
// if (msg?.web_app_data?.data) {
//   try {
//     const data = JSON.parse(msg?.web_app_data?.data)
//     console.log(data)
//     await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
//     await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country)
//     await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street)
//
//     setTimeout(async () => {
//       await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате')
//     }, 3000)
//   } catch (e) {
//     console.log(e)
//   }
// }
// bot.on(message('text'), async ctx => {
//   try {
//     ctx.reply('asd')
//   } catch (e) {
//     console.log('Error while text message ' + JSON.stringify(e))
//     await ctx.reply(code(`Ошибка :(`), {
//       disable_notification: true,
//     })
//   }
// })
// bot.command('clear', ctx => {
//   return ctx.reply(
//     'open webapp',
//     Markup.inlineKeyboard([Markup.button.webApp('Opennnnnn', url)])
//   )
// })
//
// bot.command('bottom', async ctx => {
//   await ctx.reply('Заполните форму', {
//     reply_markup: {
//       keyboard: [[{ text: '/inline' }]],
//     },
//   })
// })
//
// bot.command('inline', async ctx => {
//   await ctx.reply('Заполните форму', {
//     reply_markup: {
//       inline_keyboard: [[{ text: 'some text', web_app: { url } }]],
//     },
//   })
// })
// bot.on('shipping_query', async ctx => {
//   // this never fires here
//   console.log('hello from webapp')
//   const result = []
//   // Explicit usage
//   await ctx.telegram.answerInlineQuery(ctx.webAppData.id, result)
// })
//
// export const commandForNew = async ctx => {
//   const a = await Controller.getLastSleepInfo()
//   console.log(a)
//   await ctx.reply(italic('Начнем все с чистого листа'))
//   await ctx.reply(italic(a))
// }
//
// bot.command('new', commandForNew)
// bot.command('start', commandForNew)

process.once('SIGINT', () => {
  bot.stop('SIGINT')
})
process.once('SIGTERM', () => {
  bot.stop('SIGTERM')
})
