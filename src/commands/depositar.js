const db = require('quick.db')

module.exports = {
    name: 'deposiar',
    async execute(message, args) {

        let value = args[0];
        if (!value) return;
        if (isNaN(value));
        if (value < 1) return;
        if (value == 0) return;

        let banco = await db.fetch(`Banco_${user.id}_${guild.id}`);
        if (banco === null) banco = 0;
        let atual = await db.fetch(`Money_${user.id}_${guild.id}`);
        if (atual === null) atual = 0;
        let depositar = value + banco;
        let newValue = atual - value;
        await db.set(`Money_${user.id}_${guild.id}`, newValue);
        await db.set(`Banco_${user.id}_${guild.id}`, depositar)

        message.reply(`Valor depositado com sucesso!`)
    },
}