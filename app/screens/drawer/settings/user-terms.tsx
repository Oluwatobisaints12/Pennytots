import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import HeaderTitle from '../../../components/HeaderTitle';

type UserTermScreenProps = {
  navigation: any;
};

const UserTerms: React.FC<UserTermScreenProps> = ({ navigation }) => {
  const termsHTML = `
  <html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  </head>
  <body style="font-size: 20px; line-height: 1.5em;">
  <p style="font-size: 25px; line-height: 25px"><strong> User Agreement </strong></p>
  <p style="font-size: 20px; line-height: 20px">This Agreement was last modified on 25th&nbsp;March 2023.</p>
  <p style="font-size: 20px; line-height: 20px">This User Agreement describes the terms and conditions which you accept by using our Platform or our Services. We have incorporated by reference some linked information.</p>
  <p style="font-size: 20px; line-height: 20px">In this User Agreement:</p>
  <p style="font-size: 20px; line-height: 20px">&quot;Account&quot;&nbsp;means the account associated with your email address.</p>
  <p style="font-size: 20px; line-height: 20px">&quot;Dispute Resolution Process&quot;&nbsp;means the process to be followed by Users in accordance with the Dispute Resolution Services.</p>
  <p style="font-size: 20px; line-height: 20px">&quot;Pennytots&quot;,&nbsp;&quot;we&quot;,&nbsp;&quot;our&quot;,&nbsp;&ldquo;company&rdquo;&nbsp;or&nbsp;&ldquo;the company&rdquo;&nbsp;or&nbsp;&quot;us&quot;&nbsp;means Laten Geuberen Limited, Canada or Laten Geuberen Enterprises, Nigeria.</p>
  <p style="font-size: 20px; line-height: 20px">&ldquo;Pennytots Verified&rdquo;&nbsp;means Users have been satisfactorily verified under the Know your Customer and Identity Verification Policy.</p>
  <p style="font-size: 20px; line-height: 20px">&quot;Inactive Account&quot;&nbsp;means a User Account that has not been logged into for a 6-month period, or other period determined by us from time to time.</p>
  <p style="font-size: 20px; line-height: 20px">&quot;Intellectual Property Rights&quot;&nbsp;means any and all intellectual property rights, existing worldwide and the subject matter of such rights, including: (a) patents, copyright, rights in circuit layouts (or similar rights), registered designs, registered and unregistered trademarks, and any right to have confidential information kept confidential; and (b) any application or right to apply for registration of any of the rights referred to in paragraph (a), whether or not such rights are registered or capable of being registered and whether existing under any laws, at common law or in equity.</p>
  <p style="font-size: 20px; line-height: 20px">&quot;Pennytots Services&quot;&nbsp;means all services provided by us to you.</p>
  <p style="font-size: 20px; line-height: 20px">&quot;User&quot;,&nbsp;&quot;you&quot;&nbsp;or&nbsp;&quot;your&quot;&nbsp;means an individual who visits or uses the Platform, including via the API.</p>
  <p style="font-size: 20px; line-height: 20px">&quot;User Contract&quot;&nbsp;means: (1) this User Agreement; (2) the&nbsp;Code of Conduct&nbsp;as amended from time to time; (3) any other material incorporated by reference from time to time.</p>
  <p style="font-size: 20px; line-height: 20px">&quot;Platform&quot;&nbsp;means the Platforms operated by Pennytots and available at:&nbsp;<a href="https://www.fashcore.com">Pennytots.com</a> and any of its regional or other domains or properties, and any related Pennytots service, tool or application, specifically including mobile web, any iOS App and any Android App, or API or other access mechanism.</p>
  <p style="font-size: 20px; line-height: 20px">1. Overview</p>
  <p style="font-size: 20px; line-height: 20px">By accessing the Platform, you agree to the following terms with Pennytots.</p>
  <p style="font-size: 20px; line-height: 20px">We may amend this User Agreement and any linked information from time to time by posting amended terms on the Platform, without notice to you.</p>
  <p style="font-size: 20px; line-height: 20px">The Platform is an online venue where Users advertise items. Users must register for an Account in order to advertise items. We merely facilitate advertisements.</p>
  <p style="font-size: 20px; line-height: 20px">We may, from time to time, and without notice, change or add to the Platform or the information, products or services described in it. However, we do not undertake to keep the Platform updated. We are not liable to you or anyone else if any error occurs in the information on the Platform or if that information is not current.</p>
  <p style="font-size: 20px; line-height: 20px">2. Scope</p>
  <p style="font-size: 20px; line-height: 20px">Before using the Platform, you must read the whole User Agreement, the Platform policies and all linked information.</p>
  <p style="font-size: 20px; line-height: 20px">You must read and accept all of the terms in, and linked to, this User Agreement, the&nbsp;<a href="http://fashcore.com/?code">Code of Conduct</a>, the Pennytots&nbsp;<a href="http://fashcore.com/?privacy">Privacy Policy</a> and all Platform policies. By accepting this User Agreement as you access our Platform, you agree that this User Agreement will apply whenever you use the Platform, or when you use the tools we make available to interact with the Platform. Some Platforms may have additional or other terms that we provide to you when you use those services.</p>
  <p style="font-size: 20px; line-height: 20px">3. Eligibility</p>
  <p style="font-size: 20px; line-height: 20px">You will not use the Platform if you:</p>
  <ol>
      <li>
          <p style="font-size: 20px; line-height: 20px">are not able to form legally binding contracts;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">a person barred from receiving and rendering services under the laws of any country or other applicable jurisdiction;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">are suspended from using the Platform; or</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">do not hold a valid email address.</p>
      </li>
  </ol>
  <p style="font-size: 20px; line-height: 20px">All free user accounts are associated with individuals. Login credentials should not be shared by users with others. The individual associated with the account will be held responsible for all actions taken by the account, without limitation.</p>
  <p style="font-size: 20px; line-height: 20px">Subject to your local laws, a person over 15 but under 18 can use an adult&apos;s account with the permission of the account holder. However, the account holder is responsible for all actions taken by the account, without limitation.</p>
  <p style="font-size: 20px; line-height: 20px">Users may provide a business name or a company name, which is associated with the User&apos;s Account. Users acknowledge and agree that where a business name or company name is associated with their Account, this User Agreement is a contract with the User as an individual (not the business or company) and Users remain solely responsible for all activity undertaken in respect of their Account.</p>
  <p style="font-size: 20px; line-height: 20px">We may, at our absolute discretion, refuse to register any person or entity as a User.</p>
  <p style="font-size: 20px; line-height: 20px">You cannot transfer or assign any rights or obligations you have under this agreement without prior written consent.</p>
  <p style="font-size: 20px; line-height: 20px">4. Using Pennytots</p>
  <p style="font-size: 20px; line-height: 20px">While using the Platform, you will not attempt to or otherwise do any of the following:</p>
  <ol>
      <li>
          <p style="font-size: 20px; line-height: 20px">post content or items in inappropriate categories or areas on our Platforms and services;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">infringe any laws, third party rights or our policies, such as the&nbsp;<a href="http://fashcore.com/?code">Code of Conduct</a>;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">circumvent or manipulate our fee structure, the billing process, or fees owed to Pennytots;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">post false, inaccurate, misleading, deceptive, defamatory or offensive content (including personal information);</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">take any action that may undermine the feedback or reputation systems (such as displaying, importing or exporting feedback information or using it for purposes unrelated to the Platform);</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">transfer your Pennytots account (including feedback) and Username to another party without our consent;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">distribute viruses or any other technologies that may harm Pennytots, the Platform, or the interests or property of Pennytots users (including their Intellectual Property Rights, privacy and publicity rights) or is unlawful, threatening, abusive, defamatory, invasive of privacy, vulgar, obscene, profane or which may harass or cause distress or inconvenience to, or incite hatred of, any person;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">download and aggregate listings from our website for display with listings from other websites without our express written permission, &quot;frame&quot;, &quot;mirror&quot; or otherwise incorporate any part of the Platform into any other website without our prior written authorisation;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">attempt to modify, translate, adapt, edit, decompile, disassemble, or reverse engineer any software programs used by us in connection with the Platform;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">copy, modify or distribute rights or content from the Platform or Pennytots&apos;s copyrights and trademarks; or</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">harvest or otherwise collect information about Users, including email addresses, without their consent.</p>
      </li>
  </ol>
  <p style="font-size: 20px; line-height: 20px">5. Intellectual Property Rights Infringement</p>
  <p style="font-size: 20px; line-height: 20px">It is our policy to respond to clear notices of alleged intellectual property rights infringement. Our&nbsp;<a href="http://fashcore.com/?copy">Copyright Infringement Policy</a> is designed to make submitting notices of alleged infringement to us as straightforward as possible while reducing the number of notices that we receive that are fraudulent or difficult to understand or verify. If you believe that your Intellectual Property Rights have been violated, please notify us via&nbsp;<a href="http://fashcore.com/?copy">this link</a> on our Platform and we will investigate.</p>
  <p style="font-size: 20px; line-height: 20px">6. Fees and Services</p>
  <p style="font-size: 20px; line-height: 20px">We charge fees for our services. When you use a service that has a fee, you have an opportunity to review and accept the fees that you will be charged based on our&nbsp;<a href="http://fashcore.com/?fees">Fees and Charges</a>, which we may change from time to time and will update by placing on our Platform. We may choose to temporarily change the fees for our services for specific users or for promotional events or new services, and such changes are effective when we post a temporary promotional event or new service on the Platforms, or as notified through promotional correspondence.</p>
  <p style="font-size: 20px; line-height: 20px">Unless otherwise stated, all fees are quoted in percentages of currencies utilized by Users.</p>
  <p style="font-size: 20px; line-height: 20px">7. Taxes</p>
  <p style="font-size: 20px; line-height: 20px">You are responsible for paying any taxes, including any goods and services or value added taxes, which may be applicable depending on the jurisdiction of the services provided.</p>
  <p style="font-size: 20px; line-height: 20px">Depending on your residency or location, you may be subject to certain ad valorem or other taxes on certain fees that we charge. These taxes will be added to fees billed to you, if applicable.</p>
  <p style="font-size: 20px; line-height: 20px">You acknowledge that you must comply with your obligations under income tax provisions in your jurisdiction.</p>
  <p style="font-size: 20px; line-height: 20px">8. Payment Administration Agent</p>
  <p style="font-size: 20px; line-height: 20px">You acknowledge and agree that we may in our sole discretion, from time to time, appoint our related bodies corporate, affiliates, or any other third party to act as our agent to accept or make payments (including merchant facilities) from or to Users on our behalf.</p>
  <p style="font-size: 20px; line-height: 20px">Such affiliates may be communicated from time to time in this User Agreement.</p>
  <p style="font-size: 20px; line-height: 20px">Such a third party will have the same rights, powers and privileges that we have under this User Agreement and will be entitled to exercise or enforce their rights, powers and privileges as our agent or in their own name. In no event shall we be liable to any User for any loss, damage or liability resulting from the Payment Administration Agent&apos;s negligence and/or acts beyond the authority given by Pennytots.</p>
  <p style="font-size: 20px; line-height: 20px">9. Promotion</p>
  <p style="font-size: 20px; line-height: 20px">We may display your company or business name, logo, images or other media as part of the Pennytots Services and/or other marketing materials relating to the Platform, except where you have explicitly requested that we do not do this and we have agreed to such a request in writing.</p>
  <p style="font-size: 20px; line-height: 20px">You acknowledge that we may use the public description of your advertisements and the content of your profile information on the Platform for marketing and other related purposes.</p>
  <p style="font-size: 20px; line-height: 20px">10. Content</p>
  <p style="font-size: 20px; line-height: 20px">When you give us content, you grant us a worldwide, perpetual, irrevocable, royalty-free, sublicensable (through multiple tiers) right to exercise any and all copyright, trademark, publicity, and database rights (but no other rights) you have in the content, in any media known now or in the future.</p>
  <p style="font-size: 20px; line-height: 20px">You acknowledge and agree that: (1) we act only as a forum for the online distribution and publication of User content. We make no warranty that User content is made available on the Platform. We have the right (but not the obligation) to take any action deemed appropriate by us with respect to your User content; (2) we have no responsibility or liability for the deletion or failure to store any content, whether or not the content was actually made available on the Platform; and (3) any and all content submitted to the Platform is subject to our approval. We may reject, approve or modify your User content at our sole discretion.</p>
  <p style="font-size: 20px; line-height: 20px">You represent and warrant that your content:</p>
  <ol>
      <li>
          <p style="font-size: 20px; line-height: 20px">will not infringe upon or misappropriate any copyright, patent, trademark, trade secret, or other intellectual property right or proprietary right or right of publicity or privacy of any person;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">will not violate any law or regulation;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">will not be defamatory or trade libellous;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">will not be obscene or contain child pornography;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">will not contain the development, design, manufacture or production of missiles, or nuclear, chemical or biological weapons</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">will not contain material linked to terrorist activities</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">will not include incomplete, false or inaccurate information about User or any other individual; and</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">will not contain any viruses or other computer programming routines that are intended to damage, detrimentally interfere with, surreptitiously intercept or expropriate any system, data or personal information.</p>
      </li>
  </ol>
  <p style="font-size: 20px; line-height: 20px">You acknowledge and agree that we may transfer your personal information to a related body corporate and your information may be transferred outside of any country or other applicable jurisdiction. If you wish to withdraw your consent, you acknowledge and agree that we may be unable to provide you with access to the Platform and Pennytots Services and may close your Account.</p>
  <p style="font-size: 20px; line-height: 20px">Information on the Platform may contain general information about legal, financial, health and other matters. The information is not advice, and should not be treated as such. You must not rely on the information on the Platform as an alternative to professional advice. If you have specific questions about any matter you should consult your professional adviser.</p>
  <p style="font-size: 20px; line-height: 20px">We provide unmonitored access to third party content, including User feedback and articles with original content and opinions (or links to such third party content). We only act as a portal and have no liability based on, or related to, third party content on the Platform, whether arising under the laws of copyright or other intellectual property, defamation, libel, privacy, obscenity, or any other legal discipline.</p>
  <p style="font-size: 20px; line-height: 20px">The Platform may contain links to other third party websites. We do not control the websites to which we link from the Platform. We do not endorse the content, products, services, practices, policies or performance of the websites we link to from the Platform. Use of third party content, links to third party content and/or websites is at your risk.</p>
  <p style="font-size: 20px; line-height: 20px">In relation to deletion or hiding of any information or content, using the Platform to delete, hide or otherwise dispose of information does not imply permanent deletion of content or information. Information may be retained for a period of time to fulfil record keeping, regulatory, compliance, statistical, law enforcement and other obligations.</p>
  <p style="font-size: 20px; line-height: 20px">11. Advertising</p>
  <p style="font-size: 20px; line-height: 20px">We will display advertisements or promotions on the Platform. You acknowledge and agree that we shall not be responsible for any loss or damage of any kind incurred by you as a result of the presence of such advertisements or promotions or any subsequent dealings with third parties. Furthermore, you acknowledge and agree that content of any advertisements or promotions may be protected by copyrights, trademarks, service marks, patents or other intellectual property or proprietary rights and laws. Unless expressly authorised by Pennytots or third party right holders, you agree not to modify, sell, distribute, appropriate or create derivative works based on such advertisement/promotions.</p>
  <p style="font-size: 20px; line-height: 20px">12. Communication With Other Users</p>
  <p style="font-size: 20px; line-height: 20px">Pennytots may use information such as your name, location, display or username, and or your image, in relation to the provision messaging services on the Platform or in the mobile apps.</p>
  <p style="font-size: 20px; line-height: 20px">We may read all correspondence posted to the Platform and download or access, and test (if necessary), all uploaded files, programs and websites related to your use of the Platform for the purpose of investigating fraud, regulatory compliance, risk management and other related purposes.</p>
  <p style="font-size: 20px; line-height: 20px">13. Identity / Know Your Customer</p>
  <p style="font-size: 20px; line-height: 20px">You authorise us, directly or through third parties, to make any inquiries we consider necessary to validate your identity. You must, at our request: (1) provide further information to us, which may include your date of birth and or other information that will allow us to reasonably identify you; (2) take steps to confirm ownership of your email address or financial instruments; or (3) verify your information against third party databases or through other sources.</p>
  <p style="font-size: 20px; line-height: 20px">You must also, at our request, provide copies of identification documents (such as your passport or drivers&apos; licence). We may also ask you to provide photographic identification holding a sign with a code that we provide as an additional identity verification step.</p>
  <p style="font-size: 20px; line-height: 20px">We reserve the right to close, suspend, or limit access to your Account, the Platform and/or Pennytots Services in the event we are unable to obtain or verify to our satisfaction the information which we request under this section.</p>
  <p style="font-size: 20px; line-height: 20px">We reserve the right to update your particulars on the website in order to match any KYC documentation that has been provided. Disbursements such as wire transfers from the website may only be made to the beneficiary matching your provided KYC documents and account information.</p>
  <p style="font-size: 20px; line-height: 20px">If you are not Pennytots verified you may not be able to withdraw funds from your Pennytots account, and other restrictions may apply. See the Know Your Customer and Identity Verification Policy for more details.</p>
  <p style="font-size: 20px; line-height: 20px">14. User Services</p>
  <p style="font-size: 20px; line-height: 20px">You agree not to enter into any contractual provisions in conflict with the User Agreement.</p>
  <p style="font-size: 20px; line-height: 20px">We have no responsibility for enforcing any rights under a User Contract.</p>
  <p style="font-size: 20px; line-height: 20px">Depending on their jurisdiction, Users may have rights under statutory warranties that cannot lawfully be excluded. Nothing in this User Agreement is intended to override a right that by applicable law may not be excluded. To the extent that any component of this User Agreement is in conflict with inalienable rights under local laws, all parties intend for this agreement to be read down only insofar as to be in compliance with such local laws and no further.</p>
  <p style="font-size: 20px; line-height: 20px">Nothing in this User Agreement creates a partnership, joint venture, agency or employment relationship between Users. Nothing in this User Agreement shall in any way be construed as forming a joint venture, partnership or an employer-employee relationship between Pennytots and any User.</p>
  <p style="font-size: 20px; line-height: 20px">15. Special Provisions for Content</p>
  <p style="font-size: 20px; line-height: 20px">Each User acknowledges:</p>
  <ol>
      <li>
          <p style="font-size: 20px; line-height: 20px">Pennytots does not review, approve, recommend or verify any of the credentials, licences or statements of capability in relation to Content on the Platform);</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">Pennytots provides advertisement services only. Users agree that Pennytots has no liability for any other aspect of service delivery or interaction between Users. Pennytots is not a party to any disputes between Users, although we provide a dispute resolution mechanism to assist the parties in resolving issues;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">Pennytots may from time to time include map features and Pennytots may display the location of Users to persons browsing the Platform on that map; and &nbsp;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">Pennytots may collect location related data from you via technologies including but not limited to GPS, IP address location, wifi, and other methods. This data may be shared in the context of facilitating Content and each User specifically consents to this collection and sharing as part of this agreement.</p>
      </li>
  </ol>
  <p style="font-size: 20px; line-height: 20px">16. Usage Credit</p>
  <p style="font-size: 20px; line-height: 20px">You may have positive usage credit in your Account if you have prepaid for usage.</p>
  <p style="font-size: 20px; line-height: 20px">Funds from usage credit in your Account are held by us in our operating accounts held with financial institutions. Such funds are not held separately by us, and may be commingled with our general operating funds, and/or funds from other User&apos;s Accounts.</p>
  <p style="font-size: 20px; line-height: 20px">You are not entitled to any interest, or other earnings for usage credit that are in your Account.</p>
  <p style="font-size: 20px; line-height: 20px">We may receive interest on funds held by us in our operating accounts from financial institutions with whom we hold our operating accounts. Any such interest earned belongs to us and we will not be liable to any User for any imputed interest on such funds.</p>
  <p style="font-size: 20px; line-height: 20px">If your Account has negative usage credit, we may:</p>
  <ol>
      <li>
          <p style="font-size: 20px; line-height: 20px">set-off the negative amount with usage credit that you subsequently receive into your Account;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">if you have usage credit in multiple currencies in your Account and one of the currencies becomes negative for any reason, we may set-off the negative amount against usage credit you maintain in a different currency (at an exchange rate applied by us);</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">reverse payments you have made from your Account to other User Accounts on the Platform;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">deduct amounts you owe us from money you subsequently add or receive into your Account; or</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">immediately suspend or limit your Account until such time as your Account no longer has a negative amount.</p>
      </li>
  </ol>
  <p style="font-size: 20px; line-height: 20px">In the event that we offset a negative amount of usage credit pursuant to this section, it may be bundled with another debit coming out of your Account.</p>
  <p style="font-size: 20px; line-height: 20px">We reserve the right to collect any usage credit owed to us by any other legal means.</p>
  <p style="font-size: 20px; line-height: 20px">You acknowledge and agree that:</p>
  <ol>
      <li>
          <p style="font-size: 20px; line-height: 20px">we are not a bank or other licensed financial institution and do not provide banking services or any financial services to you;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">the usage credit shown in your Account (which may include any prepayment of fees and charges which you owe to us) represents our unsecured obligations to you with respect to your rights to direct us to make payment in relation to the sale of advertisement through the Platform;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">if you were a User acquired in an acquisition and your account was migrated to the Platform, we are responsible for your positive usage credit only to the extent of the legal documentation between us and any acquired marketplace, along with this agreement, and you acknowledge specifically that the onus is on you to confirm the validity of your fund, and that any understatement or misstatement in relation to this is not a claim against us, and belongs with the counterparty of any prior user agreement to which you agreed;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">to the extent that we are required to release usage credit from your Account to you, you will become our unsecured creditor until such usage credit are paid to you;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">we are not acting as a trustee or fiduciary with respect to such usage credit or payments;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">the amount of usage credit showing in your Account is not insured and is not a guaranteed deposit;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">usage credit may only loaded into your Account, or released from your Account, by us and you must only use the mechanisms available on the Platform to pay for, or receive usage credit in respect of advertisements;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">any reusage credit required to be processed in your favour will be returned only to the source of the original deposit, and cannot be redirected to any other payment source;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">we will hold usage credit in respect of the amount of your Account in an account held by us with a financial institution (or in any manner that we decide in our sole discretion from time to time) and such usage credit are not segregated into a separate account; and</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">we may commingle your usage credit with usage credit of other Users and our own usage credit and such commingled usage credit could be used to pay other Users or for our general corporate purposes or otherwise, however, we will remain obliged to release or refund usage credit at your direction in accordance with this User Agreement.</p>
      </li>
  </ol>
  <p style="font-size: 20px; line-height: 20px">17. Limits &amp; Fraud Prevention</p>
  <p style="font-size: 20px; line-height: 20px">We reserve the right to suspend a User withdrawal request if the source of the funds is suspected to be fraudulent.</p>
  <p style="font-size: 20px; line-height: 20px">If we become aware that any funds received into an Account from another Account as a result of a fraudulent transaction, this will be reversed immediately. If those funds have already been released to you, you must pay the funds into your Account. If you do not do so, we may suspend, limit or cancel your account, or take action against you to recover those funds.</p>
  <p style="font-size: 20px; line-height: 20px">We may, in our sole discretion, place a limit on any or all of the funds in your Account (thereby preventing any use of the funds) if:</p>
  <ol>
      <li>
          <p style="font-size: 20px; line-height: 20px">we believe there may be an unacceptable level of risk associated with you, your Account, or any or all of your transactions, including if we believe that there is a risk that such funds will be subject to reversal or chargeback;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">we believe that the beneficiary of the payment is someone other than you;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">we believe that the payment is being made to a country where we do not offer our Service; or</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">we are required to do so by law or applicable law enforcement agencies.</p>
      </li>
  </ol>
  <p style="font-size: 20px; line-height: 20px">If you are involved in a dispute, we may (in certain circumstances) place a temporary limit on the funds in your Account to cover the amount of any potential liability. If the dispute is resolved in your favour, we will lift the limit on your funds and those funds may be released to you. If the dispute is not resolved in your favour, we may remove the funds from your Account. We may also place a limit on your account in circumstances where we suspect you of fraudulent or other unacceptable behaviour, while we investigate any such matter.</p>
  <p style="font-size: 20px; line-height: 20px">18. Refunds</p>
  <p style="font-size: 20px; line-height: 20px">You may ask for a refund at any time for any usage credit that you have paid into your Account except if the amount to refund relates to fees or charges payable to us.</p>
  <p style="font-size: 20px; line-height: 20px">If the amount the User has asked to refund relates to our fees and charges, the process set out in the Clause &quot;Disputes with Us&quot; must be followed.</p>
  <p style="font-size: 20px; line-height: 20px">If we agree to the refund, the funds will be received by the User via the same payment method(s) used by Pennytots to make payments to Users.</p>
  <p style="font-size: 20px; line-height: 20px">We may refund funds to Users irrespective of whether a User has requested funds be refunded if: (1) we are required by law or consider that we are required by law to do so; (2) we determine that refunding funds to the User will avoid any dispute or an increase in our costs; (3) we refund funds to the User in accordance with any refund policy specified by us from time to time; (4) we find out that the original payment made by the User is fraudulent; (5) the User made a duplicate payment in error; or (6) we consider, in our sole opinion, that it is likely that the refund of funds is necessary to avoid a credit card chargeback.</p>
  <p style="font-size: 20px; line-height: 20px">You can request a refund by using our customer support website or emailing us at&nbsp;<a href="mailto:support@fashcore.com">support@Pennytots.com</a>. Once you have made a payment, you expressly agree to use the dispute resolution process in this agreement, expressly agree to be bound by its ruling and expressly agree not to initiate any chargeback request with your card issuer.</p>
  <p style="font-size: 20px; line-height: 20px">If you initiate any chargeback request or other &ldquo;Request for Information&rdquo; or similar process, you expressly agree and consent to us to share any and all information in relation to your agreement of these terms and conditions, in order to defeat any such chargeback request.</p>
  <p style="font-size: 20px; line-height: 20px">If you have already initiated a chargeback request with your credit card issuer, you must not request a refund of funds by contacting us and must not seek double recovery.</p>
  <p style="font-size: 20px; line-height: 20px">If we reasonably determine, having considered all the relevant circumstances, that you have made an excessive or unreasonable number of requests to refund funds back to you or chargebacks, we may suspend, limit or close your Account.</p>
  <p style="font-size: 20px; line-height: 20px">19. Chargebacks</p>
  <p style="font-size: 20px; line-height: 20px">A chargeback (being a challenge to a payment that a User files with their card issuer or financial institution), and any subsequent reversal instruction, is made by the payment product issuer or third parties (such as payment processors) and not by us. We are bound to follow such instructions.</p>
  <p style="font-size: 20px; line-height: 20px">You acknowledge and agree that we will be entitled to recover any chargebacks and reversals that may be imposed on us by a payment product issuer or third parties (such as payment processors) on funds paid through the Platform, as well as any processing or any other fees whatsoever incurred by us on those chargebacks and reversals.</p>
  <p style="font-size: 20px; line-height: 20px">You agree that we may reverse any such payments made to you, which are subject to chargeback or reversal instruction via your payment product issuer or third parties (such as payment processors). If you initiate any chargeback request or other &ldquo;Request for Information&rdquo; or similar process, you expressly agree and consent to us to share any and all information in relation to your agreement of these terms and conditions, in order to defeat any such chargeback request.</p>
  <p style="font-size: 20px; line-height: 20px">20. Inactive Accounts</p>
  <p style="font-size: 20px; line-height: 20px">User Accounts that have not been logged into for a period of time will incur a maintenance fee per month, until either the account is closed or reactivated, for storage, bandwidth, support and management costs of providing hosting of the User&apos;s profile, portfolio storage, listing in directories, promotion of your profile on the Platform and elsewhere, provision of service, file storage, message transmission, general administrative matters and message and other storage costs.</p>
  <p style="font-size: 20px; line-height: 20px">The length of the period and the amount of the maintenance fee is set out in our schedule of&nbsp;<a href="http://fashcore.com/?fees">Fees and Charges</a>.</p>
  <p style="font-size: 20px; line-height: 20px">We reserve the right to close an Inactive Account.</p>
  <p style="font-size: 20px; line-height: 20px">We reserve the right to close an account with nil or negative funds.</p>
  <p style="font-size: 20px; line-height: 20px">21. Right to Refuse Service</p>
  <p style="font-size: 20px; line-height: 20px">We may close, suspend or limit your access to your Account without reason. Without limiting the foregoing, we may close, suspend or limit your access to your Account:</p>
  <ol>
      <li>
          <p style="font-size: 20px; line-height: 20px">if we determine that you have breached, or are acting in breach of, this User Agreement;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">if we determine that you have infringed legal rights (resulting in actual or potential claims), including infringing Intellectual Property Rights;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">if we determine that you have engaged, or are engaging, in fraudulent, or illegal activities;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">if you do not respond to account verification requests;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">if you do not complete account verification when requested within 3 months of the date of request;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">if you are the subject of a United Nations, Australian, EU, USA or other applicable sanctions regime, or our banking and payment relationships otherwise preclude us from conducting business with you;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">to manage any risk of loss to us, a User, or any other person; or</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">for other reasons.</p>
      </li>
  </ol>
  <p style="font-size: 20px; line-height: 20px">If we close your Account due to your breach of this User Agreement, you may also become liable for certain fees as described in this User Agreement.</p>
  <p style="font-size: 20px; line-height: 20px">Without limiting our other remedies, to the extent you have breached this User Agreement, you must pay us all fees owed to us and reimburse us for all losses and costs (including any and all of our employee time) and reasonable expenses (including legal fees) related to investigating such breach and collecting such fees.</p>
  <p style="font-size: 20px; line-height: 20px">You acknowledge and agree that: (1) the damages that we will sustain as a result of your breach of this User Agreement will be substantial and will potentially include (without limitation) fines and other related expenses imposed on us by our payment processors and Users and that those damages may be extremely difficult and impracticable to ascertain; (2) if you breach this User Agreement, we may take legal action against you to recover losses.</p>
  <p style="font-size: 20px; line-height: 20px">If we close your Account for a reason other than as a result of your breach of this User Agreement, unless as otherwise specified in this User Agreement, you will be entitled to receive any payment due from us to you.</p>
  <p style="font-size: 20px; line-height: 20px">In the event that we close your Account, you will have no claim whatsoever against us in respect of any such suspension or termination of your Account.</p>
  <p style="font-size: 20px; line-height: 20px">22. Milestone Payments</p>
  <p style="font-size: 20px; line-height: 20px">We do not operate an escrow service in relation to the Platform. We may however, provide a service on this Platform which allows controlled payments to be made with respect to advertisements or a service.</p>
  <p style="font-size: 20px; line-height: 20px">23. Disputes With Users</p>
  <p style="font-size: 20px; line-height: 20px">You agree that any dispute arising between you and another User will be handled in accordance with this clause. Pennytots will have full rights and powers to make a determination for all such disputes. You also acknowledge that Pennytots is not a judicial or alternative dispute resolution institution and that we will make the determinations only as an ordinary reasonable person. In addition, we do not warrant that documents provided by the parties to the dispute will be true, complete or correct and you agree to indemnify and (to the maximum extent permitted by law) hold Pennytots and any of our affiliates harmless against any damages or liability you may suffer as a result of any documentation or material subsequently being found to be false or misleading.</p>
  <p style="font-size: 20px; line-height: 20px">In relation to disputes with any other users of the Platform, you hereby agree to indemnify Pennytots from any and all claims, demands, and damages, actual and consequential, of every kind and nature, known and unknown, that is related to such a dispute.</p>
  <p style="font-size: 20px; line-height: 20px">A User found to be in breach of the Code of Conduct during the Dispute Resolution Service process may automatically lose the dispute in favour of the other party involved, regardless of the origin of the dispute. The User who breached the Code of Conduct may also incur further disciplinary action. For more information, read the Code of Conduct.</p>
  <p style="font-size: 20px; line-height: 20px">24. Disputes With Us</p>
  <p style="font-size: 20px; line-height: 20px">If a dispute arises between you and Pennytots, our goal is to address your concerns immediately and, if we are unable to do so to your satisfaction, to provide you with a means of resolving the dispute quickly. We strongly encourage you to first contact us directly to seek a resolution by emailing us at&nbsp;<a href="mailto:support@fashcore.com">support@Pennytots.com</a>.</p>
  <p style="font-size: 20px; line-height: 20px">For any claim, Pennytots may elect to resolve the dispute in a cost effective manner through binding non-appearance-based arbitration. If Pennytots elects arbitration, such arbitration will be initiated through an established alternative dispute resolution (ADR) provider, which is to be selected by you from a panel of ADR providers that Pennytots will provide to you. The ADR provider and the parties must comply with the following rules: a) the arbitration shall be conducted by telephone, online and/or be solely based on written submissions, the specific manner shall be chosen by the party initiating the arbitration; b) the arbitration shall not involve any personal appearance by the parties or witnesses unless otherwise mutually agreed by the parties; and c) any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.</p>
  <p style="font-size: 20px; line-height: 20px">All claims you bring against Pennytots must be resolved in accordance with the terms of this Agreement. All claims filed or brought contrary to this Agreement shall be considered improperly filed and a breach of this Agreement. Should you file a claim contrary to the terms of this Agreement, Pennytots may recover its legal fees and costs (including in-house lawyers and paralegals), provided that Pennytots has notified you in writing of the improperly filed claim, and you have failed to promptly withdraw the claim.</p>
  <p style="font-size: 20px; line-height: 20px">You agree that you will not pursue any claims arising under this User Agreement on a class or other representative basis and will not seek to coordinate or consolidate any arbitration or action hereunder with any other proceeding.</p>
  <p style="font-size: 20px; line-height: 20px">If any proceeding by or against you is commenced under any provision of any bankruptcy or insolvency law, Pennytots will be entitled to recover all reasonable costs or expenses (including reasonable legal fees and expenses) incurred in connection with the enforcement of this Agreement.</p>
  <p style="font-size: 20px; line-height: 20px">Pennytots&apos;s failure to act with respect to a breach by you or others does not waive our right to act with respect to subsequent or similar breaches.</p>
  <p style="font-size: 20px; line-height: 20px">25. Currencies</p>
  <p style="font-size: 20px; line-height: 20px">Some of the Platforms will display rates in the local currency of that Platform, in addition to the actual amount. These rates are based on a conversion from the originating currency using indicative market exchange rates. You understand and agree that these rates are only indicative and the amount specified in the origin currency is the actual amount.</p>
  <p style="font-size: 20px; line-height: 20px">As a convenience service, you may withdraw funds from the Platform in another currency. If you wish to do so, you will be quoted an exchange rate which will be available for the time specified, which you may choose to accept. We may charge a fee for effecting the currency conversion transactions. This fee will be embedded within the rate provided to you and the currency exchange will be settled immediately.</p>
  <p style="font-size: 20px; line-height: 20px">We reserve the right to reject any request for a conversion of currency at any time.</p>
  <p style="font-size: 20px; line-height: 20px">You are responsible for all risks associated with converting and maintaining funds in various available currencies, including but not limited to the risk that the value of these funds will fluctuate as exchange rates change, which could result in decreases in the value of your funds in aggregate. You must not use (or attempt to use) the Platform to engage in speculative trading, which could result in substantial losses. We are not a financial services provider.</p>
  <p style="font-size: 20px; line-height: 20px">All information included on the Platform in respect of currency conversion is general information only. Use of currency conversion is at your own risk. Currency conversions are final and irreversible.</p>
  <p style="font-size: 20px; line-height: 20px">26. Survival and Release</p>
  <p style="font-size: 20px; line-height: 20px">This agreement supersedes any other agreement between you and the Company. If any part of this document is found to be unenforceable, that part will be limited to the minimum extent necessary so that this document will otherwise remain in full force and effect. Our failure to enforce any part of this document is not a waiver of any of our rights to later enforce that or any other part of this documents. We may assign any of our rights and obligations under this document from time to time.</p>
  <p style="font-size: 20px; line-height: 20px">If there is a dispute between users and any third party, you agree that the Company is under no obligation to become involved. In the event that you have a dispute with one or more other users, you release the Company, its officers, employees, agents, and successors from claims, demands, and damages of every kind or nature, known or unknown, suspected or unsuspected, disclosed or undisclosed, arising out of or in any way related to such disputes and/or our Services. If you are a California resident, you shall and hereby do waive California Civil Code Section 1542, which says: &quot;A general release does not extend to claims which the creditor does not know or suspect to exist in his or her favor at the time of executing the release, which, if known by him or her must have materially affected his or her settlement with the debtor.&quot;</p>
  <p style="font-size: 20px; line-height: 20px">27. Access and Interference</p>
  <p style="font-size: 20px; line-height: 20px">You agree that you will not use any robot, spider, scraper or other automated means to access the Platform via any means, including for the avoidance of doubt access to our API or application programming interface, for any purpose without our express written permission.</p>
  <p style="font-size: 20px; line-height: 20px">Additionally, you agree that you will not:</p>
  <ol>
      <li>
          <p style="font-size: 20px; line-height: 20px">take any action that imposes or may impose (in our sole discretion, exercised reasonably) an unreasonable or disproportionately large load on our infrastructure;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">interfere with, damage, manipulate, disrupt, disable, modify, overburden, or impair any device, software system or network connected to or used (by you or us) in relation to the Platform or your Account, or assist any other person to do any of these things, or take any action that imposes, or may impose, in our discretion, an unreasonable or disproportionately large load on our infrastructure;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">copy, reproduce, modify, create derivative works from, distribute, or publicly display any content (except for your information) from the websites without the prior express written permission of Pennytots and the appropriate third party, as applicable;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">interfere or attempt to interfere with the proper working of the Platforms, services or tools, or any activities conducted on or with the Platforms, services or tools; or</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">bypass our robot exclusion headers or other measures we may use to prevent or restrict access to the Platform.</p>
      </li>
  </ol>
  <p style="font-size: 20px; line-height: 20px">28. Closing Your Account</p>
  <p style="font-size: 20px; line-height: 20px">Account closure is subject to:</p>
  <ol>
      <li>
          <p style="font-size: 20px; line-height: 20px">not having any outstanding usage credit on the Platform;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">resolving any outstanding matters (such as a suspension or restriction on your Account); and</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">not paying any outstanding fees or amounts owing on the Account.</p>
      </li>
  </ol>
  <p style="font-size: 20px; line-height: 20px">We may retain some of your personal information to satisfy regulatory requirements and our own external obligations.&nbsp;</p>
  <p style="font-size: 20px; line-height: 20px">29. Privacy</p>
  <p style="font-size: 20px; line-height: 20px">We use your information as described in the Pennytots&nbsp;<a href="http://fashcore.com/?privacy">Privacy Policy</a>. If you object to your information being transferred or used in this way then you must not use our services. For the avoidance of doubt, your name and personal details shall be used for identity purposes in the normal course of conducting business on Pennytots.com.</p>
  <p style="font-size: 20px; line-height: 20px">30. Indemnity</p>
  <p style="font-size: 20px; line-height: 20px">You will indemnify us (and our officers, directors, agents, subsidiaries, joint venturers and employees) against any claim or demand, including legal fees and costs, made against us by any third party due to or arising out of your breach of this Agreement, or your infringement of any law or the rights of a third party in the course of using the Platform and Pennytots Services.</p>
  <p style="font-size: 20px; line-height: 20px">In addition, we can apply any funds in your Account against any liabilities you owe to us or loss suffered by us as a result of your non-performance or breach of this User Agreement.</p>
  <p style="font-size: 20px; line-height: 20px">31. Security</p>
  <p style="font-size: 20px; line-height: 20px">You must immediately notify us upon becoming aware of any unauthorised access or any other security breach to the Platform, your Account or Pennytots Services and do everything possible to mitigate the unauthorised access or security breach (including preserving evidence and notifying appropriate authorities). Your User Account is yours only, and you must not share your password with others. You are solely responsible for securing your password. We will not be liable for any loss or damage arising from unauthorised access of your account resulting from your failure to secure your password.</p>
  <p style="font-size: 20px; line-height: 20px">32. No Warranty as to Each User&apos;s Purported Identity</p>
  <p style="font-size: 20px; line-height: 20px">We cannot and do not confirm each User&apos;s purported identity on the Platform. We may provide information about a User, such as a strength or risk score, geographical location, or third party background check or verification of identity or credentials. However, such information is based solely on data that a User submits and we provide such information solely for the convenience of Users and the provision of such information is not an introduction, endorsement or recommendation by us.</p>
  <p style="font-size: 20px; line-height: 20px">33. No Warranty as to Content</p>
  <p style="font-size: 20px; line-height: 20px">The Platform is a dynamic time-sensitive Platform. As such, information on the Platform will change frequently. It is possible that some information could be considered offensive, harmful, inaccurate or misleading or mislabelled or deceptively labelled accidentally by us or accidentally or purposefully by a third party.</p>
  <p style="font-size: 20px; line-height: 20px">Our Services, the Platform and all content on it are provided on an &apos;as is&apos;, &apos;with all faults&apos; and &apos;as available&apos; basis and without warranties of any kind either express or implied. Without limiting the foregoing, we make no representation or warranty about:</p>
  <ol>
      <li>
          <p style="font-size: 20px; line-height: 20px">the Platform or any advertisements or Pennytots Services;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">the accuracy, reliability, availability, veracity, timeliness or content of the Platform or any advertisements or Pennytots Services;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">whether the Platform or advertisements or Pennytots Services will be up-to-date, uninterrupted, secure, error-free or non-misleading;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">whether defects in the Platform will be corrected;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">whether the Platform, advertisements or Pennytots Services or any data, content or material will be backed up or whether business continuity arrangements are in place in respect of the Platform, advertisements or Pennytots Services;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">any third-party agreements or any guarantee of business gained by you through the Platform, advertisements or Pennytots Services or us; or</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">the Platform, advertisements or Pennytots Services or infrastructure on which they are based, being error or malicious code free, secure, confidential or performing at any particular standard or having any particular function.</p>
      </li>
  </ol>
  <p style="font-size: 20px; line-height: 20px">To every extent permitted by law, we specifically disclaim any implied warranties of title, merchantability, fitness for a particular purpose, quality, suitability and non-infringement.</p>
  <p style="font-size: 20px; line-height: 20px">34. Limitation of Liability</p>
  <p style="font-size: 20px; line-height: 20px">In no event shall we, our related entities, our affiliates or staff be liable, whether in contract, warranty, tort (including negligence), or any other form of liability, for:</p>
  <ol>
      <li>
          <p style="font-size: 20px; line-height: 20px">any indirect, special, incidental or consequential damages that may be incurred by you;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">any loss of income, business or profits (whether direct or indirect) that may be incurred by you;</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">any claim, damage, or loss which may be incurred by you as a result of any of your transactions involving the Platform.</p>
      </li>
  </ol>
  <p style="font-size: 20px; line-height: 20px">The limitations on our liability to you above shall apply whether or not we, our related entities, our affiliates or staff have been advised of the possibility of such losses or damages arising.</p>
  <p style="font-size: 20px; line-height: 20px">Notwithstanding the above provisions, nothing in this User Agreement is intended to limit or exclude any liability on the part of us and our affiliates and related entities where and to the extent that applicable law prohibits such exclusion or limitation and relevant state fair trading legislation.</p>
  <p style="font-size: 20px; line-height: 20px">To the extent that we are able to limit the remedies available under this User Agreement, we expressly limit our liability for breach of a non-excludable condition or warranty implied by virtue of any legislation to the following remedies (the choice of which is to be at our sole discretion) to the supply of the Pennytots services again or the payment of the cost of having the Pennytots services supplied again.</p>
  <p style="font-size: 20px; line-height: 20px">35. Legal Limitations</p>
  <p style="font-size: 20px; line-height: 20px">As some jurisdictions do not allow some of the exclusions or limitations as established above, some of these exclusions or limitations may not apply to you. In that event, the liability will be limited as far as legally possible under the applicable legislation. We may plead this User Agreement in bar to any claim, action, proceeding or suit brought by you, against us for any matter arising out of any transaction or otherwise in respect of this User Agreement.</p>
  <p style="font-size: 20px; line-height: 20px">You and we agree that you and we will only be permitted to bring claims against the other only on an individual basis and not as a plaintiff or class member in any purported class or representative action or proceeding. Unless both you and we agree otherwise, the arbitrator may not consolidate or join more than one person&apos;s or party&apos;s claims and may not otherwise preside over any form of a consolidated, representative, or class proceeding. In addition, the arbitrator may award relief (including monetary, injunctive, and declaratory relief) only in favour of the individual party seeking relief and only to the extent necessary to provide relief necessitated by that party&apos;s individual claim(s). Any relief awarded cannot affect other Users.</p>
  <p style="font-size: 20px; line-height: 20px">36. Notices</p>
  <p style="font-size: 20px; line-height: 20px">Legal notices will be served or to the email address you provide to Pennytots during the registration process. Notice will be deemed given 24 hours after email is sent, unless the sending party is notified that the email address is invalid or that the email has not been delivered. Alternatively, we may give you legal notice by mail to the address provided by you during the registration process. In such case, notice will be deemed given three days after the date of mailing.</p>
  <p style="font-size: 20px; line-height: 20px">Any notices to Pennytots must be given by registered ordinary post (or if posted to or from a place outside Nigeria, by registered airmail).</p>
  <p style="font-size: 20px; line-height: 20px">37. Law and Forum for Legal Disputes</p>
  <p style="font-size: 20px; line-height: 20px">This Agreement will be governed in all respects by the laws of the Federal Republic of Nigeria. We encourage you to try and resolve disputes using certified mediation (such as online dispute resolution processes). If a dispute cannot be resolved then you and Pennytots irrevocably submit to the non-exclusive jurisdiction of the courts of the Federal Republic of Nigeria.</p>
  <p style="font-size: 20px; line-height: 20px">38. Severability</p>
  <p style="font-size: 20px; line-height: 20px">The provisions of this User Agreement are severable, and if any provision of this User Agreement is held to be invalid or unenforceable, such provision may be removed and the remaining provisions will be enforced. This Agreement may be assigned by us to an associated entity at any time, or to a third party without your consent in the event of a sale or other transfer of some or all of our assets. In the event of any sale or transfer you will remain bound by this User Agreement.</p>
  <p style="font-size: 20px; line-height: 20px">39. Interpretation</p>
  <p style="font-size: 20px; line-height: 20px">Headings are for reference purposes only and in no way define, limit, construe or describe the scope or extent of such section.</p>
  <p style="font-size: 20px; line-height: 20px">40. No Waiver</p>
  <p style="font-size: 20px; line-height: 20px">Our failure to act with respect to an anticipated or actual breach by you or others does not waive our right to act with respect to subsequent or similar breaches. Nothing in this section shall exclude or restrict your liability arising out of fraud or fraudulent misrepresentation.</p>
  <p style="font-size: 20px; line-height: 20px">41. Communications</p>
  <p style="font-size: 20px; line-height: 20px">You consent to receive notices and information from us in respect of the Platform and Services by electronic communication. You may withdraw this consent at any time, but if you do so we may choose to suspend or close your Account.</p>
  <p style="font-size: 20px; line-height: 20px">42. Additional Terms</p>
  <p style="font-size: 20px; line-height: 20px">It is important to read and understand all our policies as they provide the rules for trading on the Pennytots Platform. In addition there may be specific policies or rules that apply, and it is your responsibility to check our pages and policies to make sure you comply. Our policies, including all policies referenced in them, are part of this Agreement and provide additional terms and conditions related to specific services offered on our Platforms, including but not limited to:</p>
  <ul>
      <li>
          <p style="font-size: 20px; line-height: 20px"><a href="http://fashcore.com/?privacy">Privacy Policy</a></p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px"><a href="http://fashcore.com/?code">Code of Conduct</a></p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px"><a href="http://fashcore.com/?kyc">Know Your Customer and ID Verification Policy</a></p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px"><a href="http://fashcore.com/?copy">Copyright Infringement Policy</a></p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px"><a href="http://fashcore.com/?api">API Terms and Conditions</a></p>
      </li>
  </ul>
  <p style="font-size: 20px; line-height: 20px">Each of these policies may be changed from time to time. Changes take effect when we post them on the Pennytots Platform. When using particular services on our Platform, you are subject to any posted policies or rules applicable to services you use through the Platform, which may be posted from time to time. All such policies or rules are incorporated into this User Agreement.</p>
  <p style="font-size: 20px; line-height: 20px">43. General</p>
  <p style="font-size: 20px; line-height: 20px">This Agreement contains the entire understanding and agreement between you and Pennytots. The following Sections survive any termination of this Agreement: Fees And Services (with respect to fees owed for our services), Release, Content, No Warranty As To Content, Limitation Of Liability, Indemnity, Bar To Action, No Class Actions, Legal Limitations, and Disputes With Us.</p>
  <p style="font-size: 20px; line-height: 20px">44. Abusing Pennytots</p>
  <p style="font-size: 20px; line-height: 20px">Pennytots reserves to the greatest extent possible all rights, without limiting any other remedies, to limit, suspend or terminate our service(s) and or user account(s), suspend or ban access to our services, remove any content, and to take any and all technical or legal steps to ban users.</p>
  <p style="font-size: 20px; line-height: 20px">Without limiting the reasons for taking the aforementioned actions, conduct giving rise to this response could include:</p>
  <ol>
      <li>
          <p style="font-size: 20px; line-height: 20px">use of our services for any illegitimate or non bona fide purpose</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">creating problems with other users or potential legal liabilities</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">infringing the intellectual property rights of third parties</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">acting inconsistently with the letter or spirit of any of our policies</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">abuse of any staff members including inappropriate or unreasonable communications</p>
      </li>
      <li>
          <p style="font-size: 20px; line-height: 20px">any attempt to use Pennytots&rsquo;s platform or services for any objectionable purpose</p>
      </li>
  </ol>
  <p style="font-size: 20px; line-height: 20px">45. Feedback</p>
  <p style="font-size: 20px; line-height: 20px">If you have any questions about this User Agreement or if you wish to report breaches of this User Agreement, please contact us by emailing us at&nbsp;<a href="mailto:support@fashcore.com">support@Pennytots.com</a>.</p>
  <p style="font-size: 20px; line-height: 20px"><br></p>
  <p style="font-size: 20px; line-height: 20px"><br></p></body>
</html>
  `;

  return (
    <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: 'white',
        }}
    >
      <ScrollView
        style={{ backgroundColor: '#ffffff' }}
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <StatusBar barStyle='dark-content' backgroundColor='white' />
        <HeaderTitle title='' navigation={navigation} />
        <View style={styles.container}>
          <WebView
            source={{ html: termsHTML }}
            style={{
              flex: 1,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    lineHeight: 30,
    marginBottom: 7,
  },
});

export default UserTerms;
