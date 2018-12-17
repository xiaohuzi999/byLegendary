package com.yx.editor.view.chapterEditer
{
	/**
	 * ChapterData
	 * author:xiaohuzi999
	 * ChapterData.as 2018-8-8 下午4:18:58
	 * version 1.0
	 *
	 */
	public class ChapterData
	{
		//关卡ID,所属篇章ID,歌曲出处,歌曲名称,歌曲作者,移动速度,折点标记,星级划分,歌曲文件
		public var id:String
		//所属篇章ID
		public var cid:String;
		//歌曲出处,
		public var album:String;
		//歌曲名称,
		public var name:String;
		//歌曲作者
		public var author:String;
		//星级划分
		public var stars:String;
		//歌曲文件
		public var mp3:String;
		//配置文件
		public var json:String;
		//卡片关联
		public var card:String;
		
		public function ChapterData(data:Object=null)
		{
			if(data){
				for(var i:String in data){
					if(this.hasOwnProperty(i)){
						this[i] = data[i];
					}
				}
			}
		}
	}
}