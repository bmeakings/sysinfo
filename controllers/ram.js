'use strict';

(angular
	.module(appName)
	.controller('MemoryCtrl', function($scope, $timeout, services) {
		const getStaticData = () => {
			(systeminfo
				.memLayout()
				.then((data) => {
					// console.log('ram layout data');
					// console.log(data);

					$scope.$parent.sysinfo.ram.layout = [];

					$timeout(() => {
						for (const i of data) {
							const ramMake = i.manufacturer;
							const ramPart = i.partNum;
							const ramSize = services.formatBytes(i.size, true);
							const ramClock = i.clockSpeed + ' MHz';
							const ramVoltage = i.voltageConfigured;

							$scope.$parent.sysinfo.ram.layout.push({
								'make': ramMake,
								'part': ramPart,
								'size': ramSize,
								'clock': ramClock,
								'voltage': ramVoltage,
							});
						}
					});
				})
				.catch((err) => {
					console.log(err);
				})
			);
		};

		const getDynamicData = () => {
			(systeminfo
				.mem()
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
		};

		getStaticData();
		getDynamicData();
	})
);
