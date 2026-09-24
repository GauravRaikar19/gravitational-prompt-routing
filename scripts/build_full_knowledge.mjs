import fs from 'fs';
import path from 'path';

const OUT_PATH = path.resolve('docs/js/knowledge_base.js');

// 1. All 195 Sovereign Countries & Capitals
const COUNTRIES_DATA = [
  ["Afghanistan", "Kabul", "Afghani (AFN)", "Pashto, Dari", "Asia"],
  ["Albania", "Tirana", "Lek (ALL)", "Albanian", "Europe"],
  ["Algeria", "Algiers", "Algerian Dinar (DZD)", "Arabic, Berber", "Africa"],
  ["Andorra", "Andorra la Vella", "Euro (EUR)", "Catalan", "Europe"],
  ["Angola", "Luanda", "Kwanza (AOA)", "Portuguese", "Africa"],
  ["Antigua and Barbuda", "Saint John's", "East Caribbean Dollar (XCD)", "English", "North America"],
  ["Argentina", "Buenos Aires", "Argentine Peso (ARS)", "Spanish", "South America"],
  ["Armenia", "Yerevan", "Armenian Dram (AMD)", "Armenian", "Asia"],
  ["Australia", "Canberra", "Australian Dollar (AUD)", "English", "Oceania"],
  ["Austria", "Vienna", "Euro (EUR)", "German", "Europe"],
  ["Azerbaijan", "Baku", "Azerbaijani Manat (AZN)", "Azerbaijani", "Asia"],
  ["Bahamas", "Nassau", "Bahamian Dollar (BSD)", "English", "North America"],
  ["Bahrain", "Manama", "Bahraini Dinar (BHD)", "Arabic", "Asia"],
  ["Bangladesh", "Dhaka", "Bangladeshi Taka (BDT)", "Bengali", "Asia"],
  ["Barbados", "Bridgetown", "Barbadian Dollar (BBD)", "English", "North America"],
  ["Belarus", "Minsk", "Belarusian Ruble (BYN)", "Belarusian, Russian", "Europe"],
  ["Belgium", "Brussels", "Euro (EUR)", "Dutch, French, German", "Europe"],
  ["Belize", "Belmopan", "Belize Dollar (BZD)", "English", "North America"],
  ["Benin", "Porto-Novo", "West African CFA Franc (XOF)", "French", "Africa"],
  ["Bhutan", "Thimphu", "Ngultrum (BTN)", "Dzongkha", "Asia"],
  ["Bolivia", "Sucre (constitutional), La Paz (seat of gov)", "Boliviano (BOB)", "Spanish, Quechua, Aymara", "South America"],
  ["Bosnia and Herzegovina", "Sarajevo", "Convertible Mark (BAM)", "Bosnian, Croatian, Serbian", "Europe"],
  ["Botswana", "Gaborone", "Pula (BWP)", "English, Setswana", "Africa"],
  ["Brazil", "Brasília", "Brazilian Real (BRL)", "Portuguese", "South America"],
  ["Brunei", "Bandar Seri Begawan", "Brunei Dollar (BND)", "Malay", "Asia"],
  ["Bulgaria", "Sofia", "Bulgarian Lev (BGN)", "Bulgarian", "Europe"],
  ["Burkina Faso", "Ouagadougou", "West African CFA Franc (XOF)", "French", "Africa"],
  ["Burundi", "Gitega", "Burundian Franc (BIF)", "Kirundi, French, English", "Africa"],
  ["Cabo Verde", "Praia", "Cape Verdean Escudo (CVE)", "Portuguese", "Africa"],
  ["Cambodia", "Phnom Penh", "Riel (KHR)", "Khmer", "Asia"],
  ["Cameroon", "Yaoundé", "Central African CFA Franc (XAF)", "French, English", "Africa"],
  ["Canada", "Ottawa", "Canadian Dollar (CAD)", "English, French", "North America"],
  ["Central African Republic", "Bangui", "Central African CFA Franc (XAF)", "Sango, French", "Africa"],
  ["Chad", "N'Djamena", "Central African CFA Franc (XAF)", "French, Arabic", "Africa"],
  ["Chile", "Santiago", "Chilean Peso (CLP)", "Spanish", "South America"],
  ["China", "Beijing", "Renminbi / Yuan (CNY)", "Standard Chinese (Mandarin)", "Asia"],
  ["Colombia", "Bogotá", "Colombian Peso (COP)", "Spanish", "South America"],
  ["Comoros", "Moroni", "Comorian Franc (KMF)", "Comorian, French, Arabic", "Africa"],
  ["Congo (Democratic Republic of)", "Kinshasa", "Congolese Franc (CDF)", "French", "Africa"],
  ["Congo (Republic of)", "Brazzaville", "Central African CFA Franc (XAF)", "French", "Africa"],
  ["Costa Rica", "San José", "Costa Rican Colón (CRC)", "Spanish", "North America"],
  ["Croatia", "Zagreb", "Euro (EUR)", "Croatian", "Europe"],
  ["Cuba", "Havana", "Cuban Peso (CUP)", "Spanish", "North America"],
  ["Cyprus", "Nicosia", "Euro (EUR)", "Greek, Turkish", "Europe"],
  ["Czech Republic (Czechia)", "Prague", "Czech Koruna (CZK)", "Czech", "Europe"],
  ["Denmark", "Copenhagen", "Danish Krone (DKK)", "Danish", "Europe"],
  ["Djibouti", "Djibouti", "Djiboutian Franc (DJF)", "Arabic, French", "Africa"],
  ["Dominica", "Roseau", "East Caribbean Dollar (XCD)", "English", "North America"],
  ["Dominican Republic", "Santo Domingo", "Dominican Peso (DOP)", "Spanish", "North America"],
  ["Ecuador", "Quito", "United States Dollar (USD)", "Spanish", "South America"],
  ["Egypt", "Cairo", "Egyptian Pound (EGP)", "Arabic", "Africa"],
  ["El Salvador", "San Salvador", "United States Dollar (USD)", "Spanish", "North America"],
  ["Equatorial Guinea", "Malabo", "Central African CFA Franc (XAF)", "Spanish, French, Portuguese", "Africa"],
  ["Eritrea", "Asmara", "Nakfa (ERN)", "Tigrinya, Arabic, English", "Africa"],
  ["Estonia", "Tallinn", "Euro (EUR)", "Estonian", "Europe"],
  ["Eswatini", "Mbabane (administrative), Lobamba (royal)", "Lilangeni (SZL)", "Swazi, English", "Africa"],
  ["Ethiopia", "Addis Ababa", "Ethiopian Birr (ETB)", "Amharic", "Africa"],
  ["Fiji", "Suva", "Fijian Dollar (FJD)", "English, Fijian, Fiji Hindi", "Oceania"],
  ["Finland", "Helsinki", "Euro (EUR)", "Finnish, Swedish", "Europe"],
  ["France", "Paris", "Euro (EUR)", "French", "Europe"],
  ["Gabon", "Libreville", "Central African CFA Franc (XAF)", "French", "Africa"],
  ["Gambia", "Banjul", "Dalasi (GMD)", "English", "Africa"],
  ["Georgia", "Tbilisi", "Georgian Lari (GEL)", "Georgian", "Asia"],
  ["Germany", "Berlin", "Euro (EUR)", "German", "Europe"],
  ["Ghana", "Accra", "Ghanaian Cedi (GHS)", "English", "Africa"],
  ["Greece", "Athens", "Euro (EUR)", "Greek", "Europe"],
  ["Grenada", "Saint George's", "East Caribbean Dollar (XCD)", "English", "North America"],
  ["Guatemala", "Guatemala City", "Guatemalan Quetzal (GTQ)", "Spanish", "North America"],
  ["Guinea", "Conakry", "Guinean Franc (GNF)", "French", "Africa"],
  ["Guinea-Bissau", "Bissau", "West African CFA Franc (XOF)", "Portuguese", "Africa"],
  ["Guyana", "Georgetown", "Guyanese Dollar (GYD)", "English", "South America"],
  ["Haiti", "Port-au-Prince", "Haitian Gourde (HTG)", "Haitian Creole, French", "North America"],
  ["Honduras", "Tegucigalpa", "Honduran Lempira (HNL)", "Spanish", "North America"],
  ["Hungary", "Budapest", "Hungarian Forint (HUF)", "Hungarian", "Europe"],
  ["Iceland", "Reykjavik", "Icelandic Króna (ISK)", "Icelandic", "Europe"],
  ["India", "New Delhi", "Indian Rupee (INR / ₹)", "Hindi, English (22 scheduled languages)", "Asia"],
  ["Indonesia", "Jakarta (transitioning to Nusantara)", "Indonesian Rupiah (IDR)", "Indonesian", "Asia"],
  ["Iran", "Tehran", "Iranian Rial (IRR)", "Persian", "Asia"],
  ["Iraq", "Baghdad", "Iraqi Dinar (IQD)", "Arabic, Kurdish", "Asia"],
  ["Ireland", "Dublin", "Euro (EUR)", "Irish, English", "Europe"],
  ["Israel", "Jerusalem", "Israeli New Shekel (ILS)", "Hebrew", "Asia"],
  ["Italy", "Rome", "Euro (EUR)", "Italian", "Europe"],
  ["Ivory Coast (Côte d'Ivoire)", "Yamoussoukro", "West African CFA Franc (XOF)", "French", "Africa"],
  ["Jamaica", "Kingston", "Jamaican Dollar (JMD)", "English", "North America"],
  ["Japan", "Tokyo", "Japanese Yen (JPY / ¥)", "Japanese", "Asia"],
  ["Jordan", "Amman", "Jordanian Dinar (JOD)", "Arabic", "Asia"],
  ["Kazakhstan", "Astana", "Kazakhstani Tenge (KZT)", "Kazakh, Russian", "Asia"],
  ["Kenya", "Nairobi", "Kenyan Shilling (KES)", "Swahili, English", "Africa"],
  ["Kiribati", "South Tarawa", "Australian Dollar / Kiribati Dollar", "English, Gilbertese", "Oceania"],
  ["Kuwait", "Kuwait City", "Kuwaiti Dinar (KWD)", "Arabic", "Asia"],
  ["Kyrgyzstan", "Bishkek", "Kyrgyzstani Som (KGS)", "Kyrgyz, Russian", "Asia"],
  ["Laos", "Vientiane", "Lao Kip (LAK)", "Lao", "Asia"],
  ["Latvia", "Riga", "Euro (EUR)", "Latvian", "Europe"],
  ["Lebanon", "Beirut", "Lebanese Pound (LBP)", "Arabic", "Asia"],
  ["Lesotho", "Maseru", "Lesotho Loti (LSL)", "Sesotho, English", "Africa"],
  ["Liberia", "Monrovia", "Liberian Dollar (LRD)", "English", "Africa"],
  ["Libya", "Tripoli", "Libyan Dinar (LYD)", "Arabic", "Africa"],
  ["Liechtenstein", "Vaduz", "Swiss Franc (CHF)", "German", "Europe"],
  ["Lithuania", "Vilnius", "Euro (EUR)", "Lithuanian", "Europe"],
  ["Luxembourg", "Luxembourg City", "Euro (EUR)", "Luxembourgish, French, German", "Europe"],
  ["Madagascar", "Antananarivo", "Malagasy Ariary (MGA)", "Malagasy, French", "Africa"],
  ["Malawi", "Lilongwe", "Malawian Kwacha (MWK)", "English, Chichewa", "Africa"],
  ["Malaysia", "Kuala Lumpur (federal), Putrajaya (administrative)", "Malaysian Ringgit (MYR)", "Malay", "Asia"],
  ["Maldives", "Malé", "Maldivian Rufiyaa (MVR)", "Dhivehi", "Asia"],
  ["Mali", "Bamako", "West African CFA Franc (XOF)", "Bambara (official national language)", "Africa"],
  ["Malta", "Valletta", "Euro (EUR)", "Maltese, English", "Europe"],
  ["Marshall Islands", "Majuro", "United States Dollar (USD)", "Marshallese, English", "Oceania"],
  ["Mauritania", "Nouakchott", "Mauritanian Ouguiya (MRU)", "Arabic", "Africa"],
  ["Mauritius", "Port Louis", "Mauritian Rupee (MUR)", "English, French", "Africa"],
  ["Mexico", "Mexico City", "Mexican Peso (MXN)", "Spanish", "North America"],
  ["Micronesia", "Palikir", "United States Dollar (USD)", "English", "Oceania"],
  ["Moldova", "Chișinău", "Moldovan Leu (MDL)", "Romanian", "Europe"],
  ["Monaco", "Monaco", "Euro (EUR)", "French", "Europe"],
  ["Mongolia", "Ulaanbaatar", "Mongolian Tögrög (MNT)", "Mongolian", "Asia"],
  ["Montenegro", "Podgorica", "Euro (EUR)", "Montenegrin", "Europe"],
  ["Morocco", "Rabat", "Moroccan Dirham (MAD)", "Arabic, Berber", "Africa"],
  ["Mozambique", "Maputo", "Mozambican Metical (MZN)", "Portuguese", "Africa"],
  ["Myanmar (Burma)", "Naypyidaw", "Kyat (MMK)", "Burmese", "Asia"],
  ["Namibia", "Windhoek", "Namibian Dollar (NAD)", "English", "Africa"],
  ["Nauru", "Yaren (de facto district)", "Australian Dollar (AUD)", "Nauruan, English", "Oceania"],
  ["Nepal", "Kathmandu", "Nepalese Rupee (NPR)", "Nepali", "Asia"],
  ["Netherlands", "Amsterdam (constitutional), The Hague (seat of government)", "Euro (EUR)", "Dutch", "Europe"],
  ["New Zealand", "Wellington", "New Zealand Dollar (NZD)", "English, Māori, NZ Sign Language", "Oceania"],
  ["Nicaragua", "Managua", "Nicaraguan Córdoba (NIO)", "Spanish", "North America"],
  ["Niger", "Niamey", "West African CFA Franc (XOF)", "French", "Africa"],
  ["Nigeria", "Abuja", "Nigerian Naira (NGN)", "English", "Africa"],
  ["North Korea", "Pyongyang", "North Korean Won (KPW)", "Korean", "Asia"],
  ["North Macedonia", "Skopje", "Macedonian Denar (MKD)", "Macedonian, Albanian", "Europe"],
  ["Norway", "Oslo", "Norwegian Krone (NOK)", "Norwegian", "Europe"],
  ["Oman", "Muscat", "Omani Rial (OMR)", "Arabic", "Asia"],
  ["Pakistan", "Islamabad", "Pakistani Rupee (PKR)", "Urdu, English", "Asia"],
  ["Palau", "Ngerulmud", "United States Dollar (USD)", "Palauan, English", "Oceania"],
  ["Panama", "Panama City", "Panamanian Balboa (PAB), US Dollar", "Spanish", "North America"],
  ["Papua New Guinea", "Port Moresby", "Papua New Guinean Kina (PGK)", "English, Tok Pisin, Hiri Motu", "Oceania"],
  ["Paraguay", "Asunción", "Paraguayan Guaraní (PYG)", "Spanish, Guaraní", "South America"],
  ["Peru", "Lima", "Peruvian Sol (PEN)", "Spanish, Quechua, Aymara", "South America"],
  ["Philippines", "Manila", "Philippine Peso (PHP)", "Filipino, English", "Asia"],
  ["Poland", "Warsaw", "Polish Złoty (PLN)", "Polish", "Europe"],
  ["Portugal", "Lisbon", "Euro (EUR)", "Portuguese", "Europe"],
  ["Qatar", "Doha", "Qatari Riyal (QAR)", "Arabic", "Asia"],
  ["Romania", "Bucharest", "Romanian Leu (RON)", "Romanian", "Europe"],
  ["Russia", "Moscow", "Russian Ruble (RUB)", "Russian", "Europe / Asia"],
  ["Rwanda", "Kigali", "Rwandan Franc (RWF)", "Kinyarwanda, French, English, Swahili", "Africa"],
  ["Saint Kitts and Nevis", "Basseterre", "East Caribbean Dollar (XCD)", "English", "North America"],
  ["Saint Lucia", "Castries", "East Caribbean Dollar (XCD)", "English", "North America"],
  ["Saint Vincent and the Grenadines", "Kingstown", "East Caribbean Dollar (XCD)", "English", "North America"],
  ["Samoa", "Apia", "Samoan Tālā (WST)", "Samoan, English", "Oceania"],
  ["San Marino", "San Marino", "Euro (EUR)", "Italian", "Europe"],
  ["Sao Tome and Principe", "São Tomé", "São Tomé and Príncipe Dobra (STN)", "Portuguese", "Africa"],
  ["Saudi Arabia", "Riyadh", "Saudi Riyal (SAR)", "Arabic", "Asia"],
  ["Senegal", "Dakar", "West African CFA Franc (XOF)", "French", "Africa"],
  ["Serbia", "Belgrade", "Serbian Dinar (RSD)", "Serbian", "Europe"],
  ["Seychelles", "Victoria", "Seychellois Rupee (SCR)", "Seychellois Creole, English, French", "Africa"],
  ["Sierra Leone", "Freetown", "Sierra Leonean Leone (SLE)", "English", "Africa"],
  ["Singapore", "Singapore", "Singapore Dollar (SGD)", "English, Malay, Mandarin, Tamil", "Asia"],
  ["Slovakia", "Bratislava", "Euro (EUR)", "Slovak", "Europe"],
  ["Slovenia", "Ljubljana", "Euro (EUR)", "Slovene", "Europe"],
  ["Solomon Islands", "Honiara", "Solomon Islands Dollar (SBD)", "English", "Oceania"],
  ["Somalia", "Mogadishu", "Somali Shilling (SOS)", "Somali, Arabic", "Africa"],
  ["South Africa", "Pretoria (executive), Cape Town (legislative), Bloemfontein (judicial)", "South African Rand (ZAR)", "12 official languages including Zulu, Xhosa, Afrikaans, English", "Africa"],
  ["South Korea", "Seoul", "South Korean Won (KRW)", "Korean", "Asia"],
  ["South Sudan", "Juba", "South Sudanese Pound (SSP)", "English", "Africa"],
  ["Spain", "Madrid", "Euro (EUR)", "Spanish", "Europe"],
  ["Sri Lanka", "Sri Jayawardenepura Kotte (legislative), Colombo (executive/commercial)", "Sri Lankan Rupee (LKR)", "Sinhala, Tamil", "Asia"],
  ["Sudan", "Khartoum", "Sudanese Pound (SDG)", "Arabic, English", "Africa"],
  ["Suriname", "Paramaribo", "Surinamese Dollar (SRD)", "Dutch", "South America"],
  ["Sweden", "Stockholm", "Swedish Krona (SEK)", "Swedish", "Europe"],
  ["Switzerland", "Bern (federal city)", "Swiss Franc (CHF)", "German, French, Italian, Romansh", "Europe"],
  ["Syria", "Damascus", "Syrian Pound (SYP)", "Arabic", "Asia"],
  ["Tajikistan", "Dushanbe", "Tajikistani Somoni (TJS)", "Tajik", "Asia"],
  ["Tanzania", "Dodoma (official), Dar es Salaam (commercial)", "Tanzanian Shilling (TZS)", "Swahili, English", "Africa"],
  ["Thailand", "Bangkok", "Thai Baht (THB)", "Thai", "Asia"],
  ["Timor-Leste", "Dili", "United States Dollar (USD)", "Tetum, Portuguese", "Asia"],
  ["Togo", "Lomé", "West African CFA Franc (XOF)", "French", "Africa"],
  ["Tonga", "Nukuʻalofa", "Tongan Paʻanga (TOP)", "Tongan, English", "Oceania"],
  ["Trinidad and Tobago", "Port of Spain", "Trinidad and Tobago Dollar (TTD)", "English", "North America"],
  ["Tunisia", "Tunis", "Tunisian Dinar (TND)", "Arabic", "Africa"],
  ["Turkey", "Ankara", "Turkish Lira (TRY)", "Turkish", "Europe / Asia"],
  ["Turkmenistan", "Ashgabat", "Turkmenistani Manat (TMT)", "Turkmen", "Asia"],
  ["Tuvalu", "Funafuti", "Tuvaluan Dollar / Australian Dollar", "Tuvaluan, English", "Oceania"],
  ["Uganda", "Kampala", "Ugandan Shilling (UGX)", "Swahili, English", "Africa"],
  ["Ukraine", "Kyiv", "Ukrainian Hryvnia (UAH)", "Ukrainian", "Europe"],
  ["United Arab Emirates (UAE)", "Abu Dhabi", "UAE Dirham (AED)", "Arabic", "Asia"],
  ["United Kingdom (UK)", "London", "British Pound Sterling (GBP / £)", "English", "Europe"],
  ["United States (USA)", "Washington, D.C.", "United States Dollar (USD / $)", "English (de facto)", "North America"],
  ["Uruguay", "Montevideo", "Uruguayan Peso (UYU)", "Spanish", "South America"],
  ["Uzbekistan", "Tashkent", "Uzbekistani Som (UZS)", "Uzbek", "Asia"],
  ["Vanuatu", "Port Vila", "Vanuatu Vatu (VUV)", "Bislama, English, French", "Oceania"],
  ["Vatican City", "Vatican City", "Euro (EUR)", "Italian, Latin", "Europe"],
  ["Venezuela", "Caracas", "Venezuelan Bolívar (VES)", "Spanish", "South America"],
  ["Vietnam", "Hanoi", "Vietnamese Đồng (VND)", "Vietnamese", "Asia"],
  ["Yemen", "Sana'a (constitutional), Aden (interim)", "Yemeni Rial (YER)", "Arabic", "Asia"],
  ["Zambia", "Lusaka", "Zambian Kwacha (ZMW)", "English", "Africa"],
  ["Zimbabwe", "Harare", "Zimbabwe Gold (ZiG) / US Dollar", "16 official languages including Shona, Ndebele, English", "Africa"]
];

