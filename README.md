# Programming-Project

## How To Install
1. Clone the repository to your local machine.
2. Make sure you're on EhB's school network. If you are not, connect to the VPN first.
3. Open VSCode and open the cloned repository.
4. Open up a terminal in VSCode and make sure you are in the repository's **root** directory. This should contain the src directory.
5. After ensuring you are in the repository's root directory, execute the following command in your VSCode terminal ``npm install``.
6. Ensure all packages are installed correctly and don't give any errors.
7. Change to the /src directory using ``cd ./src``.
8. If you have access to our Teams channel, download the .env file from the ".env" tab and place it in the /src directory, then skip to step 13. If you don't have access, continue to the next step.
9. Make a **.env** file in the /src directory.
10. Ensure this file's **exact** name is ``.env``.
11. Add the following fields to the **.env** file:  
   ```
    DB_HOST=
    DB_USERNAME=
    DB_PASSWORD=
    DB_DATABASE=
    PORT=
    SECRET=
   ```
11. Add the corresponding values to each variable.
12. Save the **.env** file and close it.
13. Go back to your terminal and start the application using ``node app``.
14. Open your favourite browser and enter ``localhost:3000`` in the address bar.
15. You can find all login credentials in our Teams channel under the "Login" tab.


## Problem
Het huidige uitleningssysteem van het MediaLab is allesbehalve gebruiksvriendelijk en efficiënt. Het beheer van uitleningen en het bijhouden van beschikbare middelen vereisen veel manuele handelingen, wat leidt tot fouten en vertragingen.

## Solution
De vernoemde problemen maakten duidelijk dat het MediaLab een digitaal uitleningssysteem nodig had, en daarom kregen wij de opdracht om dit te ontwikkelen. 

Om een efficiënt en gebruiksvriendelijk uitleningssysteem te ontwikkelen, begonnen we met het oplijsten van user stories voor de behoeften van medewerkers en studenten. Daarna ontwierpen we een visueel prototype met Figma en gebruikten Trello om de ontwikkeling te plannen en te volgen. Door regelmatig te werken in sprints konden we snel feedback verwerken en voortgang boeken.

## Team

### Scrum Master
Cedric Pas  
### Database Admin
Soulaymane Tahri
### Backend Lead
Giles Synaeve
### Frontend Lead
Milad Nesim
### Team
Adrien Göksel  
Nehad Tabbakhe  

