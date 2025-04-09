import grammar from "./grammar.ohm-bundle";

export { grammar };

const semantics = grammar.createSemantics();

semantics.addOperation("resolve", {
  
});



export { semantics };
