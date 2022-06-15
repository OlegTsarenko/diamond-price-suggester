##  Node.js Demo Project

### Assumptions
- For the demo project was used demo RapSheets from unreliable source.
To real task need bought a subscription on appropriate service, for example use API from [https://technet.rapaport.com](https://technet.rapaport.com/).
And implement updating via API to get recent data fresh


- The Project was written on JS and after that reworked to TypeScript therefore the project hasn't "proper" TypeScript


- The Project doesn't use multi currency approach therefore we assume only one currency from RapSheets it is USD


- The Project has a few tests of different type only for displaying ability and basic configuration

### API
The project has Swagger API documentation placed on a next url after project starts locally:
[http://localhost:4000/api-docs](http://localhost:4000/api-docs/#/)

### To Start

Create .env file with appropriate variable based on .env.example
Install dependencies with command:

```bash
npm install
```

Start project server in development mode run command:

```bash
npm run dev
```

### Linting
For linting are used ESLint, Prettier, Husky and Lint-staged to prevent commit unsuitable code.
For current testing task after migration to TypeScript it works only for display errors.
No braking wrong commit and not fixing code in automatic mode.
To fix code need manually run command:

```shell
npm run lint:fix
```

To check code:

```shell
npm run lint
```

### Tests
To run testing:

```shell
npm test
```


### To improve
switch to 'ts-node-dev' 