## Stack
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)  
EJS  
[Easepick Datepicker](https://easepick.com)  

## Sources
![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)
![Stack Overflow](https://img.shields.io/badge/-Stackoverflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)
![GeeksForGeeks](https://img.shields.io/badge/GeeksforGeeks-gray?style=for-the-badge&logo=geeksforgeeks&logoColor=35914c)
![Medium](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)  
### Cedric
https://chatgpt.com/share/919d99f2-8891-4470-b7fb-5beb33f69ca0  
https://chatgpt.com/share/84848a32-574d-4f3e-a5e1-8c64a3ea396b  
https://chatgpt.com/share/a5127808-3411-415d-9d70-16a620af7771   
https://chatgpt.com/share/3f191a80-9dc3-43e9-a12d-797423270b7b  
https://stackoverflow.com/questions/37616719/pass-a-variable-from-javascript-to-ejs  
https://www.geeksforgeeks.org/how-to-convert-javascript-datetime-to-mysql-datetime/  
https://stackoverflow.com/questions/2280104/convert-javascript-to-date-object-to-mysql-date-format-yyyy-mm-dd  
https://stackoverflow.com/questions/70374223/get-response-from-express-js-server-using-fetch-on-frontend  
https://expressjs.com/en/resources/middleware/cors.html  
https://dev.to/speaklouder/how-to-configure-cors-in-nodejs-with-express-11h  
https://stackoverflow.com/questions/61988495/cors-for-express-what-exactly-does-it-do  
https://easepick.com  
https://www.npmjs.com/package/dotenv  
https://chatgpt.com/share/1b0d0c22-30bd-46cd-8b59-ed67a94b3f10  
https://www.freecodecamp.org/news/build-your-first-web-component/  
https://stackoverflow.com/questions/14218725/working-with-sessions-in-express-js  
https://expressjs.com/en/resources/middleware/session.html  


### Giles
https://stackoverflow.com/questions/23923365/how-to-separate-routes-on-node-js-and-express-4  
https://expressjs.com/en/guide/using-middleware.html  
https://chatgpt.com/share/0b9f4769-d0ff-40e8-8b35-73e1b58d732f  
https://chatgpt.com/share/2291395b-f0c7-4a6c-bdf4-a4790cd922db  
https://chatgpt.com/share/df8aed0d-9889-4654-b1d0-31fce19fcceb 
https://medium.com/@readizo.com/implementing-custom-html-elements-know-how-14f3f582b510  
https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements  
https://expressjs.com/en/starter/static-files.html  
https://stackoverflow.com/questions/71992737/using-express-to-serve-public-static-files  
https://chatgpt.com/share/708c8f3a-4085-4023-bb65-40ed49dda635  
https://chatgpt.com/share/d22908db-154d-488b-be9d-b7275082e806  
https://chatgpt.com/share/3c1d7bd5-aa69-4e8b-be8f-745c0909b90d  
https://chatgpt.com/share/3187a51f-8abe-46eb-84c1-ee3352482df8  
https://stackoverflow.com/questions/60353529/creating-a-db-service-in-an-mvc-express-app  
https://medium.com/@anshmunjal/how-to-create-get-and-post-endpoints-in-nodejs-using-expressjs-77fd3953ec38  
https://cesare.substack.com/p/how-to-implement-a-logout-method    
https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests  


### Milad
https://chatgpt.com/share/6a59ee8e-542a-491e-bb0e-773033131250  
https://chatgpt.com/share/231e65d3-e7e7-487a-865f-364bfe00c9e9  
https://chatgpt.com/share/9149a695-991f-45ed-8d0c-eea72bc29b6e  
https://chatgpt.com/share/e6c070d6-94dc-43d0-a4d9-43034c0597c7  
https://chatgpt.com/share/733b51fc-e3d0-45ed-847b-caa36030f9f7  
https://chatgpt.com/share/90535851-550e-4cae-9c9a-f5a85fb0250a  
https://stackoverflow.com/questions/6545379/can-we-directly-remove-nodes-from-a-nodelist  
https://chatgpt.com/share/1769b7a4-d7b0-484f-b22b-338cb45abc0f  

### Soulaymane
https://chatgpt.com/share/de9511a8-2d1c-4f22-af6d-8ed54d3b8fde  
https://chatgpt.com/share/4fbb5e16-395e-4df3-a7f3-506ee9075d77  
https://stackoverflow.com/questions/38549/what-is-the-difference-between-inner-join-and-outer-join/38578#38578  
https://chatgpt.com/share/b2e5dbd5-ead1-4cb5-af9f-fa60865654f1  
https://chatgpt.com/share/650a9380-9afe-4c5d-8e9e-70c7bb523e54  
https://chatgpt.com/share/5439ae75-5949-4520-a438-efa183167159  
https://stackoverflow.com/questions/71580995/how-to-add-a-filter-search-bar-in-js  
https://chatgpt.com/share/6a59ee8e-542a-491e-bb0e-773033131250  
https://chatgpt.com/share/231e65d3-e7e7-487a-865f-364bfe00c9e9  
https://chatgpt.com/share/b36b9cc9-1717-4a94-a40d-634d2789c95a  

### Adrien
https://chatgpt.com/share/08c5d1f9-7f03-4d5b-9b76-152a3388d378  
https://chatgpt.com/share/271a00b8-7131-4b37-b0ee-ff8c45d8414a  
https://stackoverflow.com/questions/20083807/javascript-date-to-sql-date-object  
https://chatgpt.com/share/e5cc00d4-4fc5-48f4-a4d3-24722bd60  
https://chatgpt.com/share/1891adaf-901c-4a48-a034-d6ef39e41845  
https://netspecialist.nl/html-en-css/505-modals-maken-met-html-en-css.html  
https://chatgpt.com/share/540f0919-a2e3-41dc-abb3-265434cb4f25  
https://chatgpt.com/share/35983cdd-b093-44d3-b7aa-1ad0164e5ad9  
https://chatgpt.com/share/424a250d-a471-4e3f-b83c-627559dc2a23  
https://chatgpt.com/share/82ccd9d3-adf9-468c-a8d4-fafa66ef4803  
https://chatgpt.com/share/bf0bd1b1-c6d0-4858-994b-2d32b8b6d664  
https://chatgpt.com/share/ef848b27-07f9-4e32-89b1-dd2ba7f5cec6  
https://chatgpt.com/share/c68f3c90-f44c-45c1-af08-6b45da501441  
https://chatgpt.com/share/2e28d359-cfd5-4fac-9830-8e65f3132f11  