// 2. Indian States (28) and Union Territories (8)
const INDIAN_STATES = [
  ["Andhra Pradesh", "Amaravati", "N. Chandrababu Naidu", "Telugu"],
  ["Arunachal Pradesh", "Itanagar", "Pema Khandu", "English"],
  ["Assam", "Dispur", "Himanta Biswa Sarma", "Assamese"],
  ["Bihar", "Patna", "Nitish Kumar", "Hindi"],
  ["Chhattisgarh", "Raipur", "Vishnu Deo Sai", "Hindi, Chhattisgarhi"],
  ["Goa", "Panaji", "Dr. Pramod Sawant", "Konkani"],
  ["Gujarat", "Gandhinagar", "Bhupendra Patel", "Gujarati"],
  ["Haryana", "Chandigarh", "Nayab Singh Saini", "Hindi, Haryanvi"],
  ["Himachal Pradesh", "Shimla (summer), Dharamshala (winter)", "Sukhvinder Singh Sukhu", "Hindi"],
  ["Jharkhand", "Ranchi", "Hemant Soren", "Hindi"],
  ["Karnataka", "Bengaluru", "Siddaramaiah", "Kannada"],
  ["Kerala", "Thiruvananthapuram", "Pinarayi Vijayan", "Malayalam"],
  ["Madhya Pradesh", "Bhopal", "Mohan Yadav", "Hindi"],
  ["Maharashtra", "Mumbai", "Eknath Shinde", "Marathi"],
  ["Manipur", "Imphal", "N. Biren Singh", "Meitei (Manipuri)"],
  ["Meghalaya", "Shillong", "Conrad Sangma", "English, Khasi, Garo"],
  ["Mizoram", "Aizawl", "Lalduhoma", "Mizo, English"],
  ["Nagaland", "Kohima", "Neiphiu Rio", "English"],
  ["Odisha", "Bhubaneswar", "Mohan Charan Majhi", "Odia"],
  ["Punjab", "Chandigarh", "Bhagwant Mann", "Punjabi"],
  ["Rajasthan", "Jaipur", "Bhajan Lal Sharma", "Hindi, Rajasthani"],
  ["Sikkim", "Gangtok", "Prem Singh Tamang (Golay)", "Nepali, English, Sikkimese"],
  ["Tamil Nadu", "Chennai", "M. K. Stalin", "Tamil"],
  ["Telangana", "Hyderabad", "A. Revanth Reddy", "Telugu, Urdu"],
  ["Tripura", "Agartala", "Manik Saha", "Bengali, Kokborok, English"],
  ["Uttar Pradesh", "Lucknow", "Yogi Adityanath", "Hindi, Urdu"],
  ["Uttarakhand", "Dehradun (winter), Gairsain (summer)", "Pushkar Singh Dhami", "Hindi, Sanskrit"],
  ["West Bengal", "Kolkata", "Mamata Banerjee", "Bengali, English"]
];

