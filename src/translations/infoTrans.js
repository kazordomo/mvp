export default {
    swedish: {
        general: {
            text: `
                Efter varje match under säsongen öppnas röstningen för just den omgången.
                Syftet är att dela ut tre olika lirarpoäng; 1 poäng, 2 poäng och 3 poäng.
                Alla dessa poäng måste delas ut för att rösta. Alltså räcker det inte med att bara ge bort en
                3-poängare till någon, även fast resterande spelare inte förtjänat poäng.
            `,

        },
        rate: {
            title: 'Rösta',
            text: `
                Dela ut dina lirarpoäng för omgången. Röstningen är definitiv, det går inte att ändra när du väl skickat in.
                Du väljer tre spelare och ger dem de olika värdena och skickar sedan in resultatet på "skicka"-knappen som dyker upp.
                Det finns chans att "reseta" dina gjorda röster, fram tills du väl skickat in.
            `,
        }, 
        leaderboard: {
            title: 'Poängliga',
            text: `
                Visar poängen för varje enskild spelare - alla poäng från varje omgång adderade.
                Varje "spelar-rad" under poängligan är även en länk. Klickar du på en spelare hamnar du på dennes
                profil.
            `,
        }, 
        statistics: {
            title: 'Statistik',
            text: `
                Alla röster gjorda, sorterade i dess omgång. Omgångarna är sorterade efter runda, vilket innebär att
                den senaste matchen ligger högst upp och den första längt ner. Klicka på omgången för att se hur alla användare har röstat.
            `,
        },
        profile: {
            title: 'Profil',
            text: `
                Håll koll på dina egna och andras röster.
                "Poäng från användare" visar alla de räster spelaren har fått från andra användare.
                "Utdelade poäng" visar alla de röster användaren har givit ut.
            `,
        },
        admin: {
            title: 'Admin',
            text: `
                "Öppna röstning" kommer att göra röstning tillgänglig för alla användare.
                Efter en match; skriv in motståndarnas namn och klicka på öppna röstning.
                "Stäng röstning" stänger röstningen. När detta sker avgör någon av admins - huruvida måste en röstning stängas
                innan kommande match.
                "Gör till admin" - skriv in en användare emailaddress och klicka på knappen. Nu är denna användaren också en admin.
            `,
        }, 
    },
    english: {
        general: {
            text: `
                After each game during the seaseon, the rating will be opened.
                The purpose is to hand out three different player-points; 1 point, 2 points and 3 points.
                All of these points (1, 2 ,3) needs to be used. In other words, it's not enough to just hand out the three-pointer.
            `,

        },
        rate: {
            title: 'Rate',
            text: `
                Hand out your playerpoints for that game. You can not change your rating when you've sent it in.
                Choose three players and give them your points. When three players is choosen, press the "skicka"-knappen that will appear.
                You are able to reset your ratings through the "reset"-button until you've sent the points in.
            `,
        }, 
        leaderboard: {
            title: 'Leaderboard',
            text: `
                All the points given added up to a total score for each player.
                Each "player-row" in the leaderboard also acts as a link to that players profile.
            `,
        }, 
        statistics: {
            title: 'Statistics',
            text: `
                All ratings done, sorted to their rating occasion. The latest game will always be on top. Press the occasion/game
                to see all users ratings.
            `,
        },
        profile: {
            title: 'Profile',
            text: `
                Keep track of your and everyone elses ratings.
                "Poäng från användare" will show the players ratings gotten from users.
                "Utdelade poäng" will show all the ratings the user have handed out.
            `,
        },
        admin: {
            title: 'Admin',
            text: `
                "Öppna röstning" will make the rating availble for all the users. After each game an admin will write in the opponents name
                and open the rating.
                "Stäng Röstning" closes the rating. This is decided by the admin/s, but has to be done before the next game.
                "Gör til admin" - enter a email of one of the users and press the button. Now that user will also be an adnmin.
            `,
        }, 
    },
}
