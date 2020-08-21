# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop cicocore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/cicocore-node.git
git clone git@github.com:<yourusername>/cicocore-lib.git
```

To develop cico or to compile from source:

```bash
git clone git@github.com:<yourusername>/cicocoin.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See cico documentation for building cico on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd bitcore-lib
npm install
cd ../bitcore-node
npm install
```
**Note**: If you get a message about not being able to download cico distribution, you'll need to compile cicod from source, and setup your configuration to use that version.


We now will setup symlinks in `cicocore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf cicocore-lib
ln -s ~/cicocore-lib
rm -rf cicod-rpc
ln -s ~/cicod-rpc
```

And if you're compiling or developing cicocoin:
```bash
cd ../bin
ln -sf ~/cico/src/cicod
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd cicocore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/cicod.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/cicod.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch cicocore-node.json
touch package.json
```

Edit `cicocore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "cicod",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "cicod": {
      "spawn": {
        "datadir": "/home/<youruser>/.cico",
        "exec": "/home/<youruser>/cico/src/cicod"
      }
    }
  }
}
```

**Note**: To install services [cico-insight-api](https://github.com/coiniclesdev/insight-api) and [cico-explorer](https://github.com/coiniclesdev/cico-explorer) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/cicocore-lib
ln -s ~/cicocore-node
ln -s ~/cico-insight-api
ln -s ~/cico-explorer
```

Make sure that the `<datadir>/cico.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=password
rpcport=18332
reindex=1
gen=0
addrindex=1
logevents=1
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../cicocore-node/bin/cicocore-node start
```