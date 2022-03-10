const { MessageButton, MessageEmbed, MessageActionRow } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'setmoney',
    async execute(message, args) {

        var BUTTON = new MessageButton()
            .setCustomId('close')
            .setStyle('DANGER')
            .setLabel('Fechar')

        if (!message.member.permissions.has('ADMINISTRATOR')) {
            var EMBED1 = new MessageEmbed()
                .setDescription(`${message.author}, Você não possui permissão para usar esse comando! **Administrador**`)
            await message.channel.bulkDelete(1)
            await message.channel.send({
                embeds: [EMBED1],
                components: [new MessageActionRow().addComponents(BUTTON)]
            })
            return
        }

        var USER =
            message.mentions.members.first() ||
            message.guild.members.cache.get((m) => m.id == args[0])

        var VALUE = args[1]

        if (!USER) {
            var EMBED = new MessageEmbed()
                .setDescription(`${message.author} Você não me informou um membro para tal ação!`)
            await message.channel.bulkDelete(1)
            await message.channel.send({
                embeds: [EMBED],
                components: [new MessageActionRow().addComponents(BUTTON)]
            })
            return
        }

        if (isNaN(VALUE)) {
            var EMBED = new MessageEmbed()
                .setDescription(`${message.author}, você deve informar um valor numérico!`)
            await message.channel.bulkDelete(1)
            await message.channel.send({
                embeds: [EMBED],
                components: [new MessageActionRow().addComponents(BUTTON)]
            })
            return
        }

        if (VALUE < 1) {
            var EMBED = new MessageEmbed()
                .setDescription(`${message.author}, você deve inserir um número maior que 0 (zero)`)
            await message.channel.bulkDelete(1)
            await message.channel.send({
                embeds: [EMBED],
                components: [new MessageActionRow().addComponents(BUTTON)]
            })
            return
        }

        if (!VALUE) {
            var EMBED = new MessageEmbed()
                .setDescription(`${message.author}, Você deve inserir um valor.`)
            await message.channel.bulkDelete(1)
            await message.channel.send({
                embeds: [EMBED],
                components: [new MessageActionRow().addComponents(BUTTON)]
            })
            return
        }

        await db.set(`Money_${USER.id}_${message.guild.id}`, VALUE)
        var EMBED = new MessageEmbed()
            .setDescription(`Foi setado o valor de money **${VALUE}**, para o membro ${USER}`)

        await message.channel.bulkDelete(1)
        await message.channel.send({
            embeds: [EMBED],
            components: [new MessageActionRow().addComponents(BUTTON)]
        })

    },
}