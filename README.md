# maccabi-chat
Basic chat app based on Node.js + React + socket.io + using 'AppWrite' as a Db backend.
Including a WhatsApp style, double check-mark message read icons.

To install, simply run both Client folder and Server folder, with "npm install" in command terminal.

To run each project:
* Client - run "npm run dev"
* Server - run "npm run start"

Note that the server is listening to the client on port 5173 (set in 'index.js' on the server).
If for some reason the client is running on a different port than 5173, then set accordingly on the server ('index.js').


Important note:
--------------
Not provided in this Github Git repository is an '.env' file.
The application will *not* run without this '.env' file!
If you really need access to the '.env' file, it was already sent to you in advance :)


Security
--------
Users can register and must be logged-in, in order to use the chat.
Also, the server is listening to requests coming from a specific URL and specific port (in this case locally: http://localhost:5173)
Additionally, each request from the client, to post a message on the server, is validated on the server using Oauth 2.0 JWT token (using AppWrite).


WhatsApp style, double check-mark message read icons
----------------------------------------------------
To detect if the other participants in the chat are active on their end, I am using the latest and most recommended 'Page Visibility API', to check page visibility / focus.
This is working great but appears to be too sensitive and can create false positives. For example, simply hovering the mouse over the other browser's toolbar icon, activates the Page Visibility API.


