const moment = require('moment');
require('moment-duration-format');
const db = require('quick.db');

module.exports = {
    name: 'roubar',
    async execute(message, args) {

        function noMoney () {
            message.reply('Esse membro não possui dinheiro para ser roubado.')
        }

        let guild = message.guild;
        let user = message.mentions.user.first() || message.guild.members.cache.get(args[0]);
        let author = message.author;
        let roubar = await db.fetch(`roubarDelay_${author.id}_${guild.id}`);
        let tempo = 8.64e7;
        let time = tempo - (Date.now() - roubar);
        let roubarMoney = await db.fetch(`Money_${user.id}_${guild.id}`);
        let money = await db.fetch(`Money_${author.id}_${guild.id}`);

        if (roubarMoney === null || roubarMoney === 0) return noMoney();

        if (roubar !== null && tempo - (Date.now() - roubar) > 0) {

            await message.reply(`
            aguarde **${moment.duration(time).format("h [horas] m [minutes] e s [segundos]")}** para roubar alguém.
            `)
        } else {
            
            message.reply(`você roubou todo o money desse membro.`)

            await db.add(`Money_${author.id}_${guild.id}`, roubarMoney)
            await db.set(`roubarDelay_${author.id}_${guild.id}`, Date.now())
            await db.set(`Money_${user.id}_${guild.id}`, 0)
        }

    },
}