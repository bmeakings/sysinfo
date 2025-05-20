'use strict';

(angular
	.module(appName)
	.controller('BluetoothCtrl', ($scope, $timeout) => {
		function getStaticData() {
			(electronAPI
				.sysInfo('bluetoothDevices')
				.then((data) => {
					console.log('bluetooth devices');
					console.log(data);

					$scope.$parent.sysinfo.bluetooth.list = [];

					$timeout(() => {
						for (const i of data) {
							const btName = i.name;
							const btType = i.type;
							const btMnfc = i.manufacturer;
							const btConn = i.connected;

							$scope.$parent.sysinfo.usb.list.push({
								'name': btName,
								'type': btType,
								'manufacturer': btMnfc,
								'connected': btConn,
							});
						}
					});
				})
				.catch((err) => {
					console.log(err);
				})
			);
		}

		getStaticData();
	})
);
