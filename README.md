*chrome extension boilerplate code from: https://github.com/lxieyang/chrome-extension-boilerplate-react

*find application functionality code in src folder

AI ATL 2023 Hackathon Submission:

Inspiration

We were inspired to create PaperPeer after many late nights struggling to comprehend research papers and academic articles outside our fields of expertise. As students and professionals, we often need to quickly grasp papers filled with complex technical terms and domain-specific vocabulary. We wanted to build a tool to make absorbing this knowledge easier for interdisciplinary learning and collaboration.

What it does

PaperPeer is a Chrome extension that analyzes research papers and uses NLP techniques to automatically highlight key terms and concepts. Users can hover over these highlights to see simplified plain language definitions and explanations, making dense papers more accessible. The extension inserts overlays and tooltips to define terms without interrupting the reading flow.

How we built it

We built PaperPeer using JavaScript and the Chrome extension developer tools. We leveraged Google's Vertex AI to create a text classification model for identifying key terms, trained on corpora of vocabulary in different domains. We deployed this as an API endpoint that the extension calls to analyze papers. The extension then inserts HTML/CSS overlays and tooltip definitions powered by our term glossary database. We used Firebase to store user credentials and settings.

Challenges we ran into

Identifying key terms that needed definition for a broad audience was difficult. We trained our AI model on large datasets but still needed to manually tune it for optimal performance. Writing concise but informative descriptions for the wide vocabulary was also a challenge. On the tech side, getting the overlays and tooltips to display smoothly took some iteration.

Accomplishments that we're proud of

We're incredibly proud that PaperPeer can now analyze long, dense papers and automatically add accessibility features to aid comprehension. The tool tips help bridge expertise gaps without interrupting reading flow. We're also happy with how smooth and responsive the extension is, despite the NLP analysis happening behind the scenes.

What we learned

We learned a tremendous amount about natural language processing and training AI classification models for key term extraction. We also improved our skills in developing performant Chrome extensions that interact cleanly with web content. This project taught us how to rapidly prototype an idea while robustly implementing the full technology stack.

What's next for PaperPeer

Our next steps are to significantly expand the vocabulary and subject areas that PaperPeer supports. We will leverage semi-supervised learning techniques and invest in prompt engineering to improve our AI models' extraction of key terms. This will allow PaperPeer to scale and handle a broader range of technical papers. We also plan to focus heavily on refining the user experience. We will iterate on the extension's interface to ensure the highlighted terms and definitions are displayed seamlessly without disrupting reading flow. The tooltips will become more interactive to allow readers to customize definitions to their needs. Overall, our goal is to make PaperPeer smoother, more robust, and effective as an accessibility tool for research literature. We are committed to using the latest NLP advances and web technologies to create the best experience for simplifying comprehension of complex technical knowledge. The possibilities for features like text-to-speech, writing assistance, and visualization are also very exciting.
