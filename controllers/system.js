'use strict';

(angular
	.module(appName)
	.controller('SystemCtrl', ($scope, $timeout, services) => {
		(electronAPI
			.sysInfo('systemInfo')
			.then((data) => {
				console.log('system data');
				console.log(data);

				const sysMake = data.manufacturer.trim();
				const sysModel = data.model.trim();

				let oemLogo = './imgs/oem-logos/';

				if (!sysMake || sysMake == 'To Be Filled By O.E.M.')
					oemLogo = '';
				else if (sysMake.includes(''))
					oemLogo += '';

				$timeout(() => {
					$scope.$parent.sysinfo.system.info = {
						'make': sysMake,
						'model': sysModel,
						'logo': oemLogo,
					};
				});
			})
		);

		(electronAPI
			.sysInfo('moboInfo')
			.then((data) => {
				console.log('mobo data');
				console.log(data);

				const moboMake = data.manufacturer;
				const moboModel = data.model;
				const ramSlots = data.memSlots;
				const maxMemory = services.formatBytes(data.memMax, true);

				let moboLogo = './imgs/logos-mobo/';

				if (!moboMake)
					moboMake = '?';
				else if (moboMake.includes('Abit'))
					moboLogo += 'abit.png';
				else if (moboMake.includes('Acer'))
					moboLogo += 'acer.png';
				else if (moboMake.includes('AOpen'))
					moboLogo += 'aopen.png';
				else if (moboMake.includes('ASRock'))
					moboLogo += 'asrock.png';
				else if (moboMake.includes('Asus'))
					moboLogo += 'asus.png';
				else if (moboMake.includes('Biostar'))
					moboLogo += 'biostar.png';
				else if (moboMake.includes('DFI'))
					moboLogo += 'dfi.png';
				else if (moboMake.includes('ECS'))
					moboLogo += 'ecs.png';
				else if (moboMake.includes('EPoX'))
					moboLogo += 'epox.png';
				else if (moboMake.includes('EVGA'))
					moboLogo += 'evga.png';
				else if (moboMake.includes('Foxconn'))
					moboLogo += 'foxconn.png';
				else if (moboMake.includes('Fujitsu'))
					moboLogo += 'fujitsu.png';
				else if (moboMake.includes('Gigabyte'))
					moboLogo += 'gigabyte.png';
				else if (moboMake.includes('Intel'))
					moboLogo += 'intel.png';
				else if (moboMake.includes('Leadtek'))
					moboLogo += 'leadtek.png';
				else if (moboMake.includes('Lite-ON'))
					moboLogo += 'liteon.png';
				else if (moboMake.includes('MSI'))
					moboLogo += 'msi.png';
				else if (moboMake.includes('Pegatron'))
					moboLogo += 'pegatron.png';
				else if (moboMake.includes('Supermicro'))
					moboLogo += 'supermicro.png';
				else if (moboMake.includes('Tyan'))
					moboLogo += 'tyan.png';
				else if (moboMake.includes('VIA'))
					moboLogo += 'via.png';
				else if (moboMake.includes('Zotac'))
					moboLogo += 'zotac.png';
				// else if (moboMake.includes(''))
				// 	moboLogo += '.png';

				$timeout(() => {
					$scope.$parent.sysinfo.system.mobo = {
						'make': moboMake,
						'model': moboModel,
						'logo': moboLogo,
						'ramSlots': ramSlots,
						'maxMemory': maxMemory,
					};
				});
			})
			.catch((err) => {
				console.log(err);
			})
		);

		(electronAPI
			.sysInfo('biosInfo')
			.then((data) => {
				console.log('bios data');
				console.log(data);

				const biosVendor = data.vendor;
				// const biosVersion = data.version;

				$timeout(() => {
					$scope.$parent.sysinfo.system.bios = {
						'vendor': biosVendor,
					};
				});
			})
			.catch((err) => {
				console.log(err);
			})
		);
	})
);
