# MVP - Mobile web app.

## Purpose
The purpose of the app is for the players in the club to be able to rate the top three player after each game during the season.
The rates will counted and shown in the leaderboard, as well as be shown in the statistics area - sorted by each game.
Supporters will also be able to register and rate the players.

## Rating
Rating is divided in to three different point-groups.
1 point, 2 points and 3 points...
When a user "rates"/votes - the user will always give one player the 1-pointer, another one the 2-pointer and another one the three-pointer.
A user will only be availible to rate once a week (game-week that is).

## Open/Closed Rating
Admin accounts will be handed out (to the trustworthy...). The admin will be able to open the rating-round as well as close it.
When a game is finnished, one of the admins will go to the admin area - write in the opponents name and open the rating.
Now all the users will be able to to their rating - until the rating is closed again (also done by an admin).

## Sections
Admin section: Open/close rating and add other admins.
Profile section: Store stats about who you have given points as well as the people that have given you points.
Rating section: Where the rating happens.
Statistic section: Show each game-round and the corresponding rates done by all the users.

### Pitfalls
The players is stored beforehand in the database.
This is where the "playernumber" comes in - in the register form. The playernumber will help with connecting
the new user object with the player object, already stored in the database.
If a playernumber is not entered we know that the user is not a player, and a connection between a user object
and a player object is not needed.