const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'bal',
    async execute(message, args) {

        var USER = 
        message.mentions.members.first() ||
        message.guild.members.cache.get((m) => m.id == args[0]) ||
        message.author

        var money = await db.fetch(`Money_${message.author.id}_${message.guild.id}`)
        if(money === null) money = 0
        
        const EMBED = new MessageEmbed()
        .setTitle(`Evelynn Economy`)
        .setDescription(`Money de: ${USER}`)
        .addFields(
            {
                name: 'Money',
                value: `${money}`
            }
        )

        const BUTTON = new MessageButton()
        .setStyle('DANGER')
        .setCustomId('close')
        .setLabel('Fechar')

        await message.channel.bulkDelete(1)
        await message.channel.send({
            embeds: [EMBED],
            components: [new MessageActionRow().addComponents(BUTTON)]
        })

    },
}