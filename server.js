import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
// import airtable from 'airtable';
// import path, { dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';

// dotenv.config();

// // creating the express file path
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express(); // creating the express app
app.use(express.json()); // parse the data
// app.use(express.urlencoded({ extended: true })); // recall this is for forms (getting data from). however things CAN be different especially if using the proper setting to serve the html page

app.use(express.static('public')); //now we can serve static files

app.use(cors()); //allows cross origin request or requests from browser/frontend to server

app.get('/', (req, res) => {
  res.sendFile('public/index.html');
  // i didn't have to use file or dirname..
  // well i imagine this works cause of the index.html page. browsers understand that index.html page is the homepage
});

// app.get('/dsa', (req, res) => {
//   res.redirect('/');
// });

// app.get('/project-request', (req, res) => {
//   console.log("Route Received");
//   res.sendFile('public/project-request.html', { root: __dirname });

//   // so this is especially useful for named html files. the browser will need the absolute path(filepath) and dirname
// });

// app.get('/start-project', (req, res) => {
//   res.redirect('/project-request');
// });

app.post("/create-client", async (req, res) => {
  // res.send("Hello Niggga");
  try {
    const response = await fetch("https://api.airtable.com/v0/appBeSDYUoBhDY3Se/Users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              //           platform: formData.getAll("platform"), // "All" handles multi-select
              // service: formData.getAll("service"),
              // description: formData.get("description"), // get(simply get): textareas and inputs
              // state: formData.getAll("state"),
              // // timeline: formData.getAll("timeline"),
              // projectStage: formData.getAll("project-stage"),
              // position: formData.getAll("position"),
              // firstName: formData.get("first-name"),
              // lastName: formData.get("last-name"),
              // email: formData.get("email"),
              // source: formData.get("info-source")
              Name: req.body.Name,
              Email: req.body.Email,
              Role: req.body.Role
            }
          }
        ]
      })
    })

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("RESPONSE:", data); // 👈 THIS is what you're missing

    res.json(data); // what does this do?
    // console.log(response.status);
    // console.log(data);

  } catch (err) {
    console.log(err);
    res.status(500).send("server error, something went wrong")
  }

  // console.log(req.body);
  // for the select, the request just wrapped all in the body and took the selected option. it didn't make it into an array. but hey things could still be different
});

// app.get('/', (req, res) => {
//   res.send("hello");
// })

app.listen(3000, console.log("server is listening at http://localhost:3000"));

// //we'ev setup our server.

// // console.log(process.env.AIRTABLE_API_KEY);