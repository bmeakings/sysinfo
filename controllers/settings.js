'use strict';

(angular
	.module(appName)
	.controller('SettingsCtrl', ($scope, $rootScope, $http) => {
		const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');

		$scope.settings = {
			'language': (savedSettings.language || $scope.$parent.currLang),
			'langsMenu': {},
			'show_tab_cpu': (savedSettings.show_tab_cpu || true),
			'show_tab_ram': (savedSettings.show_tab_ram || true),
			'show_tab_gpu': (savedSettings.show_tab_gpu || true),
			'show_tab_audio': (savedSettings.show_tab_audio || true),
			'show_tab_system': (savedSettings.show_tab_system || true),
			'show_tab_opsys': (savedSettings.show_tab_opsys || true),
			'show_tab_storage': (savedSettings.show_tab_storage || true),
			'show_tab_battery': (savedSettings.show_tab_battery || true),
		};

		function getLanguages() {
			($http
				.get('./l10n/_langs.json')
				.then((response) => {
					try {
						const jsonDoc = response.data;

						for (const i in jsonDoc) {
							if (i != 'END')
								$scope.settings.langsMenu[i] = jsonDoc[i];
						}
					}
					catch (e) {
						console.log(e);
					}
				})
			);
		}

		$scope.langChanged = () => {
			const newLang = $scope.settings.language;

			$scope.$parent.setLanguage(newLang);
		};

		$scope.$watchCollection('settings', () => {
			localStorage.setItem('settings', JSON.stringify($scope.settings));
			$rootScope.$broadcast('settingsChanged', $scope.settings);
		});

		getLanguages();
	})
);
