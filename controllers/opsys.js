'use strict';

(angular
	.module(appName)
	.controller('OperatingSystemCtrl', ($scope, $timeout, services) => {
		(systeminfo
			.osInfo()
			.then((data) => {
				// console.log('os info');
				// console.log(data);

				const osName = data.distro;
				const osVersion = data.release;

				let osLogo = './imgs/os-logos/';

				if (osName.includes('Windows')) {
					if (osName.includes('Windows 11'))
						osLogo += 'windows_2021.svg';
					else if (osName.includes('Windows 10'))
						osLogo += 'windows_2012.svg';
					else
						osLogo += 'windows_2002.png';
				}
				else if (osName.includes('macOS')) {
					osLogo += 'macos.svg';
				}
				else {
					osLogo += 'linux.svg';
				}

				$timeout(() => {
					$scope.$parent.sysinfo.opsys.info = {
						'name': osName,
						'version': osVersion,
						'logo': osLogo,
					};
				});
			})
			.catch((err) => {
				console.log(err);
			})
		);
/*
		(systeminfo
			.processes()
			.then((data) => {
				console.log('processes info');
				console.log(data);
			})
		);
*/
	})
);
