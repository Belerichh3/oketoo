const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");
const db = require('quick.db');
const app = express();

const fs = require("fs");
                              // ArdaDemr Youtube Kanalına ticket botu altyapısı
//Uptime için__________________________________________________________________
app.get("/", (req, res) => {
  res.send("ArdaDemr Discord Bot Altyapısı");
});
app.listen(process.env.PORT);

//KOMUT Algılayıcı______________________________________________________________
client.commands = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./komutlar/${file}`);
    let cmdFileName = file.split(".")[0];
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    client.commands.set(cmd.help.name, cmd);
  });
});

//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", () => {
  console.log(`ArdaDemr Discord Bot Altyapısı BOT AKTİF`);
});

client.login(process.env.TOKEN);
// ArdaDemr Youtube Kanalına ticket botu altyapısı


//-----------------------DESTEK KAPATMA-----------------------\\
client.on("message", message => {
  if (message.content.toLowerCase() === "!destek-kapat") {
  if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Bu komut ile sadece talep kapatabilirsin.`)
   message.channel.delete()
   db.delete(`destek_${message.author.id}`)
        }
      })
//-----------------------DESTEK KAPATMA-----------------------\\

client.on("ready", () => {
       const channel = client.channels.cache.get('938965651886854185');
    if (!channel) return console.error("The channel does not exist!");
    channel.join().then(connection => {
        // Yay, it worked!
        console.log("Successfully connected.");
    }).catch(e => {

        // Oh no, it errored! Let's log it to console :)
        console.error(e);
    });
});