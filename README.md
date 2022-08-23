<!-- <div style="display: flex; flex-direction: column; justify-content: center;"> -->
<div style="position: relative;">

<div style="align-self: flex-start;>
<h1 style="color: white"> Lingo Lingo </h1>

<div align="left">
<img src="https://img.shields.io/github/package-json/dependency-version/TitanInSpirit/Project_Atelier/react" />
<img src="https://img.shields.io/github/package-json/dependency-version/TitanInSpirit/Project_Atelier/webpack" />
<img src="https://img.shields.io/github/package-json/dependency-version/TitanInSpirit/Project_Atelier/axios"/>
<img src="https://img.shields.io/github/package-json/dependency-version/TitanInSpirit/Project_Atelier/nodemon"/>
<img src="https://img.shields.io/badge/postgres-%5E12.12-blue">
<img src="https://img.shields.io/badge/zustand-%5E4.0.0-blue">
<img src="https://img.shields.io/badge/firebase-%5E9.9.2-blue">
<img src="https://img.shields.io/badge/socket.io-%5E4.5.1-blue">
<img src="https://img.shields.io/badge/annyang-%5E2.6.1-blue">
<img src="https://img.shields.io/badge/googleapis-%5E105.0.0-blue">
</div>
<br></br>
<div align="center">
  <img src="client/assets/logoWhiteLettering.svg" width=200px>
</div>

 <h2 style="color:#73E0FE"> About: </h2>

Our team was tasked with the development and design of an online language exchange platform consisting of a forum, chat feature, and event scheduler. The forum will allow the user to ask and answer questions to gain a better understanding of a new language. The chat feature allows users to directly message other users and the event calendar will allow users to schedule events.

<hr style="background-color: #5c5c5c;height: 2.0px;"/>

<p align="center">
<a href="#-components-" style="color: white">Components</a> |
<a href="#user-authentication" style="color: white">User Authentication</a> |
<a href="#forum-posts" style="color: white">Forum</a> |
<a href="#discussions-thread" style="color: white">Discussions</a> |
<a href="#live-chat-feature" style="color: white">Live Chat</a> |
<a href="#event-scheduler" style="color: white">Event Scheduler</a> |
<a href="#-installation-" style="color: white">Installation</a> |
<a href="#-contributors-" style="color: white">Contributors</a>
</p>

<hr style="background-color: #5c5c5c;height: 2.0px;"/>

<h2 style="color:#73E0FE"> Components </h2>

This section provides a broad overview of just a few of the exciting functionalities our team implemented for the Lingo Lingo web platform.

- <b> User authentication: </b> New end-users are required to create a user account with log-in details. Upon opening the app, the user will be prompted to provide their log-in details if not already logged in, and/or create a new user account in order to access the app’s functionalities.
- <b> Forum Category Filtering: </b> The user will have the optserion to filter the topics they wish to view by category, or by clicking on any of the module tags on the module description.
- <b> Viewing a Forum Post:  </b>  When users click on a post it will bring up the details of the post and associated responses, allowing the users to interact.
- <b> Live Chat Feature: </b>  Will allow users to chat with individual users directly. Will have a log of all previous conversations and display a list of all connections.
- <b> Events: </b> Will allow users to schedule and announce an event. Events will be clickable to display the event detail and allow the user to save it to their calendar.
- <b> Profiles: </b> User profiles will consist of a brief bio, languages the user wants to learn, current languages the user speaks, the topics they are interested in, and the ability to start a chat with that user. The user will have the ability to add other users to their connections list. The user will be able to modify their own profile.


### User Authentication

<!-- info about user authentication here -->

- The authentication section allows users to create a new account using their email and sign in if they already have an existing account.
- On the signup page, there’s also a sign in link if the user already has an account. After signing up, the page will jump to the create account page for new users to create their account the first time. The create account pages requires users to input their information, upload a profile photo and choose their language interests.
- After confirming the new account, the page will navigate to the home page. When a user signs in, there will be a change password button under their user name, the button takes users to a new page where they can change their password. Additionally, there is a sign out button will allow users to sign out, after signing out users will be brought back to the home page.
- If users already have an account, they can sign in directly, they then will be navigated to the home page. If users forget their password, there is a “forgot password” button which allows user to reset their password. When users start the reset process they will receive a link in the inbox to reset the password.There will also be a message that appears on the top of the page that will remind users to check their inbox. Additionally, the signup page also gives users the option to sign in as a visitor, after clicking it, the user will be brought to the homepage as a visitor.