const INDIAN_UTS = [
  ["Andaman and Nicobar Islands", "Port Blair", "Devendra Kumar Joshi (Lieutenant Governor)", "Hindi, English"],
  ["Chandigarh", "Chandigarh", "Gulab Chand Kataria (Administrator)", "English, Punjabi, Hindi"],
  ["Dadra and Nagar Haveli and Daman and Diu", "Daman", "Praful Khoda Patel (Administrator)", "Gujarati, Hindi"],
  ["Delhi (National Capital Territory)", "New Delhi", "Arvind Kejriwal / Atishi (Chief Minister)", "Hindi, English"],
  ["Jammu and Kashmir", "Srinagar (summer), Jammu (winter)", "Manoj Sinha (Lieutenant Governor)", "Kashmiri, Dogri, Hindi, Urdu, English"],
  ["Ladakh", "Leh (summer), Kargil (winter)", "B. D. Mishra (Lieutenant Governor)", "Ladakhi, Tibetan, Hindi, English"],
  ["Lakshadweep", "Kavaratti", "Praful Khoda Patel (Administrator)", "Malayalam, English"],
  ["Puducherry", "Puducherry", "N. Rangasamy (Chief Minister)", "Tamil, French, English"]
];

// 3. National Symbols of Major Nations
const NATIONAL_SYMBOLS = [
  {
    country: "India",
    animal: "Royal Bengal Tiger (Panthera tigris)",
    bird: "Indian Peacock (Pavo cristatus)",
    flower: "Lotus (Nelumbo nucifera)",
    tree: "Indian Banyan (Ficus benghalensis)",
    fruit: "Mango (Mangifera indica)",
    river: "Ganga (Ganges)",
    aquatic: "Ganges River Dolphin (Platanista gangetica)",
    heritage: "Indian Elephant (Elephas maximus indicus)",
    anthem: "Jana Gana Mana (composed by Rabindranath Tagore)",
    song: "Vande Mataram (composed by Bankim Chandra Chatterjee)",
    emblem: "Lion Capital of Ashoka (Sarnath)",
    motto: "Satyameva Jayate (Truth Alone Triumphs)",
    sport: "Field Hockey (national heritage / de facto)",
    currency: "Indian Rupee (INR / ₹)"
  },
  {
    country: "United States",
    animal: "American Bison (Bison bison)",
    bird: "Bald Eagle (Haliaeetus leucocephalus)",
    flower: "Rose",
    tree: "Oak",
    anthem: "The Star-Spangled Banner (Francis Scott Key)",
    motto: "In God We Trust / E Pluribus Unum",
    currency: "United States Dollar (USD / $)"
  },
  {
    country: "United Kingdom",
    animal: "Lion / Bulldog",
    bird: "European Robin",
    flower: "Tudor Rose",
    tree: "Royal Oak",
    anthem: "God Save the King",
    motto: "Dieu et mon droit",
    currency: "British Pound Sterling (GBP / £)"
  },
  {
    country: "Australia",
    animal: "Red Kangaroo (Macropus rufus)",
    bird: "Emu (Dromaius novaehollandiae)",
    flower: "Golden Wattle (Acacia pycnantha)",
    anthem: "Advance Australia Fair",
    currency: "Australian Dollar (AUD / $)"
  },
  {
    country: "Canada",
    animal: "North American Beaver (Castor canadensis)",
    bird: "Canada Jay / Common Loon",
    tree: "Maple Tree",
    flower: "Bunchberry",
    anthem: "O Canada",
    currency: "Canadian Dollar (CAD / $)"
  },
  {
    country: "China",
    animal: "Giant Panda (Ailuropoda melanoleuca)",
    bird: "Red-crowned Crane",
    flower: "Peony / Plum Blossom",
    tree: "Ginkgo biloba",
    anthem: "March of the Volunteers",
    currency: "Renminbi / Yuan (CNY / ¥)"
  },
  {
    country: "Japan",
    animal: "Japanese Macaque / Green Pheasant",
    bird: "Green Pheasant (Phasianus versicolor)",
    flower: "Cherry Blossom (Sakura) / Chrysanthemum",
    tree: "Japanese Cedar (Sugi)",
    anthem: "Kimi ga Yo",
    currency: "Japanese Yen (JPY / ¥)"
  },
  {
    country: "Russia",
    animal: "Eurasian Brown Bear (Ursus arctos arctos)",
    bird: "Double-headed Eagle / Tundra Swan",
    flower: "Chamomile",
    tree: "Siberian Birch",
    anthem: "State Anthem of the Russian Federation",
    currency: "Russian Ruble (RUB / ₽)"
  },
  {
    country: "France",
    animal: "Gallic Rooster (Coq Gaulois)",
    flower: "Fleur-de-lis / Cornflower",
    tree: "Common Oak",
    anthem: "La Marseillaise",
    motto: "Liberté, égalité, fraternité",
    currency: "Euro (EUR / €)"
  },
  {
    country: "Germany",
    animal: "Federal Eagle (Bundesadler)",
    bird: "Golden Eagle",
    flower: "Cornflower",
    tree: "Oak",
    anthem: "Deutschlandlied (Song of Germany)",
    currency: "Euro (EUR / €)"
  }
];

// 4. US States & Capitals (50)
const US_STATES = [
  ["Alabama", "Montgomery"], ["Alaska", "Juneau"], ["Arizona", "Phoenix"], ["Arkansas", "Little Rock"],
  ["California", "Sacramento"], ["Colorado", "Denver"], ["Connecticut", "Hartford"], ["Delaware", "Dover"],
  ["Florida", "Tallahassee"], ["Georgia", "Atlanta"], ["Hawaii", "Honolulu"], ["Idaho", "Boise"],
  ["Illinois", "Springfield"], ["Indiana", "Indianapolis"], ["Iowa", "Des Moines"], ["Kansas", "Topeka"],
  ["Kentucky", "Frankfort"], ["Louisiana", "Baton Rouge"], ["Maine", "Augusta"], ["Maryland", "Annapolis"],
  ["Massachusetts", "Boston"], ["Michigan", "Lansing"], ["Minnesota", "Saint Paul"], ["Mississippi", "Jackson"],
  ["Missouri", "Jefferson City"], ["Montana", "Helena"], ["Nebraska", "Lincoln"], ["Nevada", "Carson City"],
  ["New Hampshire", "Concord"], ["New Jersey", "Trenton"], ["New Mexico", "Santa Fe"], ["New York", "Albany"],
  ["North Carolina", "Raleigh"], ["North Dakota", "Bismarck"], ["Ohio", "Columbus"], ["Oklahoma", "Oklahoma City"],
  ["Oregon", "Salem"], ["Pennsylvania", "Harrisburg"], ["Rhode Island", "Providence"], ["South Carolina", "Columbia"],
  ["South Dakota", "Pierre"], ["Tennessee", "Nashville"], ["Texas", "Austin"], ["Utah", "Salt Lake City"],
  ["Vermont", "Montpelier"], ["Virginia", "Richmond"], ["Washington", "Olympia"], ["West Virginia", "Charleston"],
  ["Wisconsin", "Madison"], ["Wyoming", "Cheyenne"]
];

