'use strict';

(angular
	.module(appName)
	.controller('AudioCtrl', ($scope, $timeout, services) => {
		(systeminfo
			.audio()
			.then((data) => {
				// console.log('audio data');
				// console.log(data);

				$scope.$parent.sysinfo.audio.list = [];

				$timeout(() => {
					for (const i of data) {
						const audioType = i.type || '?';
						const audioMake = services.cleanText(i.manufacturer);
						const audioName = services.cleanText(i.name);

						$scope.$parent.sysinfo.audio.list.push({
							'type': audioType,
							'make': audioMake,
							'name': audioName,
						});
					}
				});
			})
			.catch((err) => {
				console.log(err);
			})
		);
	})
);
