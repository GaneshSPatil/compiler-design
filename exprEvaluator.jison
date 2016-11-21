
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */

[0-9]+("."[0-9]+)?\b  return 'NUMBER'
[a-z]+                return 'VARIABLE'
"+"                   return '+'
"-"                   return '-'
"*"                   return '*'
"/"                   return '/'
"("                   return '('
")"                   return ')'
";"                   return ';'
"="                   return '='
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%{
  var evaluate = require('./evaluate.js');
  var toString = require('./treeToString.js');

    var allTrees = [];
%}

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'

%start expressions

%% /* language grammar */
expressions
    : block EOF
        {
          console.log(allTrees);
          var variables = {};
          var result;
          allTrees.forEach(function(tree){
            result = evaluate(tree, variables);
          });
          console.log(result);
          console.log('-------------------');
          console.log(allTrees);
        }
    ;
block
  : e ';'
    {allTrees.push($$); $$=allTrees;}
  | assgn ';'
    {allTrees.push($$); $$=allTrees;}
  | e ';' block
    { allTrees.unshift($$); $$=$3;}
  | assgn ';' block
    { allTrees.unshift($$); $$=$3;}
  ;

assgn
  :'VARIABLE' '=' e
    {$$ = {op: $2, left:$1, right:$3};}
  ;

e
    : e '/' e || e '+' e
      {$$ = {op: $2, left:$1, right:$3};}
    | e '-' e
      {$$ = {op: $2, left:$1, right:$3};}
    | e '*' e
      {$$ = {op: $2, left:$1, right:$3};}
    | '(' e ')'
        {$$ = $2;}
    | 'NUMBER'
        {$$ = Number(yytext);}
    | 'VARIABLE'
        {$$ = yytext;}
    ;
