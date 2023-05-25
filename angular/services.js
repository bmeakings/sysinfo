'use strict';

(angular
	.module(appName)
	.factory('services', () => {
		return {
			cleanText(input) {
				const output = (input
					.replaceAll('®', '')
					.replaceAll('©', '')
					.replaceAll('(TM)', '')
					.replaceAll('(tm)', '')
					.replaceAll('(R)', '')
					.replaceAll('(r)', '')
				);

				return output.trim();
			},
			formatBytes(bytes, iec) {
				const thsnd = ((iec) ? 1024 : 1000);
				const units = [];

				let u = 0;

				if (iec)
					units = ['', 'kiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
				else
					units = ['', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

				if (bytes < thsnd)
					return bytes + ' Bytes';

				while (bytes >= thsnd) {
					bytes /= thsnd;
					u++;
				}

				return bytes.toFixed(1) + ' ' + units[u];
			},
		};
	})
);
