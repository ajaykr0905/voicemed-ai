export interface Language {
  code: string;
  name: string;
  nativeName: string;
  whisperCode: string;
}

export const languages: Language[] = [
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", whisperCode: "hi" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", whisperCode: "bn" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", whisperCode: "te" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", whisperCode: "mr" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", whisperCode: "ta" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", whisperCode: "gu" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", whisperCode: "kn" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", whisperCode: "ml" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", whisperCode: "or" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", whisperCode: "pa" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", whisperCode: "as" },
  { code: "ur", name: "Urdu", nativeName: "اردو", whisperCode: "ur" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", whisperCode: "ne" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्", whisperCode: "sa" },
  { code: "sd", name: "Sindhi", nativeName: "سنڌي", whisperCode: "sd" },
  { code: "ks", name: "Kashmiri", nativeName: "कॉशुर", whisperCode: "hi" },
  { code: "doi", name: "Dogri", nativeName: "डोगरी", whisperCode: "hi" },
  { code: "kok", name: "Konkani", nativeName: "कोंकणी", whisperCode: "hi" },
  { code: "mni", name: "Manipuri", nativeName: "মৈতৈলোন্", whisperCode: "bn" },
  { code: "brx", name: "Bodo", nativeName: "बड़ो", whisperCode: "hi" },
  { code: "sat", name: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ", whisperCode: "hi" },
  { code: "en", name: "English", nativeName: "English", whisperCode: "en" },
];

export const primaryLanguages = languages.filter((l) =>
  ["hi", "en", "bn", "te", "mr", "ta", "gu", "kn", "ml", "pa", "ur"].includes(l.code),
);
