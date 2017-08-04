#### Local notes _(windows only)_ [back to README](README.md)

debug  
`node-debug ./bin/www`

test application _(only local)_  
`mocha test --NODE_ENV=test_local`
or
`mocha test --watch`

starting MongoDB process without a service:
```
cd C:\Program Files\MongoDB\Server\3.2\bin
mongod --dbpath c:/DB/mongo/test
```
sonar_scanner  
sonar-scanner.bat \
  -Dsonar.projectKey=sonarqube_intervento \
  -Dsonar.organization=dsabia-github \
  -Dsonar.sources=. \
  -Dsonar.host.url=https://sonarcloud.io \
  -Dsonar.login=f382eabcda7d50e7997c04bdcb642e722e6807f5
