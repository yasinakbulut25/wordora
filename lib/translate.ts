"use client";

import { useLangStore } from "@/store/useLangStore";

export const useTranslate = () => {
  const lang = useLangStore((s) => s.lang); // reaktif!

  return (value: string) => {
    const sentence = TRANSLATE.find((t) => t.value === value);
    return sentence ? sentence[lang] : "...";
  };
};

export const TRANSLATE = [
  {
    value: "CONTINUE_PROGRESS",
    EN: "Continue Your Progress",
    TR: "İlerlemenize Devam Edin",
  },
  {
    value: "SELECT_LEVEL_DESC",
    EN: "Pick your level and keep improving your English step by step.",
    TR: "Seviyeni seç ve adım adım İngilizceni geliştirmeye devam et.",
  },
  {
    value: "LEVEL_A1_DESC",
    EN: "Beginner",
    TR: "Başlangıç",
  },
  {
    value: "LEVEL_A2_DESC",
    EN: "Elementary",
    TR: "Temel Seviye",
  },
  {
    value: "LEVEL_B1_DESC",
    EN: "Intermediate",
    TR: "Orta Seviye",
  },
  {
    value: "LEVEL_B2_DESC",
    EN: "Upper Intermediate",
    TR: "Orta-Üst Seviye",
  },
  {
    value: "LEVEL_C1_DESC",
    EN: "Advanced",
    TR: "İleri Seviye",
  },
  {
    value: "LEVEL_C2_DESC",
    EN: "Proficiency",
    TR: "Uzmanlık",
  },
  {
    value: "LEVEL_TOTAL_WORDS",
    EN: "words",
    TR: "kelime",
  },
  {
    value: "LEVEL_PROGRESS",
    EN: "progress",
    TR: "ilerleme",
  },
  {
    value: "CONTINUE",
    EN: "Continue",
    TR: "Devam et",
  },
  {
    value: "LEVEL_HEADER_BACK_TITLE",
    EN: "Home",
    TR: "Ana Menü",
  },
  {
    value: "LEVEL_WELCOME_TITLE",
    EN: "Welcome to Your Journey!",
    TR: "Yolculuğuna Hoş Geldin!",
  },
  {
    value: "LEVEL_WELCOME_DESC",
    EN: "Progress at your own pace, learn new words, practice, and strengthen your skills.",
    TR: "Kendi hızında ilerle, yeni kelimeler öğren, pratik yap ve seviyeni güçlendir.",
  },
  {
    value: "MODE_LEARN_TITLE",
    EN: "Learn Words",
    TR: "Kelimeleri Öğren",
  },
  {
    value: "MODE_LEARN_DESC",
    EN: "Explore meanings and example sentences.",
    TR: "Kelimelerin anlamlarını ve örnek cümlelerini incele.",
  },

  {
    value: "MODE_QUIZ_TITLE",
    EN: "10-Question Quiz",
    TR: "10 Soruluk Quiz",
  },
  {
    value: "MODE_QUIZ_DESC",
    EN: "Test your vocabulary knowledge.",
    TR: "Kelime bilginizi test edin.",
  },
  {
    value: "MODE_TRANSLATE_TITLE",
    EN: "Sentence Translation",
    TR: "Cümle Çevirme",
  },
  {
    value: "MODE_TRANSLATE_DESC",
    EN: "Practice translation using sentences.",
    TR: "Cümleler ile çeviri pratiği yapın.",
  },
  {
    value: "MODE_FILL_TITLE",
    EN: "Fill in the Blanks",
    TR: "Boşluk Doldurma",
  },
  {
    value: "MODE_FILL_DESC",
    EN: "Complete the missing word correctly.",
    TR: "Eksik kelimeyi doğru tamamlayın.",
  },
  {
    value: "MODE_BACK_TITLE",
    EN: "Select Level",
    TR: "Level Seç",
  },
  {
    value: "WORDS_LEARN_TITLE",
    EN: "Learn Words",
    TR: "Kelimeleri Öğren",
  },
  {
    value: "WORDS_LOADING",
    EN: "Data is loading...",
    TR: "Veriler yükleniyor...",
  },
  {
    value: "WORDS_LEVEL_LEARNING",
    EN: "Level Learning",
    TR: "Seviye öğrenme",
  },
  {
    value: "WORDS_SHOW_MEANING",
    EN: "Show Meaning",
    TR: "Çevirisini Göster",
  },
  {
    value: "WORDS_EXAMPLES",
    EN: "Example Sentences",
    TR: "Örnek Cümleler",
  },
  {
    value: "WORDS_LEARNED",
    EN: "Word Learned",
    TR: "Kelime Öğrenildi",
  },
  {
    value: "WORDS_MARK_LEARNED",
    EN: "Mark as Learned",
    TR: "Öğrenildi İşaretle",
  },
  {
    value: "WORDS_TRANSLATION",
    EN: "Translation",
    TR: "Çeviri",
  },
  {
    value: "WORDS_SHOW_TRANSLATION",
    EN: "Show Translation",
    TR: "Çeviriyi Göster",
  },
  {
    value: "WORDS_PREV_WORD",
    EN: "Previous Word",
    TR: "Önceki Kelime",
  },
  {
    value: "WORDS_NEXT_WORD",
    EN: "Next Word",
    TR: "Sonraki Kelime",
  },
  {
    value: "QUIZ_TITLE",
    EN: "10-Question Quiz",
    TR: "10 Soruluk Quiz",
  },
  {
    value: "QUIZ_LOADING",
    EN: "Questions are loading...",
    TR: "Sorular yükleniyor...",
  },
  {
    value: "QUIZ_QUESTION",
    EN: "Question",
    TR: "Soru",
  },
  {
    value: "QUIZ_LEVEL",
    EN: "Level",
    TR: "Level",
  },
  {
    value: "QUIZ_SHOW_RESULTS",
    EN: "View Results",
    TR: "Sonuçları Gör",
  },
  {
    value: "QUIZ_NEXT_QUESTION",
    EN: "Next Question",
    TR: "Sonraki Soru",
  },
  {
    value: "QUIZ_FINISHED_TITLE",
    EN: "You successfully completed the quiz 🎉",
    TR: "Quiz'i başarıyla tamamladın 🎉",
  },
  {
    value: "TRANSLATE_TITLE",
    EN: "Sentence Translation",
    TR: "Cümle Çevirme",
  },
  {
    value: "TRANSLATE_LOADING",
    EN: "Sentences are loading...",
    TR: "Cümleler yükleniyor...",
  },
  {
    value: "TRANSLATE_SWITCH",
    EN: "Switch Language",
    TR: "Dili Değiştir",
  },
  {
    value: "TRANSLATE_SHOW",
    EN: "Show Translation",
    TR: "Çeviriyi Göster",
  },
  {
    value: "TRANSLATE_PREVIOUS",
    EN: "Previous",
    TR: "Önceki",
  },
  {
    value: "TRANSLATE_NEXT",
    EN: "Next",
    TR: "Sonraki",
  },
  {
    value: "TRANSLATE_LAST",
    EN: "Last Sentence",
    TR: "Son Cümle",
  },
  {
    value: "TRANSLATE_SENTENCE_COUNT",
    EN: "sentence",
    TR: "cümle",
  },
  {
    value: "TRANSLATE_SAVE_FAV",
    EN: "This feature will be added soon.",
    TR: "Listeye ekleme özelliği daha sonra eklenecek.",
  },
  {
    value: "FILL_TITLE",
    EN: "Fill in the Blanks",
    TR: "Boşluk Doldurma",
  },
  {
    value: "FILL_LOADING",
    EN: "Questions are loading...",
    TR: "Sorular yükleniyor...",
  },
  {
    value: "FILL_QUESTION",
    EN: "Question",
    TR: "Soru",
  },
  {
    value: "FILL_LEVEL",
    EN: "Level",
    TR: "Level",
  },
  {
    value: "FILL_SHOW_RESULTS",
    EN: "View Results",
    TR: "Sonuçları Gör",
  },
  {
    value: "FILL_NEXT_QUESTION",
    EN: "Next Question",
    TR: "Sonraki Soru",
  },
  {
    value: "FILL_FINISHED_TITLE",
    EN: "You completed the exercise 🎉",
    TR: "Alıştırmayı tamamladın 🎉",
  },
  {
    value: "FILL_SENTENCE_TRANSLATION",
    EN: "Translation",
    TR: "Çeviri",
  },
];
