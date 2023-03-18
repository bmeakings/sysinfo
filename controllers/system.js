'use strict';

(angular
	.module(appName)
	.controller('SystemCtrl', function($scope, $timeout, services) {
		(systeminfo
			.system()
			.then((data) => {
				// console.log('system data');
				// console.log(data);

				const sysMake = data.manufacturer;
				const sysModel = data.model;

				let oemLogo = './imgs/oem-logos/';

				if (sysMake == 'To Be Filled By O.E.M.')
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

		(systeminfo
			.baseboard()
			.then((data) => {
				// console.log('mobo data');
				// console.log(data);

				const moboMake = data.manufacturer;
				const moboModel = data.model;

				let moboLogo = './imgs/mobo-logos/';

				if (!moboMake)
					moboMake = '?';
				else if (moboMake.includes('Asus'))
					moboLogo += 'asus.png';
				else if (moboMake.includes('ASRock'))
					moboLogo += 'asrock.png';
				else if (moboMake.includes('MSI'))
					moboLogo += 'msi.png';
				else if (moboMake.includes('Gigabyte'))
					moboLogo += 'gigabyte.png';
				else if (moboMake.includes('Biostar'))
					moboLogo += 'biostar.png';
				else if (moboMake.includes('Intel'))
					moboLogo += 'intel.png';
				else if (moboMake.includes('Supermicro'))
					moboLogo += 'supermicro.png';
				else if (moboMake.includes('DFI'))
					moboLogo += 'dfi.png';
				else if (moboMake.includes('Abit'))
					moboLogo += 'abit.png';
				else if (moboMake.includes('ECS'))
					moboLogo += 'ecs.png';
				// else if (moboMake.includes(''))
				// 	moboLogo += '.png';

				$timeout(() => {
					$scope.$parent.sysinfo.system.mobo = {
						'make': moboMake,
						'model': moboModel,
						'logo': moboLogo,
					};
				});
			})
			.catch((err) => {
				console.log(err);
			})
		);

		(systeminfo
			.bios()
			.then((data) => {
				// console.log('bios data');
				// console.log(data);

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
