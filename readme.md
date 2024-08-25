
##  URLCard

  

URLCard is a simple app to create cards with open graph data from urls, its a project to explore my another package [Go-Open-Graph-Scraper-Api](https://github.com/pedrosouza458/go-open-graph-scraper-api)

  

<p>

<a  href="https://github.com/pedrosouza458/urlcard/blob/main/LICENSE">

<img  src="https://img.shields.io/github/license/pedrosouza458/urlcard"  alt="GitHub License" />

</a>

<a  href="https://github.com/pedrosouza458/urlcard/commits/main/">

<img  src="https://img.shields.io/github/last-commit/pedrosouza458/urlcard/main"  alt="GitHub Last Commit" />

</a>

</p>

  

###  Run this code Locally

  

###  Api

  

To run the api, as i dont have a own api for this project at this time, install the [Go-Open-Graph-Scraper-Api](https://github.com/pedrosouza458/go-open-graph-scraper-api).

  

```bash

git  clone  https://github.com/pedrosouza458/go-open-graph-scraper-api

```

  

```bash

go  mod  tidy

```

  

```bash

go  run  .

```

Now the api is running in port 8080.

  

###  Frontend

```bash

git  clone  https://github.com/pedrosouza458/urlcard

```
  

```bash

npm  i

```

  

```bash

npm  run  dev

```

Now the frontend is running in port 3000.

  

Now you can acess http://localhost:3000/card?url=yourwebsitename

the project is in really early development, just some pages are supported, if you wanna check, go to [websites-json](https://github.com/pedrosouza458/go-open-graph-scraper/blob/main/utils/websites.json) in my original go package that serves the api.