const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')

module.exports = {
    name: 'crime',
    async execute(message) {

        let author = message.author;
        let guild = message.guild;
        let cooldown = 21600 * 1000;
        let recompensa = Math.floor(Math.random() * 150000); //no máximo 150k
        let serPego = Math.floor(Math.random() * 4); //25%
        let moneyAtual = db.fetch(`Money_${author.id}_${guild.id}`);
        let tempo = await db.fetch(`roubarTimer_${author.id}_${guild.id}`);
        let multaValor = Math.floor(Math.random() * 50000); //multa de no máximo 50k
        var time = cooldown - (Date.now() - daily);

        if (tempo !== null && cooldown - (Date.now() - tempo) > 0) {
            await message.reply(`
            aguarde **${moment.duration(time).format("h [horas] m [minutes] e s [segundos]")}** até cometer novamente algum crime.
            `);
        } else  {

            if (serPego === 1) {
                await message.reply(`Você foi pego roubando, portanto teve que pagar uma multa de ${multaValor}`);
                let cobrar = moneyAtual - multaValor
                await db.set(`Money_${user.id}_${guild.id}`, cobrar);
                return
            }

            message.reply(`Você cometeu um crime com sucesso, e recebeu um total de ${recompensa}`)
            let adicionar = moneyAtual + recompensa
            await db.set(`Money_${user.id}_${guild.id}`, adicionar)
            await db.set(`roubarTimer_${user.id}_${guild.id}`, Date.now());

        }

    },
}