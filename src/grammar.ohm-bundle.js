'use strict';const {makeRecipe}=require('ohm-js');const result=makeRecipe(["grammar",{"source":"Wit {\n\n  File\n    = (PackageDecl \";\")? (PackageItem | NestedPackageDefinition)*\n\n  PackageDecl\n    = \"package\" packageIdentifier\n\n  NestedPackageDefinition = PackageDecl \"{\" PackageItem* \"}\"\n\n  PackageItem\n    = ToplevelUseItem\n    | InterfaceItem\n    | WorldItem\n\n  WorldItem = Gate \"world\" ident \"{\" WorldItems* \"}\"\n\n  WorldItems = Gate WorldDefinition\n\n  WorldDefinition\n    = ExportItem\n    | ImportItem\n    | UseItem\n    | TypedefItem\n    | IncludeItem\n\n  ExportItem\n    = ExportItemExternType\n    | ExportItemUsePath\n\n  ExportItemExternType = \"export\" ident \":\" ExternType\n\n  ExportItemUsePath = \"export\" UsePath \";\"\n\n  ImportItem\n    = ImportItemExternType\n    | ImportItemUsePath\n\n  ImportItemExternType = \"import\" ident \":\" ExternType\n\n  ImportItemUsePath = \"import\" UsePath \";\"\n\n  IncludeItem\n    = \"include\" UsePath \";\"                                 -- simple\n    | \"include\" UsePath \"with\" \"{\" IncludeNamesList \"}\"     -- aliased\n\n  IncludeNamesList = IncludeNamesItem (\",\" IncludeNamesItem)*\n\n  IncludeNamesItem = ident \"as\" ident\n\n  UseItem = \"use\" UsePath \".\" \"{\" UseNamesList \"}\"\n\n  UseNamesList =\n  \tUseNamesItem (\",\" UseNamesItem)*\n\n  UseNamesItem = ident (\"as\" ident)?\n\n  ExternType\n    = ExternTypeFunc\n    | ExternTypeInterface\n\n  ExternTypeFunc = FuncType \";\"\n\n  ExternTypeInterface = \"interface\" \"{\" InterfaceItems* \"}\"\n\n  ToplevelUseItem = \"use\" UsePath (\"as\" ident)? \";\"\n\n  UsePath\n    = QualifiedUsePath\n    | BareUsePath\n\n  BareUsePath = ident\n\n  QualifiedUsePath = packageIdentifier\n\n  InterfaceItem\n    = \"interface\" ident \"{\" InterfaceItems* \"}\"\n\n  InterfaceItems = Gate InterfaceDefinition\n\n  InterfaceDefinition\n    = TypedefItem\n    | UseItem\n    | FuncItem\n\n  TypedefItem\n    = TypeItem\n    | RecordItem\n    | EnumItem\n    | VariantItem\n    | FlagsItems\n    | FuncItem\n\n  Gate\n    = GateItem*\n\n  GateItem\n    = UnstableGate\n    | SinceGate\n    | DeprecatedGate\n\n  UnstableGate = \"@unstable\" \"(\" FeatureField \")\"\n\n  SinceGate = \"@since\" \"(\" VersionField \")\"\n\n  DeprecatedGate = \"@deprecated\" \"(\" VersionField \")\"\n\n  FeatureField = \"feature\" \"=\" ident\n\n  VersionField = \"version\" \"=\" version\n\n  FlagsItems\n    = \"flags\" ident \"{\" FlagsFields \"}\"\n\n  FlagsFields = FlagsField (\",\" FlagsField)*\n\n  FlagsField = ident\n\n  TypeItem\n    = \"type\" ident \"=\" TypeRef \";\"\n\n  VariantItem\n    = \"variant\" ident \"{\" VariantCases \"}\"\n\n  VariantCases\n  \t= VariantCase (\",\" VariantCase)*\n\n  VariantCase\n    = ident (\"(\" TypeRef \")\")?\n\n  EnumItem\n    = \"enum\" ident \"{\" EnumCases \"}\"\n\n  EnumCases\n  \t= EnumCase (\",\" EnumCase)*\n\n  EnumCase\n    = ident\n\n  RecordItem\n    = \"record\" ident \"{\" RecordFields \"}\"\n\n  RecordFields\n  \t= RecordField (\",\" RecordField)*\n\n  RecordField\n    = ident \":\" TypeRef\n\n  ResourceItem\n  \t= \"resource\" ident \"{\" ResourceMethod* \"}\"\n\n  ResourceMethod\n    = FuncItem -- method\n    | ident \":\" \"static\" FuncType \";\" -- static\n    | \"constructor\" ParamList \";\" -- constructor\n\n  FuncItem = ident \":\" FuncType \";\"\n\n  FuncType = \"async\"? \"func\" ParamList ResultList?\n\n  ParamList = \"(\" NamedTypeList? \")\"\n\n  NamedTypeList = NamedType (\",\" NamedType)*\n\n  NamedType = ident \":\" TypeRef\n\n  ResultList = \"->\" TypeRef\n\n  TypeRef\n  \t= SimpleType\n    | ResultType\n    | TupleType\n    | OptionType\n    | ListType\n    | RefType\n\n  RefType = ident\n\n  ResultType = \"result\" \"<\" TypeRef (\",\" TypeRef)? \">\"\n\n  TupleType = \"tuple<\" TypeRef (\",\" TypeRef)* \">\"\n\n  OptionType = \"option<\" TypeRef \">\"\n\n  ListType = \"list<\" TypeRef \">\"\n\n  SimpleType\n  \t= \"s8\" | \"s16\" | \"s32\" | \"s64\"\n    | \"u8\" | \"u16\" | \"u32\" | \"u64\"\n    | \"f32\" | \"f64\"\n    | \"bool\"\n    | \"string\"\n    | \"char\"\n\n  packageIdentifier\n  \t= (ident \":\")+ package (\"@\" version)?\n\n  version\n    = (digit+) \".\" (digit+) \".\" (digit+)\n\n  package\n  \t= ident (\"/\" ident)*\n\n  ident\n    = label\n\n  label\n    = fragment (\"-\" fragment)*\n\n  fragment\n    = word\n    | acronym\n\n  word\n    = lower (lower | digit)*\n\n  acronym\n    = upper (upper | digit)*\n\n  space := whitespace | lineComment | multiLineComment\n  whitespace = \" \" | \"\\t\" | \"\\n\" | \"\\r\"  // explicit whitespace chars\n  lineComment = \"//\" (~\"\\n\" any)* \"\\n\"    // single line comments\n  multiLineComment = \"/*\" (~\"*/\" any)* \"*/\"  // multi-line comments\n\n}"},"Wit",null,"File",{"File":["define",{"sourceInterval":[9,79]},null,[],["seq",{"sourceInterval":[20,79]},["opt",{"sourceInterval":[20,38]},["seq",{"sourceInterval":[21,36]},["app",{"sourceInterval":[21,32]},"PackageDecl",[]],["terminal",{"sourceInterval":[33,36]},";"]]],["star",{"sourceInterval":[39,79]},["alt",{"sourceInterval":[40,77]},["app",{"sourceInterval":[40,51]},"PackageItem",[]],["app",{"sourceInterval":[54,77]},"NestedPackageDefinition",[]]]]]],"PackageDecl":["define",{"sourceInterval":[83,128]},null,[],["seq",{"sourceInterval":[101,128]},["terminal",{"sourceInterval":[101,110]},"package"],["app",{"sourceInterval":[111,128]},"packageIdentifier",[]]]],"NestedPackageDefinition":["define",{"sourceInterval":[132,190]},null,[],["seq",{"sourceInterval":[158,190]},["app",{"sourceInterval":[158,169]},"PackageDecl",[]],["terminal",{"sourceInterval":[170,173]},"{"],["star",{"sourceInterval":[174,186]},["app",{"sourceInterval":[174,185]},"PackageItem",[]]],["terminal",{"sourceInterval":[187,190]},"}"]]],"PackageItem":["define",{"sourceInterval":[194,263]},null,[],["alt",{"sourceInterval":[212,263]},["app",{"sourceInterval":[212,227]},"ToplevelUseItem",[]],["app",{"sourceInterval":[234,247]},"InterfaceItem",[]],["app",{"sourceInterval":[254,263]},"WorldItem",[]]]],"WorldItem":["define",{"sourceInterval":[267,317]},null,[],["seq",{"sourceInterval":[279,317]},["app",{"sourceInterval":[279,283]},"Gate",[]],["terminal",{"sourceInterval":[284,291]},"world"],["app",{"sourceInterval":[292,297]},"ident",[]],["terminal",{"sourceInterval":[298,301]},"{"],["star",{"sourceInterval":[302,313]},["app",{"sourceInterval":[302,312]},"WorldItems",[]]],["terminal",{"sourceInterval":[314,317]},"}"]]],"WorldItems":["define",{"sourceInterval":[321,354]},null,[],["seq",{"sourceInterval":[334,354]},["app",{"sourceInterval":[334,338]},"Gate",[]],["app",{"sourceInterval":[339,354]},"WorldDefinition",[]]]],"WorldDefinition":["define",{"sourceInterval":[358,457]},null,[],["alt",{"sourceInterval":[380,457]},["app",{"sourceInterval":[380,390]},"ExportItem",[]],["app",{"sourceInterval":[397,407]},"ImportItem",[]],["app",{"sourceInterval":[414,421]},"UseItem",[]],["app",{"sourceInterval":[428,439]},"TypedefItem",[]],["app",{"sourceInterval":[446,457]},"IncludeItem",[]]]],"ExportItem":["define",{"sourceInterval":[461,522]},null,[],["alt",{"sourceInterval":[478,522]},["app",{"sourceInterval":[478,498]},"ExportItemExternType",[]],["app",{"sourceInterval":[505,522]},"ExportItemUsePath",[]]]],"ExportItemExternType":["define",{"sourceInterval":[526,578]},null,[],["seq",{"sourceInterval":[549,578]},["terminal",{"sourceInterval":[549,557]},"export"],["app",{"sourceInterval":[558,563]},"ident",[]],["terminal",{"sourceInterval":[564,567]},":"],["app",{"sourceInterval":[568,578]},"ExternType",[]]]],"ExportItemUsePath":["define",{"sourceInterval":[582,622]},null,[],["seq",{"sourceInterval":[602,622]},["terminal",{"sourceInterval":[602,610]},"export"],["app",{"sourceInterval":[611,618]},"UsePath",[]],["terminal",{"sourceInterval":[619,622]},";"]]],"ImportItem":["define",{"sourceInterval":[626,687]},null,[],["alt",{"sourceInterval":[643,687]},["app",{"sourceInterval":[643,663]},"ImportItemExternType",[]],["app",{"sourceInterval":[670,687]},"ImportItemUsePath",[]]]],"ImportItemExternType":["define",{"sourceInterval":[691,743]},null,[],["seq",{"sourceInterval":[714,743]},["terminal",{"sourceInterval":[714,722]},"import"],["app",{"sourceInterval":[723,728]},"ident",[]],["terminal",{"sourceInterval":[729,732]},":"],["app",{"sourceInterval":[733,743]},"ExternType",[]]]],"ImportItemUsePath":["define",{"sourceInterval":[747,787]},null,[],["seq",{"sourceInterval":[767,787]},["terminal",{"sourceInterval":[767,775]},"import"],["app",{"sourceInterval":[776,783]},"UsePath",[]],["terminal",{"sourceInterval":[784,787]},";"]]],"IncludeItem_simple":["define",{"sourceInterval":[809,872]},null,[],["seq",{"sourceInterval":[809,830]},["terminal",{"sourceInterval":[809,818]},"include"],["app",{"sourceInterval":[819,826]},"UsePath",[]],["terminal",{"sourceInterval":[827,830]},";"]]],"IncludeItem_aliased":["define",{"sourceInterval":[879,943]},null,[],["seq",{"sourceInterval":[879,928]},["terminal",{"sourceInterval":[879,888]},"include"],["app",{"sourceInterval":[889,896]},"UsePath",[]],["terminal",{"sourceInterval":[897,903]},"with"],["terminal",{"sourceInterval":[904,907]},"{"],["app",{"sourceInterval":[908,924]},"IncludeNamesList",[]],["terminal",{"sourceInterval":[925,928]},"}"]]],"IncludeItem":["define",{"sourceInterval":[791,943]},null,[],["alt",{"sourceInterval":[809,943]},["app",{"sourceInterval":[809,830]},"IncludeItem_simple",[]],["app",{"sourceInterval":[879,928]},"IncludeItem_aliased",[]]]],"IncludeNamesList":["define",{"sourceInterval":[947,1006]},null,[],["seq",{"sourceInterval":[966,1006]},["app",{"sourceInterval":[966,982]},"IncludeNamesItem",[]],["star",{"sourceInterval":[983,1006]},["seq",{"sourceInterval":[984,1004]},["terminal",{"sourceInterval":[984,987]},","],["app",{"sourceInterval":[988,1004]},"IncludeNamesItem",[]]]]]],"IncludeNamesItem":["define",{"sourceInterval":[1010,1045]},null,[],["seq",{"sourceInterval":[1029,1045]},["app",{"sourceInterval":[1029,1034]},"ident",[]],["terminal",{"sourceInterval":[1035,1039]},"as"],["app",{"sourceInterval":[1040,1045]},"ident",[]]]],"UseItem":["define",{"sourceInterval":[1049,1097]},null,[],["seq",{"sourceInterval":[1059,1097]},["terminal",{"sourceInterval":[1059,1064]},"use"],["app",{"sourceInterval":[1065,1072]},"UsePath",[]],["terminal",{"sourceInterval":[1073,1076]},"."],["terminal",{"sourceInterval":[1077,1080]},"{"],["app",{"sourceInterval":[1081,1093]},"UseNamesList",[]],["terminal",{"sourceInterval":[1094,1097]},"}"]]],"UseNamesList":["define",{"sourceInterval":[1101,1151]},null,[],["seq",{"sourceInterval":[1119,1151]},["app",{"sourceInterval":[1119,1131]},"UseNamesItem",[]],["star",{"sourceInterval":[1132,1151]},["seq",{"sourceInterval":[1133,1149]},["terminal",{"sourceInterval":[1133,1136]},","],["app",{"sourceInterval":[1137,1149]},"UseNamesItem",[]]]]]],"UseNamesItem":["define",{"sourceInterval":[1155,1189]},null,[],["seq",{"sourceInterval":[1170,1189]},["app",{"sourceInterval":[1170,1175]},"ident",[]],["opt",{"sourceInterval":[1176,1189]},["seq",{"sourceInterval":[1177,1187]},["terminal",{"sourceInterval":[1177,1181]},"as"],["app",{"sourceInterval":[1182,1187]},"ident",[]]]]]],"ExternType":["define",{"sourceInterval":[1193,1250]},null,[],["alt",{"sourceInterval":[1210,1250]},["app",{"sourceInterval":[1210,1224]},"ExternTypeFunc",[]],["app",{"sourceInterval":[1231,1250]},"ExternTypeInterface",[]]]],"ExternTypeFunc":["define",{"sourceInterval":[1254,1283]},null,[],["seq",{"sourceInterval":[1271,1283]},["app",{"sourceInterval":[1271,1279]},"FuncType",[]],["terminal",{"sourceInterval":[1280,1283]},";"]]],"ExternTypeInterface":["define",{"sourceInterval":[1287,1344]},null,[],["seq",{"sourceInterval":[1309,1344]},["terminal",{"sourceInterval":[1309,1320]},"interface"],["terminal",{"sourceInterval":[1321,1324]},"{"],["star",{"sourceInterval":[1325,1340]},["app",{"sourceInterval":[1325,1339]},"InterfaceItems",[]]],["terminal",{"sourceInterval":[1341,1344]},"}"]]],"ToplevelUseItem":["define",{"sourceInterval":[1348,1397]},null,[],["seq",{"sourceInterval":[1366,1397]},["terminal",{"sourceInterval":[1366,1371]},"use"],["app",{"sourceInterval":[1372,1379]},"UsePath",[]],["opt",{"sourceInterval":[1380,1393]},["seq",{"sourceInterval":[1381,1391]},["terminal",{"sourceInterval":[1381,1385]},"as"],["app",{"sourceInterval":[1386,1391]},"ident",[]]]],["terminal",{"sourceInterval":[1394,1397]},";"]]],"UsePath":["define",{"sourceInterval":[1401,1449]},null,[],["alt",{"sourceInterval":[1415,1449]},["app",{"sourceInterval":[1415,1431]},"QualifiedUsePath",[]],["app",{"sourceInterval":[1438,1449]},"BareUsePath",[]]]],"BareUsePath":["define",{"sourceInterval":[1453,1472]},null,[],["app",{"sourceInterval":[1467,1472]},"ident",[]]],"QualifiedUsePath":["define",{"sourceInterval":[1476,1512]},null,[],["app",{"sourceInterval":[1495,1512]},"packageIdentifier",[]]],"InterfaceItem":["define",{"sourceInterval":[1516,1577]},null,[],["seq",{"sourceInterval":[1536,1577]},["terminal",{"sourceInterval":[1536,1547]},"interface"],["app",{"sourceInterval":[1548,1553]},"ident",[]],["terminal",{"sourceInterval":[1554,1557]},"{"],["star",{"sourceInterval":[1558,1573]},["app",{"sourceInterval":[1558,1572]},"InterfaceItems",[]]],["terminal",{"sourceInterval":[1574,1577]},"}"]]],"InterfaceItems":["define",{"sourceInterval":[1581,1622]},null,[],["seq",{"sourceInterval":[1598,1622]},["app",{"sourceInterval":[1598,1602]},"Gate",[]],["app",{"sourceInterval":[1603,1622]},"InterfaceDefinition",[]]]],"InterfaceDefinition":["define",{"sourceInterval":[1626,1692]},null,[],["alt",{"sourceInterval":[1652,1692]},["app",{"sourceInterval":[1652,1663]},"TypedefItem",[]],["app",{"sourceInterval":[1670,1677]},"UseItem",[]],["app",{"sourceInterval":[1684,1692]},"FuncItem",[]]]],"TypedefItem":["define",{"sourceInterval":[1696,1804]},null,[],["alt",{"sourceInterval":[1714,1804]},["app",{"sourceInterval":[1714,1722]},"TypeItem",[]],["app",{"sourceInterval":[1729,1739]},"RecordItem",[]],["app",{"sourceInterval":[1746,1754]},"EnumItem",[]],["app",{"sourceInterval":[1761,1772]},"VariantItem",[]],["app",{"sourceInterval":[1779,1789]},"FlagsItems",[]],["app",{"sourceInterval":[1796,1804]},"FuncItem",[]]]],"Gate":["define",{"sourceInterval":[1808,1828]},null,[],["star",{"sourceInterval":[1819,1828]},["app",{"sourceInterval":[1819,1827]},"GateItem",[]]]],"GateItem":["define",{"sourceInterval":[1832,1896]},null,[],["alt",{"sourceInterval":[1847,1896]},["app",{"sourceInterval":[1847,1859]},"UnstableGate",[]],["app",{"sourceInterval":[1866,1875]},"SinceGate",[]],["app",{"sourceInterval":[1882,1896]},"DeprecatedGate",[]]]],"UnstableGate":["define",{"sourceInterval":[1900,1947]},null,[],["seq",{"sourceInterval":[1915,1947]},["terminal",{"sourceInterval":[1915,1926]},"@unstable"],["terminal",{"sourceInterval":[1927,1930]},"("],["app",{"sourceInterval":[1931,1943]},"FeatureField",[]],["terminal",{"sourceInterval":[1944,1947]},")"]]],"SinceGate":["define",{"sourceInterval":[1951,1992]},null,[],["seq",{"sourceInterval":[1963,1992]},["terminal",{"sourceInterval":[1963,1971]},"@since"],["terminal",{"sourceInterval":[1972,1975]},"("],["app",{"sourceInterval":[1976,1988]},"VersionField",[]],["terminal",{"sourceInterval":[1989,1992]},")"]]],"DeprecatedGate":["define",{"sourceInterval":[1996,2047]},null,[],["seq",{"sourceInterval":[2013,2047]},["terminal",{"sourceInterval":[2013,2026]},"@deprecated"],["terminal",{"sourceInterval":[2027,2030]},"("],["app",{"sourceInterval":[2031,2043]},"VersionField",[]],["terminal",{"sourceInterval":[2044,2047]},")"]]],"FeatureField":["define",{"sourceInterval":[2051,2085]},null,[],["seq",{"sourceInterval":[2066,2085]},["terminal",{"sourceInterval":[2066,2075]},"feature"],["terminal",{"sourceInterval":[2076,2079]},"="],["app",{"sourceInterval":[2080,2085]},"ident",[]]]],"VersionField":["define",{"sourceInterval":[2089,2125]},null,[],["seq",{"sourceInterval":[2104,2125]},["terminal",{"sourceInterval":[2104,2113]},"version"],["terminal",{"sourceInterval":[2114,2117]},"="],["app",{"sourceInterval":[2118,2125]},"version",[]]]],"FlagsItems":["define",{"sourceInterval":[2129,2179]},null,[],["seq",{"sourceInterval":[2146,2179]},["terminal",{"sourceInterval":[2146,2153]},"flags"],["app",{"sourceInterval":[2154,2159]},"ident",[]],["terminal",{"sourceInterval":[2160,2163]},"{"],["app",{"sourceInterval":[2164,2175]},"FlagsFields",[]],["terminal",{"sourceInterval":[2176,2179]},"}"]]],"FlagsFields":["define",{"sourceInterval":[2183,2225]},null,[],["seq",{"sourceInterval":[2197,2225]},["app",{"sourceInterval":[2197,2207]},"FlagsField",[]],["star",{"sourceInterval":[2208,2225]},["seq",{"sourceInterval":[2209,2223]},["terminal",{"sourceInterval":[2209,2212]},","],["app",{"sourceInterval":[2213,2223]},"FlagsField",[]]]]]],"FlagsField":["define",{"sourceInterval":[2229,2247]},null,[],["app",{"sourceInterval":[2242,2247]},"ident",[]]],"TypeItem":["define",{"sourceInterval":[2251,2294]},null,[],["seq",{"sourceInterval":[2266,2294]},["terminal",{"sourceInterval":[2266,2272]},"type"],["app",{"sourceInterval":[2273,2278]},"ident",[]],["terminal",{"sourceInterval":[2279,2282]},"="],["app",{"sourceInterval":[2283,2290]},"TypeRef",[]],["terminal",{"sourceInterval":[2291,2294]},";"]]],"VariantItem":["define",{"sourceInterval":[2298,2352]},null,[],["seq",{"sourceInterval":[2316,2352]},["terminal",{"sourceInterval":[2316,2325]},"variant"],["app",{"sourceInterval":[2326,2331]},"ident",[]],["terminal",{"sourceInterval":[2332,2335]},"{"],["app",{"sourceInterval":[2336,2348]},"VariantCases",[]],["terminal",{"sourceInterval":[2349,2352]},"}"]]],"VariantCases":["define",{"sourceInterval":[2356,2404]},null,[],["seq",{"sourceInterval":[2374,2404]},["app",{"sourceInterval":[2374,2385]},"VariantCase",[]],["star",{"sourceInterval":[2386,2404]},["seq",{"sourceInterval":[2387,2402]},["terminal",{"sourceInterval":[2387,2390]},","],["app",{"sourceInterval":[2391,2402]},"VariantCase",[]]]]]],"VariantCase":["define",{"sourceInterval":[2408,2450]},null,[],["seq",{"sourceInterval":[2426,2450]},["app",{"sourceInterval":[2426,2431]},"ident",[]],["opt",{"sourceInterval":[2432,2450]},["seq",{"sourceInterval":[2433,2448]},["terminal",{"sourceInterval":[2433,2436]},"("],["app",{"sourceInterval":[2437,2444]},"TypeRef",[]],["terminal",{"sourceInterval":[2445,2448]},")"]]]]],"EnumItem":["define",{"sourceInterval":[2454,2499]},null,[],["seq",{"sourceInterval":[2469,2499]},["terminal",{"sourceInterval":[2469,2475]},"enum"],["app",{"sourceInterval":[2476,2481]},"ident",[]],["terminal",{"sourceInterval":[2482,2485]},"{"],["app",{"sourceInterval":[2486,2495]},"EnumCases",[]],["terminal",{"sourceInterval":[2496,2499]},"}"]]],"EnumCases":["define",{"sourceInterval":[2503,2542]},null,[],["seq",{"sourceInterval":[2518,2542]},["app",{"sourceInterval":[2518,2526]},"EnumCase",[]],["star",{"sourceInterval":[2527,2542]},["seq",{"sourceInterval":[2528,2540]},["terminal",{"sourceInterval":[2528,2531]},","],["app",{"sourceInterval":[2532,2540]},"EnumCase",[]]]]]],"EnumCase":["define",{"sourceInterval":[2546,2566]},null,[],["app",{"sourceInterval":[2561,2566]},"ident",[]]],"RecordItem":["define",{"sourceInterval":[2570,2622]},null,[],["seq",{"sourceInterval":[2587,2622]},["terminal",{"sourceInterval":[2587,2595]},"record"],["app",{"sourceInterval":[2596,2601]},"ident",[]],["terminal",{"sourceInterval":[2602,2605]},"{"],["app",{"sourceInterval":[2606,2618]},"RecordFields",[]],["terminal",{"sourceInterval":[2619,2622]},"}"]]],"RecordFields":["define",{"sourceInterval":[2626,2674]},null,[],["seq",{"sourceInterval":[2644,2674]},["app",{"sourceInterval":[2644,2655]},"RecordField",[]],["star",{"sourceInterval":[2656,2674]},["seq",{"sourceInterval":[2657,2672]},["terminal",{"sourceInterval":[2657,2660]},","],["app",{"sourceInterval":[2661,2672]},"RecordField",[]]]]]],"RecordField":["define",{"sourceInterval":[2678,2713]},null,[],["seq",{"sourceInterval":[2696,2713]},["app",{"sourceInterval":[2696,2701]},"ident",[]],["terminal",{"sourceInterval":[2702,2705]},":"],["app",{"sourceInterval":[2706,2713]},"TypeRef",[]]]],"ResourceItem":["define",{"sourceInterval":[2717,2775]},null,[],["seq",{"sourceInterval":[2735,2775]},["terminal",{"sourceInterval":[2735,2745]},"resource"],["app",{"sourceInterval":[2746,2751]},"ident",[]],["terminal",{"sourceInterval":[2752,2755]},"{"],["star",{"sourceInterval":[2756,2771]},["app",{"sourceInterval":[2756,2770]},"ResourceMethod",[]]],["terminal",{"sourceInterval":[2772,2775]},"}"]]],"ResourceMethod_method":["define",{"sourceInterval":[2800,2818]},null,[],["app",{"sourceInterval":[2800,2808]},"FuncItem",[]]],"ResourceMethod_static":["define",{"sourceInterval":[2825,2866]},null,[],["seq",{"sourceInterval":[2825,2856]},["app",{"sourceInterval":[2825,2830]},"ident",[]],["terminal",{"sourceInterval":[2831,2834]},":"],["terminal",{"sourceInterval":[2835,2843]},"static"],["app",{"sourceInterval":[2844,2852]},"FuncType",[]],["terminal",{"sourceInterval":[2853,2856]},";"]]],"ResourceMethod_constructor":["define",{"sourceInterval":[2873,2915]},null,[],["seq",{"sourceInterval":[2873,2900]},["terminal",{"sourceInterval":[2873,2886]},"constructor"],["app",{"sourceInterval":[2887,2896]},"ParamList",[]],["terminal",{"sourceInterval":[2897,2900]},";"]]],"ResourceMethod":["define",{"sourceInterval":[2779,2915]},null,[],["alt",{"sourceInterval":[2800,2915]},["app",{"sourceInterval":[2800,2808]},"ResourceMethod_method",[]],["app",{"sourceInterval":[2825,2856]},"ResourceMethod_static",[]],["app",{"sourceInterval":[2873,2900]},"ResourceMethod_constructor",[]]]],"FuncItem":["define",{"sourceInterval":[2919,2952]},null,[],["seq",{"sourceInterval":[2930,2952]},["app",{"sourceInterval":[2930,2935]},"ident",[]],["terminal",{"sourceInterval":[2936,2939]},":"],["app",{"sourceInterval":[2940,2948]},"FuncType",[]],["terminal",{"sourceInterval":[2949,2952]},";"]]],"FuncType":["define",{"sourceInterval":[2956,3004]},null,[],["seq",{"sourceInterval":[2967,3004]},["opt",{"sourceInterval":[2967,2975]},["terminal",{"sourceInterval":[2967,2974]},"async"]],["terminal",{"sourceInterval":[2976,2982]},"func"],["app",{"sourceInterval":[2983,2992]},"ParamList",[]],["opt",{"sourceInterval":[2993,3004]},["app",{"sourceInterval":[2993,3003]},"ResultList",[]]]]],"ParamList":["define",{"sourceInterval":[3008,3042]},null,[],["seq",{"sourceInterval":[3020,3042]},["terminal",{"sourceInterval":[3020,3023]},"("],["opt",{"sourceInterval":[3024,3038]},["app",{"sourceInterval":[3024,3037]},"NamedTypeList",[]]],["terminal",{"sourceInterval":[3039,3042]},")"]]],"NamedTypeList":["define",{"sourceInterval":[3046,3088]},null,[],["seq",{"sourceInterval":[3062,3088]},["app",{"sourceInterval":[3062,3071]},"NamedType",[]],["star",{"sourceInterval":[3072,3088]},["seq",{"sourceInterval":[3073,3086]},["terminal",{"sourceInterval":[3073,3076]},","],["app",{"sourceInterval":[3077,3086]},"NamedType",[]]]]]],"NamedType":["define",{"sourceInterval":[3092,3121]},null,[],["seq",{"sourceInterval":[3104,3121]},["app",{"sourceInterval":[3104,3109]},"ident",[]],["terminal",{"sourceInterval":[3110,3113]},":"],["app",{"sourceInterval":[3114,3121]},"TypeRef",[]]]],"ResultList":["define",{"sourceInterval":[3125,3150]},null,[],["seq",{"sourceInterval":[3138,3150]},["terminal",{"sourceInterval":[3138,3142]},"->"],["app",{"sourceInterval":[3143,3150]},"TypeRef",[]]]],"TypeRef":["define",{"sourceInterval":[3154,3256]},null,[],["alt",{"sourceInterval":[3167,3256]},["app",{"sourceInterval":[3167,3177]},"SimpleType",[]],["app",{"sourceInterval":[3184,3194]},"ResultType",[]],["app",{"sourceInterval":[3201,3210]},"TupleType",[]],["app",{"sourceInterval":[3217,3227]},"OptionType",[]],["app",{"sourceInterval":[3234,3242]},"ListType",[]],["app",{"sourceInterval":[3249,3256]},"RefType",[]]]],"RefType":["define",{"sourceInterval":[3260,3275]},null,[],["app",{"sourceInterval":[3270,3275]},"ident",[]]],"ResultType":["define",{"sourceInterval":[3279,3331]},null,[],["seq",{"sourceInterval":[3292,3331]},["terminal",{"sourceInterval":[3292,3300]},"result"],["terminal",{"sourceInterval":[3301,3304]},"<"],["app",{"sourceInterval":[3305,3312]},"TypeRef",[]],["opt",{"sourceInterval":[3313,3327]},["seq",{"sourceInterval":[3314,3325]},["terminal",{"sourceInterval":[3314,3317]},","],["app",{"sourceInterval":[3318,3325]},"TypeRef",[]]]],["terminal",{"sourceInterval":[3328,3331]},">"]]],"TupleType":["define",{"sourceInterval":[3335,3382]},null,[],["seq",{"sourceInterval":[3347,3382]},["terminal",{"sourceInterval":[3347,3355]},"tuple<"],["app",{"sourceInterval":[3356,3363]},"TypeRef",[]],["star",{"sourceInterval":[3364,3378]},["seq",{"sourceInterval":[3365,3376]},["terminal",{"sourceInterval":[3365,3368]},","],["app",{"sourceInterval":[3369,3376]},"TypeRef",[]]]],["terminal",{"sourceInterval":[3379,3382]},">"]]],"OptionType":["define",{"sourceInterval":[3386,3420]},null,[],["seq",{"sourceInterval":[3399,3420]},["terminal",{"sourceInterval":[3399,3408]},"option<"],["app",{"sourceInterval":[3409,3416]},"TypeRef",[]],["terminal",{"sourceInterval":[3417,3420]},">"]]],"ListType":["define",{"sourceInterval":[3424,3454]},null,[],["seq",{"sourceInterval":[3435,3454]},["terminal",{"sourceInterval":[3435,3442]},"list<"],["app",{"sourceInterval":[3443,3450]},"TypeRef",[]],["terminal",{"sourceInterval":[3451,3454]},">"]]],"SimpleType":["define",{"sourceInterval":[3458,3598]},null,[],["alt",{"sourceInterval":[3474,3598]},["terminal",{"sourceInterval":[3474,3478]},"s8"],["terminal",{"sourceInterval":[3481,3486]},"s16"],["terminal",{"sourceInterval":[3489,3494]},"s32"],["terminal",{"sourceInterval":[3497,3502]},"s64"],["terminal",{"sourceInterval":[3509,3513]},"u8"],["terminal",{"sourceInterval":[3516,3521]},"u16"],["terminal",{"sourceInterval":[3524,3529]},"u32"],["terminal",{"sourceInterval":[3532,3537]},"u64"],["terminal",{"sourceInterval":[3544,3549]},"f32"],["terminal",{"sourceInterval":[3552,3557]},"f64"],["terminal",{"sourceInterval":[3564,3570]},"bool"],["terminal",{"sourceInterval":[3577,3585]},"string"],["terminal",{"sourceInterval":[3592,3598]},"char"]]],"packageIdentifier":["define",{"sourceInterval":[3602,3660]},null,[],["seq",{"sourceInterval":[3625,3660]},["plus",{"sourceInterval":[3625,3637]},["seq",{"sourceInterval":[3626,3635]},["app",{"sourceInterval":[3626,3631]},"ident",[]],["terminal",{"sourceInterval":[3632,3635]},":"]]],["app",{"sourceInterval":[3638,3645]},"package",[]],["opt",{"sourceInterval":[3646,3660]},["seq",{"sourceInterval":[3647,3658]},["terminal",{"sourceInterval":[3647,3650]},"@"],["app",{"sourceInterval":[3651,3658]},"version",[]]]]]],"version":["define",{"sourceInterval":[3664,3712]},null,[],["seq",{"sourceInterval":[3678,3712]},["plus",{"sourceInterval":[3679,3685]},["app",{"sourceInterval":[3679,3684]},"digit",[]]],["terminal",{"sourceInterval":[3687,3690]},"."],["plus",{"sourceInterval":[3692,3698]},["app",{"sourceInterval":[3692,3697]},"digit",[]]],["terminal",{"sourceInterval":[3700,3703]},"."],["plus",{"sourceInterval":[3705,3711]},["app",{"sourceInterval":[3705,3710]},"digit",[]]]]],"package":["define",{"sourceInterval":[3716,3747]},null,[],["seq",{"sourceInterval":[3729,3747]},["app",{"sourceInterval":[3729,3734]},"ident",[]],["star",{"sourceInterval":[3735,3747]},["seq",{"sourceInterval":[3736,3745]},["terminal",{"sourceInterval":[3736,3739]},"/"],["app",{"sourceInterval":[3740,3745]},"ident",[]]]]]],"ident":["define",{"sourceInterval":[3751,3768]},null,[],["app",{"sourceInterval":[3763,3768]},"label",[]]],"label":["define",{"sourceInterval":[3772,3808]},null,[],["seq",{"sourceInterval":[3784,3808]},["app",{"sourceInterval":[3784,3792]},"fragment",[]],["star",{"sourceInterval":[3793,3808]},["seq",{"sourceInterval":[3794,3806]},["terminal",{"sourceInterval":[3794,3797]},"-"],["app",{"sourceInterval":[3798,3806]},"fragment",[]]]]]],"fragment":["define",{"sourceInterval":[3812,3845]},null,[],["alt",{"sourceInterval":[3827,3845]},["app",{"sourceInterval":[3827,3831]},"word",[]],["app",{"sourceInterval":[3838,3845]},"acronym",[]]]],"word":["define",{"sourceInterval":[3849,3882]},null,[],["seq",{"sourceInterval":[3860,3882]},["app",{"sourceInterval":[3860,3865]},"lower",[]],["star",{"sourceInterval":[3866,3882]},["alt",{"sourceInterval":[3867,3880]},["app",{"sourceInterval":[3867,3872]},"lower",[]],["app",{"sourceInterval":[3875,3880]},"digit",[]]]]]],"acronym":["define",{"sourceInterval":[3886,3922]},null,[],["seq",{"sourceInterval":[3900,3922]},["app",{"sourceInterval":[3900,3905]},"upper",[]],["star",{"sourceInterval":[3906,3922]},["alt",{"sourceInterval":[3907,3920]},["app",{"sourceInterval":[3907,3912]},"upper",[]],["app",{"sourceInterval":[3915,3920]},"digit",[]]]]]],"space":["override",{"sourceInterval":[3926,3978]},null,[],["alt",{"sourceInterval":[3935,3978]},["app",{"sourceInterval":[3935,3945]},"whitespace",[]],["app",{"sourceInterval":[3948,3959]},"lineComment",[]],["app",{"sourceInterval":[3962,3978]},"multiLineComment",[]]]],"whitespace":["define",{"sourceInterval":[3981,4018]},null,[],["alt",{"sourceInterval":[3994,4018]},["terminal",{"sourceInterval":[3994,3997]}," "],["terminal",{"sourceInterval":[4000,4004]},"\t"],["terminal",{"sourceInterval":[4007,4011]},"\n"],["terminal",{"sourceInterval":[4014,4018]},"\r"]]],"lineComment":["define",{"sourceInterval":[4051,4087]},null,[],["seq",{"sourceInterval":[4065,4087]},["terminal",{"sourceInterval":[4065,4069]},"//"],["star",{"sourceInterval":[4070,4082]},["seq",{"sourceInterval":[4071,4080]},["not",{"sourceInterval":[4071,4076]},["terminal",{"sourceInterval":[4072,4076]},"\n"]],["app",{"sourceInterval":[4077,4080]},"any",[]]]],["terminal",{"sourceInterval":[4083,4087]},"\n"]]],"multiLineComment":["define",{"sourceInterval":[4117,4158]},null,[],["seq",{"sourceInterval":[4136,4158]},["terminal",{"sourceInterval":[4136,4140]},"/*"],["star",{"sourceInterval":[4141,4153]},["seq",{"sourceInterval":[4142,4151]},["not",{"sourceInterval":[4142,4147]},["terminal",{"sourceInterval":[4143,4147]},"*/"]],["app",{"sourceInterval":[4148,4151]},"any",[]]]],["terminal",{"sourceInterval":[4154,4158]},"*/"]]]}]);module.exports=result;