![sign up](https://media.giphy.com/media/kuLrkcF0EugfYxKq50/giphy.gif)

![sign in](https://media.giphy.com/media/TijjulDBoBADnCiBf8/giphy.gif)

<!-- some text about the above image -->

### Forum Posts
Users can ask questions and sort through them by language, topic, or both. Users can also navigate the site using their voice by speaking forum titles.

![forum titles](https://user-images.githubusercontent.com/41023883/186042128-c1742b20-f3e8-4d97-9f5f-c456b847e4cd.png)


### Forum Category Filtering
Users can click on a topic in the header or in an individual forum module's link in order to filter posts by that topic.

![filter posts](https://user-images.githubusercontent.com/41023883/186042316-90e8555e-607d-423d-ab50-458656eeaf95.png)

### Posting
Users can click the multifunction button in the bottom right to submit new questions to the forum.

![submit new questions](https://user-images.githubusercontent.com/41023883/186042457-4f97cb05-fbb6-4e34-b46b-26b719975f1b.png)


### Discussions Thread
The Discussions Forum is where users can talk about various topics, share useful information and, in general, help each other with any questions and curiosities they may have while learning a new language. Clicking the reply icon next to the main post or any user response will allow you to respond to that message.



### Live Chat Feature
The live chat feature allows our users to connect directly and instantly with each other on the platform. Messages can be started with any other person who is connected as a contact. A user can establish a 1 on 1 conversation or they can establish a group conversation with any number of their contacts. Once the conversation is started by one user, all other participating contacts will get the new conversation added to their live chat automatically.



### Event scheduler

The events component gives users an overview of the events they can attend. All the events are populated in the calendar. When a user clicks on an individual event, the event detail will be displayed on the side along with the map indicating the location if the address is provided in the description. A user can respond to join an event by clicking the “Add to your event” button and retract from the attendee list by clicking the “Cancel” button. Upon clicking on the empty spot on the calendar or the multi-function button, a user can create an event where the language and jargon selection are limited by the user’s preference.


#### screenshots

<img src="./client/assets/p1.png">&nbsp;<img src="./client/assets/p2.png">

<!-- some text about the above image -->

<hr style="background-color: #5c5c5c;height: 2.0px;"/>

<h2 style="color:#73E0FE"> Installation: </h2>

Getting your own copy of Project Atelier is easy!

- Fork and clone this repo to your local machine
- Run npm install to install dependencies
- Read about the following scripts to understand their functionality
- Enjoy!

### Scripts

The following scripts can be found in package.json

<hr style="background-color: #5c5c5c;height: 2.0px;"/>

`npm run server`

<i> Launches nodemon to watch the server path and serve static files </i>

`npm run dev`

<i> Launches webpack to bundle your webapp and watch for any changes </i>

`npm run start`

<i> Bundles your webpack in development mode </i>

`npm run build`

<i> Bundles your webpack in production mode </i>

`npm run test`

<i> Calls jest to run any user defined tests </i>

```
// in package.json

"scripts": {
    "server-dev": "npx nodemon --watch server server/server.js",
    "dev": "npx webpack --watch",
    "start": "Webpack --mode=development",
    "build": "webpack --mode=production",
    "test": "jest"
  },
```

<hr style="background-color: #5c5c5c;height: 2.0px;"/>

<h2 style="color:#73E0FE"> Contributors </h2>

<table >
    <td align="center">
        <a href="https://github.com/tinyfishbigpond" style="color: white; text-decoration: none;">
            <img src="https://avatars.githubusercontent.com/u/104777892?v=4" width="100px;" alt=""/>
            <br />
            <sub>
                <b><span style="color: white"> David F. </span> | <span style="color: #229AEF">tinyfishbigpond</span></b>
            </sub>
        </a>
        <br /><br>
        <a href="https://github.com/Team-Scar/Lingo-Lingo/issues?q=is%3Aclosed+author%3Atinyfishbigpond" title="Commits">💻</a> &nbsp;
        <a href="https://github.com/Team-Scar/Lingo-Lingo/tree/dev/client/src/components/livechat" title="Component">📖</a> &nbsp;
    </td>
    <td align="center">
        <a href="https://github.com/dkroll713" style="color: white; text-decoration: none;">
            <img src="https://avatars.githubusercontent.com/u/41023883?v=4" width="100px;" alt=""/>
            <br />
            <sub>
                <b><span style="color: white"> David K. </span> | <span style="color: #229AEF">dkroll713</span></b>
            </sub>
        </a>
        <br /><br>
        <a href="https://github.com/Team-Scar/Lingo-Lingo/issues?q=is%3Aclosed+author%3Adkroll713" title="Commits">💻</a> &nbsp;
        <a href="https://github.com/Team-Scar/Lingo-Lingo/tree/dev/client/src/components/forum" title="Component">📖</a> &nbsp;
    </td>
    <td align="center">
        <a href="https://github.com/syed216" style="color: white; text-decoration: none;">
            <img src="https://avatars.githubusercontent.com/u/89633880?v=4" width="100px;" alt=""/>
            <br />
            <sub>
                <b><span style="color: white"> Fahad S.</span> | <span style="color: #229AEF"> syed216</span></b>
            </sub>
        </a>
        <br /><br>
        <a href="https://github.com/Team-Scar/Lingo-Lingo/issues?q=is%3Aclosed+author%3Asyed216" title="Commits">💻</a> &nbsp;
        <a href="https://github.com/Team-Scar/Lingo-Lingo/tree/dev/client/src/components/userprofile" title="Component">📖</a> &nbsp;
    </td>
    <td align="center">
        <a href="https://github.com/mayliang021" style="color: white; text-decoration: none;">
            <img src="https://avatars.githubusercontent.com/u/97858299?v=4?s=100" width="100px;" alt=""/>
            <br />
            <sub>
                <b><span style="color: white"> May L.</span> | <span style="color: #229AEF"> mayliang021</span></b>
            </sub>
        </a>
        <br /><br>
        <a href="https://github.com/Team-Scar/Lingo-Lingo/issues?q=is%3Aclosed+author%3Amayliang021" title="Commits">💻</a> &nbsp;
        <a href="https://github.com/Team-Scar/Lingo-Lingo/tree/dev/client/src/components/userauth" title="Component">📖</a> &nbsp;
    </td>
    <td align="center">
        <a href="https://github.com/sharonhw888" style="color: white; text-decoration: none;">
            <img src="https://avatars.githubusercontent.com/u/101309894?v=4" width="100px;" alt=""/>
            <br />
            <sub>
                <b><span style="color: white"> Sharon W.</span> | <span style="color: #229AEF"> sharonhw888</span></b>
            </sub>
        </a>
        <br /><br>
        <a href="https://github.com/Team-Scar/Lingo-Lingo/issues?q=is%3Aclosed+author%3Asharonhw888" title="Commits">💻</a> &nbsp;
        <a href="https://github.com/Team-Scar/Lingo-Lingo/tree/dev/client/src/components/events" title="Component">📖</a> &nbsp;
    </td>
    <td align="center">
        <a href="https://github.com/Symphon-y" style="color: white; text-decoration: none;">
            <img src="https://avatars.githubusercontent.com/u/90964291?v=4?s=100" width="100px;" alt=""/>
            <br />
            <sub>
                <b><span style="color: white"> Travis R. </span> | <span style="color: #229AEF"> Symphon-y </span></b>
            </sub>
        </a>
        <br /><br>
        <a href="https://github.com/Team-Scar/Lingo-Lingo/issues?q=is%3Aclosed+author%3ASymphon-y" title="Commits">💻</a> &nbsp;
        <a href="https://github.com/Team-Scar/Lingo-Lingo/tree/dev/client/src/components/sidebar" title="Component">📖</a> &nbsp;
    </td>
    <td align="center">
        <a href="https://github.com/Symphon-y" style="color: white; text-decoration: none;">
            <img src="https://avatars.githubusercontent.com/u/18475074?v=4" width="100px;" alt=""/>
            <br />
            <sub>
                <b><span style="color: white"> Viren P. </span> | <span style="color: #229AEF"> vpatel89 </span></b>
            </sub>
        </a>
        <br /><br>
        <a href="https://github.com/Team-Scar/Lingo-Lingo/issues?q=is%3Aclosed+author%3Avpatel89" title="Commits">💻</a> &nbsp;
        <a href="https://github.com/Team-Scar/Lingo-Lingo/tree/dev/client/src/components/forum_details" title="Component">📖</a> &nbsp;
    </td>
<table>
</div>
    <div style="position: absolute; top: 150vw; left: -8vw; opacity: .04; background-image: url(Assets/leftFoot.svg); background-repeat: no-repeat; transform: scale(100);">
    &nbsp;
    </div>
        <div style="position: absolute; top: 400vw; margin-left: 90vw; opacity: .04; background-image: url(Assets/Favicon.svg); background-repeat: no-repeat; transform: scale(100);">
    &nbsp;
    </div>
        <div style="position: absolute; top: 850vw; left: -8vw; opacity: .04; background-image: url(Assets/leftFoot.svg); background-repeat: no-repeat; transform: scale(100);">
    &nbsp;
    </div>
</div>
