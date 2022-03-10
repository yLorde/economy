const { MessageActionRow, MessageEmbed, MessageButton, Message } = require("discord.js")
const db = require('quick.db')

module.exports = {
    name: 'removemoney',
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

        var money = await db.fetch(`Money_${USER.id}_${message.guild.id}`)

        if (money === null) {
            await message.channel.bulkDelete(1)
            var EMBED = new MessageEmbed()
                .setDescription(`${USER} Não possui nenhum money para ser removido!`)
            await message.channel.send({
                embeds: [EMBED],
                components: [new MessageActionRow().addComponents(BUTTON)]
            })
            return
        }

        if (money < 1) {
            await message.channel.bulkDelete(1)
            var EMBED = new MessageEmbed()
                .setDescription(`${USER} Não possui nenhum money para ser removido!`)
            await message.channel.send({
                embeds: [EMBED],
                components: [new MessageActionRow().addComponents(BUTTON)]
            })
            return
        }

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

        var NUMBER = await db.fetch(`Money_${USER.id}_${message.guild.id}`)
        if (NUMBER === null) NUMBER = 0

        var remove = NUMBER - VALUE
        if (remove < 0) {
            remove = 0
            await db.set(`Money_${USER.id}_${message.guild.id}`, 0)
            var EMBED = new MessageEmbed()
                .setDescription(`Foi removido todo o money do membro ${USER}`)
            await message.channel.bulkDelete(1)
            await message.channel.send({
                embeds: [EMBED],
                components: [new MessageActionRow().addComponents(BUTTON)]
            })
            return
        }

        await db.set(`Money_${USER.id}_${message.guild.id}`, remove)
        var nowValue = db.fetch(`Money_${USER.id}_${message.guild.id}`)
        if (nowValue === null) nowValue = 0
        var EMBED = new MessageEmbed()
            .setDescription(`Foi removido ${VALUE} de money do membro ${USER}, agora ele possui: ${nowValue} de money`)
        await message.channel.bulkDelete(1)
        await message.channel.send({
            embeds: [EMBED],
            components: [new MessageActionRow().addComponents(BUTTON)]
        })
    },
}