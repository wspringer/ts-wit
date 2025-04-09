'use strict';const {makeRecipe}=require('ohm-js');const result=makeRecipe(["grammar",{"source":"Wit {\n\n  File\n    = (PackageDecl \";\")? (PackageItem | NestedPackageDefinition)*\n\n  PackageDecl\n    = \"package\" packageIdentifier\n\n  NestedPackageDefinition = PackageDecl \"{\" PackageItem* \"}\"\n\n  PackageItem\n    = ToplevelUseItem\n    | InterfaceItem\n    | WorldItem\n\n  WorldItem = Gate \"world\" ident \"{\" WorldItems* \"}\"\n\n  WorldItems = Gate WorldDefinition\n\n  WorldDefinition\n    = ExportItem\n    | ImportItem\n    | UseItem\n    | TypedefItem\n    | IncludeItem\n\n  ExportItem\n    = ExportItemExternType\n    | ExportItemUsePath\n\n  ExportItemExternType = \"export\" ident \":\" ExternType\n\n  ExportItemUsePath = \"export\" UsePath \";\"\n\n  ImportItem\n    = ImportItemExternType\n    | ImportItemUsePath\n\n  ImportItemExternType = \"import\" ident \":\" ExternType\n\n  ImportItemUsePath = \"import\" UsePath \";\"\n\n  IncludeItem\n    = \"include\" UsePath \";\"                                 -- simple\n    | \"include\" UsePath \"with\" \"{\" IncludeNamesList \"}\"     -- aliased\n\n  IncludeNamesList = IncludeNamesItem (\",\" IncludeNamesItem)*\n\n  IncludeNamesItem = ident \"as\" ident\n\n  UseItem = \"use\" UsePath \".\" \"{\" UseNamesList \"}\"\n\n  UseNamesList =\n  \tUseNamesItem (\",\" UseNamesItem)*\n\n  UseNamesItem = ident (\"as\" ident)?\n\n  ExternType\n    = ExternTypeFunc\n    | ExternTypeInterface\n\n  ExternTypeFunc = FuncType \";\"\n\n  ExternTypeInterface = \"interface\" \"{\" InterfaceItems* \"}\"\n\n  ToplevelUseItem = \"use\" UsePath (\"as\" ident)? \";\"\n\n  UsePath\n    = QualifiedUsePath\n    | BareUsePath\n\n  BareUsePath = ident\n\n  QualifiedUsePath = packageIdentifier\n\n  InterfaceItem\n    = \"interface\" ident \"{\" InterfaceItems* \"}\"\n\n  InterfaceItems = Gate InterfaceDefinition\n\n  InterfaceDefinition\n    = TypedefItem\n    | UseItem\n    | FuncItem\n\n  TypedefItem\n    = TypeItem\n    | RecordItem\n    | EnumItem\n    | VariantItem\n    | FlagsItems\n    | ResourceItem\n\n  Gate\n    = GateItem*\n\n  GateItem\n    = UnstableGate\n    | SinceGate\n    | DeprecatedGate\n\n  UnstableGate = \"@unstable\" \"(\" FeatureField \")\"\n\n  SinceGate = \"@since\" \"(\" VersionField \")\"\n\n  DeprecatedGate = \"@deprecated\" \"(\" VersionField \")\"\n\n  FeatureField = \"feature\" \"=\" ident\n\n  VersionField = \"version\" \"=\" version\n\n  FlagsItems\n    = \"flags\" ident \"{\" FlagsFields \"}\"\n\n  FlagsFields = FlagsField (\",\" FlagsField)*\n\n  FlagsField = ident\n\n  TypeItem\n    = \"type\" ident \"=\" TypeRef \";\"\n\n  VariantItem\n    = \"variant\" ident \"{\" NonemptyListOf<VariantCase, \",\"> \",\"? \"}\"\n\n  VariantCase\n    = ident (\"(\" TypeRef \")\")?\n\n  EnumItem\n    = \"enum\" ident \"{\" NonemptyListOf<EnumCase, \",\"> \",\"? \"}\"\n\n  EnumCase\n    = ident\n\n  RecordItem\n    = \"record\" ident \"{\" RecordFields \"}\"\n\n  RecordFields\n  \t= RecordField (\",\" RecordField)*\n\n  RecordField\n    = ident \":\" TypeRef\n\n  ResourceItem\n  \t= \"resource\" ident \"{\" ResourceMethod* \"}\"\n\n  ResourceMethod\n    = ident \":\" FuncType \";\"                -- method\n    | ident \":\" \"static\" FuncType \";\"       -- static\n    | \"constructor\" ParamList \";\"           -- constructor\n\n  FuncItem = ident \":\" FuncType \";\"\n\n  FuncType = \"async\"? \"func\" ParamList (\"->\" TypeRef)?\n\n  ParamList = \"(\" NamedTypeList? \")\"\n\n  NamedTypeList = NamedType (\",\" NamedType)*\n\n  NamedType = ident \":\" TypeRef\n\n  TypeRef\n  \t= SimpleType\n    | ResultType\n    | TupleType\n    | OptionType\n    | ListType\n    | RefType\n\n  RefType = ident\n\n  ResultType = \"result\" \"<\" TypeRef (\",\" TypeRef)? \">\"\n\n  TupleType = \"tuple\" \"<\" TypeRef (\",\" TypeRef)* \">\"\n\n  OptionType = \"option\" \"<\" TypeRef \">\"\n\n  ListType = \"list\" \"<\" TypeRef \">\"\n\n  SimpleType\n  \t= \"s8\" | \"s16\" | \"s32\" | \"s64\"\n    | \"u8\" | \"u16\" | \"u32\" | \"u64\"\n    | \"f32\" | \"f64\"\n    | \"bool\"\n    | \"string\"\n    | \"char\"\n\n  packageIdentifier\n  \t= (ident \":\")+ package (\"@\" version)?\n\n  version\n    = (digit+) \".\" (digit+) \".\" (digit+)\n\n  package\n  \t= ident (\"/\" ident)*\n\n  ident\n    = label\n\n  label\n    = fragment (\"-\" fragment)*\n\n  fragment\n    = word\n    | acronym\n\n  word\n    = lower (lower | digit)*\n\n  acronym\n    = upper (upper | digit)*\n\n  space := whitespace | lineComment | multiLineComment\n  whitespace = \" \" | \"\\t\" | \"\\n\" | \"\\r\"  // explicit whitespace chars\n  lineComment = \"//\" (~\"\\n\" any)* \"\\n\"    // single line comments\n  multiLineComment = \"/*\" (~\"*/\" any)* \"*/\"  // multi-line comments\n\n}"},"Wit",null,"File",{"File":["define",{"sourceInterval":[9,79]},null,[],["seq",{"sourceInterval":[20,79]},["opt",{"sourceInterval":[20,38]},["seq",{"sourceInterval":[21,36]},["app",{"sourceInterval":[21,32]},"PackageDecl",[]],["terminal",{"sourceInterval":[33,36]},";"]]],["star",{"sourceInterval":[39,79]},["alt",{"sourceInterval":[40,77]},["app",{"sourceInterval":[40,51]},"PackageItem",[]],["app",{"sourceInterval":[54,77]},"NestedPackageDefinition",[]]]]]],"PackageDecl":["define",{"sourceInterval":[83,128]},null,[],["seq",{"sourceInterval":[101,128]},["terminal",{"sourceInterval":[101,110]},"package"],["app",{"sourceInterval":[111,128]},"packageIdentifier",[]]]],"NestedPackageDefinition":["define",{"sourceInterval":[132,190]},null,[],["seq",{"sourceInterval":[158,190]},["app",{"sourceInterval":[158,169]},"PackageDecl",[]],["terminal",{"sourceInterval":[170,173]},"{"],["star",{"sourceInterval":[174,186]},["app",{"sourceInterval":[174,185]},"PackageItem",[]]],["terminal",{"sourceInterval":[187,190]},"}"]]],"PackageItem":["define",{"sourceInterval":[194,263]},null,[],["alt",{"sourceInterval":[212,263]},["app",{"sourceInterval":[212,227]},"ToplevelUseItem",[]],["app",{"sourceInterval":[234,247]},"InterfaceItem",[]],["app",{"sourceInterval":[254,263]},"WorldItem",[]]]],"WorldItem":["define",{"sourceInterval":[267,317]},null,[],["seq",{"sourceInterval":[279,317]},["app",{"sourceInterval":[279,283]},"Gate",[]],["terminal",{"sourceInterval":[284,291]},"world"],["app",{"sourceInterval":[292,297]},"ident",[]],["terminal",{"sourceInterval":[298,301]},"{"],["star",{"sourceInterval":[302,313]},["app",{"sourceInterval":[302,312]},"WorldItems",[]]],["terminal",{"sourceInterval":[314,317]},"}"]]],"WorldItems":["define",{"sourceInterval":[321,354]},null,[],["seq",{"sourceInterval":[334,354]},["app",{"sourceInterval":[334,338]},"Gate",[]],["app",{"sourceInterval":[339,354]},"WorldDefinition",[]]]],"WorldDefinition":["define",{"sourceInterval":[358,457]},null,[],["alt",{"sourceInterval":[380,457]},["app",{"sourceInterval":[380,390]},"ExportItem",[]],["app",{"sourceInterval":[397,407]},"ImportItem",[]],["app",{"sourceInterval":[414,421]},"UseItem",[]],["app",{"sourceInterval":[428,439]},"TypedefItem",[]],["app",{"sourceInterval":[446,457]},"IncludeItem",[]]]],"ExportItem":["define",{"sourceInterval":[461,522]},null,[],["alt",{"sourceInterval":[478,522]},["app",{"sourceInterval":[478,498]},"ExportItemExternType",[]],["app",{"sourceInterval":[505,522]},"ExportItemUsePath",[]]]],"ExportItemExternType":["define",{"sourceInterval":[526,578]},null,[],["seq",{"sourceInterval":[549,578]},["terminal",{"sourceInterval":[549,557]},"export"],["app",{"sourceInterval":[558,563]},"ident",[]],["terminal",{"sourceInterval":[564,567]},":"],["app",{"sourceInterval":[568,578]},"ExternType",[]]]],"ExportItemUsePath":["define",{"sourceInterval":[582,622]},null,[],["seq",{"sourceInterval":[602,622]},["terminal",{"sourceInterval":[602,610]},"export"],["app",{"sourceInterval":[611,618]},"UsePath",[]],["terminal",{"sourceInterval":[619,622]},";"]]],"ImportItem":["define",{"sourceInterval":[626,687]},null,[],["alt",{"sourceInterval":[643,687]},["app",{"sourceInterval":[643,663]},"ImportItemExternType",[]],["app",{"sourceInterval":[670,687]},"ImportItemUsePath",[]]]],"ImportItemExternType":["define",{"sourceInterval":[691,743]},null,[],["seq",{"sourceInterval":[714,743]},["terminal",{"sourceInterval":[714,722]},"import"],["app",{"sourceInterval":[723,728]},"ident",[]],["terminal",{"sourceInterval":[729,732]},":"],["app",{"sourceInterval":[733,743]},"ExternType",[]]]],"ImportItemUsePath":["define",{"sourceInterval":[747,787]},null,[],["seq",{"sourceInterval":[767,787]},["terminal",{"sourceInterval":[767,775]},"import"],["app",{"sourceInterval":[776,783]},"UsePath",[]],["terminal",{"sourceInterval":[784,787]},";"]]],"IncludeItem_simple":["define",{"sourceInterval":[809,872]},null,[],["seq",{"sourceInterval":[809,830]},["terminal",{"sourceInterval":[809,818]},"include"],["app",{"sourceInterval":[819,826]},"UsePath",[]],["terminal",{"sourceInterval":[827,830]},";"]]],"IncludeItem_aliased":["define",{"sourceInterval":[879,943]},null,[],["seq",{"sourceInterval":[879,928]},["terminal",{"sourceInterval":[879,888]},"include"],["app",{"sourceInterval":[889,896]},"UsePath",[]],["terminal",{"sourceInterval":[897,903]},"with"],["terminal",{"sourceInterval":[904,907]},"{"],["app",{"sourceInterval":[908,924]},"IncludeNamesList",[]],["terminal",{"sourceInterval":[925,928]},"}"]]],"IncludeItem":["define",{"sourceInterval":[791,943]},null,[],["alt",{"sourceInterval":[809,943]},["app",{"sourceInterval":[809,830]},"IncludeItem_simple",[]],["app",{"sourceInterval":[879,928]},"IncludeItem_aliased",[]]]],"IncludeNamesList":["define",{"sourceInterval":[947,1006]},null,[],["seq",{"sourceInterval":[966,1006]},["app",{"sourceInterval":[966,982]},"IncludeNamesItem",[]],["star",{"sourceInterval":[983,1006]},["seq",{"sourceInterval":[984,1004]},["terminal",{"sourceInterval":[984,987]},","],["app",{"sourceInterval":[988,1004]},"IncludeNamesItem",[]]]]]],"IncludeNamesItem":["define",{"sourceInterval":[1010,1045]},null,[],["seq",{"sourceInterval":[1029,1045]},["app",{"sourceInterval":[1029,1034]},"ident",[]],["terminal",{"sourceInterval":[1035,1039]},"as"],["app",{"sourceInterval":[1040,1045]},"ident",[]]]],"UseItem":["define",{"sourceInterval":[1049,1097]},null,[],["seq",{"sourceInterval":[1059,1097]},["terminal",{"sourceInterval":[1059,1064]},"use"],["app",{"sourceInterval":[1065,1072]},"UsePath",[]],["terminal",{"sourceInterval":[1073,1076]},"."],["terminal",{"sourceInterval":[1077,1080]},"{"],["app",{"sourceInterval":[1081,1093]},"UseNamesList",[]],["terminal",{"sourceInterval":[1094,1097]},"}"]]],"UseNamesList":["define",{"sourceInterval":[1101,1151]},null,[],["seq",{"sourceInterval":[1119,1151]},["app",{"sourceInterval":[1119,1131]},"UseNamesItem",[]],["star",{"sourceInterval":[1132,1151]},["seq",{"sourceInterval":[1133,1149]},["terminal",{"sourceInterval":[1133,1136]},","],["app",{"sourceInterval":[1137,1149]},"UseNamesItem",[]]]]]],"UseNamesItem":["define",{"sourceInterval":[1155,1189]},null,[],["seq",{"sourceInterval":[1170,1189]},["app",{"sourceInterval":[1170,1175]},"ident",[]],["opt",{"sourceInterval":[1176,1189]},["seq",{"sourceInterval":[1177,1187]},["terminal",{"sourceInterval":[1177,1181]},"as"],["app",{"sourceInterval":[1182,1187]},"ident",[]]]]]],"ExternType":["define",{"sourceInterval":[1193,1250]},null,[],["alt",{"sourceInterval":[1210,1250]},["app",{"sourceInterval":[1210,1224]},"ExternTypeFunc",[]],["app",{"sourceInterval":[1231,1250]},"ExternTypeInterface",[]]]],"ExternTypeFunc":["define",{"sourceInterval":[1254,1283]},null,[],["seq",{"sourceInterval":[1271,1283]},["app",{"sourceInterval":[1271,1279]},"FuncType",[]],["terminal",{"sourceInterval":[1280,1283]},";"]]],"ExternTypeInterface":["define",{"sourceInterval":[1287,1344]},null,[],["seq",{"sourceInterval":[1309,1344]},["terminal",{"sourceInterval":[1309,1320]},"interface"],["terminal",{"sourceInterval":[1321,1324]},"{"],["star",{"sourceInterval":[1325,1340]},["app",{"sourceInterval":[1325,1339]},"InterfaceItems",[]]],["terminal",{"sourceInterval":[1341,1344]},"}"]]],"ToplevelUseItem":["define",{"sourceInterval":[1348,1397]},null,[],["seq",{"sourceInterval":[1366,1397]},["terminal",{"sourceInterval":[1366,1371]},"use"],["app",{"sourceInterval":[1372,1379]},"UsePath",[]],["opt",{"sourceInterval":[1380,1393]},["seq",{"sourceInterval":[1381,1391]},["terminal",{"sourceInterval":[1381,1385]},"as"],["app",{"sourceInterval":[1386,1391]},"ident",[]]]],["terminal",{"sourceInterval":[1394,1397]},";"]]],"UsePath":["define",{"sourceInterval":[1401,1449]},null,[],["alt",{"sourceInterval":[1415,1449]},["app",{"sourceInterval":[1415,1431]},"QualifiedUsePath",[]],["app",{"sourceInterval":[1438,1449]},"BareUsePath",[]]]],"BareUsePath":["define",{"sourceInterval":[1453,1472]},null,[],["app",{"sourceInterval":[1467,1472]},"ident",[]]],"QualifiedUsePath":["define",{"sourceInterval":[1476,1512]},null,[],["app",{"sourceInterval":[1495,1512]},"packageIdentifier",[]]],"InterfaceItem":["define",{"sourceInterval":[1516,1577]},null,[],["seq",{"sourceInterval":[1536,1577]},["terminal",{"sourceInterval":[1536,1547]},"interface"],["app",{"sourceInterval":[1548,1553]},"ident",[]],["terminal",{"sourceInterval":[1554,1557]},"{"],["star",{"sourceInterval":[1558,1573]},["app",{"sourceInterval":[1558,1572]},"InterfaceItems",[]]],["terminal",{"sourceInterval":[1574,1577]},"}"]]],"InterfaceItems":["define",{"sourceInterval":[1581,1622]},null,[],["seq",{"sourceInterval":[1598,1622]},["app",{"sourceInterval":[1598,1602]},"Gate",[]],["app",{"sourceInterval":[1603,1622]},"InterfaceDefinition",[]]]],"InterfaceDefinition":["define",{"sourceInterval":[1626,1692]},null,[],["alt",{"sourceInterval":[1652,1692]},["app",{"sourceInterval":[1652,1663]},"TypedefItem",[]],["app",{"sourceInterval":[1670,1677]},"UseItem",[]],["app",{"sourceInterval":[1684,1692]},"FuncItem",[]]]],"TypedefItem":["define",{"sourceInterval":[1696,1808]},null,[],["alt",{"sourceInterval":[1714,1808]},["app",{"sourceInterval":[1714,1722]},"TypeItem",[]],["app",{"sourceInterval":[1729,1739]},"RecordItem",[]],["app",{"sourceInterval":[1746,1754]},"EnumItem",[]],["app",{"sourceInterval":[1761,1772]},"VariantItem",[]],["app",{"sourceInterval":[1779,1789]},"FlagsItems",[]],["app",{"sourceInterval":[1796,1808]},"ResourceItem",[]]]],"Gate":["define",{"sourceInterval":[1812,1832]},null,[],["star",{"sourceInterval":[1823,1832]},["app",{"sourceInterval":[1823,1831]},"GateItem",[]]]],"GateItem":["define",{"sourceInterval":[1836,1900]},null,[],["alt",{"sourceInterval":[1851,1900]},["app",{"sourceInterval":[1851,1863]},"UnstableGate",[]],["app",{"sourceInterval":[1870,1879]},"SinceGate",[]],["app",{"sourceInterval":[1886,1900]},"DeprecatedGate",[]]]],"UnstableGate":["define",{"sourceInterval":[1904,1951]},null,[],["seq",{"sourceInterval":[1919,1951]},["terminal",{"sourceInterval":[1919,1930]},"@unstable"],["terminal",{"sourceInterval":[1931,1934]},"("],["app",{"sourceInterval":[1935,1947]},"FeatureField",[]],["terminal",{"sourceInterval":[1948,1951]},")"]]],"SinceGate":["define",{"sourceInterval":[1955,1996]},null,[],["seq",{"sourceInterval":[1967,1996]},["terminal",{"sourceInterval":[1967,1975]},"@since"],["terminal",{"sourceInterval":[1976,1979]},"("],["app",{"sourceInterval":[1980,1992]},"VersionField",[]],["terminal",{"sourceInterval":[1993,1996]},")"]]],"DeprecatedGate":["define",{"sourceInterval":[2000,2051]},null,[],["seq",{"sourceInterval":[2017,2051]},["terminal",{"sourceInterval":[2017,2030]},"@deprecated"],["terminal",{"sourceInterval":[2031,2034]},"("],["app",{"sourceInterval":[2035,2047]},"VersionField",[]],["terminal",{"sourceInterval":[2048,2051]},")"]]],"FeatureField":["define",{"sourceInterval":[2055,2089]},null,[],["seq",{"sourceInterval":[2070,2089]},["terminal",{"sourceInterval":[2070,2079]},"feature"],["terminal",{"sourceInterval":[2080,2083]},"="],["app",{"sourceInterval":[2084,2089]},"ident",[]]]],"VersionField":["define",{"sourceInterval":[2093,2129]},null,[],["seq",{"sourceInterval":[2108,2129]},["terminal",{"sourceInterval":[2108,2117]},"version"],["terminal",{"sourceInterval":[2118,2121]},"="],["app",{"sourceInterval":[2122,2129]},"version",[]]]],"FlagsItems":["define",{"sourceInterval":[2133,2183]},null,[],["seq",{"sourceInterval":[2150,2183]},["terminal",{"sourceInterval":[2150,2157]},"flags"],["app",{"sourceInterval":[2158,2163]},"ident",[]],["terminal",{"sourceInterval":[2164,2167]},"{"],["app",{"sourceInterval":[2168,2179]},"FlagsFields",[]],["terminal",{"sourceInterval":[2180,2183]},"}"]]],"FlagsFields":["define",{"sourceInterval":[2187,2229]},null,[],["seq",{"sourceInterval":[2201,2229]},["app",{"sourceInterval":[2201,2211]},"FlagsField",[]],["star",{"sourceInterval":[2212,2229]},["seq",{"sourceInterval":[2213,2227]},["terminal",{"sourceInterval":[2213,2216]},","],["app",{"sourceInterval":[2217,2227]},"FlagsField",[]]]]]],"FlagsField":["define",{"sourceInterval":[2233,2251]},null,[],["app",{"sourceInterval":[2246,2251]},"ident",[]]],"TypeItem":["define",{"sourceInterval":[2255,2298]},null,[],["seq",{"sourceInterval":[2270,2298]},["terminal",{"sourceInterval":[2270,2276]},"type"],["app",{"sourceInterval":[2277,2282]},"ident",[]],["terminal",{"sourceInterval":[2283,2286]},"="],["app",{"sourceInterval":[2287,2294]},"TypeRef",[]],["terminal",{"sourceInterval":[2295,2298]},";"]]],"VariantItem":["define",{"sourceInterval":[2302,2381]},null,[],["seq",{"sourceInterval":[2320,2381]},["terminal",{"sourceInterval":[2320,2329]},"variant"],["app",{"sourceInterval":[2330,2335]},"ident",[]],["terminal",{"sourceInterval":[2336,2339]},"{"],["app",{"sourceInterval":[2340,2372]},"NonemptyListOf",[["app",{"sourceInterval":[2355,2366]},"VariantCase",[]],["terminal",{"sourceInterval":[2368,2371]},","]]],["opt",{"sourceInterval":[2373,2377]},["terminal",{"sourceInterval":[2373,2376]},","]],["terminal",{"sourceInterval":[2378,2381]},"}"]]],"VariantCase":["define",{"sourceInterval":[2385,2427]},null,[],["seq",{"sourceInterval":[2403,2427]},["app",{"sourceInterval":[2403,2408]},"ident",[]],["opt",{"sourceInterval":[2409,2427]},["seq",{"sourceInterval":[2410,2425]},["terminal",{"sourceInterval":[2410,2413]},"("],["app",{"sourceInterval":[2414,2421]},"TypeRef",[]],["terminal",{"sourceInterval":[2422,2425]},")"]]]]],"EnumItem":["define",{"sourceInterval":[2431,2501]},null,[],["seq",{"sourceInterval":[2446,2501]},["terminal",{"sourceInterval":[2446,2452]},"enum"],["app",{"sourceInterval":[2453,2458]},"ident",[]],["terminal",{"sourceInterval":[2459,2462]},"{"],["app",{"sourceInterval":[2463,2492]},"NonemptyListOf",[["app",{"sourceInterval":[2478,2486]},"EnumCase",[]],["terminal",{"sourceInterval":[2488,2491]},","]]],["opt",{"sourceInterval":[2493,2497]},["terminal",{"sourceInterval":[2493,2496]},","]],["terminal",{"sourceInterval":[2498,2501]},"}"]]],"EnumCase":["define",{"sourceInterval":[2505,2525]},null,[],["app",{"sourceInterval":[2520,2525]},"ident",[]]],"RecordItem":["define",{"sourceInterval":[2529,2581]},null,[],["seq",{"sourceInterval":[2546,2581]},["terminal",{"sourceInterval":[2546,2554]},"record"],["app",{"sourceInterval":[2555,2560]},"ident",[]],["terminal",{"sourceInterval":[2561,2564]},"{"],["app",{"sourceInterval":[2565,2577]},"RecordFields",[]],["terminal",{"sourceInterval":[2578,2581]},"}"]]],"RecordFields":["define",{"sourceInterval":[2585,2633]},null,[],["seq",{"sourceInterval":[2603,2633]},["app",{"sourceInterval":[2603,2614]},"RecordField",[]],["star",{"sourceInterval":[2615,2633]},["seq",{"sourceInterval":[2616,2631]},["terminal",{"sourceInterval":[2616,2619]},","],["app",{"sourceInterval":[2620,2631]},"RecordField",[]]]]]],"RecordField":["define",{"sourceInterval":[2637,2672]},null,[],["seq",{"sourceInterval":[2655,2672]},["app",{"sourceInterval":[2655,2660]},"ident",[]],["terminal",{"sourceInterval":[2661,2664]},":"],["app",{"sourceInterval":[2665,2672]},"TypeRef",[]]]],"ResourceItem":["define",{"sourceInterval":[2676,2734]},null,[],["seq",{"sourceInterval":[2694,2734]},["terminal",{"sourceInterval":[2694,2704]},"resource"],["app",{"sourceInterval":[2705,2710]},"ident",[]],["terminal",{"sourceInterval":[2711,2714]},"{"],["star",{"sourceInterval":[2715,2730]},["app",{"sourceInterval":[2715,2729]},"ResourceMethod",[]]],["terminal",{"sourceInterval":[2731,2734]},"}"]]],"ResourceMethod_method":["define",{"sourceInterval":[2759,2806]},null,[],["seq",{"sourceInterval":[2759,2781]},["app",{"sourceInterval":[2759,2764]},"ident",[]],["terminal",{"sourceInterval":[2765,2768]},":"],["app",{"sourceInterval":[2769,2777]},"FuncType",[]],["terminal",{"sourceInterval":[2778,2781]},";"]]],"ResourceMethod_static":["define",{"sourceInterval":[2813,2860]},null,[],["seq",{"sourceInterval":[2813,2844]},["app",{"sourceInterval":[2813,2818]},"ident",[]],["terminal",{"sourceInterval":[2819,2822]},":"],["terminal",{"sourceInterval":[2823,2831]},"static"],["app",{"sourceInterval":[2832,2840]},"FuncType",[]],["terminal",{"sourceInterval":[2841,2844]},";"]]],"ResourceMethod_constructor":["define",{"sourceInterval":[2867,2919]},null,[],["seq",{"sourceInterval":[2867,2894]},["terminal",{"sourceInterval":[2867,2880]},"constructor"],["app",{"sourceInterval":[2881,2890]},"ParamList",[]],["terminal",{"sourceInterval":[2891,2894]},";"]]],"ResourceMethod":["define",{"sourceInterval":[2738,2919]},null,[],["alt",{"sourceInterval":[2759,2919]},["app",{"sourceInterval":[2759,2781]},"ResourceMethod_method",[]],["app",{"sourceInterval":[2813,2844]},"ResourceMethod_static",[]],["app",{"sourceInterval":[2867,2894]},"ResourceMethod_constructor",[]]]],"FuncItem":["define",{"sourceInterval":[2923,2956]},null,[],["seq",{"sourceInterval":[2934,2956]},["app",{"sourceInterval":[2934,2939]},"ident",[]],["terminal",{"sourceInterval":[2940,2943]},":"],["app",{"sourceInterval":[2944,2952]},"FuncType",[]],["terminal",{"sourceInterval":[2953,2956]},";"]]],"FuncType":["define",{"sourceInterval":[2960,3012]},null,[],["seq",{"sourceInterval":[2971,3012]},["opt",{"sourceInterval":[2971,2979]},["terminal",{"sourceInterval":[2971,2978]},"async"]],["terminal",{"sourceInterval":[2980,2986]},"func"],["app",{"sourceInterval":[2987,2996]},"ParamList",[]],["opt",{"sourceInterval":[2997,3012]},["seq",{"sourceInterval":[2998,3010]},["terminal",{"sourceInterval":[2998,3002]},"->"],["app",{"sourceInterval":[3003,3010]},"TypeRef",[]]]]]],"ParamList":["define",{"sourceInterval":[3016,3050]},null,[],["seq",{"sourceInterval":[3028,3050]},["terminal",{"sourceInterval":[3028,3031]},"("],["opt",{"sourceInterval":[3032,3046]},["app",{"sourceInterval":[3032,3045]},"NamedTypeList",[]]],["terminal",{"sourceInterval":[3047,3050]},")"]]],"NamedTypeList":["define",{"sourceInterval":[3054,3096]},null,[],["seq",{"sourceInterval":[3070,3096]},["app",{"sourceInterval":[3070,3079]},"NamedType",[]],["star",{"sourceInterval":[3080,3096]},["seq",{"sourceInterval":[3081,3094]},["terminal",{"sourceInterval":[3081,3084]},","],["app",{"sourceInterval":[3085,3094]},"NamedType",[]]]]]],"NamedType":["define",{"sourceInterval":[3100,3129]},null,[],["seq",{"sourceInterval":[3112,3129]},["app",{"sourceInterval":[3112,3117]},"ident",[]],["terminal",{"sourceInterval":[3118,3121]},":"],["app",{"sourceInterval":[3122,3129]},"TypeRef",[]]]],"TypeRef":["define",{"sourceInterval":[3133,3235]},null,[],["alt",{"sourceInterval":[3146,3235]},["app",{"sourceInterval":[3146,3156]},"SimpleType",[]],["app",{"sourceInterval":[3163,3173]},"ResultType",[]],["app",{"sourceInterval":[3180,3189]},"TupleType",[]],["app",{"sourceInterval":[3196,3206]},"OptionType",[]],["app",{"sourceInterval":[3213,3221]},"ListType",[]],["app",{"sourceInterval":[3228,3235]},"RefType",[]]]],"RefType":["define",{"sourceInterval":[3239,3254]},null,[],["app",{"sourceInterval":[3249,3254]},"ident",[]]],"ResultType":["define",{"sourceInterval":[3258,3310]},null,[],["seq",{"sourceInterval":[3271,3310]},["terminal",{"sourceInterval":[3271,3279]},"result"],["terminal",{"sourceInterval":[3280,3283]},"<"],["app",{"sourceInterval":[3284,3291]},"TypeRef",[]],["opt",{"sourceInterval":[3292,3306]},["seq",{"sourceInterval":[3293,3304]},["terminal",{"sourceInterval":[3293,3296]},","],["app",{"sourceInterval":[3297,3304]},"TypeRef",[]]]],["terminal",{"sourceInterval":[3307,3310]},">"]]],"TupleType":["define",{"sourceInterval":[3314,3364]},null,[],["seq",{"sourceInterval":[3326,3364]},["terminal",{"sourceInterval":[3326,3333]},"tuple"],["terminal",{"sourceInterval":[3334,3337]},"<"],["app",{"sourceInterval":[3338,3345]},"TypeRef",[]],["star",{"sourceInterval":[3346,3360]},["seq",{"sourceInterval":[3347,3358]},["terminal",{"sourceInterval":[3347,3350]},","],["app",{"sourceInterval":[3351,3358]},"TypeRef",[]]]],["terminal",{"sourceInterval":[3361,3364]},">"]]],"OptionType":["define",{"sourceInterval":[3368,3405]},null,[],["seq",{"sourceInterval":[3381,3405]},["terminal",{"sourceInterval":[3381,3389]},"option"],["terminal",{"sourceInterval":[3390,3393]},"<"],["app",{"sourceInterval":[3394,3401]},"TypeRef",[]],["terminal",{"sourceInterval":[3402,3405]},">"]]],"ListType":["define",{"sourceInterval":[3409,3442]},null,[],["seq",{"sourceInterval":[3420,3442]},["terminal",{"sourceInterval":[3420,3426]},"list"],["terminal",{"sourceInterval":[3427,3430]},"<"],["app",{"sourceInterval":[3431,3438]},"TypeRef",[]],["terminal",{"sourceInterval":[3439,3442]},">"]]],"SimpleType":["define",{"sourceInterval":[3446,3586]},null,[],["alt",{"sourceInterval":[3462,3586]},["terminal",{"sourceInterval":[3462,3466]},"s8"],["terminal",{"sourceInterval":[3469,3474]},"s16"],["terminal",{"sourceInterval":[3477,3482]},"s32"],["terminal",{"sourceInterval":[3485,3490]},"s64"],["terminal",{"sourceInterval":[3497,3501]},"u8"],["terminal",{"sourceInterval":[3504,3509]},"u16"],["terminal",{"sourceInterval":[3512,3517]},"u32"],["terminal",{"sourceInterval":[3520,3525]},"u64"],["terminal",{"sourceInterval":[3532,3537]},"f32"],["terminal",{"sourceInterval":[3540,3545]},"f64"],["terminal",{"sourceInterval":[3552,3558]},"bool"],["terminal",{"sourceInterval":[3565,3573]},"string"],["terminal",{"sourceInterval":[3580,3586]},"char"]]],"packageIdentifier":["define",{"sourceInterval":[3590,3648]},null,[],["seq",{"sourceInterval":[3613,3648]},["plus",{"sourceInterval":[3613,3625]},["seq",{"sourceInterval":[3614,3623]},["app",{"sourceInterval":[3614,3619]},"ident",[]],["terminal",{"sourceInterval":[3620,3623]},":"]]],["app",{"sourceInterval":[3626,3633]},"package",[]],["opt",{"sourceInterval":[3634,3648]},["seq",{"sourceInterval":[3635,3646]},["terminal",{"sourceInterval":[3635,3638]},"@"],["app",{"sourceInterval":[3639,3646]},"version",[]]]]]],"version":["define",{"sourceInterval":[3652,3700]},null,[],["seq",{"sourceInterval":[3666,3700]},["plus",{"sourceInterval":[3667,3673]},["app",{"sourceInterval":[3667,3672]},"digit",[]]],["terminal",{"sourceInterval":[3675,3678]},"."],["plus",{"sourceInterval":[3680,3686]},["app",{"sourceInterval":[3680,3685]},"digit",[]]],["terminal",{"sourceInterval":[3688,3691]},"."],["plus",{"sourceInterval":[3693,3699]},["app",{"sourceInterval":[3693,3698]},"digit",[]]]]],"package":["define",{"sourceInterval":[3704,3735]},null,[],["seq",{"sourceInterval":[3717,3735]},["app",{"sourceInterval":[3717,3722]},"ident",[]],["star",{"sourceInterval":[3723,3735]},["seq",{"sourceInterval":[3724,3733]},["terminal",{"sourceInterval":[3724,3727]},"/"],["app",{"sourceInterval":[3728,3733]},"ident",[]]]]]],"ident":["define",{"sourceInterval":[3739,3756]},null,[],["app",{"sourceInterval":[3751,3756]},"label",[]]],"label":["define",{"sourceInterval":[3760,3796]},null,[],["seq",{"sourceInterval":[3772,3796]},["app",{"sourceInterval":[3772,3780]},"fragment",[]],["star",{"sourceInterval":[3781,3796]},["seq",{"sourceInterval":[3782,3794]},["terminal",{"sourceInterval":[3782,3785]},"-"],["app",{"sourceInterval":[3786,3794]},"fragment",[]]]]]],"fragment":["define",{"sourceInterval":[3800,3833]},null,[],["alt",{"sourceInterval":[3815,3833]},["app",{"sourceInterval":[3815,3819]},"word",[]],["app",{"sourceInterval":[3826,3833]},"acronym",[]]]],"word":["define",{"sourceInterval":[3837,3870]},null,[],["seq",{"sourceInterval":[3848,3870]},["app",{"sourceInterval":[3848,3853]},"lower",[]],["star",{"sourceInterval":[3854,3870]},["alt",{"sourceInterval":[3855,3868]},["app",{"sourceInterval":[3855,3860]},"lower",[]],["app",{"sourceInterval":[3863,3868]},"digit",[]]]]]],"acronym":["define",{"sourceInterval":[3874,3910]},null,[],["seq",{"sourceInterval":[3888,3910]},["app",{"sourceInterval":[3888,3893]},"upper",[]],["star",{"sourceInterval":[3894,3910]},["alt",{"sourceInterval":[3895,3908]},["app",{"sourceInterval":[3895,3900]},"upper",[]],["app",{"sourceInterval":[3903,3908]},"digit",[]]]]]],"space":["override",{"sourceInterval":[3914,3966]},null,[],["alt",{"sourceInterval":[3923,3966]},["app",{"sourceInterval":[3923,3933]},"whitespace",[]],["app",{"sourceInterval":[3936,3947]},"lineComment",[]],["app",{"sourceInterval":[3950,3966]},"multiLineComment",[]]]],"whitespace":["define",{"sourceInterval":[3969,4006]},null,[],["alt",{"sourceInterval":[3982,4006]},["terminal",{"sourceInterval":[3982,3985]}," "],["terminal",{"sourceInterval":[3988,3992]},"\t"],["terminal",{"sourceInterval":[3995,3999]},"\n"],["terminal",{"sourceInterval":[4002,4006]},"\r"]]],"lineComment":["define",{"sourceInterval":[4039,4075]},null,[],["seq",{"sourceInterval":[4053,4075]},["terminal",{"sourceInterval":[4053,4057]},"//"],["star",{"sourceInterval":[4058,4070]},["seq",{"sourceInterval":[4059,4068]},["not",{"sourceInterval":[4059,4064]},["terminal",{"sourceInterval":[4060,4064]},"\n"]],["app",{"sourceInterval":[4065,4068]},"any",[]]]],["terminal",{"sourceInterval":[4071,4075]},"\n"]]],"multiLineComment":["define",{"sourceInterval":[4105,4146]},null,[],["seq",{"sourceInterval":[4124,4146]},["terminal",{"sourceInterval":[4124,4128]},"/*"],["star",{"sourceInterval":[4129,4141]},["seq",{"sourceInterval":[4130,4139]},["not",{"sourceInterval":[4130,4135]},["terminal",{"sourceInterval":[4131,4135]},"*/"]],["app",{"sourceInterval":[4136,4139]},"any",[]]]],["terminal",{"sourceInterval":[4142,4146]},"*/"]]]}]);module.exports=result;