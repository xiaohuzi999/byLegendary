package com.yx.editor.data
{
	/**
	 * SndNodeVo 音轨节点数据
	 * author:xiaohuzi999
	 * SndNodeVo.as Aug 1, 2018 10:52:30 AM
	 * version 1.0
	 *
	 */
	public class SndNodeVo
	{
		/**节点坐标X*/
		public var x:int;
		/**节点坐标Y*/
		public var y:int;
		/**横向速度*/
		public var sx:Number = 0;
		/**竖向速度*/
		//public var sy:Number;
		/**节点时间戳*/
		public var t:int;
		
		public function SndNodeVo(data:Object=null)
		{
			if(data){
				this.x = data.x;
				this.y = data.y;
				this.sx = data.sx;
				this.t = data.t;
			}
		}
	}
}