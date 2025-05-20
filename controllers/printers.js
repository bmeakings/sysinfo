'use strict';

(angular
	.module(appName)
	.controller('PrintersCtrl', ($scope, $timeout) => {
		function getStaticData() {
			(electronAPI
				.sysInfo('printerInfo')
				.then((data) => {
					console.log('printers');
					console.log(data);

					$scope.$parent.sysinfo.printers.list = [];

					$timeout(() => {
						for (const i of data) {
							const prntID = i.id;
							const prntName = i.name;
							const prntModel = i.model;
							const prntStatus = i.status;
							const prntlocal = (i.local) ? 'yes' : 'no';
							const prntShared = (i.shared) ? 'yes' : 'no';
							const prntDefault = (i.default) ? 'yes' : 'no';

							$scope.$parent.sysinfo.printers.list.push({
								'id': prntID,
								'name': prntName,
								'model': prntModel,
								'status': prntStatus,
								'local': prntlocal,
								'shared': prntShared,
								'default': prntDefault,
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
