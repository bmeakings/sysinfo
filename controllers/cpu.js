'use strict';

(angular
	.module(appName)
	.controller('ProcessorCtrl', ($scope, $timeout, services) => {
		function getStaticData() {
			$scope.$parent.sysinfo.cpu.info = {};

			(electronAPI
				.sysInfo('cpuInfo')
				.then((data) => {
					console.log('cpu data');
					console.log(data);

					const cpuMake = services.cleanText(data.manufacturer) || '?';
					const cpuName = services.cleanText(data.brand) || '?';
					const cpuFamily = data.family || '?';
					const cpuModel = data.model || '?';
					const cpuStepping = data.stepping || '?';
					const cpuRevision = data.revision || '?';
					const cpuCount = data.processors || '?';
					const cpuCores = data.physicalCores || '?';
					const cpuThreads = data.cores || '?';
					const cpuSocket = data.socket || '?';
					const cpuFreqBase = ((data.speed) ? data.speed + ' GHz' : '?');
					// const cpuFreqMin = ((data.speedMin) ? data.speedMin + ' GHz' : '?');
					// const cpuFreqMax = ((data.speedMax) ? data.speedMax + ' GHz' : '?');
					const cpuCacheL1d = ((data.cache.l1d) ? services.formatBytes(data.cache.l1d, true) : '?');
					const cpuCacheL1i = ((data.cache.l1i) ? services.formatBytes(data.cache.l1i, true) : '?');
					const cpuCacheL2 = ((data.cache.l2) ? services.formatBytes(data.cache.l2, true) : '?');
					const cpuCacheL3 = ((data.cache.l3) ? services.formatBytes(data.cache.l3, true) : '?');

					let cpuLogo = './imgs/logos-cpu/';

					switch (cpuMake.toLowerCase()) {
						case 'amd': {
							cpuLogo += 'amd_';

							if (cpuName.includes('Duron'))
								cpuLogo += 'duron.png';
							else if (cpuName.includes('Sempron'))
								cpuLogo += 'sempron.png';
							else if (cpuName.includes('Athlon XP'))
								cpuLogo += 'athlon-xp.png';
							else if (cpuName.includes('Athlon 64 X2'))
								cpuLogo += 'athlon-64x2.png';
							else if (cpuName.includes('Athlon 64 FX'))
								cpuLogo += 'athlon-64fx.png';
							else if (cpuName.includes('Athlon 64'))
								cpuLogo += 'athlon-64.png';
							else if (cpuName.includes('Athlon'))
								cpuLogo += 'athlon.png';
							else if (cpuName.includes('Opteron'))
								cpuLogo += 'opteron.png';
							else if (cpuName.includes('Phenom II'))
								cpuLogo += 'phenom2.png';
							else if (cpuName.includes('Phenom'))
								cpuLogo += 'phenom.png';
							else if (cpuName.includes('FX'))
								cpuLogo += 'fx.png';
							else if (cpuName.includes('Ryzen 3'))
								cpuLogo += 'ryzen-3.png';
							else if (cpuName.includes('Ryzen 5'))
								cpuLogo += 'ryzen-5.png';
							else if (cpuName.includes('Ryzen 7'))
								cpuLogo += 'ryzen-7.png';
							else if (cpuName.includes('Ryzen 9'))
								cpuLogo += 'ryzen-9.png';
							else if (cpuName.includes('Threadripper'))
								cpuLogo += 'threadripper.png';
							else if (cpuName.includes('Epyc'))
								cpuLogo += 'epyc.png';

							break;
						}
						case 'intel': {
							cpuLogo += 'intel_';

							if (cpuName.includes('Celeron'))
								cpuLogo += 'celeron.png';
							else if (cpuName.includes('Pentium 4'))
								cpuLogo += 'pentium-4.png';
							else if (cpuName.includes('Pentium III'))
								cpuLogo += 'pentium-3.png';
							else if (cpuName.includes('Pentium m'))
								cpuLogo += 'pentium-m.png';
							else if (cpuName.includes('Pentium'))
								cpuLogo += 'pentium.png';
							else if (cpuName.includes('Core i3'))
								cpuLogo += 'core-i3.png';
							else if (cpuName.includes('Core i5'))
								cpuLogo += 'core-i5.png';
							else if (cpuName.includes('Core i7'))
								cpuLogo += 'core-i7.png';
							else if (cpuName.includes('Core i9'))
								cpuLogo += 'core-i9.png';
							else if (cpuName.includes('Xeon'))
								cpuLogo += 'xeon.png';

							break;
						}
					}

					$timeout(() => {
						$scope.$parent.sysinfo.cpu.info = {
							'make': cpuMake,
							'name': cpuName,
							'family': cpuFamily,
							'model': cpuModel,
							'stepping': cpuStepping,
							'revision': cpuRevision,
							'count': cpuCount,
							'cores': cpuCores,
							'threads': cpuThreads,
							'socket': cpuSocket,
							'logo': cpuLogo,
							'base_freq': cpuFreqBase,
							'cache': {
								'l1d': cpuCacheL1d,
								'l1i': cpuCacheL1i,
								'l2': cpuCacheL2,
								'l3': cpuCacheL3,
							},
						};
					});
				})
				.catch((err) => {
					console.log(err);
				})
			);
		};

		function getDynamicData() {
			$scope.$parent.sysinfo.cpu.info.freq = {};

			(electronAPI
				.sysInfo('cpuClock')
				.then((data) => {
					// console.log('speed data');
					// console.log(data);

					const cpuFreqAvg = ((data.avg) ? data.avg + ' GHz' : '?');
					const cpuFreqMin = ((data.min) ? data.min + ' GHz' : '?');
					const cpuFreqMax = ((data.max) ? data.max + ' GHz' : '?');

					$timeout(() => {
						$scope.$parent.sysinfo.cpu.info.freq = {
							'avg': cpuFreqAvg,
							'min': cpuFreqMin,
							'max': cpuFreqMax,
						};
					});
				})
			);
/*
			(electronAPI
				.sysInfo('cpuTemps')
				.then((data) => {
					console.log('temp data');
					console.log(data);

					const cpuMainTemp = data.main;
					const cpuCoresTemp = data.cores;

					$timeout(() => {
						$scope.$parent.sysinfo.cpu.temp = {
							'curr': (cpuMainTemp > 0) ? cpuMainTemp + ' °C' : '?',
						};
					});
				})
			);
*/
			(electronAPI
				.sysInfo('cpuLoad')
				.then((data) => {
					// console.log('load data');
					// console.log(data);

					const loadCurr = parseFloat(data.currentLoad).toFixed(1) + '%';
					const loadUser = parseFloat(data.currentLoadUser).toFixed(1) + '%';
					const loadSys = parseFloat(data.currentLoadSystem).toFixed(1) + '%';

					$timeout(() => {
						$scope.$parent.sysinfo.cpu.load = {
							'curr': loadCurr,
							'user': loadUser,
							'sys': loadSys,
						};
					});
				})
			);

			setTimeout(getDynamicData, $scope.$parent.updateFreq);
		};
/*
		(electronAPI
			.sysInfo('cpuCache')
			.then((data) => {
				console.log('cache data');
				console.log(data);
			})
		);

		(electronAPI
			.sysInfo('cpuFlags')
			.then((data) => {
				console.log('flags data');
				console.log(data);

				// const cpuFlags = data.split(' ').join(', ');

				// $scope.$parent.sysinfo.cpu.flags = cpuFlags;
			})
			.catch((err) => {
				console.log(err);
			})
		);
*/
		getStaticData();
		getDynamicData();
	})
);
