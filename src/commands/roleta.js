const db = require('quick.db')

module.exports = {
    name: 'roleta',
    async execute(message, args) {
        
        function erroOne () {
            message.reply(`Use: /roleta [vermelho/preto] [de 0 a 36] [aposta]`)
        }

        let author = message.author;
        let guild = message.guild;
        let atualMoney = await db.fetch(`Money_${author.id}_${guild.id}`)
        
        let cor = agrs[1];
        let num = args[2];
        let aposta = args[3];

        if (cor != 'vermelho' || cor != 'preto') return;
        if (!aposta) return erroOne();
        if (isNaN(aposta)) return message.reply('Faça uma aposta em valor numérico.')
        if (aposta < atualMoney) return message.reply('Você não possui dinheiro suficiente.')

        let cores = ['vermelho', 'preto']

        let valorSorteado = Math.floor(Math.random() * 36);
        let corSorteada = Math.floor(Math.random() * cores.length);

        let cobrar = atualMoney - aposta
        await db.set(`Money_${author.id}_${guild.id}`, cobrar);

        if (!cor || !num) return erroOne();
        if (isNaN(num)) return
        if (num < 0) return
        if (num > 36) return
        if (corSorteada === 1) corSorteada = 'vermelho'
        if (corSorteada === 2) corSorteada = 'preto'

        let pagar = 0;

        if (corSorteada === cor) {
            pagar = aposta * 2
        }

        if (valorSorteado === num) {
            pagar = aposta * 36
        }

        message.reply(`Cor sorteada: ${corSorteada}, Número sorteado: ${valorSorteado}, seu prêmio: ${pagar}`)
        await db.add(`Money_${author.id}_${guild.id}`, pagar)

    },
}