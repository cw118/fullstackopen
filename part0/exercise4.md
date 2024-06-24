# Exercise 0.4

```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server
  server-->>browser: 302 redirect to https://studies.cs.helsinki.fi/exampleapp/notes
  deactivate server

  Note right of server: The redirect URL is specified in Location in the POST request headers

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server-->>browser: HTML document
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server-->>browser: CSS style sheet
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  activate server
  server-->>browser: the JavaScript file
  deactivate server

  Note right of browser: Browser executes JavaScript code that fetches JSON from server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server-->>browser: [{ "content": "ddd", "date": "2024-06-24T11:18:46.666Z" }, ... ]
  deactivate

  Note right of browser: Browser executes callback function that renders notes stored in JSON
```
