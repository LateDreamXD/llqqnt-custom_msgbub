import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const _FileName = 'custom_msgbub.zip'; // 将要生成的压缩包文件名
const includes = ['config', 'main', 'preload', 'renderer']; // 要包含的文件夹

console.log(`${new Date().toLocaleString()}  开始打包...`);

const zip = new JSZip();

console.log(`${new Date().toLocaleString()}  清理并重新构建...`);
execSync('yarn clean', {stdio: 'inherit'});
execSync('yarn build:dev', {stdio: 'inherit'});

console.log(`${new Date().toLocaleString()}  获取要压缩的文件...`);

// 写入清单和许可证
zip.file('manifest.json', fs.readFileSync('./manifest.json', {encoding: 'utf-8'}));
zip.file('LICENSE', fs.readFileSync('./LICENSE', {encoding: 'utf-8'}));

// 写入各个文件夹
function addFilesToZip(folderPath, zipFolder) {
	try {
		const files = fs.readdirSync(folderPath);
		for(const file of files) {
			const filePath = path.join(folderPath, file);
			const fileStat = fs.statSync(filePath);

			if(fileStat.isFile()) {
				zipFolder.file(file, fs.readFileSync(filePath, {encoding: 'utf-8'}));
			} else if(fileStat.isDirectory()) {
				const subZipFolder = zipFolder.folder(file);
				addFilesToZip(filePath, subZipFolder);
			}
		}
	} catch(e) {
		console.error(`${new Date().toLocaleString()}  读取文件或目录时出错: ${e.message}`);
	}
}

includes.forEach(include => addFilesToZip(include, zip.folder(include)));

console.log(`${new Date().toLocaleString()}  开始压缩...`);
const zipBuffer = await zip.generateAsync({type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: {level: 9}});

try {fs.writeFileSync(_FileName, zipBuffer);}
catch(e) {console.error(`${new Date().toLocaleString()}  写入文件时出错: ${e.message}`);}

console.log(`${new Date().toLocaleString()}  打包完成! 正在清理...`);

execSync('yarn clean', {stdio: 'inherit'});
