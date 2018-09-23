//var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "hazard woman alert member blossom situate picture average stumble creek swim barrel space gas say";

module.exports = {
	solc: {
       optimizer: {
          enabled: true,
          runs: 200
        }
    }
	networks: {
		development: {
			host: "localhost",
			port: 9545,
			network_id: "*"
		},
		local: {
			host: "localhost",
			port: 9545,
			network_id: "*"
		}
		,rinkeby: {
			provider: function() {
				return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/AmbDCnH7o4e8izb0VyxN", 0, 10)
			},
			network_id: 5,
			gas: 7099718,
			gasPrice: 100000000000
		}
	}
};
