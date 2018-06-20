Libs:
'Axios'
'react-easy-chart' 

Installation:
npm install
npm start


Common issues:
API(https://min-api.cryptocompare.com/):
- found cryptoAPI provider is not providing the data about week, month, year. Ofc I can take offlane data from json file but it means we are not using API
Charts:
-the charts are waiting for the API reqiests
-while changing the dropdown chart list value: script waiting for the data
-while changing the period of dropdown chart chart is not changing
-chart x axis: timestamps instead of normal time(because API providing timestamps as time; converting you can see in the code(line 70) didn't help) 


