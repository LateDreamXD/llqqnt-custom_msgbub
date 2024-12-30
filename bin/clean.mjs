import { platform } from 'os';
import { execSync } from 'child_process';

const Platform = platform();
const command = (Platform === 'win32')? `rd /s /q .\\main && rd /s /q .\\preload`:
`rm -rf ./main && rm -rf ./preload`;

try {
	if(Platform === 'win32' || Platform === 'linux' || Platform === 'darwin') {
		execSync(command);
		console.log('清理完毕');
	} else {
		console.log(`不支持的os平台: ${Platform}`);
	}
} catch(e) {
	console.error(`清理失败: ${e.message}`);
}
