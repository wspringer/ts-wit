'use strict';const {makeRecipe}=require('ohm-js');const result=makeRecipe(["grammar",{"source":"Wit {\n\n  File\n    = (PackageDecl \";\")? (PackageItem | NestedPackageDefinition)*\n\n  PackageDecl\n    = \"package\" packageIdentifier\n\n  NestedPackageDefinition = PackageDecl \"{\" PackageItem* \"}\"\n\n  PackageItem\n    = ToplevelUseItem\n    | InterfaceItem\n    | WorldItem\n\n  WorldItem = Gate \"world\" ident \"{\" WorldItems* \"}\"\n\n  WorldItems = Gate WorldDefinition\n\n  WorldDefinition\n    = ExportItem\n    | ImportItem\n    | UseItem\n    | TypedefItem\n    | IncludeItem\n\n  ExportItem\n    = ExportItemExternType\n    | ExportItemUsePath\n\n  ExportItemExternType = \"export\" ident \":\" ExternType\n\n  ExportItemUsePath = \"export\" UsePath \";\"\n\n  ImportItem\n    = ImportItemExternType\n    | ImportItemUsePath\n\n  ImportItemExternType = \"import\" ident \":\" ExternType\n\n  ImportItemUsePath = \"import\" UsePath \";\"\n\n  IncludeItem\n    = \"include\" UsePath \";\"                                               -- simple\n    | \"include\" UsePath \"with\" \"{\" ListOf<IncludeNamesItem, \",\">  \"}\"     -- aliased\n\n  IncludeNamesItem = ident \"as\" ident\n\n  UseItem = \"use\" UsePath \".\" \"{\" UseNamesList \"}\"\n\n  UseNamesList = NonemptyListOf<UseNamesItem, \",\">\n\n  UseNamesItem = ident (\"as\" ident)?\n\n  ExternType\n    = ExternTypeFunc\n    | ExternTypeInterface\n\n  ExternTypeFunc = FuncType \";\"\n\n  ExternTypeInterface = \"interface\" \"{\" InterfaceItems* \"}\"\n\n  ToplevelUseItem = \"use\" UsePath (\"as\" ident)? \";\"\n\n  UsePath\n    = QualifiedUsePath\n    | BareUsePath\n\n  BareUsePath = ident\n\n  QualifiedUsePath = packageIdentifier\n\n  InterfaceItem\n    = \"interface\" ident \"{\" InterfaceItems* \"}\"\n\n  InterfaceItems = Gate InterfaceDefinition\n\n  InterfaceDefinition\n    = TypedefItem\n    | UseItem\n    | FuncItem\n\n  TypedefItem\n    = TypeItem\n    | RecordItem\n    | EnumItem\n    | VariantItem\n    | FlagsItems\n    | ResourceItem\n\n  Gate\n    = GateItem*\n\n  GateItem\n    = UnstableGate\n    | SinceGate\n    | DeprecatedGate\n\n  UnstableGate = \"@unstable\" \"(\" FeatureField \")\"\n\n  SinceGate = \"@since\" \"(\" VersionField \")\"\n\n  DeprecatedGate = \"@deprecated\" \"(\" VersionField \")\"\n\n  FeatureField = \"feature\" \"=\" ident\n\n  VersionField = \"version\" \"=\" version\n\n  FlagsItems\n    = \"flags\" ident \"{\" NonemptyListOf<FlagsField, \",\"> \",\"? \"}\"\n\n  FlagsField = ident\n\n  TypeItem\n    = \"type\" ident \"=\" TypeRef \";\"\n\n  VariantItem\n    = \"variant\" ident \"{\" NonemptyListOf<VariantCase, \",\"> \",\"? \"}\"\n\n  VariantCase\n    = ident (\"(\" TypeRef \")\")?\n\n  EnumItem\n    = \"enum\" ident \"{\" NonemptyListOf<ident, \",\"> \",\"? \"}\"\n\n  EnumCase\n    = ident\n\n  RecordItem\n    = \"record\" ident \"{\" NonemptyListOf<RecordField, \",\"> \",\"? \"}\"\n\n  RecordField\n    = ident \":\" TypeRef\n\n  ResourceItem\n  \t= \"resource\" ident \"{\" ResourceMethod* \"}\"\n\n  ResourceMethod\n    = ident \":\" FuncType \";\"                -- method\n    | ident \":\" \"static\" FuncType \";\"       -- static\n    | \"constructor\" ParamList \";\"           -- constructor\n\n  FuncItem = ident \":\" FuncType \";\"\n\n  FuncType = \"async\"? \"func\" ParamList ResultList?\n\n  ResultList = \"->\" TypeRef\n\n  ParamList = \"(\" NamedTypeList \")\"\n\n  NamedTypeList = ListOf<NamedType, \",\">\n\n  NamedType = ident \":\" TypeRef\n\n  TypeRef\n  \t= SimpleType\n    | ResultType\n    | TupleType\n    | OptionType\n    | ListType\n    | RefType\n\n  RefType = ident\n\n  ResultType = \"result\" \"<\" TypeRef (\",\" TypeRef)? \">\"\n\n  TupleType = \"tuple\" \"<\" TypeRef (\",\" TypeRef)* \">\"\n\n  OptionType = \"option\" \"<\" TypeRef \">\"\n\n  ListType = \"list\" \"<\" TypeRef \">\"\n\n  SimpleType\n  \t= \"s8\" | \"s16\" | \"s32\" | \"s64\"\n    | \"u8\" | \"u16\" | \"u32\" | \"u64\"\n    | \"f32\" | \"f64\"\n    | \"bool\"\n    | \"string\"\n    | \"char\"\n\n  packageIdentifier\n  \t= (ident \":\")+ package (\"@\" version)?\n\n  version\n    = (digit+) \".\" (digit+) \".\" (digit+)\n\n  package\n  \t= ident (\"/\" ident)*\n\n  ident\n    = label\n\n  label\n    = fragment (\"-\" fragment)*\n\n  fragment\n    = word\n    | acronym\n\n  word\n    = lower (lower | digit)*\n\n  acronym\n    = upper (upper | digit)*\n\n  space := whitespace | lineComment | multiLineComment\n  whitespace = \" \" | \"\\t\" | \"\\n\" | \"\\r\"  // explicit whitespace chars\n  lineComment = \"//\" (~\"\\n\" any)* \"\\n\"    // single line comments\n  multiLineComment = \"/*\" (~\"*/\" any)* \"*/\"  // multi-line comments\n\n}"},"Wit",null,"File",{"File":["define",{"sourceInterval":[9,79]},null,[],["seq",{"sourceInterval":[20,79]},["opt",{"sourceInterval":[20,38]},["seq",{"sourceInterval":[21,36]},["app",{"sourceInterval":[21,32]},"PackageDecl",[]],["terminal",{"sourceInterval":[33,36]},";"]]],["star",{"sourceInterval":[39,79]},["alt",{"sourceInterval":[40,77]},["app",{"sourceInterval":[40,51]},"PackageItem",[]],["app",{"sourceInterval":[54,77]},"NestedPackageDefinition",[]]]]]],"PackageDecl":["define",{"sourceInterval":[83,128]},null,[],["seq",{"sourceInterval":[101,128]},["terminal",{"sourceInterval":[101,110]},"package"],["app",{"sourceInterval":[111,128]},"packageIdentifier",[]]]],"NestedPackageDefinition":["define",{"sourceInterval":[132,190]},null,[],["seq",{"sourceInterval":[158,190]},["app",{"sourceInterval":[158,169]},"PackageDecl",[]],["terminal",{"sourceInterval":[170,173]},"{"],["star",{"sourceInterval":[174,186]},["app",{"sourceInterval":[174,185]},"PackageItem",[]]],["terminal",{"sourceInterval":[187,190]},"}"]]],"PackageItem":["define",{"sourceInterval":[194,263]},null,[],["alt",{"sourceInterval":[212,263]},["app",{"sourceInterval":[212,227]},"ToplevelUseItem",[]],["app",{"sourceInterval":[234,247]},"InterfaceItem",[]],["app",{"sourceInterval":[254,263]},"WorldItem",[]]]],"WorldItem":["define",{"sourceInterval":[267,317]},null,[],["seq",{"sourceInterval":[279,317]},["app",{"sourceInterval":[279,283]},"Gate",[]],["terminal",{"sourceInterval":[284,291]},"world"],["app",{"sourceInterval":[292,297]},"ident",[]],["terminal",{"sourceInterval":[298,301]},"{"],["star",{"sourceInterval":[302,313]},["app",{"sourceInterval":[302,312]},"WorldItems",[]]],["terminal",{"sourceInterval":[314,317]},"}"]]],"WorldItems":["define",{"sourceInterval":[321,354]},null,[],["seq",{"sourceInterval":[334,354]},["app",{"sourceInterval":[334,338]},"Gate",[]],["app",{"sourceInterval":[339,354]},"WorldDefinition",[]]]],"WorldDefinition":["define",{"sourceInterval":[358,457]},null,[],["alt",{"sourceInterval":[380,457]},["app",{"sourceInterval":[380,390]},"ExportItem",[]],["app",{"sourceInterval":[397,407]},"ImportItem",[]],["app",{"sourceInterval":[414,421]},"UseItem",[]],["app",{"sourceInterval":[428,439]},"TypedefItem",[]],["app",{"sourceInterval":[446,457]},"IncludeItem",[]]]],"ExportItem":["define",{"sourceInterval":[461,522]},null,[],["alt",{"sourceInterval":[478,522]},["app",{"sourceInterval":[478,498]},"ExportItemExternType",[]],["app",{"sourceInterval":[505,522]},"ExportItemUsePath",[]]]],"ExportItemExternType":["define",{"sourceInterval":[526,578]},null,[],["seq",{"sourceInterval":[549,578]},["terminal",{"sourceInterval":[549,557]},"export"],["app",{"sourceInterval":[558,563]},"ident",[]],["terminal",{"sourceInterval":[564,567]},":"],["app",{"sourceInterval":[568,578]},"ExternType",[]]]],"ExportItemUsePath":["define",{"sourceInterval":[582,622]},null,[],["seq",{"sourceInterval":[602,622]},["terminal",{"sourceInterval":[602,610]},"export"],["app",{"sourceInterval":[611,618]},"UsePath",[]],["terminal",{"sourceInterval":[619,622]},";"]]],"ImportItem":["define",{"sourceInterval":[626,687]},null,[],["alt",{"sourceInterval":[643,687]},["app",{"sourceInterval":[643,663]},"ImportItemExternType",[]],["app",{"sourceInterval":[670,687]},"ImportItemUsePath",[]]]],"ImportItemExternType":["define",{"sourceInterval":[691,743]},null,[],["seq",{"sourceInterval":[714,743]},["terminal",{"sourceInterval":[714,722]},"import"],["app",{"sourceInterval":[723,728]},"ident",[]],["terminal",{"sourceInterval":[729,732]},":"],["app",{"sourceInterval":[733,743]},"ExternType",[]]]],"ImportItemUsePath":["define",{"sourceInterval":[747,787]},null,[],["seq",{"sourceInterval":[767,787]},["terminal",{"sourceInterval":[767,775]},"import"],["app",{"sourceInterval":[776,783]},"UsePath",[]],["terminal",{"sourceInterval":[784,787]},";"]]],"IncludeItem_simple":["define",{"sourceInterval":[809,886]},null,[],["seq",{"sourceInterval":[809,830]},["terminal",{"sourceInterval":[809,818]},"include"],["app",{"sourceInterval":[819,826]},"UsePath",[]],["terminal",{"sourceInterval":[827,830]},";"]]],"IncludeItem_aliased":["define",{"sourceInterval":[893,971]},null,[],["seq",{"sourceInterval":[893,956]},["terminal",{"sourceInterval":[893,902]},"include"],["app",{"sourceInterval":[903,910]},"UsePath",[]],["terminal",{"sourceInterval":[911,917]},"with"],["terminal",{"sourceInterval":[918,921]},"{"],["app",{"sourceInterval":[922,951]},"ListOf",[["app",{"sourceInterval":[929,945]},"IncludeNamesItem",[]],["terminal",{"sourceInterval":[947,950]},","]]],["terminal",{"sourceInterval":[953,956]},"}"]]],"IncludeItem":["define",{"sourceInterval":[791,971]},null,[],["alt",{"sourceInterval":[809,971]},["app",{"sourceInterval":[809,830]},"IncludeItem_simple",[]],["app",{"sourceInterval":[893,956]},"IncludeItem_aliased",[]]]],"IncludeNamesItem":["define",{"sourceInterval":[975,1010]},null,[],["seq",{"sourceInterval":[994,1010]},["app",{"sourceInterval":[994,999]},"ident",[]],["terminal",{"sourceInterval":[1000,1004]},"as"],["app",{"sourceInterval":[1005,1010]},"ident",[]]]],"UseItem":["define",{"sourceInterval":[1014,1062]},null,[],["seq",{"sourceInterval":[1024,1062]},["terminal",{"sourceInterval":[1024,1029]},"use"],["app",{"sourceInterval":[1030,1037]},"UsePath",[]],["terminal",{"sourceInterval":[1038,1041]},"."],["terminal",{"sourceInterval":[1042,1045]},"{"],["app",{"sourceInterval":[1046,1058]},"UseNamesList",[]],["terminal",{"sourceInterval":[1059,1062]},"}"]]],"UseNamesList":["define",{"sourceInterval":[1066,1114]},null,[],["app",{"sourceInterval":[1081,1114]},"NonemptyListOf",[["app",{"sourceInterval":[1096,1108]},"UseNamesItem",[]],["terminal",{"sourceInterval":[1110,1113]},","]]]],"UseNamesItem":["define",{"sourceInterval":[1118,1152]},null,[],["seq",{"sourceInterval":[1133,1152]},["app",{"sourceInterval":[1133,1138]},"ident",[]],["opt",{"sourceInterval":[1139,1152]},["seq",{"sourceInterval":[1140,1150]},["terminal",{"sourceInterval":[1140,1144]},"as"],["app",{"sourceInterval":[1145,1150]},"ident",[]]]]]],"ExternType":["define",{"sourceInterval":[1156,1213]},null,[],["alt",{"sourceInterval":[1173,1213]},["app",{"sourceInterval":[1173,1187]},"ExternTypeFunc",[]],["app",{"sourceInterval":[1194,1213]},"ExternTypeInterface",[]]]],"ExternTypeFunc":["define",{"sourceInterval":[1217,1246]},null,[],["seq",{"sourceInterval":[1234,1246]},["app",{"sourceInterval":[1234,1242]},"FuncType",[]],["terminal",{"sourceInterval":[1243,1246]},";"]]],"ExternTypeInterface":["define",{"sourceInterval":[1250,1307]},null,[],["seq",{"sourceInterval":[1272,1307]},["terminal",{"sourceInterval":[1272,1283]},"interface"],["terminal",{"sourceInterval":[1284,1287]},"{"],["star",{"sourceInterval":[1288,1303]},["app",{"sourceInterval":[1288,1302]},"InterfaceItems",[]]],["terminal",{"sourceInterval":[1304,1307]},"}"]]],"ToplevelUseItem":["define",{"sourceInterval":[1311,1360]},null,[],["seq",{"sourceInterval":[1329,1360]},["terminal",{"sourceInterval":[1329,1334]},"use"],["app",{"sourceInterval":[1335,1342]},"UsePath",[]],["opt",{"sourceInterval":[1343,1356]},["seq",{"sourceInterval":[1344,1354]},["terminal",{"sourceInterval":[1344,1348]},"as"],["app",{"sourceInterval":[1349,1354]},"ident",[]]]],["terminal",{"sourceInterval":[1357,1360]},";"]]],"UsePath":["define",{"sourceInterval":[1364,1412]},null,[],["alt",{"sourceInterval":[1378,1412]},["app",{"sourceInterval":[1378,1394]},"QualifiedUsePath",[]],["app",{"sourceInterval":[1401,1412]},"BareUsePath",[]]]],"BareUsePath":["define",{"sourceInterval":[1416,1435]},null,[],["app",{"sourceInterval":[1430,1435]},"ident",[]]],"QualifiedUsePath":["define",{"sourceInterval":[1439,1475]},null,[],["app",{"sourceInterval":[1458,1475]},"packageIdentifier",[]]],"InterfaceItem":["define",{"sourceInterval":[1479,1540]},null,[],["seq",{"sourceInterval":[1499,1540]},["terminal",{"sourceInterval":[1499,1510]},"interface"],["app",{"sourceInterval":[1511,1516]},"ident",[]],["terminal",{"sourceInterval":[1517,1520]},"{"],["star",{"sourceInterval":[1521,1536]},["app",{"sourceInterval":[1521,1535]},"InterfaceItems",[]]],["terminal",{"sourceInterval":[1537,1540]},"}"]]],"InterfaceItems":["define",{"sourceInterval":[1544,1585]},null,[],["seq",{"sourceInterval":[1561,1585]},["app",{"sourceInterval":[1561,1565]},"Gate",[]],["app",{"sourceInterval":[1566,1585]},"InterfaceDefinition",[]]]],"InterfaceDefinition":["define",{"sourceInterval":[1589,1655]},null,[],["alt",{"sourceInterval":[1615,1655]},["app",{"sourceInterval":[1615,1626]},"TypedefItem",[]],["app",{"sourceInterval":[1633,1640]},"UseItem",[]],["app",{"sourceInterval":[1647,1655]},"FuncItem",[]]]],"TypedefItem":["define",{"sourceInterval":[1659,1771]},null,[],["alt",{"sourceInterval":[1677,1771]},["app",{"sourceInterval":[1677,1685]},"TypeItem",[]],["app",{"sourceInterval":[1692,1702]},"RecordItem",[]],["app",{"sourceInterval":[1709,1717]},"EnumItem",[]],["app",{"sourceInterval":[1724,1735]},"VariantItem",[]],["app",{"sourceInterval":[1742,1752]},"FlagsItems",[]],["app",{"sourceInterval":[1759,1771]},"ResourceItem",[]]]],"Gate":["define",{"sourceInterval":[1775,1795]},null,[],["star",{"sourceInterval":[1786,1795]},["app",{"sourceInterval":[1786,1794]},"GateItem",[]]]],"GateItem":["define",{"sourceInterval":[1799,1863]},null,[],["alt",{"sourceInterval":[1814,1863]},["app",{"sourceInterval":[1814,1826]},"UnstableGate",[]],["app",{"sourceInterval":[1833,1842]},"SinceGate",[]],["app",{"sourceInterval":[1849,1863]},"DeprecatedGate",[]]]],"UnstableGate":["define",{"sourceInterval":[1867,1914]},null,[],["seq",{"sourceInterval":[1882,1914]},["terminal",{"sourceInterval":[1882,1893]},"@unstable"],["terminal",{"sourceInterval":[1894,1897]},"("],["app",{"sourceInterval":[1898,1910]},"FeatureField",[]],["terminal",{"sourceInterval":[1911,1914]},")"]]],"SinceGate":["define",{"sourceInterval":[1918,1959]},null,[],["seq",{"sourceInterval":[1930,1959]},["terminal",{"sourceInterval":[1930,1938]},"@since"],["terminal",{"sourceInterval":[1939,1942]},"("],["app",{"sourceInterval":[1943,1955]},"VersionField",[]],["terminal",{"sourceInterval":[1956,1959]},")"]]],"DeprecatedGate":["define",{"sourceInterval":[1963,2014]},null,[],["seq",{"sourceInterval":[1980,2014]},["terminal",{"sourceInterval":[1980,1993]},"@deprecated"],["terminal",{"sourceInterval":[1994,1997]},"("],["app",{"sourceInterval":[1998,2010]},"VersionField",[]],["terminal",{"sourceInterval":[2011,2014]},")"]]],"FeatureField":["define",{"sourceInterval":[2018,2052]},null,[],["seq",{"sourceInterval":[2033,2052]},["terminal",{"sourceInterval":[2033,2042]},"feature"],["terminal",{"sourceInterval":[2043,2046]},"="],["app",{"sourceInterval":[2047,2052]},"ident",[]]]],"VersionField":["define",{"sourceInterval":[2056,2092]},null,[],["seq",{"sourceInterval":[2071,2092]},["terminal",{"sourceInterval":[2071,2080]},"version"],["terminal",{"sourceInterval":[2081,2084]},"="],["app",{"sourceInterval":[2085,2092]},"version",[]]]],"FlagsItems":["define",{"sourceInterval":[2096,2171]},null,[],["seq",{"sourceInterval":[2113,2171]},["terminal",{"sourceInterval":[2113,2120]},"flags"],["app",{"sourceInterval":[2121,2126]},"ident",[]],["terminal",{"sourceInterval":[2127,2130]},"{"],["app",{"sourceInterval":[2131,2162]},"NonemptyListOf",[["app",{"sourceInterval":[2146,2156]},"FlagsField",[]],["terminal",{"sourceInterval":[2158,2161]},","]]],["opt",{"sourceInterval":[2163,2167]},["terminal",{"sourceInterval":[2163,2166]},","]],["terminal",{"sourceInterval":[2168,2171]},"}"]]],"FlagsField":["define",{"sourceInterval":[2175,2193]},null,[],["app",{"sourceInterval":[2188,2193]},"ident",[]]],"TypeItem":["define",{"sourceInterval":[2197,2240]},null,[],["seq",{"sourceInterval":[2212,2240]},["terminal",{"sourceInterval":[2212,2218]},"type"],["app",{"sourceInterval":[2219,2224]},"ident",[]],["terminal",{"sourceInterval":[2225,2228]},"="],["app",{"sourceInterval":[2229,2236]},"TypeRef",[]],["terminal",{"sourceInterval":[2237,2240]},";"]]],"VariantItem":["define",{"sourceInterval":[2244,2323]},null,[],["seq",{"sourceInterval":[2262,2323]},["terminal",{"sourceInterval":[2262,2271]},"variant"],["app",{"sourceInterval":[2272,2277]},"ident",[]],["terminal",{"sourceInterval":[2278,2281]},"{"],["app",{"sourceInterval":[2282,2314]},"NonemptyListOf",[["app",{"sourceInterval":[2297,2308]},"VariantCase",[]],["terminal",{"sourceInterval":[2310,2313]},","]]],["opt",{"sourceInterval":[2315,2319]},["terminal",{"sourceInterval":[2315,2318]},","]],["terminal",{"sourceInterval":[2320,2323]},"}"]]],"VariantCase":["define",{"sourceInterval":[2327,2369]},null,[],["seq",{"sourceInterval":[2345,2369]},["app",{"sourceInterval":[2345,2350]},"ident",[]],["opt",{"sourceInterval":[2351,2369]},["seq",{"sourceInterval":[2352,2367]},["terminal",{"sourceInterval":[2352,2355]},"("],["app",{"sourceInterval":[2356,2363]},"TypeRef",[]],["terminal",{"sourceInterval":[2364,2367]},")"]]]]],"EnumItem":["define",{"sourceInterval":[2373,2440]},null,[],["seq",{"sourceInterval":[2388,2440]},["terminal",{"sourceInterval":[2388,2394]},"enum"],["app",{"sourceInterval":[2395,2400]},"ident",[]],["terminal",{"sourceInterval":[2401,2404]},"{"],["app",{"sourceInterval":[2405,2431]},"NonemptyListOf",[["app",{"sourceInterval":[2420,2425]},"ident",[]],["terminal",{"sourceInterval":[2427,2430]},","]]],["opt",{"sourceInterval":[2432,2436]},["terminal",{"sourceInterval":[2432,2435]},","]],["terminal",{"sourceInterval":[2437,2440]},"}"]]],"EnumCase":["define",{"sourceInterval":[2444,2464]},null,[],["app",{"sourceInterval":[2459,2464]},"ident",[]]],"RecordItem":["define",{"sourceInterval":[2468,2545]},null,[],["seq",{"sourceInterval":[2485,2545]},["terminal",{"sourceInterval":[2485,2493]},"record"],["app",{"sourceInterval":[2494,2499]},"ident",[]],["terminal",{"sourceInterval":[2500,2503]},"{"],["app",{"sourceInterval":[2504,2536]},"NonemptyListOf",[["app",{"sourceInterval":[2519,2530]},"RecordField",[]],["terminal",{"sourceInterval":[2532,2535]},","]]],["opt",{"sourceInterval":[2537,2541]},["terminal",{"sourceInterval":[2537,2540]},","]],["terminal",{"sourceInterval":[2542,2545]},"}"]]],"RecordField":["define",{"sourceInterval":[2549,2584]},null,[],["seq",{"sourceInterval":[2567,2584]},["app",{"sourceInterval":[2567,2572]},"ident",[]],["terminal",{"sourceInterval":[2573,2576]},":"],["app",{"sourceInterval":[2577,2584]},"TypeRef",[]]]],"ResourceItem":["define",{"sourceInterval":[2588,2646]},null,[],["seq",{"sourceInterval":[2606,2646]},["terminal",{"sourceInterval":[2606,2616]},"resource"],["app",{"sourceInterval":[2617,2622]},"ident",[]],["terminal",{"sourceInterval":[2623,2626]},"{"],["star",{"sourceInterval":[2627,2642]},["app",{"sourceInterval":[2627,2641]},"ResourceMethod",[]]],["terminal",{"sourceInterval":[2643,2646]},"}"]]],"ResourceMethod_method":["define",{"sourceInterval":[2671,2718]},null,[],["seq",{"sourceInterval":[2671,2693]},["app",{"sourceInterval":[2671,2676]},"ident",[]],["terminal",{"sourceInterval":[2677,2680]},":"],["app",{"sourceInterval":[2681,2689]},"FuncType",[]],["terminal",{"sourceInterval":[2690,2693]},";"]]],"ResourceMethod_static":["define",{"sourceInterval":[2725,2772]},null,[],["seq",{"sourceInterval":[2725,2756]},["app",{"sourceInterval":[2725,2730]},"ident",[]],["terminal",{"sourceInterval":[2731,2734]},":"],["terminal",{"sourceInterval":[2735,2743]},"static"],["app",{"sourceInterval":[2744,2752]},"FuncType",[]],["terminal",{"sourceInterval":[2753,2756]},";"]]],"ResourceMethod_constructor":["define",{"sourceInterval":[2779,2831]},null,[],["seq",{"sourceInterval":[2779,2806]},["terminal",{"sourceInterval":[2779,2792]},"constructor"],["app",{"sourceInterval":[2793,2802]},"ParamList",[]],["terminal",{"sourceInterval":[2803,2806]},";"]]],"ResourceMethod":["define",{"sourceInterval":[2650,2831]},null,[],["alt",{"sourceInterval":[2671,2831]},["app",{"sourceInterval":[2671,2693]},"ResourceMethod_method",[]],["app",{"sourceInterval":[2725,2756]},"ResourceMethod_static",[]],["app",{"sourceInterval":[2779,2806]},"ResourceMethod_constructor",[]]]],"FuncItem":["define",{"sourceInterval":[2835,2868]},null,[],["seq",{"sourceInterval":[2846,2868]},["app",{"sourceInterval":[2846,2851]},"ident",[]],["terminal",{"sourceInterval":[2852,2855]},":"],["app",{"sourceInterval":[2856,2864]},"FuncType",[]],["terminal",{"sourceInterval":[2865,2868]},";"]]],"FuncType":["define",{"sourceInterval":[2872,2920]},null,[],["seq",{"sourceInterval":[2883,2920]},["opt",{"sourceInterval":[2883,2891]},["terminal",{"sourceInterval":[2883,2890]},"async"]],["terminal",{"sourceInterval":[2892,2898]},"func"],["app",{"sourceInterval":[2899,2908]},"ParamList",[]],["opt",{"sourceInterval":[2909,2920]},["app",{"sourceInterval":[2909,2919]},"ResultList",[]]]]],"ResultList":["define",{"sourceInterval":[2924,2949]},null,[],["seq",{"sourceInterval":[2937,2949]},["terminal",{"sourceInterval":[2937,2941]},"->"],["app",{"sourceInterval":[2942,2949]},"TypeRef",[]]]],"ParamList":["define",{"sourceInterval":[2953,2986]},null,[],["seq",{"sourceInterval":[2965,2986]},["terminal",{"sourceInterval":[2965,2968]},"("],["app",{"sourceInterval":[2969,2982]},"NamedTypeList",[]],["terminal",{"sourceInterval":[2983,2986]},")"]]],"NamedTypeList":["define",{"sourceInterval":[2990,3028]},null,[],["app",{"sourceInterval":[3006,3028]},"ListOf",[["app",{"sourceInterval":[3013,3022]},"NamedType",[]],["terminal",{"sourceInterval":[3024,3027]},","]]]],"NamedType":["define",{"sourceInterval":[3032,3061]},null,[],["seq",{"sourceInterval":[3044,3061]},["app",{"sourceInterval":[3044,3049]},"ident",[]],["terminal",{"sourceInterval":[3050,3053]},":"],["app",{"sourceInterval":[3054,3061]},"TypeRef",[]]]],"TypeRef":["define",{"sourceInterval":[3065,3167]},null,[],["alt",{"sourceInterval":[3078,3167]},["app",{"sourceInterval":[3078,3088]},"SimpleType",[]],["app",{"sourceInterval":[3095,3105]},"ResultType",[]],["app",{"sourceInterval":[3112,3121]},"TupleType",[]],["app",{"sourceInterval":[3128,3138]},"OptionType",[]],["app",{"sourceInterval":[3145,3153]},"ListType",[]],["app",{"sourceInterval":[3160,3167]},"RefType",[]]]],"RefType":["define",{"sourceInterval":[3171,3186]},null,[],["app",{"sourceInterval":[3181,3186]},"ident",[]]],"ResultType":["define",{"sourceInterval":[3190,3242]},null,[],["seq",{"sourceInterval":[3203,3242]},["terminal",{"sourceInterval":[3203,3211]},"result"],["terminal",{"sourceInterval":[3212,3215]},"<"],["app",{"sourceInterval":[3216,3223]},"TypeRef",[]],["opt",{"sourceInterval":[3224,3238]},["seq",{"sourceInterval":[3225,3236]},["terminal",{"sourceInterval":[3225,3228]},","],["app",{"sourceInterval":[3229,3236]},"TypeRef",[]]]],["terminal",{"sourceInterval":[3239,3242]},">"]]],"TupleType":["define",{"sourceInterval":[3246,3296]},null,[],["seq",{"sourceInterval":[3258,3296]},["terminal",{"sourceInterval":[3258,3265]},"tuple"],["terminal",{"sourceInterval":[3266,3269]},"<"],["app",{"sourceInterval":[3270,3277]},"TypeRef",[]],["star",{"sourceInterval":[3278,3292]},["seq",{"sourceInterval":[3279,3290]},["terminal",{"sourceInterval":[3279,3282]},","],["app",{"sourceInterval":[3283,3290]},"TypeRef",[]]]],["terminal",{"sourceInterval":[3293,3296]},">"]]],"OptionType":["define",{"sourceInterval":[3300,3337]},null,[],["seq",{"sourceInterval":[3313,3337]},["terminal",{"sourceInterval":[3313,3321]},"option"],["terminal",{"sourceInterval":[3322,3325]},"<"],["app",{"sourceInterval":[3326,3333]},"TypeRef",[]],["terminal",{"sourceInterval":[3334,3337]},">"]]],"ListType":["define",{"sourceInterval":[3341,3374]},null,[],["seq",{"sourceInterval":[3352,3374]},["terminal",{"sourceInterval":[3352,3358]},"list"],["terminal",{"sourceInterval":[3359,3362]},"<"],["app",{"sourceInterval":[3363,3370]},"TypeRef",[]],["terminal",{"sourceInterval":[3371,3374]},">"]]],"SimpleType":["define",{"sourceInterval":[3378,3518]},null,[],["alt",{"sourceInterval":[3394,3518]},["terminal",{"sourceInterval":[3394,3398]},"s8"],["terminal",{"sourceInterval":[3401,3406]},"s16"],["terminal",{"sourceInterval":[3409,3414]},"s32"],["terminal",{"sourceInterval":[3417,3422]},"s64"],["terminal",{"sourceInterval":[3429,3433]},"u8"],["terminal",{"sourceInterval":[3436,3441]},"u16"],["terminal",{"sourceInterval":[3444,3449]},"u32"],["terminal",{"sourceInterval":[3452,3457]},"u64"],["terminal",{"sourceInterval":[3464,3469]},"f32"],["terminal",{"sourceInterval":[3472,3477]},"f64"],["terminal",{"sourceInterval":[3484,3490]},"bool"],["terminal",{"sourceInterval":[3497,3505]},"string"],["terminal",{"sourceInterval":[3512,3518]},"char"]]],"packageIdentifier":["define",{"sourceInterval":[3522,3580]},null,[],["seq",{"sourceInterval":[3545,3580]},["plus",{"sourceInterval":[3545,3557]},["seq",{"sourceInterval":[3546,3555]},["app",{"sourceInterval":[3546,3551]},"ident",[]],["terminal",{"sourceInterval":[3552,3555]},":"]]],["app",{"sourceInterval":[3558,3565]},"package",[]],["opt",{"sourceInterval":[3566,3580]},["seq",{"sourceInterval":[3567,3578]},["terminal",{"sourceInterval":[3567,3570]},"@"],["app",{"sourceInterval":[3571,3578]},"version",[]]]]]],"version":["define",{"sourceInterval":[3584,3632]},null,[],["seq",{"sourceInterval":[3598,3632]},["plus",{"sourceInterval":[3599,3605]},["app",{"sourceInterval":[3599,3604]},"digit",[]]],["terminal",{"sourceInterval":[3607,3610]},"."],["plus",{"sourceInterval":[3612,3618]},["app",{"sourceInterval":[3612,3617]},"digit",[]]],["terminal",{"sourceInterval":[3620,3623]},"."],["plus",{"sourceInterval":[3625,3631]},["app",{"sourceInterval":[3625,3630]},"digit",[]]]]],"package":["define",{"sourceInterval":[3636,3667]},null,[],["seq",{"sourceInterval":[3649,3667]},["app",{"sourceInterval":[3649,3654]},"ident",[]],["star",{"sourceInterval":[3655,3667]},["seq",{"sourceInterval":[3656,3665]},["terminal",{"sourceInterval":[3656,3659]},"/"],["app",{"sourceInterval":[3660,3665]},"ident",[]]]]]],"ident":["define",{"sourceInterval":[3671,3688]},null,[],["app",{"sourceInterval":[3683,3688]},"label",[]]],"label":["define",{"sourceInterval":[3692,3728]},null,[],["seq",{"sourceInterval":[3704,3728]},["app",{"sourceInterval":[3704,3712]},"fragment",[]],["star",{"sourceInterval":[3713,3728]},["seq",{"sourceInterval":[3714,3726]},["terminal",{"sourceInterval":[3714,3717]},"-"],["app",{"sourceInterval":[3718,3726]},"fragment",[]]]]]],"fragment":["define",{"sourceInterval":[3732,3765]},null,[],["alt",{"sourceInterval":[3747,3765]},["app",{"sourceInterval":[3747,3751]},"word",[]],["app",{"sourceInterval":[3758,3765]},"acronym",[]]]],"word":["define",{"sourceInterval":[3769,3802]},null,[],["seq",{"sourceInterval":[3780,3802]},["app",{"sourceInterval":[3780,3785]},"lower",[]],["star",{"sourceInterval":[3786,3802]},["alt",{"sourceInterval":[3787,3800]},["app",{"sourceInterval":[3787,3792]},"lower",[]],["app",{"sourceInterval":[3795,3800]},"digit",[]]]]]],"acronym":["define",{"sourceInterval":[3806,3842]},null,[],["seq",{"sourceInterval":[3820,3842]},["app",{"sourceInterval":[3820,3825]},"upper",[]],["star",{"sourceInterval":[3826,3842]},["alt",{"sourceInterval":[3827,3840]},["app",{"sourceInterval":[3827,3832]},"upper",[]],["app",{"sourceInterval":[3835,3840]},"digit",[]]]]]],"space":["override",{"sourceInterval":[3846,3898]},null,[],["alt",{"sourceInterval":[3855,3898]},["app",{"sourceInterval":[3855,3865]},"whitespace",[]],["app",{"sourceInterval":[3868,3879]},"lineComment",[]],["app",{"sourceInterval":[3882,3898]},"multiLineComment",[]]]],"whitespace":["define",{"sourceInterval":[3901,3938]},null,[],["alt",{"sourceInterval":[3914,3938]},["terminal",{"sourceInterval":[3914,3917]}," "],["terminal",{"sourceInterval":[3920,3924]},"\t"],["terminal",{"sourceInterval":[3927,3931]},"\n"],["terminal",{"sourceInterval":[3934,3938]},"\r"]]],"lineComment":["define",{"sourceInterval":[3971,4007]},null,[],["seq",{"sourceInterval":[3985,4007]},["terminal",{"sourceInterval":[3985,3989]},"//"],["star",{"sourceInterval":[3990,4002]},["seq",{"sourceInterval":[3991,4000]},["not",{"sourceInterval":[3991,3996]},["terminal",{"sourceInterval":[3992,3996]},"\n"]],["app",{"sourceInterval":[3997,4000]},"any",[]]]],["terminal",{"sourceInterval":[4003,4007]},"\n"]]],"multiLineComment":["define",{"sourceInterval":[4037,4078]},null,[],["seq",{"sourceInterval":[4056,4078]},["terminal",{"sourceInterval":[4056,4060]},"/*"],["star",{"sourceInterval":[4061,4073]},["seq",{"sourceInterval":[4062,4071]},["not",{"sourceInterval":[4062,4067]},["terminal",{"sourceInterval":[4063,4067]},"*/"]],["app",{"sourceInterval":[4068,4071]},"any",[]]]],["terminal",{"sourceInterval":[4074,4078]},"*/"]]]}]);module.exports=result;