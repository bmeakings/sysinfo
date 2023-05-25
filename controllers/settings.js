'use strict';

(angular
	.module(appName)
	.controller('SettingsCtrl', ($scope, $http) => {
		const savedLang = localStorage.getItem('language');

		$scope.settings = {
			'language': ((savedLang) ? savedLang : $scope.$parent.currLang),
			'langsMenu': {},
		};

		const getLanguages = () => {
			($http
				.get('./l10n/_langs.json')
				.then((response) => {
					try {
						const jsonDoc = response.data;

						for (let i in jsonDoc) {
							if (i != 'END')
								$scope.settings.langsMenu[i] = jsonDoc[i];
						}
					}
					catch (e) {
						console.log(e);
					}
				})
			);
		};

		$scope.langChanged = () => {
			const newLang = $scope.settings.language;

			localStorage.setItem('language', newLang);
			$scope.$parent.setLanguage(newLang);
		};

		getLanguages();
	})
);
