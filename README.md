# battle
install all dependies by command
```
npm i
```
run project by 

```
node server.js
```

use url: {server url}/user/login for getting token for auth

pass that token in all battel api header as


### Authorization : Bearer << Token >>

if token is not send it will show as forbidden
 
 API's
 
 ### 1) Get List ot battle
```
  URL: http://< server_url >:8080/battel/list

  method: GET
  ```
 ### 2) Get Count of Battle
```
  URL: http://< server_url >:8080/battel/count

  method: GET
```
 ### 3) Search in Battle
```
  URL: http://< server_url >:8080/battel/search?king=Robb Stark

  method: GET
```
 ### 4) Get Stats of Battle
  ```
  URL: http://< server_url >:8080/battel/stats

  method: GET
  ```

 
