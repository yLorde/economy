const db = require('quick.db')

module.exports = {
    name: 'sacar',
    async execute(message, args) {

        function noMoney () {
            message.reply('Você não possui dinheiro para sacar.');
        };

        let value = args[0];
        let banco = await db.fetch(`Banco_${user.id}_${guild.id}`);
        let bal = await db.fetch(`Money_${user.id}_${guild.id}`);

        if (!value) value = "all";
        if (banco === null) return noMoney();
        if (banco === 0) return noMoney();
        if (bal === null) bal = 0;
        if (value === 'all') value = banco;

        let novoValue = banco - value;
        let newValue = bal + value;

        await db.set(`Banco_${user.id}_${guild.id}`, novoValue);
        await db.set(`Banco_${user.id}_${guild.id}`, newValue);

        await message.reply('Dinheiro sacado com sucesso.')

    },
}