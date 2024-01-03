*chrome extension boilerplate code from: https://github.com/lxieyang/chrome-extension-boilerplate-react

*find application functionality code in src folder

We were inspired to create PaperPeer after many late nights struggling to comprehend research papers and academic articles outside our fields of expertise. As students and professionals, we often need to quickly grasp papers filled with complex technical terms and domain-specific vocabulary. We wanted to build a tool to make absorbing this knowledge easier for interdisciplinary learning and collaboration.

PaperPeer is a Chrome extension that analyzes research papers and uses NLP techniques to automatically highlight key terms and concepts. Users can hover over these highlights to see simplified plain language definitions and explanations, making dense papers more accessible. The extension inserts overlays and tooltips to define terms without interrupting the reading flow.

PaperPal was built using JavaScript and the Chrome extension developer tools. We leveraged Google's Vertex AI to create a text classification model for identifying key terms, trained on corpora of vocabulary in different domains. We deployed this as an API endpoint that the extension calls to analyze papers. The extension then inserts HTML/CSS overlays and tooltip definitions. Additionally, we have a home page where users can create and store credentials.
