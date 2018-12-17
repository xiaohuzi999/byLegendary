package com.yx.editor.data
{
	/**
	 * MapItemVo 地图装饰物数据
	 * author:xiaohuzi999
	 * MapItemVo.as 2018-8-7 下午4:32:27
	 * version 1.0
	 *
	 */
	public class MapItemVo
	{
		public var id:String;
		public var x:int;
		public var y:int;
		//类型
		public var type:int = DB.PIC;
		//时间；
		public var t:int;
		//翻转
		public var s:int = 1;
		public function MapItemVo(data:Object=null)
		{
			if(data){
				this.id = data.id;
				this.x = data.x;
				this.y = data.y;
				this.t = data.t;
				this.type = data.type;
				this.s = data.s;
			}
		}
	}
}