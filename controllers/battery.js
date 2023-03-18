'use strict';

(angular
	.module(appName)
	.controller('BatteryCtrl', function($scope, $timeout, services) {
		(systeminfo
			.battery()
			.then((data) => {
				// console.log('battery info');
				// console.log(data);

				const battAvail = data.hasBattery;
				const battMake = data.manufacturer;
				const battModel = data.model;
				const battType = data.type;
				const battCapacityUnit = data.capacityUnit
				const battMaxCapacity = data.designedCapacity;
				const battCurrCapacity = data.currentCapacity;
				const battVoltage = data.voltage;
				const battPcntRemain = data.percent;
				const battTimeRemain = data.timeRemaining;

				$timeout(() => {
					$scope.$parent.sysinfo.battery = {
						'available': battAvail,
						'make': battMake,
						'model': battModel,
						'type': battType,
						'capacity_max': battMaxCapacity + ' ' + battCapacityUnit,
						'capacity_curr': battCurrCapacity + ' ' + battCapacityUnit,
						'voltage': battVoltage,
						'remain_pcnt': battPcntRemain,
						'remain_time': battTimeRemain,
					};
				});
			})
			.catch((err) => {
				console.log(err);
			})
		);
	})
);
