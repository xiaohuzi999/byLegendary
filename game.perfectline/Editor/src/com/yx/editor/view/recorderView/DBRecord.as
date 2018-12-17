package com.yx.editor.view.recorderView
{
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	import com.yx.editor.data.SndNodeVo;

	/**
	 * DBRecord 节拍生成器数据操作
	 * author:xiaohuzi999
	 * DBRecord.as Aug 2, 2018 9:02:25 PM
	 * version 1.0
	 *
	 */
	public class DBRecord
	{
		/**数据*/
		public static var nodes:Array = [];
		/**移动速度*/
		public static var SX:Number = 0.2;
		/**更新*/
		public static const UPDATE:String = "DBRecord_update";
		public static const BASIC_X:int = 850;
		public function DBRecord()
		{
		}
		
		/**
		 * 初始化
		 * @param timeTable 时间表
		 * */
		public static function init(timeTable:Array=null):void{
			nodes.length = 0;
			if(timeTable){
				var node:SndNodeVo;
				for(var i:int=0; i<timeTable.length; i++){
					nodes.push(node = new SndNodeVo());
					node.t = timeTable[i];
				}
			}
		}
		
		/**新增节拍*/
		public static function add(time:int):void{
			var node:SndNodeVo = new SndNodeVo();
			node.t = time;
			if(nodes.length){
				for(var i:int=nodes.length-1; i>-1; i--){
					if(time > nodes[i].t){
						nodes.splice(i+1, 0, node);
						node = null;
						break;
					}else if(time == nodes[i].t){
						//已经存在时间点,插入无效
						return;
					}
				}
			}
			node && nodes.push(node);
			//更新
			MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
		}
		
		/**修改*/
		//public static function 
		
		/**删除*/
		public static function delNode(node:SndNodeVo):void{
			for(var i:int=0; i<nodes.length; i++){
				if(nodes[i] == node){
					nodes.splice(i,1);
					break;
				}
			}
			MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
		}
		
		/**根据时间获取X坐标*/
		public static function getXpos(time:Number):int{
			return SX*time;
		}
		
		/**根据坐标反算时间*/
		public static function getTime(xpos:Number):int{
			return xpos/SX;
		}
		
		/**输出时间表*/
		public static function output():Array{
			var arr:Array = [0];
			for(var i:int=0; i<nodes.length; i++){
				arr.push(nodes[i].t);
			}
			trace(arr);
			return arr;
		}
	}
}