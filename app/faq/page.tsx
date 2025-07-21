'use client';

import Navigation from '@/components/navigation';
import { t } from '@/lib/i18n';

const faqContent = {
  title: '常见问题',
  subtitle: '如果您有任何其他问题，请随时与我们联系。',
  questions: [
    { q: '什么是 HandDraw.AI？', a: 'HandDraw.AI 是一个专门针对手绘风格的AI生成平台。我们使用在真实手绘作品上训练的先进模型，为艺术家、设计师和创意爱好者提供高质量、具有独特艺术感的手绘图像。' },
    { q: 'HandDraw.AI 是免费的吗？', a: '我们提供免费试用计划，允许用户每天进行有限次数的生成。对于需要更多功能和更高使用量的专业用户，我们提供价格合理的专业版和企业版计划。' },
    { q: 'HandDraw.AI 与其他AI艺术生成器有何不同？', a: '我们的核心区别在于我们专注于“手绘”。与追求照片真实感的通用模型不同，我们的模型专门用于模拟各种手绘风格的纹理、笔触和温暖感，例如水彩、铅笔素描和吉卜力风格。' },
    { q: '我可以使用生成的图像用于商业目的吗？', a: '是的，通过我们的付费计划（专业版和企业版）生成的所有图像都包含完整的商业许可，允许您将它们用于个人和商业项目，无需担心版权问题。' },
    { q: '生成一张图片需要多长时间？', a: '我们优化的架构确保了快速生成。在专业版计划中，大多数图像可以在大约30秒内完成，因此您的创造力无需等待。' }
  ]
};

function FaqSection() {
  const faq = faqContent;
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">{faq.title}</span>
          </h2>
          <p className="text-xl text-gray-400">{faq.subtitle}</p>
        </div>
        <div className="space-y-8">
          {faq.questions.map((item, index) => (
            <div key={index} className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">{item.q}</h3>
              <p className="text-gray-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FaqPage() {
  const currentLang = t.zh;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navigation
        currentLang={currentLang}
        isStaticPage={true}
      />
      <FaqSection />
    </div>
  );
} 