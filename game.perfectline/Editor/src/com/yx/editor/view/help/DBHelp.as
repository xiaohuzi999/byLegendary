package com.yx.editor.view.help
{
	/**
	 * DBHelp
	 * author:xiaohuzi999
	 * DBHelp.as 2018-8-6 上午11:14:08
	 * version 1.0
	 *
	 */
	public class DBHelp
	{
		public static const FUN_TITLE:String = "功能说明";
		public static const FUN_MSG:String = "1，新建。创建一个新的配置\n" +
			"2，打开配置表。打开一个编辑器“保存“的配置文件\n" +
			"3，导入时间表。导入外部编辑好的时间配置(.lrc 或 .json文件)\n" +
			"4，导出图片。 将编辑好的路径导出成png格式文件，以便美术加工\n" +
			"5，保存。保存配置文件，该文件即为“打开配置表”中需要的文件。\n" +
			"注意：\n" +
			"编辑器不支持“撤销”及“重做”功能，操作需要小心些。\n" +
			"关闭编辑器不会导致数据丢失，下次打开可以继续编辑。\n" +
			"“新建”之前记得保存数据，这个操作会导致上次的编辑数据丢失。\n";
		
		public static const HOW_TO_T:String = "操作流程";
		public static const HOW_TO_C:String = "1，点“选曲”按钮选择一首歌\n" +
			"2，点“文件”--“导入时间表”导入时间配置。\n" +
			"2A，点“编辑节拍”按钮编辑录制歌曲的节拍。\n" +
			"3，在编辑器左边的区域内编辑\n" +
			"\tA,调整节点坐标,点击选中节点，左右拖动。或者点击选中节点，在右边的“节拍信息“中输入横向坐标\n" +
			"\tB，调整节点的时间点，右键，在弹出菜单中选择“上下移动（调整时间）”，拖动节点。或者点击选中节点，在右边的“节拍信息“中输入时间点\n" +
			"4，点“预览”按钮查看预览编辑成果。\n"
		
		public function DBHelp()
		{
		}
	}
}