// 5. Scientific, Biological, Chemical, Astronomical & Historical Facts
const GENERAL_KNOWLEDGE = [
  // Human Biology & Anatomy
  {
    triggers: ["bone", "human", "adult"],
    title: "Human Skeletal System",
    directAnswer: "An adult human body has **206 bones** (while infants are born with approximately 270 bones that fuse during development).",
    description: "Structural anatomy of the human skeleton",
    keyFacts: [
      "Adult Bone Count: 206 bones",
      "Infant Bone Count: ~270 bones (fuse during growth)",
      "Largest & Strongest Bone: Femur (thigh bone)",
      "Smallest Bone: Stapes (middle ear, ~3 mm)",
      "Axial Skeleton: 80 bones (skull, vertebral column, rib cage)",
      "Appendicular Skeleton: 126 bones (upper & lower extremities, pelvic girdle)"
    ]
  },
  {
    triggers: ["largest", "bone", "human"],
    title: "Femur (Thigh Bone)",
    directAnswer: "The largest, longest, and strongest bone in the human body is the **femur** (thigh bone).",
    description: "Anatomy of the human femur",
    keyFacts: [
      "Bone: Femur",
      "Location: Thigh (hip to knee)",
      "Strength: Can support up to 30 times an adult's body weight"
    ]
  },
  {
    triggers: ["smallest", "bone", "human"],
    title: "Stapes (Stirrup Bone)",
    directAnswer: "The smallest bone in the human body is the **stapes** (or stirrup) in the middle ear, measuring only about 3 millimeters.",
    description: "Auditory ossicle in the middle ear",
    keyFacts: [
      "Bone: Stapes (stirrup)",
      "Length: ~3 mm (0.12 inches)",
      "Function: Conducts sound vibrations from the incus to the oval window"
    ]
  },
  {
    triggers: ["largest", "organ", "human"],
    title: "Human Skin (Integumentary System)",
    directAnswer: "The largest organ of the human body is the **skin** (integumentary system), weighing about 3.6 to 4.5 kg in an average adult.",
    description: "External organ covering the human body",
    keyFacts: [
      "Largest Organ: Skin (surface area approx. 2 square meters)",
      "Largest Internal Organ: Liver (weighs approx. 1.5 kg)",
      "Primary Functions: Protection, temperature regulation, sensation, vitamin D synthesis"
    ]
  },
  {
    triggers: ["powerhouse", "cell"],
    title: "Mitochondria",
    directAnswer: "The powerhouse of the cell is the **mitochondrion** (plural: **mitochondria**), responsible for generating cellular energy in the form of ATP.",
    description: "Cellular organelle that produces ATP via oxidative phosphorylation",
    keyFacts: [
      "Organelle: Mitochondria",
      "Process: Cellular respiration (Krebs cycle & electron transport chain)",
      "Energy Currency: Adenosine Triphosphate (ATP)",
      "Unique Feature: Contains its own circular maternal DNA (mtDNA)"
    ]
  },
  {
    triggers: ["dna", "stand", "full form"],
    title: "Deoxyribonucleic Acid (DNA)",
    directAnswer: "DNA stands for **Deoxyribonucleic Acid**, the hereditary molecule that carries genetic instructions for all living organisms.",
    description: "Double-helix polynucleotide genetic code",
    keyFacts: [
      "Full Name: Deoxyribonucleic Acid",
      "Structure: Double helix (discovered by James Watson, Francis Crick, and Rosalind Franklin in 1953)",
      "Four Bases: Adenine (A), Thymine (T), Guanine (G), Cytosine (C)",
      "Base Pairing: A pairs with T (2 hydrogen bonds), G pairs with C (3 hydrogen bonds)"
    ]
  },
  {
    triggers: ["universal", "donor", "blood"],
    title: "O-Negative Blood Group",
    directAnswer: "The universal red blood cell donor group is **O-negative (O-)**, because its red blood cells lack A, B, and Rh antigens.",
    description: "Blood compatibility in transfusion medicine",
    keyFacts: [
      "Universal RBC Donor: O-negative (O-)",
      "Universal RBC Recipient: AB-positive (AB+)",
      "Universal Plasma Donor: AB-positive (AB+)"
    ]
  },

  // Solar System & Space
  {
    triggers: ["planet", "solar", "system"],
    title: "Planets of the Solar System",
    directAnswer: "There are **8 official planets** in the Solar System: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
    description: "Planetary bodies orbiting the Sun in order from closest to farthest",
    keyFacts: [
      "Total Planets: 8 official planets",
      "Order from Sun: 1. Mercury, 2. Venus, 3. Earth, 4. Mars, 5. Jupiter, 6. Saturn, 7. Uranus, 8. Neptune",
      "Terrestrial (Rocky) Planets: Mercury, Venus, Earth, Mars",
      "Gas Giants: Jupiter, Saturn",
      "Ice Giants: Uranus, Neptune",
      "Hottest Planet: Venus (~465°C / 869°F due to runaway greenhouse effect)",
      "Largest Planet: Jupiter",
      "Smallest Planet: Mercury",
      "Dwarf Planets: Pluto (reclassified by IAU in 2006), Eris, Haumea, Makemake, Ceres"
    ]
  },
  {
    triggers: ["hottest", "planet"],
    title: "Venus (Hottest Planet)",
    directAnswer: "The hottest planet in the Solar System is **Venus**, with average surface temperatures of around **465°C (869°F)**.",
    description: "Second planet from the Sun with a dense carbon dioxide atmosphere",
    keyFacts: [
      "Planet: Venus",
      "Surface Temperature: ~465°C (hot enough to melt lead)",
      "Cause: Extreme greenhouse effect from dense CO2 atmosphere with sulfuric acid clouds",
      "Note: Even hotter than Mercury despite being farther from the Sun"
    ]
  },
  {
    triggers: ["speed", "light"],
    title: "Speed of Light in Vacuum (c)",
    directAnswer: "The speed of light in a vacuum is exactly **299,792,458 meters per second** (approximately **300,000 km/s** or $3 \\times 10^8\\text{ m/s}$).",
    description: "Fundamental physical constant denoting the maximum cosmic speed",
    keyFacts: [
      "Exact Speed: 299,792,458 m/s (~186,282 miles/s)",
      "Symbol: c (from Latin celeritas, meaning 'swiftness')",
      "Significance: Constant of spacetime in Einstein's Special Relativity ($E = mc^2$)"
    ]
  },
  {
    triggers: ["gravity", "earth", "acceleration"],
    title: "Earth's Gravitational Acceleration (g)",
    directAnswer: "Standard gravity on Earth at sea level is approximately **9.80665 m/s²** ($g \\approx 9.8\\text{ m/s}^2$ or $32.2\\text{ ft/s}^2$).",
    description: "Gravitational acceleration exerted by Earth on objects near its surface",
    keyFacts: [
      "Standard Value: $g = 9.80665\\text{ m/s}^2$",
      "Formula: $g = \\frac{G \\cdot M}{R^2}$",
      "Variation: Slightly higher at the poles (~9.83 m/s²) than at the equator (~9.78 m/s²)"
    ]
  },

  // Goa Deep Administrative Entities
  {
    triggers: ["taluka", "goa"],
    title: "12 Administrative Talukas of Goa",
    directAnswer: "The state of Goa has **12 talukas** (subdistricts) divided across 2 revenue districts: North Goa and South Goa.",
    description: "Revenue administration and subdistricts of Goa",
    keyFacts: [
      "Total Talukas: 12",
      "North Goa District (6): Bardez, Tiswadi, Bicholim, Pernem, Sattari, Ponda (transferred)",
      "South Goa District (6): Salcete, Mormugao, Canacona, Quepem, Sanguem, Dharbandora",
      "Districts: 2 (North Goa HQ: Panaji, South Goa HQ: Margao)",
      "Capital: Panaji (Tiswadi taluka)",
      "Commercial Capital: Margao (Salcete taluka)"
    ]
  },
  {
    triggers: ["aldona"],
    title: "Aldona, Bardez, Goa",
    directAnswer: "Aldona is a historic, picturesque riverside village in Bardez taluka, North Goa, renowned for its 16th-century Church of Saint Thomas and the Corjuem Fort.",
    description: "Historic village on the Mapusa River in North Goa",
    keyFacts: [
      "District: North Goa | Taluka: Bardez",
      "River: Mapusa River (tributary of Mandovi)",
      "Key Landmarks: Saint Thomas Church (built 1596), Corjuem Island Fort (built 1705), Cable-stayed Aldona-Corjuem Bridge",
      "Distances: 8 km from Mapusa, 19 km from state capital Panaji"
    ]
  },
  {
    triggers: ["panaji"],
    title: "Panaji (Panjim), Goa",
    directAnswer: "Panaji (formerly Panjim) is the state capital of Goa, located in Tiswadi taluka on the southern banks of the Mandovi River estuary.",
    description: "Capital of Goa and headquarters of North Goa district",
    keyFacts: [
      "Role: State Capital of Goa",
      "Location: Tiswadi taluka, on Mandovi River",
      "Heritage: Fontainhas Latin Quarter, Church of Our Lady of the Immaculate Conception (1541)",
      "Legislative Assembly: Located across the river in Porvorim"
    ]
  },
  {
    triggers: ["cm", "goa"],
    title: "Dr. Pramod Sawant — Chief Minister of Goa",
    directAnswer: "The Chief Minister of Goa is **Dr. Pramod Sawant** (Bharatiya Janata Party).",
    description: "13th Chief Minister of Goa (in office since March 19, 2019)",
    keyFacts: [
      "Incumbent: Dr. Pramod Sawant (BJP)",
      "Constituency: Sanquelim (North Goa)",
      "Tenure: March 19, 2019 – Present (Second consecutive term sworn in March 28, 2022)",
      "Preceded by: Manohar Parrikar"
    ]
  },
  {
    triggers: ["chief minister", "goa"],
    title: "Dr. Pramod Sawant — Chief Minister of Goa",
    directAnswer: "The Chief Minister of Goa is **Dr. Pramod Sawant** (Bharatiya Janata Party).",
    description: "13th Chief Minister of Goa (in office since March 19, 2019)",
    keyFacts: [
      "Incumbent: Dr. Pramod Sawant (BJP)",
      "Constituency: Sanquelim (North Goa)",
      "Tenure: In office since March 19, 2019 (2nd term 2022–present)"
    ]
  },

  // Indian Epic Mythology & History
  {
    triggers: ["ram", "wife"],
    title: "Sita (Consort of Lord Rama)",
    directAnswer: "Lord Rama's wife was **Sita** (also revered as Janaki, Vaidehi, and Maithili), avatar of Goddess Lakshmi in the epic Ramayana.",
    description: "Central heroine of the Hindu epic Ramayana",
    keyFacts: [
      "Consort of: Lord Rama (King of Ayodhya)",
      "Parents: King Janaka and Queen Sunayana of Mithila (Videha)",
      "Sons: Lava and Kusha",
      "Also known as: Janaki, Vaidehi, Maithili, Bhumija",
      "Significance: Exemplar of devotion, virtuous conduct, courage, and patience"
    ]
  },
  {
    triggers: ["rama", "wife"],
    title: "Sita (Consort of Lord Rama)",
    directAnswer: "Lord Rama's wife was **Sita** (also revered as Janaki, Vaidehi, and Maithili), avatar of Goddess Lakshmi in the epic Ramayana.",
    description: "Central heroine of the Hindu epic Ramayana",
    keyFacts: [
      "Consort of: Lord Rama",
      "Parents: King Janaka of Mithila",
      "Sons: Lava and Kusha",
      "Significance: Avatar of Goddess Lakshmi in the Ramayana"
    ]
  },

  // Tech Founders & Corporations
  {
    triggers: ["google", "founder"],
    title: "Founding of Google",
    directAnswer: "Google was founded on **September 4, 1998** by **Larry Page** and **Sergey Brin** while they were Ph.D. students at **Stanford University**.",
    description: "Search engine and technological pioneer",
    keyFacts: [
      "Founders: Larry Page and Sergey Brin",
      "Founding Date: September 4, 1998 (Menlo Park, CA)",
      "Foundational Algorithm: PageRank (initially named BackRub)",
      "Parent Company: Alphabet Inc. (CEO: Sundar Pichai)"
    ]
  },
  {
    triggers: ["apple", "founder"],
    title: "Founding of Apple",
    directAnswer: "Apple Inc. was founded on **April 1, 1976** by **Steve Jobs**, **Steve Wozniak**, and **Ronald Wayne** in Los Altos, California.",
    description: "Consumer technology and software pioneer",
    keyFacts: [
      "Founders: Steve Jobs, Steve Wozniak, Ronald Wayne",
      "Founding Date: April 1, 1976",
      "First Product: Apple I personal computer",
      "Headquarters: Apple Park, Cupertino, California (CEO: Tim Cook)"
    ]
  },
  {
    triggers: ["microsoft", "founder"],
    title: "Founding of Microsoft",
    directAnswer: "Microsoft was founded on **April 4, 1975** by **Bill Gates** and **Paul Allen** in Albuquerque, New Mexico.",
    description: "Global computer software and cloud computing company",
    keyFacts: [
      "Founders: Bill Gates and Paul Allen",
      "Founding Date: April 4, 1975",
      "Breakthrough: MS-DOS and Windows operating systems",
      "Headquarters: Redmond, Washington (CEO: Satya Nadella)"
    ]
  },
  {
    triggers: ["amazon", "founder"],
    title: "Founding of Amazon",
    directAnswer: "Amazon was founded on **July 5, 1994** by **Jeff Bezos** in Bellevue, Washington.",
    description: "E-commerce and cloud computing titan (AWS)",
    keyFacts: [
      "Founder: Jeff Bezos",
      "Founding Date: July 5, 1994",
      "Origins: Started as an online bookstore",
      "Headquarters: Seattle, Washington (CEO: Andy Jassy)"
    ]
  },

  // World Geography Extremes
  {
    triggers: ["highest", "mountain"],
    title: "Mount Everest (Sagarmatha / Chomolungma)",
    directAnswer: "The highest mountain on Earth above sea level is **Mount Everest**, with an official elevation of **8,848.86 meters (29,031.7 feet)**.",
    description: "Highest peak in the Mahalangur Himal sub-range of the Himalayas",
    keyFacts: [
      "Mountain: Mount Everest",
      "Elevation: 8,848.86 m (29,031.7 ft)",
      "Location: Himalayas, border of Nepal and China (Tibet Autonomous Region)",
      "First Summit: Sir Edmund Hillary and Tenzing Norgay on May 29, 1953"
    ]
  },
  {
    triggers: ["longest", "river"],
    title: "Nile River",
    directAnswer: "The longest river in the world is traditionally considered to be the **Nile River**, stretching approximately **6,650 kilometers (4,132 miles)** through northeastern Africa.",
    description: "Major north-flowing river in northeastern Africa",
    keyFacts: [
      "Longest River: Nile River (~6,650 km / 4,132 mi)",
      "Largest River by Volume: Amazon River (discharges more water than the next seven largest rivers combined)",
      "Outflow: Mediterranean Sea"
    ]
  },
  {
    triggers: ["continent", "how many"],
    title: "The 7 Continents of Earth",
    directAnswer: "There are **7 continents** on Earth: **Asia**, **Africa**, **North America**, **South America**, **Antarctica**, **Europe**, and **Australia (Oceania)**.",
    description: "Earth's seven major landmasses ordered by surface area",
    keyFacts: [
      "1. Asia: 44.58M km² (Largest by area & population)",
      "2. Africa: 30.37M km²",
      "3. North America: 24.71M km²",
      "4. South America: 17.84M km²",
      "5. Antarctica: 14.20M km²",
      "6. Europe: 10.18M km²",
      "7. Australia / Oceania: 8.60M km²"
    ]
  },
  {
    triggers: ["ocean", "how many"],
    title: "The 5 Oceans of Earth",
    directAnswer: "There are **5 official oceans** on Earth: **Pacific**, **Atlantic**, **Indian**, **Southern (Antarctic)**, and **Arctic**.",
    description: "Earth's interconnected global oceanic water bodies",
    keyFacts: [
      "1. Pacific Ocean: Largest and deepest (contains the Mariana Trench, 11,034 m deep)",
      "2. Atlantic Ocean: Second largest",
      "3. Indian Ocean: Third largest",
      "4. Southern Ocean: Encircles Antarctica",
      "5. Arctic Ocean: Smallest and shallowest"
    ]
  },
  {
    triggers: ["asian games", "medal"],
    title: "India at the Asian Games",
    directAnswer: "At the 19th Asian Games (Hangzhou 2022, held in 2023), India achieved a historic record haul of **107 medals** (28 Gold, 38 Silver, 41 Bronze).",
    description: "Historic best performance crossing the 100-medal threshold",
    keyFacts: [
      "Total Medals: 107 medals",
      "Breakdown: 28 Gold, 38 Silver, 41 Bronze",
      "Milestone: First time India crossed 100 medals at the Asian Games",
      "Overall Finish: 4th place on the medal tally"
    ]
  },

  // Sports Legends & Champions
  {
    triggers: ["best", "chess"],
    title: "Greatest Chess Players in History & World Champions",
    directAnswer: "**Magnus Carlsen** (Norway) is widely regarded as the best active chess player in the world, holding the highest peak FIDE rating in history (**2882**), while **Garry Kasparov** (Russia) is celebrated as the greatest historical player, remaining World #1 for 255 consecutive months.",
    description: "Peak Elo ratings, World Chess Championships, and grandmaster records",
    keyFacts: [
      "Highest Peak Rating: Magnus Carlsen (2882 Elo, May 2014)",
      "Longest Reign at World #1: Garry Kasparov (20 consecutive years, 1985–2005)",
      "Current Classical World Champion: Ding Liren (China)",
      "Youngest Candidates Winner: D. Gukesh (India, age 17, 2024)",
      "5-Time World Champion: Viswanathan Anand (India — 2000, 2007, 2008, 2010, 2012)",
      "Legendary American Champion: Bobby Fischer (1972 World Champion)"
    ]
  },
  {
    triggers: ["chess", "player"],
    title: "Top Chess Grandmasters & World Champions",
    directAnswer: "**Magnus Carlsen** (peak rating 2882) is the highest-rated player in history, and **Garry Kasparov** is regarded as the greatest player of all time.",
    description: "All-time and active chess grandmasters and world titles",
    keyFacts: [
      "Peak Elo: Magnus Carlsen (2882)",
      "Historical Dominance: Garry Kasparov (15-year World Champion)",
      "Indian Chess Pioneers: Viswanathan Anand (5x World Champion), D. Gukesh, R. Praggnanandhaa",
      "Reigning World Champion: Ding Liren"
    ]
  },
  {
    triggers: ["chess", "champion"],
    title: "World Chess Champions",
    directAnswer: "The reigning FIDE World Chess Champion is **Ding Liren** (China), with **D. Gukesh** (India) as the official challenger. **Magnus Carlsen** was 5-time Classical World Champion from 2013 to 2023.",
    description: "FIDE World Chess Championship title holders",
    keyFacts: [
      "Reigning World Champion: Ding Liren (2023–present)",
      "Official Challenger: D. Gukesh (youngest Candidates winner in history, 2024)",
      "Most Recent Dominant Champion: Magnus Carlsen (5 titles: 2013, 2014, 2016, 2018, 2021)",
      "Historical Legend: Garry Kasparov (1985–2000)"
    ]
  },
  {
    triggers: ["best", "football"],
    title: "Greatest Football (Soccer) Players of All Time",
    directAnswer: "**Lionel Messi** is widely regarded as the greatest football player of all time (GOAT), having won a record **8 Ballon d'Or awards** and the **2022 FIFA World Cup** with Argentina, alongside Portuguese legend **Cristiano Ronaldo** (5 Ballon d'Ors, all-time leading international goalscorer).",
    description: "All-time football legends, Ballon d'Or records, and World Cup champions",
    keyFacts: [
      "Lionel Messi: 8 Ballon d'Or titles, 2022 FIFA World Cup, 4 UEFA Champions League titles",
      "Cristiano Ronaldo: 5 Ballon d'Or titles, 5 UEFA Champions League titles, 900+ career goals",
      "Historical Icons: Pelé (only 3-time World Cup winner), Diego Maradona (1986 World Cup)",
      "2022 World Cup Champions: Argentina (defeated France in final)"
    ]
  },
  {
    triggers: ["football", "goat"],
    title: "Football GOAT Debate (Messi vs Ronaldo vs Pelé)",
    directAnswer: "**Lionel Messi** holds the strongest consensus as football's GOAT following his 2022 World Cup triumph and 8 Ballon d'Or titles, with **Cristiano Ronaldo** and **Pelé** rounding out the pantheon.",
    description: "Greatest of all time debate in association football",
    keyFacts: [
      "Most Ballon d'Or: Lionel Messi (8)",
      "Most World Cups: Pelé (3 — 1958, 1962, 1970)",
      "Most Official Career Goals: Cristiano Ronaldo (900+)",
      "Most Influential Tournament: Diego Maradona (1986 Mexico World Cup)"
    ]
  },
  {
    triggers: ["best", "cricketer"],
    title: "Greatest Cricketers in History",
    directAnswer: "**Sir Donald Bradman** is statistically the greatest batsman in cricket history with a Test average of **99.94**, while **Sachin Tendulkar** is revered as the 'God of Cricket' with **100 international centuries** and 34,357 international runs.",
    description: "Cricket legends, records, and greatest players across formats",
    keyFacts: [
      "Statistical Peak: Sir Donald Bradman (99.94 Test batting average)",
      "All-Time Leading Run Scorer: Sachin Tendulkar (100 international centuries, 34,357 runs)",
      "Most ODI Centuries: Virat Kohli (50 ODI centuries)",
      "Most International Wickets: Muttiah Muralitharan (1,347 wickets across formats)"
    ]
  },
  {
    triggers: ["fastest", "car"],
    title: "The Fastest Cars in the World (Top Speed & Acceleration)",
    directAnswer: "The fastest production car by verified top speed is the **Bugatti Chiron Super Sport 300+** at **304.77 mph (490.48 km/h)** (with the **Koenigsegg Jesko Absolut** theoretically capable of 330+ mph), while the fastest accelerating production car is the all-electric **Rimac Nevera** (0–60 mph in **1.74 seconds**).",
    description: "World record production car top speeds and 0-60 mph acceleration",
    keyFacts: [
      "Verified Top Speed: Bugatti Chiron Super Sport 300+ (304.77 mph / 490.48 km/h, 2019)",
      "Claimed Top Speed: Koenigsegg Jesko Absolut (designed for 330+ mph / 531 km/h)",
      "Fastest 0-60 mph Production: Rimac Nevera (1.74 seconds, 1,914 horsepower quad-motor EV)",
      "Fastest Non-Street Legal Track: Bugatti Bolide (0.67 kg/hp power-to-weight ratio)",
      "Historical Speed Landmark: McLaren F1 (240.1 mph / 386.4 km/h naturally aspirated record)"
    ]
  },
  {
    triggers: ["fastest", "man"],
    title: "Usain Bolt — The Fastest Man in History",
    directAnswer: "The fastest man alive is **Usain Bolt** of Jamaica, holding the world record in the 100 meters at **9.58 seconds** and 200 meters at **19.19 seconds**, with a recorded peak sprint speed of **44.72 km/h (27.78 mph)**.",
    description: "Olympic sprint records and human speed world records",
    keyFacts: [
      "100m World Record: 9.58 seconds (Berlin World Athletics Championships, August 16, 2009)",
      "200m World Record: 19.19 seconds (Berlin, August 20, 2009)",
      "Peak Recorded Speed: 44.72 km/h (27.78 mph) between 60m and 80m",
      "Olympic Medals: 8 Olympic Gold Medals (100m, 200m, 4x100m across 2008, 2012, 2016)",
      "World Titles: 11 World Championship Gold Medals"
    ]
  }
];

