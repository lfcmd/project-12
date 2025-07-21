import React from 'react';
import Navigation from '@/components/navigation';
import { t } from '@/lib/i18n';

export default function TermsOfService() {
  return (
    <div>
      <Navigation currentLang={t.en} isStaticPage={true} />
      <main className="max-w-2xl mx-auto py-16 px-4 text-gray-100">
        <h1 className="text-3xl font-bold mb-6">Terms of Service for HandDraw.AI</h1>
        <h2 className="text-xl font-bold mt-8 mb-2">Introduction and Acceptance of Terms</h2>
        <p className="mb-4">Welcome to HandDraw.AI, an AI-powered platform designed for generating professional hand-drawn artworks and image files in seconds. By accessing or using our service, you agree to be bound by these Terms of Service. If you do not agree with any of these terms, please do not use our service.</p>
        <h2 className="text-xl font-bold mt-8 mb-2">Use of the Service</h2>
        <p className="mb-4">HandDraw.AI provides users with a comprehensive platform to create unique hand-drawn artworks and export image files using our AI-powered technology. You agree to use the service in accordance with all applicable local, state, national, and international laws and regulations.</p>
        <h2 className="text-xl font-bold mt-8 mb-2">User Accounts and Registration</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><b>Account Creation</b>: To access certain features of the service, you may need to create an account. You must provide accurate and complete information during the registration process.</li>
          <li><b>Account Security</b>: You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
          <li><b>User Responsibilities</b>: You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</li>
        </ul>
        <h2 className="text-xl font-bold mt-8 mb-2">Content and Intellectual Property Rights</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>All content provided through HandDraw.AI, including but not limited to AI models, templates, generated artworks, image files, and documentation, is protected under copyright law. The copyright owner of HandDraw.AI is handdraw.ai.</li>
          <li>You acknowledge that you do not own the underlying technology or intellectual property that makes up the HandDraw.AI service, and you agree to respect the intellectual property rights of handdraw.ai and any third parties.</li>
          <li>While you retain ownership of your custom prompts and generated artworks, the core HandDraw.AI platform and AI technology remain the property of handdraw.ai.</li>
        </ul>
        <h2 className="text-xl font-bold mt-8 mb-2">Prohibited Activities</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Unauthorized access to or distribution of our proprietary AI models and technology</li>
          <li>Reselling or redistributing HandDraw.AI generated content without proper licensing</li>
          <li>Interfering with or disrupting the security or performance of the service</li>
          <li>Using the service for any illegal or unauthorized purpose</li>
          <li>Attempting to bypass any security features of the service</li>
          <li>Creating content that violates intellectual property rights of third parties</li>
        </ul>
        <h2 className="text-xl font-bold mt-8 mb-2">Privacy and Data Collection</h2>
        <p className="mb-4">HandDraw.AI collects the following types of data:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Account Information: Information you provide when creating an account</li>
          <li>Usage Details: Data related to your activity on our service</li>
          <li>Device Information: Information about the device you use to access our service</li>
          <li>Cookies: Data that helps us enhance your experience with our service</li>
          <li>Payment and Billing Information: Data necessary to process payments</li>
          <li>Generated Content: Artworks and prompts you create using our service</li>
        </ul>
        <p className="mb-4">For more details on data collection practices, please refer to our separate Privacy Policy.</p>
        <h2 className="text-xl font-bold mt-8 mb-2">Pricing and Payments</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>All purchases are final and non-refundable unless otherwise required by law.</li>
          <li>Prices are subject to change with notice to users.</li>
          <li>You agree to pay all charges associated with your selected plan.</li>
          <li>Payment terms are based on your selected payment method and plan.</li>
          <li>Credits expire according to your plan terms.</li>
        </ul>
        <h2 className="text-xl font-bold mt-8 mb-2">Termination</h2>
        <p className="mb-4">We reserve the right to terminate or suspend your access to the service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the service, us, or third parties.</p>
        <h2 className="text-xl font-bold mt-8 mb-2">Disclaimer of Warranties</h2>
        <p className="mb-4">The service is provided on an "as is" and "as available" basis. We make no warranties or representations about the accuracy, reliability, or availability of the service and disclaim all warranties to the fullest extent permitted by law.</p>
        <h2 className="text-xl font-bold mt-8 mb-2">Limitation of Liability</h2>
        <p className="mb-4">To the fullest extent permitted by law, handdraw.ai shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use of or inability to use the service.</p>
        <h2 className="text-xl font-bold mt-8 mb-2">Indemnification</h2>
        <p className="mb-4">You agree to indemnify and hold harmless handdraw.ai, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including attorneys' fees) arising from your use of the service or violation of these Terms.</p>
        <h2 className="text-xl font-bold mt-8 mb-2">Governing Law and Dispute Resolution</h2>
        <p className="mb-4">These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which handdraw.ai operates, without regard to its conflict of law provisions. Any disputes arising from these Terms or the service will be resolved through binding arbitration in accordance with applicable laws.</p>
        <h2 className="text-xl font-bold mt-8 mb-2">Changes to These Terms</h2>
        <p className="mb-4">We reserve the right to update or modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of the service after any changes signifies your acceptance of the new terms.</p>
        <h2 className="text-xl font-bold mt-8 mb-2">Contact Information</h2>
        <p className="mb-4">If you have any questions about these Terms, please contact us at:<br/>
        <b>Email:</b> <a href="mailto:fan405141@gmail.com" className="text-cyan-400 underline">fan405141@gmail.com</a></p>
        <p>By using HandDraw.AI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. Thank you for choosing HandDraw.AI!</p>
      </main>
    </div>
  );
} 