# maccabi-chat
Basic chat app based on Node.js + React + socket.io + using 'AppWrite' as a Db backend.
Including a WhatsApp style, double check-mark message read icons.

To install, simply run both Client folder and server folder, with "npm install" in command terminal.

To run each project:
* Client - run "npm run dev"
* Server - run "npm run start"

Note the the server is listening to the client on port 5173 (set in 'index.js' on the server).
If for some reason the client is running on a different port than 5173m then set accordingly on the server ('index.js').


Security
--------
Users can register and must be logged-in, in order to use the chat.
Also, the server is listening to requests coming from specific URL and specific port (in this case locally: http://localhost:5173)
Additionally, each request from the client, to post on the server, is validated on the server using Auth2 JWT token (using AppWrite)


WhatsApp style, double check-mark message read icons
----------------------------------------------------
Detecting if the other participants in the chat are active on their end, I am using the latest and most recommended 'Page Visibility API', to check page visibility / focus.
This is working great but appears to be too sensitivem and can create false negatives, for example, simply hovering to mouse over the other browser toolbar icon, activates the Page Visibility API