// Combine all datasets into a rich, structured indexing model
const KNOWLEDGE_ITEMS = [];

// 1. Ingest all 195 Countries
for (const [country, capital, currency, lang, continent] of COUNTRIES_DATA) {
  const cLower = country.toLowerCase();
  // Match "capital of X", "X capital", "what is the capital of X"
  KNOWLEDGE_ITEMS.push({
    triggers: ["capital", cLower],
    title: `Capital of ${country} (${capital})`,
    directAnswer: `The capital of **${country}** is **${capital}**.`,
    description: `Capital city of ${country}, located in ${continent}`,
    keyFacts: [
      `Country: ${country}`,
      `Capital City: ${capital}`,
      `Currency: ${currency}`,
      `Official Language(s): ${lang}`,
      `Continent: ${continent}`
    ]
  });

  // Match "currency of X"
  KNOWLEDGE_ITEMS.push({
    triggers: ["currency", cLower],
    title: `Currency of ${country}`,
    directAnswer: `The official currency of **${country}** is the **${currency}**.`,
    description: `Official legal tender of ${country}`,
    keyFacts: [
      `Country: ${country}`,
      `Currency: ${currency}`,
      `Capital: ${capital}`
    ]
  });

  // Match "language of X"
  KNOWLEDGE_ITEMS.push({
    triggers: ["language", cLower],
    title: `Official Language of ${country}`,
    directAnswer: `The official language(s) of **${country}** is/are **${lang}**.`,
    description: `Languages spoken in ${country}`,
    keyFacts: [
      `Country: ${country}`,
      `Language: ${lang}`,
      `Capital: ${capital}`
    ]
  });
}

// 2. Ingest National Symbols for Major Nations
for (const sym of NATIONAL_SYMBOLS) {
  const cLower = sym.country.toLowerCase();

  if (sym.animal) {
    KNOWLEDGE_ITEMS.push({
      triggers: ["national", "animal", cLower],
      title: `National Animal of ${sym.country}`,
      directAnswer: `The national animal of **${sym.country}** is the **${sym.animal}**.`,
      description: `Official national animal of ${sym.country}`,
      keyFacts: [
        `National Animal: ${sym.animal}`,
        `Country: ${sym.country}`,
        ...(sym.bird ? [`National Bird: ${sym.bird}`] : []),
        ...(sym.flower ? [`National Flower: ${sym.flower}`] : []),
        ...(sym.anthem ? [`National Anthem: ${sym.anthem}`] : [])
      ]
    });
  }

  if (sym.bird) {
    KNOWLEDGE_ITEMS.push({
      triggers: ["national", "bird", cLower],
      title: `National Bird of ${sym.country}`,
      directAnswer: `The national bird of **${sym.country}** is the **${sym.bird}**.`,
      description: `Official national bird of ${sym.country}`,
      keyFacts: [
        `National Bird: ${sym.bird}`,
        `Country: ${sym.country}`,
        ...(sym.animal ? [`National Animal: ${sym.animal}`] : [])
      ]
    });
  }

  if (sym.flower) {
    KNOWLEDGE_ITEMS.push({
      triggers: ["national", "flower", cLower],
      title: `National Flower of ${sym.country}`,
      directAnswer: `The national flower of **${sym.country}** is the **${sym.flower}**.`,
      description: `Official national flower of ${sym.country}`,
      keyFacts: [
        `National Flower: ${sym.flower}`,
        `Country: ${sym.country}`
      ]
    });
  }

  if (sym.anthem) {
    KNOWLEDGE_ITEMS.push({
      triggers: ["national", "anthem", cLower],
      title: `National Anthem of ${sym.country}`,
      directAnswer: `The national anthem of **${sym.country}** is **${sym.anthem}**.`,
      description: `National anthem of ${sym.country}`,
      keyFacts: [
        `National Anthem: ${sym.anthem}`,
        `Country: ${sym.country}`
      ]
    });
  }

  if (sym.song) {
    KNOWLEDGE_ITEMS.push({
      triggers: ["national", "song", cLower],
      title: `National Song of ${sym.country}`,
      directAnswer: `The national song of **${sym.country}** is **${sym.song}**.`,
      description: `National song of ${sym.country}`,
      keyFacts: [
        `National Song: ${sym.song}`,
        `Country: ${sym.country}`
      ]
    });
  }
}

// 3. Ingest Indian States
for (const [state, cap, cm, lang] of INDIAN_STATES) {
  const sLower = state.toLowerCase();
  KNOWLEDGE_ITEMS.push({
    triggers: ["capital", sLower],
    title: `Capital of ${state}`,
    directAnswer: `The capital of the Indian state of **${state}** is **${cap}**.`,
    description: `Capital city of ${state}, India`,
    keyFacts: [
      `State: ${state}`,
      `Capital: ${cap}`,
      `Chief Minister: ${cm}`,
      `Official Language: ${lang}`
    ]
  });

  KNOWLEDGE_ITEMS.push({
    triggers: ["chief minister", sLower],
    title: `Chief Minister of ${state}`,
    directAnswer: `The Chief Minister of **${state}** is **${cm}**.`,
    description: `Head of Government of the State of ${state}, India`,
    keyFacts: [
      `State: ${state}`,
      `Incumbent Chief Minister: ${cm}`,
      `Capital: ${cap}`
    ]
  });

  KNOWLEDGE_ITEMS.push({
    triggers: ["cm", sLower],
    title: `Chief Minister of ${state}`,
    directAnswer: `The Chief Minister of **${state}** is **${cm}**.`,
    description: `Head of Government of the State of ${state}, India`,
    keyFacts: [
      `State: ${state}`,
      `Chief Minister: ${cm}`,
      `Capital: ${cap}`
    ]
  });
}

// 4. Ingest US States
for (const [state, cap] of US_STATES) {
  const sLower = state.toLowerCase();
  KNOWLEDGE_ITEMS.push({
    triggers: ["capital", sLower],
    title: `Capital of ${state} (USA)`,
    directAnswer: `The capital of the US state of **${state}** is **${cap}**.`,
    description: `State capital of ${state}, United States`,
    keyFacts: [
      `State: ${state}`,
      `Capital: ${cap}`,
      `Country: United States of America`
    ]
  });
}

// 6. Periodic Table Elements
const PERIODIC_ELEMENTS = [
  ["Hydrogen", "H", 1, "Nonmetal", 1.008],
  ["Helium", "He", 2, "Noble gas", 4.0026],
  ["Lithium", "Li", 3, "Alkali metal", 6.94],
  ["Beryllium", "Be", 4, "Alkaline earth metal", 9.0122],
  ["Boron", "B", 5, "Metalloid", 10.81],
  ["Carbon", "C", 6, "Reactive nonmetal", 12.011],
  ["Nitrogen", "N", 7, "Reactive nonmetal", 14.007],
  ["Oxygen", "O", 8, "Reactive nonmetal", 15.999],
  ["Fluorine", "F", 9, "Halogen", 18.998],
  ["Neon", "Ne", 10, "Noble gas", 20.180],
  ["Sodium", "Na", 11, "Alkali metal", 22.990],
  ["Magnesium", "Mg", 12, "Alkaline earth metal", 24.305],
  ["Aluminum", "Al", 13, "Post-transition metal", 26.982],
  ["Silicon", "Si", 14, "Metalloid", 28.085],
  ["Phosphorus", "P", 15, "Reactive nonmetal", 30.974],
  ["Sulfur", "S", 16, "Reactive nonmetal", 32.06],
  ["Chlorine", "Cl", 17, "Halogen", 35.45],
  ["Argon", "Ar", 18, "Noble gas", 39.95],
  ["Potassium", "K", 19, "Alkali metal", 39.098],
  ["Calcium", "Ca", 20, "Alkaline earth metal", 40.078],
  ["Scandium", "Sc", 21, "Transition metal", 44.956],
  ["Titanium", "Ti", 22, "Transition metal", 47.867],
  ["Vanadium", "V", 23, "Transition metal", 50.942],
  ["Chromium", "Cr", 24, "Transition metal", 51.996],
  ["Manganese", "Mn", 25, "Transition metal", 54.938],
  ["Iron", "Fe", 26, "Transition metal", 55.845],
  ["Cobalt", "Co", 27, "Transition metal", 58.933],
  ["Nickel", "Ni", 28, "Transition metal", 58.693],
  ["Copper", "Cu", 29, "Transition metal", 63.546],
  ["Zinc", "Zn", 30, "Transition metal", 65.38],
  ["Silver", "Ag", 47, "Precious transition metal", 107.87],
  ["Tin", "Sn", 50, "Post-transition metal", 118.71],
  ["Platinum", "Pt", 78, "Precious transition metal", 195.08],
  ["Gold", "Au", 79, "Precious transition metal", 196.97],
  ["Mercury", "Hg", 80, "Liquid transition metal", 200.59],
  ["Lead", "Pb", 82, "Post-transition metal", 207.2],
  ["Uranium", "U", 92, "Actinide", 238.03],
  ["Plutonium", "Pu", 94, "Actinide", 244.0]
];

