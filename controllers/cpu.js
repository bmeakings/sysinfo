'use strict';

(angular
	.module(appName)
	.controller('ProcessorCtrl', ($scope, $timeout, services) => {
		function getStaticData() {
			$scope.$parent.sysinfo.cpu.info = {};

			(electronAPI
				.sysInfo('cpuInfo')
				.then((data) => {
					// console.log('cpu data');
					// console.log(data);

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

					let cpuLogo = './imgs/cpu-logos/' + cpuMake.toLowerCase();

					switch (cpuMake.toLowerCase()) {
						case 'amd': {
							if (cpuName.includes('Duron'))
								cpuLogo += '_duron';
							else if (cpuName.includes('Sempron'))
								cpuLogo += '_sempron';
							else if (cpuName.includes('Athlon XP'))
								cpuLogo += '_athlon-xp';
							else if (cpuName.includes('Athlon 64 X2'))
								cpuLogo += '_athlon-64x2';
							else if (cpuName.includes('Athlon 64 FX'))
								cpuLogo += '_athlon-64fx';
							else if (cpuName.includes('Athlon 64'))
								cpuLogo += '_athlon-64';
							else if (cpuName.includes('Athlon'))
								cpuLogo += '_athlon';
							else if (cpuName.includes('Phenom II'))
								cpuLogo += '_phenom2';
							else if (cpuName.includes('Phenom'))
								cpuLogo += '_phenom';
							else if (cpuName.includes('FX'))
								cpuLogo += '_fx';
							else if (cpuName.includes('Opteron'))
								cpuLogo += '_opteron';
							else if (cpuName.includes('Threadripper'))
								cpuLogo += '_threadripper';
							else if (cpuName.includes('Ryzen 3'))
								cpuLogo += '_ryzen-3';
							else if (cpuName.includes('Ryzen 5'))
								cpuLogo += '_ryzen-5';
							else if (cpuName.includes('Ryzen 7'))
								cpuLogo += '_ryzen-7';
							else if (cpuName.includes('Ryzen 9'))
								cpuLogo += '_ryzen-9';
							else if (cpuName.includes('Epyc'))
								cpuLogo += '_epyc';
						}
						case 'intel': {
							if (cpuName.includes('Celeron'))
								cpuLogo += '_celeron';
							else if (cpuName.includes('Pentium 4'))
								cpuLogo += '_pentium4';
							else if (cpuName.includes('Pentium'))
								cpuLogo += '_pentium';
							else if (cpuName.includes('Core i3'))
								cpuLogo += '_core-i3';
							else if (cpuName.includes('Core i5'))
								cpuLogo += '_core-i5';
							else if (cpuName.includes('Core i7'))
								cpuLogo += '_core-i7';
							else if (cpuName.includes('Core i9'))
								cpuLogo += '_core-i9';
							else if (cpuName.includes('Xeon'))
								cpuLogo += '_xeon';
						}
					}

					cpuLogo += '.png';

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
