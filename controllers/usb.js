'use strict';

(angular
	.module(appName)
	.controller('USBCtrl', ($scope, $timeout) => {
		function getStaticData() {
			(electronAPI
				.sysInfo('usbDevices')
				.then((data) => {
					console.log('usb devices');
					console.log(data);

					$scope.$parent.sysinfo.usb.list = [];

					$timeout(() => {
						for (const i of data) {
							const usbID = i.id;
							const usbName = i.name;
							const usbType = i.type;
							const usbMnfc = i.manufacturer;

							$scope.$parent.sysinfo.usb.list.push({
								'id': usbID,
								'name': usbName,
								'type': usbType,
								'manufacturer': usbMnfc,
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
