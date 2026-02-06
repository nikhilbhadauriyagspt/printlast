import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ChevronRight, Shield, Lock, FileText, Mail, MapPin } from 'lucide-react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen font-sans text-slate-900">
            <SEO 
                pageName="privacy_policy" 
                fallbackTitle="Privacy Policy - PrintLast" 
                fallbackDesc="Read the Privacy Notice for PrintLast describing how we collect, store, and use your personal information." 
            />

            {/* --- HEADER SECTION --- */}
            <div className="bg-slate-50 pt-32 pb-20 border-b border-slate-100">
                <div className="container mx-auto px-6 md:px-12">
                    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
                        <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
                        <ChevronRight size={10} />
                        <span className="text-slate-900">Privacy Policy</span>
                    </nav>
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-50 rounded-full mb-8">
                            <Shield size={14} className="text-brand-600" />
                            <span className="text-brand-600 font-black uppercase tracking-[0.3em] text-[10px]">Data Protection</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6">
                            Privacy <span className="text-slate-400">Notice.</span>
                        </h1>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl">
                            Last updated February 06, 2026. This notice describes how and why PrintLast might process your personal information when you use our services.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="container mx-auto px-6 md:px-12 py-24">
                <div className="max-w-4xl mx-auto">
                    
                    <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
                        
                        <p>
                            This Privacy Notice for PrintLast ("<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>"), describes how and why we might access, collect, store, use, and/or share ("<strong>process</strong>") your personal information when you use our services ("<strong>Services</strong>"), including when you:
                        </p>
                        <ul>
                            <li>Visit our website at <a href="https://printlast.shop/">https://printlast.shop/</a> or any website of ours that links to this Privacy Notice</li>
                            <li>Use PrintLast. At Printlast, we don't just sell printers as hardware. We provide the operational backbone that keeps your business running smoothly. From home offices to enterprise networks, we deliver tech that works.</li>
                            <li>Engage with us in other related ways, including any marketing or events</li>
                        </ul>
                        <p>
                            <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <strong>printlast@outlook.com</strong>.
                        </p>

                        <h2 id="summary">SUMMARY OF KEY POINTS</h2>
                        <p>
                            This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.
                        </p>
                        <p>
                            <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.
                        </p>
                        <p>
                            <strong>Do we process any sensitive personal information?</strong> Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.
                        </p>
                        <p>
                            <strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.
                        </p>
                        <p>
                            <strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so.
                        </p>
                        <p>
                            <strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties.
                        </p>
                        <p>
                            <strong>How do we keep your information safe?</strong> We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
                        </p>
                        <p>
                            <strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.
                        </p>
                        <p>
                            <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
                        </p>

                        <h2 id="toc">TABLE OF CONTENTS</h2>
                        <ol>
                            <li><a href="#info-collect">WHAT INFORMATION DO WE COLLECT?</a></li>
                            <li><a href="#info-process">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
                            <li><a href="#legal-bases">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
                            <li><a href="#share-info">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
                            <li><a href="#cookies">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
                            <li><a href="#retention">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
                            <li><a href="#safety">HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
                            <li><a href="#minors">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
                            <li><a href="#rights">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
                            <li><a href="#dnt">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
                            <li><a href="#us-rights">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
                            <li><a href="#updates">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
                            <li><a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
                            <li><a href="#review-data">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
                        </ol>

                        <h2 id="info-collect">1. WHAT INFORMATION DO WE COLLECT?</h2>
                        <h3>Personal information you disclose to us</h3>
                        <p><em><strong>In Short:</strong> We collect personal information that you provide to us.</em></p>
                        <p>
                            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                        </p>
                        <p>
                            <strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
                        </p>
                        <ul>
                            <li>names</li>
                            <li>phone numbers</li>
                            <li>email addresses</li>
                            <li>billing addresses</li>
                            <li>debit/credit card numbers</li>
                        </ul>
                        <p><strong>Sensitive Information.</strong> We do not process sensitive information.</p>
                        <p>
                            <strong>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by PayPal, Visa and Master Card. You may find their privacy notice link(s) here: <a href="https://www.paypal.com/us/legalhub/paypal/privacy-full">https://www.paypal.com/us/legalhub/paypal/privacy-full</a>, <a href="https://www.visa.co.in/legal/global-privacy-notice.html">https://www.visa.co.in/legal/global-privacy-notice.html</a> and <a href="https://www.mastercard.com/us/en/global-privacy-notice.html">https://www.mastercard.com/us/en/global-privacy-notice.html</a>.
                        </p>
                        <p>
                            All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
                        </p>

                        <h2 id="info-process">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
                        <p>
                            <em><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We process the personal information for the following purposes listed below. We may also process your information for other purposes only with your prior explicit consent.</em>
                        </p>
                        <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
                        <ul>
                            <li><strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
                            <li><strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.</li>
                        </ul>

                        <h2 id="legal-bases">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
                        <p>
                            <em><strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</em>
                        </p>
                        <p>If you are located in Canada, this section applies to you.</p>
                        <p>
                            We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.
                        </p>
                        <p>In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>
                        <ul>
                            <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
                            <li>For investigations and fraud detection and prevention</li>
                            <li>For business transactions provided certain conditions are met</li>
                            <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
                            <li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
                            <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
                            <li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
                            <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
                            <li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
                            <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
                            <li>If the information is publicly available and is specified by the regulations</li>
                            <li>We may disclose de-identified information for approved research or statistics projects, subject to ethics oversight and confidentiality commitments</li>
                        </ul>

                        <h2 id="share-info">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
                        <p><em><strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.</em></p>
                        <p>We may need to share your personal information in the following situations:</p>
                        <ul>
                            <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                        </ul>

                        <h2 id="cookies">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
                        <p><em><strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.</em></p>
                        <p>
                            We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
                        </p>
                        <p>
                            We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
                        </p>
                        <p>
                            Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
                        </p>
                        <p><strong>Google Analytics</strong></p>
                        <p>
                            We may share your information with Google Analytics to track and analyze the use of the Services. To opt out of being tracked by Google Analytics across the Services, visit <a href="https://tools.google.com/dlpage/gaoptout">https://tools.google.com/dlpage/gaoptout</a>. For more information on the privacy practices of Google, please visit the Google Privacy & Terms page.
                        </p>

                        <h2 id="retention">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
                        <p><em><strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</em></p>
                        <p>
                            We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
                        </p>
                        <p>
                            When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                        </p>

                        <h2 id="safety">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
                        <p><em><strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.</em></p>
                        <p>
                            We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                        </p>

                        <h2 id="minors">8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
                        <p><em><strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.</em></p>
                        <p>
                            By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records.
                        </p>

                        <h2 id="rights">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
                        <p><em><strong>In Short:</strong> You may review, change, or terminate your account at any time.</em></p>
                        <p>
                            If you are located in the EEA or UK, you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.
                        </p>
                        <p>
                            <strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time by contacting us at <strong>printlast@outlook.com</strong>.
                        </p>

                        <h2 id="dnt">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
                        <p>
                            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized.
                        </p>

                        <h2 id="us-rights">11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
                        <p>
                            If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have specific rights regarding your personal information.
                        </p>

                        <h2 id="updates">12. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
                        <p><em><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>
                        <p>
                            We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice.
                        </p>

                        <h2 id="contact">13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
                        <p>
                            If you have questions or comments about this notice, you may email us at <strong>printlast@outlook.com</strong> or contact us by post at:
                        </p>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 not-prose mb-8">
                            <div className="flex items-start gap-4 mb-4">
                                <MapPin className="text-brand-600 shrink-0" size={20} />
                                <div>
                                    <p className="font-black text-slate-900 uppercase tracking-tight">PrintLast</p>
                                    <p className="text-slate-500 font-medium">8560 Florida Blvd,<br />Baton Rouge, LA 70815<br />United States</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="text-brand-600 shrink-0" size={20} />
                                <p className="text-slate-900 font-black">printlast@outlook.com</p>
                            </div>
                        </div>

                        <h2 id="review-data">14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
                        <p>
                            Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information.
                        </p>

                    </div>
                </div>
            </div>

            {/* --- CTA SECTION --- */}
            <div className="container mx-auto px-6 md:px-12 py-20">
                <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-600/10 blur-[120px] rounded-full"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">Your trust is our priority.</h2>
                        <p className="text-slate-400 mb-12 font-medium max-w-xl mx-auto text-lg leading-relaxed">
                            If you have any further questions regarding your data, please don't hesitate to reach out to our legal team.
                        </p>
                        <a href="mailto:printlast@outlook.com" className="inline-flex items-center gap-3 px-12 py-6 bg-white text-slate-900 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-600 hover:text-white transition-all shadow-2xl">
                            Contact Legal Support <MoveRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;