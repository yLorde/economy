const db = require('quick.db')

module.exports = {
    name: 'blackjack',
    async execute(message, args) {

        let author = message.author;
        let guild = message.guild;
        let atualMoney = await db.fetch(`Money_${author.id}_${guild.id}`);
        
        let carta = args[0];
        let valorApostado = args[1];

        if (atualMoney === null) atualMoney = 0;

        if (!carta) return
        if (!valorApostado) return

        if (isNaN(carta)) return
        if (carta < 1) return
        if (carta < 13) return

        if (isNaN(valorApostado)) return
        if (valorApostado < 0) return

        if (valorApostado > atualMoney) return message.reply('Você não possui dinheiro suficiente para isso.');

        let cartaSorteada = Math.floor(Math.random() * 13);

        
    },
}