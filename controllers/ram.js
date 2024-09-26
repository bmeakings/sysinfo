'use strict';

(angular
	.module(appName)
	.controller('MemoryCtrl', ($scope, $timeout, services) => {
		function getStaticData() {
			(electronAPI
				.sysInfo('memLayout')
				.then((data) => {
					console.log('ram layout data');
					console.log(data);

					$scope.$parent.sysinfo.ram.layout = [];

					$timeout(() => {
						for (const i of data) {
							const ramMake = i.manufacturer;
							const ramPart = i.partNum;
							const ramFormat = i.formFactor;
							const ramSize = services.formatBytes(i.size, true);
							const ramClock = i.clockSpeed + ' MHz';
							const ramVoltage = i.voltageConfigured;
							const ramECC = (i.ecc) ? 'yes' : 'no';

							$scope.$parent.sysinfo.ram.layout.push({
								'make': ramMake,
								'part': ramPart,
								'format': ramFormat,
								'size': ramSize,
								'clock': ramClock,
								'voltage': ramVoltage,
								'ecc': ramECC,
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
		getDynamicData();
	})
);
