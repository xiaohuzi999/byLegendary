/**
* name 
*/
import Handler = Laya.Handler;
module xframe{
	export class AniUtil{
		constructor(){

		}

		/**动画效果-入场，淡入 */
		public static fadeIn(target:Laya.Component, time:number = 200, delay:number = 0):void{
			target.alpha = 0
			Laya.Tween.to(target, {alpha:1}, time, null, null, delay);
		}



		/**
		 * 动画效果-入场，从下到当前位置，alpha从0到1
		 * @param target 动画对象
		 * @param time 动画时间
		 * @param distance 移动距离
		 */
		public static  flowIn(target:Laya.Component, time:number = 200, distance:number = 200):void{
			Laya.Tween.from(target, {alpha:0.5, y:target.y + distance}, time);
		}
		
		/**
		 * 动画效果-出场，从当前位置往上，alpha从0到1
		 * @param target 动画对象
		 * @param callback 动画结束回调
		 * @param time 动画时间
		 * @param distance 移动距离
		 */
		public static flowOut(target:Laya.Component,callback:Handler, time:number = 150, distance:number = 200):void{
			Laya.Tween.to(target, {alpha:0, y:target.y - distance}, time, null,Handler.create(null, onflowOut, [target, callback]));
			
			function onflowOut(target:Laya.Component, callback:Handler):void{
				target.alpha = 1;
				callback.run();
			}
		}
		
		
		/**
		 * 动画效果-出场2，从当前位置往下，alpha从0到1
		 * @param target 动画对象
		 * @param callback 动画结束回调
		 * @param time 动画时间
		 * @param distance 移动距离
		 */
		public static flowBack(target:Laya.Component,callback:Handler,time:number = 150, distance:number = 200):void{
			Laya.Tween.to(target, {alpha:0, y:target.y + distance}, time, null,Handler.create(null, onflowBack, [target, callback]));
			
			function onflowBack(target:Laya.Component, callback:Handler):void{
				target.alpha = 1;
				callback.run();
			}
		}
		
		
		/**
		 * 动画效果-入场，弹出一个窗口,注意，只有没设置中心点或者中心点坐标为(0,0)可用
		 * @param target 动画对象
		 * @param time 动画时间
		 */
		public static popIn(target:Laya.Component, time:number = 200):void{
			Laya.Tween.clearTween(target);
			target.anchorX = target.anchorY = 0.5;
			target.x += target.width*0.5;
			target.y += target.height*0.5;
			target.scale(0.5,0.5);
			
			Laya.Tween.to(target,{scaleX:1,scaleY:1,ease:Laya.Ease.backOut},300,null,Handler.create(null, onPopIn));
			
			function onPopIn():void{
				target.anchorX = target.anchorY = 0;
				target.scaleX = target.scaleY = 1;
				target.x -= target.width*0.5;
				target.y -= target.height*0.5;
			}
		}
		
		/**
		 * 动画效果-出场，从当前位置往上，alpha从1到0
		 * @param target 动画对象
		 * @param callback 动画结束回调
		 * @param time 动画时间
		 */
		public static popOut(target:Laya.Component,callback:Handler,time:number = 150):void{
			Laya.Tween.clearTween(target);
			target.anchorX = 0.5;
			target.anchorY = 0.5;
			target.x += target.width*0.5;
			target.y += target.height*0.5;
			
			Laya.Tween.to(target, {scaleX:0.5, scaleY:0.5}, time, null,Handler.create(null, onPopOut));
			
			function onPopOut():void{
				target.anchorX = 0;
				target.anchorY = 0;
				target.scaleX = target.scaleY = 1;
				target.x -= target.width*0.5;
				target.y -= target.height*0.5;
				callback.run();
			}
		}
	}
}