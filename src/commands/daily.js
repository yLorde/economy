const db = require('quick.db')
const moment = require('moment')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
require('moment-duration-format')

module.exports = {
    name: 'daily',
    async execute(message, args) {

        const BUTTON = new MessageButton()
            .setStyle('DANGER')
            .setLabel('Fechar')
            .setCustomId('close')

        //import
        const give = Math.floor(Math.random() * 2000)

        var cooldown = 8.64e7
        var coins = give
        var daily = await db.fetch(`Daily_${message.author.id}_${message.guild.id}`)
        var atual = await db.fetch(`Money_${message.author.id}_${message.guild.id}`)
        if (atual = null) atual = 0
        var time = cooldown - (Date.now() - daily)

        var nowValue = coins + atual

        if (daily !== null && cooldown - (Date.now() - daily) > 0) {
            var EMBED1 = new MessageEmbed()
                .setDescription(`${message.author}, aguarde **${moment
                    .duration(time)
                    .format(
                        "h [horas] m [minutes] e s [segundos]"
                    )
                    }** até pegar o prêmio diário novamente`)

            await message.channel.bulkDelete(1)
            await message.channel.send({
                embeds: [EMBED1],
                components: [new MessageActionRow().addComponents(BUTTON)]
            })
        } else {
            var EMBED2 = new MessageEmbed()
                .setDescription(`${message.author}, você resgatou seu daily, ${coins}, agora você possui ${nowValue}`)

            await message.channel.bulkDelete(1)
            await message.channel.send({
                embeds: [EMBED2],
                components: [new MessageActionRow().addComponents(BUTTON)]
            })

            await db.add(`Money_${message.author.id}_${message.guild.id}`, coins)
            await db.set(`Daily_${message.author.id}_${message.guild.id}`, Date.now())
        }

    },
}