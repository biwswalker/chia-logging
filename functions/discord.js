const axios = require('axios')
const url = 'https://discord.com/api/webhooks/842811672451612724/lWr1lB9n2nX-8vf-IFh7qC3P1YjTAJ6YIefV8xcXu8a7aK-gjh-JUFN4wffRiY3i1jMK'


const discordnoti = (proofs, formated_created_at, timespen) => {
    console.log('discordnoti......', "Fuck yeah!! :tada::tada::tada: Finally Got It \n\n " + "`" + `${proofs} ` + "Proofs` on `" + formated_created_at + "` spended `" + timespen + "` [](https://tenor.com/view/excited-baby-gif-10285345)")
    axios.post(url, {
        "username": "Chia",
        "avatar_url": "https://i.imgur.com/4M34hi2.png",
        "content": "Fuck yeah!! :tada::tada::tada: Finally Got It \n\n " + "`" + `${proofs} ` + "Proofs` on `" + formated_created_at + "` spended `" + timespen + "` [](https://tenor.com/view/excited-baby-gif-10285345)",
    })
}

module.exports = discordnoti