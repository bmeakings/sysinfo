'use strict';

const appName = 'SysInfApp';

(angular
	.module(appName, ['ngMaterial'])
	.controller('MainCtrl', ($scope, $http, $timeout) => {
		const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');

		$scope.settings = {};
		$scope.currLang = (savedSettings.language || 'en');
		$scope.langStrings = {};
		$scope.currTabIndex = 0;
		$scope.settingsOpen = false;
		$scope.updateFreq = 1000;
		$scope.appVersion = '0.0.1';
		$scope.siVersion = electronAPI.sysInfo('siVersion');

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
			{'show': true, 'name': 'cpu'},
			{'show': true, 'name': 'ram'},
			{'show': true, 'name': 'gpu'},
			{'show': true, 'name': 'audio'},
			{'show': true, 'name': 'system'},
			{'show': true, 'name': 'opsys'},
			{'show': true, 'name': 'storage'},
			{'show': true, 'name': 'battery'},
		];

		$scope.setLanguage = (lang) => {
			($http
				.get('./l10n/' + lang + '.json')
				.then((response) => {
					try {
						$scope.currLang = lang;
						$scope.langStrings = response.data;
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
			window.electronAPI.exitApp();
		};

		$scope.$on('settingsChanged', (event, data) => {
			$scope.settings = data;

			if (data.language != $scope.currLang)
				$scope.setLanguage(data.language);

			$timeout(() => {
				for (const i of $scope.tabs)
					i.show = data['show_tab_' + i.name];
			});
		});

		$scope.setLanguage($scope.currLang);
	})
);
