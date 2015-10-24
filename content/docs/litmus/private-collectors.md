+++
date = ""
title = "Private Collectors"
description = "raintank private collectors"
tags = [ "raintank", "litmus", "collectors" ]
section = ["Litmus"]
+++

# Raintank Remote Collector Agent

The raintank-collector provides the execution of periodic network performance tests including HTTP checks, DNS and Ping.
The results of each test are then transfered back to the Raintank API where they are processed and inserted into a timeseries database.

## To run your own private collector follow these steps.

1. Add the new collector via the raintank portal.
  * navigate to the collectors page then click on the "New Collector" button at the top right of the screen.
  * enter a unique name for the collector and click the "add" button.
2. If you dont already have an apiKey, create a new one.
  * Click on your user name in the left navigation menu, then click the ApiKeys submenu option.
  * Enter the key name and click 'add'
  * be sure to note down the key generated as you will need it for the collector configuration file.
3. Install the collector application
  * Clone the repository
  ```
git clone https://github.com/raintank/raintank-collector.git
  ```
  * Install Go. https://golang.org/doc/install. Once you've installed Go, you'll need to configure your workspace like so: https://golang.org/doc/code.html#Workspaces
  * Install `raintank_probe`, which has taken over some of raintank_collector's functionality.
  ```
go get github.com/raintank/raintank-probe
  ```
  * Copy `raintank-probe` to `raintank-collector`'s directory.
  ```
cp $(which raintank-probe) .
  ```
  * Install all of the dependent node_modules
  ```
npm install
  ```
  * Create a config file using etc/config.json as a template, with the collector name created in step 1 and the ApiKey created in step 2.
  ```
{
	"collector": {
		"name": "PublicTest"
	},
	"numCPUs": 1,
	"serverUrl": "https://portal.raintank.io",
	"apiKey": "<Your API KEY>",
	"probeServerPort": 8080
}
  ```
  * Then start the app.
  ```
nodejs app.js -c /path/to/config.json
  ```
