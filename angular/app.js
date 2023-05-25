'use strict';

const appName = 'SysInfApp';

const ipc = require('electron').ipcRenderer;
const systeminfo = require('systeminformation');

(angular
	.module(appName, ['ngMaterial'])
	.controller('MainCtrl', ($scope, $http, $timeout) => {
		const savedLang = localStorage.getItem('language');

		$scope.currLang = savedLang || 'en';
		$scope.langStrings = {};
		$scope.currTabIndex = 0;
		$scope.settingsOpen = false;
		$scope.tabs = [];
		$scope.updateFreq = 1000;
		$scope.appVersion = '0.0.1';
		$scope.siVersion = systeminfo.version();

		$scope.sysinfo = {
			'cpu': {},
			'ram': {},
			'gpu': {},
			'display': {},
			'audio': {},
			'system': {},
			'opsys': {},
			'storage': {},
			'battery': {},
		};

		$scope.tabs = [
			{'page': 'tab-cpu.html', 'label': '', 'string': 'cpu'},
			{'page': 'tab-ram.html', 'label': '', 'string': 'ram'},
			{'page': 'tab-gpu.html', 'label': '', 'string': 'gpu'},
			{'page': 'tab-audio.html', 'label': '', 'string': 'audio'},
			{'page': 'tab-system.html', 'label': '', 'string': 'system'},
			{'page': 'tab-opsys.html', 'label': '', 'string': 'opsys'},
			{'page': 'tab-storage.html', 'label': '', 'string': 'storage'},
			{'page': 'tab-battery.html', 'label': '', 'string': 'battery'},
		];

		$scope.setLanguage = (lang) => {
			($http
				.get('./l10n/' + lang + '.json')
				.then((response) => {
					try {
						$scope.langStrings = response.data;

						for (const i of $scope.tabs) {
							const tabLabel = $scope.langStrings[i.string];

							if (tabLabel)
								i.label = tabLabel;
						}
					}
					catch (e) {
						console.log(e);
					}
				})
			);
		};

		$scope.changePage = (index) => {
			$timeout(() => {
				$scope.currTabIndex = index;
			});
		};

		$scope.openSettings = () => {
			$scope.settingsOpen = true;
		};

		$scope.closeSettings = () => {
			$scope.settingsOpen = false;
		};

		$scope.exitApp = () => {
			ipc.send('exitApp');
		};

		$scope.setLanguage($scope.currLang);
	})
);
