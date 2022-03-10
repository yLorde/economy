module.exports = {
    name: 'ready',
    async execute(client) {
        console.log(`${client.user.tag} está online!`)
        console.log(`Commands: ${client.commands.toJSON().map(c => c.name).join(', ')}`)
        client.user.setStatus('dnd')
        //client.user.setActivity({name: 'Sata213', type: 'WATCHING'})


        const status = [
            {
              name: `Minecraft`,
              activity: `PLAYING`,
            },
          ];
          setInterval(() => {
            var randomStatus = status[Math.floor(Math.random() * status.length)];
            client.user.setActivity({
                name: randomStatus.name,
                type: randomStatus.activity
            })
          }, 10 * 2000);


    },
}