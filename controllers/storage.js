'use strict';

(angular
	.module(appName)
	.controller('StorageCtrl', function($scope, $timeout, services) {
		(systeminfo
			.diskLayout()
			.then((data) => {
				// console.log('disk info');
				// console.log(data);

				$scope.$parent.sysinfo.storage.disks = [];

				$timeout(() => {
					for (const i of data) {
						const diskType = i.type;
						const diskName = i.name;
						const diskSizeRep = services.formatBytes(i.size);
						const diskSizeAct = services.formatBytes(i.size, true);
						const diskInterface = i.interfaceType;
						const diskCylds = i.totalCylinders;
						const diskHeads = i.totalHeads;
						const diskSects = i.totalSectors;

						$scope.$parent.sysinfo.storage.disks.push({
							'type': diskType,
							'name': diskName,
							'size_reported': diskSizeRep,
							'size_actual': diskSizeAct,
							'interface': diskInterface,
							'cylinders': diskCylds,
							'heads': diskHeads,
							'sectors': diskSects,
						});
					}
				});
			})
			.catch((err) => {
				console.log(err);
			})
		);

		(systeminfo
			.blockDevices()
			.then((data) => {
				// console.log('devices info');
				// console.log(data);

				$scope.$parent.sysinfo.storage.volumes = [];

				$timeout(() => {
					for (const i of data) {
						const volName = i.name;
						const volSize = ((i.size) ? services.formatBytes(i.size, true) : '-');
						const volPhys = i.physical;
						const volFsys = ((i.fstype) ? i.fstype.toUpperCase() : '-');

						$scope.$parent.sysinfo.storage.volumes.push({
							'name': volName,
							'size': volSize,
							'physical': volPhys,
							'filesystem': volFsys,
						});
					}
				});
			})
		);
	})
);
