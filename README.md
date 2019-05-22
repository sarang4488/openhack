Term Project: OpenHack

Group 6:

Darryl Ferdinands (013533013) <darryl.ferdinands@sjsu.edu>
Jasnoor Brar (013756418) <jasnoor.brar@sjsu.edu>
Sarang Grover (013726102) <sarang.grover@sjsu.edu>
Shabari Girish Ganapathy (013006877) <shabari.girish.ganapathy@sjsu.edu>

GitHub Url: https://github.com/shabari8695/cmpe275project


OpenHack: A distributed enterprise application is basically a hackathon management service designed specifically to 
create and organize hackathons for those people who are seeking out to enhance their coding skills on a higher level 
and of course to enhance their creativity. The hackathons are managed by admin who will create and organize hackathons 
and allow hackers to participate in them in the form of a team. A team will have a minimum and maximum number of team 
members who all will register and pay a fees and only after successful payment, they would be able to participate in the 
Hackathon and submit their code. Once a hackathon has been closed for submissions, the code evaluations will be done by 
judges who will assign a grade to each team. The judge can be any user who is not himself a participant of the same 
hackathon he is supposed to evaluate. Additionally, a user can create his own organization on OpenHack which can be 
joined by other people. These organizations can sponsor Hackathons as well.


How to get this application started:

Backend (Java+Spring) setup:
You can run this application in Eclipse IDE. Start by installing the Apache Common Logging API using the 
link: https://commons.apache.org/logging/

Then set up the Spring Framework Libraries in your Eclipse IDE. Download the latest version of Spring using this 
link: https://repo.spring.io/release/org/springframework/spring

In the package, src/main/java/com/openhack, open the file Application.java and run the application. Your backend will 
be up and running.


Frontend( Reactjs):

Open the frontend folder in one of your editors(preferrably VScode).


In the terminal, run command npm install. This will install all the dependencies including the create-react-app.

Now run command npm start. Your frontend will be up and running.

Flow Instruction : 

After registering, an email link will be sent and only after that will you be able to log in.
After login, views the profile page from where you can navigate to different pages using the navbar buttons and the navbar dropdown.
Manage Hackathon page allows an admin to open, close and finalize a hackathon.You can also view the leaderboard, payment report and hackathon earning report from this page.
On registering for a hackathon, the particular team member will receive the payment link and they are redirected to the code submission page.They will only be able to submit the code if all of them have paid the fee.
The rest of the flow is pretty much easy to understand and are basic.