for (const [name, sym, z, cat, mass] of PERIODIC_ELEMENTS) {
  const nLower = name.toLowerCase();
  KNOWLEDGE_ITEMS.push({
    triggers: ["symbol", nLower],
    title: `Chemical Symbol of ${name} (${sym})`,
    directAnswer: `The chemical symbol for **${name}** is **${sym}** (Atomic Number: **${z}**).`,
    description: `Periodic table element ${name} (${sym})`,
    keyFacts: [
      `Element: ${name}`,
      `Chemical Symbol: ${sym}`,
      `Atomic Number (Z): ${z}`,
      `Category: ${cat}`,
      `Standard Atomic Weight: ${mass} u`
    ]
  });

  KNOWLEDGE_ITEMS.push({
    triggers: ["atomic", "number", nLower],
    title: `Atomic Number of ${name}`,
    directAnswer: `The atomic number of **${name}** is **${z}** (Chemical Symbol: **${sym}**).`,
    description: `Atomic number and nuclear structure of ${name}`,
    keyFacts: [
      `Atomic Number: ${z} protons`,
      `Element: ${name} (${sym})`,
      `Category: ${cat}`,
      `Atomic Weight: ${mass} u`
    ]
  });
}

// 7. World Leaders & Prominent Figures
const LEADERS_DATA = [
  {
    triggers: ["prime minister", "india"],
    title: "Narendra Modi — Prime Minister of India",
    directAnswer: "The Prime Minister of India is **Narendra Modi** (Bharatiya Janata Party / NDA).",
    description: "14th Prime Minister of the Republic of India (in office since May 26, 2014)",
    keyFacts: [
      "Incumbent: Narendra Modi (BJP / NDA)",
      "Constituency: Varanasi, Uttar Pradesh",
      "Tenure: May 26, 2014 – Present (3rd consecutive term sworn in June 2024)",
      "Executive Seat: South Block, New Delhi"
    ]
  },
  {
    triggers: ["pm", "india"],
    title: "Narendra Modi — Prime Minister of India",
    directAnswer: "The Prime Minister of India is **Narendra Modi**.",
    description: "Head of Government of India",
    keyFacts: ["Incumbent: Narendra Modi", "Office: Prime Minister's Office (PMO), New Delhi"]
  },
  {
    triggers: ["president", "india"],
    title: "Droupadi Murmu — President of India",
    directAnswer: "The President of India is **Smt. Droupadi Murmu** (15th President of India).",
    description: "Head of State of the Republic of India and Supreme Commander of the Armed Forces",
    keyFacts: [
      "Incumbent: Smt. Droupadi Murmu",
      "Tenure: July 25, 2022 – Present",
      "Significance: First tribal person and second woman to hold the office of President of India",
      "Official Residence: Rashtrapati Bhavan, New Delhi"
    ]
  },
  {
    triggers: ["first", "prime minister", "india"],
    title: "Jawaharlal Nehru — First Prime Minister of India",
    directAnswer: "The first Prime Minister of independent India was **Pandit Jawaharlal Nehru** (in office 1947–1964).",
    description: "Founding leader and architect of modern democratic India",
    keyFacts: [
      "First Prime Minister: Jawaharlal Nehru",
      "Tenure: August 15, 1947 – May 27, 1964",
      "Famous Speech: 'Tryst with Destiny' delivered on the eve of Indian Independence"
    ]
  },
  {
    triggers: ["first", "president", "india"],
    title: "Dr. Rajendra Prasad — First President of India",
    directAnswer: "The first President of India was **Dr. Rajendra Prasad** (served from 1950 to 1962).",
    description: "First Head of State of the Republic of India and President of the Constituent Assembly",
    keyFacts: [
      "First President: Dr. Rajendra Prasad",
      "Tenure: January 26, 1950 – May 13, 1962 (Only president to serve two full terms)"
    ]
  },
  {
    triggers: ["father", "nation", "india"],
    title: "Mahatma Gandhi — Father of the Nation",
    directAnswer: "The Father of the Nation of India is **Mahatma Gandhi** (Mohandas Karamchand Gandhi).",
    description: "Leader of the Indian independence movement via nonviolent civil disobedience (Satyagraha)",
    keyFacts: [
      "Leader: Mohandas Karamchand Gandhi (Mahatma Gandhi)",
      "Philosophy: Ahimsa (Nonviolence) and Satyagraha (Truth-force)",
      "Title: Father of the Nation (Rashtrapita)"
    ]
  },
  {
    triggers: ["constitution", "father", "india"],
    title: "Dr. B. R. Ambedkar — Father of the Indian Constitution",
    directAnswer: "The chief architect and father of the Constitution of India is **Dr. Bhimrao Ramji (B. R.) Ambedkar**.",
    description: "Chairman of the Drafting Committee of the Constituent Assembly",
    keyFacts: [
      "Architect: Dr. B. R. Ambedkar",
      "Role: Chairman of the Drafting Committee, First Law Minister of independent India",
      "Adoption Date: November 26, 1949 (came into effect January 26, 1950)"
    ]
  },
  {
    triggers: ["president", "usa"],
    title: "President of the United States",
    directAnswer: "The President of the United States is **Joe Biden** (46th President of the United States).",
    description: "Head of State and Head of Government of the United States",
    keyFacts: [
      "Incumbent: Joe Biden (46th President)",
      "Vice President: Kamala Harris",
      "Official Residence: The White House, Washington, D.C."
    ]
  },
  {
    triggers: ["prime minister", "uk"],
    title: "Prime Minister of the United Kingdom",
    directAnswer: "The Prime Minister of the United Kingdom is **Keir Starmer** (Labour Party, in office since July 2024).",
    description: "Head of Government of the United Kingdom",
    keyFacts: [
      "Incumbent: Sir Keir Starmer (Labour Party)",
      "Official Residence: 10 Downing Street, London"
    ]
  },
  {
    triggers: ["moon", "first", "walk"],
    title: "Neil Armstrong — First Human on the Moon",
    directAnswer: "The first person to walk on the Moon was American astronaut **Neil Armstrong** on **July 20, 1969** during the NASA **Apollo 11** mission.",
    description: "Historic Apollo 11 lunar landing milestone",
    keyFacts: [
      "Astronaut: Neil Armstrong (followed by Buzz Aldrin)",
      "Mission: Apollo 11 (NASA)",
      "Date: July 20, 1969 (lunar landing) / July 21 (first step)",
      "Famous Quote: 'That\\'s one small step for man, one giant leap for mankind.'"
    ]
  },
  {
    triggers: ["space", "first", "person"],
    title: "Yuri Gagarin — First Human in Space",
    directAnswer: "The first human to journey into outer space was Soviet cosmonaut **Yuri Gagarin** on **April 12, 1961** aboard **Vostok 1**.",
    description: "First orbital spaceflight in human history",
    keyFacts: [
      "Cosmonaut: Yuri Gagarin (Soviet Union)",
      "Spacecraft: Vostok 1",
      "Date: April 12, 1961 (completed one orbit around Earth in 108 minutes)"
    ]
  }
];

for (const l of LEADERS_DATA) KNOWLEDGE_ITEMS.push(l);

// 8. World Wonders & Monuments
const WONDERS_DATA = [
  {
    triggers: ["taj mahal"],
    title: "Taj Mahal, Agra, India",
    directAnswer: "The Taj Mahal is an ivory-white marble mausoleum in **Agra, Uttar Pradesh, India**, commissioned in 1631 by Mughal Emperor **Shah Jahan** in memory of his favorite wife **Mumtaz Mahal**.",
    description: "UNESCO World Heritage Site and one of the New 7 Wonders of the World",
    keyFacts: [
      "Location: Agra, Uttar Pradesh, India (along Yamuna River)",
      "Commissioned by: Mughal Emperor Shah Jahan",
      "Dedicated to: Mumtaz Mahal",
      "Construction: 1632–1653 (approx. 20,000 artisans)",
      "Status: UNESCO World Heritage Site (1983) and New 7 Wonder of the World"
    ]
  },
  {
    triggers: ["great wall", "china"],
    title: "Great Wall of China",
    directAnswer: "The Great Wall of China is a massive series of fortifications spanning over **21,196 kilometers (13,171 miles)** across northern China, built across several dynasties (most famously the Qin and Ming dynasties).",
    description: "Ancient defensive fortification and UNESCO World Heritage Site",
    keyFacts: [
      "Length: ~21,196 km (total network)",
      "Primary Purpose: Defensive protection against northern nomadic raids",
      "Major Builders: Qin Shi Huang (first Emperor of China) and Ming Dynasty"
    ]
  },
  {
    triggers: ["colosseum"],
    title: "The Colosseum, Rome, Italy",
    directAnswer: "The Colosseum is an iconic oval amphitheatre in the centre of **Rome, Italy**, completed in **80 AD** under Emperor Titus of the Flavian dynasty.",
    description: "Largest ancient amphitheatre ever built",
    keyFacts: [
      "Location: Rome, Italy",
      "Construction Period: 72 AD – 80 AD (Flavian Dynasty: Vespasian and Titus)",
      "Capacity: Held between 50,000 and 80,000 spectators for gladiatorial contests"
    ]
  },
  {
    triggers: ["eiffel tower"],
    title: "Eiffel Tower, Paris, France",
    directAnswer: "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in **Paris, France**, designed by engineer **Gustave Eiffel** and completed in **1889** for the Exposition Universelle.",
    description: "Global cultural icon of France and one of the most visited monuments in the world",
    keyFacts: [
      "Location: Paris, France",
      "Engineer: Gustave Eiffel",
      "Completion Year: 1889 (built as entrance arch for the 1889 World's Fair)",
      "Height: 330 meters (1,083 ft) including antenna"
    ]
  },
  {
    triggers: ["pyramid", "giza"],
    title: "Great Pyramid of Giza",
    directAnswer: "The Great Pyramid of Giza is the oldest and largest of the pyramids in the Giza pyramid complex near **Cairo, Egypt**, built as a tomb for Pharaoh **Khufu** around **2560 BC**.",
    description: "Oldest of the Seven Wonders of the Ancient World and the only one to remain largely intact",
    keyFacts: [
      "Pharaoh: Khufu (Fourth Dynasty)",
      "Built: c. 2580–2560 BC (over 4,500 years ago)",
      "Original Height: 146.6 meters (was the tallest man-made structure for over 3,800 years)"
    ]
  }
];

for (const w of WONDERS_DATA) KNOWLEDGE_ITEMS.push(w);

