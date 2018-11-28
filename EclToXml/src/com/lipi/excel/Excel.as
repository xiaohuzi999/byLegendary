package com.lipi.excel
{
	import flash.utils.ByteArray;
	
	/**
	 * 解析excel（xlsx)文件的类
	 * @author lipi
	 */
	public class Excel
	{
		
		private var _fileByteArray:ByteArray;
		private var _zip:Zip2;
		private var _modifiedFiles:Object;
		
		/**
		 * 
		 * @param fileByteArray xlsx文件的二进制数据
		 * @param sheetIndex excel表索引，对应excel中的工作表的标签，索引从0开始
		 */
		public function Excel(fileByteArray:ByteArray)
		{
			_fileByteArray = fileByteArray;
			_zip = new Zip2(_fileByteArray);
			_modifiedFiles = new Object();
		}
		
		
		/**
		 * 取得解析后的表格数据。值为二维数组，第一维是行索引，第二维是列索引
		 * 参数可以是数字或字符串 代表工作表
		 */
		public function getSheetArray(sheetIndex:* = 0):Array
		{
			var $sheetUrl:String = getSheetUrl(sheetIndex);
			
			var valueArray:Array = getValueArray();
			
			var $xml:XML = getFileToXML($sheetUrl);
			var ns:Namespace = $xml.namespace();
			
			var excelArray:Array = [];
			var rowList:XMLList = $xml.ns::sheetData.ns::row;
			for each(var rowListItem:XML in rowList)
			{
				var rowIndex:int = int(rowListItem.@r) - 1;
				var rowArray:Array = [];
				var colList:XMLList = rowListItem.ns::c;
				for each(var colListItem:XML in colList)
				{
					var colIndex:int = ExcelUtil.getColIndex(colListItem.@r);
					var t:String = colListItem.@t;
					var v:String = colListItem.ns::v[0];
					if(t == "s")
					{
						rowArray[colIndex] = valueArray[int(v)];
					}else{
						rowArray[colIndex] = v;
					}
				}
				excelArray[rowIndex] = rowArray;
			}
			
			var mergeCellList:XMLList = $xml.ns::mergeCells.ns::mergeCell;
			for each(var mergeCellXML:XML in mergeCellList)
			{
				var ref:String = mergeCellXML.@ref;
				var refArr:Array = ref.split(":");
				if(refArr[0]==null || refArr[1]==null){
					continue;
				}
				var sArr:Array = ExcelUtil.colNameToPosition(refArr[0]);
				var eArr:Array = ExcelUtil.colNameToPosition(refArr[1]);
				var sValue:Object;
				if(excelArray[sArr[0]] != null)
				{
					sValue = excelArray[sArr[0]][sArr[1]];
				}
				for(var i:int = sArr[0];i<=eArr[0];i++)
				{
					for(var j:int = sArr[1];j<=eArr[1];j++)
					{
						if(excelArray[i] == null) excelArray[i] = [];
						excelArray[i][j] = sValue;
					}
				}
				
			}
			
			return excelArray;
		}
		
		
		/**
		 * 获得某张工作表的名字
		 */ 
		public function getSheetName(sheetIndex:int = 0):String
		{
			var workbook:XML = getFileToXML("xl/workbook.xml");
			
			var wbns:Namespace = workbook.namespace();
			
			var theSheet:XML = workbook.wbns::sheets.wbns::sheet.(@sheetId == ""+(sheetIndex+1))[0];
			
			if(theSheet) return theSheet.@name;
			else return "error: no such sheet!";
		}
		
		/**
		 * 修改动作
		 * 将某张工作表中的某列复制到该工作表的另一列
		 * 修改后需使用 getResult() 获取修改结果
		 * from和to 可以是数字或字符串 如果用字符串形式 那么只能是字母 即"A","B","C"……
		 * 最后一个参数中写入不需要复制的行 例[0,1] 即第一第二行不复制
		 */ 
		public function copyCol(sheetIndex:*, from:*, to:*, except:Array=null):void
		{
			var url:String = getSheetUrl(sheetIndex);
			
			var modifiedFile:ByteArray = _modifiedFiles[url];
			
			var xml:XML = modifiedFile ? byteArrayToXML(modifiedFile) : getFileToXML(url);
			
			var ns:Namespace = xml.namespace();
			
			var rowList:XMLList = xml.ns::sheetData.ns::row;
			
			for each(var theRow:XML in rowList)
			{
				var valueIndex:String;
				var rowNum:String = theRow.@r;
				
				if(except)
				{
					if(except.indexOf(Number(rowNum)-1)!=-1) continue;
				}
				
				
				var cList:XMLList = theRow.ns::c;
				if(!cList) continue;
				
				
				var cFrom:XML;
				if(from is int)//如果是数字索引值,转化为字母索引
				{
					from = ExcelUtil.intToText(from);
				}
				
				if(from is String)
				{
					var cFromList:XMLList = cList.(@r == (from+rowNum));
					if(cFromList) cFrom = cFromList[0];
				}
				else continue;
				
				valueIndex = cFrom ? cFrom.ns::v : null;
				
				
				var cTo:XML;
				if(to is int)//如果是数字索引值,转化为字母索引
				{
					to = ExcelUtil.intToText(to);
				}
				
				if(to is String){
					var cToList:XMLList = cList.(@r == (to+rowNum));
					if(cToList) cTo = cToList[0];
				}
				else continue;
				
				
				if(valueIndex) //如果目标需要有值
				{
					if(cTo) cTo.ns::v = valueIndex; //并且目标本来就有值 则改变之
					else //如果目标本来没有值 创建之
					{
						var newC:XML = XML("<c r="+(to+rowNum)+"><v>"+valueIndex+"</v></c>");
						if(cFrom.@t) newC.@t = cFrom.@t;
						if(cFrom.@s) newC.@s = cFrom.@s;
						cList.appendChild(newC);
					}
				}
				else //如果目标不该有值
				{
					if(cTo) //但目标有值 则删除之
					{
						for(var i:int=0;i<cList.length();i++)
						{
							if(cList[i].@r == cTo.@r) delete cList[i]; 
						}
					}
				}
			}
			
			_modifiedFiles[url] = xmlToByteArray(xml);
		}
		
		/**
		 * 修改动作
		 * 将某张工作表改为第一张工作表
		 * 修改后需使用 getResult() 获取修改结果
		 */ 
		public function setFirstSheet(sheetIndex:*):String
		{
			var theSheet:XML;
			
			//---------------------------------------------------------------------------------------------
			
			var modifiedWorkbook:ByteArray = _modifiedFiles["xl/workbook.xml"];
			var workbook:XML = modifiedWorkbook ? byteArrayToXML(modifiedWorkbook) : getFileToXML("xl/workbook.xml");
			
			var wbns:Namespace = workbook.namespace();
			var wbns_r:Namespace = workbook.namespace("r");
			
			var sheets:XML = workbook.wbns::sheets[0];
			
			var theSheetSet:XMLList;
			if(sheetIndex is String) theSheetSet = sheets.wbns::sheet.(@name == sheetIndex);
			else if(sheetIndex is int) theSheetSet = sheets.wbns::sheet.(@sheetId == ""+(sheetIndex+1));
			else return "error: invalid sheetIndex";
			
			if(!theSheetSet) return "error: no such sheet!";
			
			theSheet = theSheetSet[0];
			
			//互换数据表名
			var theSheetUrl:String = getSheetUrl(sheetIndex);
			var theSheetDataModified:ByteArray = _modifiedFiles[theSheetUrl];
			var theSheetData:ByteArray = theSheetDataModified ? theSheetDataModified : _zip.getFile(theSheetUrl);
			
			var the1stSheetUrl:String = getSheetUrl(0);
			var the1stSheetDataModified:ByteArray = _modifiedFiles[the1stSheetUrl];
			var the1stSheetData:ByteArray = the1stSheetDataModified ? the1stSheetDataModified : _zip.getFile(the1stSheetUrl);
			
			_modifiedFiles[theSheetUrl] = the1stSheetData;
			_modifiedFiles[the1stSheetUrl] = theSheetData;
			
			//互换rId
			sheets.wbns::sheet[0].@wbns_r::id = theSheet.@wbns_r::id;
			theSheet.@wbns_r::id = "rId1";
			
			//互换位置
			delete sheets.wbns::sheet[theSheet.childIndex()];
			sheets.insertChildBefore(sheets.wbns::sheet[0],theSheet);
			
			//记录
			_modifiedFiles["xl/workbook.xml"] = xmlToByteArray(workbook);
			
			//-----------------------------------------------------------------------------------------------
			
			var modifiedApp:ByteArray = _modifiedFiles["docProps/app.xml"];
			var app:XML = modifiedApp ? byteArrayToXML(modifiedApp) : getFileToXML("docProps/app.xml");
			
			var ns:Namespace = app.namespace();
			var ns_vt:Namespace = app.namespace("vt");
			
			var vector:XML = app.ns::TitlesOfParts.ns_vt::vector[0];
			
			
			if(sheetIndex is String)
			{
				for each(var sheet:XML in vector.ns_vt::lpstr)
				{
					if(sheet == sheetIndex)
					{
						theSheet = sheet;
						break;
					}
				}
			}
			else if(sheetIndex is int) theSheet = vector.ns_vt::lpstr[sheetIndex];
			else return "error: invalid sheetIndex";
			
			
			delete vector.ns_vt::lpstr[theSheet.childIndex()];
			vector.insertChildBefore(vector.ns_vt::lpstr[0],theSheet);
			
			_modifiedFiles["docProps/app.xml"] = xmlToByteArray(app);
			
			//-------------------------------------------------------------------------
			
			
			return "";
		}
		
		/**
		 * 获取修改结果
		 * 返回一个xlsx文件的ByteArray
		 * 如果_modifiedFiles中没有任何内容 则可以获得一个一摸一样的副本
		 */
		public function getResult():ByteArray
		{
			return _zip.clone(_modifiedFiles);
		}
		
		
		/**
		 * 清空对某工作表的修改 不指定参数 则清空对所有工作表(整个文件)的修改
		 */ 
		public function clearModification(sheetIndex:*=null):void
		{
			if(sheetIndex == null) _modifiedFiles = new Object();
			else{
				var fileName:String = getSheetUrl(sheetIndex);
				if(_modifiedFiles[fileName]) delete _modifiedFiles[fileName];
			}
		}
		
		
		private function getSheetUrl(sheetIndex:*):String
		{
			var result:String = "";
			
			var workbook:XML = getFileToXML("xl/workbook.xml");
			var wbns:Namespace = workbook.namespace();
			var wbns_r:Namespace = workbook.namespace("r");
			
			var rid:String;
			
			if(sheetIndex is int) rid = "rId"+(sheetIndex+1);
			else if(sheetIndex is String)
			{
				var theSheet:XML = workbook.wbns::sheets.wbns::sheet.(@name==sheetIndex)[0];
				rid = theSheet.@wbns_r::id;
			}
			else return "error:no such sheet";
			
			var worksheet:XML = getFileToXML("xl/_rels/workbook.xml.rels");
			var wsns:Namespace = worksheet.namespace();
			var sheetTarget:String = worksheet.wsns::Relationship.(@Id==rid).@Target;
			
			result = "xl/"+sheetTarget;
			
			return result;
		}
		
		private function getValueArray():Array
		{
			var valueArray:Array = [];
			var $url:String = "xl/sharedStrings.xml";
			
			var $byteArray:ByteArray = _zip.getFile($url);
			$byteArray.position = 0;
			var xmlString:String = $byteArray.readUTFBytes($byteArray.bytesAvailable);
			
			var $xml:XML = new XML(xmlString);
			var ns:Namespace = $xml.namespace();
			
			var valueList:XMLList = $xml.ns::si;
			for each(var valueListItem:XML in valueList)
			{
				var textList:XMLList = valueListItem..ns::t;
				var tValue:String = "";
				for each(var textListItem:XML in textList)
				{
					var $cTValue:String = textListItem[0];
					tValue = tValue + $cTValue;
				}
				
				valueArray.push(tValue);
			}
			return valueArray;
		}
		
		private function getFileToXML(fileName:String):XML
		{
			var ba:ByteArray = _zip.getFile(fileName);
			
			return byteArrayToXML(ba);
		}
		
		private function byteArrayToXML(byteArray:ByteArray):XML
		{
			byteArray.position = 0;
			var str:String = byteArray.readUTFBytes(byteArray.bytesAvailable);
			
			try
			{
				return XML(str);
			}
			catch(e:*)
			{
				trace("error: can`t parse xml");
				trace(str);
				return null;
			}
			
			return null;
		}
		
		private function xmlToByteArray(xml:XML):ByteArray
		{
			var result:ByteArray = new ByteArray();
			
			result.writeUTFBytes(xml.toXMLString());
			
			return result;
		}
		
		
	}
}
