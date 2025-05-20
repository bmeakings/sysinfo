'use strict';

(angular
	.module(appName)
	.controller('NetworkCtrl', ($scope, $timeout, services) => {
		function getStaticData() {
			(electronAPI
				.sysInfo('networkInfo')
				.then((data) => {
					console.log('network interfaces');
					console.log(data);

					$scope.$parent.sysinfo.network.list = [];

					$timeout(() => {
						for (const i of data) {
							const intfc = i.iface;
							const intfcType = i.type;
							const intfcSpeed = i.speed;
							const intfcDefault = (i.default) ? 'yes' : 'no';
							const ip4Address = i.ip4;
							const ip4Subnet = i.ip4subnet;
							const ip6Address = i.ip6;
							const ip6Subnet = i.ip6subnet;
							const macAddress = i.mac;
							const addressDHCP = (i.dhcp) ? 'yes' : 'no';

							$scope.$parent.sysinfo.network.list.push({
								'interface': intfc,
								'interfaceType': intfcType,
								'interfaceSpeed': intfcSpeed + ' Mbps',
								'interfaceDefault': intfcDefault,
								'ipv4Address': ip4Address,
								'ipv4Subnet': ip4Subnet,
								'ipv6Address': ip6Address,
								'ipv6Subnet': ip6Subnet,
								'macAddress': macAddress,
								'addressDHCP': addressDHCP,
							});
						}
					});
				})
				.catch((err) => {
					console.log(err);
				})
			);
		}

		function getDynamicData() {
			(electronAPI
				.sysInfo('memInfo')
				.then((data) => {
					// console.log('ram data');
					// console.log(data);

					const ramTotal = services.formatBytes(data.total, true);
					const ramUsed = services.formatBytes(data.used, true);
					const ramAvail = services.formatBytes(data.available, true);

					$timeout(() => {
						$scope.$parent.sysinfo.ram.info = {
							'total': ramTotal,
							'used': ramUsed,
							'available': ramAvail,
						};
					});
				})
				.catch((err) => {
					console.log(err);
				})
			);

			setTimeout(getDynamicData, $scope.$parent.updateFreq);
		}

		getStaticData();
		// getDynamicData();
	})
);
