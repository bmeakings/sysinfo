'use strict';

(angular
	.module(appName)
	.controller('GraphicsCtrl', ($scope, $timeout, services) => {
		(electronAPI
			.sysInfo('gpuInfo')
			.then((data) => {
				console.log('gpu data');
				console.log(data);

				$scope.$parent.sysinfo.gpu.list = [];
				$scope.$parent.sysinfo.display.list = [];

				$timeout(() => {
					// gpus
					for (const i of data.controllers) {
						const gpuMake = services.cleanText(i.vendor);
						const gpuModel = services.cleanText(i.model);
						const gpuMemory = services.formatBytes(i.vram * 1048576, true);

						let gpuLogo = './imgs/logos-gpu/';

						if (!gpuMake)
							gpuLogo = '';
						else if (gpuModel.includes('Radeon'))
							gpuLogo += 'radeon.svg';
						else if (gpuModel.includes('GeForce'))
							gpuLogo += 'geforce.svg';
						else if (gpuMake.includes('3dfx'))
							gpuLogo += '3dfx.svg';
						else if (gpuMake.includes('ATI'))
							gpuLogo += 'ati.svg';
						else if (gpuMake.includes('Matrox'))
							gpuLogo += 'matrox.svg';
						else if (gpuMake.includes('Intel'))
							gpuLogo += 'intel.svg';
						else if (gpuMake.includes('S3 Graphics'))
							gpuLogo += 's3.svg';

						$scope.$parent.sysinfo.gpu.list.push({
							'make': gpuMake,
							'logo': gpuLogo,
							'model': gpuModel,
							'ram': gpuMemory,
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
						const dispPxlDepth = i.pixelDepth;

						$scope.$parent.sysinfo.display.list.push({
							'make': dispMake,
							'model': dispModel,
							'connection': dispConnect,
							'refresh': dispRefresh + ' Hz',
							'pixel_depth': dispPxlDepth + ' bpp',
							'res_curr': dispCurrResX + ' x ' + dispCurrResY,
							'res_max': dispMaxResX + ' x ' + dispMaxResY,
							'phy_size': ((dispSizeX && dispSizeY) ? dispSizeX + ' x ' + dispSizeY + ' cm' : '?'),
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
