const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');
const { OK } = require('sqlite3');

cmd({
    pattern: "script",
    alias: ["repo", "sc", "info", "getbot"],
    desc: "Fetch information about a GitHub repository.",
    react: "🤍",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/sumon9836/KAISEN-MD';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const repoData = await response.json();

        // Format the repository information v
        const formattedInfo = `𓆩 𝐇𝐄𝐋𝐋𝐎 𝐓𝐇𝐄𝐑𝐄  𝐁𝐎𝐓 𝐔𝐒𝐄𝐑! 🥰𓆪

> Ｓｉｍｐｌｅ・Ｉｃｙ・Ｃｏｌｄ・Ｒｉｃｈ𝓁𝔂 Ｌｏａｄｅｄ ｗｉｔｈ Ａｍａｚｉｎｇ Ｆｅａｔｕｒｅｓ — 𝓚𝓐𝓘𝓢𝓔𝓝 𝙈𝘿 ❄️


╭─────────◇◇───────╮
│🫶 𝙏𝙃𝘼𝙉𝙆 𝙔𝙊𝙐 𝙁𝙊𝙍 𝙐𝙎𝙄𝙉𝙂│
╰─────────◇◇───────╯

> 𝘿𝙤𝙣’𝙩 𝙛𝙤𝙧𝙜𝙚𝙩 𝙩𝙤 ⭐ 𝙎𝙏𝘼𝙍 & 🍴 𝙁𝙊𝙍𝙆 𝙏𝙃𝙀 𝙍𝙀𝙋𝙊:

\`🔮 𝐁𝐎𝐓 𝐑𝐄𝐏𝐎 𝐋𝐈𝐍𝐊:\`💀👇

> https://github.com/sumon9836/KAISEN-MD
━━━━━━━━━━━━━━━━━━━━━━

\`📡 𝐁𝐎𝐓 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐆𝐂:\`💀👇

> https://chat.whatsapp.com/CQyxExEBMGvEnkA32zqbNY

\`🤖 𝐁𝐎𝐓 𝐍𝐀𝐌𝐄:\`🍑

> ${repoData.name}

\`👑 𝐎𝐖𝐍𝐄𝐑 𝐍𝐀𝐌𝐄:\`🍉

> ${repoData.owner.login}

\`🌟 𝐒𝐓𝐀𝐑𝐒:\`🌳

> ${repoData.stargazers_count}

\`🍴 𝐅𝐎𝐑𝐊𝐒:\`☔

> ${repoData.forks_count}

\`📝 𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍:\`🍒

> ${repoData.description || 'No description'}\n

━━━━━━━━━━━━━━━━━━━━━

> © 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝘽𝙮  『 𝙆𝘼𝙄𝙎𝙀𝙉 - 𝙈𝘿 』 ꯭̽💖` ;
            
            
/**𝐇𝐄𝐋𝐋𝐎 𝐓𝐇𝐄𝐑𝐄 𓂀 𝐊คเรєภ𓍯 𝐖.𝐀 𝐁𝐎𝐓 𝐔𝐒𝐄𝐑!😇🥰* 

> *sɪᴍᴘʟᴇ, ɪᴄʏ, ᴄᴏʟᴅ  & ʀɪᴄʜ ʟᴏᴀᴅᴇᴅ ʙᴏᴛ ᴡɪᴛʜ ᴀᴍᴀᴢɪɴɢ ғᴇᴀᴛᴜʀᴇs, ᴋᴇʀᴍ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ.*❄️

*𝐓𝐇𝐀𝐍𝐊𝐒 𝐅𝐎𝐑 𝐔𝐒𝐄𝐈𝐍𝐆 KAISEN -𝐌𝐃🫶* 

> *ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ sᴛᴀʀ & ғᴏʀᴋ ᴛʜᴇ ʀᴇᴘᴏ🌟🍴*

https://github.com/sumon9836/KAISEN-MD
──────────────────
\`BOT SUPPORT GC:\`👀
> https://chat.whatsapp.com/Ja7bWhgrFkc3V67yBjchM2

\`BOT NAME:\`🍉
> ${repoData.name}

\`OWNER NAME:\`🍓
> ${repoData.owner.login}

\`STARS:\`🌟
> ${repoData.stargazers_count}

\`FORKS:\`💝
> ${repoData.forks_count}

\`DESCRIPTION:\`📃
> ${repoData.description || 'No description'}\n
──────────────────
\n> *© ᴘσωєʀє∂ ву 𝖐𝚊𝚒𝚜𝖊𝖓 𝙼ԃ⎯꯭̽💖*;*/

        // Send an image with the formatted info as a caption and context info
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/hwl3d4.jpg` },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '',
                    newsletterName: '',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send the audio file with context info
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/ulh93p.mp3' },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '',
                    newsletterName: '',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
}); 