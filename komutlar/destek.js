const Discord = require('discord.js');
const db = require('quick.db');
// ArdaDemr Youtube Kanalına ticket botu altyapısı
exports.run = async (client, message, args) => {
	message.delete({ timeout: 5000 })
    if(message.channel.id !== "929858627618103356") return message.reply('bu komut sadece destek kanalında çalışır.').then(message => { message.delete({ timeout: 5000 })})
   if (message.guild.channels.cache.get(db.fetch(`destek_${message.author.id}`))) return false || message.channel.send('Şu anda mevcut bir talebin var.').then(message => { message.delete({ timeout: 5000 })})
      
    let kullanici = message.author
    let yetkili = message.guild.roles.cache.find(x => x.id == "812989489852973077") // YETKİLİ ROL İD
    let herkes = message.guild.roles.cache.find(x => x.name == "@everyone")
    message.guild.channels.create(`destek-${message.author.username}`, "text").then(async c => {
        db.set(`destek_${message.author.id}`, c.id)
        const category = message.guild.channels.cache.get('927246842973020200') // Kategori id
        c.setParent(category.id)
        c.send(`${kullanici} destek talebin oluşturuldu. Destek ekibi seninle buradan ilgilenecek.\nTalebi kapatmak icin !destek-kapat`)
        c.overwritePermissions([
            {
                id: kullanici.id,
                allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','SEND_MESSAGES'],
            },
            {
                id: yetkili.id,
                allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','SEND_MESSAGES'],
            },
            {
                id: herkes.id,
                deny: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','SEND_MESSAGES'],
            },
        ]);
    // ArdaDemr Youtube Kanalına ticket botu altyapısı
})



};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'talep'
};