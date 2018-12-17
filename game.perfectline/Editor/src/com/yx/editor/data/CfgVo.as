package com.yx.editor.data
{
	import flash.net.FileReferenceList;

	/**
	 * CfgVo 音轨配置数据
	 * author:xiaohuzi999
	 * CfgVo.as Aug 1, 2018 10:48:51 AM
	 * version 1.0
	 *
	 */
	public class CfgVo
	{
		/**音轨名字*/
		public var name:String = "";
		/**音轨mp3地址*/
		public var mp3:String= "";
		/**滚屏速度*/
		public var speed:Number = 0.2;
		/**时间节点数据*/
		public var nodes:Array = [];
		/**装饰物*/
		public var items:Array = [];
		
		public function CfgVo()
		{
		}
	}
}