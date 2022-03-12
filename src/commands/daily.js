const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')

module.exports = {
    name: 'daily',
    async execute(message, args) {

        const give = Math.floor(Math.random() * 2000)

        var cooldown = 8.64e7
        var coins = give
        let author = message.author;
        let guild = message.guild;
        var daily = await db.fetch(`Daily_${author.id}_${guild.id}`)
        var atual = await db.fetch(`Money_${author.id}_${guild.id}`)
        if (atual = null) atual = 0
        var time = cooldown - (Date.now() - daily)

        var nowValue = coins + atual

        if (daily !== null && cooldown - (Date.now() - daily) > 0) {

            await message.reply(`
            aguarde **${moment.duration(time).format("h [horas] m [minutes] e s [segundos]")}** até pegar o prêmio diário novamente
            `)
        } else {
            
            message.reply(`você resgatou seu daily, ${coins}, agora você possui ${nowValue}`)

            await db.add(`Money_${author.id}_${guild.id}`, coins)
            await db.set(`Daily_${author.id}_${guild.id}`, Date.now())
        }

    },
}