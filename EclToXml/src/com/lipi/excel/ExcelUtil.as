package com.lipi.excel
{
	import flash.geom.Point;
	
	public class ExcelUtil
	{
		public function ExcelUtil()
		{
		}
		
		
		/**
		 * excel列标题对应的索引（A1，A2）
		 * @param colName
		 * @return 
		 */
		public static function getColIndex(colName:String):int
		{
			var abc:String = colName.replace(/(\d)/g,"");
			return textToInt(abc);
		}
		
		
		public static function colNameToPosition(colName:String):Array
		{
			var colText:String = colName.replace(/(\d)/g,"");
			var col:int = textToInt(colText);
			var row:int = int(colName.replace(colText,"")) - 1;
			return [row,col];
		}
		
		/**
		 *      把整数转化为excel列索引对应的英文字符串 
		 * <BR>A=0,B=1,...AA=26,AB=27,....依次类推
		 * @param num 要转化的整数
		 * @return 
		 * 
		 */
		public static function intToText(num:int):String
		{
			var numArr:Array  = [];
			var numR:int = 0;
			var str:String = "";
			if(num>=26)
			{
				while(num>=0)
				{
					numR = num%26;
					num = Math.floor(num/26)-1;
					str = String.fromCharCode(numR+65) + str;
				}
			}else{
				str = String.fromCharCode(num%26+65)
			}
			return str;
		}
		
		/**
		 * 把A,B,C...,AA,AB,AC,...BA,BB,.....ZZ类型字符串转化为对应的整数数值
		 * <BR>A=0,B=1,...AA=26,AB=27,....依次类推
		 * @param abc
		 * @return 
		 */
		public static function textToInt(abc:String):int
		{
			abc = abc.toUpperCase();
			var returnValue:int = 0;
			for(var i:int = abc.length-1;i>=0;i--)
			{
				var cCode:int = abc.charCodeAt(i);
				var cValue:int = cCode - 64;
				returnValue = returnValue + cValue*Math.pow(26,abc.length-1-i);
			}
			return returnValue-1;  
		}
		
	}
}