"use strict";
(() => {
  // src/guideline.json
  var guideline_default = {
    title: "Setel Content Style Guide",
    rewritePrompt: {
      overview: "You are Setel's UX writing assistant. Draft or edit product copy that feels warm, friendly, and caring while remaining informed, trustworthy, and easy to understand.",
      requirements: [
        "Use optimistic, encouraging framing and focus on what the user can do next.",
        "Keep copy concise and mobile-friendly; favor sentence case, natural rhythm, and contractions.",
        "Explain requirements, wait times, or issues with reassurance plus a clear action or benefit.",
        "Highlight Setel-specific value (Mesra Rewards, One-tap fuelling, seamless payments) without exaggeration.",
        "Prefer approved terminology and inclusive, everyday language over jargon or negative phrasing."
      ]
    },
    structuredGuide: {
      voicePillars: [
        {
          name: "Warm",
          definition: "Displays affection and enthusiasm, making every interaction feel human.",
          traits: [
            "welcoming",
            "approachable",
            "fun",
            "playful",
            "passionate",
            "colourful"
          ]
        },
        {
          name: "Friendly",
          definition: "Behaves in a pleasant, kind manner that invites conversation.",
          traits: [
            "nice",
            "sweet",
            "accepting",
            "open",
            "easy-going",
            "delightful"
          ]
        },
        {
          name: "Caring",
          definition: "Shows empathy and helpfulness so users feel supported.",
          traits: [
            "helpful",
            "understanding",
            "communicative",
            "big-hearted",
            "loving",
            "well-meaning"
          ]
        }
      ],
      writingPrinciples: [
        {
          name: "Be mindful with difficult news",
          guidance: [
            "State the situation without blame or alarm.",
            "Offer reassurance or a clear path forward."
          ],
          examples: {
            encouraged: "Your account is restricted from making any payments.",
            forbidden: "You can\u2019t make any payments because your account is blocked."
          }
        },
        {
          name: "Use positive framing",
          guidance: [
            "Describe opportunities instead of limitations.",
            "Swap negative verbs (can\u2019t, only) for inclusive alternatives."
          ],
          examples: {
            encouraged: "This credit card is open to individuals earning RM2,000 per month.",
            forbidden: "Only those earning RM2,000 per month can apply for this credit card."
          }
        },
        {
          name: "Invite playfulness when context allows",
          guidance: [
            "Add small moments of delight without distracting from the task.",
            "Stay respectful\u2014humor should never embarrass the user."
          ],
          examples: {
            encouraged: "Aw yeah, free parking on weekends!",
            forbidden: "There is no need to pay for parking on weekends."
          }
        },
        {
          name: "Stay polite and grounded",
          guidance: [
            "Sound confident without bragging.",
            "Let proof points and benefits speak louder than superlatives."
          ],
          examples: {
            encouraged: "Cutting the queue at petrol stations since 2018.",
            forbidden: "The first, best, and OG fuelling app."
          }
        },
        {
          name: "Provide solutions and reassurance",
          guidance: [
            "Pair any issue with a helpful next step.",
            "Remind the user they can solve it quickly."
          ],
          examples: {
            encouraged: "Insufficient balance. Take a few minutes to top up and you\u2019re good to go!",
            forbidden: "Not enough balance to pay. You must top up immediately."
          }
        },
        {
          name: "Relate to real-life moments",
          guidance: [
            "Anchor benefits to daily routines or emotions.",
            "Show empathy for the user's scenario."
          ],
          examples: {
            encouraged: "Beat the morning rush with One-tap fuelling.",
            forbidden: "Save money with One-tap fuelling."
          }
        }
      ],
      tonePlaybooks: [
        {
          tone: "Friendly and conversational",
          bestFor: [
            "Social media posts",
            "Customer service chats",
            "Welcome emails",
            "Onboarding",
            "Blog posts"
          ],
          impact: "Creates comfort and relatability."
        },
        {
          tone: "Professional and authoritative",
          bestFor: [
            "Corporate communications",
            "Business reports or white papers",
            "B2B marketing materials",
            "Legal documents",
            "Policy or security updates"
          ],
          impact: "Builds respect that Setel knows what it\u2019s doing."
        },
        {
          tone: "Persuasive and compelling",
          bestFor: [
            "Promotional campaigns",
            "Product landing pages",
            "Pitches or presentations"
          ],
          impact: "Heightens motivation to act."
        },
        {
          tone: "Empathetic and reassuring",
          bestFor: [
            "Apology letters",
            "Support follow-ups",
            "Crisis communication",
            "Retention efforts"
          ],
          impact: "Acknowledges feelings and restores trust."
        },
        {
          tone: "Playful and humorous",
          bestFor: [
            "Social media campaigns",
            "Promotions",
            "Gamified flows"
          ],
          impact: "Boosts engagement through light entertainment."
        },
        {
          tone: "Inspirational and motivational",
          bestFor: [
            "Success stories",
            "Testimonials",
            "Retention or loyalty campaigns"
          ],
          impact: "Uplifts and reinforces product belief."
        },
        {
          tone: "Informative and neutral",
          bestFor: [
            "How-to guides",
            "FAQs and Help Centre content",
            "Blog explainers",
            "News or release notes"
          ],
          impact: "Builds trust through clarity and transparency."
        },
        {
          tone: "Urgent and action-oriented",
          bestFor: [
            "Limited-time offers",
            "Error or warning states",
            "Deadline reminders",
            "Critical CTAs"
          ],
          impact: "Prompts quick decisions."
        },
        {
          tone: "Luxurious and exclusive",
          bestFor: [
            "Limited editions",
            "Loyalty or VIP communications"
          ],
          impact: "Signals premium, aspirational experiences."
        },
        {
          tone: "Analytical and technical",
          bestFor: [
            "Stakeholder reports",
            "Case studies",
            "Build notes"
          ],
          impact: "Supports rational, data-backed decisions."
        }
      ],
      dictionGuidelines: {
        tips: [
          "Choose simple, inclusive vocabulary that mirrors how Malaysians actually speak.",
          "Introduce Setel-branded terms early (One-tap fuelling, Mesra Rewards) and reuse them consistently.",
          "Avoid sounding transactional or punitive\u2014describe benefits, not punishments.",
          "Use verbs that invite action: top up, redeem, explore, skip the queue."
        ],
        preferredTerms: [
          {
            term: "One app, all vehicle needs.",
            usage: "Reinforces Setel as the go-to companion for every vehicle task.",
            alternative: "-"
          },
          {
            term: "Fuelling",
            usage: "Default verb for adding fuel through Setel; keeps language product-specific.",
            alternative: "-"
          },
          {
            term: "Seamless",
            usage: "Describes smooth, interruption-free experiences when paying or checking out.",
            alternative: "Smooth, Hassle-free"
          },
          {
            term: "Skip the queue",
            usage: "Highlights convenience when actions happen from the vehicle or app.",
            alternative: "-"
          },
          {
            term: "Earn Mesra Rewards points",
            usage: "Focus on rewards for fuelling or purchases; specify the multiplier when possible.",
            alternative: "Collect Mesra Rewards points"
          },
          {
            term: "Pay for (noun)",
            usage: "Clarifies that Setel handles payments for fuel, Kedai Mesra, parking, etc.",
            alternative: "-"
          },
          {
            term: "Convenient",
            usage: "Use to describe experiences that need minimal effort.",
            alternative: "Easy"
          },
          {
            term: "Locate",
            usage: "Preferred over \u201Cfind\u201D when guiding users to stations, EV chargers, or partners.",
            alternative: "Find"
          },
          {
            term: "Scan and pay",
            usage: "Talk about QR-based payments inside partner stores.",
            alternative: "-"
          },
          {
            term: "(Feature name) session",
            usage: "Name discrete activities like parking session or charging session.",
            alternative: "-"
          },
          {
            term: "One-tap (verb)",
            usage: "Signals that an action completes with a single tap (e.g., One-tap fuelling).",
            alternative: "-"
          }
        ]
      }
    },
    children: [
      {
        title: "Content",
        children: [
          {
            title: "Objective"
          },
          {
            title: "The Voice of Setel",
            brand_voice: {
              description: "The brand voice is consistent throughout communications and distinguishes Setel from other brands. It helps build better relationships with users.",
              characteristics: {
                Warm: {
                  definition: "Displays a lot of affection and enthusiasm in their behaviour.",
                  traits: [
                    "welcoming",
                    "approachable",
                    "fun",
                    "playful",
                    "passionate",
                    "colourful"
                  ]
                },
                Friendly: {
                  definition: "Behaves in a pleasant and kind manner.",
                  traits: [
                    "nice",
                    "sweet",
                    "accepting",
                    "open",
                    "easy-going",
                    "delightful"
                  ]
                },
                Caring: {
                  definition: "Shows concern and empathy to others.",
                  traits: [
                    "helpful",
                    "understanding",
                    "communicative",
                    "big-hearted",
                    "loving",
                    "well-meaning"
                  ]
                }
              }
            },
            writing_principles: [
              {
                principle: "Be mindful, especially when addressing unpleasant situations.",
                examples: {
                  Normal: "Payment failed due to a blocked account.",
                  Encouraged: "Your account is restricted from making any payments.",
                  Forbidden: "You can\u2019t make any payments because your account is blocked."
                }
              },
              {
                principle: "Use words with positive connotations.",
                examples: {
                  Normal: "This credit card is limited to individuals earning RM2,000 per month.",
                  Encouraged: "This credit card is open to individuals earning RM2,000 per month.",
                  Forbidden: "Only those earning RM2,000 per month can apply for this credit card."
                }
              },
              {
                principle: "When the situation permits, be playful.",
                examples: {
                  Normal: "Parking fee does not apply on weekends.",
                  Encouraged: "Aw yeah, free parking on weekends!",
                  Forbidden: "There is no need to pay for parking on weekends."
                }
              },
              {
                principle: "Remain polite, grounded, and subtle.",
                examples: {
                  Normal: "The first fuelling app in Malaysia.",
                  Encouraged: "Cutting the queue at petrol stations since 2018.",
                  Forbidden: "The first, best, and OG fuelling app."
                }
              },
              {
                principle: "Provide solutions and reassurance.",
                examples: {
                  Normal: "Insufficient balance. Top up now.",
                  Encouraged: "Insufficient balance. Take a few minutes to top up and you\u2019re good to go!",
                  Forbidden: "Not enough balance to pay. You must top up immediately."
                }
              },
              {
                principle: "Connect and relate as much as possible.",
                examples: {
                  Normal: "Fuel faster with One-tap fuelling.",
                  Encouraged: "Beat the morning rush with One-tap fuelling.",
                  Forbidden: "Save money with One-tap fuelling."
                }
              }
            ]
          },
          {
            title: "Sensitivity"
          },
          {
            title: "Materials",
            description: "A breakdown of writing materials that are produced in Setel by different departments.",
            materials: {
              UX_writing_Product: [
                {
                  material: "In-app and portal",
                  definition: "Texts in digital products.",
                  purpose: [
                    "Ease user navigation.",
                    "Create intuitive actions."
                  ]
                },
                {
                  material: "Web (feature pages) copy",
                  definition: "Texts in web pages.",
                  purpose: [
                    "Provide comprehensive information on the product."
                  ]
                },
                {
                  material: "Meta title and description",
                  definition: "HTML tag that provides insights on the web pages.",
                  purpose: [
                    "Increase search engine optimisation (SEO) results."
                  ]
                },
                {
                  material: "Email (transactional)",
                  definition: "Digital mails sent to internal or external domains.",
                  purpose: [
                    "Acknowledge or confirm the status of important actions.",
                    "Payment successful/in-progress/failed",
                    "Order submitted/received/cancelled",
                    "Etc."
                  ]
                },
                {
                  material: "Push notification and app inbox (transactional)",
                  definition: "In-app messages sent to specific user segments.",
                  purpose: [
                    "Acknowledge or confirm the status of important actions.",
                    "Payment successful/in-progress/failed",
                    "Order submitted/received/cancelled",
                    "Etc."
                  ]
                }
              ],
              Technical_writing_Product: [
                {
                  material: "Frequently Asked Questions/Help Centre articles (Product)",
                  definition: "A list of typical questions that users might ask regarding a particular topic, product, or service.",
                  purpose: [
                    "Guide users on how to troubleshoot their own issues.",
                    "Reduce repetitive tickets for Customer Operations.",
                    "Provide comprehensive, complex, yet necessary information."
                  ]
                },
                {
                  material: "Chat bot",
                  definition: "Artificial intelligence (AI) to respond to user queries or perform tasks.",
                  purpose: [
                    "Assist users with common, repetitive inquiries.",
                    "Provide simple assistance to users."
                  ]
                }
              ],
              Copywriting_Marketing: [
                {
                  material: "Social media posts",
                  definition: "Information that is created, posted, distributed, or transmitted through the company\u2019s official social media sites.",
                  purpose: [
                    "Spread product awareness.",
                    "Increase brand recognition.",
                    "Acquire new users.",
                    "Retain existing users."
                  ]
                },
                {
                  material: "Web (promo pages) copy",
                  definition: "Texts in web pages.",
                  purpose: [
                    "Provide comprehensive insights on the offers and promotions."
                  ]
                },
                {
                  material: "Meta title and description",
                  definition: "HTML tag that provides insights on the web pages.",
                  purpose: [
                    "Increase search engine optimisation (SEO) results."
                  ]
                },
                {
                  material: "Branding (Taglines, Unique Selling Points/USP)",
                  definition: "A way to differentiate the product from others to shape perception, messaging, and build a connection with customers.",
                  purpose: [
                    "Spread product awareness.",
                    "Increase brand recognition.",
                    "Acquire new users.",
                    "Retain existing users."
                  ]
                },
                {
                  material: "Push notifications and app inbox (promo and nurturing)",
                  definition: "In-app messages sent to specific user segments.",
                  purpose: [
                    "Spread or increase awareness.",
                    "Foster customer relation.",
                    "Increase conversion rates.",
                    "Retain existing customers."
                  ]
                },
                {
                  material: "Press release",
                  definition: "An official statement or announcement issued by the company to the media.",
                  purpose: [
                    "Generate media coverage.",
                    "Create public interest.",
                    "Provide necessary information to journalists.",
                    "Control news narrative."
                  ]
                },
                {
                  material: "Electronic direct mail (EDM)",
                  definition: "Promotional messages, newsletters, or advertisements that are sent directly to a targeted audience via email.",
                  purpose: [
                    "Spread or increase awareness.",
                    "Foster customer relation.",
                    "Increase conversion rates.",
                    "Retain existing customers."
                  ]
                },
                {
                  material: "Frequently Asked Questions (Promotions)",
                  definition: "A compilation of questions that are frequently asked by users, designed to address concerns and provide information related to marketing.",
                  purpose: [
                    "Provide quick and consistent information.",
                    "Clarify product or service details.",
                    "Highlight unique selling points (USP).",
                    "Improve search engine optimisation (SEO)."
                  ]
                },
                {
                  material: "Terms and Conditions (Promotions)",
                  definition: "Detailed legal rules and guidelines for a specific marketing promotion. It outlines the rights and responsibilities of both the service provider and the users.",
                  purpose: [
                    "Ensure legal compliance.",
                    "Provide clear and unambiguous legal information.",
                    "Protect the business from potential lawsuits.",
                    "Protect customers' rights."
                  ]
                }
              ],
              Corporate_communications_Human_resources: [
                {
                  material: "Social media posts",
                  definition: "Information that is created, posted, distributed, or transmitted through the company\u2019s official social media sites.",
                  purpose: [
                    "Spread awareness about the company.",
                    "Increase company recognition.",
                    "Attract new talents."
                  ]
                },
                {
                  material: "Memorandums",
                  definition: "A written form of communication typically used in a professional setting.",
                  purpose: [
                    "Distribute company-related information to all employees."
                  ]
                },
                {
                  material: "Formal letters",
                  definition: "A professional letter written in formal language that follows a stipulated format used for professional communication.",
                  purpose: [
                    "Offer letters: Official offer of employment that describes the specific terms of the position.",
                    "Termination letters: A respectful yet effective way to dismiss an employee from their current job."
                  ]
                }
              ],
              Customer_support_Customer_operations: [
                {
                  material: "Live chat",
                  definition: "Real-time assistance and support to customers through text-based conversations.",
                  purpose: [
                    "Troubleshoot users' problems in real-time."
                  ]
                },
                {
                  material: "Letter of Demand (LOD)",
                  definition: "A formal letter sent from one party to another to resolve a dispute.",
                  purpose: [
                    "Inform customers on outstanding payments and seeking cooperation for settlements in a professional manner."
                  ]
                }
              ]
            }
          },
          {
            title: "Compliance",
            children: [
              {
                title: "User agreement",
                description: "A user agreement is a legally binding contract between a user and the app\u2019s owner, operator, or provider. Sometimes referred to as an end-user license agreement, terms of service, privacy policy, or terms and conditions, a user agreement spells out the rights and responsibilities of all involved parties. At Setel, several user agreements are used to ensure clarity and trust with users. Consistency in writing legal terminology in the app is important.",
                sections: {
                  types_of_user_agreement: [
                    {
                      name: "Setel Terms & Conditions",
                      description: "Outlines the terms governing the use of Setel\u2019s services, including user responsibilities, prohibited actions, and limitations of liability.",
                      link: "https://www.setel.com/terms"
                    },
                    {
                      name: "Setel Privacy Statement",
                      description: "Explains how Setel collects, uses, stores, and protects users' personal information in compliance with data protection laws.",
                      link: "https://www.setel.com/privacy"
                    },
                    {
                      name: "Campaign Terms & Conditions",
                      description: "Specifies the rules, eligibility criteria, campaign mechanics, and rewards for participating in Setel\u2019s campaigns or promotions. Also details the campaign period, exclusions, and any applicable disclaimers."
                    }
                  ],
                  update_policy: "User agreement documents are regularly updated to reflect new features and changes. Communications about these updates must be reviewed by the Compliance team.",
                  capitalisation_and_abbreviation: {
                    rules: [
                      "Legal terminologies should follow the official document name and be written in title case when used as a proper noun.",
                      "When used outside their official capacity, such as in general disclaimers, terms should be in sentence case.",
                      "Avoid using abbreviations like 'T&C' in materials or communications as it may be misinterpreted."
                    ],
                    examples: {
                      do: [
                        "Setel Terms & Conditions",
                        "Setel Privacy Statement",
                        "Terms & conditions apply",
                        "View terms & conditions"
                      ],
                      dont: [
                        "Setel Terms & conditions",
                        "Setel privacy statement",
                        "Terms & Conditions apply",
                        "View Terms & Conditions",
                        "T&Cs apply"
                      ]
                    }
                  }
                }
              },
              {
                title: "User consent",
                description: "User consent refers to the explicit permission given by users for Setel to collect, process, and use their personal data. Malaysian privacy laws mandate that consent is mandatory, requiring transparency about data collection practices. Failing to secure proper consent can lead to severe penalties and damage Setel\u2019s reputation, making transparency a critical aspect of web operations.",
                types_of_user_consent: [
                  {
                    type: "Participation",
                    consent_text: "By continuing, you hereby agree to participate in eBeliaRahmah and you have read and agreed to Setel Terms & Conditions and Setel Group Privacy Statement."
                  },
                  {
                    type: "Data collection & processing",
                    consent_text: "I hereby confirm the accuracy of the information provided above and consent to the processing of the information for e-invoices purposes and other necessary purposes in accordance with Privacy Statement."
                  },
                  {
                    type: "Promotions",
                    consent_text: "Send Setel promos and deals to my email."
                  }
                ]
              },
              {
                title: "Product transparency and disclosure",
                description: "Guidelines and important considerations for writing Setel materials and content to ensure transparency in communications with users and the public.",
                guidelines: [
                  {
                    section: "1. Content should be clear and not misleading",
                    details: "Follow the BNM Guideline on Product Transparency and Disclosure (BNM/RH/GL 000-3). Do not describe a promotional gift as 'free' if there are additional costs or conditions attached.",
                    examples: {
                      do: [
                        "Collect 3 Caf\xE9 Mesra stamps and get 1 complimentary doughnut",
                        "Use the RM5 Caf\xE9 Mesra e-Voucher to enjoy a Chicken Sausage Bun on us",
                        "Redeem your points to pay for fuel"
                      ],
                      dont: [
                        "Collect 3 Caf\xE9 Mesra stamps and get 1 FREE doughnut",
                        "Use the RM5 Caf\xE9 Mesra e-Voucher to get 1 Chicken Sausage Bun (worth RM4.30) for free",
                        "Redeem your points to free fuel"
                      ]
                    }
                  },
                  {
                    section: "2. Avoid using BNM name and logo",
                    details: "Do not use the name or logo of Bank Negara Malaysia (BNM) in any UI, advertising, or marketing materials intended for the public. Referencing BNM can imply endorsement or affiliation, which may mislead users.",
                    alternatives: [
                      "for security purposes",
                      "to comply with national regulations",
                      "to protect your account"
                    ]
                  }
                ],
                reference: {
                  document: "Requirements Product Transparency and Disclosure.docx",
                  link: "https://docs.google.com/document/d/16B02b6QRHloE4Qg6TKOdvh5H7fdBpKZk/edit"
                }
              }
            ]
          },
          {
            title: "Syntax",
            children: [
              {
                title: "Spelling",
                description: "Spelling is essential in maintaining consistency and clarity in Setel content. Correct spelling ensures that communication is professional and easily understood by all users.",
                guidelines: [
                  {
                    section: "1. Use British English",
                    details: [
                      "Use British English spelling for all Setel content.",
                      "When in doubt, check the Cambridge dictionary for preferred spelling.",
                      "Set your laptop and tool settings (e.g., Grammarly, Figma) to British English to help highlight misspellings."
                    ],
                    rules: [
                      {
                        rule: "Use words ending in -ise.",
                        do: [
                          "realise",
                          "authorise",
                          "standardise"
                        ],
                        dont: [
                          "realize",
                          "authorize",
                          "standardized"
                        ]
                      },
                      {
                        rule: "Use words ending in -our.",
                        do: [
                          "colour",
                          "favour",
                          "labour",
                          "favourite"
                        ],
                        dont: [
                          "color",
                          "favor",
                          "labor",
                          "favorite"
                        ]
                      },
                      {
                        rule: "Use words ending in -re.",
                        do: [
                          "litre",
                          "fibre",
                          "centre"
                        ],
                        dont: [
                          "liter",
                          "fiber",
                          "center"
                        ]
                      },
                      {
                        rule: "Use words ending in -yse.",
                        do: [
                          "analyse",
                          "paralyse"
                        ],
                        dont: [
                          "analyze",
                          "paralyze"
                        ]
                      },
                      {
                        rule: "Use words ending with -ence.",
                        do: [
                          "offence",
                          "defence",
                          "pretence"
                        ],
                        dont: [
                          "offense",
                          "defense",
                          "pretense"
                        ]
                      },
                      {
                        rule: "Use words ending with -ogue.",
                        do: [
                          "analogue",
                          "catalogue",
                          "dialogue"
                        ],
                        dont: [
                          "analog",
                          "catalog",
                          "dialog"
                        ]
                      },
                      {
                        rule: "Add double 'l' before adding suffix.",
                        do: [
                          "fuel",
                          "fuelled",
                          "fuelling"
                        ],
                        dont: [
                          "fuel",
                          "fueled",
                          "fueling"
                        ]
                      },
                      {
                        rule: "Use double vowel 'ae' and 'oe'.",
                        do: [
                          "manoeuvre",
                          "paediatric",
                          "encyclopaedia"
                        ],
                        dont: [
                          "maneuver",
                          "pediatric",
                          "encyclopedia"
                        ]
                      }
                    ]
                  },
                  {
                    section: "2. Differentiate between noun and verb spelling",
                    details: [
                      "Spellings are influenced by the function of the word.",
                      "Verbs are often spelled with 's', nouns with 'c'."
                    ],
                    examples: [
                      {
                        verb: "Advise",
                        noun: "Advice"
                      },
                      {
                        verb: "License",
                        noun: "Licence"
                      },
                      {
                        verb: "Practise",
                        noun: "Practice"
                      },
                      {
                        verb: "Devise",
                        noun: "Device"
                      }
                    ]
                  }
                ]
              },
              {
                title: "Capitalisation",
                description: "Capitalisation plays a crucial role in maintaining consistency and clarity in Setel content. It helps readers easily identify important elements, such as headings, product names, and specific terms.",
                guidelines: [
                  {
                    section: "1. Sentence case rules",
                    details: "All writing materials for Setel must use sentence case, including headings and titles. Only the first letter of the sentence and any proper nouns are capitalised.",
                    examples: {
                      do: [
                        "Seamless and smarter fuelling",
                        "Enter your personal information",
                        "You\u2019ve earned 10 Mesra Rewards points!"
                      ],
                      dont: [
                        "Seamless and Smarter Fuelling",
                        "Enter Your Personal Information",
                        "You\u2019ve Earned 10 Mesra Rewards Points!"
                      ]
                    },
                    reasons: [
                      "Brand voice: Sentence case supports a warm, friendly, and caring voice.",
                      "Readability: Easier to read and comprehend.",
                      "Consistency: Easier to train teams and maintain correct, consistent copy.",
                      "Localisation: Sentence case is easier to translate into other languages."
                    ]
                  },
                  {
                    section: "a. Product and feature names",
                    details: "Sentence case applies to features or products that aren\u2019t unique to Setel. Capitalise the name if it is unique to Setel and marketable as its own product (e.g., Setel Cashback, Family Wallet). Capitalising common features can distract and confuse users.",
                    examples: {
                      do: [
                        "Automated parking is available at KLCC.",
                        "Pay for fuel, parking, vehicle insurance, and more.",
                        "Get 10% off for your vehicle insurance.",
                        "Street parking has expanded to Kuala Lumpur."
                      ],
                      dont: [
                        "Setel\u2019s Automated Parking is available at KLCC.",
                        "Pay for Fuel, Parking, Vehicle Insurance, and more.",
                        "Get 10% off for your Vehicle Insurance.",
                        "Street Parking has expanded to Kuala Lumpur."
                      ]
                    }
                  },
                  {
                    section: "2. Capitalise brand names & proper nouns",
                    details: "Sentence case does not apply to brand names and proper nouns. Capitalise names of branded standalone products and features unique to Setel.",
                    brand_names_examples: {
                      do: [
                        "Pay with Setel Wallet",
                        "Order coffee at Caf\xE9 Mesra",
                        "Win RM50 Setel Voucher",
                        "Use your virtual Mesra Rewards card"
                      ],
                      dont: [
                        "Pay with Setel wallet",
                        "Order coffee at Caf\xE9 mesra",
                        "Win RM50 Setel voucher",
                        "Use your virtual Mesra rewards card"
                      ]
                    },
                    special_case: "One-tap fuelling: Only \u2018One\u2019 is capitalised, even though it is a brand name.",
                    proper_nouns_examples: {
                      do: [
                        "Lembaga Hasil Dalam Negeri",
                        "Pulau Pinang",
                        "Mary Jane",
                        "PETRONAS",
                        "MYDIN",
                        "myNEWS"
                      ]
                    }
                  },
                  {
                    section: "3. Use ALL CAPS for buttons",
                    details: "Buttons (UX components) should use ALL CAPS, not sentence case.",
                    examples: [
                      "TOP UP",
                      "REDEEM",
                      "PURCHASE FUEL",
                      "ENTER AMOUNT"
                    ]
                  },
                  {
                    section: "4. Exceptions for marketing",
                    details: "Marketing may capitalise campaign names or deals to attract customers and encourage action. For umbrella campaigns under PETRONAS Dagangan Berhad (PDB), align with PDB\u2019s capitalisation standard.",
                    examples: [
                      "\u2018Semua Boleh Setel\u2019 campaign",
                      "\u2018Golden Rewards\u2019 campaign (umbrella campaign under PDB)",
                      "\u2018One-tap dan Menang\u2019 campaign"
                    ]
                  }
                ]
              },
              {
                title: "Nouns & pronouns",
                description: "Guidelines on the use of nouns and pronouns in Setel content, including types, usage, and best practices for clarity and user engagement.",
                sections: [
                  {
                    section: "1. Common nouns",
                    details: "Refer to people, places, times, or things in a general sense. Capitalised only at the start of a sentence. Can be concrete (identifiable by senses) or abstract (ideas, emotions).",
                    examples: {
                      concrete: [
                        "server",
                        "mobile phone",
                        "station"
                      ],
                      abstract: [
                        "happiness",
                        "engagement",
                        "safety"
                      ]
                    }
                  },
                  {
                    section: "2. Proper nouns",
                    details: "Specific names of people, places, or things. Always capitalised. Includes names, unique places, organisations, events, products, trademarks, and titles.",
                    examples: [
                      "Jane Doe",
                      "Seremban",
                      "Setel Wallet",
                      "International Women\u2019s Day"
                    ],
                    reference: [
                      "https://dictionary.cambridge.org/",
                      "https://www.oed.com/?tl=true"
                    ]
                  },
                  {
                    section: "3. Nouns and number",
                    subsections: [
                      {
                        type: "Singular nouns",
                        details: "Refer to one person, place, thing, or idea.",
                        do: [
                          "This form",
                          "A user",
                          "That location"
                        ],
                        dont: [
                          "This forms",
                          "A users",
                          "That locations"
                        ]
                      },
                      {
                        type: "Plural nouns",
                        details: "Refer to more than one. Usually add -s or -es. Some have irregular forms.",
                        rules: [
                          {
                            pattern: "Most singular nouns",
                            suffix: "-s",
                            examples: [
                              "card - cards",
                              "doughnut - doughnuts",
                              "voucher - vouchers"
                            ]
                          },
                          {
                            pattern: "Ends in -s, -ss, -sh, -ch, -x, -z",
                            suffix: "-es (sometimes double the s or z)",
                            examples: [
                              "tax - taxes",
                              "lunch - lunches",
                              "bus - busses"
                            ]
                          },
                          {
                            pattern: "Ends in -f or -ef",
                            suffix: "-s or change to -ves",
                            examples: [
                              "belief - beliefs",
                              "wife - wives"
                            ]
                          },
                          {
                            pattern: "Ends in -y",
                            rule: "If before -y is consonant, change to -ies; if vowel, add -s",
                            examples: [
                              "city - cities",
                              "boy - boys"
                            ]
                          },
                          {
                            pattern: "Ends in -o",
                            suffix: "-es (exceptions: photo - photos, piano - pianos)",
                            examples: [
                              "potato - potatoes",
                              "tomato - tomatoes"
                            ]
                          },
                          {
                            pattern: "Irregular nouns",
                            examples: [
                              "child - children",
                              "woman - women",
                              "man - men",
                              "person - people"
                            ]
                          }
                        ]
                      },
                      {
                        type: "Uncountable nouns",
                        details: "Cannot be counted (e.g., information, water, fuel, data).",
                        do: [
                          "fuel",
                          "cashback",
                          "data",
                          "access"
                        ],
                        dont: [
                          "fuels",
                          "cashbacks",
                          "datas",
                          "accesses"
                        ]
                      }
                    ]
                  },
                  {
                    section: "4. Possessive nouns",
                    details: "Indicate ownership. Usually formed by adding an apostrophe + s."
                  },
                  {
                    section: "5. Compound nouns",
                    details: "Made up of two or more words. Types include noun+noun, noun+verb, noun+adjective, noun+prepositional phrase, verb+noun, preposition+noun, verb+preposition, adjective+noun.",
                    examples: [
                      "basketball",
                      "snowfall",
                      "lime green",
                      "son-in-law",
                      "surfboard",
                      "onlooker",
                      "lookout",
                      "black box"
                    ],
                    compound_vs_verb: {
                      compound_noun: {
                        definition: "A word made up of two or more words functioning as a single noun.",
                        formatting: "Typically one word or with a hyphen.",
                        examples: [
                          "Top-up amount",
                          "Proceed to checkout?",
                          "Login failed."
                        ]
                      },
                      verb: {
                        definition: "An action word showing what someone or something is doing.",
                        formatting: "Usually two separate words.",
                        examples: [
                          "Top up your wallet.",
                          "Check out now.",
                          "Log in to view your profile."
                        ]
                      }
                    }
                  },
                  {
                    section: "6. Personal pronouns",
                    details: "Used to create conversational and user-friendly content.",
                    subsections: [
                      {
                        type: "You matter (second person)",
                        usage: "Use 'you', 'your', 'you're' for positive, direct, or personalised interactions.",
                        do: [
                          "You have unlocked a Setel badge!",
                          "Your order is on its way.",
                          "Your password is updated."
                        ],
                        dont: [
                          "A Setel badge was unlocked!",
                          "The order will be sent to the recipient.",
                          "We\u2019ve updated your password."
                        ],
                        note: "For unpleasant situations, avoid second-person to not blame the user.",
                        unpleasant_do: [
                          "Incorrect password. Please try again.",
                          "Only one entry is accepted for this promotion.",
                          "Check your internet settings and try again."
                        ],
                        unpleasant_dont: [
                          "You\u2019ve entered the wrong password.",
                          "You must not send more than one entry.",
                          "Your internet connection is causing the issue."
                        ]
                      },
                      {
                        type: "We are responsible (first-person plural)",
                        usage: "Use 'we', 'our' to convey accountability, especially in empathetic or negative situations.",
                        do: [
                          "We are having trouble locating your file.",
                          "Our team is investigating the issue."
                        ],
                        dont: [
                          "Your file is nowhere to be found.",
                          "The issue is being looked into."
                        ]
                      },
                      {
                        type: "Me, myself, and I (first-person singular)",
                        usage: "Use 'I' exclusively for user agreement or consent."
                      }
                    ]
                  }
                ]
              },
              {
                title: "Verbs",
                description: "Guidelines for using verbs in Setel content to ensure clarity, simplicity, and consistency.",
                sections: [
                  {
                    section: "What are verbs?",
                    details: "Verbs describe actions (physical or mental) or a state of being. Examples: walk, laugh, guess, think, be, become, exist. Using precise verbs helps craft clear and simple sentences."
                  },
                  {
                    section: "1. Verb tense",
                    details: "Choose verb tense based on the timeline of the action. Prefer simple tenses for clarity.",
                    subsections: [
                      {
                        type: "a. Use simple tenses",
                        guideline: "Use simple present, past, and future tenses for concise and straightforward writing.",
                        examples: [
                          {
                            tense: "Simple present tense",
                            description: "Actions currently happening, customary, repeated, habits, or general truth.",
                            example: "Tap to proceed with payment."
                          },
                          {
                            tense: "Simple past tense",
                            description: "Actions that happened in the past and are completed.",
                            example: "Payment completed."
                          },
                          {
                            tense: "Simple future tense",
                            description: "Actions that begin and end in the future.",
                            example: "Payment will be processed."
                          }
                        ]
                      },
                      {
                        type: "b. Avoid using the perfect tense",
                        guideline: "Avoid perfect tenses as they add length and reduce readability.",
                        examples: [
                          {
                            tense: "Present perfect tense",
                            description: "Action or state that occurred at an indefinite time in the past.",
                            example: "We have processed the payment."
                          },
                          {
                            tense: "Past perfect tense",
                            description: "Actions that occurred in the past before another past action.",
                            example: "Payment had been made."
                          },
                          {
                            tense: "Future perfect tense",
                            description: "Actions completed before another point in the future.",
                            example: "In several minutes, payment will have completed."
                          }
                        ]
                      }
                    ]
                  },
                  {
                    section: "2. Active and passive voice",
                    details: "Voice can be active (subject performs the action) or passive (subject receives the action). Use active voice for clarity and directness.",
                    examples: {
                      active_voice: [
                        "We\u2019ve credited your cashback.",
                        "The store is preparing your order."
                      ],
                      passive_voice: [
                        "Your cashback has been credited.",
                        "Your order is being prepared by the store."
                      ]
                    },
                    note: "Passive voice is suitable for diagnostics, summaries, or status updates, especially in space-limited UI elements like toast messages or alerts.",
                    passive_voice_examples: [
                      "Changes saved.",
                      "Card added.",
                      "Profile updated."
                    ]
                  },
                  {
                    section: "3. Verb agreement",
                    details: "Verbs must agree with the subject in number (singular/plural).",
                    examples: [
                      {
                        subject: "A group of things",
                        verb: "Singular",
                        example: "A variety of top-up methods is available for Setel Wallet."
                      },
                      {
                        subject: "Two or more singular things connected by 'and'",
                        verb: "Plural",
                        example: "Coffee and pastries are on sale at Caf\xE9 Mesra."
                      },
                      {
                        subject: "Two or more singular things connected by 'or'",
                        verb: "Singular",
                        example: "IC number or passport number is required for registration."
                      }
                    ]
                  },
                  {
                    section: "4. Verb mood",
                    details: "Verb mood expresses fact, wish, command, or request. Choose the appropriate mood based on context. Avoid switching moods within a sentence.",
                    moods: [
                      {
                        mood: "Indicative",
                        definition: "Expresses statements or questions in present, past, or future tenses.",
                        when_to_use: [
                          "To provide information or updates.",
                          "To explain features or functionality.",
                          "To give clear, factual statements."
                        ],
                        examples: [
                          "Automated parking is available at KLCC, Sunway Pyramid, Tamarind Square, and many more.",
                          "This action cannot be undone."
                        ]
                      },
                      {
                        mood: "Imperative",
                        definition: "Expresses urgency, commands, and requests.",
                        when_to_use: [
                          "For action-oriented instructions in flows such as forms, buttons, and guides.",
                          "To guide users clearly without unnecessary filler words.",
                          "Use sparingly for direct tone in error messages."
                        ],
                        examples: [
                          "Enable notifications to receive updates and promotions.",
                          "Top up your wallet to proceed."
                        ]
                      },
                      {
                        mood: "Interrogative",
                        definition: "Used to ask questions.",
                        when_to_use: [
                          "To engage users by prompting them to consider or explore options.",
                          "In FAQ sections or onboarding to predict user concerns.",
                          "To encourage exploration or action in a friendly tone."
                        ],
                        examples: [
                          "Forgot your password?",
                          "Need help?"
                        ]
                      },
                      {
                        mood: "Conditional",
                        definition: "Expresses ideas that depend on conditions, often using 'would', 'could', 'should', 'if', or 'when'.",
                        when_to_use: [
                          "To explain consequences of user actions.",
                          "In flows where decisions depend on user input or system states.",
                          "To pre-empt potential issues with clear, empathetic guidance."
                        ],
                        examples: [
                          "If you close this page, your progress will be lost.",
                          "You\u2019ll need an active internet connection to proceed."
                        ]
                      },
                      {
                        mood: "Subjunctive",
                        definition: "Expresses wishes, hypotheses, and suggestions.",
                        when_to_use: [
                          "In feedback requests or surveys to gauge user expectations.",
                          "To inspire users with future possibilities.",
                          "In marketing content to appeal to emotions or aspirations."
                        ],
                        examples: [
                          "If we plan to expand our locations, where would you like to see us next?",
                          "Imagine having all your vehicle needs in one app."
                        ]
                      }
                    ],
                    mood_consistency: {
                      guideline: "Do not switch moods within a sentence to avoid confusion. Identify the primary intent and maintain the same mood throughout.",
                      examples: [
                        {
                          context: "Giving instructions",
                          do: "Tap to continue (imperative) and enter your details (imperative).",
                          dont: "Tap to continue (imperative) and you will enter your details (indicative)."
                        },
                        {
                          context: "Stating facts",
                          do: "Your order is confirmed (indicative) and it is on its way (indicative).",
                          dont: "Your payment is confirmed (indicative), track your order here (imperative)."
                        }
                      ],
                      rephrasing: {
                        do: [
                          "Your payment has been processed. Proceed to the next step.",
                          "Fill up the form. Then, submit to save your progress.",
                          "If you have any questions, contact support for assistance."
                        ],
                        dont: [
                          "Your payment has been processed, you can now proceed to the next step.",
                          "After filling up the form, click submit to save your progress.",
                          "If you have any questions, feel free to contact support and get assistance."
                        ]
                      }
                    }
                  }
                ]
              },
              {
                title: "Prepositions",
                description: "Prepositions indicate direction, time, location, and spatial relationships. This guide focuses on the prepositions in, on, and at, which are commonly confused as they serve as both prepositions of place and time.",
                examples: {
                  direction: "Head to the fuel pump and start fuelling.",
                  time: "The offer expires at midnight.",
                  location: "The QR code is displayed on the screen.",
                  space: "The vehicle is located between the two lanes."
                },
                prepositions: [
                  {
                    preposition: "in",
                    usage: {
                      time: [
                        {
                          context: "instant and moment",
                          examples: [
                            "Your order will be ready in a few moments.",
                            "Add your card in an instant!"
                          ]
                        },
                        {
                          context: "seconds, minutes, hours, days, and months",
                          examples: [
                            "The receipt will be available in a couple of minutes.",
                            "The parcel will arrive in five days.",
                            "The campaign will launch in August."
                          ]
                        },
                        {
                          context: "seasons",
                          examples: [
                            "We plan to roll out new features in the summer."
                          ]
                        },
                        {
                          context: "years or group of years",
                          examples: [
                            "In less than a decade, Setel has expanded nationwide."
                          ]
                        },
                        {
                          context: "the past, present, and future",
                          examples: [
                            "We look forward to introducing exciting innovations in the future."
                          ]
                        },
                        {
                          context: "times of day: morning, afternoon, evening",
                          examples: [
                            "The booth will open early in the morning."
                          ]
                        },
                        {
                          context: "night (specific time)",
                          examples: [
                            "She was woken up in the middle of the night."
                          ]
                        }
                      ],
                      place: [
                        {
                          context: "general locations",
                          examples: [
                            "She will be in the office tomorrow."
                          ]
                        },
                        {
                          context: "the sky and atmosphere",
                          examples: [
                            "A rare bird was spotted flying in the sky."
                          ]
                        },
                        {
                          context: "outer space",
                          examples: [
                            "They found the lost probe in the farthest reaches of space."
                          ]
                        }
                      ]
                    }
                  },
                  {
                    preposition: "on",
                    usage: {
                      time: [
                        {
                          context: "days of the week",
                          examples: [
                            "Parking is free on Sunday."
                          ]
                        },
                        {
                          context: "times of day with days of the week",
                          examples: [
                            "The dinner will be held on Saturday night."
                          ]
                        },
                        {
                          context: "yearly events",
                          examples: [
                            "The office is closed on New Year."
                          ]
                        },
                        {
                          context: "specific dates",
                          examples: [
                            "Promo ends on 15 January 2025."
                          ]
                        }
                      ],
                      place: [
                        {
                          context: "things on the surface of something else",
                          examples: [
                            "The book is on the table."
                          ]
                        },
                        {
                          context: "floors of a building, streets",
                          examples: [
                            "The office is on the fifth floor."
                          ]
                        },
                        {
                          context: "planets",
                          examples: [
                            "Life on Mars has long been a topic of scientific exploration."
                          ]
                        }
                      ]
                    }
                  },
                  {
                    preposition: "at",
                    usage: {
                      time: [
                        {
                          context: "specific times",
                          examples: [
                            "The event starts at 8:00 PM."
                          ]
                        },
                        {
                          context: "mealtimes",
                          examples: [
                            "We had a great conversation at dinner last night."
                          ]
                        },
                        {
                          context: "night (unspecific time)",
                          examples: [
                            "There was no one around at night."
                          ]
                        }
                      ],
                      place: [
                        {
                          context: "precise locations",
                          examples: [
                            "The cafe was located at Jalan Petaling."
                          ]
                        },
                        {
                          context: "events",
                          examples: [
                            "They were ableto meet a lot of customers at the launching ceremony."
                          ]
                        },
                        {
                          context: "specific addresses",
                          examples: [
                            "The office is located at Level 11, Vertical Corporate Tower B, Bangsar South."
                          ]
                        }
                      ]
                    }
                  }
                ],
                when_not_to_use: [
                  {
                    rule: "Don't use with \u2018next\u2019 and a time",
                    incorrect: [
                      "The limit will reset on next month.",
                      "The link will expire on next Monday."
                    ],
                    correct: [
                      "The limit will reset next month.",
                      "The link will expire next Monday."
                    ]
                  },
                  {
                    rule: "Don\u2019t use with \u2018last\u2019 and a specific time",
                    incorrect: [
                      "You\u2019ve redeemed your points in last week.",
                      "The offer ended on last Friday."
                    ],
                    correct: [
                      "You\u2019ve redeemed your points last week.",
                      "The offer ended last Friday."
                    ]
                  },
                  {
                    rule: "Don\u2019t use at the end of the question",
                    incorrect: [
                      "Where can I claim my cashback at?"
                    ],
                    correct: [
                      "Where can I claim my cashback?"
                    ]
                  }
                ]
              },
              {
                title: "Punctuations",
                description: "A guide or reminder on how to properly use punctuation when writing for Setel.",
                guidelines: [
                  {
                    punctuation: "Ampersand (&)",
                    usage: [
                      "Use when UI space is limited.",
                      "Use if part of company name, logo, proper noun, or title.",
                      "Use in titles."
                    ]
                  },
                  {
                    punctuation: "Apostrophe (')",
                    usage: [
                      "Form contractions (e.g., Let\u2019s, Can\u2019t, You\u2019ll, It\u2019s). Avoid regional contractions (e.g., Ain\u2019t, Shan\u2019t, Musn\u2019t, Y\u2019all).",
                      "Form possessives: Singular nouns add 's (even if ending in s), plural nouns not ending in s add 's, plural nouns ending in s add only an apostrophe.",
                      "For joint possession, use a single apostrophe."
                    ],
                    examples: {
                      singular: [
                        "Merchant\u2019s store",
                        "Owner\u2019s wallet balance",
                        "Boss\u2019s approval"
                      ],
                      plural: [
                        "Women\u2019s clothing",
                        "Users' credit card",
                        "Jack and Jill\u2019s design",
                        "Jack\u2019s and Jill\u2019s teams"
                      ]
                    }
                  },
                  {
                    punctuation: "Asterisk (*)",
                    usage: [
                      "Avoid using asterisks in writing materials.",
                      "Replace with indefinite terms like \u2018up to\u2019 or \u2018until\u2019 to avoid being misleading."
                    ],
                    examples: {
                      do: "Earn up to 10% discount with every fuel purchase.",
                      dont: "*10% discount will be yours with every fuel purchase."
                    }
                  },
                  {
                    punctuation: "Brackets [] {}",
                    usage: [
                      "Do not use brackets in UI copy or running sentences.",
                      "Use parentheses ( ) instead."
                    ]
                  },
                  {
                    punctuation: "Colons (:)",
                    usage: [
                      "Avoid using colons within sentences.",
                      "Use to introduce bulleted lists or steps.",
                      "Use to state dates and times."
                    ],
                    examples: {
                      do: [
                        "Accepted payment methods are Setel Wallet and bank card.",
                        "These are the necessary steps that need to be taken: Link a trusted device. Enable biometrics authentication.",
                        "Campaign period: 1 Dec 2024 - 31 Jan 2025",
                        "Expiry date: 25 November 2024"
                      ],
                      dont: [
                        "Accepted payment methods: Setel Wallet and bank card.",
                        "These are the necessary steps that need to be taken. Link a trusted device, Enable biometrics authentication.",
                        "Campaign period between 1 Dec 2024 - 31 Jan 2025",
                        "Expiry date is 25 November 2024"
                      ]
                    }
                  },
                  {
                    punctuation: "Comma (,)",
                    usage: [
                      "Use the Oxford comma when writing lists for better segregation and comprehension."
                    ],
                    examples: {
                      do: "Use Setel to maximise safety, convenience, and productivity.",
                      dont: "Use Setel to maximise safety, convenience and productivity."
                    }
                  },
                  {
                    punctuation: "Ellipsis (...)",
                    usage: [
                      "Use for wide searches or to convey background action (like loading).",
                      "No space between last letter and first period."
                    ],
                    examples: {
                      do: [
                        "Search for shirts, pants, or jackets\u2026",
                        "Checking for updates\u2026",
                        "Almost there\u2026"
                      ],
                      dont: [
                        "Click Customers > Enter Vehicle Mileage\u2026",
                        "Select your payment method\u2026then proceed to checkout"
                      ]
                    }
                  },
                  {
                    punctuation: "Exclamation mark (!)",
                    usage: [
                      "Express enthusiasm naturally and sparingly.",
                      "Best with single words or short phrases.",
                      "Do not use double (!!) or triple (!!!) exclamations.",
                      "Do not follow with a question mark or other punctuation."
                    ],
                    examples: {
                      do: [
                        "Congrats! You\u2019ve got cashback.",
                        "You\u2019ve got cashback!",
                        "RM10 could be yours! \u{1F4B0}"
                      ],
                      dont: [
                        "Congrats! You\u2019ve got cashback!",
                        "Are you sure you don\u2019t want this!?",
                        "RM10 could be yours!!"
                      ]
                    }
                  },
                  {
                    punctuation: "Full stop (.)",
                    usage: [
                      "Every sentence must end with a full stop except for titles, buttons, and one-lined status messages."
                    ]
                  },
                  {
                    punctuation: "Hyphen (-)",
                    usage: [
                      "Use between words, with no space before or after.",
                      "Distinguish between compound nouns and verbs.",
                      "Use with numbers and units as adjectives."
                    ],
                    examples: {
                      verb: [
                        "Top up",
                        "Stay at home",
                        "Add on",
                        "Sing along"
                      ],
                      noun: [
                        "Top-up",
                        "Stay-at-home",
                        "Add-on",
                        "Sing-along"
                      ],
                      adjective: [
                        "100-metre run",
                        "14-day free return",
                        "6-hour cooling period"
                      ]
                    }
                  },
                  {
                    punctuation: "Parentheses ( )",
                    usage: [
                      "Use in pairs to provide examples, supplementary information, or introduce abbreviations.",
                      "Placement of full stop: outside if part of a sentence, inside if a complete sentence, none if part of a label.",
                      "Capitalise first word if complete sentence inside; do not capitalise if word or phrase.",
                      "Always leave a space before opening parentheses."
                    ],
                    examples: {
                      provide_examples: [
                        "The offer is available at selected locations (Kuala Lumpur, Selangor, and Johor).",
                        "Remove anything that might cover your face (hats, sunglasses, or face mask)."
                      ],
                      supplementary_information: [
                        "Turn off the lights. (Dark photos will be rejected.)",
                        "Address (optional)"
                      ],
                      introduce_abbreviation: [
                        "Jabatan Pengangkutan Jalan (JPJ)",
                        "Lembaga Hasil Dalam Negeri (LHDN)"
                      ]
                    }
                  },
                  {
                    punctuation: "Question mark (?)",
                    usage: [
                      "Use when a user needs to make a decision or to drive suspense/intrigue in CLM."
                    ],
                    examples: {
                      user_decision: [
                        "Cancel fuelling?",
                        "Proceed with payment?"
                      ],
                      clm: [
                        "Don\u2019t you want cashback?",
                        "What\u2019s better than 3x points?"
                      ]
                    }
                  },
                  {
                    punctuation: "Quotation marks",
                    usage: [
                      "Use single quotation marks ('') to refer to a page, section, or file.",
                      'Use double quotation marks ("") to quote spoken words or phrases.'
                    ],
                    examples: {
                      single: {
                        do: [
                          "Go to 'Profile\u2019",
                          "Select your items then 'Pay\u2019."
                        ],
                        dont: [
                          "Go to \u201CProfile\u201D",
                          "Select your items then \u201CPay\u201D."
                        ]
                      },
                      double: {
                        do: [
                          "\u201COur users are our top priority. At Setel, we're all about giving our users the best value,\u201D said Abdullah Ayman Awaluddin, CEO of Setel Ventures Sdn. Bhd.",
                          "Users remarked that the barcode was \u201Cseamless\u201D and \u201Cmade points collection easier\u201D."
                        ],
                        dont: [
                          "\u2018Our users are our top priority. At Setel, we're all about giving our users the best value,\u2019 said Abdullah Ayman Awaluddin, CEO of Setel Ventures Sdn. Bhd.",
                          "Users remarked that the barcode was 'seamless\u2019 and 'made points collection easier\u2019."
                        ]
                      }
                    }
                  },
                  {
                    punctuation: "Semicolon (;)",
                    usage: [
                      "Avoid using semicolons in digital content; use a full stop or comma instead.",
                      "If necessary in long-form content, use to connect two closely related independent clauses or replace a comma/\u2018and\u2019."
                    ],
                    examples: {
                      connect_clauses: [
                        "Setel offers seamless fuel payment; you\u2019ll never need to leave your vehicle again.",
                        "Pay for fuel, parking, road tax, and more; everything you need is in one app."
                      ],
                      replace_comma_and: [
                        "Your cashback will be credited instantly; no waiting required.",
                        "Earn Mesra points with every transaction; redeem them for fuel or exciting rewards."
                      ]
                    }
                  },
                  {
                    punctuation: "Slash (/)",
                    usage: [
                      "Use forward slashes to mean 'per' or 'or\u2019. No spaces on either side.",
                      "For math equations, omit the slash and SI unit to avoid confusion with division."
                    ],
                    examples: {
                      do: [
                        "RM10/month",
                        "Enter IC/Passport number",
                        "RM2.05/litre",
                        "50.000 L x RM2.05"
                      ],
                      dont: [
                        "RM10/ month",
                        "Enter IC / Passport number",
                        "RM2.05/ litre",
                        "50.000 L x RM2.05/L"
                      ]
                    }
                  }
                ]
              },
              {
                title: "Abbreviations and acronyms",
                description: "Guidelines for using abbreviations and acronyms in Setel content to ensure clarity and consistency.",
                sections: [
                  {
                    section: "1. Abbreviations",
                    definition: "A shortened form of a word used in place of the full word (e.g., Sdn. Bhd., no., tel.).",
                    guidelines: [
                      "Avoid abbreviations unless:",
                      "The abbreviation is part of the official or registered name.",
                      "UI space is limited (use only known abbreviations such as no. for number).",
                      "When using e.g. (Exampli Gratia).",
                      "Always include a full stop after the abbreviation."
                    ],
                    examples: {
                      accepted: [
                        "Setel Ventures Sdn. Bhd.",
                        "Tax invoice no."
                      ],
                      forbidden: [
                        "addr.",
                        "Amt.",
                        "Yr."
                      ]
                    },
                    subsections: [
                      {
                        subsection: "a. Using Exampli Gratia (e.g.)",
                        rules: [
                          "Write e.g. in lowercase and do not add a comma after the abbreviation.",
                          "The word following e.g. should not be capitalized unless it is a proper noun.",
                          "Capitalise the E in e.g. if it is at the beginning of a sentence."
                        ],
                        examples: {
                          do: [
                            "There are various rewards (e.g. points, cashback)",
                            "The offer is available in various locations, e.g. Kuala Lumpur, Seremban",
                            "Find whatever is closest to you. E.g. landmarks, nearest highway"
                          ],
                          dont: [
                            "There are various rewards (e.g, points, cashback)",
                            "The offer is available in various locations, E.G Kuala Lumpur, Seremban",
                            "Find whatever is closest to you. e.g landmarks, nearest highway"
                          ]
                        }
                      },
                      {
                        subsection: "b. Long and short versions of a word",
                        rules: [
                          "Short versions (e.g., app for application, demo for demonstration, sync for synchronise) are not abbreviations.",
                          "Do not put a period after short versions.",
                          "If you can say the short version as a word, treat it as a word, not an abbreviation."
                        ]
                      }
                    ]
                  },
                  {
                    section: "2. Acronyms",
                    definition: "An acronym is formed by combining the first letter or syllable of each word in a phrase to create a new, single word.",
                    guidelines: [
                      "Write the full version once when first mentioned, followed by the acronym in brackets.",
                      "Use the acronym for subsequent references.",
                      "Acronyms must always be written in uppercase."
                    ],
                    examples: {
                      do_first_time: [
                        "Lembaga Hasil Dalam Negeri (LHDN) will review your details.",
                        "Your application was sent to Jabatan Pengangkutan Jalan Malaysia (JPJ).",
                        "I accept the terms and conditions by the Ministry of Finance (MOF)."
                      ],
                      do_subsequent: [
                        "LHDN has approved your request.",
                        "JPJ is processing your application.",
                        "MOF is reviewing your details."
                      ],
                      dont_first_time: [
                        "LHDN will review your details.",
                        "Your application was sent to JPJ.",
                        "I accept the terms and conditions by the MOF."
                      ]
                    },
                    subsections: [
                      {
                        subsection: "b. Slang acronyms",
                        rules: [
                          "Slang acronyms (e.g., FYI, ICYMI) are acceptable in Customer Lifecycle Management (CLM) content.",
                          "Use slang acronyms sparingly as they may not be understood by all audiences."
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                title: "Common writing mistakes",
                description: "This section highlights common grammatical and spelling errors to help identify, fix, and avoid them, maintaining clarity and professionalism in Setel content.",
                sections: [
                  {
                    section: "Grammar",
                    subsections: [
                      {
                        topic: "Subject/verb agreement",
                        guideline: "The subject and verb must be in the same tense (singular/plural).",
                        examples: {
                          correct: [
                            "The Setel app offers cashless payment options.",
                            "The wallet balance is not enough."
                          ],
                          incorrect: [
                            "The Setel app offer cashless payment options.",
                            "The wallet balance are not enough."
                          ]
                        }
                      },
                      {
                        topic: "Its vs It\u2019s",
                        guideline: "\u2018Its\u2019 is the possessive form of \u2018it\u2019. \u2018It\u2019s\u2019 is a contraction for \u2018it is\u2019 or \u2018it has\u2019.",
                        examples: {
                          its: [
                            "Setel will introduce its new EV charging feature next week.",
                            "The cat hissed when its tail was stepped on."
                          ],
                          "it's": [
                            "It\u2019s been five years since the launch of Setel."
                          ]
                        }
                      },
                      {
                        topic: "Your vs You\u2019re",
                        guideline: "\u2018Your\u2019 is the possessive form of \u2018you\u2019. \u2018You\u2019re\u2019 is a contraction for \u2018you are\u2019.",
                        examples: {
                          your: [
                            "Your account is activated.",
                            "Is this your card?"
                          ],
                          "you\u2019re": [
                            "You\u2019re going to love this new update.",
                            "You\u2019re one step closer to winning!"
                          ]
                        }
                      },
                      {
                        topic: "Affect vs Effect",
                        guideline: "\u2018Affect\u2019 is usually a verb meaning to influence. \u2018Effect\u2019 is usually a noun meaning the result.",
                        examples: {
                          affect: [
                            "The downtime may affect your payment experience."
                          ],
                          effect: [
                            "The effect of the campaign was higher fuel sales."
                          ]
                        }
                      },
                      {
                        topic: "Each vs Every",
                        guideline: "\u2018Each\u2019 refers to individual items in a group. \u2018Every\u2019 refers to all items collectively.",
                        examples: {
                          each: [
                            "Each user must create a passcode.",
                            "You must scan each item."
                          ],
                          every: [
                            "Every payment is recorded.",
                            "The promo is applicable at every Caf\xE9 Mesra outlet."
                          ]
                        }
                      },
                      {
                        topic: "Checkout vs Check out",
                        guideline: "\u2018Checkout\u2019 is a noun (the process). \u2018Check out\u2019 is a verb (the action).",
                        examples: {
                          checkout: [
                            "Use One-click checkout for faster payment.",
                            "Proceed to checkout."
                          ],
                          "check out": [
                            "Check out now.",
                            "Would you like to check out now?"
                          ]
                        }
                      },
                      {
                        topic: "Login vs Log in",
                        guideline: "\u2018Login\u2019 is a noun (the process). \u2018Log in\u2019 is a verb (the action).",
                        examples: {
                          login: [
                            "Failed to load the login page.",
                            "Enter your login credentials correctly."
                          ],
                          "log in": [
                            "Log in now.",
                            "Log in to view your transaction history."
                          ]
                        }
                      },
                      {
                        topic: "Top-up vs Top up",
                        guideline: "\u2018Top-up\u2019 is a noun (the process). \u2018Top up\u2019 is a verb (the action).",
                        examples: {
                          "top-up": [
                            "Top-up amount.",
                            "Your top-up was successful."
                          ],
                          "top up": [
                            "Would you like to top up now?",
                            "Top up your wallet to proceed."
                          ]
                        }
                      },
                      {
                        topic: "Compliment vs Complement",
                        guideline: "\u2018Compliment\u2019 is praise or a kind word. \u2018Complement\u2019 means to enhance or complete.",
                        examples: {
                          compliment: [
                            "Many people complimented him during the launching ceremony.",
                            "Get a complimentary donut when you spend RM10 at Caf\xE9 Mesra."
                          ],
                          complement: [
                            "The piano music complemented the violin playing.",
                            "The complementary features in Setel make the app a great companion for motorists."
                          ]
                        }
                      },
                      {
                        topic: "Inquiry vs Enquiry",
                        guideline: "\u2018Inquiry\u2019 is for formal requests or investigations. \u2018Enquiry\u2019 is broader, for any request.",
                        examples: {
                          inquiry: [
                            "If any security breaches occur, an inquiry will be conducted."
                          ],
                          enquiry: [
                            "Please contact the bank for any enquiries."
                          ]
                        }
                      },
                      {
                        topic: "Using \u2018the\u2019",
                        guideline: "Use \u2018the\u2019 when referring to something already mentioned, to define a specific object, or with ordinal numbers and superlatives.",
                        examples: [
                          "An RM50 voucher is up for grabs! The voucher will be available until the end of month.",
                          "The pump is now ready.",
                          "Setel is the first fuelling app in Malaysia."
                        ]
                      },
                      {
                        topic: "Okay vs Ok",
                        guideline: "Use \u2018Okay\u2019 in Setel content for completeness and clarity."
                      },
                      {
                        topic: "Copy vs Copies",
                        guideline: "\u2018Copy\u2019 is an uncountable noun for written text, even when referring to multiple pieces."
                      }
                    ]
                  },
                  {
                    section: "Prepositions",
                    subsections: [
                      {
                        topic: "Into vs In",
                        guideline: "\u2018Into\u2019 signifies movement or transformation. \u2018In\u2019 refers to a state or condition of being enclosed or surrounded.",
                        examples: {
                          into: [
                            "Would you like to transfer the funds from the gift card into your wallet?",
                            "He walked into the office."
                          ],
                          in: [
                            "View your transaction history in the app.",
                            "Your information will be kept securely in our system."
                          ]
                        }
                      }
                    ],
                    reference: "For a complete guide on using prepositions, see the Prepositions page."
                  },
                  {
                    section: "Spelling",
                    subsections: [
                      {
                        topic: "Fuelling vs Fueling",
                        guideline: "Use \u2018fuelling\u2019 (British English, double \u2018l\u2019). \u2018Fueling\u2019 is American English."
                      },
                      {
                        topic: "\u2018s\u2019 vs \u2018z\u2019",
                        guideline: "Use \u2018s\u2019 (authorise, analyse) for British English. \u2018z\u2019 (authorize, analyze) is American English."
                      },
                      {
                        topic: "Centre vs Center",
                        guideline: "Use \u2018centre\u2019 (British English, -re ending). \u2018Center\u2019 is American English."
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "Formats",
            children: [
              {
                title: "Currency",
                description: "Guidelines for writing about money and currency in Setel content to ensure clarity, legal compliance, and a positive consumer experience.",
                guidelines: [
                  {
                    section: "1. Use currency symbol in CAPITAL CASE",
                    details: "In Malaysia, always use the currency symbol 'RM' before the amount, written in CAPITAL CASE.",
                    examples: {
                      do: [
                        "RM50",
                        "RM50.00"
                      ],
                      dont: [
                        "rm50",
                        "MYR50"
                      ]
                    }
                  },
                  {
                    section: "2. Spacing conventions",
                    details: "Do not use a space between the currency symbol and the digit to prevent fraud. Exception: In large-scale UI (e.g., landing page), a space may be added for readability and aesthetics based on designer advice."
                  },
                  {
                    section: "3. Include comma for 4-digit numbers and above",
                    details: "For numbers with 4 or more digits, use a comma to separate groups of 3 digits for readability.",
                    examples: {
                      do: [
                        "RM1,000",
                        "RM15,000",
                        "RM100,000"
                      ],
                      dont: [
                        "RM1000",
                        "RM15000",
                        "RM100000"
                      ]
                    }
                  },
                  {
                    section: "4. Include decimal points in dynamic UI components",
                    details: "For dynamic UI components (e.g., Setel Wallet balance, payment amount), always include decimal points when displaying currency."
                  }
                ]
              },
              {
                title: "Date and time",
                description: "Guidelines for writing dates and times in Setel content to ensure clarity and consistency.",
                sections: [
                  {
                    section: "1. Writing dates",
                    formats: [
                      {
                        format: "Day/Month/Year",
                        description: "General format (preferred). Day in digits, full spelling of month, year in digits.",
                        example: "18 August 2022"
                      },
                      {
                        format: "Day/Month/Year (abbreviation)",
                        description: "Format for copy in limited spaces such as small UI components, tables, and charts. Use abbreviated month names (e.g., Jan, Feb, Mar, etc.).",
                        example: "18 Aug 2022"
                      },
                      {
                        format: "Date range",
                        description: "Month/year from the same period only needs to be written once at the end range. Month/year from different periods needs to be specified in both ranges. Add an en dash (\u2013) without space in between.",
                        examples: [
                          "18\u201320 August 2022 (same month, same year)",
                          "18 July\u201318 August 2022 (different month, same year)",
                          "18 August 2022\u201318 August 2023 (same month, different year)",
                          "18 July 2022\u201318 August 2023 (different month, different year)"
                        ]
                      }
                    ],
                    dont: [
                      "Don't use YYYY/MM/DD (2022/08/18) format in B2C copy.",
                      "Don't use numerical format (05/06/2022) as it can be interpreted differently by users."
                    ]
                  },
                  {
                    section: "2. Writing time",
                    formats: [
                      {
                        format: "12-hour format",
                        description: "General format. Use a colon (:) between the hours and minutes, with space after digits and uppercase AM/PM.",
                        example: "8:00 AM"
                      },
                      {
                        format: "Time range",
                        description: "AM/PM from the same period only needs to be written once at the end range. AM/PM from different ranges needs to be specified in both ranges. Add an en dash (\u2013) without space in between.",
                        examples: [
                          "8:00\u201310:00 AM (same period)",
                          "8:00 AM\u201310:00 PM (different periods)"
                        ]
                      }
                    ]
                  },
                  {
                    section: "3. Approximate date and time",
                    description: "Express date and time information as you would in conversation when the situation allows. Use the \u2018ago\u2019 format for recent past events and round down for future and past events.",
                    past: [
                      {
                        description: "Within the last few seconds",
                        display: "just now"
                      },
                      {
                        description: "Within the last few minutes",
                        display: ""
                      },
                      {
                        description: "Within 30 minutes",
                        display: "half an hour ago"
                      },
                      {
                        description: "Within 59 minutes",
                        display: "x minutes ago"
                      },
                      {
                        description: "60 minutes ago",
                        display: "1 hour ago"
                      },
                      {
                        description: "x hours ago",
                        display: "x hours ago"
                      },
                      {
                        description: "1 day ago",
                        display: "yesterday"
                      },
                      {
                        description: "2-6 days ago",
                        display: "x days ago"
                      },
                      {
                        description: "7 days ago",
                        display: "1 week ago"
                      }
                    ],
                    future: [
                      {
                        description: "Within the next few seconds",
                        display: "shortly"
                      },
                      {
                        description: "Within the next few minutes",
                        display: ""
                      },
                      {
                        description: "In 30 minutes",
                        display: "In half an hour"
                      },
                      {
                        description: "In the next 60 minutes",
                        display: "In x minutes"
                      },
                      {
                        description: "In 60 minutes",
                        display: "In 1 hour"
                      },
                      {
                        description: "In x hours",
                        display: "In x hours"
                      },
                      {
                        description: "In 1 day (by date, not hours)",
                        display: "tomorrow"
                      },
                      {
                        description: "In 2 to 7 days",
                        display: "In x days"
                      },
                      {
                        description: "In 7 days",
                        display: "In 1 week"
                      }
                    ]
                  },
                  {
                    section: "4. Avoid using \u2018bi\u2019 to mean either 2 or twice",
                    description: "The prefix \u2018bi\u2019 can be confusing when used with expressions of time. Instead of using words like \u2018bimonthly\u2019, \u2018biannual\u2019, or \u2018biennial\u2019, use the phrase \u2018every 2\u2019 (e.g., every 2 weeks, every 2 months, every 2 years)."
                  }
                ]
              },
              {
                title: "SI units",
                description: "Le Syst\xE8me international d\u2019unit\xE9s (SI), or International System of Units, commonly known as the metric system, is the international standard of measurement. This page provides guidelines for using SI units in Setel writing materials.",
                guidelines: [
                  "Always include a space between a number and the SI unit (e.g., 15 L, 6 kg), except for the degree symbol.",
                  "Do not use italics with SI units."
                ],
                examples: {
                  do: [
                    "15 L",
                    "6 kg"
                  ],
                  dont: [
                    "15L",
                    "6kg"
                  ]
                },
                common_SI_units: [
                  {
                    measurement: "Liquid",
                    base_unit: "Litre",
                    symbol: "L"
                  },
                  {
                    measurement: "Distance",
                    base_unit: "Kilometer",
                    symbol: "km"
                  },
                  {
                    measurement: "Time",
                    base_unit: "Hour",
                    symbol: "h"
                  },
                  {
                    measurement: "Time",
                    base_unit: "Minute",
                    symbol: "m"
                  },
                  {
                    measurement: "Time",
                    base_unit: "Second",
                    symbol: "s"
                  },
                  {
                    measurement: "Mass",
                    base_unit: "Kilogram",
                    symbol: "kg"
                  },
                  {
                    measurement: "Storage size",
                    base_unit: "Kilobyte",
                    symbol: "KB"
                  },
                  {
                    measurement: "Storage size",
                    base_unit: "Gigabyte",
                    symbol: "GB"
                  }
                ]
              },
              {
                title: "Registered numbers",
                description: "Registered numbers, such as vehicle and mobile numbers, play a crucial role in uniquely identifying individuals or assets. To ensure consistency and readability, it is important to follow standardised formatting rules.",
                sections: [
                  {
                    section: "Vehicle number plate",
                    details: "The vehicle number plate is the registration number for automobiles issued by the Malaysian Road Transport Department (Jabatan Pengangkutan Jalan Malaysia). Throughout the app, the vehicle plate number should be written using the official format used by JPJ: ABC1234."
                  },
                  {
                    section: "Mobile number",
                    details: "In the app, a mobile number is used to register for a Setel account and can also serve as a contact support hotline, such as on the PETRONAS Shop website.",
                    formats: {
                      "Malaysian mobile number": {
                        with_country_code: "+60196389104",
                        without_country_code: "0196389104"
                      },
                      Landline: {
                        with_country_code: "+60340071331",
                        without_country_code: "0340071331"
                      },
                      Hotline: "1300-888-333"
                    },
                    note: "Malaysian mobile and landline numbers should be written without spaces or dashes, except for hotlines which use hyphens."
                  }
                ]
              },
              {
                title: "Lists",
                description: "Use lists to break down complex ideas and make them more readable and scannable. Lists also help make parallel choices easier to compare.",
                guidelines: [
                  {
                    section: "1. Be consistent and use parallel construction",
                    details: [
                      "Phrase list items to be consistent with each other for better comprehension and readability.",
                      "Capitalise the first word of each list item.",
                      "Introduce a list with a heading or introductory phrase (and a colon if necessary).",
                      "Generally, don\u2019t use a full stop in list items unless it\u2019s a complete sentence.",
                      "If listing actions, start each item with a verb. If listing nouns, ensure all items are nouns.",
                      "Treat each list item as a self-contained piece of information."
                    ]
                  },
                  {
                    section: "a. Bulleted list",
                    usage: "Use when items are related but sequence or priority doesn\u2019t matter.",
                    do: [
                      "Include a heading.",
                      "Capitalise list items.",
                      "No full stop if items are not complete sentences.",
                      "Example: Small, Medium, Large"
                    ],
                    dont: [
                      "No heading.",
                      "List items not capitalised.",
                      "Unnecessary full stops for words/phrases.",
                      "Example: small., medium., large."
                    ]
                  },
                  {
                    section: "b. Numbered list",
                    usage: "Use when item sequence or priority matters.",
                    do: [
                      "Include a heading.",
                      "Capitalise list items.",
                      "Use full stops if items are complete sentences.",
                      "Keep steps consistent (e.g., start with a verb).",
                      "Example: 1. Go to 'Profile\u2019. 2. Select your voucher. 3. Swipe the voucher when you\u2019re at the outlet."
                    ],
                    dont: [
                      "List items not capitalised.",
                      "Missing full stops for complete sentences.",
                      "Inconsistent format (e.g., not starting with a verb).",
                      "Example: 1. go to \u2018Profile\u2019 2. select your voucher 3. your voucher can only be used at the outlet"
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "Semantics",
            children: [
              {
                title: "Tones",
                content: [
                  {
                    section: "Introduction",
                    text: "The tone of writing refers to the linguistic expression of emotions and attitudes. Unlike voice, which is a fixed element that represents the brand\u2019s character, tone is adaptable and varies depending on the context. For example, a crisis should be addressed with an empathetic and reassuring tone, whereas exciting cashback promotions can be written in a persuasive and compelling tone, all while maintaining the brand voice. Using the correct tone is crucial, as it evokes specific emotional or cognitive responses that directly influence users' perceptions and actions."
                  },
                  {
                    section: "Types of tone",
                    description: "There are ten distinct tones that can be tailored to suit various scenarios and materials. While tone is inherently subjective, each type possesses unique traits that set it apart. These tones can be effectively constructed through specific syntactic elements, ensuring consistency and clarity in communication.",
                    tones: [
                      {
                        name: "Friendly and conversational",
                        traits: "Warm, approachable, relatable, and casual.",
                        syntactic_elements: "Simple verb and adjective.",
                        example: "Fuel up with Setel and enjoy up to 3x Mesra Rewards points\u2014easy and rewarding!"
                      },
                      {
                        name: "Professional and authoritative",
                        traits: "Formal, confident, knowledgeable, precise.",
                        syntactic_elements: "Descriptive phrase and technical verb/noun.",
                        example: "Fuel with Setel and earn up to 3x Mesra Rewards points, a smart choice for maximising your benefits."
                      },
                      {
                        name: "Persuasive and compelling",
                        traits: "Enthusiastic, engaging, inspiring, action-oriented.",
                        syntactic_elements: "Negative command phrase, actionable verb, and superlative adjective.",
                        example: "Don't miss out! Fuel with Setel now and unlock up to 3x Mesra Rewards points - the best deal in town."
                      },
                      {
                        name: "Empathetic and reassuring",
                        traits: "Sincere, caring, supportive, understanding.",
                        syntactic_elements: "Compassionate verb, reaffirming phrase, and promising adverb.",
                        example: "We understand how much every point matters. That\u2019s why fuelling with Setel lets you earn up to 3x Mesra Rewards points effortlessly."
                      },
                      {
                        name: "Playful and humorous",
                        traits: "Witty, lighthearted, entertaining, quirky.",
                        syntactic_elements: "Amplifying verb, metaphoric phrase, and hyperbolic noun.",
                        example: "Triple the points, triple the fun! Fuel with Setel and let your Mesra Rewards soar to 3x greatness!"
                      },
                      {
                        name: "Inspirational and motivational",
                        traits: "Positive, uplifting, visionary, aspirational.",
                        syntactic_elements: "Encouraging phrase, actionable verb, and reassuring phrase.",
                        example: "Take your journey to the next level!  Fuel with Setel and earn up to 3x Mesra Rewards points\u2014you deserve it."
                      },
                      {
                        name: "Informative and neutral",
                        traits: "Objective, clear, factual, straightforward.",
                        syntactic_elements: "Factual phrase, simple noun/adjective, and technical verb.",
                        example: "Fuel with Setel to earn up to 3x Mesra Rewards points. It's a simple way to maximise your rewards."
                      },
                      {
                        name: "Urgent and action-oriented",
                        traits: "Direct, time-sensitive, assertive, concise.",
                        syntactic_elements: "Actionable verb, urgency adverb, and time-sensitive phrase.",
                        example: "Act fast! Fuel with Setel now and earn up to 3x Mesra Rewards points before time runs out!"
                      },
                      {
                        name: "Luxurious and exclusive",
                        traits: "Sophisticated, elegant, refined, polished.",
                        syntactic_elements: "Personalised verb, grandeur adjective, and reassuring phrase.",
                        example: "Experience premium rewards. Fuel with Setel and earn up to 3x Mesra Rewards points\u2014because you deserve more."
                      },
                      {
                        name: "Analytical and technical",
                        traits: "Logical, detailed, data-driven, precise.",
                        syntactic_elements: "Causal phrase, causative verb, and quantifier.",
                        example: "By fuelling with Setel, you can earn up to 3x Mesra Rewards points, significantly increasing your total points over time."
                      }
                    ],
                    note: "The syntactic elements are only suggestions designed to help writers craft their copy more efficiently. They are not mandatory and can be amended based on the writers' judgements and creativity."
                  },
                  {
                    section: "Tones for different context",
                    description: "Just as different problems call for tailored solutions, varying contexts demand distinct tones in writing. The choice of tone is not merely a stylistic preference\u2014it is a crucial factor that shapes how the reader perceives and reacts to the message. An accurate tone ensures that the content resonates with the audience, evokes the intended emotions, and drives the desired actions.",
                    table: [
                      {
                        type_of_tone: "Friendly and conversational",
                        suitable_context: [
                          "Social media posts",
                          "Customer service chats",
                          "Welcome emails",
                          "Onboarding",
                          "Blog posts"
                        ],
                        possible_reaction: "Create a sense of comfort and relatability."
                      },
                      {
                        type_of_tone: "Professional and authoritative",
                        suitable_context: [
                          "Corporate communications",
                          "Business reports or white papers",
                          "B2B marketing materials",
                          "Legal documents",
                          "Policy updates",
                          "Security matters"
                        ],
                        possible_reaction: "Instil respect and confidence towards the product/company."
                      },
                      {
                        type_of_tone: "Persuasive and compelling",
                        suitable_context: [
                          "Promotional campaigns",
                          "Product landing pages",
                          "Pitches or presentations"
                        ],
                        possible_reaction: "Increase the drive to take action."
                      },
                      {
                        type_of_tone: "Empathetic and reassuring",
                        suitable_context: [
                          "Apology letters",
                          "Responses to customer complaints",
                          "Crisis communication",
                          "Customer retention efforts"
                        ],
                        possible_reaction: "Form a bond through acknowledgement and compassion."
                      },
                      {
                        type_of_tone: "Playful and humorous",
                        suitable_context: [
                          "Social media campaigns",
                          "Promotional campaigns",
                          "Gamification"
                        ],
                        possible_reaction: "Increase engagement and brand image through entertainment."
                      },
                      {
                        type_of_tone: "Inspirational and motivational",
                        suitable_context: [
                          "Success stories or testimonials",
                          "Promotional campaigns",
                          "Customer retention efforts"
                        ],
                        possible_reaction: "Motivate and uplift reliance in the product/company."
                      },
                      {
                        type_of_tone: "Informative and neutral",
                        suitable_context: [
                          "How-to guides",
                          "FAQs and Help Centre articles",
                          "Blog posts",
                          "News announcements or press releases"
                        ],
                        possible_reaction: "Foster trust through transparency and support."
                      },
                      {
                        type_of_tone: "Urgent and action-oriented",
                        suitable_context: [
                          "Limited-time promotions",
                          "Error messages",
                          "Calls-to-action",
                          "Event/deadline reminders"
                        ],
                        possible_reaction: "Prompt quick actions."
                      },
                      {
                        type_of_tone: "Luxurious and exclusive",
                        suitable_context: [
                          "Limited edition promotions",
                          "Loyalty program communications"
                        ],
                        possible_reaction: "Draw aspirational lifestyle and high-quality experience."
                      },
                      {
                        type_of_tone: "Analytical and technical",
                        suitable_context: [
                          "Reports/presentations to stakeholders",
                          "Case study",
                          "Build notes"
                        ],
                        possible_reaction: "Make well-informed and rational decisions."
                      }
                    ],
                    note: "It is advisable to choose one tone for one writing material. The consistency in tone ensures clarity, engagement, and trust which increases the comprehension and impact of the message."
                  }
                ]
              },
              {
                title: "Diction",
                sections: [
                  {
                    section: "Introduction",
                    content: "Choosing the right words and phrases in writing is essential, as it directly influences the effectiveness and perception of the message. Precise diction and alignment of language can manage users' expectations, ensuring clarity and improving overall communication."
                  },
                  {
                    section: "Brand-related diction",
                    content: "These terms are commonly associated with the Setel brand, making them an integral part of the brand\u2019s identity. Therefore, it is strongly recommended to use these terms in writing materials for consistency and familiarity. A more comprehensive guide is available in the Setel Terminology file.",
                    terms: [
                      {
                        term: "One app, all vehicle needs.",
                        definition: "Setel main tagline that signifies the app as the perfect companion for vehicle owners.",
                        example: "You only need Setel - one app, all vehicle needs.",
                        alternative: "-"
                      },
                      {
                        term: "Fuelling",
                        definition: "Adding fuel into the vehicle tank.",
                        example: "Fuelling becomes more rewarding, only with Setel.",
                        alternative: "-"
                      },
                      {
                        term: "Seamless",
                        definition: "Performing an action smoothly, with minimal interruptions and difficulties.",
                        example: "Pay for fuel seamlessly using the Setel app.",
                        alternative: "Smooth, Hassle-free"
                      },
                      {
                        term: "Skip the queue",
                        definition: "An action which indicates convenience of not having to queue.",
                        example: "Skip the queue and pay for fuel from your vehicle instead.",
                        alternative: "-"
                      },
                      {
                        term: "Earn Mesra Rewards points",
                        definition: "Get rewarded with points upon performing selected transactions.",
                        example: "Earn up to 3x Mesra Rewards points only when you fuel with Setel.",
                        alternative: "Collect Mesra Rewards points"
                      },
                      {
                        term: "Pay for (noun)",
                        definition: "An action which indicates the ability to pay for a specific service using the Setel app.",
                        example: "Pay for fuel, Kedai Mesra and Caf\xE9 Mesra purchases, parking, and more",
                        alternative: "-"
                      },
                      {
                        term: "Convenient",
                        definition: "A situation that requires minimal effort.",
                        example: "The convenient way to pay for fuel.",
                        alternative: "Easy"
                      },
                      {
                        term: "Locate",
                        definition: "Find a place to perform a specific action.",
                        example: "Locate the nearest EV charger.",
                        alternative: "Find"
                      },
                      {
                        term: "Scan and pay",
                        definition: "Perform payments by scanning a QR code using the app.",
                        example: "Scan and pay for your groceries with Setel at selected stores.",
                        alternative: "-"
                      },
                      {
                        term: "Purchase (noun)",
                        definition: "The ability to buy a product or service using the app.",
                        example: "Purchase vehicle insurance easily through the app.",
                        alternative: "-"
                      },
                      {
                        term: "(Feature name) session",
                        definition: "A specific, organised period of time set aside for a particular activity or purpose.",
                        example: "Parking session starts now.",
                        alternative: "-"
                      },
                      {
                        term: "One-tap (verb)",
                        definition: "An activity that can be completed with a single click or touch.",
                        example: "One-tap fuelling.",
                        alternative: ""
                      },
                      {
                        term: "Scan and earn points",
                        definition: "An activity where individuals use a scanning method to accumulate rewards or points.",
                        example: "Scan and earn points when you pay with Setel.",
                        alternative: ""
                      }
                    ]
                  },
                  {
                    section: "Security-related diction",
                    content: "As a warm, friendly and caring brand, we need to address risky users or situations with clarity and empathy by avoiding terms that might sound judgmental or disciplinary. Terms such as blocked or fraud to avoid alerting fraudsters. Here\u2019s how we can convey messages to blocked users in a user-friendly and transparent way.",
                    do: [
                      "Your account is restricted from making any payments.",
                      "Your account is temporarily frozen due to security reasons.",
                      "Your account is under review for safety purposes."
                    ],
                    dont: [
                      "You can\u2019t make any payments because your account is blocked.",
                      "Your account has been disabled due to fraud.",
                      "Your account has been blocked due to suspicious activities."
                    ]
                  },
                  {
                    section: "Preferred terms",
                    content: "Some terms share the same meaning that can be used interchangeably. However, it is advisable to use these preferred terms for standardisation. This approach ensures consistency across all communication channels, reduces ambiguity, and reinforces the brand's identity.",
                    terms: [
                      {
                        preferred: "Mobile number",
                        avoid: "Phone number",
                        rationale: "Specifically refers to numbers associated with cell phones."
                      },
                      {
                        preferred: "Fuel",
                        avoid: "Petrol",
                        rationale: "An inclusive term that covers both petrol and diesel."
                      },
                      {
                        preferred: "e-(proper noun) e.g. e-Mail, e-KYC, e-Voucher",
                        avoid: "e(proper noun) e.g. eMail, eKYC, eVoucher.",
                        rationale: "It is best to hyphenate compound nouns."
                      },
                      {
                        preferred: "MyKad Identity card (IC)",
                        avoid: "NRIC",
                        rationale: "Malaysians are more familiar with the preferred term."
                      }
                    ]
                  },
                  {
                    section: "Common Calls-to-Action",
                    content: "A call-to-action (CTA) is a concise prompt that encourages users to take a specific action. Effective CTAs are clear, direct, and tailored to align with the audience's needs and the overall objectives of the content. Given the extensive nature of the app, a wide variety of CTAs are employed throughout the product. To ensure consistency and a seamless user experience, it is strongly recommended to refer to the provided table and utilise the standardised CTAs for their intended purposes. This approach helps maintain uniformity, enhances usability, and strengthens the app\u2019s overall coherence.",
                    ctas: [
                      {
                        call_to_action: "OKAY",
                        purpose: "Indicates acknowledgment or understanding of non-critical messages or instructions."
                      },
                      {
                        call_to_action: "LEARN MORE",
                        purpose: "Redirects the user to detailed information about a topic, product, or service."
                      },
                      {
                        call_to_action: "PROCEED",
                        purpose: "A confirmation to proceed with an important and critical action. Example: Proceed with payment."
                      },
                      {
                        call_to_action: "CONTINUE",
                        purpose: "An agreement to move forward with the action, commonly involve compliance and regulations. Example: I agree with the Terms and Conditions. Continue."
                      },
                      {
                        call_to_action: "NEXT",
                        purpose: "Advances the user to the subsequent step to complete a process."
                      },
                      {
                        call_to_action: "SKIP FOR NOW",
                        purpose: "Allows the user to postpone the current action or revisit it later."
                      },
                      {
                        call_to_action: "SUBMIT",
                        purpose: "Finalises and sends information."
                      },
                      {
                        call_to_action: "CHAT WITH US",
                        purpose: "Opens a live chat or messaging interface for user support or inquiries."
                      },
                      {
                        call_to_action: "TRY AGAIN",
                        purpose: "Restarts a failed process, task, or attempt for another try."
                      },
                      {
                        call_to_action: "CANCEL",
                        purpose: "Terminates the current process or action without saving changes."
                      },
                      {
                        call_to_action: "RETURN TO (PAGE)",
                        purpose: "Redirects the user to a specific page they previously accessed."
                      },
                      {
                        call_to_action: "GO BACK",
                        purpose: "Takes the user to the last page or step they visited."
                      },
                      {
                        call_to_action: "I UNDERSTAND",
                        purpose: "Acknowledges and confirms understanding or agreement without additional action."
                      },
                      {
                        call_to_action: "REFRESH",
                        purpose: "Checks for or add any changes to the page since it was last checked. Also known as partial update."
                      },
                      {
                        call_to_action: "RELOAD",
                        purpose: "Restarts the whole page again to show the latest or newest version."
                      },
                      {
                        call_to_action: "VISIT HELP CENTRE",
                        purpose: "Redirects the user to Setel\u2019s help centre web page which contains all the FAQs."
                      }
                    ]
                  }
                ]
              },
              {
                title: "Connotations",
                sections: [
                  {
                    section: "Introduction",
                    content: "Connotation refers to the emotional or cultural associations that a word or phrase carries beyond its literal meaning. It shapes how a message is perceived by invoking feelings, memories, or ideas into the readers. Using the right connotations is crucial because it ensures that the tone, intent, and impact of the message align with the audience's expectations and the brand's objectives. Misaligned connotations can lead to misunderstandings, unintended emotional responses, or even damage to a brand's image."
                  },
                  {
                    section: "Emotional connotations",
                    content: "Emotional connotations refer to the feelings or emotions a word or phrase evokes beyond its literal meaning.",
                    table: {
                      Positive: [
                        "Seamless",
                        "Cashless",
                        "Effortless",
                        "Secure",
                        "Rewarding",
                        "Innovative",
                        "User-friendly",
                        "Integrated",
                        "Hassle-free"
                      ],
                      Neutral: [
                        "Steady",
                        "Digital payment",
                        "Easy",
                        "Safe",
                        "Beneficial",
                        "Creative",
                        "Accessible",
                        "Unified",
                        "Simple"
                      ],
                      Negative: [
                        "Trouble-free",
                        "Non-cash",
                        "Unchallenging",
                        "Closed",
                        "Satisfying",
                        "Complex",
                        "Idiotproof",
                        "Homogenised",
                        "Unproblematic"
                      ]
                    }
                  },
                  {
                    section: "Cultural connotations",
                    content: "Cultural connotations in copywriting refer to the subtle meanings, associations, or emotional responses that words, phrases, or images carry within a particular cultural context. These connotations are shaped by shared experiences, traditions, values, social norms, and historical backgrounds of a specific group or community. Using culturally appropriate terms or symbols can create positive associations and strengthen a connection with the target audience, while using culturally insensitive language can lead to misunderstandings or even alienation.",
                    guidelines: [
                      {
                        title: "Cultural sensitivity",
                        description: "Certain words, symbols, or practices can carry different meanings in different cultures, so it\u2019s crucial to avoid language or imagery that may unintentionally offend or mislead the audience.",
                        example: "A pig, for example, is considered auspicious in the Chinese culture. However, it can be considered offensive for Malay Muslim audience."
                      },
                      {
                        title: "Regional variations",
                        description: "A word or phrase that has a positive connotation in one region may carry a negative or neutral connotation in another.",
                        example: "\u2018jantan\u2019 is socially acceptable in Kelantan but not in other parts of Malaysia."
                      },
                      {
                        title: "Traditions and values",
                        description: "Messaging should be aligned with cultural values and traditions.",
                        example: "Some Malaysian celebrations such as Deepavali or Hari Raya are associated with religious reflection, family, or gratitude, so an overly casual tone may not be well-received."
                      },
                      {
                        title: "Symbolism",
                        description: "Certain colours, images, or even gestures can evoke different feelings across cultures.",
                        example: "While dark blue may represent regality in Johor, it is associated with bad luck during Chinese New Year."
                      }
                    ]
                  }
                ]
              },
              {
                title: "Emoji",
                sections: [
                  {
                    section: "Introduction",
                    content: "Emojis are small digital images or icons used to express an idea, emotion, or concept in electronic communication. They are often used in text messages, social media posts, and other online platforms to convey feelings, reactions, or contextual information in a visually engaging way. Using emoji can enhance engagement and convey emotions or context in a fun, relatable way. However, their use must be deliberate to avoid miscommunication, overwhelming the message, or undermining the professionalism of the content."
                  },
                  {
                    section: "Emoji set",
                    table: [
                      {
                        emoji: "\u26FD",
                        name: "Fuel pump",
                        suitable_context: "Fuel-related content"
                      },
                      {
                        emoji: "\u{1F17F}\uFE0F",
                        name: "Park",
                        suitable_context: "Parking-related content"
                      },
                      {
                        emoji: "\u{1F699}",
                        name: "Sports utility vehicle",
                        suitable_context: "Driver, new vehicle, travelling"
                      },
                      {
                        emoji: "\u{1F50B}",
                        name: "Battery",
                        suitable_context: "EV charging, recharge energy"
                      },
                      {
                        emoji: "\u{1F4B0}",
                        name: "Money bag",
                        suitable_context: "Cashback, savings"
                      },
                      {
                        emoji: "\u25B6\uFE0F",
                        name: "Play button",
                        suitable_context: "Next, learn more, proceed"
                      },
                      {
                        emoji: ":blue_star:",
                        name: "Blue star",
                        suitable_context: "List of benefits, quotation marks alternative"
                      },
                      {
                        emoji: "\u2B50",
                        name: "Star",
                        suitable_context: "List of benefits, quotation marks"
                      },
                      {
                        emoji: "\u{1F4CC}",
                        name: "Pushpin",
                        suitable_context: "Footnote, for-your-information"
                      },
                      {
                        emoji: "\u2615",
                        name: "Hot beverage",
                        suitable_context: "Caf\xE9 Mesra hot beverage, buy/complimentary coffee at Caf\xE9 Mesra, Kedai Mesra, or registered merchants"
                      },
                      {
                        emoji: "\u{1F950}",
                        name: "Croissant",
                        suitable_context: "Buy/complimentary pastry at Caf\xE9 Mesra, Kedai Mesra, or registered merchants"
                      },
                      {
                        emoji: "\u{1F389}",
                        name: "Party popper",
                        suitable_context: "Congratulatory or celebrations"
                      },
                      {
                        emoji: "\u26A0\uFE0F",
                        name: "Warning",
                        suitable_context: "Warning, critical alerts (low wallet balance)"
                      },
                      {
                        emoji: "\u{1F381}",
                        name: "Wrapper gift",
                        suitable_context: "Complimentary items, exciting rewards"
                      }
                    ],
                    note: "It is encouraged to use blue coloured emoji to match the brand\u2019s identity and aesthetics."
                  },
                  {
                    section: "Emoji usage guidelines",
                    content: ""
                  }
                ]
              }
            ]
          },
          {
            title: "Translations",
            children: [
              {
                title: "Translation types",
                sections: [
                  {
                    section: "Introduction",
                    content: "In translation, different approaches are employed to ensure that the meaning and intent of the original text are effectively conveyed in the target language. Three common types of translation methods are literal translation, semantic translation, and phrasal translation. Each method serves a specific purpose and is used in different contexts depending on the content, the target audience, and the availability of equivalent vocabulary. Understanding the distinctions between these translation techniques is crucial for maintaining both accuracy and clarity while bridging linguistic and cultural gaps."
                  },
                  {
                    section: "Literal translation",
                    definition: "A literal translation refers to a direct, word-for-word translation of text from one language to another, maintaining the exact structure and meaning of the original words as closely as possible. This type of translation focuses on accuracy at the lexical level, without necessarily considering cultural nuances or idiomatic expressions.",
                    examples: [
                      {
                        source_copy: "Balance",
                        literal_translation: "Baki"
                      },
                      {
                        source_copy: "Rewards",
                        literal_translation: "Ganjaran"
                      },
                      {
                        source_copy: "In-app points redemption",
                        literal_translation: "Penebusan mata dalam aplikasi"
                      }
                    ]
                  },
                  {
                    section: "Semantics translation",
                    definition: "This kind of translation is related to the deeper meaning in language, including how words, phrases, sentences, and texts are interpreted. Semantic translation focuses on preserving the intended meaning or message, considering context, nuance, and connotation rather than just the literal definition. It involves finding the closest equivalent expression in the target language that conveys the same meaning.",
                    examples: [
                      {
                        source_copy: "Trusted device",
                        semantics_translation: "Telefon diiktiraf"
                      },
                      {
                        source_copy: "Top up",
                        semantics_translation: "Tambah nilai"
                      },
                      {
                        source_copy: "Payment history",
                        semantics_translation: "Rekod pembayaran"
                      }
                    ]
                  },
                  {
                    section: "Phrasal translation",
                    definition: "Phrasal translation occurs when a phrase is used instead of a single word due to the absence of a direct equivalent or suitable vocabulary in the target language, employing a more descriptive or explanatory approach.",
                    examples: [
                      {
                        source_copy: "Phone memory",
                        phrasal_translation: "Isi kandungan dalam telefon"
                      },
                      {
                        source_copy: "Every point counts",
                        phrasal_translation: "Setiap mata ada nilainya"
                      },
                      {
                        source_copy: "Merchant",
                        phrasal_translation: "Kedai yang menerima Setel"
                      },
                      {
                        source_copy: "Rooted device",
                        phrasal_translation: "Peranti yang telah diubah suai"
                      }
                    ]
                  }
                ]
              },
              {
                title: "Using loan words",
                sections: [
                  {
                    section: "Introduction",
                    content: "There are an abundance of loan words in Bahasa Melayu, mostly from English, Hindi, Tamil, and Arabic. Common loan words from English in the financial and digital industry include: equiti, elaun, insentif, kod, emel, log masuk, akses, objek, and many more."
                  },
                  {
                    section: "Guidelines for using loan words",
                    content: [
                      "Loan words can be used at any time as long as they are semantically accurate and recognised by Pusat Rujukan Persuratan Melayu, Dewan Bahasa dan Pustaka.",
                      "Use this website to cross check:",
                      "Prioritise actual Bahasa Melayu terms before considering loan words as a form of respect to the language, linguists, and native speakers."
                    ]
                  },
                  {
                    section: "When to consider using loan words",
                    list: [
                      "It is a broadly used, common term within the industry and the country as a whole.",
                      "When the Bahasa Melayu translation is a phrase and not a word."
                    ]
                  },
                  {
                    section: "Examples",
                    table: [
                      {
                        source_copy: "Phone memory",
                        literal_translation: "Ingatan telefon",
                        semantics_translation: "Isi kandungan dalam telefon",
                        loan_word: "Memori telefon"
                      },
                      {
                        source_copy: "Log in",
                        literal_translation: "Daftar masuk",
                        semantics_translation: "-",
                        loan_word: "Log masuk"
                      },
                      {
                        source_copy: "Pocket money",
                        literal_translation: "Duit kocek",
                        semantics_translation: "Pendapatan tambahan",
                        loan_word: "Duit poket"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  // src/code.ts
  var describeError = (err) => err && err.message ? String(err.message) : String(err);
  var describeGuideline = (guide) => {
    if (!guide) return "";
    if (typeof guide === "string") return guide;
    try {
      return JSON.stringify(guide, null, 2);
    } catch (err) {
      return String(guide) || String(err);
    }
  };
  var buildRewriteInstructions = (guide) => {
    if (!guide || typeof guide !== "object") return "You are a UX writing assistant.";
    const promptCfg = guide.rewritePrompt || {};
    const overview = typeof promptCfg.overview === "string" && promptCfg.overview.trim().length ? promptCfg.overview.trim() : "You are a UX writing assistant.";
    const requirements = Array.isArray(promptCfg.requirements) ? promptCfg.requirements.filter(
      (item) => typeof item === "string" && item.trim().length > 0
    ) : [];
    const enrichedRequirements = [];
    const pushRequirement = (value) => {
      if (!value) return;
      const trimmed = value.trim();
      if (trimmed.length) enrichedRequirements.push(trimmed);
    };
    const tonePreference = guide.tonePreference;
    const toneList = Array.isArray(tonePreference) ? tonePreference : typeof tonePreference === "string" && tonePreference.trim().length ? [tonePreference] : [];
    const normalizedTones = toneList.map((tone) => typeof tone === "string" ? tone.trim() : "").filter((tone) => Boolean(tone));
    if (normalizedTones.length) {
      pushRequirement(`Match these tones: ${normalizedTones.join(", ")}.`);
    }
    const styleFilters = guide.styleFilters || {};
    if (styleFilters && typeof styleFilters === "object") {
      const elementName = typeof styleFilters.element === "string" && styleFilters.element.trim().length ? styleFilters.element.trim() : "";
      if (elementName) {
        pushRequirement(`This copy is for a ${elementName.toLowerCase()} use case.`);
      }
      if (typeof styleFilters.length === "number" && !Number.isNaN(styleFilters.length)) {
        const idealLength = Math.max(5, Math.round(styleFilters.length));
        const tolerance = Math.max(4, Math.round(idealLength * 0.1));
        const minLength = Math.max(5, idealLength - tolerance);
        const maxLength = idealLength + tolerance;
        pushRequirement(
          `Each variant must be between ${minLength} and ${maxLength} characters (spaces included). Prioritize staying within this range over preserving the original wording.`
        );
      }
    }
    const usageContext = typeof guide.usageContext === "string" ? guide.usageContext.trim() : "";
    if (usageContext) {
      pushRequirement(`Follow this context and custom guidance: ${usageContext}`);
    }
    const finalRequirements = [...requirements, ...enrichedRequirements];
    const joinedRequirements = finalRequirements.length ? finalRequirements.map((req) => "- " + req).join("\n") + "\n\n" : "\n";
    return overview + "\n" + joinedRequirements;
  };
  var loadFontsForNode = async (node) => {
    const uniqueFonts = [];
    const registerFont = (font) => {
      if (!font || font === figma.mixed) return;
      if (!uniqueFonts.some((item) => item.family === font.family && item.style === font.style)) {
        uniqueFonts.push(font);
      }
    };
    if (node.fontName === figma.mixed) {
      const length = node.characters.length;
      if (length > 0) {
        const fonts = node.getRangeAllFontNames(0, length);
        fonts.forEach((font) => registerFont(font));
      }
    } else {
      registerFont(node.fontName);
    }
    for (const font of uniqueFonts) {
      await figma.loadFontAsync(font);
    }
  };
  var loadFontsForNode = async (node) => {
    const uniqueFonts = [];
    const registerFont = (font) => {
      if (font === figma.mixed) return;
      if (!uniqueFonts.some((item) => item.family === font.family && item.style === font.style)) {
        uniqueFonts.push(font);
      }
    };
    if (node.fontName === figma.mixed) {
      const length = node.characters.length;
      if (length > 0) {
        const fonts = node.getRangeAllFontNames(0, length);
        fonts.forEach((font) => registerFont(font));
      } else {
        registerFont(node.fontName);
      }
    } else {
      registerFont(node.fontName);
    }
    for (const font of uniqueFonts) {
      await figma.loadFontAsync(font);
    }
  };
  figma.on("run", () => {
    figma.showUI(__html__, { width: 400, height: 600 });
    figma.ui.postMessage({
      type: "guideline-default",
      guideline: guideline_default
    });
    const sendSelectionToUI = () => {
      const selection = figma.currentPage.selection;
      for (const node of selection) {
        if (node.type === "TEXT") {
          const text = String(node.characters || "");
          figma.ui.postMessage({
            type: "selection-text",
            text
          });
          return;
        }
      }
      figma.ui.postMessage({ type: "selection-text", text: "" });
    };
    sendSelectionToUI();
    figma.on("selectionchange", sendSelectionToUI);
    figma.ui.onmessage = async (msg) => {
      try {
        if (!msg || !msg.type) return;
        if (msg.type === "request-guideline") {
          figma.ui.postMessage({
            type: "guideline-default",
            guideline: guideline_default
          });
          return;
        }
        if (msg.type === "save-key") {
          const keyToSave = String(msg.key || "");
          try {
            await figma.clientStorage.setAsync("gemini_api_key", keyToSave);
            figma.ui.postMessage({ type: "key-saved", key: keyToSave });
          } catch (e) {
            figma.ui.postMessage({
              type: "key-saved",
              key: keyToSave,
              error: describeError(e)
            });
          }
          return;
        }
        if (msg.type === "load-key") {
          try {
            const saved = await figma.clientStorage.getAsync("gemini_api_key") || "";
            figma.ui.postMessage({ type: "key-loaded", key: String(saved) });
          } catch (e) {
            figma.ui.postMessage({
              type: "key-loaded",
              key: "",
              error: describeError(e)
            });
          }
          return;
        }
      if (msg.type === "rewrite") {
          const key = String(msg.key || "");
          const text = String(msg.text || "");
          const guideline = msg.guideline || guideline_default;
          let output = "";
          let encounteredError = false;
          try {
            const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=" + encodeURIComponent(key);
            const guidelineText = describeGuideline(guideline);
            const rewriteInstructions = buildRewriteInstructions(guideline);
            const prompt = rewriteInstructions + "Return exactly five unique variants as a numbered list (1.-5.) with no extra commentary.\n\n" + (guidelineText ? "Writing guideline:\n" + guidelineText + "\n\n" : "") + "User copy:\n" + text;
            const body = {
              contents: [
                {
                  parts: [
                    {
                      text: prompt
                    }
                  ]
                }
              ]
            };
            const res = await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
            });
            if (!res.ok) {
              encounteredError = true;
              output = "API error " + res.status + ": " + await res.text();
            } else {
              const data = await res.json();
              let textOut = "";
              if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
                textOut = String(data.candidates[0].content.parts[0].text);
              }
              output = textOut ? textOut.trim() : "No response.";
            }
          } catch (err) {
            const msgErr = err && err.message ? String(err.message) : String(err);
            encounteredError = true;
            output = "Request failed: " + msgErr;
          }
        figma.ui.postMessage({ type: "rewrite-done", output, error: encounteredError });
        return;
      }
      if (msg.type === "apply-text") {
        const nextText = typeof msg.text === "string" ? msg.text : "";
        if (!nextText.trim().length) {
          figma.notify("Suggestion is empty. Select another option.");
          return;
        }
        const textNode = figma.currentPage.selection.find(
          (node) => node.type === "TEXT"
        );
        if (!textNode) {
          figma.notify("Select a text layer in Figma to apply the copy.");
          return;
        }
        try {
          await loadFontsForNode(textNode);
          textNode.characters = nextText;
          figma.ui.postMessage({ type: "selection-text", text: nextText });
          figma.notify("Copy applied to your selection.");
        } catch (err) {
          figma.notify("Couldn't apply copy: " + describeError(err));
        }
        return;
      }
        if (msg.type === "apply-text") {
          const nextText = typeof msg.text === "string" ? msg.text : "";
          if (!nextText.trim().length) {
            figma.notify("Suggestion is empty. Select another option.");
            return;
          }
          const textNode = figma.currentPage.selection.find(
            (node) => node.type === "TEXT"
          );
          if (!textNode) {
            figma.notify("Select a text layer in Figma to apply the copy.");
            return;
          }
          try {
            await loadFontsForNode(textNode);
            textNode.characters = nextText;
            figma.ui.postMessage({ type: "selection-text", text: nextText });
            figma.notify("Copy applied to your selection.");
          } catch (err) {
            figma.notify("Couldn't apply copy: " + describeError(err));
          }
          return;
        }
      } catch (e) {
        figma.ui.postMessage({ type: "error", error: describeError(e) });
      }
    };
  });
})();
