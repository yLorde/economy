const db = require('quick.db')

module.exports = {
    name: 'moedas',
    async execute(message, args) {

        var user = 
        message.mentions.members.first() ||
        message.guild.members.cache.get((m) => m.id == args[0]) ||
        message.author

        var money = await db.fetch(`Money_${message.author.id}_${message.guild.id}`)
        if(money === null) money = 0
    

        message.reply(`Money de: ${user} é: ${money}`)

    },
}