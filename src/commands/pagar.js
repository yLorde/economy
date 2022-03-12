const db = require('quick.db');

module.exports = {
    name: 'pagar',
    async execute(message, args) {
        
        function upToZero () {
            message.reply('Informe um valor maior que zero.')
        }

        function noMoney () {
            message.reply('Você não possui money o suficiente.')
        }

        let value = args[1];
        let author = message.author;
        let payMoney = await db.fetch(`Money_${author.id}_${guild.id}`);
        let user = 
        message.mentions.user.first() ||
        message.guild.cache.get(args[0]);
        let reciveMoney = await db.fetch(`Money_${USER.id}_${guild.id}`);

        if (!user) return message.reply('Informe um membro.')
        if (!value) return message.reply('Informe um valor.')
        if (isNaN(value)) return message.reply('Informe um valor numérico.')
        if (value == 0) return upToZero();
        if (value < 0) return upToZero();
        if (payMoney === null) payMoney = 0;

        if (payMoney < value) return noMoney();

        let debitar = value - payMoney;
        let adicionar = reciveMoney + value;
        
        await db.set(`Money_${author.id}_${guild.id}`, debitar);
        await db.set(`Money_${user.id}_${guild.id}`, adicionar);

        await message.reply('Dinheiro enviado com sucesso.');

    },   
}