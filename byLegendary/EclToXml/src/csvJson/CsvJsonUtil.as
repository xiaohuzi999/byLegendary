package csvJson
{
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.utils.ByteArray;

	public class CsvJsonUtil
	{
		
		private var _file:File;
		private var _output:File;
		private var _csv:CSV;
		private var _json:Object;
		private var _levels:Array;
		private var _lines:Array;
		
		public function CsvJsonUtil()
		{
		}
		
		public function saveJSON2CSV($text:String, $file:File):Boolean
		{
			var __json:Object = null;
			try
			{
				__json = JSON.parse($text);
			}
			catch($err:SyntaxError)
			{
				showInfo($err.message);
				return false;
			}
			_csv = new CSV();
			_lines = [];
			toCSV(__json);
			for (var i:int = 0; i < _lines.length; i++) 
			{
				_csv.addRecordSet(_lines[i]);
			}
			_csv.encode();
			save(_csv.csvString, $file);
			return true;
		}
		
		public function toCSV($json:Object, ...$args):CSV
		{
			_csv = new CSV();
			for(var __key:String in $json)
			{
				var __value:Object = $json[__key];
				//碰到数组，就是最后一层
				if(__value is Array) 
				{
					//如果args为空数组，说明这是TRUNK的值，那么__key就是TRUNK，__valu.join...就是LEAF。后面的以此类推
					_lines.push(getValueArray.apply(null, $args.concat().concat([__key, __value.join(";")])));
				}
					//字符串也是最后一层
				else if(__value is String)
				{
					//空字符串替换成null
					if(/^\s*$/.test(__value as String))
					{
						__value = "*null*";
					}
					else
					{
						//替换换行符，仅支持UNIX格式
						__value = String(__value).replace(/\n/g, "\\n");
					}
					_lines.push(getValueArray.apply(null, $args.concat().concat([__key, __value])));
				}
				else
				{
					toCSV.apply(null, [__value].concat($args).concat(__key));
				}
			}
			return _csv;
		}
		
		public function getValueArray($trunk:String, $branch:String="", $leaf:String="", $value:String=""):Array
		{
			return [$trunk, $branch, $leaf, $value];
		}
		
		public function saveCSV2JSON($text:String, $file:File):Boolean
		{
			var __csv:CSV = null;
			try
			{
				__csv = new CSV($text);
			}
			catch($err:Error)
			{
				showInfo($err.message);
				return false;
			}
			_json = {};
			if(__csv.data.length>0)
				toJSON(__csv.data, __csv.data[0].length);
			save(JSON.stringify(_json, null, " "), $file);
			return true;
		}
		
		public function toJSON($csv:Array, $num:int):Object
		{
			_json = {};
			for (var i:int = 0; i < $csv.length; i++) 
			{
				var __line:Array = $csv[i];
				for (var j:int = 0; j < $num; j++) 
				{
					var __curValue:String = __line[j];
					if(j>0)
					{
						//如果当前值存在，判断下一个级别是否有值
						if(__curValue)
						{
							var __args:Array = __line.concat();
							__args.splice(j);
							var __curjson:Object = getJsonPart.apply(null, [_json].concat(__args));
							//下一个值存在，继续循环，否则说明是本行的最后一层，停止内层循环，保存值
							var __nextValue:String = __line[j+1];
							if(!__nextValue)
							{
								//把空字符串占位符替换成真正的空字符串
								if(__curValue == "*null*")
									__curValue = "";
								//对换行符进行转义
								if(__curValue)
									__curValue = __curValue.replace(/\\n/g, "\n");
								var __array:Array = __curValue.split(";");
								if(__array.length>1)
									__curjson[__line[j-1]] = __array;
								else
									__curjson[__line[j-1]] = __curValue;
								break;
							}
						}
						else
						{
							break;
						}
					}
				}
			}
			
			return _json;
		}
		
		public function getJsonPart($json:Object, ...$args):Object
		{
			if($args.length>1)
			{
				var __arg:String = $args.shift();
				if(!$json[__arg]) $json[__arg] = {};
				return getJsonPart.apply(null, [$json[__arg]].concat($args));
			}
			return $json;
		}
		
		public function getFileContent($file:File):String
		{
			var __stream:FileStream = new FileStream();
			__stream.open($file, FileMode.READ);
			var __ba:ByteArray = new ByteArray();
			__stream.readBytes(__ba);
			__stream.close();
			var __text:String = __ba.toString();
			return __text;
		}
		
		public function save($text:String, $file:File):void
		{
			try
			{
				var __stream:FileStream = new FileStream();
				__stream.open($file, FileMode.WRITE);
				__stream.writeUTFBytes($text);
				__stream.close();
				showInfo("转换成功："+$file.url);
			}
			catch($err:Error)
			{
				showInfo($err.message);
			}
		}
		
		public function showInfo($info:String):void
		{
			//_infoTA.text += $info + "\n";
		}
		
	}
}