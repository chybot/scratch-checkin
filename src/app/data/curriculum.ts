export interface Lesson {
  id: number;
  title: string;
  topic: string;
  project: string;
}

export interface Stage {
  id: number;
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  lessons: Lesson[];
}

export const stages: Stage[] = [
  {
    id: 1,
    name: "认识与探索",
    emoji: "🌟",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    lessons: [
      { id: 1, title: "初识 Scratch", topic: "舞台区/角色区/积木区/脚本区", project: "让小猫说大家好" },
      { id: 2, title: "让角色动起来", topic: "运动积木(移动、转向)", project: "小猫散步动画" },
      { id: 3, title: "多彩的造型", topic: "外观积木、造型切换", project: "变装秀" },
      { id: 4, title: "搭建舞台", topic: "背景切换、多角色添加", project: "小猫跳跳" },
      { id: 5, title: "声音世界", topic: "声音积木、播放/停止", project: "动物音乐会" },
      { id: 6, title: "我的名片", topic: "综合: 运动+外观+声音", project: "自我介绍动画" },
    ],
  },
  {
    id: 2,
    name: "事件与序列",
    emoji: "⚡",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    lessons: [
      { id: 7, title: "谁来触发?", topic: "绿旗/按键/点击三种事件", project: "按键控制角色" },
      { id: 8, title: "按顺序来", topic: "顺序结构、等待积木", project: "讲故事动画(3幕)" },
      { id: 9, title: "角色对话", topic: "广播消息、接收消息", project: "两人问答动画" },
      { id: 10, title: "舞台坐标", topic: "X/Y 概念、移到坐标", project: "角色精准定位" },
      { id: 11, title: "方向感", topic: "面向方向、面向鼠标", project: "指南针/跟踪鼠标" },
      { id: 12, title: "小短剧", topic: "综合: 事件+序列+广播", project: "外星飞碟剧场" },
    ],
  },
  {
    id: 3,
    name: "循环与重复",
    emoji: "🔄",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    lessons: [
      { id: 13, title: "重复的魔法", topic: "重复N次 积木", project: "小树长大" },
      { id: 14, title: "永不停歇", topic: "重复执行 积木", project: "小球反弹" },
      { id: 15, title: "画笔入门", topic: "落笔/抬笔/颜色/粗细", project: "自由涂鸦板" },
      { id: 16, title: "循环画图", topic: "重复+转向=图形", project: "图案生成器" },
      { id: 17, title: "走路动画", topic: "造型切换+循环", project: "走路的小人" },
      { id: 18, title: "音乐记忆", topic: "循环+音乐扩展", project: "音乐记忆游戏" },
      { id: 19, title: "弹弹球", topic: "循环+移动+碰边反弹", project: "弹球屏保" },
      { id: 20, title: "弹球对战", topic: "多角色+循环综合", project: "弹球对战游戏" },
    ],
  },
  {
    id: 4,
    name: "条件与判断",
    emoji: "🎯",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    lessons: [
      { id: 21, title: "如果碰到...", topic: "如果那么 积木、碰边反弹", project: "自动反弹球" },
      { id: 22, title: "走迷宫", topic: "碰到颜色检测", project: "简单迷宫游戏" },
      { id: 23, title: "二选一", topic: "如果...否则 积木", project: "红绿灯判断" },
      { id: 24, title: "键盘小达人", topic: "按键侦测+条件", project: "刺猬快跑" },
      { id: 25, title: "打地鼠", topic: "随机出现+点击侦测", project: "捉鬼游戏" },
      { id: 26, title: "计分板", topic: "变量(得分)初步", project: "取水果+计分" },
      { id: 27, title: "计时器", topic: "变量(时间)+倒计时", project: "30秒挑战" },
      { id: 28, title: "猫捉老鼠", topic: "条件+循环+变量综合", project: "猫捉老鼠完整游戏" },
    ],
  },
  {
    id: 5,
    name: "综合创作",
    emoji: "🚀",
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    lessons: [
      { id: 29, title: "创意画板", topic: "画笔进阶+多工具", project: "创意画板" },
      { id: 30, title: "下雪啦", topic: "克隆基础", project: "克隆雪花" },
      { id: 31, title: "满天星", topic: "随机数+画笔", project: "随机星空" },
      { id: 32, title: "我的故事", topic: "自由创作-动画", project: "原创故事动画" },
      { id: 33, title: "我的游戏", topic: "自由创作-游戏", project: "消灭星星" },
      { id: 34, title: "汽车竞速", topic: "综合互动游戏", project: "汽车竞速游戏" },
      { id: 35, title: "精品打磨", topic: "优化与完善", project: "滑板少年" },
      { id: 36, title: "作品展示会", topic: "展示与评价", project: "平台跳跃" },
    ],
  },
];
