'use strict';const {makeRecipe}=require('ohm-js');const result=makeRecipe(["grammar",{"source":"Wit {\n\n  File\n    = (PackageDecl \";\")? (PackageItem | NestedPackageDefinition)*\n\n  PackageDecl\n    = \"package\" packageIdentifier\n\n  NestedPackageDefinition = PackageDecl \"{\" PackageItem* \"}\"\n\n  PackageItem\n    = ToplevelUseItem\n    | InterfaceItem\n    | WorldItem\n\n  WorldItem = Gate \"world\" ident \"{\" WorldItems* \"}\"\n\n  WorldItems = Gate WorldDefinition\n\n  WorldDefinition\n    = ExportItem\n    | ImportItem\n    | UseItem\n    | TypedefItem\n    | IncludeItem\n\n  ExportItem\n    = ExportItemExternType\n    | ExportItemUsePath\n\n  ExportItemExternType = \"export\" ident \":\" ExternType\n\n  ExportItemUsePath = \"export\" UsePath \";\"\n\n  ImportItem\n    = ImportItemExternType\n    | ImportItemUsePath\n\n  ImportItemExternType = \"import\" ident \":\" ExternType\n\n  ImportItemUsePath = \"import\" UsePath \";\"\n\n  IncludeItem\n    = \"include\" UsePath \";\"                                 -- simple\n    | \"include\" UsePath \"with\" \"{\" IncludeNamesList \"}\"     -- aliased\n\n  IncludeNamesList = IncludeNamesItem (\",\" IncludeNamesItem)*\n\n  IncludeNamesItem = ident \"as\" ident\n\n  UseItem = \"use\" UsePath \".\" \"{\" UseNamesList \"}\"\n\n  UseNamesList =\n  \tUseNamesItem (\",\" UseNamesItem)*\n\n  UseNamesItem = ident (\"as\" ident)?\n\n  ExternType\n    = ExternTypeFunc\n    | ExternTypeInterface\n\n  ExternTypeFunc = FuncType \";\"\n\n  ExternTypeInterface = \"interface\" \"{\" InterfaceItems* \"}\"\n\n  ToplevelUseItem = \"use\" UsePath (\"as\" ident)? \";\"\n\n  UsePath\n    = QualifiedUsePath\n    | BareUsePath\n\n  BareUsePath = ident\n\n  QualifiedUsePath = packageIdentifier\n\n  InterfaceItem\n    = \"interface\" ident \"{\" InterfaceItems* \"}\"\n\n  InterfaceItems = Gate InterfaceDefinition\n\n  InterfaceDefinition\n    = TypedefItem\n    | UseItem\n    | FuncItem\n\n  TypedefItem\n    = TypeItem\n    | RecordItem\n    | EnumItem\n    | VariantItem\n    | FlagsItems\n    | ResourceItem\n\n  Gate\n    = GateItem*\n\n  GateItem\n    = UnstableGate\n    | SinceGate\n    | DeprecatedGate\n\n  UnstableGate = \"@unstable\" \"(\" FeatureField \")\"\n\n  SinceGate = \"@since\" \"(\" VersionField \")\"\n\n  DeprecatedGate = \"@deprecated\" \"(\" VersionField \")\"\n\n  FeatureField = \"feature\" \"=\" ident\n\n  VersionField = \"version\" \"=\" version\n\n  FlagsItems\n    = \"flags\" ident \"{\" FlagsFields \"}\"\n\n  FlagsFields = FlagsField (\",\" FlagsField)*\n\n  FlagsField = ident\n\n  TypeItem\n    = \"type\" ident \"=\" TypeRef \";\"\n\n  VariantItem\n    = \"variant\" ident \"{\" VariantCases \"}\"\n\n  VariantCases\n  \t= VariantCase (\",\" VariantCase)*\n\n  VariantCase\n    = ident (\"(\" TypeRef \")\")?\n\n  EnumItem\n    = \"enum\" ident \"{\" EnumCases \"}\"\n\n  EnumCases\n  \t= EnumCase (\",\" EnumCase)*\n\n  EnumCase\n    = ident\n\n  RecordItem\n    = \"record\" ident \"{\" RecordFields \"}\"\n\n  RecordFields\n  \t= RecordField (\",\" RecordField)*\n\n  RecordField\n    = ident \":\" TypeRef\n\n  ResourceItem\n  \t= \"resource\" ident \"{\" ResourceMethod* \"}\"\n\n  ResourceMethod\n    = ident \":\" FuncType \";\"                -- method\n    | ident \":\" \"static\" FuncType \";\"       -- static\n    | \"constructor\" ParamList \";\"           -- constructor\n\n  FuncItem = ident \":\" FuncType \";\"\n\n  FuncType = \"async\"? \"func\" ParamList (\"->\" TypeRef)?\n\n  ParamList = \"(\" NamedTypeList? \")\"\n\n  NamedTypeList = NamedType (\",\" NamedType)*\n\n  NamedType = ident \":\" TypeRef\n\n  TypeRef\n  \t= SimpleType\n    | ResultType\n    | TupleType\n    | OptionType\n    | ListType\n    | RefType\n\n  RefType = ident\n\n  ResultType = \"result\" \"<\" TypeRef (\",\" TypeRef)? \">\"\n\n  TupleType = \"tuple\" \"<\" TypeRef (\",\" TypeRef)* \">\"\n\n  OptionType = \"option\" \"<\" TypeRef \">\"\n\n  ListType = \"list\" \"<\" TypeRef \">\"\n\n  SimpleType\n  \t= \"s8\" | \"s16\" | \"s32\" | \"s64\"\n    | \"u8\" | \"u16\" | \"u32\" | \"u64\"\n    | \"f32\" | \"f64\"\n    | \"bool\"\n    | \"string\"\n    | \"char\"\n\n  packageIdentifier\n  \t= (ident \":\")+ package (\"@\" version)?\n\n  version\n    = (digit+) \".\" (digit+) \".\" (digit+)\n\n  package\n  \t= ident (\"/\" ident)*\n\n  ident\n    = label\n\n  label\n    = fragment (\"-\" fragment)*\n\n  fragment\n    = word\n    | acronym\n\n  word\n    = lower (lower | digit)*\n\n  acronym\n    = upper (upper | digit)*\n\n  space := whitespace | lineComment | multiLineComment\n  whitespace = \" \" | \"\\t\" | \"\\n\" | \"\\r\"  // explicit whitespace chars\n  lineComment = \"//\" (~\"\\n\" any)* \"\\n\"    // single line comments\n  multiLineComment = \"/*\" (~\"*/\" any)* \"*/\"  // multi-line comments\n\n}"},"Wit",null,"File",{"File":["define",{"sourceInterval":[9,79]},null,[],["seq",{"sourceInterval":[20,79]},["opt",{"sourceInterval":[20,38]},["seq",{"sourceInterval":[21,36]},["app",{"sourceInterval":[21,32]},"PackageDecl",[]],["terminal",{"sourceInterval":[33,36]},";"]]],["star",{"sourceInterval":[39,79]},["alt",{"sourceInterval":[40,77]},["app",{"sourceInterval":[40,51]},"PackageItem",[]],["app",{"sourceInterval":[54,77]},"NestedPackageDefinition",[]]]]]],"PackageDecl":["define",{"sourceInterval":[83,128]},null,[],["seq",{"sourceInterval":[101,128]},["terminal",{"sourceInterval":[101,110]},"package"],["app",{"sourceInterval":[111,128]},"packageIdentifier",[]]]],"NestedPackageDefinition":["define",{"sourceInterval":[132,190]},null,[],["seq",{"sourceInterval":[158,190]},["app",{"sourceInterval":[158,169]},"PackageDecl",[]],["terminal",{"sourceInterval":[170,173]},"{"],["star",{"sourceInterval":[174,186]},["app",{"sourceInterval":[174,185]},"PackageItem",[]]],["terminal",{"sourceInterval":[187,190]},"}"]]],"PackageItem":["define",{"sourceInterval":[194,263]},null,[],["alt",{"sourceInterval":[212,263]},["app",{"sourceInterval":[212,227]},"ToplevelUseItem",[]],["app",{"sourceInterval":[234,247]},"InterfaceItem",[]],["app",{"sourceInterval":[254,263]},"WorldItem",[]]]],"WorldItem":["define",{"sourceInterval":[267,317]},null,[],["seq",{"sourceInterval":[279,317]},["app",{"sourceInterval":[279,283]},"Gate",[]],["terminal",{"sourceInterval":[284,291]},"world"],["app",{"sourceInterval":[292,297]},"ident",[]],["terminal",{"sourceInterval":[298,301]},"{"],["star",{"sourceInterval":[302,313]},["app",{"sourceInterval":[302,312]},"WorldItems",[]]],["terminal",{"sourceInterval":[314,317]},"}"]]],"WorldItems":["define",{"sourceInterval":[321,354]},null,[],["seq",{"sourceInterval":[334,354]},["app",{"sourceInterval":[334,338]},"Gate",[]],["app",{"sourceInterval":[339,354]},"WorldDefinition",[]]]],"WorldDefinition":["define",{"sourceInterval":[358,457]},null,[],["alt",{"sourceInterval":[380,457]},["app",{"sourceInterval":[380,390]},"ExportItem",[]],["app",{"sourceInterval":[397,407]},"ImportItem",[]],["app",{"sourceInterval":[414,421]},"UseItem",[]],["app",{"sourceInterval":[428,439]},"TypedefItem",[]],["app",{"sourceInterval":[446,457]},"IncludeItem",[]]]],"ExportItem":["define",{"sourceInterval":[461,522]},null,[],["alt",{"sourceInterval":[478,522]},["app",{"sourceInterval":[478,498]},"ExportItemExternType",[]],["app",{"sourceInterval":[505,522]},"ExportItemUsePath",[]]]],"ExportItemExternType":["define",{"sourceInterval":[526,578]},null,[],["seq",{"sourceInterval":[549,578]},["terminal",{"sourceInterval":[549,557]},"export"],["app",{"sourceInterval":[558,563]},"ident",[]],["terminal",{"sourceInterval":[564,567]},":"],["app",{"sourceInterval":[568,578]},"ExternType",[]]]],"ExportItemUsePath":["define",{"sourceInterval":[582,622]},null,[],["seq",{"sourceInterval":[602,622]},["terminal",{"sourceInterval":[602,610]},"export"],["app",{"sourceInterval":[611,618]},"UsePath",[]],["terminal",{"sourceInterval":[619,622]},";"]]],"ImportItem":["define",{"sourceInterval":[626,687]},null,[],["alt",{"sourceInterval":[643,687]},["app",{"sourceInterval":[643,663]},"ImportItemExternType",[]],["app",{"sourceInterval":[670,687]},"ImportItemUsePath",[]]]],"ImportItemExternType":["define",{"sourceInterval":[691,743]},null,[],["seq",{"sourceInterval":[714,743]},["terminal",{"sourceInterval":[714,722]},"import"],["app",{"sourceInterval":[723,728]},"ident",[]],["terminal",{"sourceInterval":[729,732]},":"],["app",{"sourceInterval":[733,743]},"ExternType",[]]]],"ImportItemUsePath":["define",{"sourceInterval":[747,787]},null,[],["seq",{"sourceInterval":[767,787]},["terminal",{"sourceInterval":[767,775]},"import"],["app",{"sourceInterval":[776,783]},"UsePath",[]],["terminal",{"sourceInterval":[784,787]},";"]]],"IncludeItem_simple":["define",{"sourceInterval":[809,872]},null,[],["seq",{"sourceInterval":[809,830]},["terminal",{"sourceInterval":[809,818]},"include"],["app",{"sourceInterval":[819,826]},"UsePath",[]],["terminal",{"sourceInterval":[827,830]},";"]]],"IncludeItem_aliased":["define",{"sourceInterval":[879,943]},null,[],["seq",{"sourceInterval":[879,928]},["terminal",{"sourceInterval":[879,888]},"include"],["app",{"sourceInterval":[889,896]},"UsePath",[]],["terminal",{"sourceInterval":[897,903]},"with"],["terminal",{"sourceInterval":[904,907]},"{"],["app",{"sourceInterval":[908,924]},"IncludeNamesList",[]],["terminal",{"sourceInterval":[925,928]},"}"]]],"IncludeItem":["define",{"sourceInterval":[791,943]},null,[],["alt",{"sourceInterval":[809,943]},["app",{"sourceInterval":[809,830]},"IncludeItem_simple",[]],["app",{"sourceInterval":[879,928]},"IncludeItem_aliased",[]]]],"IncludeNamesList":["define",{"sourceInterval":[947,1006]},null,[],["seq",{"sourceInterval":[966,1006]},["app",{"sourceInterval":[966,982]},"IncludeNamesItem",[]],["star",{"sourceInterval":[983,1006]},["seq",{"sourceInterval":[984,1004]},["terminal",{"sourceInterval":[984,987]},","],["app",{"sourceInterval":[988,1004]},"IncludeNamesItem",[]]]]]],"IncludeNamesItem":["define",{"sourceInterval":[1010,1045]},null,[],["seq",{"sourceInterval":[1029,1045]},["app",{"sourceInterval":[1029,1034]},"ident",[]],["terminal",{"sourceInterval":[1035,1039]},"as"],["app",{"sourceInterval":[1040,1045]},"ident",[]]]],"UseItem":["define",{"sourceInterval":[1049,1097]},null,[],["seq",{"sourceInterval":[1059,1097]},["terminal",{"sourceInterval":[1059,1064]},"use"],["app",{"sourceInterval":[1065,1072]},"UsePath",[]],["terminal",{"sourceInterval":[1073,1076]},"."],["terminal",{"sourceInterval":[1077,1080]},"{"],["app",{"sourceInterval":[1081,1093]},"UseNamesList",[]],["terminal",{"sourceInterval":[1094,1097]},"}"]]],"UseNamesList":["define",{"sourceInterval":[1101,1151]},null,[],["seq",{"sourceInterval":[1119,1151]},["app",{"sourceInterval":[1119,1131]},"UseNamesItem",[]],["star",{"sourceInterval":[1132,1151]},["seq",{"sourceInterval":[1133,1149]},["terminal",{"sourceInterval":[1133,1136]},","],["app",{"sourceInterval":[1137,1149]},"UseNamesItem",[]]]]]],"UseNamesItem":["define",{"sourceInterval":[1155,1189]},null,[],["seq",{"sourceInterval":[1170,1189]},["app",{"sourceInterval":[1170,1175]},"ident",[]],["opt",{"sourceInterval":[1176,1189]},["seq",{"sourceInterval":[1177,1187]},["terminal",{"sourceInterval":[1177,1181]},"as"],["app",{"sourceInterval":[1182,1187]},"ident",[]]]]]],"ExternType":["define",{"sourceInterval":[1193,1250]},null,[],["alt",{"sourceInterval":[1210,1250]},["app",{"sourceInterval":[1210,1224]},"ExternTypeFunc",[]],["app",{"sourceInterval":[1231,1250]},"ExternTypeInterface",[]]]],"ExternTypeFunc":["define",{"sourceInterval":[1254,1283]},null,[],["seq",{"sourceInterval":[1271,1283]},["app",{"sourceInterval":[1271,1279]},"FuncType",[]],["terminal",{"sourceInterval":[1280,1283]},";"]]],"ExternTypeInterface":["define",{"sourceInterval":[1287,1344]},null,[],["seq",{"sourceInterval":[1309,1344]},["terminal",{"sourceInterval":[1309,1320]},"interface"],["terminal",{"sourceInterval":[1321,1324]},"{"],["star",{"sourceInterval":[1325,1340]},["app",{"sourceInterval":[1325,1339]},"InterfaceItems",[]]],["terminal",{"sourceInterval":[1341,1344]},"}"]]],"ToplevelUseItem":["define",{"sourceInterval":[1348,1397]},null,[],["seq",{"sourceInterval":[1366,1397]},["terminal",{"sourceInterval":[1366,1371]},"use"],["app",{"sourceInterval":[1372,1379]},"UsePath",[]],["opt",{"sourceInterval":[1380,1393]},["seq",{"sourceInterval":[1381,1391]},["terminal",{"sourceInterval":[1381,1385]},"as"],["app",{"sourceInterval":[1386,1391]},"ident",[]]]],["terminal",{"sourceInterval":[1394,1397]},";"]]],"UsePath":["define",{"sourceInterval":[1401,1449]},null,[],["alt",{"sourceInterval":[1415,1449]},["app",{"sourceInterval":[1415,1431]},"QualifiedUsePath",[]],["app",{"sourceInterval":[1438,1449]},"BareUsePath",[]]]],"BareUsePath":["define",{"sourceInterval":[1453,1472]},null,[],["app",{"sourceInterval":[1467,1472]},"ident",[]]],"QualifiedUsePath":["define",{"sourceInterval":[1476,1512]},null,[],["app",{"sourceInterval":[1495,1512]},"packageIdentifier",[]]],"InterfaceItem":["define",{"sourceInterval":[1516,1577]},null,[],["seq",{"sourceInterval":[1536,1577]},["terminal",{"sourceInterval":[1536,1547]},"interface"],["app",{"sourceInterval":[1548,1553]},"ident",[]],["terminal",{"sourceInterval":[1554,1557]},"{"],["star",{"sourceInterval":[1558,1573]},["app",{"sourceInterval":[1558,1572]},"InterfaceItems",[]]],["terminal",{"sourceInterval":[1574,1577]},"}"]]],"InterfaceItems":["define",{"sourceInterval":[1581,1622]},null,[],["seq",{"sourceInterval":[1598,1622]},["app",{"sourceInterval":[1598,1602]},"Gate",[]],["app",{"sourceInterval":[1603,1622]},"InterfaceDefinition",[]]]],"InterfaceDefinition":["define",{"sourceInterval":[1626,1692]},null,[],["alt",{"sourceInterval":[1652,1692]},["app",{"sourceInterval":[1652,1663]},"TypedefItem",[]],["app",{"sourceInterval":[1670,1677]},"UseItem",[]],["app",{"sourceInterval":[1684,1692]},"FuncItem",[]]]],"TypedefItem":["define",{"sourceInterval":[1696,1808]},null,[],["alt",{"sourceInterval":[1714,1808]},["app",{"sourceInterval":[1714,1722]},"TypeItem",[]],["app",{"sourceInterval":[1729,1739]},"RecordItem",[]],["app",{"sourceInterval":[1746,1754]},"EnumItem",[]],["app",{"sourceInterval":[1761,1772]},"VariantItem",[]],["app",{"sourceInterval":[1779,1789]},"FlagsItems",[]],["app",{"sourceInterval":[1796,1808]},"ResourceItem",[]]]],"Gate":["define",{"sourceInterval":[1812,1832]},null,[],["star",{"sourceInterval":[1823,1832]},["app",{"sourceInterval":[1823,1831]},"GateItem",[]]]],"GateItem":["define",{"sourceInterval":[1836,1900]},null,[],["alt",{"sourceInterval":[1851,1900]},["app",{"sourceInterval":[1851,1863]},"UnstableGate",[]],["app",{"sourceInterval":[1870,1879]},"SinceGate",[]],["app",{"sourceInterval":[1886,1900]},"DeprecatedGate",[]]]],"UnstableGate":["define",{"sourceInterval":[1904,1951]},null,[],["seq",{"sourceInterval":[1919,1951]},["terminal",{"sourceInterval":[1919,1930]},"@unstable"],["terminal",{"sourceInterval":[1931,1934]},"("],["app",{"sourceInterval":[1935,1947]},"FeatureField",[]],["terminal",{"sourceInterval":[1948,1951]},")"]]],"SinceGate":["define",{"sourceInterval":[1955,1996]},null,[],["seq",{"sourceInterval":[1967,1996]},["terminal",{"sourceInterval":[1967,1975]},"@since"],["terminal",{"sourceInterval":[1976,1979]},"("],["app",{"sourceInterval":[1980,1992]},"VersionField",[]],["terminal",{"sourceInterval":[1993,1996]},")"]]],"DeprecatedGate":["define",{"sourceInterval":[2000,2051]},null,[],["seq",{"sourceInterval":[2017,2051]},["terminal",{"sourceInterval":[2017,2030]},"@deprecated"],["terminal",{"sourceInterval":[2031,2034]},"("],["app",{"sourceInterval":[2035,2047]},"VersionField",[]],["terminal",{"sourceInterval":[2048,2051]},")"]]],"FeatureField":["define",{"sourceInterval":[2055,2089]},null,[],["seq",{"sourceInterval":[2070,2089]},["terminal",{"sourceInterval":[2070,2079]},"feature"],["terminal",{"sourceInterval":[2080,2083]},"="],["app",{"sourceInterval":[2084,2089]},"ident",[]]]],"VersionField":["define",{"sourceInterval":[2093,2129]},null,[],["seq",{"sourceInterval":[2108,2129]},["terminal",{"sourceInterval":[2108,2117]},"version"],["terminal",{"sourceInterval":[2118,2121]},"="],["app",{"sourceInterval":[2122,2129]},"version",[]]]],"FlagsItems":["define",{"sourceInterval":[2133,2183]},null,[],["seq",{"sourceInterval":[2150,2183]},["terminal",{"sourceInterval":[2150,2157]},"flags"],["app",{"sourceInterval":[2158,2163]},"ident",[]],["terminal",{"sourceInterval":[2164,2167]},"{"],["app",{"sourceInterval":[2168,2179]},"FlagsFields",[]],["terminal",{"sourceInterval":[2180,2183]},"}"]]],"FlagsFields":["define",{"sourceInterval":[2187,2229]},null,[],["seq",{"sourceInterval":[2201,2229]},["app",{"sourceInterval":[2201,2211]},"FlagsField",[]],["star",{"sourceInterval":[2212,2229]},["seq",{"sourceInterval":[2213,2227]},["terminal",{"sourceInterval":[2213,2216]},","],["app",{"sourceInterval":[2217,2227]},"FlagsField",[]]]]]],"FlagsField":["define",{"sourceInterval":[2233,2251]},null,[],["app",{"sourceInterval":[2246,2251]},"ident",[]]],"TypeItem":["define",{"sourceInterval":[2255,2298]},null,[],["seq",{"sourceInterval":[2270,2298]},["terminal",{"sourceInterval":[2270,2276]},"type"],["app",{"sourceInterval":[2277,2282]},"ident",[]],["terminal",{"sourceInterval":[2283,2286]},"="],["app",{"sourceInterval":[2287,2294]},"TypeRef",[]],["terminal",{"sourceInterval":[2295,2298]},";"]]],"VariantItem":["define",{"sourceInterval":[2302,2356]},null,[],["seq",{"sourceInterval":[2320,2356]},["terminal",{"sourceInterval":[2320,2329]},"variant"],["app",{"sourceInterval":[2330,2335]},"ident",[]],["terminal",{"sourceInterval":[2336,2339]},"{"],["app",{"sourceInterval":[2340,2352]},"VariantCases",[]],["terminal",{"sourceInterval":[2353,2356]},"}"]]],"VariantCases":["define",{"sourceInterval":[2360,2408]},null,[],["seq",{"sourceInterval":[2378,2408]},["app",{"sourceInterval":[2378,2389]},"VariantCase",[]],["star",{"sourceInterval":[2390,2408]},["seq",{"sourceInterval":[2391,2406]},["terminal",{"sourceInterval":[2391,2394]},","],["app",{"sourceInterval":[2395,2406]},"VariantCase",[]]]]]],"VariantCase":["define",{"sourceInterval":[2412,2454]},null,[],["seq",{"sourceInterval":[2430,2454]},["app",{"sourceInterval":[2430,2435]},"ident",[]],["opt",{"sourceInterval":[2436,2454]},["seq",{"sourceInterval":[2437,2452]},["terminal",{"sourceInterval":[2437,2440]},"("],["app",{"sourceInterval":[2441,2448]},"TypeRef",[]],["terminal",{"sourceInterval":[2449,2452]},")"]]]]],"EnumItem":["define",{"sourceInterval":[2458,2503]},null,[],["seq",{"sourceInterval":[2473,2503]},["terminal",{"sourceInterval":[2473,2479]},"enum"],["app",{"sourceInterval":[2480,2485]},"ident",[]],["terminal",{"sourceInterval":[2486,2489]},"{"],["app",{"sourceInterval":[2490,2499]},"EnumCases",[]],["terminal",{"sourceInterval":[2500,2503]},"}"]]],"EnumCases":["define",{"sourceInterval":[2507,2546]},null,[],["seq",{"sourceInterval":[2522,2546]},["app",{"sourceInterval":[2522,2530]},"EnumCase",[]],["star",{"sourceInterval":[2531,2546]},["seq",{"sourceInterval":[2532,2544]},["terminal",{"sourceInterval":[2532,2535]},","],["app",{"sourceInterval":[2536,2544]},"EnumCase",[]]]]]],"EnumCase":["define",{"sourceInterval":[2550,2570]},null,[],["app",{"sourceInterval":[2565,2570]},"ident",[]]],"RecordItem":["define",{"sourceInterval":[2574,2626]},null,[],["seq",{"sourceInterval":[2591,2626]},["terminal",{"sourceInterval":[2591,2599]},"record"],["app",{"sourceInterval":[2600,2605]},"ident",[]],["terminal",{"sourceInterval":[2606,2609]},"{"],["app",{"sourceInterval":[2610,2622]},"RecordFields",[]],["terminal",{"sourceInterval":[2623,2626]},"}"]]],"RecordFields":["define",{"sourceInterval":[2630,2678]},null,[],["seq",{"sourceInterval":[2648,2678]},["app",{"sourceInterval":[2648,2659]},"RecordField",[]],["star",{"sourceInterval":[2660,2678]},["seq",{"sourceInterval":[2661,2676]},["terminal",{"sourceInterval":[2661,2664]},","],["app",{"sourceInterval":[2665,2676]},"RecordField",[]]]]]],"RecordField":["define",{"sourceInterval":[2682,2717]},null,[],["seq",{"sourceInterval":[2700,2717]},["app",{"sourceInterval":[2700,2705]},"ident",[]],["terminal",{"sourceInterval":[2706,2709]},":"],["app",{"sourceInterval":[2710,2717]},"TypeRef",[]]]],"ResourceItem":["define",{"sourceInterval":[2721,2779]},null,[],["seq",{"sourceInterval":[2739,2779]},["terminal",{"sourceInterval":[2739,2749]},"resource"],["app",{"sourceInterval":[2750,2755]},"ident",[]],["terminal",{"sourceInterval":[2756,2759]},"{"],["star",{"sourceInterval":[2760,2775]},["app",{"sourceInterval":[2760,2774]},"ResourceMethod",[]]],["terminal",{"sourceInterval":[2776,2779]},"}"]]],"ResourceMethod_method":["define",{"sourceInterval":[2804,2851]},null,[],["seq",{"sourceInterval":[2804,2826]},["app",{"sourceInterval":[2804,2809]},"ident",[]],["terminal",{"sourceInterval":[2810,2813]},":"],["app",{"sourceInterval":[2814,2822]},"FuncType",[]],["terminal",{"sourceInterval":[2823,2826]},";"]]],"ResourceMethod_static":["define",{"sourceInterval":[2858,2905]},null,[],["seq",{"sourceInterval":[2858,2889]},["app",{"sourceInterval":[2858,2863]},"ident",[]],["terminal",{"sourceInterval":[2864,2867]},":"],["terminal",{"sourceInterval":[2868,2876]},"static"],["app",{"sourceInterval":[2877,2885]},"FuncType",[]],["terminal",{"sourceInterval":[2886,2889]},";"]]],"ResourceMethod_constructor":["define",{"sourceInterval":[2912,2964]},null,[],["seq",{"sourceInterval":[2912,2939]},["terminal",{"sourceInterval":[2912,2925]},"constructor"],["app",{"sourceInterval":[2926,2935]},"ParamList",[]],["terminal",{"sourceInterval":[2936,2939]},";"]]],"ResourceMethod":["define",{"sourceInterval":[2783,2964]},null,[],["alt",{"sourceInterval":[2804,2964]},["app",{"sourceInterval":[2804,2826]},"ResourceMethod_method",[]],["app",{"sourceInterval":[2858,2889]},"ResourceMethod_static",[]],["app",{"sourceInterval":[2912,2939]},"ResourceMethod_constructor",[]]]],"FuncItem":["define",{"sourceInterval":[2968,3001]},null,[],["seq",{"sourceInterval":[2979,3001]},["app",{"sourceInterval":[2979,2984]},"ident",[]],["terminal",{"sourceInterval":[2985,2988]},":"],["app",{"sourceInterval":[2989,2997]},"FuncType",[]],["terminal",{"sourceInterval":[2998,3001]},";"]]],"FuncType":["define",{"sourceInterval":[3005,3057]},null,[],["seq",{"sourceInterval":[3016,3057]},["opt",{"sourceInterval":[3016,3024]},["terminal",{"sourceInterval":[3016,3023]},"async"]],["terminal",{"sourceInterval":[3025,3031]},"func"],["app",{"sourceInterval":[3032,3041]},"ParamList",[]],["opt",{"sourceInterval":[3042,3057]},["seq",{"sourceInterval":[3043,3055]},["terminal",{"sourceInterval":[3043,3047]},"->"],["app",{"sourceInterval":[3048,3055]},"TypeRef",[]]]]]],"ParamList":["define",{"sourceInterval":[3061,3095]},null,[],["seq",{"sourceInterval":[3073,3095]},["terminal",{"sourceInterval":[3073,3076]},"("],["opt",{"sourceInterval":[3077,3091]},["app",{"sourceInterval":[3077,3090]},"NamedTypeList",[]]],["terminal",{"sourceInterval":[3092,3095]},")"]]],"NamedTypeList":["define",{"sourceInterval":[3099,3141]},null,[],["seq",{"sourceInterval":[3115,3141]},["app",{"sourceInterval":[3115,3124]},"NamedType",[]],["star",{"sourceInterval":[3125,3141]},["seq",{"sourceInterval":[3126,3139]},["terminal",{"sourceInterval":[3126,3129]},","],["app",{"sourceInterval":[3130,3139]},"NamedType",[]]]]]],"NamedType":["define",{"sourceInterval":[3145,3174]},null,[],["seq",{"sourceInterval":[3157,3174]},["app",{"sourceInterval":[3157,3162]},"ident",[]],["terminal",{"sourceInterval":[3163,3166]},":"],["app",{"sourceInterval":[3167,3174]},"TypeRef",[]]]],"TypeRef":["define",{"sourceInterval":[3178,3280]},null,[],["alt",{"sourceInterval":[3191,3280]},["app",{"sourceInterval":[3191,3201]},"SimpleType",[]],["app",{"sourceInterval":[3208,3218]},"ResultType",[]],["app",{"sourceInterval":[3225,3234]},"TupleType",[]],["app",{"sourceInterval":[3241,3251]},"OptionType",[]],["app",{"sourceInterval":[3258,3266]},"ListType",[]],["app",{"sourceInterval":[3273,3280]},"RefType",[]]]],"RefType":["define",{"sourceInterval":[3284,3299]},null,[],["app",{"sourceInterval":[3294,3299]},"ident",[]]],"ResultType":["define",{"sourceInterval":[3303,3355]},null,[],["seq",{"sourceInterval":[3316,3355]},["terminal",{"sourceInterval":[3316,3324]},"result"],["terminal",{"sourceInterval":[3325,3328]},"<"],["app",{"sourceInterval":[3329,3336]},"TypeRef",[]],["opt",{"sourceInterval":[3337,3351]},["seq",{"sourceInterval":[3338,3349]},["terminal",{"sourceInterval":[3338,3341]},","],["app",{"sourceInterval":[3342,3349]},"TypeRef",[]]]],["terminal",{"sourceInterval":[3352,3355]},">"]]],"TupleType":["define",{"sourceInterval":[3359,3409]},null,[],["seq",{"sourceInterval":[3371,3409]},["terminal",{"sourceInterval":[3371,3378]},"tuple"],["terminal",{"sourceInterval":[3379,3382]},"<"],["app",{"sourceInterval":[3383,3390]},"TypeRef",[]],["star",{"sourceInterval":[3391,3405]},["seq",{"sourceInterval":[3392,3403]},["terminal",{"sourceInterval":[3392,3395]},","],["app",{"sourceInterval":[3396,3403]},"TypeRef",[]]]],["terminal",{"sourceInterval":[3406,3409]},">"]]],"OptionType":["define",{"sourceInterval":[3413,3450]},null,[],["seq",{"sourceInterval":[3426,3450]},["terminal",{"sourceInterval":[3426,3434]},"option"],["terminal",{"sourceInterval":[3435,3438]},"<"],["app",{"sourceInterval":[3439,3446]},"TypeRef",[]],["terminal",{"sourceInterval":[3447,3450]},">"]]],"ListType":["define",{"sourceInterval":[3454,3487]},null,[],["seq",{"sourceInterval":[3465,3487]},["terminal",{"sourceInterval":[3465,3471]},"list"],["terminal",{"sourceInterval":[3472,3475]},"<"],["app",{"sourceInterval":[3476,3483]},"TypeRef",[]],["terminal",{"sourceInterval":[3484,3487]},">"]]],"SimpleType":["define",{"sourceInterval":[3491,3631]},null,[],["alt",{"sourceInterval":[3507,3631]},["terminal",{"sourceInterval":[3507,3511]},"s8"],["terminal",{"sourceInterval":[3514,3519]},"s16"],["terminal",{"sourceInterval":[3522,3527]},"s32"],["terminal",{"sourceInterval":[3530,3535]},"s64"],["terminal",{"sourceInterval":[3542,3546]},"u8"],["terminal",{"sourceInterval":[3549,3554]},"u16"],["terminal",{"sourceInterval":[3557,3562]},"u32"],["terminal",{"sourceInterval":[3565,3570]},"u64"],["terminal",{"sourceInterval":[3577,3582]},"f32"],["terminal",{"sourceInterval":[3585,3590]},"f64"],["terminal",{"sourceInterval":[3597,3603]},"bool"],["terminal",{"sourceInterval":[3610,3618]},"string"],["terminal",{"sourceInterval":[3625,3631]},"char"]]],"packageIdentifier":["define",{"sourceInterval":[3635,3693]},null,[],["seq",{"sourceInterval":[3658,3693]},["plus",{"sourceInterval":[3658,3670]},["seq",{"sourceInterval":[3659,3668]},["app",{"sourceInterval":[3659,3664]},"ident",[]],["terminal",{"sourceInterval":[3665,3668]},":"]]],["app",{"sourceInterval":[3671,3678]},"package",[]],["opt",{"sourceInterval":[3679,3693]},["seq",{"sourceInterval":[3680,3691]},["terminal",{"sourceInterval":[3680,3683]},"@"],["app",{"sourceInterval":[3684,3691]},"version",[]]]]]],"version":["define",{"sourceInterval":[3697,3745]},null,[],["seq",{"sourceInterval":[3711,3745]},["plus",{"sourceInterval":[3712,3718]},["app",{"sourceInterval":[3712,3717]},"digit",[]]],["terminal",{"sourceInterval":[3720,3723]},"."],["plus",{"sourceInterval":[3725,3731]},["app",{"sourceInterval":[3725,3730]},"digit",[]]],["terminal",{"sourceInterval":[3733,3736]},"."],["plus",{"sourceInterval":[3738,3744]},["app",{"sourceInterval":[3738,3743]},"digit",[]]]]],"package":["define",{"sourceInterval":[3749,3780]},null,[],["seq",{"sourceInterval":[3762,3780]},["app",{"sourceInterval":[3762,3767]},"ident",[]],["star",{"sourceInterval":[3768,3780]},["seq",{"sourceInterval":[3769,3778]},["terminal",{"sourceInterval":[3769,3772]},"/"],["app",{"sourceInterval":[3773,3778]},"ident",[]]]]]],"ident":["define",{"sourceInterval":[3784,3801]},null,[],["app",{"sourceInterval":[3796,3801]},"label",[]]],"label":["define",{"sourceInterval":[3805,3841]},null,[],["seq",{"sourceInterval":[3817,3841]},["app",{"sourceInterval":[3817,3825]},"fragment",[]],["star",{"sourceInterval":[3826,3841]},["seq",{"sourceInterval":[3827,3839]},["terminal",{"sourceInterval":[3827,3830]},"-"],["app",{"sourceInterval":[3831,3839]},"fragment",[]]]]]],"fragment":["define",{"sourceInterval":[3845,3878]},null,[],["alt",{"sourceInterval":[3860,3878]},["app",{"sourceInterval":[3860,3864]},"word",[]],["app",{"sourceInterval":[3871,3878]},"acronym",[]]]],"word":["define",{"sourceInterval":[3882,3915]},null,[],["seq",{"sourceInterval":[3893,3915]},["app",{"sourceInterval":[3893,3898]},"lower",[]],["star",{"sourceInterval":[3899,3915]},["alt",{"sourceInterval":[3900,3913]},["app",{"sourceInterval":[3900,3905]},"lower",[]],["app",{"sourceInterval":[3908,3913]},"digit",[]]]]]],"acronym":["define",{"sourceInterval":[3919,3955]},null,[],["seq",{"sourceInterval":[3933,3955]},["app",{"sourceInterval":[3933,3938]},"upper",[]],["star",{"sourceInterval":[3939,3955]},["alt",{"sourceInterval":[3940,3953]},["app",{"sourceInterval":[3940,3945]},"upper",[]],["app",{"sourceInterval":[3948,3953]},"digit",[]]]]]],"space":["override",{"sourceInterval":[3959,4011]},null,[],["alt",{"sourceInterval":[3968,4011]},["app",{"sourceInterval":[3968,3978]},"whitespace",[]],["app",{"sourceInterval":[3981,3992]},"lineComment",[]],["app",{"sourceInterval":[3995,4011]},"multiLineComment",[]]]],"whitespace":["define",{"sourceInterval":[4014,4051]},null,[],["alt",{"sourceInterval":[4027,4051]},["terminal",{"sourceInterval":[4027,4030]}," "],["terminal",{"sourceInterval":[4033,4037]},"\t"],["terminal",{"sourceInterval":[4040,4044]},"\n"],["terminal",{"sourceInterval":[4047,4051]},"\r"]]],"lineComment":["define",{"sourceInterval":[4084,4120]},null,[],["seq",{"sourceInterval":[4098,4120]},["terminal",{"sourceInterval":[4098,4102]},"//"],["star",{"sourceInterval":[4103,4115]},["seq",{"sourceInterval":[4104,4113]},["not",{"sourceInterval":[4104,4109]},["terminal",{"sourceInterval":[4105,4109]},"\n"]],["app",{"sourceInterval":[4110,4113]},"any",[]]]],["terminal",{"sourceInterval":[4116,4120]},"\n"]]],"multiLineComment":["define",{"sourceInterval":[4150,4191]},null,[],["seq",{"sourceInterval":[4169,4191]},["terminal",{"sourceInterval":[4169,4173]},"/*"],["star",{"sourceInterval":[4174,4186]},["seq",{"sourceInterval":[4175,4184]},["not",{"sourceInterval":[4175,4180]},["terminal",{"sourceInterval":[4176,4180]},"*/"]],["app",{"sourceInterval":[4181,4184]},"any",[]]]],["terminal",{"sourceInterval":[4187,4191]},"*/"]]]}]);module.exports=result;