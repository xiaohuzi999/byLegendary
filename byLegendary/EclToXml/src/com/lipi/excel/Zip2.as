package com.lipi.excel
{
	import flash.utils.ByteArray;
	import flash.utils.IDataInput;
	
	import nochump.util.zip.ZipEntry;
	import nochump.util.zip.ZipFile;
	import nochump.util.zip.ZipOutput;
	
	public class Zip2
	{
		private var _zipFile:ZipFile;
		
		public function Zip2(zipFile:ByteArray = null)
		{
			_zipFile = new ZipFile(zipFile);
		}
		
		/**
		 * 通过文件名取得解压缩后的文件的二进制数据
		 * @param fileName 文件名
		 * @return 文件的二进制数据
		 */
		public function getFile(fileName:String):ByteArray
		{
			var data:ByteArray = null;
			for(var i:int = 0;_zipFile.entries.length; i++) {
				var entry:ZipEntry = _zipFile.entries[i];
				if(!entry) break;
				
				if(entry.name == fileName)
				{
					data = _zipFile.getInput(entry);
					break;
				}
			}
			return data;
		}
		
		/**
		 * 创建文件副本
		 * 参数是所有需要改动的文件 每个元素都是一个ByteArray 其键为其文件名
		 * 即 modifiedFiles = {fileName1:fileData, fileName2:fileData, ……}
		 */
		public function clone(modifiedFiles:Object=null):ByteArray
		{
			var zipOutput:ZipOutput = new ZipOutput();
			
			var entries:Array = _zipFile.entries;
			if(!entries) return null;
			
			for(var i:int=0;i<entries.length;i++)
			{
				var fileName:String = entries[i].name;
				
				var fileData:ByteArray;
				if(modifiedFiles && modifiedFiles[fileName]) fileData = modifiedFiles[fileName];
				else fileData = getFile(fileName);
				
				var newEntry:ZipEntry = new ZipEntry(fileName);
				zipOutput.putNextEntry(newEntry);
				zipOutput.write(fileData);
				zipOutput.closeEntry();
			}
			
			zipOutput.finish();
			
			return zipOutput.byteArray;
		}
		
	}
}