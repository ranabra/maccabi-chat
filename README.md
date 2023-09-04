# maccabi-chat
Basic chat app based on Node.js + React + socket.io + using 'AppWrite' as a Db backend.
Including a *WhatsApp*™ style, double check-mark message read icons.

To install, simply run both Client folder and Server folder, with "npm install" in command terminal.

To run each project:
* Client - run "npm run dev"
* Server - run "npm run start"



Important note:
--------------
Not provided in this Github Git repository are 2 '.env' files.
The application will *not* run without these '.env' files!
They should be placed at the root of both 'Client' and 'Server' folders, respectively.
If you really need access to the '.env' files, they were already sent to you in advance :)


Security
--------
Users can register and must be logged-in, in order to use the chat.
Also, the server is listening to requests coming from a specific URL and specific port (in this case locally: http://localhost:5000)
Additionally, each request from the client, to post a message on the server, is validated on the server using Oauth 2.0 JWT token (using AppWrite).


*WhatsApp*™ style, double check-mark message read icons
----------------------------------------------------
To detect if the other participants in the chat are active on their end, I am using the latest and most recommended 'Page Visibility API', to check page visibility / focus.
This is working great but appears to be too sensitive and can create false positives. For example, simply hovering the mouse over the other browser's toolbar icon, activates the Page Visibility API.
Another approach will be implemented soon, instead of the recommended 'Page Visibility API', with a less sensitive but equally accurate alternative.


