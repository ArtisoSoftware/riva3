export function countryGroupListRiva2(iso) {
  if (iso == "apec") {
    return [
      "AUS",
      "BRN",
      "CAN",
      "CHL",
      "CHN",
      "HKG",
      "IDN",
      "JPN",
      "KOR",
      "MEX",
      "MYS",
      "NZL",
      "PER",
      "PHL",
      "PNG",
      "RUS",
      "SGP",
      "THA",
      "TWN",
      "USA",
      "VNM",
    ];
  } else if (iso == "apta") {
    return ["BGD", "IND", "LAO", "LKA", "MNG", "CHN", "KOR"];
  } else if (iso == "asean") {
    return [
      "KHM",
      "MMR",
      "BRN",
      "IDN",
      "MYS",
      "PHL",
      "SGP",
      "THA",
      "VNM",
      "LAO",
    ];
  } else if (iso == "bimstec") {
    return ["BTN", "NPL", "BGD", "IND", "LKA", "MMR", "THA"];
  } else if (iso == "cptpp") {
    return [
      "AUS",
      "CAN",
      "CHL",
      "JPN",
      "MEX",
      "NZL",
      "PER",
      "BRN",
      "MYS",
      "SGP",
      "VNM",
    ];
  } else if (iso == "ene_asia") {
    return ["MAC", "PRK", "HKG", "MNG", "CHN", "KOR", "JPN"];
  } else if (iso == "escap") {
    return [
      "AFG",
      "ARM",
      "ASM",
      "AUS",
      "AZE",
      "BGD",
      "BRN",
      "BTN",
      "CHN",
      "COK",
      "FJI",
      "FSM",
      "GEO",
      "GUM",
      "HKG",
      "IDN",
      "IRN",
      "JPN",
      "KAZ",
      "KGZ",
      "KHM",
      "KIR",
      "KOR",
      "LAO",
      "LKA",
      "MAC",
      "MDV",
      "MHL",
      "MMR",
      "MNG",
      "MNP",
      "MYS",
      "NCL",
      "NIU",
      "NPL",
      "NRU",
      "NZL",
      "PAK",
      "PLW",
      "PNG",
      "PRK",
      "PYF",
      "RUS",
      "SGP",
      "SLB",
      "THA",
      "TJK",
      "TKM",
      "TLS",
      "TON",
      "TUR",
      "TUV",
      "TWN",
      "UZB",
      "VNM",
      "VUT",
      "WSM",
    ];
  } else if (iso == "fealac") {
    return [
      "ARG",
      "BOL",
      "BRA",
      "COL",
      "CRI",
      "CUB",
      "DOM",
      "ECU",
      "GTM",
      "HND",
      "NIC",
      "PAN",
      "PRY",
      "SLV",
      "SUR",
      "URY",
      "VEN",
      "CHL",
      "MEX",
      "PER",
      "KHM",
      "IDN",
      "PHL",
      "LAO",
      "MMR",
      "THA",
      "AUS",
      "NZL",
      "BRN",
      "MYS",
      "SGP",
      "VNM",
      "MNG",
      "CHN",
      "KOR",
      "JPN",
    ];
  } else if (iso == "high_income") {
    return [
      "ABW",
      "AIA",
      "ALA",
      "AND",
      "ANT",
      "ARE",
      "ATG",
      "AUT",
      "BEL",
      "BES",
      "BHR",
      "BHS",
      "BLM",
      "BMU",
      "BRB",
      "BVT",
      "CHE",
      "CHI",
      "CUW",
      "CYM",
      "CYP",
      "CZE",
      "DEU",
      "DNK",
      "ESP",
      "EST",
      "FIN",
      "FLK",
      "FRA",
      "FRO",
      "GBR",
      "GGY",
      "GIB",
      "GLP",
      "GRC",
      "GRL",
      "GUF",
      "HRV",
      "HUN",
      "IMN",
      "IRL",
      "ISL",
      "ITA",
      "JEY",
      "KNA",
      "KWT",
      "LIE",
      "LTU",
      "LUX",
      "LVA",
      "MAF",
      "MCO",
      "MLT",
      "MTQ",
      "NFK",
      "NLD",
      "NOR",
      "OMN",
      "PCN",
      "POL",
      "PRI",
      "PRT",
      "QAT",
      "REU",
      "SAU",
      "SJM",
      "SMR",
      "SSD",
      "SVK",
      "SVN",
      "SWE",
      "SXM",
      "SYC",
      "TCA",
      "TTO",
      "VAT",
      "VGB",
      "VIR",
      "USA",
      "CAN",
      "TWN",
      "GUM",
      "MNP",
      "NCL",
      "PYF",
      "RUS",
      "MAC",
      "HKG",
      "ARG",
      "URY",
      "VEN",
      "CHL",
      "AUS",
      "NZL",
      "BRN",
      "SGP",
      "KOR",
      "JPN",
    ];
  } else if (iso == "ap_high_income") {
    return [
      "AUS",
      "BRN",
      "GUM",
      "HKG",
      "JPN",
      "KOR",
      "MAC",
      "MNP",
      "NCL",
      "NZL",
      "PYF",
      "RUS",
      "SGP",
    ];
  } else if (iso == "landlocked_dev") {
    return [
      "BDI",
      "BFA",
      "BWA",
      "CAF",
      "ETH",
      "LSO",
      "MDA",
      "MKD",
      "MLI",
      "MWI",
      "NER",
      "RWA",
      "SWZ",
      "TCD",
      "UGA",
      "ZMB",
      "ZWE",
      "AFG",
      "ARM",
      "AZE",
      "KAZ",
      "KGZ",
      "TJK",
      "TKM",
      "UZB",
      "BTN",
      "NPL",
      "BOL",
      "PRY",
      "LAO",
      "MNG",
      "SSD",
    ];
  } else if (iso == "ap_landlocked_dev") {
    return [
      "AFG",
      "NPL",
      "BTN",
      "LAO",
      "TJK",
      "ARM",
      "KGZ",
      "UZB",
      "AZE",
      "KAZ",
      "MNG",
      "TKM",
    ];
  } else if (iso == "ldc") {
    return [
      "AGO",
      "BEN",
      "COD",
      "COM",
      "DJI",
      "ERI",
      "GIN",
      "GMB",
      "GNB",
      "HTI",
      "LBR",
      "MDG",
      "MOZ",
      "MRT",
      "SDN",
      "SEN",
      "SLE",
      "SOM",
      "STP",
      "TGO",
      "TZA",
      "YEM",
      "KIR",
      "SLB",
      "TLS",
      "TUV",
      "VUT",
      "BGD",
      "KHM",
      "MMR",
      "BDI",
      "BFA",
      "CAF",
      "ETH",
      "LSO",
      "MLI",
      "MWI",
      "NER",
      "RWA",
      "TCD",
      "UGA",
      "ZMB",
      "AFG",
      "BTN",
      "NPL",
      "LAO",
      "SSD",
    ];
  } else if (iso == "ap_ldc") {
    return [
      "AFG",
      "KHM",
      "MMR",
      "NPL",
      "BGD",
      "BTN",
      "KIR",
      "LAO",
      "SLB",
      "TLS",
      "VUT",
      "TUV",
    ];
  } else if (iso == "lldc") {
    return [
      "BDI",
      "BFA",
      "CAF",
      "ETH",
      "LSO",
      "MLI",
      "MWI",
      "NER",
      "RWA",
      "TCD",
      "UGA",
      "ZMB",
      "AFG",
      "BTN",
      "NPL",
      "LAO",
      "SSD",
    ];
  } else if (iso == "ap_lldc") {
    return ["AFG", "NPL", "BTN", "LAO"];
  } else if (iso == "low_income") {
    return [
      "TKL",
      "PRK",
      "ZWE",
      "TJK",
      "BEN",
      "COD",
      "COM",
      "ERI",
      "GIN",
      "GMB",
      "GNB",
      "HTI",
      "LBR",
      "MDG",
      "MOZ",
      "SEN",
      "SLE",
      "SOM",
      "TGO",
      "TZA",
      "KHM",
      "MMR",
      "BDI",
      "BFA",
      "CAF",
      "ETH",
      "MLI",
      "MWI",
      "NER",
      "RWA",
      "TCD",
      "UGA",
      "AFG",
      "NPL",
    ];
  } else if (iso == "ap_low_income") {
    return ["AFG", "KHM", "MMR", "NPL", "PRK", "TJK"];
  } else if (iso == "lower_middle_income") {
    return [
      "CIV",
      "CMR",
      "COG",
      "CPV",
      "EGY",
      "ESH",
      "GHA",
      "GUY",
      "KEN",
      "MAR",
      "MSR",
      "NGA",
      "PSE",
      "SHN",
      "SYR",
      "UKR",
      "WLF",
      "XKX",
      "FSM",
      "GEO",
      "PAK",
      "WSM",
      "PNG",
      "IND",
      "LKA",
      "GTM",
      "HND",
      "NIC",
      "SLV",
      "IDN",
      "PHL",
      "VNM",
      "MDA",
      "SWZ",
      "ARM",
      "KGZ",
      "UZB",
      "BOL",
      "DJI",
      "MRT",
      "SDN",
      "STP",
      "YEM",
      "KIR",
      "SLB",
      "TLS",
      "VUT",
      "BGD",
      "LSO",
      "ZMB",
      "BTN",
      "LAO",
      "SEN",
    ];
  } else if (iso == "ap_lower_middle_income") {
    return [
      "ARM",
      "BGD",
      "BTN",
      "FSM",
      "GEO",
      "IDN",
      "IND",
      "KGZ",
      "KIR",
      "LAO",
      "LKA",
      "PAK",
      "PHL",
      "PNG",
      "SLB",
      "TLS",
      "UZB",
      "VNM",
      "VUT",
      "WSM",
    ];
  } else if (iso == "nc_asia") {
    return ["RUS", "AZE", "KAZ", "TKM", "TJK", "GEO", "ARM", "KGZ", "UZB"];
  } else if (iso == "pacific") {
    return [
      "ASM",
      "COK",
      "FJI",
      "MHL",
      "NIU",
      "NRU",
      "PLW",
      "TON",
      "GUM",
      "MNP",
      "NCL",
      "PYF",
      "AUS",
      "NZL",
      "TUV",
      "FSM",
      "WSM",
      "PNG",
      "KIR",
      "SLB",
      "VUT",
    ];
  } else if (iso == "pacific_developing") {
    return [
      "ASM",
      "COK",
      "FJI",
      "MHL",
      "NIU",
      "NRU",
      "PLW",
      "TON",
      "GUM",
      "MNP",
      "NCL",
      "PYF",
      "TUV",
      "FSM",
      "WSM",
      "PNG",
      "KIR",
      "SLB",
      "VUT",
    ];
  } else if (iso == "ap_pacific_developing") {
    return [
      "ASM",
      "COK",
      "FJI",
      "MHL",
      "NIU",
      "NRU",
      "PLW",
      "TON",
      "GUM",
      "MNP",
      "NCL",
      "PYF",
      "TUV",
      "FSM",
      "WSM",
      "PNG",
      "KIR",
      "SLB",
      "VUT",
    ];
  } else if (iso == "pac") {
    return [
      "ASM",
      "AUS",
      "COK",
      "FJI",
      "FSM",
      "GUM",
      "KIR",
      "MHL",
      "MNP",
      "NCL",
      "NIU",
      "NRU",
      "NZL",
      "PLW",
      "PNG",
      "PYF",
      "SLB",
      "TON",
      "TUV",
      "VUT",
      "WSM",
    ];
  } else if (iso == "rcep") {
    return [
      "THA",
      "MYS",
      "CHN",
      "BRN",
      "SGP",
      "KOR",
      "JPN",
      "KHM",
      "MMR",
      "IDN",
      "PHL",
      "VNM",
      "LAO",
      "AUS",
      "NZL",
    ];
  } else if (iso == "saarc") {
    return ["MDV", "AFG", "NPL", "PAK", "IND", "LKA", "BGD", "BTN"];
  } else if (iso == "se_asia") {
    return [
      "TLS",
      "THA",
      "MYS",
      "BRN",
      "SGP",
      "KHM",
      "MMR",
      "IDN",
      "PHL",
      "VNM",
      "LAO",
    ];
  } else if (iso == "sids") {
    return [
      "BLZ",
      "DMA",
      "GRD",
      "JAM",
      "LCA",
      "MUS",
      "VCT",
      "CUB",
      "DOM",
      "SUR",
      "ABW",
      "AIA",
      "ATG",
      "BHS",
      "BMU",
      "BRB",
      "CUW",
      "CYM",
      "GLP",
      "KNA",
      "MTQ",
      "PRI",
      "SXM",
      "SYC",
      "TCA",
      "TTO",
      "VGB",
      "VIR",
      "COM",
      "GNB",
      "HTI",
      "CPV",
      "GUY",
      "MSR",
      "STP",
      "ASM",
      "COK",
      "FJI",
      "MHL",
      "NIU",
      "NRU",
      "PLW",
      "TON",
      "GUM",
      "MNP",
      "NCL",
      "PYF",
      "TUV",
      "FSM",
      "WSM",
      "PNG",
      "KIR",
      "SLB",
      "VUT",
      "MDV",
      "TLS",
      "SGP",
    ];
  } else if (iso == "ap_sids") {
    return [
      "KIR",
      "SLB",
      "VUT",
      "TUV",
      "FSM",
      "PNG",
      "WSM",
      "ASM",
      "COK",
      "FJI",
      "MHL",
      "NIU",
      "NRU",
      "PLW",
      "TON",
      "GUM",
      "MNP",
      "NCL",
      "PYF",
      "TLS",
      "MDV",
      "SGP",
    ];
  } else if (iso == "speca") {
    return ["AZE", "KAZ", "TKM", "TJK", "KGZ", "UZB", "AFG"];
  } else if (iso == "ssw_asia") {
    return [
      "IRN",
      "TUR",
      "NPL",
      "PAK",
      "IND",
      "LKA",
      "BGD",
      "BTN",
      "MDV",
      "AFG",
    ];
  } else if (iso == "upper_middle_income") {
    return [
      "ALB",
      "BGR",
      "BIH",
      "BLR",
      "DZA",
      "GAB",
      "GNQ",
      "IRQ",
      "ISR",
      "JOR",
      "LBN",
      "LBY",
      "MNE",
      "MYT",
      "NAM",
      "ROU",
      "SPM",
      "SRB",
      "TUN",
      "ZAF",
      "BRA",
      "COL",
      "CRI",
      "ECU",
      "PAN",
      "MEX",
      "PER",
      "BWA",
      "MKD",
      "PRY",
      "MNG",
      "AGO",
      "CHN",
      "THA",
      "MYS",
      "BLZ",
      "DMA",
      "GRD",
      "JAM",
      "LCA",
      "MUS",
      "VCT",
      "CUB",
      "DOM",
      "SUR",
      "GUY",
      "ASM",
      "COK",
      "FJI",
      "MHL",
      "NIU",
      "NRU",
      "PLW",
      "TON",
      "TUV",
      "AZE",
      "KAZ",
      "TKM",
      "IRN",
      "TUR",
      "MDV",
    ];
  } else if (iso == "ap_upper_middle_income") {
    return [
      "ASM",
      "AZE",
      "CHN",
      "COK",
      "FJI",
      "IRN",
      "KAZ",
      "MDV",
      "MHL",
      "MNG",
      "MYS",
      "NIU",
      "NRU",
      "PLW",
      "THA",
      "TKM",
      "TON",
      "TUR",
      "TUV",
    ];
  } else if (iso == "africa_middle_east") {
    return [
      "AGO",
      "ARE",
      "BDI",
      "BEN",
      "BFA",
      "BHR",
      "BWA",
      "CAF",
      "CIV",
      "CMR",
      "COD",
      "COG",
      "COM",
      "CPV",
      "DJI",
      "DZA",
      "EGY",
      "ERI",
      "ESH",
      "ETH",
      "GAB",
      "GHA",
      "GIN",
      "GMB",
      "GNB",
      "GNQ",
      "GUF",
      "IRN",
      "IRQ",
      "ISR",
      "JOR",
      "KEN",
      "KWT",
      "LBN",
      "LBR",
      "LBY",
      "LSO",
      "MAR",
      "MDG",
      "MLI",
      "MOZ",
      "MRT",
      "MUS",
      "MWI",
      "MYT",
      "NAM",
      "NER",
      "NGA",
      "OMN",
      "PSE",
      "QAT",
      "REU",
      "RWA",
      "SAU",
      "SDN",
      "SEN",
      "SHN",
      "SLE",
      "SOM",
      "SSD",
      "STP",
      "SWZ",
      "SYC",
      "SYR",
      "TCD",
      "TGO",
      "TUN",
      "TZA",
      "UGA",
      "YEM",
      "ZAF",
      "ZMB",
      "ZWE",
    ];
  } else if (iso == "eu") {
    return [
      "AUT",
      "BEL",
      "BGR",
      "CYP",
      "CZE",
      "DEU",
      "DNK",
      "ESP",
      "EST",
      "FIN",
      "FRA",
      "GBR",
      "GRC",
      "HRV",
      "HUN",
      "IRL",
      "ITA",
      "LTU",
      "LUX",
      "LVA",
      "MLT",
      "NLD",
      "POL",
      "PRT",
      "ROU",
      "SVK",
      "SVN",
      "SWE",
    ];
  } else if (iso == "europe") {
    return [
      "ALA",
      "ALB",
      "AND",
      "AUT",
      "BEL",
      "BGR",
      "BIH",
      "BLR",
      "CHE",
      "CHI",
      "CSK",
      "CYP",
      "CZE",
      "DEU",
      "DNK",
      "ESP",
      "EST",
      "FIN",
      "FRA",
      "FRO",
      "GBR",
      "GRC",
      "GIB",
      "GGY",
      "HRV",
      "HUN",
      "IMN",
      "IRL",
      "ISL",
      "ITA",
      "JEY",
      "LIE",
      "LTU",
      "LUX",
      "LVA",
      "MCO",
      "MDA",
      "MKD",
      "MLT",
      "MNE",
      "NLD",
      "NOR",
      "POL",
      "PRT",
      "ROU",
      "SJM",
      "SMR",
      "SRB",
      "SVK",
      "SVN",
      "SWE",
      "UKR",
      "VAT",
      "XKX",
      "YUG",
    ];
  } else if (iso == "lac") {
    return [
      "ARG",
      "BOL",
      "BRA",
      "CHL",
      "COL",
      "ECU",
      "MEX",
      "PER",
      "PRY",
      "URY",
      "VEN",
    ];
  } else if (iso == "latin_america__caribbean") {
    return [
      "ABW",
      "AIA",
      "ANT",
      "ARG",
      "ATG",
      "BES",
      "BHS",
      "BLM",
      "BOL",
      "BRA",
      "BLZ",
      "BRB",
      "BVT",
      "CHL",
      "COL",
      "CRI",
      "CUB",
      "CUW",
      "CYM",
      "DMA",
      "DOM",
      "ECU",
      "FLK",
      "GLP",
      "GRD",
      "GTM",
      "GUY",
      "HND",
      "HTI",
      "JAM",
      "KNA",
      "LCA",
      "MAF",
      "MEX",
      "MSR",
      "MTQ",
      "NIC",
      "PAN",
      "PER",
      "PRY",
      "PRI",
      "SLV",
      "SUR",
      "SXM",
      "TCA",
      "TTO",
      "VCT",
      "VGB",
      "VIR",
      "URY",
      "VEN",
    ];
  } else if (iso == "mercosur") {
    return [
      "ARG",
      "BOL",
      "BRA",
      "CHL",
      "COL",
      "ECU",
      "PER",
      "PRY",
      "URY",
      "VEN",
    ];
  } else if (iso == "nafta") {
    return ["CAN", "USA", "MEX"];
  } else if (iso == "north_america") {
    return ["BMU", "GRL", "SPM", "CAN", "USA"];
  } else if (iso == "pac_alliance") {
    return ["CHL", "COL", "PER", "MEX"];
  } else if (iso == "wld") {
    return [
      "ABW",
      "AFG",
      "AGO",
      "AIA",
      "ALA",
      "ALB",
      "AND",
      "ANT",
      "ARE",
      "ARG",
      "ARM",
      "ASM",
      "ATA",
      "ATG",
      "AUS",
      "AUT",
      "AZE",
      "BDI",
      "BEL",
      "BEN",
      "BES",
      "BFA",
      "BGD",
      "BGR",
      "BHR",
      "BHS",
      "BIH",
      "BLM",
      "BLR",
      "BLZ",
      "BMU",
      "BOL",
      "BRA",
      "BRB",
      "BRN",
      "BTN",
      "BVT",
      "BWA",
      "CAF",
      "CAN",
      "CCK",
      "CHE",
      "CHI",
      "CHL",
      "CHN",
      "CIV",
      "CMR",
      "COD",
      "COG",
      "COK",
      "COL",
      "COM",
      "CPV",
      "CRI",
      "CSK",
      "CUB",
      "CUW",
      "CXR",
      "CYM",
      "CYP",
      "CZE",
      "DEU",
      "DJI",
      "DMA",
      "DNK",
      "DOM",
      "DZA",
      "ECU",
      "EGY",
      "ERI",
      "ESH",
      "ESP",
      "EST",
      "ETH",
      "FIN",
      "FJI",
      "FLK",
      "FRA",
      "FRO",
      "FSM",
      "GAB",
      "GBR",
      "GEO",
      "GGY",
      "GHA",
      "GIB",
      "GIN",
      "GLP",
      "GMB",
      "GNB",
      "GNQ",
      "GRC",
      "GRD",
      "GRL",
      "GTM",
      "GUF",
      "GUM",
      "GUY",
      "HKG",
      "HND",
      "HRV",
      "HTI",
      "HUN",
      "IDN",
      "IMN",
      "IND",
      "IRL",
      "IRN",
      "IRQ",
      "ISL",
      "ISR",
      "ITA",
      "JAM",
      "JEY",
      "JOR",
      "JPN",
      "KAZ",
      "KEN",
      "KGZ",
      "KHM",
      "KIR",
      "KNA",
      "KOR",
      "KWT",
      "LAO",
      "LBN",
      "LBR",
      "LBY",
      "LCA",
      "LIE",
      "LKA",
      "LSO",
      "LTU",
      "LUX",
      "LVA",
      "MAC",
      "MAF",
      "MAR",
      "MCO",
      "MDA",
      "MDG",
      "MDV",
      "MEX",
      "MHL",
      "MKD",
      "MLI",
      "MLT",
      "MMR",
      "MNE",
      "MNG",
      "MNP",
      "MOZ",
      "MRT",
      "MSR",
      "MTQ",
      "MUS",
      "MWI",
      "MYS",
      "MYT",
      "NAM",
      "NCL",
      "NER",
      "NFK",
      "NGA",
      "NIC",
      "NIU",
      "NLD",
      "NOR",
      "NPL",
      "NRU",
      "NRU",
      "NZL",
      "OMN",
      "PAK",
      "PAN",
      "PCN",
      "PER",
      "PHL",
      "PLW",
      "PNG",
      "POL",
      "PRI",
      "PRK",
      "PRT",
      "PRY",
      "PSE",
      "PYF",
      "QAT",
      "REU",
      "ROU",
      "RUS",
      "RWA",
      "SAU",
      "SDN",
      "SEN",
      "SGP",
      "SHN",
      "SJM",
      "SLB",
      "SLE",
      "SLV",
      "SMR",
      "SOM",
      "SPM",
      "SRB",
      "SSD",
      "STP",
      "SUR",
      "SVK",
      "SVN",
      "SWE",
      "SWZ",
      "SXM",
      "SYC",
      "SYR",
      "TCA",
      "TCD",
      "TGO",
      "THA",
      "TJK",
      "TKL",
      "TKM",
      "TLS",
      "TON",
      "TTO",
      "TUN",
      "TUR",
      "TUV",
      "TWN",
      "TZA",
      "UGA",
      "UKR",
      "URY",
      "USA",
      "UZB",
      "VAT",
      "VCT",
      "VEN",
      "VGB",
      "VIR",
      "VNM",
      "VUT",
      "WLF",
      "WSM",
      "XKX",
      "YEM",
      "YUG",
      "ZAF",
      "ZMB",
      "ZWE",
    ];
  } else {
    return [iso];
  }
}
