## Commands

```bash
npm init
npm install --save-dev react react-dom @types/react @types/react-dom axios
npm install --save-dev semantic-ui-react
npm install --save-dev semantic-ui-css
npm install --save-dev styled-components

sonar-scanner \
  -Dsonar.projectKey=config-interface \
  -Dsonar.organization=wk-j-github \
  -Dsonar.sources=src \
  -Dsonar.host.url=https://sonarcloud.io \
  -Dsonar.login=940f6517a5a823b166a31a9173557dedbdbc9401
```