// 9. Famous Inventions & Discoveries
const INVENTIONS_DATA = [
  {
    triggers: ["invented", "telephone"],
    title: "Invention of the Telephone",
    directAnswer: "The telephone was invented by **Alexander Graham Bell**, who was awarded the first US patent for the device on **March 7, 1876**.",
    description: "Revolutionary telecommunications breakthrough",
    keyFacts: [
      "Inventor: Alexander Graham Bell",
      "Patent Date: March 7, 1876",
      "First Words Spoken: 'Mr. Watson—come here—I want to see you.'"
    ]
  },
  {
    triggers: ["invented", "light bulb"],
    title: "Invention of the Practical Incandescent Light Bulb",
    directAnswer: "The first commercially practical incandescent light bulb was developed by **Thomas Alva Edison** in **1879** using a carbonized filament.",
    description: "Electrical illumination breakthrough",
    keyFacts: [
      "Inventor: Thomas Alva Edison",
      "Year: 1879",
      "Key Innovation: Long-lasting carbon filament operating in a high vacuum"
    ]
  },
  {
    triggers: ["invented", "airplane"],
    title: "Invention of the Modern Airplane",
    directAnswer: "The first successful controlled, powered, and sustained heavier-than-air human flight was achieved by the **Wright Brothers (Orville and Wilbur Wright)** on **December 17, 1903** at Kitty Hawk, North Carolina.",
    description: "Aviation milestone with the Wright Flyer",
    keyFacts: [
      "Inventors: Orville and Wilbur Wright",
      "Date: December 17, 1903",
      "Location: Kitty Hawk, North Carolina, USA"
    ]
  },
  {
    triggers: ["invented", "world wide web"],
    title: "Invention of the World Wide Web",
    directAnswer: "The World Wide Web (WWW) was invented by British scientist **Sir Tim Berners-Lee** in **1989** while working at **CERN**.",
    description: "Global hypermedia information sharing system",
    keyFacts: [
      "Inventor: Sir Tim Berners-Lee",
      "Institution: CERN (Geneva, Switzerland)",
      "Year: 1989 (first website published in August 1991)",
      "Core Standards: HTML, HTTP, and URLs"
    ]
  },
  {
    triggers: ["discovered", "penicillin"],
    title: "Discovery of Penicillin",
    directAnswer: "Penicillin, the world's first effective antibiotic, was discovered by Scottish physician **Alexander Fleming** in **1928** from Penicillium notatum mold.",
    description: "Medical breakthrough revolutionizing modern antibiotics",
    keyFacts: [
      "Discoverer: Alexander Fleming",
      "Year: September 1928 (St. Mary's Hospital, London)",
      "Nobel Prize: 1945 Nobel Prize in Physiology or Medicine (with Florey and Chain)"
    ]
  },
  {
    triggers: ["boiling point", "water"],
    title: "Boiling Point of Water",
    directAnswer: "At standard atmospheric pressure (1 atm / 101.3 kPa), the boiling point of pure water is **100°C (212°F / 373.15 K)**.",
    description: "Physical thermodynamic phase transition temperature of H2O",
    keyFacts: [
      "Boiling Point: 100°C (212°F / 373.15 K)",
      "Freezing / Melting Point: 0°C (32°F / 273.15 K)",
      "Pressure Sensitivity: Drops at higher altitudes (e.g. ~93°C at 2,000m)"
    ]
  }
];

for (const inv of INVENTIONS_DATA) KNOWLEDGE_ITEMS.push(inv);

// 10. Epic Mythology, Literature & Authors
const LITERATURE_DATA = [
  {
    triggers: ["author", "ramayana"],
    title: "Maharishi Valmiki — Author of the Ramayana",
    directAnswer: "The original Sanskrit epic Ramayana was composed by the ancient sage **Maharishi Valmiki** (known as Adi Kavi, the first poet).",
    description: "Ancient Sanskrit epic of Prince Rama",
    keyFacts: [
      "Author: Sage Valmiki (Adi Kavi)",
      "Language: Classical Sanskrit",
      "Structure: 24,000 verses across 7 Kandas (books)"
    ]
  },
  {
    triggers: ["author", "mahabharata"],
    title: "Sage Ved Vyasa — Author of the Mahabharata",
    directAnswer: "The epic Mahabharata was composed by the revered sage **Krishna Dvaipayana (Ved Vyasa)**, traditionally dictated to Lord Ganesha.",
    description: "Ancient Sanskrit epic of the Kurukshetra War and the Pandavas",
    keyFacts: [
      "Author: Sage Ved Vyasa",
      "Scribe: Lord Ganesha (according to Hindu tradition)",
      "Length: Over 100,000 shlokas, making it the longest epic poem ever written",
      "Core Scripture: Contains the Bhagavad Gita (dialogue between Krishna and Arjuna)"
    ]
  },
  {
    triggers: ["author", "hamlet"],
    title: "William Shakespeare — Author of Hamlet",
    directAnswer: "The tragedy of *Hamlet, Prince of Denmark* was written by **William Shakespeare** between 1599 and 1601.",
    description: "Masterwork tragedy in English Renaissance theatre",
    keyFacts: [
      "Playwright: William Shakespeare",
      "Genre: Revenge Tragedy",
      "Famous Soliloquy: 'To be, or not to be, that is the question'"
    ]
  },
  {
    triggers: ["author", "romeo and juliet"],
    title: "William Shakespeare — Author of Romeo and Juliet",
    directAnswer: "*Romeo and Juliet* was written by **William Shakespeare** early in his career (around 1591–1595).",
    description: "Tragic play about two star-crossed lovers of Verona",
    keyFacts: [
      "Playwright: William Shakespeare",
      "Setting: Verona, Italy",
      "Protagonists: Romeo Montague and Juliet Capulet"
    ]
  },
  {
    triggers: ["author", "gitanjali"],
    title: "Rabindranath Tagore — Author of Gitanjali",
    directAnswer: "*Gitanjali* (Song Offerings) was composed by Nobel laureate **Rabindranath Tagore**, who won the **1913 Nobel Prize in Literature** for this collection.",
    description: "Poetry collection by Rabindranath Tagore",
    keyFacts: [
      "Poet: Rabindranath Tagore (Gurudev)",
      "Nobel Prize: 1913 Nobel Prize in Literature (First Asian Nobel laureate)",
      "Themes: Devotion, nature, spiritual longing, and humanism"
    ]
  },
  {
    triggers: ["author", "war and peace"],
    title: "Leo Tolstoy — Author of War and Peace",
    directAnswer: "The masterwork novel *War and Peace* was written by Russian author **Leo Tolstoy**, first published in its entirety in **1869**.",
    description: "Chronicle of French invasion of Russia and impact of Napoleonic era",
    keyFacts: [
      "Author: Leo Tolstoy",
      "Published: 1869",
      "Focus: Five Russian aristocratic families during the Napoleonic Wars"
    ]
  }
];

for (const lit of LITERATURE_DATA) KNOWLEDGE_ITEMS.push(lit);

// 11. Historical Events & Milestones
const HISTORY_DATA = [
  {
    triggers: ["world war 1", "year"],
    title: "World War I (1914–1918)",
    directAnswer: "World War I began on **July 28, 1914** and concluded with the armistice on **November 11, 1918** (lasting 4 years and 3 months).",
    description: "Global conflict centered in Europe between Allied and Central Powers",
    keyFacts: [
      "Start Date: July 28, 1914 (triggered by assassination of Archduke Franz Ferdinand)",
      "End Date: November 11, 1918 (Armistice of Compiègne)",
      "Treaty: Treaty of Versailles signed June 28, 1919"
    ]
  },
  {
    triggers: ["world war 2", "year"],
    title: "World War II (1939–1945)",
    directAnswer: "World War II began on **September 1, 1939** (German invasion of Poland) and officially ended on **September 2, 1945** with Japan's formal surrender.",
    description: "Deadliest global conflict in human history between Allies and Axis Powers",
    keyFacts: [
      "Start Date: September 1, 1939",
      "End Date: September 2, 1945 (Victory over Japan Day)",
      "Key Arenas: European Theater, Pacific War, Eastern Front"
    ]
  },
  {
    triggers: ["independence", "india", "year"],
    title: "Independence of India (August 15, 1947)",
    directAnswer: "India gained independence from British colonial rule on **August 15, 1947** under the Indian Independence Act 1947.",
    description: "Birth of the independent sovereign Dominion of India",
    keyFacts: [
      "Independence Date: August 15, 1947",
      "First Prime Minister: Jawaharlal Nehru ('Tryst with Destiny')",
      "First Governor-General: Lord Louis Mountbatten"
    ]
  },
  {
    triggers: ["republic day", "india", "year"],
    title: "Republic Day of India (January 26, 1950)",
    directAnswer: "India became a sovereign democratic republic on **January 26, 1950**, when the Constitution of India came into full effect.",
    description: "Adoption of the Constitution of India replacing the Government of India Act 1935",
    keyFacts: [
      "Date: January 26, 1950",
      "Constitution Drafted by: Drafting Committee chaired by Dr. B. R. Ambedkar",
      "Celebration: Grand annual parade at Kartavya Path (formerly Rajpath), New Delhi"
    ]
  }
];

for (const h of HISTORY_DATA) KNOWLEDGE_ITEMS.push(h);

// 12. Geography, Astronomy, Chemistry & Sports Entities
const EXTRA_DATA = [
  {
    triggers: ["suez canal"],
    title: "Suez Canal, Egypt",
    directAnswer: "The Suez Canal is an artificial sea-level waterway in **Egypt**, connecting the **Mediterranean Sea to the Red Sea** through the Isthmus of Suez (opened in November 1869).",
    description: "Crucial international maritime trade shortcut between Europe and Asia",
    keyFacts: [
      "Location: Egypt (Isthmus of Suez)",
      "Connects: Mediterranean Sea to the Red Sea",
      "Opened: November 17, 1869 (engineered by Ferdinand de Lesseps)",
      "Significance: Eliminates the need to navigate around the Cape of Good Hope"
    ]
  },
  {
    triggers: ["panama canal"],
    title: "Panama Canal, Panama",
    directAnswer: "The Panama Canal is an artificial 82-kilometer (51-mile) lock-based waterway in **Panama**, connecting the **Atlantic Ocean with the Pacific Ocean** across the Isthmus of Panama (opened in 1914).",
    description: "Transcontinental maritime conduit between the Atlantic and Pacific oceans",
    keyFacts: [
      "Location: Panama",
      "Connects: Atlantic Ocean (Caribbean Sea) and Pacific Ocean",
      "Opened: August 15, 1914",
      "Mechanism: System of lock gates elevating ships to Gatun Lake (26m above sea level)"
    ]
  },
  {
    triggers: ["value", "pi"],
    title: "Mathematical Constant Pi (π)",
    directAnswer: "The mathematical constant **Pi (π)** is the ratio of a circle's circumference to its diameter, approximately equal to **3.1415926535...** (or $\\frac{22}{7}$ as a common rational approximation).",
    description: "Transcendental irrational real number",
    keyFacts: [
      "Approximation: $\\pi \\approx 3.1415926535$",
      "Fractional Approximation: $\\frac{22}{7}$",
      "Property: Irrational and transcendental (cannot be expressed as root of algebraic equation with rational coefficients)"
    ]
  },
  {
    triggers: ["value", "euler", "constant"],
    title: "Euler's Number (e)",
    directAnswer: "Euler's number **e** is a mathematical constant and base of natural logarithms, approximately equal to **2.7182818284...**.",
    description: "Mathematical constant defining continuous compounding and exponential growth",
    keyFacts: [
      "Approximation: $e \\approx 2.71828$",
      "Formal Limit: $e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n$",
      "Derivative Invariant: $\\frac{d}{dx} e^x = e^x$"
    ]
  },
  {
    triggers: ["chemical formula", "water"],
    title: "Chemical Formula of Water (H2O)",
    directAnswer: "The chemical formula of water is **H₂O**, consisting of two hydrogen atoms covalently bonded to one oxygen atom.",
    description: "Universal solvent and essential molecule of life",
    keyFacts: [
      "Formula: H₂O",
      "Bond Angle: 104.5° (bent molecular geometry)",
      "Molar Mass: 18.015 g/mol"
    ]
  },
  {
    triggers: ["chemical formula", "salt"],
    title: "Chemical Formula of Table Salt (NaCl)",
    directAnswer: "The chemical formula of common table salt is **NaCl** (**Sodium Chloride**), an ionic lattice of sodium and chloride ions.",
    description: "Essential mineral and ionic compound",
    keyFacts: [
      "Formula: NaCl (Sodium Chloride)",
      "Crystal Structure: Face-centered cubic (FCC)",
      "Bonding: Ionic bond between Na⁺ and Cl⁻"
    ]
  },
  {
    triggers: ["chemical formula", "carbon dioxide"],
    title: "Chemical Formula of Carbon Dioxide (CO2)",
    directAnswer: "The chemical formula of carbon dioxide is **CO₂**, containing a central carbon atom double-bonded to two oxygen atoms.",
    description: "Greenhouse gas essential for photosynthesis",
    keyFacts: [
      "Formula: CO₂",
      "Molecular Geometry: Linear (180° bond angle)",
      "Molar Mass: 44.01 g/mol"
    ]
  },
  {
    triggers: ["chemical formula", "glucose"],
    title: "Chemical Formula of Glucose (C6H12O6)",
    directAnswer: "The chemical formula of glucose is **C₆H₁₂O₆**, a simple monosaccharide sugar that serves as primary cellular fuel in biology.",
    description: "Primary biological energy source produced by photosynthesis",
    keyFacts: [
      "Formula: C₆H₁₂O₆",
      "Category: Monosaccharide (aldohexose)",
      "Molar Mass: 180.16 g/mol"
    ]
  },
  {
    triggers: ["milky way"],
    title: "Milky Way Galaxy",
    directAnswer: "The Milky Way is the barred spiral galaxy that contains our Solar System, estimated to contain between **100 and 400 billion stars** and spanning about **100,000 light-years** in diameter.",
    description: "Barred spiral galaxy home to Earth and the Solar System",
    keyFacts: [
      "Galaxy Type: Barred spiral (SBb)",
      "Diameter: ~100,000 light-years",
      "Central Supermassive Black Hole: Sagittarius A* (approx. 4.1 million solar masses)",
      "Nearest Major Neighbor: Andromeda Galaxy (M31, ~2.5 million light-years away)"
    ]
  },
  {
    triggers: ["nearest", "galaxy"],
    title: "Andromeda Galaxy (M31)",
    directAnswer: "The nearest major spiral galaxy to the Milky Way is the **Andromeda Galaxy (Messier 31 / M31)**, located approximately **2.5 million light-years** from Earth.",
    description: "Largest member of the Local Group of galaxies",
    keyFacts: [
      "Galaxy: Andromeda (M31)",
      "Distance: ~2.5 million light-years",
      "Future Event: Will collide and merge with the Milky Way in approximately 4.5 billion years to form 'Milkomeda'"
    ]
  },
  {
    triggers: ["olympic games", "2024"],
    title: "2024 Summer Olympics (Paris 2024)",
    directAnswer: "The 2024 Summer Olympic Games (Games of the XXXIII Olympiad) were hosted in **Paris, France** from July 26 to August 11, 2024.",
    description: "Global multi-sport Olympic event in Paris",
    keyFacts: [
      "Host City: Paris, France",
      "Opening Ceremony: Held along the River Seine",
      "Dates: July 26 – August 11, 2024"
    ]
  },
  {
    triggers: ["fifa world cup", "2022"],
    title: "2022 FIFA World Cup (Qatar)",
    directAnswer: "The 2022 FIFA World Cup was hosted in **Qatar** and won by **Argentina**, who defeated France in the final on penalties following a 3–3 draw.",
    description: "22nd FIFA World Cup tournament",
    keyFacts: [
      "Host Nation: Qatar",
      "Champion: Argentina (3rd title)",
      "Captain: Lionel Messi (awarded Golden Ball)",
      "Runner-up: France (Kylian Mbappé scored hat-trick in final)"
    ]
  },
  {
    triggers: ["most", "olympic gold medals"],
    title: "Michael Phelps — Most Decorated Olympian",
    directAnswer: "The most successful and decorated Olympian of all time is American swimmer **Michael Phelps**, who won an all-time record of **23 Olympic gold medals** (28 Olympic medals overall).",
    description: "All-time record holder for Olympic medals",
    keyFacts: [
      "Athlete: Michael Phelps (USA, Swimming)",
      "Gold Medals: 23 (All-time Olympic record)",
      "Total Medals: 28 medals across 4 Olympic Games (2004–2016)",
      "Single Games Record: 8 gold medals at Beijing 2008"
    ]
  },
  {
    triggers: ["fastest", "human"],
    title: "Usain Bolt — 100m World Record Holder",
    directAnswer: "The fastest human in history is Jamaican sprinter **Usain Bolt**, who set the 100-meter world record of **9.58 seconds** at the 2009 World Athletics Championships in Berlin.",
    description: "World record holder in 100m and 200m sprints",
    keyFacts: [
      "Athlete: Usain Bolt (Jamaica)",
      "100m World Record: 9.58 seconds (Berlin, August 16, 2009)",
      "200m World Record: 19.19 seconds",
      "Olympic Titles: 8 Olympic gold medals"
    ]
  },
  {
    triggers: ["highest score", "odi", "cricket"],
    title: "Rohit Sharma — 264 Runs (ODI Record)",
    directAnswer: "The highest individual score in One Day International (ODI) cricket is **264 runs** scored by **Rohit Sharma** (India) against Sri Lanka at Eden Gardens, Kolkata on November 13, 2014.",
    description: "World record highest individual innings in 50-over international cricket",
    keyFacts: [
      "Batsman: Rohit Sharma (India)",
      "Score: 264 runs off 173 balls (33 fours, 9 sixes)",
      "Opponent: Sri Lanka at Eden Gardens, Kolkata (2014)",
      "Distinction: Only batsman to score three double-centuries in ODI cricket"
    ]
  }
];

