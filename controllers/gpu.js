'use strict';

(angular
	.module(appName)
	.controller('GraphicsCtrl', ($scope, $timeout, services) => {
		(electronAPI
			.sysInfo('gpuInfo')
			.then((data) => {
				// console.log('gpu data');
				// console.log(data);

				$scope.$parent.sysinfo.gpu.list = [];
				$scope.$parent.sysinfo.display.list = [];

				$timeout(() => {
					// gpus
					for (const i of data.controllers) {
						const gpuMake = services.cleanText(i.vendor);
						const gpuModel = services.cleanText(i.model);
						// const gpuMemory = i.vram;

						$scope.$parent.sysinfo.gpu.list.push({
							'make': gpuMake,
							'model': gpuModel,
							// 'ram': gpuMemory,
						});
					}

					// displays
					for (const i of data.displays) {
						const dispMake = services.cleanText(i.vendor);
						const dispModel = services.cleanText(i.model);
						const dispConnect = i.connection;
						const dispRefresh = i.currentRefreshRate;
						const dispCurrResX = i.currentResX;
						const dispCurrResY = i.currentResY;
						const dispMaxResX = i.resolutionX;
						const dispMaxResY = i.resolutionY;
						const dispSizeX = i.sizeX;
						const dispSizeY = i.sizeY;

						$scope.$parent.sysinfo.display.list.push({
							'make': dispMake,
							'model': dispModel,
							'connection': dispConnect,
							'refresh': dispRefresh + ' Hz',
							'res_curr': dispCurrResX + ' x ' + dispCurrResY,
							'res_max': dispMaxResX + ' x ' + dispMaxResY,
							'phy_size': ((dispSizeX && dispSizeY) ? dispSizeX + ' x ' + dispSizeY + ' mm' : '?'),
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
