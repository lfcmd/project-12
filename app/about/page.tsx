import Navigation from '@/components/navigation';
import { t } from '@/lib/i18n';

// 直接在组件中定义关于页面的文本内容
const aboutContent = {
  title: '关于我们',
  subtitle: '人工智能与手绘灵魂的交汇处',
  missionTitle: '我们的使命',
  missionText: '欢迎来到 HandDraw.AI！在这里，先进的人工智能与手绘艺术的永恒魅力相遇。我们的使命是打破艺术创作的壁垒，让每一位用户——从专业设计师到充满热情的爱好者——都能以手绘风格独特的质感和温度，将想象力变为现实。我们相信，创造力不应受技术障碍的限制，而我们的平台就是连接你的想象与精美艺术作品的桥梁。',
  techTitle: '我们的技术',
  techText: '是什么让 HandDraw.AI 与众不同？当许多AI工具追求照片般逼真时，我们选择了一条截然不同的道路。我们的模型在大量、多样化的真实手绘杰作上进行了精心训练。这种专注使我们的AI能够理解和复制不同艺术媒介的微妙之处——无论是水彩的细腻渲染、油画的大胆笔触、铅笔素描的精细线条，还是吉卜力风格动画的梦幻美学。我们生成的不仅仅是一张图片，而是一件有灵魂的艺术品。',
  forCreatorsTitle: '为每一位创作者而生',
  forCreatorsText: 'HandDraw.AI 为你内心的创作者而生。无论你是一位寻求探索新媒介的艺术家，一位需要快速风格化资产的设计师，一位创造引人注目营销活动推广的市场人员，还是仅仅想把珍贵回忆变成独特艺术的人，我们的工具都随时为你服务。我们处理复杂的技术，让你专注于真正重要的事情：你的创意表达。',
  communityCall: '现在就加入我们的社区，开始你的创作之旅。让我们一起，手绘未来。'
};


function AboutSection() {
  const about = aboutContent;
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">{about.title}</span>
          </h2>
          <p className="text-xl text-gray-400">{about.subtitle}</p>
        </div>
        <div className="space-y-10 text-lg text-gray-300 leading-relaxed">
          <div className="bg-gray-900/30 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">{about.missionTitle}</h3>
            <p>{about.missionText}</p>
          </div>
          <div className="bg-gray-900/30 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">{about.techTitle}</h3>
            <p>{about.techText}</p>
          </div>
          <div className="bg-gray-900/30 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">{about.forCreatorsTitle}</h3>
            <p>{about.forCreatorsText}</p>
          </div>
          <div className="text-center mt-16">
            <p className="text-xl text-cyan-400 font-semibold">{about.communityCall}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const currentLang = t.zh;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navigation
        currentLang={currentLang}
        isStaticPage={true}
      />
      <AboutSection />
    </div>
  );
} 