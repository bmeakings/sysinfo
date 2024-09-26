'use strict';

(angular
	.module(appName)
	.controller('OperatingSystemCtrl', ($scope, $timeout, services) => {
		(electronAPI
			.sysInfo('osInfo')
			.then((data) => {
				console.log('os info');
				console.log(data);

				const osName = data.distro;
				const osVersion = data.release;
				const osArch = data.arch;
				const osUEFI = (data.uefi) ? 'yes' : 'no';

				let osLogo = './imgs/logos-os/';

				if (osName.includes('Windows')) {
					if (osName.includes('Windows 98'))
						osLogo += 'windows_98.svg';
					else if (osName.includes('Windows ME'))
						osLogo += 'windows_me.svg';
					else if (osName.includes('Windows 2000'))
						osLogo += 'windows_2000.svg';
					else if (osName.includes('Windows XP'))
						osLogo += 'windows_xp.svg';
					else if (osName.includes('Windows Vista'))
						osLogo += 'windows_vista.svg';
					else if (osName.includes('Windows 7'))
						osLogo += 'windows_7.svg';
					else if (osName.includes('Windows 8'))
						osLogo += 'windows_8.svg';
					else if (osName.includes('Windows 10'))
						osLogo += 'windows_10.svg';
					else if (osName.includes('Windows 11'))
						osLogo += 'windows_11.svg';
					else
						osLogo += 'windows.png';
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
						'arch': osArch,
						'uefi': osUEFI,
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
