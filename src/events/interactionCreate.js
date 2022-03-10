const {
    Interaction,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Permissions,
} = require("discord.js");
const config = require('../config.js')

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isButton()) return

        const cases = {
            close: async () => {
                interaction.message.delete()
            }
        }

        const handler = cases[interaction.customId];
        if (handler) await handler();
    },
}