for (const x of EXTRA_DATA) KNOWLEDGE_ITEMS.push(x);

// 13. Computer Science, Systems & Web Architecture Entities
const CS_TECH_DATA = [
  {
    triggers: ["binary search", "time complexity"],
    title: "Binary Search Algorithm & Complexity",
    directAnswer: "Binary Search has a worst-case and average-case time complexity of **O(log N)** and a space complexity of **O(1)** (iterative).",
    description: "Divide-and-conquer search on sorted arrays",
    keyFacts: [
      "Time Complexity: O(log N) worst/average, O(1) best",
      "Space Complexity: O(1) iterative, O(log N) recursive call stack",
      "Precondition: Array must be sorted in ascending/descending order",
      "Invariant: Eliminates half the search interval in every step"
    ]
  },
  {
    triggers: ["quicksort", "time complexity"],
    title: "QuickSort Algorithm & Complexity",
    directAnswer: "QuickSort has an average-case time complexity of **O(N log N)** and a worst-case time complexity of **O(N²)** (when unbalanced pivots are chosen).",
    description: "Partition-based divide-and-conquer sorting algorithm",
    keyFacts: [
      "Average Time: O(N log N)",
      "Worst-case Time: O(N²) (mitigated via randomized pivot or median-of-three)",
      "Space Complexity: O(log N) auxiliary stack space",
      "Stability: Unstable sorting algorithm"
    ]
  },
  {
    triggers: ["mergesort", "time complexity"],
    title: "MergeSort Algorithm & Complexity",
    directAnswer: "MergeSort has a guaranteed time complexity of **O(N log N)** across best, worst, and average cases, with **O(N)** auxiliary space complexity.",
    description: "Stable divide-and-conquer sorting algorithm",
    keyFacts: [
      "Time Complexity: O(N log N) in all cases (best, average, worst)",
      "Space Complexity: O(N) auxiliary memory for buffer merging",
      "Stability: Stable (preserves relative order of equal elements)"
    ]
  },
  {
    triggers: ["acid", "database"],
    title: "ACID Properties in Relational Databases",
    directAnswer: "ACID stands for **Atomicity, Consistency, Isolation, and Durability**—the four foundational guarantees ensuring reliable database transactions.",
    description: "Transaction reliability guarantees in relational DBMS",
    keyFacts: [
      "A - Atomicity: Transactions are all-or-nothing (full commit or rollback)",
      "C - Consistency: State transitions preserve all database invariants and constraints",
      "I - Isolation: Concurrent transactions execute independently without interference",
      "D - Durability: Committed transactions persist permanently even across power failures"
    ]
  },
  {
    triggers: ["http status", "404"],
    title: "HTTP 404 Not Found",
    directAnswer: "HTTP **404 Not Found** indicates that the server cannot locate the requested resource at the specified URI.",
    description: "Client-side error HTTP status code",
    keyFacts: [
      "Code: 404 Not Found",
      "Category: 4xx Client Error",
      "Meaning: Origin server found no current representation for the target resource"
    ]
  },
  {
    triggers: ["http status", "500"],
    title: "HTTP 500 Internal Server Error",
    directAnswer: "HTTP **500 Internal Server Error** indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.",
    description: "Server-side error HTTP status code",
    keyFacts: [
      "Code: 500 Internal Server Error",
      "Category: 5xx Server Error",
      "Meaning: Unhandled exception or fatal server runtime crash"
    ]
  },
  {
    triggers: ["http status", "200"],
    title: "HTTP 200 OK",
    directAnswer: "HTTP **200 OK** is the standard response for successful HTTP requests across GET, POST, PUT, and DELETE operations.",
    description: "Standard successful HTTP response status code",
    keyFacts: [
      "Code: 200 OK",
      "Category: 2xx Success",
      "Meaning: The request has succeeded and payload is transmitted"
    ]
  },
  {
    triggers: ["git", "merge", "rebase"],
    title: "Git Merge vs. Git Rebase",
    directAnswer: "**Git Merge** combines two branches by creating a new merge commit, preserving historical chronology; **Git Rebase** replays your branch's commits on top of another branch, producing a clean linear history.",
    description: "Branch integration strategies in Git version control",
    keyFacts: [
      "Git Merge: Non-destructive; creates 2-parent merge commit; preserves full historical branch topology",
      "Git Rebase: Rewrites commit hashes; creates a linear commit history; golden rule: never rebase public shared branches"
    ]
  },
  {
    triggers: ["rest", "graphql"],
    title: "REST vs. GraphQL",
    directAnswer: "**REST** exposes fixed resource endpoints using standard HTTP methods; **GraphQL** provides a single endpoint with a flexible query language that allows clients to request exact fields, preventing over-fetching and under-fetching.",
    description: "API architectural styles comparison",
    keyFacts: [
      "REST: Multiple endpoints (e.g. /users, /posts), fixed JSON response schemas, relies on HTTP caching",
      "GraphQL: Single POST endpoint (/graphql), client-driven schemas, strongly-typed schema definition language (SDL)"
    ]
  },
  {
    triggers: ["box model", "css"],
    title: "CSS Box Model",
    directAnswer: "The CSS Box Model consists of four concentric rectangular layers wrapping every HTML element: **Content**, **Padding**, **Border**, and **Margin**.",
    description: "Core layout mechanism in CSS rendering",
    keyFacts: [
      "1. Content: The actual text, image, or media content",
      "2. Padding: Transparent area surrounding the content inside the border",
      "3. Border: The line surrounding the padding and content",
      "4. Margin: Transparent whitespace clearing area outside the border",
      "Box-Sizing: `box-sizing: border-box` includes padding and border in the element's total width and height"
    ]
  }
];

for (const cs of CS_TECH_DATA) KNOWLEDGE_ITEMS.push(cs);

// 14. Ingest General Knowledge & Scientific Entities
for (const item of GENERAL_KNOWLEDGE) {
  KNOWLEDGE_ITEMS.push(item);
}

console.log(`Generated knowledge matrix with ${KNOWLEDGE_ITEMS.length} indexed entities.`);

// Write the module out as a clean, highly-optimized JS module
const jsOutput = `/**
 * Comprehensive Verified Knowledge Base for Continuous Gravitational Prompt Routing
 * Contains over ${KNOWLEDGE_ITEMS.length} verified factual entries across:
 * - 195 Sovereign Countries (Capitals, Currencies, Languages, Continents)
 * - National Animals, Birds, Flowers, Anthems of Major Nations
 * - 28 Indian States & 8 Union Territories (Capitals, Chief Ministers)
 * - 50 US States & Capitals
 * - Human Anatomy, Biology, Physics, Astronomy & Science
 * - Goa In-Depth Entities (12 Talukas, Districts, Aldona, Panaji, Dr. Pramod Sawant)
 * - Epic Mythology, Literature, History & Tech Founders
 */

export const VERIFIED_KNOWLEDGE = ${JSON.stringify(KNOWLEDGE_ITEMS, null, 2)};

/**
 * High-speed token-normalized fuzzy matcher
 */
export function lookupKnowledge(queryText) {
  if (!queryText) return null;
  const raw = queryText.toLowerCase().replace(/['".,?!/\\\\;:\-_()]/g, ' ');
  const tokens = raw.split(/\\s+/).filter(t => t.length > 0);

  // Normalize possessives and plurals: "indias" -> "india", "animals" -> "animal"
  const normalized = new Set();
  for (const t of tokens) {
    normalized.add(t);
    if (t.endsWith("'s")) normalized.add(t.slice(0, -2));
    if (t.endsWith("s") && t.length > 3) normalized.add(t.slice(0, -1));
  }

  // Exact trigger subset matching with priority scoring
  let bestMatch = null;
  let bestScore = -1;

  for (const item of VERIFIED_KNOWLEDGE) {
    const allMatched = item.triggers.every(trigger => {
      const parts = trigger.split(' ');
      return parts.every(p => {
        if (normalized.has(p)) return true;
        if (p.endsWith('s') && normalized.has(p.slice(0, -1))) return true;
        if (!p.endsWith('s') && normalized.has(p + 's')) return true;
        return false;
      });
    });

    if (allMatched) {
      // Score based on number of trigger tokens matched (longer matches rank higher)
      const score = item.triggers.reduce((acc, t) => acc + t.split(' ').length, 0);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }
  }

  return bestMatch;
}
`;

fs.writeFileSync(OUT_PATH, jsOutput, 'utf-8');
console.log(`Successfully wrote ${OUT_PATH} (${(fs.statSync(OUT_PATH).size / 1024).toFixed(1)} KB)`);
